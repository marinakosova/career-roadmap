
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
