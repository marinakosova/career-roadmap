
import { Skill, SkillProficiency } from '@/context/RoadmapContext';

// Generate steps for a milestone
export const generateSteps = (milestoneTitle: string) => {
  const steps = [];
  
  if (milestoneTitle.includes('Skill Assessment')) {
    steps.push(
      { id: `step-${Date.now()}-1`, description: 'Take self-assessment quizzes for key skills', completed: false },
      { id: `step-${Date.now()}-2`, description: 'Have your skills evaluated by a mentor or peer', completed: false },
      { id: `step-${Date.now()}-3`, description: 'Create a skills matrix chart comparing your current vs. required skills', completed: false }
    );
  } else if (milestoneTitle.includes('Learning Path')) {
    steps.push(
      { id: `step-${Date.now()}-1`, description: 'Research online courses that fit your learning style', completed: false },
      { id: `step-${Date.now()}-2`, description: 'Create a weekly learning schedule with specific goals', completed: false },
      { id: `step-${Date.now()}-3`, description: 'Join study groups or find an accountability partner', completed: false }
    );
  } else if (milestoneTitle.includes('Portfolio')) {
    steps.push(
      { id: `step-${Date.now()}-1`, description: 'Define 2-3 projects that showcase your target skills', completed: false },
      { id: `step-${Date.now()}-2`, description: 'Set up your portfolio website or platform', completed: false },
      { id: `step-${Date.now()}-3`, description: 'Get feedback on your portfolio from professionals', completed: false }
    );
  } else if (milestoneTitle.includes('Network')) {
    steps.push(
      { id: `step-${Date.now()}-1`, description: 'Join 3-5 relevant professional groups online', completed: false },
      { id: `step-${Date.now()}-2`, description: 'Schedule 1 informational interview per week', completed: false },
      { id: `step-${Date.now()}-3`, description: 'Attend industry meetups or conferences', completed: false }
    );
  } else if (milestoneTitle.includes('Job Application')) {
    steps.push(
      { id: `step-${Date.now()}-1`, description: 'Update resume highlighting transferable skills', completed: false },
      { id: `step-${Date.now()}-2`, description: 'Draft a template cover letter you can customize', completed: false },
      { id: `step-${Date.now()}-3`, description: 'Practice interview responses for common questions', completed: false }
    );
  } else if (milestoneTitle.includes('Budget')) {
    steps.push(
      { id: `step-${Date.now()}-1`, description: 'List all free resources available for your learning path', completed: false },
      { id: `step-${Date.now()}-2`, description: 'Prioritize paid resources by ROI for your career', completed: false },
      { id: `step-${Date.now()}-3`, description: 'Create a monthly spending plan for your career transition', completed: false }
    );
  } else if (milestoneTitle.includes('Company')) {
    steps.push(
      { id: `step-${Date.now()}-1`, description: 'Research culture and workflows specific to your target company size', completed: false },
      { id: `step-${Date.now()}-2`, description: 'Connect with professionals working at similar companies', completed: false },
      { id: `step-${Date.now()}-3`, description: 'Tailor your approach to match expectations at your target companies', completed: false }
    );
  } else if (milestoneTitle.includes('Schedule')) {
    steps.push(
      { id: `step-${Date.now()}-1`, description: 'Create a realistic timeline based on your availability', completed: false },
      { id: `step-${Date.now()}-2`, description: 'Break down learning into manageable chunks that fit your schedule', completed: false },
      { id: `step-${Date.now()}-3`, description: 'Set up calendar reminders and time blocks for consistent progress', completed: false }
    );
  } else {
    steps.push(
      { id: `step-${Date.now()}-1`, description: 'Research best practices for this milestone', completed: false },
      { id: `step-${Date.now()}-2`, description: 'Create an action plan with measurable outcomes', completed: false },
      { id: `step-${Date.now()}-3`, description: 'Get feedback on your progress from mentors', completed: false }
    );
  }
  
  return steps;
};

// Generate skills for a milestone
export const generateSkills = (milestoneTitle: string, selectedSkills: Skill[]) => {
  const allSkills = [...selectedSkills];
  
  if (allSkills.length < 3) {
    if (milestoneTitle.includes('Skill Assessment')) {
      allSkills.push({ id: `skill-${Date.now()}-1`, name: 'Self-assessment' });
      allSkills.push({ id: `skill-${Date.now()}-2`, name: 'Critical thinking' });
    } else if (milestoneTitle.includes('Learning')) {
      allSkills.push({ id: `skill-${Date.now()}-1`, name: 'Time management' });
      allSkills.push({ id: `skill-${Date.now()}-2`, name: 'Self-directed learning' });
    } else if (milestoneTitle.includes('Portfolio')) {
      allSkills.push({ id: `skill-${Date.now()}-1`, name: 'Project management' });
      allSkills.push({ id: `skill-${Date.now()}-2`, name: 'Documentation' });
    }
  }
  
  return allSkills.slice(0, Math.min(3, allSkills.length));
};

// Generate tools for a milestone
export const generateTools = (milestoneTitle: string) => {
  const tools = [];
  
  if (milestoneTitle.includes('Skill Assessment')) {
    tools.push(
      { id: `tool-${Date.now()}-1`, name: 'Skill assessment tools' },
      { id: `tool-${Date.now()}-2`, name: 'Skill planning software' },
      { id: `tool-${Date.now()}-3`, name: 'Skill networking platforms' }
    );
  } else if (milestoneTitle.includes('Learning Path')) {
    tools.push(
      { id: `tool-${Date.now()}-1`, name: 'Coursera' },
      { id: `tool-${Date.now()}-2`, name: 'Notion for scheduling' }
    );
  } else if (milestoneTitle.includes('Portfolio')) {
    tools.push(
      { id: `tool-${Date.now()}-1`, name: 'GitHub' },
      { id: `tool-${Date.now()}-2`, name: 'Wix/WordPress' }
    );
  } else if (milestoneTitle.includes('Network')) {
    tools.push(
      { id: `tool-${Date.now()}-1`, name: 'LinkedIn' },
      { id: `tool-${Date.now()}-2`, name: 'Meetup' }
    );
  } else if (milestoneTitle.includes('Job Application')) {
    tools.push(
      { id: `tool-${Date.now()}-1`, name: 'Resume Builder' },
      { id: `tool-${Date.now()}-2`, name: 'LinkedIn Easy Apply' }
    );
  }
  
  return tools;
};

// Generate resources for a milestone
export const generateResources = (milestoneTitle: string) => {
  const resources = [];
  
  if (milestoneTitle.includes('Skill Assessment')) {
    resources.push(
      { id: `resource-${Date.now()}-1`, name: 'Free skill assessment templates', url: 'https://www.linkedin.com/learning' },
      { id: `resource-${Date.now()}-2`, name: 'Industry skill standards guide' }
    );
  } else if (milestoneTitle.includes('Learning Path')) {
    resources.push(
      { id: `resource-${Date.now()}-1`, name: 'Top courses for beginners', url: 'https://www.coursera.org' },
      { id: `resource-${Date.now()}-2`, name: 'Learning path templates' }
    );
  } else if (milestoneTitle.includes('Portfolio')) {
    resources.push(
      { id: `resource-${Date.now()}-1`, name: 'Portfolio examples in your field', url: 'https://www.behance.net' },
      { id: `resource-${Date.now()}-2`, name: 'Project idea generator' }
    );
  } else if (milestoneTitle.includes('Network')) {
    resources.push(
      { id: `resource-${Date.now()}-1`, name: 'Networking scripts for introverts', url: 'https://www.themuse.com/advice/networking-tips-for-introverts' },
      { id: `resource-${Date.now()}-2`, name: 'Industry groups directory' }
    );
  }
  
  return resources;
};

// Generate roadmap milestones
export const generateRoadmapMilestones = (
  selectedSkills: Skill[],
  budget: string,
  companySize: string,
  timeCommitment: string
) => {
  const milestones = [
    {
      id: '1',
      title: 'Skill Assessment & Gap Analysis',
      description: 'Identify your current skills and compare them with those required for your target role.',
      timeline: '2 weeks',
      completed: false,
      progress: 0,
      skills: generateSkills('Skill Assessment', selectedSkills),
      steps: generateSteps('Skill Assessment'),
      tools: generateTools('Skill Assessment'),
      resources: generateResources('Skill Assessment')
    },
    {
      id: '2',
      title: 'Learning Path Creation',
      description: 'Develop a structured learning plan focused on acquiring the missing skills.',
      timeline: '1 month',
      completed: false,
      progress: 0,
      skills: generateSkills('Learning Path', selectedSkills),
      steps: generateSteps('Learning Path'),
      tools: generateTools('Learning Path'),
      resources: generateResources('Learning Path')
    },
    {
      id: '3',
      title: 'Portfolio Development',
      description: 'Create projects that demonstrate your new skills and highlight your expertise.',
      timeline: '3 months',
      completed: false,
      progress: 0,
      skills: generateSkills('Portfolio', selectedSkills),
      steps: generateSteps('Portfolio'),
      tools: generateTools('Portfolio'),
      resources: generateResources('Portfolio')
    },
    {
      id: '4',
      title: 'Network Building',
      description: 'Connect with professionals in your target field and attend industry events.',
      timeline: '2 months',
      completed: false,
      progress: 0,
      skills: generateSkills('Network', selectedSkills),
      steps: generateSteps('Network'),
      tools: generateTools('Network'),
      resources: generateResources('Network')
    },
    {
      id: '5',
      title: 'Job Application Strategy',
      description: 'Prepare resume, cover letter, and interview skills tailored to your target role.',
      timeline: '1 month',
      completed: false,
      progress: 0,
      skills: generateSkills('Job Application', selectedSkills),
      steps: generateSteps('Job Application'),
      tools: generateTools('Job Application'),
      resources: generateResources('Job Application')
    }
  ];

  // Add optional milestones based on user input
  if (budget) {
    milestones.push({
      id: '6',
      title: 'Budget-Conscious Learning Plan',
      description: `Optimize your learning plan within your ${budget} budget by focusing on high-ROI resources.`,
      timeline: '1 week',
      completed: false,
      progress: 0,
      skills: generateSkills('Budget', selectedSkills),
      steps: generateSteps('Budget'),
      tools: generateTools('Budget'),
      resources: generateResources('Budget')
    });
  }

  if (companySize) {
    milestones.push({
      id: '7',
      title: `${companySize} Company Preparation`,
      description: `Tailor your approach to match the dynamics of ${companySize} companies in your industry.`,
      timeline: '2 weeks',
      completed: false,
      progress: 0,
      skills: generateSkills('Company', selectedSkills),
      steps: generateSteps('Company'),
      tools: generateTools('Company'),
      resources: generateResources('Company')
    });
  }

  if (timeCommitment) {
    milestones.push({
      id: '8',
      title: `${timeCommitment} Schedule Planning`,
      description: `Organize your career transition timeline considering your ${timeCommitment.toLowerCase()} availability.`,
      timeline: '1 week',
      completed: false,
      progress: 0,
      skills: generateSkills('Schedule', selectedSkills),
      steps: generateSteps('Schedule'),
      tools: generateTools('Schedule'),
      resources: generateResources('Schedule')
    });
  }

  return milestones;
};
