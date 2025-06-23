import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, CreditCard, LogOut, HelpCircle, Phone, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/components/theme-provider";

interface PricingCardProps {
  title: string;
  originalPrice: string;
  price: string;
  discount?: string;
  features: string[];
  isPrimary?: boolean;
}

const ProfilePage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState({ name: "John Doe", email: "john.doe@example.com" });
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg");
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [tempAvatarUrl, setTempAvatarUrl] = useState(avatarUrl);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/signin");
  };

  const handleSaveProfile = () => {
    setUser({ ...user, name: tempName });
    setAvatarUrl(tempAvatarUrl);
    setOpenEditProfile(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setTempAvatarUrl(e.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckout = (price: string) => {
    // In a real application, this would redirect to a payment gateway
    toast({
      title: "Redirecting to payment",
      description: `Processing payment for $${price}`,
    });
    // Simulating payment gateway redirect
    setTimeout(() => {
      window.open("/payment", "_blank");
    }, 1000);
  };

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const PricingCard: React.FC<PricingCardProps> = ({ title, originalPrice, price, discount, features, isPrimary }) => (
    <Card className={`border overflow-hidden ${isPrimary ? 'shadow-lg border-primary' : 'shadow'}`}>
      <CardHeader className={`pb-3 ${isPrimary ? 'bg-primary text-primary-foreground' : ''}`}>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className={isPrimary ? "text-primary-foreground/90" : ""}>
          {discount && (
            <span className="inline-block bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-0.5 rounded-full mb-1">
              {discount} off
            </span>
          )}
          <div className="flex items-center gap-2 mt-1">
            {originalPrice !== price && (
              <span className="text-sm line-through opacity-70">${originalPrice}</span>
            )}
            <span className="text-2xl font-bold">${price}</span>
            <span className="text-sm">/month</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full ${isPrimary ? '' : 'variant-outline'}`}
          onClick={() => handleCheckout(price)}
        >
          Buy Plan
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm">
        <div className="container max-w-7xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold">Your Profile</h1>
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto py-8 px-4">
        {/* User info section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-card rounded-lg shadow-sm">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="secondary" 
                className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                onClick={() => setOpenEditProfile(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Dark Mode</span>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={toggleDarkMode}
                    />
                    <Moon className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Help Center
              </CardTitle>
              <CardDescription>Find answers to common questions</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate('/help')}>
                Get Help
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contact Support
              </CardTitle>
              <CardDescription>Reach our support team directly</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate('/contact')}>
                Contact Us
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Pricing section */}
        <h2 className="text-2xl font-serif font-bold mb-4">Upgrade Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <PricingCard
            title="Free Plan"
            originalPrice="0"
            price="0"
            features={[
              "10,000 tokens per day",
              "100,000 tokens per month",
              "Free access to courses",
            ]}
          />
          <PricingCard
            title="Basic Plan"
            originalPrice="2.99"
            price="0.99"
            discount="67%"
            features={[
              "50,000 tokens per day",
              "500,000 tokens per month",
              "Chat with AI tutor",
              "Access to all courses",
            ]}
          />
          <PricingCard
            title="Standard Plan"
            originalPrice="5"
            price="1.99"
            discount="60%"
            isPrimary
            features={[
              "Unlimited tokens per day",
              "1,000,000 tokens per month",
              "Chat with AI tutor",
              "Access to all courses",
              "Priority support",
            ]}
          />
          <PricingCard
            title="Premium Plan"
            originalPrice="10"
            price="4.99"
            discount="50%"
            features={[
              "Unlimited tokens per day",
              "5,000,000 tokens per month",
              "Chat with AI tutor",
              "Access to all courses",
              "Priority support",
              "Advanced analytics",
            ]}
          />
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={openEditProfile} onOpenChange={setOpenEditProfile}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={tempAvatarUrl} alt={tempName} />
                <AvatarFallback>{tempName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <input 
                    id="avatar-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditProfile(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;