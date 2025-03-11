
// Types for Career Roadmap application

export type SkillProficiency = 'want-to-learn' | 'want-to-improve' | 'proficient' | undefined;
export type SkillCategory = 'technical' | 'soft' | 'industry' | 'domain' | 'business' | 'analytics' | undefined;

export interface Skill {
  id: string;
  name: string;
  selected?: boolean;
  proficiency?: SkillProficiency;
  category?: SkillCategory;
}

export interface ActionableStep {
  id: string;
  description: string;
  completed: boolean;
  deadline?: string;
}

export interface Tool {
  id: string;
  name: string;
}

export interface Resource {
  id: string;
  name: string;
  url?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  timeline: string;
  completed: boolean;
  progress: number;
  skills: Skill[];
  steps: ActionableStep[];
  tools: Tool[];
  resources: Resource[];
  feedback?: 'like' | 'dislike' | null;
}

export interface SavedRoadmap {
  id: string;
  title: string;
  createdAt: string;
  progress: number;
  milestones: Milestone[];
  desiredRole: string;
  budget?: string;
  companySize?: string;
  timeCommitment?: string;
  selectedSkills?: Skill[];
}

export interface RoadmapContextType {
  currentRole: string;
  setCurrentRole: React.Dispatch<React.SetStateAction<string>>;
  currentLevel: string;
  setCurrentLevel: React.Dispatch<React.SetStateAction<string>>;
  experience: string;
  setExperience: React.Dispatch<React.SetStateAction<string>>;
  desiredRole: string;
  setDesiredRole: React.Dispatch<React.SetStateAction<string>>;
  desiredLevel: string;
  setDesiredLevel: React.Dispatch<React.SetStateAction<string>>;
  background: string;
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  selectedSkills: Skill[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  currentState: string;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  desiredIndustry: string;
  setDesiredIndustry: React.Dispatch<React.SetStateAction<string>>;
  companySize: string;
  setCompanySize: React.Dispatch<React.SetStateAction<string>>;
  budget: string;
  setBudget: React.Dispatch<React.SetStateAction<string>>;
  timeCommitment: string;
  setTimeCommitment: React.Dispatch<React.SetStateAction<string>>;
  milestones: Milestone[];
  setMilestones: React.Dispatch<React.SetStateAction<Milestone[]>>;
  completedMilestones: number;
  setCompletedMilestones: React.Dispatch<React.SetStateAction<number>>;
  nextDeadline: string;
  setNextDeadline: React.Dispatch<React.SetStateAction<string>>;
  savedRoadmaps: SavedRoadmap[];
  setSavedRoadmaps: React.Dispatch<React.SetStateAction<SavedRoadmap[]>>;
  saveRoadmap: () => void;
  deleteRoadmap: (id: string) => void;
  loadRoadmap: (id: string) => void;
  swapMilestones: (indexA: number, indexB: number) => void;
  updateMilestoneStep: (milestoneId: string, stepId: string, updates: Partial<ActionableStep>) => void;
  addMilestoneStep: (milestoneId: string, step: Omit<ActionableStep, 'id'>) => void;
  deleteMilestoneStep: (milestoneId: string, stepId: string) => void;
  toggleMilestoneFeedback: (milestoneId: string, feedback: 'like' | 'dislike') => void;
  updateSkillProficiency: (skillName: string, proficiency: SkillProficiency) => void;
}
