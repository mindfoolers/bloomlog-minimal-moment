import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  subtitle,
  description,
  bgColor,
}) => {
  return (
    <div className="text-center group">
      <div className={`w-20 h-20 mx-auto mb-6 ${bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
        {icon}
      </div>
      <h3 className="font-semibold text-xl text-bloom-navy dark:text-bloom-cream mb-2">{title}</h3>
      <p className="text-bloom-teal font-medium mb-3 text-sm">{subtitle}</p>
      <p className="text-bloom-navy/70 dark:text-bloom-cream/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}; 