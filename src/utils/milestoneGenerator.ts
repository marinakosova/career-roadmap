import { Milestone, Skill } from '@/context/types';
import { generateSteps, generateTools, generateResources } from './roadmapGenerator';

// Define timelines based on time commitment
const timelineAdjustments: Record<string, number> = {
  'Full-time': 1,
  'Part-time': 1.5,
  'Few hours per week': 2.5,
  'Weekends only': 2
};

// Company size specific adjustments
const companySizeAdjustments: Record<string, {
  focus: string[];
  additional: string[];
}> = {
  'Startup': {
    focus: ['versatility', 'rapid learning', 'autonomous work'],
    additional: ['startup culture', 'wearing multiple hats', 'fast-paced environment']
  },
  'Small to medium': {
    focus: ['specialization', 'team collaboration', 'process improvement'],
    additional: ['cross-functional work', 'direct impact', 'growth opportunities']
  },
  'Enterprise': {
    focus: ['enterprise systems', 'scalability', 'corporate processes'],
    additional: ['large-scale projects', 'stakeholder management', 'compliance']
  }
};

// Budget-based resource recommendations
const budgetBasedResources: Record<string, string[]> = {
  'No budget': [
    'Free online courses',
    'Open-source projects',
    'Community forums',
    'Free tutorials'
  ],
  'Limited budget': [
    'Selective paid courses',
    'Essential certifications',
    'Basic tools and subscriptions'
  ],
  'Flexible budget': [
    'Premium courses',
    'Industry certifications',
    'Professional tools',
    'Paid mentorship'
  ]
};

// Current state adjustments
const currentStateAdjustments: Record<string, {
  priority: string[];
  additional: string[];
}> = {
  'I want to switch careers': {
    priority: ['skill assessment', 'industry research', 'networking'],
    additional: ['transferable skills analysis', 'career exploration sessions']
  },
  'I want to level up in my current role': {
    priority: ['advanced skills', 'leadership development', 'industry expertise'],
    additional: ['mentorship programs', 'specialization tracks']
  },
  'I don\'t like my current job': {
    priority: ['career counseling', 'work values assessment', 'job exploration'],
    additional: ['work-life balance strategies', 'stress management']
  },
  'I\'m a student/recent graduate': {
    priority: ['foundational skills', 'internships', 'portfolio building'],
    additional: ['entry-level certifications', 'networking events']
  }
};

// Role-specific base milestones
const roleSpecificMilestones: Record<string, Array<{title: string; description: string; timeline: string}>> = {
  'Software Engineer': [
    {
      title: 'Technical Foundation',
      description: 'Master core programming concepts and tools',
      timeline: '3 months'
    },
    {
      title: 'Project Implementation',
      description: 'Build full-stack applications using modern technologies',
      timeline: '4 months'
    },
    {
      title: 'System Design & Architecture',
      description: 'Learn scalable system design principles',
      timeline: '3 months'
    }
  ],
  'Data Scientist': [
    {
      title: 'Data Analysis Foundations',
      description: 'Master statistical analysis and data manipulation',
      timeline: '3 months'
    },
    {
      title: 'Machine Learning Implementation',
      description: 'Build and deploy ML models',
      timeline: '4 months'
    },
    {
      title: 'Advanced Analytics & Research',
      description: 'Conduct advanced research and optimize models',
      timeline: '3 months'
    }
  ],
  'Product Manager': [
    {
      title: 'Product Strategy Foundation',
      description: 'Learn product strategy and market analysis',
      timeline: '2 months'
    },
    {
      title: 'User Research & Prototyping',
      description: 'Conduct user research and create product prototypes',
      timeline: '3 months'
    },
    {
      title: 'Product Launch & Metrics',
      description: 'Plan and execute product launches with success metrics',
      timeline: '4 months'
    }
  ]
};

// Default milestones if role isn't found
const defaultMilestones = [
  {
    title: 'Skill Assessment & Planning',
    description: 'Evaluate current skills and create learning plan',
    timeline: '2 weeks'
  },
  {
    title: 'Core Competency Development',
    description: 'Build fundamental skills for your role',
    timeline: '3 months'
  },
  {
    title: 'Practical Application',
    description: 'Apply skills through projects and real-world scenarios',
    timeline: '3 months'
  }
];

export const generatePersonalizedMilestones = (
  desiredRole: string,
  currentState: string,
  budget: string,
  companySize: string,
  timeCommitment: string,
  selectedSkills: Skill[]
): Milestone[] => {
  // Select base milestones based on role
  const baseMilestones = roleSpecificMilestones[desiredRole] || defaultMilestones;

  // Adjust timelines based on time commitment
  const timelineMultiplier = timelineAdjustments[timeCommitment] || 1;

  // Get company size specific adjustments
  const sizeAdjustments = companySizeAdjustments[companySize];

  // Get current state adjustments
  const stateAdjustments = currentStateAdjustments[currentState];

  // Transform base milestones into personalized ones
  const personalizedMilestones = baseMilestones.map((base, index) => {
    // Adjust timeline
    const timelineParts = base.timeline.split(' ');
    const duration = parseInt(timelineParts[0]) * timelineMultiplier;
    const unit = timelineParts[1];

    // Enhance description based on company size and current state
    let enhancedDescription = base.description;
    if (sizeAdjustments) {
      enhancedDescription += ` with focus on ${sizeAdjustments.focus.join(', ')}`;
    }

    // Add budget context to learning resources
    const budgetResources = budgetBasedResources[budget] || budgetBasedResources['No budget'];

    // Create milestone with all enhancements
    const milestone: Milestone = {
      id: `milestone-${Date.now()}-${index}`,
      title: base.title,
      description: enhancedDescription,
      timeline: `${Math.round(duration)} ${unit}`,
      completed: false,
      progress: 0,
      skills: selectedSkills.slice(index * 2, (index * 2) + 2), // Distribute skills across milestones
      steps: generateSteps(base.title),
      tools: generateTools(base.title),
      resources: budgetResources.map((resource, i) => ({
        id: `resource-${i}`,
        name: resource
      }))
    };

    return milestone;
  });

  // Add state-specific milestones if available
  if (stateAdjustments) {
    stateAdjustments.priority.forEach((priority, index) => {
      const additionalMilestone: Milestone = {
        id: `milestone-${Date.now()}-priority-${index}`,
        title: `${priority.charAt(0).toUpperCase() + priority.slice(1)}`,
        description: `Focus on ${priority} to address your current situation`,
        timeline: '2 weeks',
        completed: false,
        progress: 0,
        skills: selectedSkills.slice(0, 2),
        steps: generateSteps(priority),
        tools: generateTools(priority),
        resources: budgetBasedResources[budget]?.map((resource, i) => ({
          id: `resource-${i}`,
          name: resource
        })) || []
      };
      personalizedMilestones.unshift(additionalMilestone);
    });
  }

  return personalizedMilestones;
};
