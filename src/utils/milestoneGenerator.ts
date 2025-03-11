
import { Milestone, Skill } from '@/context/types';
import { timelineAdjustments } from './milestones/timelineAdjustments';
import { companySizeAdjustments } from './milestones/companySizeAdjustments';
import { budgetBasedResources } from './milestones/budgetBasedResources';
import { currentStateAdjustments } from './milestones/currentStateAdjustments';
import { roleSpecificMilestones, defaultMilestones } from './milestones/roleSpecificMilestones';
import { roleSpecificResources, defaultResources } from './milestones/roleSpecificResources';
import { filterResourcesByBudget, DetailedResource } from './milestones/resourceUtilities';
import { 
  generateId, 
  createStepsFromArray, 
  createToolsFromArray, 
  createResourcesFromArray,
  distributeSkillsAcrossMilestones 
} from './milestones/helperFunctions';

/**
 * Get matching resources for a milestone title and role
 */
const getResourcesForMilestone = (
  milestoneTitleOrIndex: string | number, 
  role: string,
  budget: string
): DetailedResource[] => {
  // Normalize role
  const normalizedRole = role.toLowerCase();
  let result: DetailedResource[] = [];
  
  // Check if we have resources for this role
  const roleResources = Object.entries(roleSpecificResources).find(([key]) => 
    normalizedRole.includes(key)
  )?.[1];
  
  if (roleResources) {
    // If milestoneTitleOrIndex is a number, try to match to common resource categories
    if (typeof milestoneTitleOrIndex === 'number') {
      // Map index to common categories
      const commonCategories = [
        ['foundation', 'basic', 'fundamental', 'introduction', 'skill_assessment'],
        ['research', 'analysis', 'core_competency', 'data_analysis', 'ux_foundations'],
        ['implementation', 'development', 'execution', 'practical_application'],
        ['advanced', 'leadership', 'design', 'architecture', 'portfolio']
      ];
      
      // Use the index to find relevant category patterns
      const categoryPattern = commonCategories[Math.min(milestoneTitleOrIndex, commonCategories.length - 1)];
      
      // Find matching resources
      Object.entries(roleResources).forEach(([category, resources]) => {
        if (categoryPattern.some(pattern => category.toLowerCase().includes(pattern))) {
          result = [...result, ...resources];
        }
      });
    } else {
      // Try to find a direct match based on title
      const title = milestoneTitleOrIndex.toLowerCase();
      
      Object.entries(roleResources).forEach(([category, resources]) => {
        // Check if the milestone title matches any part of the category
        const categoryWords = category.split('_');
        if (
          categoryWords.some(word => title.includes(word)) || 
          title.includes(category.replace('_', ' '))
        ) {
          result = [...result, ...resources];
        }
      });
    }
  }
  
  // If no specific resources found, use default resources
  if (result.length === 0) {
    const defaultKeys = Object.keys(defaultResources);
    const defaultKey = typeof milestoneTitleOrIndex === 'number' 
      ? defaultKeys[Math.min(milestoneTitleOrIndex, defaultKeys.length - 1)]
      : defaultKeys[0];
    
    result = defaultResources[defaultKey];
  }
  
  // Filter resources by budget
  return filterResourcesByBudget(result, budget);
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
  
  // Find matching role milestones or use default
  let baseMilestones = defaultMilestones;
  for (const [role, milestones] of Object.entries(roleSpecificMilestones)) {
    if (normalizedRole.includes(role)) {
      baseMilestones = milestones;
      break;
    }
  }
  
  // Support specialist specific milestones
  if (normalizedRole.includes('support')) {
    baseMilestones = [
      {
        title: "Customer Support Foundation",
        description: "Master the basics of customer service and support fundamentals",
        timeline: "1 month",
        steps: [
          "Research industry standard customer service practices",
          "Learn to effectively communicate with different customer types",
          "Practice active listening techniques",
          "Study documentation best practices"
        ],
        tools: [
          "Zendesk Academy",
          "HubSpot Service Hub",
          "Customer service simulation tools"
        ],
        resources: [
          "Customer Support Handbook - Intercom",
          "Support Driven Community Resources"
        ]
      },
      {
        title: "Technical Knowledge Building",
        description: "Develop the technical expertise needed for effective support",
        timeline: "2 months",
        steps: [
          "Identify key technical areas to master",
          "Complete product/service training",
          "Learn troubleshooting methodologies",
          "Practice explaining technical concepts simply"
        ],
        tools: [
          "Knowledge base software",
          "Troubleshooting guides",
          "Help desk systems"
        ],
        resources: [
          "Technical Support Fundamentals - Coursera",
          "IT Support Professional Certificate"
        ]
      },
      {
        title: "Support Process Mastery",
        description: "Learn to handle support tickets efficiently and effectively",
        timeline: "1 month",
        steps: [
          "Master ticket management workflows",
          "Learn prioritization techniques",
          "Study escalation processes",
          "Practice multi-tasking efficiently"
        ],
        tools: [
          "Ticketing systems",
          "SLA management tools",
          "Internal knowledge bases"
        ],
        resources: [
          "The Definitive Guide to Support Ticketing Systems",
          "ITIL Foundation training materials"
        ]
      },
      {
        title: "Customer Success Strategies",
        description: "Move beyond reactive support to proactive customer success",
        timeline: "2 months",
        steps: [
          "Learn to identify potential customer issues before they occur",
          "Create customer onboarding materials",
          "Develop customer check-in strategies",
          "Build a customer feedback collection system"
        ],
        tools: [
          "Customer success platforms",
          "User analytics tools",
          "Customer feedback software"
        ],
        resources: [
          "Customer Success: How Innovative Companies Are Reducing Churn",
          "The Customer Success Professional's Handbook"
        ]
      }
    ];
  }
  
  // Get time commitment multiplier
  const timelineMultiplier = timelineAdjustments[timeCommitment] || 1;
  
  // Get company size specific adjustments
  const sizeAdjustments = companySizeAdjustments[companySize] || companySizeAdjustments['Small to medium'];
  
  // Get current state adjustments
  const stateAdjustments = currentStateAdjustments[currentState];
  
  // Distribute skills across milestones
  const distributedSkills = distributeSkillsAcrossMilestones(selectedSkills, baseMilestones.length);
  
  // Transform base milestones into personalized ones
  const personalizedMilestones = baseMilestones.map((base, index) => {
    // Adjust timeline based on commitment
    const timelineParts = base.timeline.split(' ');
    const duration = parseInt(timelineParts[0]) * timelineMultiplier;
    const unit = timelineParts[1];
    
    // Enhance description with company size focus
    let enhancedDescription = base.description;
    if (sizeAdjustments?.focus) {
      enhancedDescription += ` with focus on ${sizeAdjustments.focus.join(', ')}`;
    }
    
    // Get personalized resources for this milestone
    const resources = getResourcesForMilestone(
      base.title.toLowerCase().includes('foundation') || base.title.toLowerCase().includes('basic') 
        ? index 
        : base.title,
      desiredRole,
      budget
    );
    
    // Create milestone with all enhancements
    const milestone: Milestone = {
      id: generateId(),
      title: base.title,
      description: enhancedDescription,
      timeline: `${Math.round(duration)} ${unit}`,
      completed: false,
      progress: 0,
      skills: distributedSkills[index] || [],
      steps: createStepsFromArray(base.steps || []),
      tools: createToolsFromArray(base.tools || []),
      resources: createResourcesFromArray(
        resources.map(r => `${r.name} - ${r.url}`)
      )
    };
    
    return milestone;
  });
  
  // Add state-specific milestones if available
  let finalMilestones = [...personalizedMilestones];
  
  if (stateAdjustments?.priority && currentState) {
    const stateSpecificMilestones = stateAdjustments.priority.map((priority) => {
      // Get relevant resources for this priority
      const priorityKeywords = priority.split(' ');
      let resourcesForPriority: DetailedResource[] = [];
      
      // Try to find matching resources from all role resources
      const normalizedRole = desiredRole.toLowerCase();
      const roleResources = Object.entries(roleSpecificResources).find(([key]) => 
        normalizedRole.includes(key)
      )?.[1];
      
      if (roleResources) {
        Object.values(roleResources).forEach(resources => {
          resourcesForPriority = [
            ...resourcesForPriority,
            ...resources.filter(r => 
              priorityKeywords.some(keyword => 
                r.name.toLowerCase().includes(keyword) || 
                r.description?.toLowerCase().includes(keyword)
              )
            )
          ];
        });
      }
      
      // Filter by budget
      resourcesForPriority = filterResourcesByBudget(resourcesForPriority, budget);
      
      // If no specific resources found, use some defaults
      if (resourcesForPriority.length === 0) {
        resourcesForPriority = defaultResources.skill_assessment;
      }
      
      const additionalMilestone: Milestone = {
        id: generateId(),
        title: `${priority.charAt(0).toUpperCase() + priority.slice(1)}`,
        description: `Focus on ${priority} to address your current situation as ${currentState}`,
        timeline: '2 weeks',
        completed: false,
        progress: 0,
        skills: selectedSkills.slice(0, 2), // Add up to 2 relevant skills
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
          resourcesForPriority.map(r => `${r.name} - ${r.url}`)
        )
      };
      
      return additionalMilestone;
    });
    
    // Add state-specific milestones at the beginning
    finalMilestones = [...stateSpecificMilestones, ...personalizedMilestones];
  }
  
  return finalMilestones;
};
