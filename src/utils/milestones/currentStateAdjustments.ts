
/**
 * Current state adjustments
 */
export const currentStateAdjustments: Record<string, {
  priority: string[];
  additional: string[];
}> = {
  'I want to switch careers': {
    priority: ['skill assessment', 'industry research', 'networking'],
    additional: ['transferable skills analysis', 'career exploration sessions']
  },
  'I want to level up in my current role': {
    priority: ['advanced skills', 'leadership development', 'industry expertise'],
    additional: ['mentorship programs', 'specialization tracks']
  },
  'I don\'t like my current job': {
    priority: ['career counseling', 'work values assessment', 'job exploration'],
    additional: ['work-life balance strategies', 'stress management']
  },
  'I\'m a student/recent graduate': {
    priority: ['foundational skills', 'internships', 'portfolio building'],
    additional: ['entry-level certifications', 'networking events']
  },
  'I\'m thinking about career change': {
    priority: ['skill assessment', 'industry research', 'networking'],
    additional: ['transferable skills analysis', 'career exploration sessions']
  },
  'I decided to change career': {
    priority: ['skill development', 'portfolio building', 'interview preparation'],
    additional: ['industry-specific projects', 'professional networking']
  },
  'I\'m currently studying for my new career': {
    priority: ['structured learning', 'practical application', 'skill validation'],
    additional: ['study groups', 'project-based learning']
  },
  'I\'m currently networking & interviewing': {
    priority: ['interview skills', 'networking strategy', 'portfolio refinement'],
    additional: ['salary negotiation', 'company research']
  }
};
