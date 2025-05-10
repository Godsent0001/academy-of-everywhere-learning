
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Users, UserPlus, MessageCircle, Clock, Calendar, LogOut, Loader2, FileText, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  owner_id: string | null;
}

interface Member {
  id: string;
  user_id: string;
  study_group_id: string;
  joined_at: string;
  user_email?: string;
}

const StudyGroupPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [group, setGroup] = useState<StudyGroup | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [leaving, setLeaving] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch group details
        const { data: groupData, error: groupError } = await supabase
          .from('study_groups')
          .select('*')
          .eq('id', id)
          .single();
          
        if (groupError) throw groupError;
        setGroup(groupData);
        
        // Check if current user is a member
        if (user) {
          const { data: membershipData, error: membershipError } = await supabase
            .from('study_group_members')
            .select('*')
            .eq('study_group_id', id)
            .eq('user_id', user.id)
            .single();
            
          if (membershipError && membershipError.code !== 'PGRST116') {
            throw membershipError;
          }
          
          if (!membershipData) {
            // User is not a member, redirect to study help page
            toast({
              title: "Access denied",
              description: "You are not a member of this study group",
              variant: "destructive",
            });
            navigate('/student/help');
            return;
          }
          
          // Check if current user is the owner
          setIsOwner(user.id === groupData.owner_id);
        }
        
        // Fetch members
        const { data: membersData, error: membersError } = await supabase
          .from('study_group_members')
          .select('*')
          .eq('study_group_id', id);
          
        if (membersError) throw membersError;
        setMembers(membersData);
        
      } catch (error: any) {
        toast({
          title: "Error fetching study group",
          description: error.message,
          variant: "destructive",
        });
        navigate('/student/help');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchGroupDetails();
    }
  }, [id, user, navigate, toast]);
  
  const handleLeaveGroup = async () => {
    if (!user || !group) return;
    
    try {
      setLeaving(true);
      
      // Check if user is the owner
      if (isOwner) {
        toast({
          title: "Cannot leave group",
          description: "As the owner, you cannot leave the group. Transfer ownership first or delete the group.",
          variant: "destructive",
        });
        return;
      }
      
      // Leave the group
      const { error } = await supabase
        .from('study_group_members')
        .delete()
        .eq('study_group_id', group.id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      toast({
        title: "Left study group",
        description: "You have successfully left the study group.",
      });
      
      navigate('/student/help');
      
    } catch (error: any) {
      toast({
        title: "Error leaving study group",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLeaving(false);
    }
  };
  
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // In a real implementation, this would save the message to the database
    toast({
      title: "Message sent",
      description: "Your message has been sent to the group.",
    });
    
    setMessageInput('');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!group) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-[400px] text-center">
            <CardHeader>
              <CardTitle>Study Group Not Found</CardTitle>
              <CardDescription>The study group you're looking for doesn't exist or has been deleted.</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate('/student/help')}>Back to Study Help</Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Group Header */}
        <div className="bg-gradient-to-r from-primary/90 to-primary text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">{group.name}</h1>
                <p className="opacity-90 mb-4">
                  {group.description || "No description provided"}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{members.length} members</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Created {new Date(group.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              {!isOwner && (
                <Button 
                  variant="outline" 
                  className="mt-4 md:mt-0 bg-white/10 hover:bg-white/20 text-white border-white/30"
                  onClick={handleLeaveGroup}
                  disabled={leaving}
                >
                  {leaving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4 mr-2" />
                  )}
                  Leave Group
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Group Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="discussion">
            <TabsList className="mb-8">
              <TabsTrigger value="discussion" className="text-base py-2">
                <MessageCircle className="h-4 w-4 mr-2" />
                Discussion
              </TabsTrigger>
              <TabsTrigger value="materials" className="text-base py-2">
                <FileText className="h-4 w-4 mr-2" />
                Materials
              </TabsTrigger>
              <TabsTrigger value="members" className="text-base py-2">
                <Users className="h-4 w-4 mr-2" />
                Members
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="discussion">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle>Group Discussion</CardTitle>
                      <CardDescription>
                        Share your thoughts and questions with the group
                      </CardDescription>
                    </CardHeader>
                    <ScrollArea className="flex-grow px-6">
                      <div className="min-h-[400px] space-y-4 py-4">
                        {/* Simulated chat messages */}
                        <div className="flex items-start">
                          <Avatar className="mr-2">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                            <p className="font-medium text-sm text-gray-700">John Doe</p>
                            <p className="text-gray-700">Hi everyone! I'm struggling with the chapter on quantum mechanics. Could someone help explain the wave function collapse?</p>
                            <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Avatar className="mr-2">
                            <AvatarFallback>AS</AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                            <p className="font-medium text-sm text-gray-700">Alice Smith</p>
                            <p className="text-gray-700">Sure! The wave function collapse refers to how a quantum system stops existing as a superposition of states and becomes one state when observed. It's one of the most debated aspects of quantum mechanics.</p>
                            <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Avatar className="mr-2">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                            <p className="font-medium text-sm text-gray-700">John Doe</p>
                            <p className="text-gray-700">Thanks Alice! That helps a lot. Do you have any good resources on this topic?</p>
                            <p className="text-xs text-gray-400 mt-1">45 minutes ago</p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                    <CardFooter className="border-t p-4">
                      <div className="flex w-full space-x-2">
                        <Textarea 
                          placeholder="Type your message..." 
                          className="flex-grow"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <Button onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Sessions</CardTitle>
                      <CardDescription>Scheduled study sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">Final Exam Prep</h4>
                                <p className="text-sm text-gray-500">Tomorrow, 3:00 PM</p>
                              </div>
                              <Badge>Online</Badge>
                            </div>
                            <p className="text-sm mt-2">Review of all chapters and practice problems</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">Lab Report Workshop</h4>
                                <p className="text-sm text-gray-500">Friday, 4:30 PM</p>
                              </div>
                              <Badge variant="outline">Library</Badge>
                            </div>
                            <p className="text-sm mt-2">Collaborative work on the final lab report</p>
                          </CardContent>
                        </Card>
                      </div>
                      <Button className="w-full mt-4">
                        Schedule Study Session
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="materials">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shared Materials</CardTitle>
                    <CardDescription>
                      Study materials shared by group members
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Chapter 5 Notes</h4>
                            <p className="text-sm text-gray-500">Shared by Alice Smith • PDF</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Practice Problems</h4>
                            <p className="text-sm text-gray-500">Shared by John Doe • DOCX</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Formula Sheet</h4>
                            <p className="text-sm text-gray-500">Shared by Sarah Johnson • PDF</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Share New Material
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <CardTitle>Group Members</CardTitle>
                  <CardDescription>
                    People participating in this study group
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {members.map((member, index) => (
                      <div key={member.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center">
                          <Avatar className="mr-3">
                            <AvatarFallback>
                              {member.user_email ? member.user_email.substring(0, 2).toUpperCase() : `U${index}`}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.user_email || `User ${index + 1}`}</p>
                            <p className="text-sm text-gray-500">
                              Joined {new Date(member.joined_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {group.owner_id === member.user_id && (
                          <Badge variant="outline" className="ml-2">Owner</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Members
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

export default StudyGroupPage;
