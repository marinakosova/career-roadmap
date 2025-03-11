
import { Milestone, Skill } from '@/context/types';
import { timelineAdjustments } from './milestones/timelineAdjustments';
import { companySizeAdjustments } from './milestones/companySizeAdjustments';
import { budgetBasedResources } from './milestones/budgetBasedResources';
import { currentStateAdjustments } from './milestones/currentStateAdjustments';
import { roleSpecificMilestones, defaultMilestones } from './milestones/roleSpecificMilestones';
import { 
  generateId, 
  createStepsFromArray, 
  createToolsFromArray, 
  createResourcesFromArray,
  distributeSkillsAcrossMilestones 
} from './milestones/helperFunctions';

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
  
  // Get time commitment multiplier
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
    // Adjust timeline based on commitment
    const timelineParts = base.timeline.split(' ');
    const duration = parseInt(timelineParts[0]) * timelineMultiplier;
    const unit = timelineParts[1];
    
    // Enhance description with company size focus
    let enhancedDescription = base.description;
    if (sizeAdjustments?.focus) {
      enhancedDescription += ` with focus on ${sizeAdjustments.focus.join(', ')}`;
    }
    
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
      resources: createResourcesFromArray([
        ...(base.resources || []),
        ...budgetResources
      ])
    };
    
    return milestone;
  });
  
  // Add state-specific milestones if available
  let finalMilestones = [...personalizedMilestones];
  
  if (stateAdjustments?.priority) {
    const stateSpecificMilestones = stateAdjustments.priority.map((priority) => {
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
