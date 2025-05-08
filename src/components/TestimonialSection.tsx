
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  course: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jessica Thompson',
    role: 'Graphic Designer',
    quote: 'The literature course expanded my understanding and appreciation of classic novels. The structured learning approach and interactive lessons kept me engaged throughout.',
    avatar: '/placeholder.svg',
    course: 'World Literature Introduction'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Software Developer',
    quote: 'As someone transitioning careers, the quantum mechanics course was challenging but incredibly rewarding. The certificate I earned helped me stand out in job interviews.',
    avatar: '/placeholder.svg',
    course: 'Quantum Mechanics Fundamentals'
  },
  {
    id: '3',
    name: 'Sarah Nguyen',
    role: 'Marketing Specialist',
    quote: 'I\'ve taken many online courses, but the psychology program here truly stands out. The Q&A sessions after each lesson helped me grasp complex concepts easily.',
    avatar: '/placeholder.svg',
    course: 'Introduction to Psychology'
  }
];

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-3">What Our Students Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our community of learners who have transformed their knowledge and careers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-sm text-muted-foreground">
                  Course: {testimonial.course}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
