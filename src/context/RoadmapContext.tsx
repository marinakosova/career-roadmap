import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';

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
  savedRoadmaps: SavedRoadmap[];
  setSavedRoadmaps: Dispatch<SetStateAction<SavedRoadmap[]>>;
  saveRoadmap: () => void;
  deleteRoadmap: (id: string) => void;
  loadRoadmap: (id: string) => void;
  swapMilestones: (indexA: number, indexB: number) => void;
  updateMilestoneStep: (milestoneId: string, stepId: string, updates: Partial<ActionableStep>) => void;
  addMilestoneStep: (milestoneId: string, step: Omit<ActionableStep, 'id'>) => void;
  deleteMilestoneStep: (milestoneId: string, stepId: string) => void;
  toggleMilestoneFeedback: (milestoneId: string, feedback: 'like' | 'dislike') => void;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

const STORAGE_KEY = 'career_roadmaps';

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
  const [savedRoadmaps, setSavedRoadmaps] = useState<SavedRoadmap[]>([]);

  useEffect(() => {
    const loadSavedRoadmaps = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsedData = JSON.parse(saved);
          setSavedRoadmaps(parsedData);
        } catch (error) {
          console.error('Error loading saved roadmaps:', error);
        }
      }
    };
    
    loadSavedRoadmaps();
  }, []);

  useEffect(() => {
    if (savedRoadmaps.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRoadmaps));
    }
  }, [savedRoadmaps]);

  const saveRoadmap = () => {
    if (!desiredRole.trim() || milestones.length === 0) return;

    const overallProgress = milestones.length > 0
      ? Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)
      : 0;

    const newRoadmap: SavedRoadmap = {
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

    setSavedRoadmaps(prev => {
      const existingIndex = prev.findIndex(r => r.title === desiredRole);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newRoadmap;
        return updated;
      } else {
        return [...prev, newRoadmap];
      }
    });
  };

  const deleteRoadmap = (id: string) => {
    setSavedRoadmaps(prev => prev.filter(roadmap => roadmap.id !== id));
  };

  const loadRoadmap = (id: string) => {
    const roadmap = savedRoadmaps.find(r => r.id === id);
    if (roadmap) {
      setDesiredRole(roadmap.desiredRole);
      setMilestones(roadmap.milestones);
      setBudget(roadmap.budget || '');
      setCompanySize(roadmap.companySize || '');
      setTimeCommitment(roadmap.timeCommitment || '');
      
      const completed = roadmap.milestones.filter(m => m.completed).length;
      setCompletedMilestones(completed);
      
      const upcomingSteps = roadmap.milestones
        .flatMap(m => m.steps)
        .filter(s => !s.completed && s.deadline);
      
      if (upcomingSteps.length > 0) {
        const nextDate = new Date(upcomingSteps[0].deadline as string);
        setNextDeadline(nextDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));
      } else {
        setNextDeadline('No upcoming deadlines');
      }
    }
  };

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
        savedRoadmaps,
        setSavedRoadmaps,
        saveRoadmap,
        deleteRoadmap,
        loadRoadmap,
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
