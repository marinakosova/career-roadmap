
import { SavedRoadmap, Milestone, ActionableStep } from './types';

// Storage keys
export const STORAGE_KEY = 'career_roadmaps';
export const CURRENT_ROADMAP_KEY = 'current_roadmap';

// Save roadmaps to localStorage
export const saveRoadmapsToStorage = (roadmaps: SavedRoadmap[]): void => {
  if (roadmaps.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roadmaps));
  }
};

// Load roadmaps from localStorage
export const loadRoadmapsFromStorage = (): SavedRoadmap[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error('Error loading saved roadmaps:', error);
    }
  }
  return [];
};

// Save current roadmap to localStorage
export const saveCurrentRoadmapToStorage = (
  desiredRole: string,
  milestones: Milestone[],
  budget: string,
  companySize: string,
  timeCommitment: string
): void => {
  if (milestones.length > 0) {
    const currentRoadmap = {
      desiredRole,
      milestones,
      budget,
      companySize,
      timeCommitment
    };
    localStorage.setItem(CURRENT_ROADMAP_KEY, JSON.stringify(currentRoadmap));
  }
};

// Load current roadmap from localStorage
export const loadCurrentRoadmapFromStorage = () => {
  const currentRoadmap = localStorage.getItem(CURRENT_ROADMAP_KEY);
  if (currentRoadmap) {
    try {
      return JSON.parse(currentRoadmap);
    } catch (error) {
      console.error('Error loading current roadmap:', error);
    }
  }
  return null;
};

// Calculate the next deadline from milestones
export const calculateNextDeadline = (milestones: Milestone[]): string => {
  const upcomingSteps = milestones
    .flatMap(m => m.steps)
    .filter((s: ActionableStep) => !s.completed && s.deadline);
  
  if (upcomingSteps.length > 0) {
    const sortedDeadlines = upcomingSteps.sort((a: ActionableStep, b: ActionableStep) => 
      new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime()
    );
    const nextDate = new Date(sortedDeadlines[0].deadline as string);
    return nextDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  } else {
    return 'No upcoming deadlines';
  }
};

// Calculate the number of completed milestones
export const countCompletedMilestones = (milestones: Milestone[]): number => {
  return milestones.filter(m => m.completed).length;
};
