
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, className = '' }) => {
  return (
    <div className={`flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 ${className}`}>
      <div className="inline-flex items-center justify-center p-2 bg-secondary rounded-full mr-4">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <div className="text-xl font-bold">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
