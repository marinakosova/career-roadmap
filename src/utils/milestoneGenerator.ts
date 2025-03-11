
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

export const generatePersonalizedMilestones = (
  desiredRole: string,
  currentState: string,
  budget: string,
  companySize: string,
  timeCommitment: string,
  selectedSkills: Skill[]
): Milestone[] => {
  // Base milestones structure
  const baseMilestones = [
    {
      title: 'Skill Assessment & Gap Analysis',
      description: 'Evaluate your current skills and identify gaps',
      timeline: '2 weeks'
    },
    {
      title: 'Learning Path Creation',
      description: 'Design your personalized learning journey',
      timeline: '1 month'
    },
    {
      title: 'Core Skills Development',
      description: 'Build fundamental skills for your new role',
      timeline: '3 months'
    },
    {
      title: 'Portfolio Development',
      description: 'Create projects showcasing your skills',
      timeline: '2 months'
    },
    {
      title: 'Industry Network Building',
      description: 'Connect with professionals in your field',
      timeline: '2 months'
    }
  ];

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
      resources: generateResources(base.title)
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
        resources: generateResources(priority)
      };
      // Insert priority milestones at the beginning
      personalizedMilestones.unshift(additionalMilestone);
    });
  }

  return personalizedMilestones;
};
