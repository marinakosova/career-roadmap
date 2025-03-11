
import React from 'react';
import { Target } from 'lucide-react';
import MilestoneCard from '@/components/MilestoneCard';
import { Milestone } from '@/context/RoadmapContext';

// This maps desired roles to more specific relevant skills for each milestone phase
const roleSpecificSkills: Record<string, string[][]> = {
  default: [
    // Early career skills (milestone 1)
    ['Communication', 'Time Management', 'Collaboration', 'Problem Solving'],
    // Mid-level skills (milestone 2)
    ['Project Management', 'Leadership', 'Strategic Thinking', 'Mentoring'],
    // Advanced skills (milestone 3)
    ['Executive Presence', 'Vision Setting', 'Change Management', 'Business Acumen']
  ],
  'Software Engineer': [
    // Early career skills
    ['JavaScript', 'HTML/CSS', 'Git', 'Data Structures'],
    // Mid-level skills
    ['System Design', 'CI/CD', 'Testing', 'Database Design'],
    // Advanced skills
    ['Architecture', 'Performance Optimization', 'Distributed Systems', 'Technical Leadership']
  ],
  'Data Scientist': [
    // Early career skills
    ['Python', 'SQL', 'Statistics', 'Data Visualization'],
    // Mid-level skills
    ['Machine Learning', 'Data Engineering', 'A/B Testing', 'Feature Engineering'],
    // Advanced skills
    ['Deep Learning', 'MLOps', 'Research Methods', 'Business Strategy']
  ],
  'Product Manager': [
    // Early career skills
    ['User Research', 'Market Analysis', 'Wireframing', 'Agile Methodologies'],
    // Mid-level skills 
    ['Product Strategy', 'Stakeholder Management', 'Roadmap Planning', 'Product Analytics'],
    // Advanced skills
    ['Product Vision', 'Growth Strategy', 'Cross-functional Leadership', 'Innovation Management']
  ],
  'UX Designer': [
    // Early career skills
    ['UI Design', 'User Research', 'Wireframing', 'Prototyping'],
    // Mid-level skills
    ['Design Systems', 'User Testing', 'Information Architecture', 'Interaction Design'],
    // Advanced skills
    ['Design Leadership', 'UX Strategy', 'Design Ops', 'Design Thinking']
  ]
};

interface MilestonesSectionProps {
  milestones: Milestone[];
  desiredRole?: string;
}

const MilestonesSection: React.FC<MilestonesSectionProps> = ({ milestones, desiredRole }) => {
  // Add relevant, realistic skills to each milestone based on its position in the roadmap
  const enhanceSkillsForMilestones = (milestones: Milestone[], desiredRole: string = 'default'): Milestone[] => {
    const roleSkills = roleSpecificSkills[desiredRole] || roleSpecificSkills.default;
    
    return milestones.map((milestone, index) => {
      // Determine which skill set to use based on milestone position
      const skillSetIndex = Math.min(
        Math.floor((index / milestones.length) * roleSkills.length),
        roleSkills.length - 1
      );
      
      // Create skill objects with appropriate structure
      const enhancedSkills = roleSkills[skillSetIndex].map(skillName => ({
        id: `skill-${skillName.toLowerCase().replace(/\s+/g, '-')}`,
        name: skillName
      }));
      
      return {
        ...milestone,
        skills: enhancedSkills
      };
    });
  };

  // Get the enhanced milestones with more relevant skills
  const enhancedMilestones = enhanceSkillsForMilestones(milestones, desiredRole);

  return (
    <div className="space-y-8">
      <div className="relative pl-8">
        <h2 className="text-2xl font-bold mb-6">Your Career Milestones</h2>
        
        <div className="space-y-2">
          {enhancedMilestones.map((milestone, index) => (
            <MilestoneCard 
              key={milestone.id}
              index={index}
              {...milestone}
              isLast={index === enhancedMilestones.length - 1}
              totalMilestones={enhancedMilestones.length}
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
