
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleWhatsAppClick = () => {
    // Using a dummy WhatsApp number
    window.open("https://wa.me/1234567890", "_blank");
    toast({
      title: "WhatsApp Opening",
      description: "Connecting you with our support team via WhatsApp",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm">
        <div className="container max-w-7xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold">Contact Support</h1>
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4">We're Here to Help</h2>
          <p className="text-muted-foreground">
            Our support team is available to assist you with any questions or concerns.
            Choose your preferred method of contact below.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">WhatsApp Support</h3>
              <p className="text-muted-foreground mb-4">
                Connect with us directly via WhatsApp for real-time assistance.
              </p>
              <Button onClick={handleWhatsAppClick} className="mt-auto w-full">
                <MessageSquare className="mr-2 h-4 w-4" /> Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-4">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <Button 
                variant="outline" 
                className="mt-auto w-full"
                onClick={() => window.location.href = "mailto:support@example.com"}
              >
                support@example.com
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Help Center</h3>
              <p className="text-muted-foreground mb-4">
                Browse our knowledge base for answers to common questions.
              </p>
              <Button 
                variant="outline" 
                className="mt-auto w-full"
                onClick={() => navigate('/help')}
              >
                Visit Help Center
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto mt-16 p-6 bg-card rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-center">Operating Hours</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Weekdays</h4>
              <p className="text-muted-foreground">
                Monday - Friday<br />
                9:00 AM - 6:00 PM
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Weekends</h4>
              <p className="text-muted-foreground">
                Saturday<br />
                10:00 AM - 4:00 PM<br />
                (Sunday Closed)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
