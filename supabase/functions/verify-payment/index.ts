
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

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
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    
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
    
    // Get session ID from request body
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      throw new Error("Session ID is required");
    }
    
    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });
    
    // Retrieve checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      throw new Error("Session not found");
    }
    
    // Use admin client for database operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    // Check if payment was successful
    if (session.payment_status === "paid") {
      // Update payment record
      await supabaseAdmin
        .from("payments")
        .update({
          status: "completed",
          stripe_payment_intent: session.payment_intent as string,
          updated_at: new Date().toISOString()
        })
        .eq("stripe_session_id", sessionId);
      
      // Get tokens from session metadata
      const tokensToAdd = parseInt(session.metadata?.tokens || "0");
      
      if (tokensToAdd > 0) {
        // Get current user tokens
        const { data: userTokens } = await supabaseAdmin
          .from("user_tokens")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        if (userTokens) {
          // Update tokens if user already has tokens
          await supabaseAdmin
            .from("user_tokens")
            .update({
              tokens_available: userTokens.tokens_available + tokensToAdd,
              last_updated: new Date().toISOString()
            })
            .eq("user_id", user.id);
        } else {
          // Create new token record if user doesn't have tokens
          await supabaseAdmin
            .from("user_tokens")
            .insert({
              user_id: user.id,
              tokens_available: tokensToAdd,
              tokens_used: 0
            });
        }
        
        // Record token transaction
        await supabaseAdmin
          .from("token_transactions")
          .insert({
            user_id: user.id,
            amount: tokensToAdd,
            transaction_type: "purchase",
            description: `Purchase of ${tokensToAdd} tokens`
          });
      }
      
      return new Response(JSON.stringify({ 
        success: true,
        status: session.payment_status,
        tokens_added: tokensToAdd
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      // Update payment record with current status
      await supabaseAdmin
        .from("payments")
        .update({
          status: session.payment_status,
          updated_at: new Date().toISOString()
        })
        .eq("stripe_session_id", sessionId);
      
      return new Response(JSON.stringify({ 
        success: false,
        status: session.payment_status
      }), {
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
