
import React from 'react';
import { PlusCircle, CheckCircle } from 'lucide-react';

interface SkillTagProps {
  name: string;
  selected?: boolean;
  onClick?: () => void;
}

const SkillTag: React.FC<SkillTagProps> = ({ name, selected = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium mr-2 mb-2 transition-all duration-200
        ${selected 
          ? 'bg-primary text-white shadow-sm' 
          : 'bg-secondary text-primary hover:bg-secondary/80'}`}
    >
      {name}
      {onClick && (
        <span className="ml-1.5">
          {selected ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <PlusCircle className="h-4 w-4" />
          )}
        </span>
      )}
    </button>
  );
};

export default SkillTag;
