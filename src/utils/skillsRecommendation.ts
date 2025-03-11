import { SkillCategory, Skill, SkillProficiency } from '@/context/RoadmapContext';

export type SkillRelevance = 'essential' | 'recommended' | 'optional';

interface SkillDefinition {
  name: string;
  category: SkillCategory;
  relevance: SkillRelevance;
  score: number;
}

type RoleSkillsMap = Record<string, SkillDefinition[]>;

// Enhanced role skills dataset with relevance and importance scores
export const roleSkillsData: RoleSkillsMap = {
  'software developer': [
    { name: 'JavaScript', category: 'technical', relevance: 'essential', score: 95 },
    { name: 'React', category: 'technical', relevance: 'essential', score: 92 },
    { name: 'TypeScript', category: 'technical', relevance: 'essential', score: 90 },
    { name: 'Git', category: 'technical', relevance: 'essential', score: 88 },
    { name: 'Node.js', category: 'technical', relevance: 'recommended', score: 85 },
    { name: 'API Design', category: 'technical', relevance: 'recommended', score: 82 },
    { name: 'Problem Solving', category: 'soft', relevance: 'essential', score: 90 },
    { name: 'Communication', category: 'soft', relevance: 'essential', score: 88 },
    { name: 'Agile Methodology', category: 'industry', relevance: 'recommended', score: 80 },
    { name: 'System Design', category: 'domain', relevance: 'recommended', score: 78 },
  ],
  'frontend developer': [
    { name: 'JavaScript', category: 'technical', relevance: 'essential', score: 95 },
    { name: 'React', category: 'technical', relevance: 'essential', score: 92 },
    { name: 'HTML/CSS', category: 'technical', relevance: 'essential', score: 90 },
    { name: 'TypeScript', category: 'technical', relevance: 'recommended', score: 85 },
    { name: 'Responsive Design', category: 'technical', relevance: 'essential', score: 88 },
    { name: 'Web Performance', category: 'technical', relevance: 'recommended', score: 82 },
    { name: 'Version Control', category: 'technical', relevance: 'essential', score: 85 },
    { name: 'UI/UX Principles', category: 'domain', relevance: 'recommended', score: 80 },
  ],
  'product manager': [
    { name: 'Product Analytics', category: 'analytics', relevance: 'essential', score: 95 },
    { name: 'Customer Interviews', category: 'soft', relevance: 'essential', score: 94 },
    { name: 'A/B Testing', category: 'analytics', relevance: 'essential', score: 92 },
    { name: 'Product Roadmapping', category: 'business', relevance: 'essential', score: 95 },
    { name: 'Prototyping', category: 'technical', relevance: 'recommended', score: 85 },
    { name: 'User Stories', category: 'domain', relevance: 'essential', score: 90 },
    { name: 'Competitor Analysis', category: 'business', relevance: 'essential', score: 88 },
    { name: 'Prioritization', category: 'business', relevance: 'essential', score: 93 },
    { name: 'Growth Metrics', category: 'analytics', relevance: 'recommended', score: 86 },
    { name: 'Product Strategy', category: 'business', relevance: 'essential', score: 94 },
    { name: 'Technical Understanding', category: 'technical', relevance: 'recommended', score: 82 },
    { name: 'Stakeholder Management', category: 'soft', relevance: 'essential', score: 91 },
  ],
  'data scientist': [
    { name: 'Python', category: 'technical', relevance: 'essential', score: 95 },
    { name: 'Machine Learning', category: 'technical', relevance: 'essential', score: 94 },
    { name: 'SQL', category: 'technical', relevance: 'essential', score: 92 },
    { name: 'Statistics', category: 'analytics', relevance: 'essential', score: 93 },
    { name: 'Data Visualization', category: 'analytics', relevance: 'essential', score: 90 },
    { name: 'Deep Learning', category: 'technical', relevance: 'recommended', score: 85 },
    { name: 'Data Cleaning', category: 'technical', relevance: 'essential', score: 88 },
    { name: 'Feature Engineering', category: 'technical', relevance: 'essential', score: 87 },
    { name: 'Big Data', category: 'technical', relevance: 'recommended', score: 84 },
    { name: 'Data Ethics', category: 'domain', relevance: 'recommended', score: 82 },
  ],
  'ux designer': [
    { name: 'User Research', category: 'domain', relevance: 'essential', score: 95 },
    { name: 'Figma', category: 'technical', relevance: 'essential', score: 92 },
    { name: 'Wireframing', category: 'technical', relevance: 'essential', score: 90 },
    { name: 'Prototyping', category: 'technical', relevance: 'essential', score: 88 },
    { name: 'Design Systems', category: 'technical', relevance: 'recommended', score: 85 },
    { name: 'UI Design', category: 'technical', relevance: 'essential', score: 87 },
    { name: 'User Testing', category: 'soft', relevance: 'essential', score: 86 },
    { name: 'Adobe XD', category: 'technical', relevance: 'recommended', score: 82 },
  ],
  'marketing manager': [
    { name: 'SEO', category: 'technical', relevance: 'essential', score: 95 },
    { name: 'Content Strategy', category: 'technical', relevance: 'essential', score: 92 },
    { name: 'Social Media', category: 'technical', relevance: 'essential', score: 90 },
    { name: 'Analytics', category: 'analytics', relevance: 'essential', score: 88 },
    { name: 'Email Marketing', category: 'technical', relevance: 'essential', score: 87 },
    { name: 'Branding', category: 'technical', relevance: 'essential', score: 86 },
    { name: 'Campaign Management', category: 'technical', relevance: 'essential', score: 85 },
  ],
  'project manager': [
    { name: 'Agile', category: 'technical', relevance: 'essential', score: 95 },
    { name: 'Scrum', category: 'technical', relevance: 'essential', score: 92 },
    { name: 'Budgeting', category: 'technical', relevance: 'essential', score: 90 },
    { name: 'Risk Management', category: 'technical', relevance: 'essential', score: 88 },
    { name: 'Stakeholder Management', category: 'soft', relevance: 'essential', score: 87 },
    { name: 'Documentation', category: 'technical', relevance: 'essential', score: 86 },
    { name: 'Jira', category: 'technical', relevance: 'recommended', score: 84 },
  ]
};

// Universal skills that are valuable across roles
const universalSkills: SkillDefinition[] = [
  { name: 'Communication', category: 'soft', relevance: 'essential', score: 90 },
  { name: 'Problem Solving', category: 'soft', relevance: 'essential', score: 88 },
  { name: 'Time Management', category: 'soft', relevance: 'recommended', score: 85 },
  { name: 'Teamwork', category: 'soft', relevance: 'essential', score: 87 },
];

// Function to normalize role names for better matching
const normalizeRoleName = (role: string): string => {
  return role.toLowerCase()
    .replace(/[-_]/g, ' ')
    .trim();
};

// Function to find similar roles
const findSimilarRoles = (role: string): string[] => {
  const normalizedRole = normalizeRoleName(role);
  return Object.keys(roleSkillsData).filter(r => {
    const normalized = normalizeRoleName(r);
    return normalized.includes(normalizedRole) || 
           normalizedRole.includes(normalized) ||
           (normalized.includes('developer') && normalizedRole.includes('developer'));
  });
};

// Main recommendation function
export const getRecommendedSkills = (
  currentRole: string,
  desiredRole: string
): Array<Skill & { relevance: SkillRelevance; score: number }> => {
  const normalizedDesired = normalizeRoleName(desiredRole);
  const normalizedCurrent = normalizeRoleName(currentRole);
  
  // Get exact role skills or find similar roles
  const targetSkills = roleSkillsData[normalizedDesired] || 
    Object.entries(roleSkillsData)
      .find(([role]) => 
        role.includes(normalizedDesired) || 
        normalizedDesired.includes(role)
      )?.[1] ||
    [];
  
  // Get current role skills for transition bonus
  const currentSkills = roleSkillsData[normalizedCurrent] || [];
  
  // Score and sort skills
  const scoredSkills = targetSkills.map(skill => {
    // Apply transition bonus if skill exists in current role
    const transitionBonus = currentSkills.some(s => s.name === skill.name) ? 10 : 0;
    
    return {
      id: `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: skill.name,
      category: skill.category,
      relevance: skill.relevance,
      score: skill.score + transitionBonus,
      proficiency: undefined
    };
  });

  return scoredSkills.sort((a, b) => b.score - a.score);
};
