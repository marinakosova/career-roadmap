
import React, { useState, useEffect } from 'react';
import { Skill, SkillProficiency, SkillCategory } from '@/context/RoadmapContext';

interface SkillManagerProps {
  currentRole: string;
  suggestedSkills: Skill[];
  setSuggestedSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  selectedSkills: Skill[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  roleSkills: Record<string, Array<{ name: string, category: SkillCategory }>>;
}

const SkillManager: React.FC<SkillManagerProps> = ({
  currentRole,
  suggestedSkills,
  setSuggestedSkills,
  selectedSkills,
  setSelectedSkills,
  roleSkills
}) => {
  useEffect(() => {
    const normalizedRole = currentRole.toLowerCase().trim();
    
    if (normalizedRole && roleSkills[normalizedRole]) {
      const skills = roleSkills[normalizedRole].map(skill => ({
        id: `suggested-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: skill.name,
        category: skill.category,
        proficiency: undefined as SkillProficiency
      }));
      setSuggestedSkills(skills);
    } else {
      const allSkills = Object.values(roleSkills).flat();
      const uniqueSkillNames = [...new Set(allSkills.map(skill => skill.name))];
      const mixedSkills = uniqueSkillNames.slice(0, 15).map(name => {
        const originalSkill = allSkills.find(s => s.name === name);
        return { 
          id: `suggested-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name,
          category: originalSkill?.category || undefined,
          proficiency: undefined as SkillProficiency
        };
      });
      setSuggestedSkills(mixedSkills);
    }
  }, [currentRole, roleSkills, setSuggestedSkills]);

  const toggleSkill = (skill: Skill) => {
    setSelectedSkills(prev => {
      const existingSkill = prev.find(s => s.name === skill.name);
      
      if (existingSkill) {
        return prev.filter(s => s.name !== skill.name);
      } else {
        return [...prev, { 
          id: skill.id || `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
          name: skill.name, 
          selected: true,
          category: skill.category,
          proficiency: skill.proficiency || undefined as SkillProficiency
        }];
      }
    });
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
  };

  return { toggleSkill, updateSkillProficiency };
};

export default SkillManager;
