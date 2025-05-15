
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const HelpPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm">
        <div className="container max-w-7xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold">Help Center</h1>
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="mb-12">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I enroll in a course?</AccordionTrigger>
              <AccordionContent>
                To enroll in a course, browse our course catalog and click on any course that interests you. 
                On the course page, click the "Enroll" button. If the course is free, you'll get immediate access. 
                For paid courses, you'll be directed to complete the payment process first.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What are tokens and how do they work?</AccordionTrigger>
              <AccordionContent>
                Tokens are our virtual currency used for various interactions on the platform, 
                particularly for AI-powered features like the AI tutor. Free accounts receive 10,000 tokens daily 
                with a monthly cap of 100,000 tokens. Premium plans offer higher token allowances for more extensive usage.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I track my course progress?</AccordionTrigger>
              <AccordionContent>
                Your progress is automatically tracked as you complete lessons and modules. 
                Visit your dashboard to see overall progress across all your courses. 
                Within each course, you'll see a progress bar showing how far you've advanced through the material.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I download course materials for offline use?</AccordionTrigger>
              <AccordionContent>
                Yes, many courses offer downloadable resources such as PDFs, worksheets, and reference guides. 
                Look for the download icon next to available resources in your course materials. 
                Video content is typically only available for streaming while connected to the internet.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I reset my password?</AccordionTrigger>
              <AccordionContent>
                If you've forgotten your password, click on the "Forgot Password" link on the sign-in page. 
                Enter your registered email address, and we'll send you a link to reset your password. 
                For security reasons, this link will expire after 24 hours.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>How do the subscription plans work?</AccordionTrigger>
              <AccordionContent>
                We offer three subscription tiers: Free, Standard ($1.99/month), and Premium ($4.99/month). 
                Each tier offers different token allowances and features. You can upgrade or downgrade your 
                subscription at any time from your profile page. Subscription changes take effect at the 
                beginning of the next billing cycle.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger>How do I get a certificate after completing a course?</AccordionTrigger>
              <AccordionContent>
                Certificates are automatically generated when you complete all required components of a course. 
                Visit the certificate tab on your course page once you've reached 100% completion. 
                You can download your certificate as a PDF or share it directly to your LinkedIn profile.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8">
              <AccordionTrigger>How can I contact an instructor?</AccordionTrigger>
              <AccordionContent>
                Each course has a discussion forum where you can post questions for the instructor and other students. 
                For direct communication, some instructors provide contact information on their profile page. 
                Premium subscribers also have access to priority instructor support.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9">
              <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
              <AccordionContent>
                Yes, we use industry-standard encryption and secure payment processors. We never store your 
                complete credit card information on our servers. All transactions are processed through trusted 
                payment gateways that comply with PCI DSS standards.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-10">
              <AccordionTrigger>How do I use dark mode?</AccordionTrigger>
              <AccordionContent>
                You can toggle dark mode on and off from your profile page. Look for the dark mode switch 
                with sun and moon icons. Your preference will be saved for future sessions. Dark mode can 
                help reduce eye strain, especially when studying at night.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="text-center">
            <p className="mb-4">Still need help? We're here for you.</p>
            <Button onClick={() => navigate('/contact')} className="mx-auto">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
