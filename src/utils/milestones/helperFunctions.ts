
import { Skill } from '@/context/types';

/**
 * Helper function to generate a unique ID
 */
export const generateId = () => {
  return `milestone-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create actionable steps from string array
 */
export const createStepsFromArray = (stepsArray: string[] = []): Array<{id: string; description: string; completed: boolean}> => {
  return stepsArray.map(step => ({
    id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    description: step,
    completed: false
  }));
};

/**
 * Create tools from string array
 */
export const createToolsFromArray = (toolsArray: string[] = []): Array<{id: string; name: string}> => {
  return toolsArray.map(tool => ({
    id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: tool
  }));
};

/**
 * Create resources from string array
 * Handles resource strings in the format "Name - URL"
 */
export const createResourcesFromArray = (resourcesArray: string[] = []): Array<{id: string; name: string; url?: string}> => {
  return resourcesArray.map(resource => {
    // Check if resource contains URL (format: "Resource Name - https://example.com")
    const urlMatch = resource.match(/(.*?)\s*-\s*(https?:\/\/\S+)/);
    
    if (urlMatch) {
      return {
        id: `resource-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: urlMatch[1].trim(),
        url: urlMatch[2].trim()
      };
    }
    
    return {
      id: `resource-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: resource
    };
  });
};

/**
 * Helper to distribute skills across milestones
 */
export const distributeSkillsAcrossMilestones = (
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
