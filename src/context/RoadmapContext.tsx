import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  RoadmapContextType, Skill, SkillProficiency, SkillCategory, 
  Milestone, ActionableStep, SavedRoadmap
} from './types';

import {
  STORAGE_KEY, CURRENT_ROADMAP_KEY,
  saveRoadmapsToStorage, loadRoadmapsFromStorage,
  saveCurrentRoadmapToStorage, loadCurrentRoadmapFromStorage,
  calculateNextDeadline, countCompletedMilestones
} from './roadmapStorage';

import {
  createNewRoadmap, swapMilestonesInArray, updateStepInMilestone,
  addStepToMilestone, deleteStepFromMilestone, toggleFeedbackForMilestone
} from './roadmapUtils';

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
  const [savedRoadmaps, setSavedRoadmaps] = useState<SavedRoadmap[]>([]);

  useEffect(() => {
    const loadedRoadmaps = loadRoadmapsFromStorage();
    if (loadedRoadmaps.length > 0) {
      setSavedRoadmaps(loadedRoadmaps);
    }
  }, []);

  useEffect(() => {
    const currentRoadmap = loadCurrentRoadmapFromStorage();
    if (currentRoadmap) {
      setDesiredRole(currentRoadmap.desiredRole || '');
      setMilestones(currentRoadmap.milestones || []);
      setBudget(currentRoadmap.budget || '');
      setCompanySize(currentRoadmap.companySize || '');
      setTimeCommitment(currentRoadmap.timeCommitment || '');
      
      if (currentRoadmap.selectedSkills) {
        setSelectedSkills(currentRoadmap.selectedSkills);
      }
      
      const completed = countCompletedMilestones(currentRoadmap.milestones || []);
      setCompletedMilestones(completed);
      
      const nextDeadlineDate = calculateNextDeadline(currentRoadmap.milestones || []);
      setNextDeadline(nextDeadlineDate);
    }
  }, []);

  useEffect(() => {
    saveRoadmapsToStorage(savedRoadmaps);
  }, [savedRoadmaps]);

  useEffect(() => {
    saveCurrentRoadmapToStorage(desiredRole, milestones, budget, companySize, timeCommitment, selectedSkills);
  }, [milestones, desiredRole, budget, companySize, timeCommitment, selectedSkills]);

  const saveRoadmap = () => {
    if (!desiredRole.trim() || milestones.length === 0) return;

    const newRoadmap = createNewRoadmap(desiredRole, milestones, budget, companySize, timeCommitment);

    setSavedRoadmaps(prev => {
      const existingIndex = prev.findIndex(r => r.id === newRoadmap.id);
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
      
      const completed = countCompletedMilestones(roadmap.milestones);
      setCompletedMilestones(completed);
      
      const nextDeadlineDate = calculateNextDeadline(roadmap.milestones);
      setNextDeadline(nextDeadlineDate);
      
      saveCurrentRoadmapToStorage(
        roadmap.desiredRole,
        roadmap.milestones,
        roadmap.budget || '',
        roadmap.companySize || '',
        roadmap.timeCommitment || ''
      );
    }
  };

  const swapMilestones = (indexA: number, indexB: number) => {
    setMilestones(prevMilestones => swapMilestonesInArray(prevMilestones, indexA, indexB));
  };

  const updateMilestoneStep = (milestoneId: string, stepId: string, updates: Partial<ActionableStep>) => {
    setMilestones(prevMilestones => {
      const updatedMilestones = updateStepInMilestone(prevMilestones, milestoneId, stepId, updates);
      const completed = countCompletedMilestones(updatedMilestones);
      setCompletedMilestones(completed);
      return updatedMilestones;
    });
  };

  const addMilestoneStep = (milestoneId: string, step: Omit<ActionableStep, 'id'>) => {
    setMilestones(prevMilestones => addStepToMilestone(prevMilestones, milestoneId, step));
  };

  const deleteMilestoneStep = (milestoneId: string, stepId: string) => {
    setMilestones(prevMilestones => {
      const updatedMilestones = deleteStepFromMilestone(prevMilestones, milestoneId, stepId);
      const completed = countCompletedMilestones(updatedMilestones);
      setCompletedMilestones(completed);
      return updatedMilestones;
    });
  };

  const toggleMilestoneFeedback = (milestoneId: string, feedback: 'like' | 'dislike') => {
    setMilestones(prevMilestones => toggleFeedbackForMilestone(prevMilestones, milestoneId, feedback));
  };

  const updateSkillProficiency = (skillName: string, proficiency: SkillProficiency) => {
    setSelectedSkills(prev => {
      return prev.map(skill => {
        if (skill.name === skillName) {
          return { ...skill, proficiency };
        }
        return skill;
      });
    });
    
    setMilestones(prev => {
      return prev.map(milestone => {
        const updatedSkills = milestone.skills.map(skill => {
          if (skill.name === skillName) {
            return { ...skill, proficiency };
          }
          return skill;
        });
        return { ...milestone, skills: updatedSkills };
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
        updateSkillProficiency,
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

export type { SkillProficiency } from './types';
export type { SkillCategory } from './types';
export type { Skill } from './types';
export type { ActionableStep } from './types';
export type { Tool } from './types';
export type { Resource } from './types';
export type { Milestone } from './types';
export type { SavedRoadmap } from './types';
