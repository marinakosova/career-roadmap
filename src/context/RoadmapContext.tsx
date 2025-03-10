
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface Skill {
  id: string;
  name: string;
  selected?: boolean;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  timeline: string;
  completed: boolean;
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
