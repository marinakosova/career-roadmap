
import { Milestone, Skill } from '@/context/types';

// Define timelines based on time commitment
const timelineAdjustments: Record<string, number> = {
  'Full-time': 1,
  'Part-time': 1.5,
  'Few hours per week': 2.5,
  'Weekends only': 2,
  '0-5 hours/week': 2.5,
  '5-10 hours/week': 2,
  '10-20 hours/week': 1.5,
  '20-30 hours/week': 1.2,
  '30+ hours/week': 1
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
  },
  'Startup (1-10)': {
    focus: ['versatility', 'rapid learning', 'autonomous work'],
    additional: ['startup culture', 'wearing multiple hats', 'fast-paced environment']
  },
  'Small (11-50)': {
    focus: ['specialization', 'team collaboration', 'process improvement'],
    additional: ['cross-functional work', 'direct impact', 'growth opportunities']
  },
  'Medium (51-200)': {
    focus: ['specialization', 'team collaboration', 'process improvement'],
    additional: ['cross-functional work', 'direct impact', 'growth opportunities']
  },
  'Large (201-1000)': {
    focus: ['enterprise systems', 'scalability', 'corporate processes'],
    additional: ['large-scale projects', 'stakeholder management', 'compliance']
  },
  'Enterprise (1000+)': {
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
  ],
  '$0 (Free resources only)': [
    'Free Figma tutorials',
    'Open-source UX resources',
    'YouTube learning channels',
    'UX community forums'
  ],
  '$100-500': [
    'Entry-level online courses',
    'Basic design books',
    'Affordable UX tools',
    'Online workshops'
  ],
  '$500-1,000': [
    'Mid-tier UX courses',
    'Professional design tools',
    'UX bootcamp modules',
    'Portfolio review services'
  ],
  '$1,000-5,000': [
    'Comprehensive UX bootcamps',
    'Advanced certification programs',
    'Professional mentorship',
    'Industry conference tickets'
  ],
  '$5,000+': [
    'Premium UX degree programs',
    'Executive UX training',
    'Private coaching',
    'International UX conferences'
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
  },
  'I\'m thinking about career change': {
    priority: ['skill assessment', 'industry research', 'networking'],
    additional: ['transferable skills analysis', 'career exploration sessions']
  },
  'I decided to change career': {
    priority: ['skill development', 'portfolio building', 'interview preparation'],
    additional: ['industry-specific projects', 'professional networking']
  },
  'I\'m currently studying for my new career': {
    priority: ['structured learning', 'practical application', 'skill validation'],
    additional: ['study groups', 'project-based learning']
  },
  'I\'m currently networking & interviewing': {
    priority: ['interview skills', 'networking strategy', 'portfolio refinement'],
    additional: ['salary negotiation', 'company research']
  }
};

// Comprehensive role-specific milestones - greatly expanded for key roles
const roleSpecificMilestones: Record<string, Array<{
  title: string; 
  description: string; 
  timeline: string;
  steps?: string[];
  tools?: string[];
  resources?: string[];
}>> = {
  'software engineer': [
    {
      title: 'Technical Foundation',
      description: 'Master core programming concepts and tools',
      timeline: '3 months',
      steps: [
        'Learn data structures and algorithms',
        'Master a programming language (JavaScript/Python)',
        'Understand version control with Git',
        'Complete basic coding challenges',
        'Build small command-line applications'
      ],
      tools: ['VSCode', 'GitHub', 'LeetCode', 'JavaScript/Python', 'Terminal'],
      resources: ['Algorithm courses', 'Programming documentation', 'GitHub Learning Lab']
    },
    {
      title: 'Web Development Fundamentals',
      description: 'Build a strong foundation in web technologies',
      timeline: '3 months',
      steps: [
        'Learn HTML/CSS fundamentals',
        'Master JavaScript basics',
        'Understand HTTP and API concepts',
        'Build responsive web pages',
        'Create a personal portfolio site'
      ],
      tools: ['Chrome DevTools', 'Codepen', 'Figma', 'Postman', 'MDN Web Docs'],
      resources: ['Frontend courses', 'Web development documentation', 'CSS frameworks']
    },
    {
      title: 'Project Implementation',
      description: 'Build full-stack applications using modern technologies',
      timeline: '4 months',
      steps: [
        'Learn a frontend framework (React/Vue/Angular)',
        'Master a backend technology (Node.js/Django/Rails)',
        'Implement database integrations',
        'Deploy applications to cloud platforms',
        'Build a full-stack portfolio project'
      ],
      tools: ['React', 'Node.js', 'MongoDB/PostgreSQL', 'AWS/Heroku', 'Docker'],
      resources: ['React documentation', 'Node.js courses', 'Database tutorials']
    },
    {
      title: 'System Design & Architecture',
      description: 'Learn scalable system design principles',
      timeline: '3 months',
      steps: [
        'Study microservices architecture',
        'Learn caching and performance optimization',
        'Understand cloud infrastructure',
        'Master CI/CD pipelines',
        'Implement security best practices'
      ],
      tools: ['AWS/GCP/Azure', 'Kubernetes', 'Redis', 'Jenkins/GitHub Actions', 'Terraform'],
      resources: ['System design books', 'Cloud certification courses', 'Architecture case studies']
    }
  ],
  'software developer': [
    {
      title: 'Technical Foundation',
      description: 'Master core programming concepts and tools',
      timeline: '3 months',
      steps: [
        'Learn data structures and algorithms',
        'Master a programming language (JavaScript/Python)',
        'Understand version control with Git',
        'Complete basic coding challenges',
        'Build small command-line applications'
      ],
      tools: ['VSCode', 'GitHub', 'LeetCode', 'JavaScript/Python', 'Terminal'],
      resources: ['Algorithm courses', 'Programming documentation', 'GitHub Learning Lab']
    },
    {
      title: 'Web Development Fundamentals',
      description: 'Build a strong foundation in web technologies',
      timeline: '3 months',
      steps: [
        'Learn HTML/CSS fundamentals',
        'Master JavaScript basics',
        'Understand HTTP and API concepts',
        'Build responsive web pages',
        'Create a personal portfolio site'
      ],
      tools: ['Chrome DevTools', 'Codepen', 'Figma', 'Postman', 'MDN Web Docs'],
      resources: ['Frontend courses', 'Web development documentation', 'CSS frameworks']
    },
    {
      title: 'Project Implementation',
      description: 'Build full-stack applications using modern technologies',
      timeline: '4 months',
      steps: [
        'Learn a frontend framework (React/Vue/Angular)',
        'Master a backend technology (Node.js/Django/Rails)',
        'Implement database integrations',
        'Deploy applications to cloud platforms',
        'Build a full-stack portfolio project'
      ],
      tools: ['React', 'Node.js', 'MongoDB/PostgreSQL', 'AWS/Heroku', 'Docker'],
      resources: ['React documentation', 'Node.js courses', 'Database tutorials']
    },
    {
      title: 'System Design & Architecture',
      description: 'Learn scalable system design principles',
      timeline: '3 months',
      steps: [
        'Study microservices architecture',
        'Learn caching and performance optimization',
        'Understand cloud infrastructure',
        'Master CI/CD pipelines',
        'Implement security best practices'
      ],
      tools: ['AWS/GCP/Azure', 'Kubernetes', 'Redis', 'Jenkins/GitHub Actions', 'Terraform'],
      resources: ['System design books', 'Cloud certification courses', 'Architecture case studies']
    }
  ],
  'data scientist': [
    {
      title: 'Data Analysis Foundations',
      description: 'Master statistical analysis and data manipulation',
      timeline: '3 months',
      steps: [
        'Learn Python programming for data science',
        'Master data manipulation with Pandas',
        'Understand descriptive statistics',
        'Create data visualizations with matplotlib/seaborn',
        'Complete a data analysis project'
      ],
      tools: ['Python', 'Pandas', 'Jupyter Notebooks', 'Matplotlib', 'Seaborn'],
      resources: ['Python for Data Science courses', 'Kaggle competitions', 'Statistics tutorials']
    },
    {
      title: 'Machine Learning Fundamentals',
      description: 'Build and evaluate ML models',
      timeline: '4 months',
      steps: [
        'Master supervised learning algorithms',
        'Understand unsupervised learning techniques',
        'Learn feature engineering',
        'Implement model evaluation metrics',
        'Build a classification/regression project'
      ],
      tools: ['Scikit-learn', 'NumPy', 'Pandas', 'Jupyter', 'GitHub'],
      resources: ['Machine Learning courses', 'Kaggle notebooks', 'ML documentation']
    },
    {
      title: 'Advanced ML & Deep Learning',
      description: 'Implement neural networks and advanced ML techniques',
      timeline: '4 months',
      steps: [
        'Learn neural network fundamentals',
        'Implement computer vision models',
        'Create natural language processing systems',
        'Understand reinforcement learning',
        'Complete an end-to-end deep learning project'
      ],
      tools: ['TensorFlow/PyTorch', 'Keras', 'GPU computing', 'Hugging Face', 'Google Colab'],
      resources: ['Deep learning specializations', 'Research papers', 'AI communities']
    },
    {
      title: 'MLOps & Production Deployment',
      description: 'Deploy and monitor ML systems at scale',
      timeline: '3 months',
      steps: [
        'Learn ML system design',
        'Implement data pipelines',
        'Master model deployment',
        'Understand A/B testing',
        'Implement monitoring and maintenance'
      ],
      tools: ['Docker', 'Kubernetes', 'MLflow', 'AWS/GCP ML services', 'Airflow'],
      resources: ['MLOps courses', 'System design for ML', 'Production ML case studies']
    }
  ],
  'product manager': [
    {
      title: 'Product Strategy Foundation',
      description: 'Learn product strategy and market analysis',
      timeline: '2 months',
      steps: [
        'Understand product lifecycle management',
        'Learn market research techniques',
        'Master competitive analysis',
        'Develop product vision framework',
        'Create a strategic product roadmap'
      ],
      tools: ['ProductPlan', 'SurveyMonkey', 'Miro/Mural', 'SWOT analysis', 'Roadmunk'],
      resources: ['Product strategy books', 'Market research guides', 'Industry reports']
    },
    {
      title: 'User Research & Prototyping',
      description: 'Conduct user research and create product prototypes',
      timeline: '3 months',
      steps: [
        'Master user interview techniques',
        'Create user personas',
        'Design customer journey maps',
        'Implement usability testing',
        'Develop low and high-fidelity prototypes'
      ],
      tools: ['Figma/Sketch', 'UserTesting', 'Maze', 'Lookback', 'Optimal Workshop'],
      resources: ['UX research courses', 'Prototyping tutorials', 'Usability testing guides']
    },
    {
      title: 'Agile Development & Execution',
      description: 'Lead agile teams and prioritize features',
      timeline: '3 months',
      steps: [
        'Master agile/scrum methodologies',
        'Learn sprint planning techniques',
        'Understand story writing and acceptance criteria',
        'Implement feature prioritization frameworks',
        'Lead a cross-functional team'
      ],
      tools: ['Jira', 'Trello', 'Confluence', 'Slack', 'Asana'],
      resources: ['Agile certifications', 'Scrum guides', 'Product management communities']
    },
    {
      title: 'Product Launch & Analytics',
      description: 'Plan and execute product launches with success metrics',
      timeline: '4 months',
      steps: [
        'Create go-to-market strategies',
        'Develop product positioning and messaging',
        'Implement product analytics',
        'Understand A/B testing',
        'Measure product success metrics'
      ],
      tools: ['Google Analytics', 'Amplitude', 'Mixpanel', 'Optimizely', 'Pendo'],
      resources: ['Product analytics courses', 'Launch playbooks', 'Growth marketing strategies']
    }
  ],
  'ux designer': [
    {
      title: 'UX Foundations',
      description: 'Master UX design principles and methods',
      timeline: '2 months',
      steps: [
        'Learn UX fundamentals and principles',
        'Understand design thinking methodology',
        'Master information architecture',
        'Study interaction design patterns',
        'Complete UX case studies'
      ],
      tools: ['Figma', 'Miro', 'Sketch', 'InVision', 'Adobe XD'],
      resources: ['UX design books', 'Design thinking courses', 'UX case studies']
    },
    {
      title: 'User Research & Testing',
      description: 'Conduct comprehensive user research and usability testing',
      timeline: '3 months',
      steps: [
        'Master user interview techniques',
        'Create user personas and journey maps',
        'Implement usability testing methods',
        'Analyze qualitative and quantitative data',
        'Present research findings effectively'
      ],
      tools: ['UserTesting', 'Lookback', 'Optimal Workshop', 'Maze', 'Hotjar'],
      resources: ['User research books', 'Usability testing guides', 'Research repositories']
    },
    {
      title: 'UI Design & Prototyping',
      description: 'Create engaging user interfaces and interactive prototypes',
      timeline: '3 months',
      steps: [
        'Master UI design principles',
        'Learn color theory and typography',
        'Create design systems and component libraries',
        'Develop responsive design layouts',
        'Build high-fidelity interactive prototypes'
      ],
      tools: ['Figma', 'Sketch', 'Adobe XD', 'InVision Studio', 'Principle'],
      resources: ['UI design courses', 'Design system guides', 'Prototyping tutorials']
    },
    {
      title: 'Professional UX Portfolio',
      description: 'Build a compelling UX portfolio showcasing your skills and process',
      timeline: '2 months',
      steps: [
        'Document your design process',
        'Create case studies of your projects',
        'Develop a personal UX brand',
        'Build an online portfolio website',
        'Prepare for UX interviews and presentations'
      ],
      tools: ['Figma', 'Webflow', 'Notion', 'Wix/Squarespace', 'Behance/Dribbble'],
      resources: ['Portfolio courses', 'UX writing guides', 'Case study templates']
    }
  ],
  'ux': [
    {
      title: 'UX Foundations',
      description: 'Master UX design principles and methods',
      timeline: '2 months',
      steps: [
        'Learn UX fundamentals and principles',
        'Understand design thinking methodology',
        'Master information architecture',
        'Study interaction design patterns',
        'Complete UX case studies'
      ],
      tools: ['Figma', 'Miro', 'Sketch', 'InVision', 'Adobe XD'],
      resources: ['UX design books', 'Design thinking courses', 'UX case studies']
    },
    {
      title: 'User Research & Testing',
      description: 'Conduct comprehensive user research and usability testing',
      timeline: '3 months',
      steps: [
        'Master user interview techniques',
        'Create user personas and journey maps',
        'Implement usability testing methods',
        'Analyze qualitative and quantitative data',
        'Present research findings effectively'
      ],
      tools: ['UserTesting', 'Lookback', 'Optimal Workshop', 'Maze', 'Hotjar'],
      resources: ['User research books', 'Usability testing guides', 'Research repositories']
    },
    {
      title: 'UI Design & Prototyping',
      description: 'Create engaging user interfaces and interactive prototypes',
      timeline: '3 months',
      steps: [
        'Master UI design principles',
        'Learn color theory and typography',
        'Create design systems and component libraries',
        'Develop responsive design layouts',
        'Build high-fidelity interactive prototypes'
      ],
      tools: ['Figma', 'Sketch', 'Adobe XD', 'InVision Studio', 'Principle'],
      resources: ['UI design courses', 'Design system guides', 'Prototyping tutorials']
    },
    {
      title: 'Professional UX Portfolio',
      description: 'Build a compelling UX portfolio showcasing your skills and process',
      timeline: '2 months',
      steps: [
        'Document your design process',
        'Create case studies of your projects',
        'Develop a personal UX brand',
        'Build an online portfolio website',
        'Prepare for UX interviews and presentations'
      ],
      tools: ['Figma', 'Webflow', 'Notion', 'Wix/Squarespace', 'Behance/Dribbble'],
      resources: ['Portfolio courses', 'UX writing guides', 'Case study templates']
    }
  ],
  'marketing manager': [
    {
      title: 'Marketing Strategy Foundation',
      description: 'Develop comprehensive marketing strategies',
      timeline: '2 months',
      steps: [
        'Master market research techniques',
        'Create customer personas',
        'Develop brand positioning',
        'Implement competitive analysis',
        'Build marketing plans'
      ],
      tools: ['Google Analytics', 'SurveyMonkey', 'SEMrush', 'Miro', 'HubSpot'],
      resources: ['Marketing strategy books', 'Brand positioning courses', 'Industry reports']
    },
    {
      title: 'Digital Marketing Channels',
      description: 'Master key digital marketing channels',
      timeline: '3 months',
      steps: [
        'Implement SEO best practices',
        'Create content marketing strategies',
        'Master social media marketing',
        'Develop email marketing campaigns',
        'Understand paid advertising (PPC)'
      ],
      tools: ['Ahrefs/SEMrush', 'Hootsuite/Buffer', 'Mailchimp', 'Google Ads', 'Facebook Ads Manager'],
      resources: ['Digital marketing courses', 'SEO guides', 'Content strategy playbooks']
    },
    {
      title: 'Marketing Analytics & Optimization',
      description: 'Analyze marketing performance and optimize campaigns',
      timeline: '3 months',
      steps: [
        'Set up marketing analytics tracking',
        'Create performance dashboards',
        'Master A/B testing methodologies',
        'Implement conversion rate optimization',
        'Calculate marketing ROI'
      ],
      tools: ['Google Analytics', 'Hotjar', 'Optimizely', 'Tableau/Power BI', 'Attribution tools'],
      resources: ['Analytics certification', 'CRO courses', 'Marketing measurement frameworks']
    },
    {
      title: 'Integrated Marketing Campaigns',
      description: 'Plan and execute multi-channel marketing campaigns',
      timeline: '4 months',
      steps: [
        'Develop integrated campaign strategies',
        'Create consistent messaging across channels',
        'Implement marketing automation',
        'Manage campaign budgets',
        'Measure and report campaign success'
      ],
      tools: ['HubSpot', 'Salesforce Marketing Cloud', 'Asana/Monday', 'Canva/Adobe Creative Suite', 'Sprout Social'],
      resources: ['Campaign management courses', 'Marketing automation certifications', 'Media planning guides']
    }
  ],
  'project manager': [
    {
      title: 'Project Management Foundation',
      description: 'Master project management fundamentals',
      timeline: '2 months',
      steps: [
        'Learn project management methodologies',
        'Understand project lifecycle phases',
        'Develop project charters and scopes',
        'Create work breakdown structures',
        'Master stakeholder management'
      ],
      tools: ['Microsoft Project', 'Asana', 'Trello', 'JIRA', 'Confluence'],
      resources: ['PMBOK Guide', 'Project management courses', 'Methodology frameworks']
    },
    {
      title: 'Agile Project Management',
      description: 'Implement agile methodologies and frameworks',
      timeline: '3 months',
      steps: [
        'Master Scrum framework',
        'Learn Kanban methodology',
        'Implement sprint planning',
        'Facilitate retrospectives',
        'Develop agile metrics and reporting'
      ],
      tools: ['JIRA', 'Trello', 'Asana', 'Miro', 'Slack'],
      resources: ['Scrum Guide', 'Agile certifications', 'Kanban method guides']
    },
    {
      title: 'Project Execution & Control',
      description: 'Successfully execute and control projects',
      timeline: '4 months',
      steps: [
        'Implement project schedules',
        'Manage project resources',
        'Monitor project progress',
        'Implement change control processes',
        'Master risk management'
      ],
      tools: ['Microsoft Project', 'Smartsheet', 'Resource management tools', 'Risk registers', 'EVM tools'],
      resources: ['Execution management courses', 'Change control frameworks', 'Risk management guides']
    },
    {
      title: 'Advanced PM Leadership',
      description: 'Develop leadership skills and manage complex projects',
      timeline: '3 months',
      steps: [
        'Lead cross-functional teams',
        'Implement program management',
        'Master stakeholder communication',
        'Develop strategic project alignment',
        'Conduct project performance reviews'
      ],
      tools: ['Leadership assessment tools', 'Communication platforms', 'Program management software', 'Portfolio dashboards'],
      resources: ['Leadership courses', 'Program management guides', 'Stakeholder management frameworks']
    }
  ]
};

// Default milestones if role isn't found
const defaultMilestones = [
  {
    title: 'Skill Assessment & Planning',
    description: 'Evaluate current skills and create learning plan',
    timeline: '2 weeks',
    steps: [
      'Assess current skill level',
      'Identify skill gaps',
      'Research learning resources',
      'Create a learning schedule',
      'Set measurable goals'
    ],
    tools: ['Skill assessment tools', 'Learning platforms', 'Goal tracking apps'],
    resources: ['Skill assessment guides', 'Learning path templates', 'Career planning resources']
  },
  {
    title: 'Core Competency Development',
    description: 'Build fundamental skills for your role',
    timeline: '3 months',
    steps: [
      'Master essential theories and concepts',
      'Complete fundamental tutorials',
      'Build small practice projects',
      'Participate in learning communities',
      'Get feedback on progress'
    ],
    tools: ['Learning platforms', 'Practice environments', 'Community forums'],
    resources: ['Fundamental courses', 'Practice exercises', 'Community support']
  },
  {
    title: 'Practical Application',
    description: 'Apply skills through projects and real-world scenarios',
    timeline: '3 months',
    steps: [
      'Design personal projects',
      'Implement learned skills',
      'Troubleshoot challenges',
      'Document your process',
      'Present your work'
    ],
    tools: ['Project management tools', 'Development environments', 'Documentation platforms'],
    resources: ['Project ideas', 'Implementation guides', 'Portfolio templates']
  }
];

// Helper function to generate a unique ID
const generateId = () => {
  return `milestone-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Create actionable steps from string array
const createStepsFromArray = (stepsArray: string[] = []): Array<{id: string; description: string; completed: boolean}> => {
  return stepsArray.map(step => ({
    id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    description: step,
    completed: false
  }));
};

// Create tools from string array
const createToolsFromArray = (toolsArray: string[] = []): Array<{id: string; name: string}> => {
  return toolsArray.map(tool => ({
    id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: tool
  }));
};

// Create resources from string array
const createResourcesFromArray = (resourcesArray: string[] = []): Array<{id: string; name: string}> => {
  return resourcesArray.map(resource => ({
    id: `resource-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: resource
  }));
};

// Helper to distribute skills across milestones
const distributeSkillsAcrossMilestones = (
  skills: Skill[] = [], 
  milestoneCount: number
): Skill[][] => {
  if (skills.length === 0) return Array(milestoneCount).fill([]);
  
  // Create a copy of skills to avoid mutating the original
  const skillsCopy = [...skills];
  const result: Skill[][] = [];
  
  // Calculate roughly how many skills per milestone
  const skillsPerMilestone = Math.max(1, Math.ceil(skillsCopy.length / milestoneCount));
  
  for (let i = 0; i < milestoneCount; i++) {
    if (skillsCopy.length === 0) {
      result.push([]);
      continue;
    }
    
    // Take the next batch of skills for this milestone
    const milestonesSkills = skillsCopy.splice(0, skillsPerMilestone);
    result.push(milestonesSkills);
  }
  
  return result;
};

export const generatePersonalizedMilestones = (
  desiredRole: string,
  currentState: string,
  budget: string,
  companySize: string,
  timeCommitment: string,
  selectedSkills: Skill[]
): Milestone[] => {
  // Normalize the role for case-insensitive matching
  const normalizedRole = desiredRole.toLowerCase();
  
  // Find matching role or use default
  let baseMilestones;
  for (const [role, milestones] of Object.entries(roleSpecificMilestones)) {
    if (normalizedRole.includes(role)) {
      baseMilestones = milestones;
      break;
    }
  }
  
  // If no matching role found, use default milestones
  if (!baseMilestones) {
    baseMilestones = defaultMilestones;
  }
  
  // Adjust timelines based on time commitment
  const timelineMultiplier = timelineAdjustments[timeCommitment] || 1;
  
  // Get company size specific adjustments
  const sizeAdjustments = companySizeAdjustments[companySize] || companySizeAdjustments['Small to medium'];
  
  // Get current state adjustments
  const stateAdjustments = currentStateAdjustments[currentState];

  // Get budget-specific resources
  const budgetResources = budgetBasedResources[budget] || budgetBasedResources['No budget'];
  
  // Distribute skills across milestones
  const distributedSkills = distributeSkillsAcrossMilestones(selectedSkills, baseMilestones.length);
  
  // Transform base milestones into personalized ones
  const personalizedMilestones = baseMilestones.map((base, index) => {
    // Adjust timeline
    const timelineParts = base.timeline.split(' ');
    const duration = parseInt(timelineParts[0]) * timelineMultiplier;
    const unit = timelineParts[1];
    
    // Enhance description based on company size
    let enhancedDescription = base.description;
    if (sizeAdjustments) {
      enhancedDescription += ` with focus on ${sizeAdjustments.focus.join(', ')}`;
    }
    
    // Combine resources from role-specific and budget-based
    const combinedResources = [
      ...(base.resources || []),
      ...budgetResources
    ];
    
    // Create milestone with all enhancements
    const milestone: Milestone = {
      id: generateId(),
      title: base.title,
      description: enhancedDescription,
      timeline: `${Math.round(duration)} ${unit}`,
      completed: false,
      progress: 0,
      skills: distributedSkills[index] || [],
      steps: createStepsFromArray(base.steps),
      tools: createToolsFromArray(base.tools),
      resources: createResourcesFromArray(combinedResources)
    };
    
    return milestone;
  });
  
  // Add state-specific milestones if available
  let finalMilestones = [...personalizedMilestones];
  
  if (stateAdjustments) {
    const stateSpecificMilestones = stateAdjustments.priority.map((priority, index) => {
      // Distribute remaining skills to state-specific milestones
      const stateSkills = selectedSkills.length > 0 
        ? selectedSkills.slice(0, Math.min(2, selectedSkills.length)) 
        : [];
      
      const additionalMilestone: Milestone = {
        id: generateId(),
        title: `${priority.charAt(0).toUpperCase() + priority.slice(1)}`,
        description: `Focus on ${priority} to address your current situation as ${currentState}`,
        timeline: '2 weeks',
        completed: false,
        progress: 0,
        skills: stateSkills,
        steps: createStepsFromArray([
          `Research ${priority} opportunities`,
          `Create a ${priority} plan`,
          `Connect with ${priority} resources`,
          `Implement initial ${priority} actions`,
          `Review progress on ${priority}`
        ]),
        tools: createToolsFromArray([
          `${priority} assessment tools`,
          `${priority} planning software`,
          `${priority} networking platforms`
        ]),
        resources: createResourcesFromArray(
          budgetResources.slice(0, 3).map(resource => `${resource} for ${priority}`)
        )
      };
      
      return additionalMilestone;
    });
    
    // Add state-specific milestones at the beginning
    finalMilestones = [...stateSpecificMilestones, ...personalizedMilestones];
  }
  
  return finalMilestones;
};
