
import { useState, useEffect } from 'react';
import { Skill, SkillProficiency, SkillCategory } from '@/context/RoadmapContext';

interface SkillGap {
  skillName: string;
  category: SkillCategory;
  importance: number; // 1-100
  currentLevel: SkillProficiency;
  recommendedResources?: string[];
}

interface SkillAnalytics {
  totalSkills: number;
  skillsByCategory: Record<string, number>;
  skillsByProficiency: Record<string, number>;
  topSkillGaps: SkillGap[];
  skillsToLearn: Skill[];
  skillsToImprove: Skill[];
  proficientSkills: Skill[];
}

// Simplified learning resources by skill category
const learningResources: Record<string, string[]> = {
  'technical': [
    'Udemy - Complete Tech Skills Bootcamp',
    'Coursera - Technical Skills Masterclass',
    'Pluralsight - Programming Fundamentals',
    'FreeCodeCamp - Full Stack Development',
  ],
  'soft': [
    'LinkedIn Learning - Communication Skills',
    'Coursera - Leadership and Management',
    'Udemy - Soft Skills for the Workplace',
    'Toastmasters - Public Speaking',
  ],
  'industry': [
    'Industry newsletters and blogs',
    'Udemy - Industry Knowledge Course',
    'Conferences and meetups',
    'Professional association memberships',
  ],
  'domain': [
    'Coursera - Domain Specialization',
    'Expert-led workshops',
    'O\'Reilly Books - Domain Expertise',
    'Professional certification programs',
  ],
  'business': [
    'Harvard Business Review courses',
    'Udemy - Business Skills',
    'Coursera - Business Fundamentals',
    'MBA courses on specific topics',
  ],
  'analytics': [
    'DataCamp - Data Analysis Courses',
    'Udemy - Data Analytics Bootcamp',
    'Coursera - Data Science Specialization',
    'Khan Academy - Statistics and Probability',
  ],
};

export function useSkillAnalytics(
  selectedSkills: Skill[],
  currentRole: string,
  desiredRole: string
): SkillAnalytics {
  const [analytics, setAnalytics] = useState<SkillAnalytics>({
    totalSkills: 0,
    skillsByCategory: {},
    skillsByProficiency: {},
    topSkillGaps: [],
    skillsToLearn: [],
    skillsToImprove: [],
    proficientSkills: [],
  });

  useEffect(() => {
    // Calculate analytics
    const totalSkills = selectedSkills.length;

    // Count skills by category
    const skillsByCategory: Record<string, number> = {};
    selectedSkills.forEach(skill => {
      const category = skill.category || 'uncategorized';
      skillsByCategory[category] = (skillsByCategory[category] || 0) + 1;
    });

    // Count skills by proficiency
    const skillsByProficiency: Record<string, number> = {
      'want-to-learn': 0,
      'want-to-improve': 0,
      'proficient': 0,
      'unspecified': 0,
    };
    
    const skillsToLearn: Skill[] = [];
    const skillsToImprove: Skill[] = [];
    const proficientSkills: Skill[] = [];

    selectedSkills.forEach(skill => {
      const proficiency = skill.proficiency || 'unspecified';
      skillsByProficiency[proficiency] = (skillsByProficiency[proficiency] || 0) + 1;
      
      if (proficiency === 'want-to-learn') skillsToLearn.push(skill);
      else if (proficiency === 'want-to-improve') skillsToImprove.push(skill);
      else if (proficiency === 'proficient') proficientSkills.push(skill);
    });

    // Generate simulated skill gaps based on current data
    // In a real app, this would come from a more sophisticated algorithm or API
    const topSkillGaps: SkillGap[] = generateSkillGaps(selectedSkills, currentRole, desiredRole);

    setAnalytics({
      totalSkills,
      skillsByCategory,
      skillsByProficiency,
      topSkillGaps,
      skillsToLearn,
      skillsToImprove,
      proficientSkills,
    });
  }, [selectedSkills, currentRole, desiredRole]);

  return analytics;
}

// Helper function to generate simulated skill gaps
function generateSkillGaps(
  selectedSkills: Skill[],
  currentRole: string,
  desiredRole: string
): SkillGap[] {
  // This would normally use a more sophisticated algorithm
  // For now we'll simulate some skill gaps based on proficiency
  const gaps: SkillGap[] = [];
  
  // Find skills marked as wanting to learn or improve
  selectedSkills.forEach(skill => {
    if (skill.proficiency === 'want-to-learn' || skill.proficiency === 'want-to-improve') {
      const importance = skill.proficiency === 'want-to-learn' ? 
        Math.floor(Math.random() * 30) + 70 : // Higher importance for skills to learn
        Math.floor(Math.random() * 40) + 50;  // Medium importance for skills to improve
      
      const recommendedResources = learningResources[skill.category || 'technical'] || 
        learningResources['technical'];

      gaps.push({
        skillName: skill.name,
        category: skill.category || 'technical',
        importance,
        currentLevel: skill.proficiency || 'want-to-learn',
        recommendedResources: recommendedResources.slice(0, 3), // Pick 3 random resources
      });
    }
  });
  
  // Sort by importance
  gaps.sort((a, b) => b.importance - a.importance);
  
  return gaps.slice(0, 5); // Return top 5 gaps
}
