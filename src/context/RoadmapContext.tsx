
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface Skill {
  id: string;
  name: string;
  selected?: boolean;
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

interface RoadmapContextType {
  currentRole: string;
  setCurrentRole: Dispatch<SetStateAction<string>>;
  currentLevel: string;
  setCurrentLevel: Dispatch<SetStateAction<string>>;
  experience: string;
  setExperience: Dispatch<SetStateAction<string>>;
  desiredRole: string;
  setDesiredRole: Dispatch<SetStateAction<string>>;
  desiredLevel: string;
  setDesiredLevel: Dispatch<SetStateAction<string>>;
  background: string;
  setBackground: Dispatch<SetStateAction<string>>;
  skills: Skill[];
  setSkills: Dispatch<SetStateAction<Skill[]>>;
  selectedSkills: Skill[];
  setSelectedSkills: Dispatch<SetStateAction<Skill[]>>;
  currentState: string;
  setCurrentState: Dispatch<SetStateAction<string>>;
  desiredIndustry: string;
  setDesiredIndustry: Dispatch<SetStateAction<string>>;
  companySize: string;
  setCompanySize: Dispatch<SetStateAction<string>>;
  budget: string;
  setBudget: Dispatch<SetStateAction<string>>;
  timeCommitment: string;
  setTimeCommitment: Dispatch<SetStateAction<string>>;
  milestones: Milestone[];
  setMilestones: Dispatch<SetStateAction<Milestone[]>>;
  completedMilestones: number;
  setCompletedMilestones: Dispatch<SetStateAction<number>>;
  nextDeadline: string;
  setNextDeadline: Dispatch<SetStateAction<string>>;
  swapMilestones: (indexA: number, indexB: number) => void;
  updateMilestoneStep: (milestoneId: string, stepId: string, updates: Partial<ActionableStep>) => void;
  addMilestoneStep: (milestoneId: string, step: Omit<ActionableStep, 'id'>) => void;
  deleteMilestoneStep: (milestoneId: string, stepId: string) => void;
  toggleMilestoneFeedback: (milestoneId: string, feedback: 'like' | 'dislike') => void;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export const RoadmapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [experience, setExperience] = useState('');
  const [desiredRole, setDesiredRole] = useState('');
  const [desiredLevel, setDesiredLevel] = useState('');
  const [background, setBackground] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [currentState, setCurrentState] = useState('');
  const [desiredIndustry, setDesiredIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [budget, setBudget] = useState('');
  const [timeCommitment, setTimeCommitment] = useState('');
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [completedMilestones, setCompletedMilestones] = useState(0);
  const [nextDeadline, setNextDeadline] = useState('');

  const swapMilestones = (indexA: number, indexB: number) => {
    setMilestones(prevMilestones => {
      const newMilestones = [...prevMilestones];
      [newMilestones[indexA], newMilestones[indexB]] = [newMilestones[indexB], newMilestones[indexA]];
      return newMilestones;
    });
  };

  const updateMilestoneStep = (milestoneId: string, stepId: string, updates: Partial<ActionableStep>) => {
    setMilestones(prevMilestones => {
      return prevMilestones.map(milestone => {
        if (milestone.id === milestoneId) {
          const updatedSteps = milestone.steps.map(step => 
            step.id === stepId ? { ...step, ...updates } : step
          );
          
          // Recalculate milestone progress
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
    });
    
    // Update completedMilestones count
    setMilestones(currentMilestones => {
      const completed = currentMilestones.filter(m => m.completed).length;
      setCompletedMilestones(completed);
      return currentMilestones;
    });
  };

  const addMilestoneStep = (milestoneId: string, step: Omit<ActionableStep, 'id'>) => {
    setMilestones(prevMilestones => {
      return prevMilestones.map(milestone => {
        if (milestone.id === milestoneId) {
          const newStep = {
            id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            ...step
          };
          const updatedSteps = [...milestone.steps, newStep];
          
          // Recalculate milestone progress
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
    });
  };

  const deleteMilestoneStep = (milestoneId: string, stepId: string) => {
    setMilestones(prevMilestones => {
      return prevMilestones.map(milestone => {
        if (milestone.id === milestoneId) {
          const updatedSteps = milestone.steps.filter(step => step.id !== stepId);
          
          // Recalculate milestone progress
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
    });
    
    // Update completedMilestones count
    setMilestones(currentMilestones => {
      const completed = currentMilestones.filter(m => m.completed).length;
      setCompletedMilestones(completed);
      return currentMilestones;
    });
  };

  const toggleMilestoneFeedback = (milestoneId: string, feedback: 'like' | 'dislike') => {
    setMilestones(prevMilestones => {
      return prevMilestones.map(milestone => {
        if (milestone.id === milestoneId) {
          return { 
            ...milestone, 
            feedback: milestone.feedback === feedback ? null : feedback
          };
        }
        return milestone;
      });
    });
  };

  return (
    <RoadmapContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentLevel,
        setCurrentLevel,
        experience,
        setExperience,
        desiredRole,
        setDesiredRole,
        desiredLevel,
        setDesiredLevel,
        background,
        setBackground,
        skills,
        setSkills,
        selectedSkills,
        setSelectedSkills,
        currentState,
        setCurrentState,
        desiredIndustry,
        setDesiredIndustry,
        companySize,
        setCompanySize,
        budget,
        setBudget,
        timeCommitment,
        setTimeCommitment,
        milestones,
        setMilestones,
        completedMilestones,
        setCompletedMilestones,
        nextDeadline,
        setNextDeadline,
        swapMilestones,
        updateMilestoneStep,
        addMilestoneStep,
        deleteMilestoneStep,
        toggleMilestoneFeedback,
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmap = (): RoadmapContextType => {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
};
