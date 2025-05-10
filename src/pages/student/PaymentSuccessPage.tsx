
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react';

const PaymentSuccessPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  
  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      if (!sessionId) {
        toast({
          title: "Session ID missing",
          description: "Could not verify payment. Missing session ID.",
          variant: "destructive",
        });
        setVerifying(false);
        return;
      }
      
      try {
        // Call the verify-payment Edge Function
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId }
        });
        
        if (error) throw error;
        
        if (data.success) {
          setPaymentDetails(data.payment);
          toast({
            title: "Payment successful",
            description: "Your tokens have been added to your account.",
          });
        } else {
          toast({
            title: "Payment not completed",
            description: "Your payment was not completed. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          title: "Error verifying payment",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setVerifying(false);
      }
    };
    
    verifyPayment();
  }, [searchParams, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          {verifying ? (
            <>
              <CardHeader className="text-center">
                <CardTitle>Verifying Your Payment</CardTitle>
                <CardDescription>Please wait while we process your payment</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-6">
                <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
                <p className="text-center text-gray-500">
                  This will just take a moment...
                </p>
              </CardContent>
            </>
          ) : paymentDetails ? (
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl">Payment Successful!</CardTitle>
                <CardDescription>Your tokens have been added to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-medium">${(paymentDetails.amount / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tokens Added:</span>
                    <span className="font-medium">{paymentDetails.tokens_purchased}</span>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 pt-2">
                  Thank you for your purchase. You can now use your tokens to process study materials.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" onClick={() => navigate('/student/tokens')}>
                  View My Tokens
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/student/materials')}>
                  Process Study Materials
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <CardTitle>Payment Verification Failed</CardTitle>
                <CardDescription>We could not verify your payment</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-6">
                <p className="mb-4 text-gray-500">
                  There was a problem verifying your payment. If you believe this is an error,
                  please check your token balance or contact support.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" onClick={() => navigate('/student/tokens')}>
                  Check My Tokens
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                  Return to Home
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
