import React from 'react';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '50K+',
      label: 'Active Readers',
      description: 'Join our growing community'
    },
    {
      icon: BookOpen,
      value: '1M+',
      label: 'Articles Read',
      description: 'Quality content consumed'
    },
    {
      icon: Award,
      value: '₦2.5M',
      label: 'Tokens Earned',
      description: 'Rewards distributed to readers'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Satisfaction Rate',
      description: 'Happy readers and growing'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            dadapay by the Numbers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of readers who are already earning tokens while staying informed 
            with quality journalism and breaking news coverage.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <IconComponent className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;