
import { softwareEngineerMilestones } from './softwareEngineer';
import { dataScientistMilestones } from './dataScientist';
import { productManagerMilestones } from './productManager';
import { uxDesignerMilestones } from './uxDesigner';
import { marketingManagerMilestones } from './marketingManager';
import { projectManagerMilestones } from './projectManager';
import { defaultMilestones } from './defaultMilestones';

/**
 * Comprehensive role-specific milestones - greatly expanded for key roles
 */
export const roleSpecificMilestones: Record<string, Array<{
  title: string; 
  description: string; 
  timeline: string;
  steps: string[];
  tools: string[];
  resources: string[];
}>> = {
  'software engineer': softwareEngineerMilestones,
  'software developer': softwareEngineerMilestones,
  'data scientist': dataScientistMilestones,
  'product manager': productManagerMilestones,
  'ux designer': uxDesignerMilestones,
  'ux': uxDesignerMilestones,
  'marketing manager': marketingManagerMilestones,
  'project manager': projectManagerMilestones
};

export { defaultMilestones };
