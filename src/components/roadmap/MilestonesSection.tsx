
import React from 'react';
import { Target } from 'lucide-react';
import MilestoneCard from '@/components/MilestoneCard';
import { Milestone, Skill } from '@/context/types';
import { generatePersonalizedMilestones } from '@/utils/milestoneGenerator';

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
  ],
  'Data Analyst': [
    // Early career skills
    ['SQL', 'Excel', 'Data Visualization', 'Statistical Analysis'],
    // Mid-level skills
    ['Python/R', 'Business Intelligence Tools', 'Data Modeling', 'Dashboard Creation'],
    // Advanced skills
    ['Predictive Analytics', 'Data Strategy', 'Stakeholder Consulting', 'Advanced ETL']
  ],
  'Frontend Engineer': [
    // Early career skills
    ['HTML/CSS', 'JavaScript', 'Responsive Design', 'Version Control'],
    // Mid-level skills
    ['React/Vue/Angular', 'State Management', 'Testing', 'Performance Optimization'],
    // Advanced skills
    ['Architecture', 'Design Systems', 'Accessibility', 'Team Leadership']
  ],
  'Backend Engineer': [
    // Early career skills
    ['Node.js/Java/Python', 'REST APIs', 'Databases', 'Authentication'],
    // Mid-level skills
    ['System Design', 'Caching', 'Microservices', 'Security'],
    // Advanced skills
    ['Distributed Systems', 'Scalability', 'DevOps', 'Architecture']
  ]
};

// Define actionable steps for each career stage
const roleSpecificActionableSteps: Record<string, Record<string, string[]>> = {
  default: {
    'beginning': [
      'Complete a self-assessment of your current skills',
      'Create a learning plan targeting your skill gaps',
      'Build a portfolio showcasing your work'
    ],
    'middle': [
      'Seek mentorship from industry professionals',
      'Contribute to open-source or volunteer projects',
      'Join professional communities in your field'
    ],
    'advanced': [
      'Lead projects to demonstrate leadership skills',
      'Present at industry conferences or meetups',
      'Mentor junior professionals in your field'
    ]
  },
  'Software Engineer': {
    'beginning': [
      'Complete 2-3 personal coding projects for your portfolio',
      'Master data structures and algorithms fundamentals',
      'Contribute to an open-source project on GitHub'
    ],
    'middle': [
      'Learn system design principles and patterns',
      'Build a full-stack application with modern architecture',
      'Implement CI/CD pipelines for your projects'
    ],
    'advanced': [
      'Lead a technical project with multiple developers',
      'Design scalable systems with microservices',
      'Mentor junior developers on best practices'
    ]
  },
  'Data Scientist': {
    'beginning': [
      'Build projects using Pandas, NumPy and matplotlib',
      'Create a GitHub repository with data analysis examples',
      'Participate in Kaggle competitions for practical experience'
    ],
    'middle': [
      'Implement machine learning models in production',
      'Create an end-to-end data science pipeline',
      'Master feature engineering and model optimization'
    ],
    'advanced': [
      'Develop custom ML algorithms for specific business needs',
      'Lead data science initiatives that drive business outcomes',
      'Establish data science best practices for your organization'
    ]
  },
  'Product Manager': {
    'beginning': [
      'Create a product roadmap for a mock product',
      'Learn user research methodologies and tools',
      'Build simple prototypes using Figma or similar tools'
    ],
    'middle': [
      'Lead a product feature from ideation to launch',
      'Develop metrics frameworks to measure product success',
      'Collaborate with engineering teams on technical requirements'
    ],
    'advanced': [
      'Develop a product strategy aligned with business goals',
      'Build and lead cross-functional product teams',
      'Create product vision and obtain stakeholder buy-in'
    ]
  }
};

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
