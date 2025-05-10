
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Coins, CreditCard, Loader2, ArrowRight, Clock } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TokenData {
  id: string;
  user_id: string;
  tokens_available: number;
  tokens_used: number;
  last_updated: string;
}

interface TokenTransaction {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: 'purchase' | 'usage';
  description: string | null;
  created_at: string;
}

const TokensPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [purchasingTokens, setPurchasingTokens] = useState<string | null>(null);
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch token data
        const { data: tokenData, error: tokenError } = await supabase
          .from('user_tokens')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (tokenError && tokenError.code !== 'PGRST116') {
          throw tokenError;
        }
        
        setTokenData(tokenData || null);
        
        // Fetch token transactions
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('token_transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (transactionsError) throw transactionsError;
        
        setTransactions(transactionsData || []);
        
      } catch (error: any) {
        toast({
          title: "Error fetching token data",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchTokenData();
    }
  }, [user, toast]);

  const handlePurchaseTokens = async (priceId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to purchase tokens",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }
    
    try {
      setPurchasingTokens(priceId);
      
      // Call the create-checkout Edge Function
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });
      
      if (error) throw error;
      
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
      
    } catch (error: any) {
      toast({
        title: "Error creating checkout session",
        description: error.message,
        variant: "destructive",
      });
      setPurchasingTokens(null);
    }
  };
  
  const tokenPackages = [
    {
      id: "price_basic",
      name: "Basic",
      tokens: 100,
      price: "$4.99",
      features: [
        "Process up to 10 documents",
        "Generate summary notes",
        "Create basic practice questions"
      ],
      popular: false
    },
    {
      id: "price_standard",
      name: "Standard",
      tokens: 500,
      price: "$19.99",
      features: [
        "Process up to 50 documents",
        "Generate detailed summaries",
        "Create advanced practice questions",
        "Access to AI tutoring"
      ],
      popular: true
    },
    {
      id: "price_premium",
      name: "Premium",
      tokens: 1000,
      price: "$34.99",
      features: [
        "Process unlimited documents",
        "Generate comprehensive study guides",
        "Create custom exam simulations",
        "Premium AI tutoring support",
        "Priority processing"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/90 to-primary text-white py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">Token Management</h1>
              <p className="opacity-90">
                Manage your tokens for AI-powered study material processing
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                {/* Token Status Card */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Coins className="h-5 w-5 mr-2 text-primary" />
                      Your Tokens
                    </CardTitle>
                    <CardDescription>
                      Current token balance and usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tokenData ? (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Available Tokens</p>
                          <p className="text-3xl font-bold text-primary">{tokenData.tokens_available}</p>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">Usage</p>
                            <p className="text-sm text-gray-500">
                              {tokenData.tokens_used} used
                            </p>
                          </div>
                          <Progress 
                            value={
                              tokenData.tokens_used + tokenData.tokens_available > 0 
                                ? (tokenData.tokens_used / (tokenData.tokens_used + tokenData.tokens_available)) * 100 
                                : 0
                            } 
                          />
                        </div>
                        <div className="text-sm text-gray-500 pt-2">
                          Last updated: {new Date(tokenData.last_updated).toLocaleString()}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-lg font-medium mb-2">No tokens yet</p>
                        <p className="text-sm text-gray-500 mb-4">
                          Purchase tokens to use our AI-powered study tools
                        </p>
                        <Button onClick={() => handlePurchaseTokens("price_basic")}>
                          Purchase Tokens
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Recent Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      Recent Transactions
                    </CardTitle>
                    <CardDescription>
                      Your token purchase and usage history
                    </CardDescription>
                  </CardHeader>
                  <ScrollArea className="h-[300px]">
                    <CardContent>
                      {transactions.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {transactions.map((transaction) => (
                              <TableRow key={transaction.id}>
                                <TableCell className="font-medium">
                                  {new Date(transaction.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                  <span className={
                                    transaction.transaction_type === 'purchase' 
                                      ? 'text-green-600' 
                                      : 'text-orange-600'
                                  }>
                                    {transaction.transaction_type === 'purchase' ? 'Purchase' : 'Usage'}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  {transaction.transaction_type === 'purchase' ? '+' : '-'}{transaction.amount}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-500">No transactions yet</p>
                        </div>
                      )}
                    </CardContent>
                  </ScrollArea>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-serif font-bold mb-6">Purchase Tokens</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tokenPackages.map((pkg) => (
                    <Card key={pkg.id} className={`overflow-hidden ${pkg.popular ? 'border-primary shadow-md' : ''}`}>
                      {pkg.popular && (
                        <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                          Most Popular
                        </div>
                      )}
                      <CardHeader className={pkg.popular ? 'pb-2' : ''}>
                        <CardTitle>{pkg.name}</CardTitle>
                        <CardDescription>
                          {pkg.tokens} tokens
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold mb-4">{pkg.price}</p>
                        <ul className="space-y-2 mb-4">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="text-sm flex items-start">
                              <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => handlePurchaseTokens(pkg.id)}
                          disabled={purchasingTokens === pkg.id}
                          variant={pkg.popular ? "default" : "outline"}
                        >
                          {purchasingTokens === pkg.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Buy Now
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-10 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">How Tokens Work</h3>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Document Processing</h4>
                        <p className="text-sm text-gray-600">Each document processed by our AI costs 10-20 tokens depending on length and complexity.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">AI Tutor Questions</h4>
                        <p className="text-sm text-gray-600">Each question to the AI tutor costs 1-5 tokens depending on the complexity of the answer.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Quiz Generation</h4>
                        <p className="text-sm text-gray-600">Generating a set of practice questions costs 5-15 tokens depending on the number of questions.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 bg-blue-50 rounded-md p-4">
                    <p className="text-sm text-blue-800">
                      <strong>New users get 100 tokens free!</strong> Try out our AI-powered study tools with your free tokens before purchasing more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const MessageSquare = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const GraduationCap = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

export default TokensPage;
