
import React from 'react';
import { Target } from 'lucide-react';
import MilestoneCard from '@/components/MilestoneCard';
import { Milestone, Skill } from '@/context/types';
import { generatePersonalizedMilestones } from '@/utils/milestoneGenerator';

interface MilestonesSectionProps {
  milestones: Milestone[];
  desiredRole?: string;
  currentState?: string;
  budget?: string;
  companySize?: string;
  timeCommitment?: string;
  selectedSkills?: Skill[];
}

const MilestonesSection: React.FC<MilestonesSectionProps> = ({ 
  milestones: initialMilestones,
  desiredRole = '',
  currentState = '',
  budget = 'No budget',
  companySize = 'Small to medium',
  timeCommitment = 'Full-time',
  selectedSkills = []
}) => {
  // Generate personalized milestones if we have the required information
  const displayedMilestones = desiredRole
    ? generatePersonalizedMilestones(
        desiredRole,
        currentState,
        budget,
        companySize,
        timeCommitment,
        selectedSkills
      )
    : initialMilestones;

  return (
    <div className="space-y-8">
      <div className="relative pl-8">
        <h2 className="text-2xl font-bold mb-6">
          Your Career Milestones for {desiredRole || 'Your Career'}
        </h2>
        
        <div className="space-y-2">
          {displayedMilestones.map((milestone, index) => (
            <MilestoneCard 
              key={milestone.id}
              index={index}
              {...milestone}
              isLast={index === displayedMilestones.length - 1}
              totalMilestones={displayedMilestones.length}
            />
          ))}
          
          {displayedMilestones.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600">No milestones yet</h3>
              <p className="text-gray-500 max-w-md mx-auto mt-2">
                Complete the roadmap builder to generate personalized career milestones.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MilestonesSection;
