
/**
 * Utility functions and data for career resources
 */

// Resource types for better categorization
export type ResourceType = 'course' | 'book' | 'tool' | 'community' | 'article' | 'certification' | 'video' | 'podcast';

// Resource object with more detailed information
export interface DetailedResource {
  name: string;
  url: string;
  type: ResourceType;
  isPaid: boolean; // To filter based on budget
  description?: string;
}

// Budget tiers for resource filtering
export const budgetTiers = {
  'No budget': { maxPrice: 0 },
  'Limited budget': { maxPrice: 100 },
  'Flexible budget': { maxPrice: 1000 },
  '$0 (Free resources only)': { maxPrice: 0 },
  '$100-500': { maxPrice: 500 },
  '$500-1,000': { maxPrice: 1000 },
  '$1,000-5,000': { maxPrice: 5000 },
  '$5,000+': { maxPrice: 10000 }
};

// Helper function to filter resources based on budget
export const filterResourcesByBudget = (resources: DetailedResource[], budget: string): DetailedResource[] => {
  const budgetTier = budgetTiers[budget as keyof typeof budgetTiers] || budgetTiers['No budget'];
  
  return resources.filter(resource => {
    if (budgetTier.maxPrice === 0) {
      return !resource.isPaid;
    }
    return true; // If there's a budget, include all resources
  });
};

// Common resources that apply to multiple roles
export const commonResources: Record<string, DetailedResource[]> = {
  'leadership': [
    {
      name: 'Leadership in Practice',
      url: 'https://www.coursera.org/learn/leadership-skills',
      type: 'course',
      isPaid: true,
      description: 'Develop essential leadership skills for any profession'
    },
    {
      name: 'Harvard Business Review - Leadership Articles',
      url: 'https://hbr.org/topic/leadership',
      type: 'article',
      isPaid: false,
      description: 'Free articles on leadership best practices and trends'
    }
  ],
  'communication': [
    {
      name: 'Effective Communication Skills',
      url: 'https://www.linkedin.com/learning/communication-foundations',
      type: 'course',
      isPaid: true,
      description: 'Master the fundamentals of effective communication'
    },
    {
      name: 'Communication Tools for Distributed Teams',
      url: 'https://www.atlassian.com/blog/teamwork/communication-tools-for-remote-work',
      type: 'article',
      isPaid: false,
      description: 'Tools and tips for remote communication'
    }
  ],
  'project_management': [
    {
      name: 'Project Management Professional (PMP)',
      url: 'https://www.pmi.org/certifications/project-management-pmp',
      type: 'certification',
      isPaid: true,
      description: 'The gold standard in project management certifications'
    },
    {
      name: 'Agile Project Management Guide',
      url: 'https://www.atlassian.com/agile',
      type: 'article',
      isPaid: false,
      description: 'Comprehensive guide to agile methodologies'
    }
  ],
  'time_management': [
    {
      name: 'Time Management Fundamentals',
      url: 'https://www.linkedin.com/learning/time-management-fundamentals',
      type: 'course',
      isPaid: true,
      description: 'Learn to manage your time more effectively'
    },
    {
      name: 'Pomodoro Technique',
      url: 'https://todoist.com/productivity-methods/pomodoro-technique',
      type: 'article',
      isPaid: false,
      description: 'A time management method to enhance focus and productivity'
    }
  ]
};
