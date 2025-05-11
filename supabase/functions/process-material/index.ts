
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    const requestData = await req.json();
    const { fileId, fileName, question } = requestData;
    
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
    
    // Check if user has enough tokens
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    // Get user tokens
    const { data: userTokens, error: tokenError } = await supabaseAdmin
      .from("user_tokens")
      .select()
      .eq("user_id", user.id);
    
    if (tokenError || !userTokens || userTokens.length === 0) {
      return new Response(JSON.stringify({ error: "No tokens available. Please purchase tokens." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 402, // Payment Required
      });
    }
    
    const tokensAvailable = userTokens[0].tokens_available;
    // Determine token cost based on operation
    let tokensNeeded = 10; // Default for document processing
    
    if (question) {
      tokensNeeded = 2; // Q&A uses fewer tokens
    } else if (requestData.generateQuestions) {
      tokensNeeded = 15; // Question generation uses more tokens
    }
    
    if (tokensAvailable < tokensNeeded) {
      return new Response(JSON.stringify({ 
        error: "Not enough tokens available", 
        tokensAvailable, 
        tokensNeeded 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 402, // Payment Required
      });
    }

    // Get the Gemini API key (optional - this would be used to call Gemini API)
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    
    // In a real implementation, you would:
    // 1. Fetch the file from Supabase storage
    // 2. Process it using Gemini API
    // 3. Return the processed results
    
    // For now we simulate the AI processing
    
    // Update tokens (deduct the used tokens)
    await supabaseAdmin
      .from("user_tokens")
      .update({
        tokens_available: tokensAvailable - tokensNeeded,
        tokens_used: userTokens[0].tokens_used + tokensNeeded,
        last_updated: new Date().toISOString()
      })
      .eq("user_id", user.id);
    
    // Record token transaction
    await supabaseAdmin.from("token_transactions").insert({
      user_id: user.id,
      amount: tokensNeeded,
      transaction_type: "usage",
      description: question 
        ? "AI question answering" 
        : requestData.generateQuestions
          ? "Question generation"
          : `Processed document: ${fileName}`
    });
    
    // Mock response based on the operation requested
    let response;
    
    if (question) {
      // AI answering a question about the material
      response = {
        summary: `Based on the document "${fileName}", the answer to your question "${question}" is: \n\nThis is a simulated AI response that would be powered by Gemini 2.0 Flash Lite in a real implementation. The answer would contain relevant information extracted from the uploaded document and formatted in a clear, educational manner with appropriate citations and explanations.`,
        tokensUsed: tokensNeeded,
        tokensRemaining: tokensAvailable - tokensNeeded
      };
    } else if (requestData.generateQuestions) {
      // Generate practice questions
      const mockQuestions = [
        {
          question: "What is the main concept discussed in the document?",
          options: ["Concept A", "Concept B", "Concept C", "Concept D"],
          answer: "Concept A",
          explanation: "The document primarily focuses on Concept A as evidenced by the detailed explanations and examples provided throughout."
        },
        {
          question: "According to the material, what is the relationship between X and Y?",
          options: ["X causes Y", "Y causes X", "X and Y are correlated but not causally related", "X and Y are unrelated"],
          answer: "X and Y are correlated but not causally related",
          explanation: "The document explains that while X and Y often occur together, studies have not established a causal relationship between them."
        },
        {
          question: "What methodology would be most appropriate for analyzing the data presented?",
          options: ["Qualitative analysis", "Quantitative analysis", "Mixed methods", "Meta-analysis"],
          answer: "Mixed methods",
          explanation: "Given the diverse data types presented in the document, a mixed methods approach would be most appropriate to capture both statistical trends and contextual factors."
        }
      ];
      
      response = {
        summary: "Generated questions based on document content",
        questions: mockQuestions,
        tokensUsed: tokensNeeded,
        tokensRemaining: tokensAvailable - tokensNeeded
      };
    } else {
      // Default document summary
      response = {
        summary: `This is a summary of the document "${fileName}".\n\nThe document discusses key concepts in the field, including important theories and practical applications. The main points include:\n\n1. Overview of fundamental principles\n2. Analysis of current methodologies\n3. Recommendations for future research\n\nThis summary would be generated by Gemini 2.0 Flash Lite in a real implementation, providing a comprehensive analysis of the document's content with key insights extracted.`,
        questions: [
          {
            question: "What are the main principles discussed in the document?",
            options: ["Theoretical foundations", "Historical developments", "Practical applications", "All of the above"],
            answer: "All of the above",
            explanation: "The document covers theoretical foundations, historical context, and practical applications of the core principles."
          },
          {
            question: "According to the document, what is the most promising area for future research?",
            options: ["Interdisciplinary approaches", "Traditional methodologies", "Historical analysis", "None of the above"],
            answer: "Interdisciplinary approaches",
            explanation: "The document emphasizes that interdisciplinary approaches offer the most potential for advancing the field."
          }
        ],
        tokensUsed: tokensNeeded,
        tokensRemaining: tokensAvailable - tokensNeeded
      };
    }
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
