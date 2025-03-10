
import React from 'react';
import { Target } from 'lucide-react';
import MilestoneCard from '@/components/MilestoneCard';
import { Milestone } from '@/context/RoadmapContext';

interface MilestonesSectionProps {
  milestones: Milestone[];
}

const MilestonesSection: React.FC<MilestonesSectionProps> = ({ milestones }) => {
  return (
    <div className="space-y-8">
      <div className="relative pl-8">
        <h2 className="text-2xl font-bold mb-6">Your Career Milestones</h2>
        
        <div className="space-y-2">
          {milestones.map((milestone, index) => (
            <MilestoneCard 
              key={milestone.id}
              index={index}
              {...milestone}
              isLast={index === milestones.length - 1}
              totalMilestones={milestones.length}
            />
          ))}
          
          {milestones.length === 0 && (
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
