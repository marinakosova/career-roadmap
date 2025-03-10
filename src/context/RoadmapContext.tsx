
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Skill {
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
  setCurrentRole: (role: string) => void;
  currentLevel: string;
  setCurrentLevel: (level: string) => void;
  experience: string;
  setExperience: (experience: string) => void;
  desiredRole: string;
  setDesiredRole: (role: string) => void;
  desiredLevel: string;
  setDesiredLevel: (level: string) => void;
  background: string;
  setBackground: (background: string) => void;
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  selectedSkills: Skill[];
  setSelectedSkills: (skills: Skill[]) => void;
  currentState: string;
  setCurrentState: (state: string) => void;
  desiredIndustry: string;
  setDesiredIndustry: (industry: string) => void;
  companySize: string;
  setCompanySize: (size: string) => void;
  budget: string;
  setBudget: (budget: string) => void;
  timeCommitment: string;
  setTimeCommitment: (time: string) => void;
  milestones: Milestone[];
  setMilestones: (milestones: Milestone[]) => void;
  completedMilestones: number;
  setCompletedMilestones: (count: number) => void;
  nextDeadline: string;
  setNextDeadline: (deadline: string) => void;
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
