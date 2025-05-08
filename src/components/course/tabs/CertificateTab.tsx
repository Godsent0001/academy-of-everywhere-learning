
import React from 'react';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CertificateTab: React.FC = () => {
  const handlePreviewCertificate = () => {
    toast({
      title: "Certificate Preview",
      description: "Your certificate will be available after completing all course requirements.",
    });
  };

  return (
    <div className="text-center py-8">
      <div className="mb-6 flex justify-center">
        <Award className="h-16 w-16 text-secondary" />
      </div>
      <h2 className="text-2xl font-serif font-medium mb-4">Course Certificate</h2>
      <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
        Upon successful completion of this course and passing the final exam, you will receive a
        verified certificate. This certificate can be shared on your resume, LinkedIn profile, or 
        with potential employers to demonstrate your knowledge in this subject area.
      </p>
      <div className="border p-8 rounded-lg max-w-2xl mx-auto mb-8">
        <h3 className="font-serif text-lg mb-4">Certificate Requirements</h3>
        <ul className="list-disc text-left pl-6 space-y-2">
          <li>Complete all course lessons</li>
          <li>Pass the final exam with a score of 70% or higher</li>
          <li>Complete any required assignments or projects</li>
        </ul>
      </div>
      <Button onClick={handlePreviewCertificate}>Preview Certificate</Button>
    </div>
  );
};

export default CertificateTab;
