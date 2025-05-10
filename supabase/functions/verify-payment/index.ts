
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { sessionId } = await req.json();
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    
    // Get user from auth header
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );
    
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabaseClient.auth.getUser(token);
    
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    // Verify the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return new Response(JSON.stringify({ error: "Session not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }
    
    // Initialize supabase admin client to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    // Get payment record
    const { data: payment, error: paymentError } = await supabaseAdmin
      .from("payments")
      .select()
      .eq("stripe_session_id", sessionId)
      .single();
    
    if (paymentError) {
      return new Response(JSON.stringify({ error: "Payment record not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }
    
    // Check if payment status already processed
    if (payment.status === "completed") {
      return new Response(JSON.stringify({ success: true, payment }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
    
    // Check if payment is successful
    if (session.payment_status === "paid") {
      // Update payment record
      await supabaseAdmin
        .from("payments")
        .update({ status: "completed", stripe_payment_intent: session.payment_intent })
        .eq("stripe_session_id", sessionId);
      
      const tokenAmount = payment.tokens_purchased || 0;
      
      // Check if user has a token record
      const { data: userTokens, error: tokenError } = await supabaseAdmin
        .from("user_tokens")
        .select()
        .eq("user_id", user.id);
      
      if (tokenError || userTokens.length === 0) {
        // Create a new token record
        await supabaseAdmin.from("user_tokens").insert({
          user_id: user.id,
          tokens_available: tokenAmount,
          tokens_used: 0
        });
      } else {
        // Update the existing token record
        await supabaseAdmin
          .from("user_tokens")
          .update({
            tokens_available: userTokens[0].tokens_available + tokenAmount,
            last_updated: new Date().toISOString()
          })
          .eq("user_id", user.id);
      }
      
      // Create a token transaction record
      await supabaseAdmin.from("token_transactions").insert({
        user_id: user.id,
        amount: tokenAmount,
        transaction_type: "purchase",
        description: `Purchased ${tokenAmount} tokens`
      });
      
      return new Response(JSON.stringify({ success: true, payment: {...payment, status: "completed"} }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Payment not completed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
