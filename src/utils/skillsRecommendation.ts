import { SkillCategory, Skill, SkillProficiency } from '@/context/RoadmapContext';

export type SkillRelevance = 'essential' | 'recommended' | 'optional';

interface SkillDefinition {
  name: string;
  category: SkillCategory;
  relevance: SkillRelevance;
  score: number;
}

type RoleSkillsMap = Record<string, SkillDefinition[]>;

// Enhanced role mapping with variations and synonyms
const roleAliases: Record<string, string[]> = {
  'software developer': ['developer', 'software engineer', 'programmer', 'coder', 'web developer', 'frontend developer', 'backend developer', 'full stack developer'],
  'frontend developer': ['front end developer', 'frontend engineer', 'front-end developer', 'ui developer', 'client side developer'],
  'digital marketing': ['digital marketer', 'online marketing', 'digital marketing specialist', 'internet marketing'],
  'marketing manager': ['marketing director', 'marketing lead', 'head of marketing', 'marketing coordinator'],
  'product manager': ['product owner', 'product lead', 'technical product manager', 'digital product manager'],
  'data scientist': ['data analyst', 'data engineer', 'machine learning engineer', 'ai engineer'],
  'ux designer': ['user experience designer', 'ui/ux designer', 'product designer', 'interaction designer'],
  'project manager': ['project lead', 'project coordinator', 'program manager', 'delivery manager']
};

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

// Improved role name normalization with better matching
const normalizeRoleName = (role: string): string => {
  const normalized = role.toLowerCase()
    .replace(/[-_/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Check for exact match in roleSkillsData
  if (roleSkillsData[normalized]) {
    return normalized;
  }

  // Check against aliases
  for (const [mainRole, aliases] of Object.entries(roleAliases)) {
    if (aliases.some(alias => 
      normalized.includes(alias) || 
      alias.includes(normalized) ||
      calculateSimilarity(normalized, alias) > 0.8
    )) {
      return mainRole;
    }
  }

  return normalized;
};

// Helper function to calculate string similarity (Levenshtein distance based)
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const longerLength = longer.length;
  const levenshteinDistance = (str1: string, str2: string): number => {
    const costs: number[] = [];
    for (let i = 0; i <= str1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= str2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (str1.charAt(i - 1) !== str2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[str2.length] = lastValue;
    }
    return costs[str2.length];
  };
  
  return (longerLength - levenshteinDistance(longer, shorter)) / longerLength;
};

// Enhanced role matching with fallback strategy
const findBestMatchingRole = (role: string): string | null => {
  const normalizedRole = normalizeRoleName(role);
  
  // Direct match in roleSkillsData
  if (roleSkillsData[normalizedRole]) {
    return normalizedRole;
  }
  
  // Check aliases
  for (const [mainRole, aliases] of Object.entries(roleAliases)) {
    if (aliases.some(alias => normalizedRole.includes(alias) || alias.includes(normalizedRole))) {
      return mainRole;
    }
  }
  
  // Find best partial match using similarity
  let bestMatch = null;
  let highestSimilarity = 0;
  
  const allRoles = [
    ...Object.keys(roleSkillsData),
    ...Object.entries(roleAliases).flatMap(([_, aliases]) => aliases)
  ];
  
  for (const candidateRole of allRoles) {
    const similarity = calculateSimilarity(normalizedRole, candidateRole);
    if (similarity > highestSimilarity && similarity > 0.6) { // Threshold for similarity
      highestSimilarity = similarity;
      bestMatch = candidateRole;
    }
  }
  
  if (bestMatch) {
    // If best match is an alias, return its main role
    for (const [mainRole, aliases] of Object.entries(roleAliases)) {
      if (aliases.includes(bestMatch)) {
        return mainRole;
      }
    }
    return bestMatch;
  }
  
  return null;
};

// Main recommendation function with improved matching and scoring
export const getRecommendedSkills = (
  currentRole: string,
  desiredRole: string
): Array<Skill & { relevance: SkillRelevance; score: number }> => {
  const normalizedDesired = normalizeRoleName(desiredRole);
  const normalizedCurrent = normalizeRoleName(currentRole);
  
  // Find best matching role
  const bestMatchRole = findBestMatchingRole(normalizedDesired);
  
  let targetSkills: SkillDefinition[] = [];
  
  if (bestMatchRole && roleSkillsData[bestMatchRole]) {
    targetSkills = roleSkillsData[bestMatchRole];
    console.log(`Matched role "${desiredRole}" to "${bestMatchRole}"`);
  } else {
    console.log(`No direct match found for "${desiredRole}", using fallback mechanism`);
    // Find similar roles based on keywords
    const allRoles = Object.keys(roleSkillsData);
    const similarRoles = allRoles.filter(role => {
      const similarity = calculateSimilarity(normalizedDesired, role);
      return similarity > 0.5;
    });
    
    if (similarRoles.length > 0) {
      similarRoles.forEach(role => {
        targetSkills = [...targetSkills, ...roleSkillsData[role]];
      });
      console.log(`Found similar roles: ${similarRoles.join(', ')}`);
    } else {
      // Fallback to universal skills and category-based recommendations
      targetSkills = [...universalSkills];
      console.log('Using universal skills as fallback');
    }
  }
  
  // Get current role skills for transition bonus
  const currentSkills = roleSkillsData[normalizedCurrent] || [];
  
  // Score and sort skills
  const scoredSkills = targetSkills.map(skill => {
    // Apply transition bonus if skill exists in current role
    const transitionBonus = currentSkills.some(s => s.name === skill.name) ? 10 : 0;
    
    // Calculate contextual score based on role relevance
    const contextScore = skill.relevance === 'essential' ? 20 :
                        skill.relevance === 'recommended' ? 10 : 0;
    
    return {
      id: `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: skill.name,
      category: skill.category,
      relevance: skill.relevance,
      score: skill.score + transitionBonus + contextScore,
      proficiency: undefined
    };
  });

  // Remove duplicates and sort by score
  const uniqueSkills = Array.from(
    new Map(scoredSkills.map(item => [item.name, item])).values()
  ).sort((a, b) => b.score - a.score);

  return uniqueSkills;
};
