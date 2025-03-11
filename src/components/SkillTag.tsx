
import React from 'react';
import { PlusCircle, CheckCircle, BookOpen, TrendingUp, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { SkillProficiency } from '@/context/RoadmapContext';

interface SkillTagProps {
  name: string;
  selected?: boolean;
  onClick?: () => void;
  proficiency?: SkillProficiency;
  category?: string;
  onProficiencyChange?: (proficiency: SkillProficiency) => void;
  showProficiency?: boolean;
  recommendationScore?: number;
  relevanceTag?: 'essential' | 'recommended' | 'optional';
}

const getProficiencyIcon = (proficiency?: SkillProficiency) => {
  switch (proficiency) {
    case 'want-to-learn':
      return <BookOpen className="h-3.5 w-3.5" />;
    case 'want-to-improve':
      return <TrendingUp className="h-3.5 w-3.5" />;
    case 'proficient':
      return <Star className="h-3.5 w-3.5" />;
    default:
      return null;
  }
};

const getProficiencyVariant = (proficiency?: SkillProficiency) => {
  switch (proficiency) {
    case 'want-to-learn':
      return 'info';
    case 'want-to-improve':
      return 'warning';
    case 'proficient':
      return 'success';
    default:
      return undefined;
  }
};

const getRelevanceColor = (relevanceTag?: 'essential' | 'recommended' | 'optional') => {
  switch (relevanceTag) {
    case 'essential':
      return 'bg-rose-50 text-rose-800 border-rose-200';
    case 'recommended':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'optional':
      return 'bg-gray-50 text-gray-800 border-gray-200';
    default:
      return '';
  }
};

const SkillTag: React.FC<SkillTagProps> = ({ 
  name, 
  selected = false, 
  onClick, 
  proficiency,
  category,
  onProficiencyChange,
  showProficiency = false,
  recommendationScore,
  relevanceTag
}) => {
  const handleProficiencyClick = (e: React.MouseEvent, newProficiency: SkillProficiency) => {
    e.stopPropagation();
    if (onProficiencyChange) {
      onProficiencyChange(newProficiency);
    }
  };

  const renderProficiencyBadge = () => {
    if (!proficiency) return null;
    
    return (
      <Badge 
        variant={getProficiencyVariant(proficiency)} 
        className="ml-1 py-0 px-1.5 h-5"
      >
        {getProficiencyIcon(proficiency)}
      </Badge>
    );
  };

  return (
    <div className="inline-flex flex-col mb-2 mr-2">
      <button
        onClick={onClick}
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
          ${selected 
            ? 'bg-primary text-white shadow-sm' 
            : 'bg-secondary text-primary hover:bg-secondary/80'}`}
      >
        {name}
        {showProficiency && renderProficiencyBadge()}
        {onClick && !showProficiency && (
          <span className="ml-1.5">
            {selected ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <PlusCircle className="h-4 w-4" />
            )}
          </span>
        )}
        
        {recommendationScore && (
          <span className="ml-1.5 text-xs bg-primary/10 px-1 rounded">
            {recommendationScore}%
          </span>
        )}
      </button>
      
      {selected && onProficiencyChange && (
        <div className="flex mt-1 space-x-1 justify-center">
          <button 
            onClick={(e) => handleProficiencyClick(e, 'want-to-learn')}
            className={`rounded-full p-0.5 transition-colors ${proficiency === 'want-to-learn' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            title="Want to learn"
          >
            <BookOpen className="h-3 w-3" />
          </button>
          <button 
            onClick={(e) => handleProficiencyClick(e, 'want-to-improve')}
            className={`rounded-full p-0.5 transition-colors ${proficiency === 'want-to-improve' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            title="Want to improve"
          >
            <TrendingUp className="h-3 w-3" />
          </button>
          <button 
            onClick={(e) => handleProficiencyClick(e, 'proficient')}
            className={`rounded-full p-0.5 transition-colors ${proficiency === 'proficient' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            title="Already proficient"
          >
            <Star className="h-3 w-3" />
          </button>
        </div>
      )}
      
      {relevanceTag && (
        <span className={`text-xs px-1.5 py-0.5 rounded border mt-1 mx-auto ${getRelevanceColor(relevanceTag)}`}>
          {relevanceTag}
        </span>
      )}
    </div>
  );
};

export default SkillTag;
