
import React from 'react';
import { Book, GraduationCap, Users, Award } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: <Book className="w-8 h-8 text-primary" />,
    value: '200+',
    label: 'Courses',
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
    value: '50+',
    label: 'Expert Instructors',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    value: '10,000+',
    label: 'Students Worldwide',
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    value: '5,000+',
    label: 'Certificates Issued',
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <p className="text-3xl md:text-4xl font-serif font-bold mb-1">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-white/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
