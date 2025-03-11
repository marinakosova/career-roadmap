
import { Milestone, ActionableStep, SavedRoadmap } from './types';

// Create a new roadmap
export const createNewRoadmap = (
  desiredRole: string,
  milestones: Milestone[],
  budget?: string,
  companySize?: string,
  timeCommitment?: string
): SavedRoadmap => {
  const overallProgress = milestones.length > 0
    ? Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)
    : 0;

  return {
    id: `roadmap-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: desiredRole,
    createdAt: new Date().toISOString(),
    progress: overallProgress,
    milestones: [...milestones],
    desiredRole,
    budget,
    companySize,
    timeCommitment
  };
};

// Swap milestones in an array
export const swapMilestonesInArray = (
  milestones: Milestone[],
  indexA: number,
  indexB: number
): Milestone[] => {
  const newMilestones = [...milestones];
  [newMilestones[indexA], newMilestones[indexB]] = [newMilestones[indexB], newMilestones[indexA]];
  return newMilestones;
};

// Update a step within a milestone
export const updateStepInMilestone = (
  milestones: Milestone[],
  milestoneId: string,
  stepId: string,
  updates: Partial<ActionableStep>
): Milestone[] => {
  return milestones.map(milestone => {
    if (milestone.id === milestoneId) {
      const updatedSteps = milestone.steps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      );
      
      const completedSteps = updatedSteps.filter(step => step.completed).length;
      const totalSteps = updatedSteps.length;
      const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
      
      return { 
        ...milestone, 
        steps: updatedSteps,
        progress,
        completed: progress === 100
      };
    }
    return milestone;
  });
};

// Add a new step to a milestone
export const addStepToMilestone = (
  milestones: Milestone[],
  milestoneId: string,
  step: Omit<ActionableStep, 'id'>
): Milestone[] => {
  return milestones.map(milestone => {
    if (milestone.id === milestoneId) {
      const newStep = {
        id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...step
      };
      const updatedSteps = [...milestone.steps, newStep];
      
      const completedSteps = updatedSteps.filter(step => step.completed).length;
      const totalSteps = updatedSteps.length;
      const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
      
      return { 
        ...milestone, 
        steps: updatedSteps,
        progress
      };
    }
    return milestone;
  });
};

// Delete a step from a milestone
export const deleteStepFromMilestone = (
  milestones: Milestone[],
  milestoneId: string,
  stepId: string
): Milestone[] => {
  return milestones.map(milestone => {
    if (milestone.id === milestoneId) {
      const updatedSteps = milestone.steps.filter(step => step.id !== stepId);
      
      const completedSteps = updatedSteps.filter(step => step.completed).length;
      const totalSteps = updatedSteps.length;
      const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
      
      return { 
        ...milestone, 
        steps: updatedSteps,
        progress,
        completed: progress === 100
      };
    }
    return milestone;
  });
};

// Toggle milestone feedback
export const toggleFeedbackForMilestone = (
  milestones: Milestone[],
  milestoneId: string,
  feedback: 'like' | 'dislike'
): Milestone[] => {
  return milestones.map(milestone => {
    if (milestone.id === milestoneId) {
      return { 
        ...milestone, 
        feedback: milestone.feedback === feedback ? null : feedback
      };
    }
    return milestone;
  });
};
