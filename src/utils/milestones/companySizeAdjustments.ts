
/**
 * Company size specific adjustments
 */
export const companySizeAdjustments: Record<string, {
  focus: string[];
  additional: string[];
}> = {
  'Startup': {
    focus: ['versatility', 'rapid learning', 'autonomous work'],
    additional: ['startup culture', 'wearing multiple hats', 'fast-paced environment']
  },
  'Small to medium': {
    focus: ['specialization', 'team collaboration', 'process improvement'],
    additional: ['cross-functional work', 'direct impact', 'growth opportunities']
  },
  'Enterprise': {
    focus: ['enterprise systems', 'scalability', 'corporate processes'],
    additional: ['large-scale projects', 'stakeholder management', 'compliance']
  },
  'Startup (1-10)': {
    focus: ['versatility', 'rapid learning', 'autonomous work'],
    additional: ['startup culture', 'wearing multiple hats', 'fast-paced environment']
  },
  'Small (11-50)': {
    focus: ['specialization', 'team collaboration', 'process improvement'],
    additional: ['cross-functional work', 'direct impact', 'growth opportunities']
  },
  'Medium (51-200)': {
    focus: ['specialization', 'team collaboration', 'process improvement'],
    additional: ['cross-functional work', 'direct impact', 'growth opportunities']
  },
  'Large (201-1000)': {
    focus: ['enterprise systems', 'scalability', 'corporate processes'],
    additional: ['large-scale projects', 'stakeholder management', 'compliance']
  },
  'Enterprise (1000+)': {
    focus: ['enterprise systems', 'scalability', 'corporate processes'],
    additional: ['large-scale projects', 'stakeholder management', 'compliance']
  }
};
