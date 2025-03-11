
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
  'digital marketing': [
    { name: 'SEO', category: 'technical', relevance: 'essential', score: 95 },
    { name: 'Content Marketing', category: 'business', relevance: 'essential', score: 93 },
    { name: 'Social Media Marketing', category: 'technical', relevance: 'essential', score: 92 },
    { name: 'Google Analytics', category: 'analytics', relevance: 'essential', score: 90 },
    { name: 'PPC Advertising', category: 'technical', relevance: 'essential', score: 88 },
    { name: 'Email Marketing', category: 'technical', relevance: 'essential', score: 87 },
    { name: 'Marketing Automation', category: 'technical', relevance: 'recommended', score: 85 },
    { name: 'Content Strategy', category: 'business', relevance: 'essential', score: 86 },
    { name: 'CRO (Conversion Rate Optimization)', category: 'analytics', relevance: 'recommended', score: 84 },
    { name: 'Data Analysis', category: 'analytics', relevance: 'essential', score: 85 },
    { name: 'Copywriting', category: 'business', relevance: 'essential', score: 88 },
    { name: 'Brand Management', category: 'business', relevance: 'recommended', score: 83 },
  ],
  'marketing': [
    { name: 'Marketing Strategy', category: 'business', relevance: 'essential', score: 95 },
    { name: 'Market Research', category: 'analytics', relevance: 'essential', score: 92 },
    { name: 'Brand Development', category: 'business', relevance: 'essential', score: 90 },
    { name: 'Content Creation', category: 'business', relevance: 'essential', score: 88 },
    { name: 'Social Media', category: 'technical', relevance: 'essential', score: 87 },
    { name: 'Digital Marketing', category: 'technical', relevance: 'essential', score: 86 },
    { name: 'Campaign Management', category: 'business', relevance: 'essential', score: 85 },
    { name: 'Analytics', category: 'analytics', relevance: 'essential', score: 88 },
    { name: 'Customer Segmentation', category: 'analytics', relevance: 'recommended', score: 84 },
    { name: 'Marketing Automation', category: 'technical', relevance: 'recommended', score: 83 },
  ],
  'marketing manager': [
    { name: 'SEO', category: 'technical', relevance: 'essential', score: 95 },
    { name: 'Content Strategy', category: 'technical', relevance: 'essential', score: 92 },
    { name: 'Social Media', category: 'technical', relevance: 'essential', score: 90 },
    { name: 'Analytics', category: 'analytics', relevance: 'essential', score: 88 },
    { name: 'Email Marketing', category: 'technical', relevance: 'essential', score: 87 },
    { name: 'Branding', category: 'technical', relevance: 'essential', score: 86 },
    { name: 'Campaign Management', category: 'technical', relevance: 'essential', score: 85 },
    { name: 'Team Leadership', category: 'soft', relevance: 'essential', score: 90 },
    { name: 'Budget Management', category: 'business', relevance: 'essential', score: 88 },
    { name: 'Strategic Planning', category: 'business', relevance: 'essential', score: 89 },
    { name: 'Project Management', category: 'business', relevance: 'recommended', score: 84 },
    { name: 'Stakeholder Communication', category: 'soft', relevance: 'essential', score: 86 },
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

// Function to find similar roles based on keywords
const findSimilarRolesByKeywords = (role: string): string[] => {
  const normalizedRole = normalizeRoleName(role);
  const roleKeywords: Record<string, string[]> = {
    'marketing': ['marketing', 'digital marketing', 'content', 'seo', 'social media', 'brand'],
    'software': ['software', 'developer', 'engineer', 'programming', 'coder', 'frontend', 'backend'],
    'data': ['data', 'analyst', 'scientist', 'analytics', 'statistics', 'machine learning'],
    'design': ['design', 'ux', 'ui', 'user experience', 'graphic', 'creative'],
    'product': ['product', 'manager', 'owner', 'management'],
    'project': ['project', 'manager', 'coordinator', 'management'],
  };

  // Check if normalizedRole contains any of the keywords
  for (const [category, keywords] of Object.entries(roleKeywords)) {
    for (const keyword of keywords) {
      if (normalizedRole.includes(keyword)) {
        // Return matching roles from that category
        return Object.keys(roleSkillsData).filter(r => 
          keywords.some(k => normalizeRoleName(r).includes(k))
        );
      }
    }
  }
  
  return [];
};

// Find the best matching role in our dataset
const findBestMatchingRole = (role: string): string | null => {
  const normalizedRole = normalizeRoleName(role);
  
  // Direct match
  if (roleSkillsData[normalizedRole]) {
    return normalizedRole;
  }
  
  // Check for partial matches
  for (const key of Object.keys(roleSkillsData)) {
    if (normalizedRole.includes(key) || key.includes(normalizedRole)) {
      return key;
    }
  }
  
  // Check for keyword-based matches
  const similarRoles = findSimilarRolesByKeywords(normalizedRole);
  if (similarRoles.length > 0) {
    return similarRoles[0];
  }
  
  return null;
};

// Main recommendation function
export const getRecommendedSkills = (
  currentRole: string,
  desiredRole: string
): Array<Skill & { relevance: SkillRelevance; score: number }> => {
  const normalizedDesired = normalizeRoleName(desiredRole);
  const normalizedCurrent = normalizeRoleName(currentRole);
  
  // Try to find best matching role
  const bestMatchRole = findBestMatchingRole(normalizedDesired);
  
  // Get target skills
  let targetSkills: SkillDefinition[] = [];
  
  if (bestMatchRole && roleSkillsData[bestMatchRole]) {
    targetSkills = roleSkillsData[bestMatchRole];
  } else {
    // Fallback to keyword-based matching
    const similarRoles = findSimilarRolesByKeywords(normalizedDesired);
    if (similarRoles.length > 0) {
      for (const similarRole of similarRoles) {
        if (roleSkillsData[similarRole]) {
          targetSkills = [...targetSkills, ...roleSkillsData[similarRole]];
          break;
        }
      }
    }
  }
  
  // If still no match, use universal skills as fallback
  if (targetSkills.length === 0) {
    targetSkills = universalSkills;
    
    // For complete fallback, add some general skills based on high-level categories
    if (normalizedDesired.includes('market')) {
      targetSkills = [...targetSkills, ...roleSkillsData['marketing']];
    } else if (normalizedDesired.includes('develop') || normalizedDesired.includes('program')) {
      targetSkills = [...targetSkills, ...roleSkillsData['software developer']];
    } else if (normalizedDesired.includes('data')) {
      targetSkills = [...targetSkills, ...roleSkillsData['data scientist']];
    } else if (normalizedDesired.includes('design')) {
      targetSkills = [...targetSkills, ...roleSkillsData['ux designer']];
    }
  }
  
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

  // Remove any duplicates (in case we combined skills from multiple sources)
  const uniqueSkills = Array.from(
    new Map(scoredSkills.map(item => [item.name, item])).values()
  );

  return uniqueSkills.sort((a, b) => b.score - a.score);
};
