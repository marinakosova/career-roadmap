
import { DetailedResource, ResourceType } from './milestones/resourceUtilities';

interface ResourceGeneratorInput {
  desiredRole: string;
  budget: string;
  skills: string[];
  milestone: string;
}

const getResourceType = (milestone: string): ResourceType[] => {
  switch (milestone.toLowerCase()) {
    case 'skill assessment':
      return ['tool', 'article'];
    case 'learning path':
      return ['course', 'book'];
    case 'portfolio':
      return ['community', 'tool'];
    default:
      return ['article', 'course'];
  }
};

export const generateResources = ({
  desiredRole,
  budget,
  skills,
  milestone
}: ResourceGeneratorInput): DetailedResource[] => {
  const resourceTypes = getResourceType(milestone);
  const isPaid = !budget.includes('0');
  
  // Base resources that are always relevant
  const resources: DetailedResource[] = [
    {
      name: 'LinkedIn Learning Paths',
      url: 'https://www.linkedin.com/learning',
      type: 'course',
      isPaid: true,
      description: `Curated learning paths for ${desiredRole} roles`
    },
    {
      name: 'Industry Best Practices',
      url: 'https://medium.com/tag/career-advice',
      type: 'article',
      isPaid: false,
      description: 'Latest trends and practices in your field'
    }
  ];

  // Add skill-specific resources
  skills.forEach(skill => {
    resources.push({
      name: `${skill} Fundamentals`,
      url: `https://www.coursera.org/search?query=${encodeURIComponent(skill)}`,
      type: 'course',
      isPaid: true,
      description: `Master the fundamentals of ${skill}`
    });
  });

  // Filter based on budget
  return resources.filter(resource => !resource.isPaid || isPaid);
};
