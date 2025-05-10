import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileUploader } from '@/components/FileUploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, BookOpen, FileText, Download, Upload, Clock, Calendar, Users, UserPlus, ArrowRight, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  owner_id: string | null;
  member_count?: number;
  is_member?: boolean;
}

const StudyHelpPage: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [creatingGroup, setCreatingGroup] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchStudyGroups = async () => {
      try {
        setLoading(true);
        
        // Get all study groups
        const { data: groups, error } = await supabase
          .from('study_groups')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // If user is authenticated, check which groups they're a member of
        let membershipData = [];
        if (user) {
          const { data: memberships, error: membershipError } = await supabase
            .from('study_group_members')
            .select('study_group_id')
            .eq('user_id', user.id);
            
          if (membershipError) throw membershipError;
          membershipData = memberships || [];
        }
        
        // Get member counts for each group
        const enhancedGroups = await Promise.all(groups.map(async (group) => {
          const { count, error: countError } = await supabase
            .from('study_group_members')
            .select('*', { count: 'exact', head: true })
            .eq('study_group_id', group.id);
            
          if (countError) throw countError;
          
          // Check if user is a member
          const isMember = user ? membershipData.some(
            (m: any) => m.study_group_id === group.id
          ) : false;
          
          return {
            ...group,
            member_count: count || 0,
            is_member: isMember
          };
        }));
        
        setStudyGroups(enhancedGroups);
      } catch (error: any) {
        toast({
          title: "Error fetching study groups",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudyGroups();
  }, [user, toast]);

  const handleFilesSelected = (files: File[]) => {
    toast({
      title: "Files uploaded successfully",
      description: `You have uploaded ${files.length} file(s).`,
    });

    // Here you would normally process the files, perhaps upload them to a server
    console.log('Files selected:', files);
  };

  const handleJoinGroup = async (groupId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join study groups",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }

    try {
      setJoining(groupId);
      
      // Check if already a member
      const { data: existingMembership, error: checkError } = await supabase
        .from('study_group_members')
        .select('*')
        .eq('study_group_id', groupId)
        .eq('user_id', user.id)
        .single();
        
      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }
      
      // If already a member, navigate to the study group page
      if (existingMembership) {
        navigate(`/study-group/${groupId}`);
        return;
      }
      
      // Otherwise, join the group
      const { error } = await supabase
        .from('study_group_members')
        .insert({
          study_group_id: groupId,
          user_id: user.id,
        });
        
      if (error) throw error;
      
      toast({
        title: "Joined study group",
        description: "You have successfully joined the study group.",
      });
      
      // Navigate to the study group page
      navigate(`/study-group/${groupId}`);
      
    } catch (error: any) {
      toast({
        title: "Error joining study group",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setJoining(null);
    }
  };
  
  const handleCreateGroup = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create study groups",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }
    
    if (!newGroupName.trim()) {
      toast({
        title: "Group name required",
        description: "Please enter a name for your study group",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setCreatingGroup(true);
      
      // Create the study group
      const { data, error } = await supabase
        .from('study_groups')
        .insert({
          name: newGroupName.trim(),
          description: newGroupDescription.trim() || null,
          owner_id: user.id,
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Join the group as a member
      await supabase
        .from('study_group_members')
        .insert({
          study_group_id: data.id,
          user_id: user.id,
        });
      
      toast({
        title: "Study group created",
        description: "Your study group has been created successfully.",
      });
      
      // Reset form and close dialog
      setNewGroupName('');
      setNewGroupDescription('');
      setOpenCreateDialog(false);
      
      // Navigate to the new study group
      navigate(`/study-group/${data.id}`);
      
    } catch (error: any) {
      toast({
        title: "Error creating study group",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setCreatingGroup(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/90 to-primary text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Study Help Center</h1>
              <p className="text-lg md:text-xl opacity-90 mb-6">
                Access and share study materials, join group study sessions, and enhance your learning experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size={isMobile ? "lg" : "default"} className="font-medium">
                  <Download className="mr-2 h-4 w-4" /> Browse Resources
                </Button>
                <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size={isMobile ? "lg" : "default"} className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                      <Users className="mr-2 h-4 w-4" /> Create Study Group
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a Study Group</DialogTitle>
                      <DialogDescription>
                        Create a new study group to collaborate with other students.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Group Name</label>
                        <Input 
                          id="name" 
                          placeholder="Enter group name" 
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                          disabled={creatingGroup}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">Description (Optional)</label>
                        <Textarea 
                          id="description" 
                          placeholder="Describe the purpose of your study group" 
                          value={newGroupDescription}
                          onChange={(e) => setNewGroupDescription(e.target.value)}
                          disabled={creatingGroup}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleCreateGroup} disabled={creatingGroup}>
                        {creatingGroup ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>Create Group</>
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="mb-8 w-full justify-start overflow-x-auto pb-2 scrollbar-hide">
              <TabsTrigger value="resources" className="text-base py-2">Study Resources</TabsTrigger>
              <TabsTrigger value="upload" className="text-base py-2">Upload Materials</TabsTrigger>
              <TabsTrigger value="groups" className="text-base py-2">Study Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {resourceCategories.map((category, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-3 bg-primary/10 p-2 rounded-full">
                            {category.icon}
                          </div>
                          <CardTitle>{category.title}</CardTitle>
                        </div>
                        <span className="bg-primary/10 text-primary font-medium py-1 px-3 rounded-full text-sm">
                          {category.count}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{category.description}</CardDescription>
                      <Button variant="link" className="px-0 mt-2">
                        Browse {category.title} →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <h2 className="text-2xl font-serif font-bold mb-4">Recently Added Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded">
                        <FileText className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-medium truncate">
                          {["Study Guide - Introduction to Psychology", 
                            "Calculus Formula Sheet", 
                            "Organic Chemistry Lab Notes",
                            "Computer Science Algorithms Cheat Sheet",
                            "Business Ethics Case Studies",
                            "World History Timeline"][i]}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" /> Added {i + 1} day{i !== 0 ? 's' : ''} ago
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upload">
              <div className="max-w-3xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Share Your Study Materials</CardTitle>
                    <CardDescription>
                      Help fellow students by uploading notes, study guides, or other helpful resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUploader 
                      onFilesSelected={handleFilesSelected}
                      maxSize={10 * 1024 * 1024} // 10MB
                      accept={{
                        'application/pdf': ['.pdf'],
                        'application/msword': ['.doc', '.docx'],
                        'text/plain': ['.txt'],
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpg', '.jpeg']
                      }}
                    />
                  </CardContent>
                </Card>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Guidelines for Sharing Materials</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Share only study materials that you have created or have permission to share.</li>
                    <li>Do not upload proprietary content, exams, or instructor materials without permission.</li>
                    <li>Make sure documents are clear, organized, and properly labeled.</li>
                    <li>Be respectful of others' work and give credit when appropriate.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="groups">
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold mb-2">Study Groups</h2>
                <p className="text-gray-600">Join study groups to collaborate with peers and enhance your learning experience.</p>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : studyGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {studyGroups.map(group => (
                    <Card key={group.id} className="overflow-hidden hover:shadow-md transition-all">
                      <CardHeader>
                        <CardTitle>{group.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {group.description || "No description provided"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{group.member_count} member{group.member_count !== 1 ? 's' : ''}</span>
                          <Clock className="h-4 w-4 mr-2 ml-4" />
                          <span>Created {new Date(group.created_at).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() => handleJoinGroup(group.id)}
                          variant={group.is_member ? "outline" : "default"}
                          className="w-full"
                          disabled={joining === group.id}
                        >
                          {joining === group.id ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : group.is_member ? (
                            <Check className="h-4 w-4 mr-2" />
                          ) : (
                            <UserPlus className="h-4 w-4 mr-2" />
                          )}
                          {group.is_member ? 'View Group' : 'Join Group'}
                          {!group.is_member && <ArrowRight className="h-4 w-4 ml-2" />}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Users className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium">No study groups yet</h3>
                    <p className="text-gray-500 mb-6">Be the first to create a study group!</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Create Study Group</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create a Study Group</DialogTitle>
                          <DialogDescription>
                            Create a new study group to collaborate with other students.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label htmlFor="name-2" className="text-sm font-medium">Group Name</label>
                            <Input 
                              id="name-2" 
                              placeholder="Enter group name" 
                              value={newGroupName}
                              onChange={(e) => setNewGroupName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="description-2" className="text-sm font-medium">Description (Optional)</label>
                            <Textarea 
                              id="description-2" 
                              placeholder="Describe the purpose of your study group" 
                              value={newGroupDescription}
                              onChange={(e) => setNewGroupDescription(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={handleCreateGroup}>Create Group</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              )}
              
              <div className="mt-12">
                <h3 className="text-lg font-medium mb-4">Benefits of Study Groups</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Enhanced Understanding",
                      description: "Discussing concepts with peers helps solidify your understanding."
                    },
                    {
                      title: "Diverse Perspectives",
                      description: "Gain insights from different approaches and viewpoints."
                    },
                    {
                      title: "Accountability",
                      description: "Stay motivated with regular study schedules and peer support."
                    },
                    {
                      title: "Teaching Reinforces Learning",
                      description: "Explaining concepts to others strengthens your own knowledge."
                    }
                  ].map((benefit, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex">
                          <div className="bg-primary/10 p-2 rounded-full mr-3">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{benefit.title}</h4>
                            <p className="text-sm text-gray-600">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const resourceCategories = [
  {
    title: "Study Notes",
    icon: <FileText className="h-6 w-6" />,
    description: "Access comprehensive study notes for all courses",
    count: 248
  },
  {
    title: "Practice Exams",
    icon: <GraduationCap className="h-6 w-6" />,
    description: "Test your knowledge with past exams and quizzes",
    count: 75
  },
  {
    title: "Reading Materials",
    icon: <BookOpen className="h-6 w-6" />,
    description: "Essential readings and additional resources",
    count: 130
  }
];

export default StudyHelpPage;
