
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { TokenTransaction, UserTokens } from '@/types';
import { 
  CircleUser, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  GraduationCap,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';

const TokensPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [tokens, setTokens] = useState<UserTokens | null>(null);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  useEffect(() => {
    if (user) {
      fetchTokens();
      fetchTransactions();
    } else {
      navigate('/signin');
    }
  }, [user, navigate]);

  const fetchTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('user_tokens')
        .select('*')
        .eq('user_id', user?.id)
        .single();
        
      if (error) {
        console.error('Error fetching tokens:', error);
        return;
      }
      
      setTokens(data);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('token_transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }
      
      setTransactions(data as TokenTransaction[]);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handlePurchaseTokens = async (packageId: string) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    const tokenPackages = {
      'basic': { tokens: 100, price: 999 },
      'standard': { tokens: 500, price: 3999 },
      'premium': { tokens: 1000, price: 6999 },
    };
    
    const selectedPackage = tokenPackages[packageId as keyof typeof tokenPackages];
    
    if (!selectedPackage) {
      toast({
        title: 'Invalid package',
        description: 'Please select a valid token package',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsPurchasing(true);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          packageId,
          tokens: selectedPackage.tokens,
          price: selectedPackage.price
        }
      });
      
      if (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to process payment',
          variant: 'destructive',
        });
        return;
      }
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to process payment',
        variant: 'destructive',
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy HH:mm');
  };

  // Get transaction badge color
  const getTransactionBadge = (type: string) => {
    if (type === 'purchase') {
      return <Badge className="bg-green-500 hover:bg-green-600">Purchase</Badge>;
    }
    return <Badge className="bg-blue-500 hover:bg-blue-600">Usage</Badge>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8" />
              <h1 className="text-3xl md:text-4xl font-serif font-bold">Token Management</h1>
            </div>
            <p className="text-xl max-w-3xl mt-4">
              Manage your tokens and purchase more to continue using AI-powered study tools
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid grid-cols-1 md:grid-cols-3 w-full">
              <TabsTrigger value="overview" className="flex items-center">
                <CircleUser className="h-4 w-4 mr-2" />
                Token Overview
              </TabsTrigger>
              <TabsTrigger value="purchase" className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Purchase Tokens
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Transaction History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Your Token Balance</CardTitle>
                  <CardDescription>
                    View your current token balance and usage statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-10">
                      <p>Loading token information...</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="shadow-md">
                          <CardHeader className="pb-0">
                            <CardDescription>Available Tokens</CardDescription>
                            <div className="flex items-end justify-between">
                              <CardTitle className="text-4xl font-semibold text-green-600">
                                {tokens?.tokens_available || 0}
                              </CardTitle>
                              <TrendingUp className="h-8 w-8 text-green-600" />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500">
                              Use tokens for AI-powered study help, note analysis, and practice question generation
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="shadow-md">
                          <CardHeader className="pb-0">
                            <CardDescription>Used Tokens</CardDescription>
                            <div className="flex items-end justify-between">
                              <CardTitle className="text-4xl font-semibold text-blue-600">
                                {tokens?.tokens_used || 0}
                              </CardTitle>
                              <TrendingDown className="h-8 w-8 text-blue-600" />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500">
                              Total tokens used across all your learning activities
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Token Usage Guide</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">Study Material Analysis</h4>
                              <p className="text-sm text-gray-500">10-30 tokens per document (depending on length)</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">Practice Question Generation</h4>
                              <p className="text-sm text-gray-500">5-15 tokens per question set</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">AI Chat Assistance</h4>
                              <p className="text-sm text-gray-500">2-5 tokens per message exchange</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setActiveTab('purchase')} className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Purchase More Tokens
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="purchase">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Tokens</CardTitle>
                  <CardDescription>
                    Select a token package to enhance your learning experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="shadow-md border-2 border-transparent hover:border-primary transition-all">
                      <CardHeader>
                        <CardTitle>Basic Package</CardTitle>
                        <CardDescription>Perfect for getting started</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold mb-2">
                          <div className="flex items-center">
                            <DollarSign className="h-5 w-5" />
                            <span>9.99</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mb-4">One-time payment</div>
                        <Separator className="my-4" />
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>100 Tokens</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Document analysis</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Question generation</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => handlePurchaseTokens('basic')}
                          disabled={isPurchasing}
                        >
                          {isPurchasing ? 'Processing...' : 'Purchase'}
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="shadow-md border-2 border-primary">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>Standard Package</CardTitle>
                            <CardDescription>Most popular choice</CardDescription>
                          </div>
                          <Badge>Best Value</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold mb-2">
                          <div className="flex items-center">
                            <DollarSign className="h-5 w-5" />
                            <span>39.99</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mb-4">One-time payment</div>
                        <Separator className="my-4" />
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>500 Tokens</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Document analysis</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Question generation</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Study material summaries</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => handlePurchaseTokens('standard')}
                          disabled={isPurchasing}
                        >
                          {isPurchasing ? 'Processing...' : 'Purchase'}
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="shadow-md border-2 border-transparent hover:border-primary transition-all">
                      <CardHeader>
                        <CardTitle>Premium Package</CardTitle>
                        <CardDescription>For serious learners</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold mb-2">
                          <div className="flex items-center">
                            <DollarSign className="h-5 w-5" />
                            <span>69.99</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mb-4">One-time payment</div>
                        <Separator className="my-4" />
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>1,000 Tokens</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Document analysis</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Question generation</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Study material summaries</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Advanced AI tutoring</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => handlePurchaseTokens('premium')}
                          disabled={isPurchasing}
                        >
                          {isPurchasing ? 'Processing...' : 'Purchase'}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <p className="text-sm text-gray-500 mb-4">
                    All purchases are processed securely through Stripe. Tokens are non-refundable and do not expire.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    View your token purchase and usage history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {transactions.length === 0 ? (
                    <div className="text-center py-10 bg-muted/30 rounded-lg">
                      <p>No transactions found</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Purchase tokens or use the study tools to see your transaction history
                      </p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{formatDate(transaction.created_at)}</TableCell>
                            <TableCell>{getTransactionBadge(transaction.transaction_type)}</TableCell>
                            <TableCell className={transaction.transaction_type === 'purchase' ? 'text-green-600' : 'text-blue-600'}>
                              {transaction.transaction_type === 'purchase' ? '+' : '-'}
                              {transaction.amount} tokens
                            </TableCell>
                            <TableCell>{transaction.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TokensPage;
