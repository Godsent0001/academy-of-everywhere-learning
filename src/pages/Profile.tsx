
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { UserTokens, TokenTransaction } from '@/types';
import { User, Settings, FileText, BookOpen, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [tokens, setTokens] = useState<UserTokens | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<TokenTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchUserTokens();
      fetchRecentTransactions();
    } else {
      navigate('/signin');
    }
  }, [user, navigate]);

  const fetchUserProfile = async () => {
    try {
      // For this example, we'll just use the metadata from auth
      // In a real app, you might want to have a separate profiles table
      if (user && user.user_metadata) {
        setFullName(user.user_metadata.full_name || '');
        setBio(user.user_metadata.bio || '');
        setEducationLevel(user.user_metadata.education_level || '');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserTokens = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_tokens')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error) {
        console.error('Error fetching tokens:', error);
        return;
      }
      
      setTokens(data);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  const fetchRecentTransactions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('token_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }
      
      setRecentTransactions(data as TokenTransaction[]);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          bio: bio,
          education_level: educationLevel
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email || ''} />
                <AvatarFallback>{user?.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold">
                  {fullName || user?.email?.split('@')[0] || 'User Profile'}
                </h1>
                <p className="text-lg opacity-90">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid grid-cols-1 md:grid-cols-3 w-full">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="learning" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Learning
              </TabsTrigger>
              <TabsTrigger value="tokens" className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" />
                Tokens
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-10">
                      <p>Loading profile information...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          value={user?.email || ''}
                          disabled
                          className="bg-muted/50"
                        />
                        <p className="text-sm text-gray-500">Email cannot be changed</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Tell us about yourself"
                          rows={4}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="educationLevel">Education Level</Label>
                        <Input 
                          id="educationLevel"
                          value={educationLevel}
                          onChange={(e) => setEducationLevel(e.target.value)}
                          placeholder="E.g., High School, Undergraduate, Graduate"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="w-full"
                  >
                    {isSaving ? 'Saving...' : 'Save Profile'}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Change Password</h4>
                        <p className="text-sm text-gray-500">Update your account password</p>
                      </div>
                      <Button variant="outline" onClick={() => navigate('/settings')}>
                        <Settings className="h-4 w-4 mr-2" />
                        Change
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Account Privacy</h4>
                        <p className="text-sm text-gray-500">Manage your privacy settings</p>
                      </div>
                      <Button variant="outline" onClick={() => navigate('/settings')}>
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="learning">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>
                    Track your learning journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Current Courses</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Introduction to Computer Science</h4>
                            <div className="flex items-center mt-1">
                              <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
                                <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
                              </div>
                              <span className="text-sm">65% complete</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => navigate('/course/intro-to-cs')}>
                            Continue
                          </Button>
                        </div>
                        <div className="p-4 border rounded-lg flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Data Structures & Algorithms</h4>
                            <div className="flex items-center mt-1">
                              <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
                                <div className="bg-primary h-full rounded-full" style={{ width: '32%' }}></div>
                              </div>
                              <span className="text-sm">32% complete</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => navigate('/course/data-structures')}>
                            Continue
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Learning Activity</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-2xl">12</CardTitle>
                            <CardDescription>Courses Enrolled</CardDescription>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-2xl">47</CardTitle>
                            <CardDescription>Lessons Completed</CardDescription>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-2xl">8</CardTitle>
                            <CardDescription>Quizzes Taken</CardDescription>
                          </CardHeader>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Study Materials</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" onClick={() => navigate('/student/materials')} className="h-auto py-4 flex justify-between">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2" />
                            <span>My Study Notes</span>
                          </div>
                          <Badge variant="outline">12 notes</Badge>
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/student/help')} className="h-auto py-4 flex justify-between">
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 mr-2" />
                            <span>AI Study Help</span>
                          </div>
                          <Badge variant="outline">Use AI</Badge>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate('/courses')} className="w-full">
                    Explore More Courses
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="tokens">
              <Card>
                <CardHeader>
                  <CardTitle>Token Overview</CardTitle>
                  <CardDescription>
                    View your token balance and recent transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Available Tokens</CardDescription>
                          <CardTitle className="text-3xl text-green-600">
                            {tokens?.tokens_available || 0}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500">
                            Use tokens for AI-powered features
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Used Tokens</CardDescription>
                          <CardTitle className="text-3xl text-blue-600">
                            {tokens?.tokens_used || 0}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500">
                            Total tokens used across all features
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
                      {recentTransactions.length === 0 ? (
                        <div className="text-center py-8 bg-muted/30 rounded-lg">
                          <p className="text-gray-500">No recent transactions</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {recentTransactions.map(transaction => (
                            <div key={transaction.id} className="p-4 border rounded-lg flex justify-between items-center">
                              <div>
                                <div className="flex items-center">
                                  {transaction.transaction_type === 'purchase' ? (
                                    <Badge className="mr-2 bg-green-500">Purchase</Badge>
                                  ) : (
                                    <Badge className="mr-2 bg-blue-500">Usage</Badge>
                                  )}
                                  <span className="font-medium">{transaction.description}</span>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {new Date(transaction.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className={transaction.transaction_type === 'purchase' ? 'text-green-600 font-medium' : 'text-blue-600 font-medium'}>
                                {transaction.transaction_type === 'purchase' ? '+' : '-'}
                                {transaction.amount} tokens
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button onClick={() => navigate('/student/tokens')} className="w-full">
                    View All Token Activity
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/student/tokens')} className="w-full">
                    Purchase More Tokens
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
