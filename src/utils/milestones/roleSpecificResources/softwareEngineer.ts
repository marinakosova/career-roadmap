
import { DetailedResource } from '../resourceUtilities';

/**
 * Detailed resources for software engineers
 */
export const softwareEngineerResources: Record<string, DetailedResource[]> = {
  'technical_foundation': [
    {
      name: 'Data Structures and Algorithms in JavaScript',
      url: 'https://frontendmasters.com/courses/data-structures-algorithms/',
      type: 'course',
      isPaid: true,
      description: 'Master core computer science concepts and implementations'
    },
    {
      name: 'Codecademy - Learn Programming',
      url: 'https://www.codecademy.com/learn/paths/computer-science',
      type: 'course',
      isPaid: true,
      description: 'Interactive courses for programming fundamentals'
    },
    {
      name: 'GitHub Learning Lab',
      url: 'https://lab.github.com/',
      type: 'tool',
      isPaid: false,
      description: 'Free, interactive tutorials for Git and GitHub'
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/',
      type: 'tool',
      isPaid: false,
      description: 'Practice coding problems and prepare for technical interviews'
    }
  ],
  'web_development': [
    {
      name: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/',
      type: 'article',
      isPaid: false,
      description: 'Comprehensive documentation for web technologies'
    },
    {
      name: 'Frontend Masters',
      url: 'https://frontendmasters.com/',
      type: 'course',
      isPaid: true,
      description: 'In-depth courses on frontend development'
    },
    {
      name: 'Full Stack Open',
      url: 'https://fullstackopen.com/en/',
      type: 'course',
      isPaid: false,
      description: 'Deep dive into modern web development'
    },
    {
      name: 'CSS-Tricks',
      url: 'https://css-tricks.com/',
      type: 'article',
      isPaid: false,
      description: 'Guides and articles on frontend development'
    }
  ],
  'project_implementation': [
    {
      name: 'React Documentation',
      url: 'https://react.dev/',
      type: 'article',
      isPaid: false,
      description: 'Official React documentation and tutorials'
    },
    {
      name: 'Node.js Documentation',
      url: 'https://nodejs.org/en/docs/',
      type: 'article',
      isPaid: false,
      description: 'Official Node.js documentation'
    },
    {
      name: 'MongoDB University',
      url: 'https://university.mongodb.com/',
      type: 'course',
      isPaid: false,
      description: 'Free courses on MongoDB database'
    },
    {
      name: 'AWS Documentation',
      url: 'https://docs.aws.amazon.com/',
      type: 'article',
      isPaid: false,
      description: 'Comprehensive documentation for AWS services'
    }
  ],
  'system_design': [
    {
      name: 'System Design Primer',
      url: 'https://github.com/donnemartin/system-design-primer',
      type: 'article',
      isPaid: false,
      description: 'Comprehensive guide to system design concepts'
    },
    {
      name: 'Designing Data-Intensive Applications',
      url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/',
      type: 'book',
      isPaid: true,
      description: 'Essential book for understanding large-scale system design'
    },
    {
      name: 'AWS Solutions Architect Associate Certification',
      url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
      type: 'certification',
      isPaid: true,
      description: 'Learn cloud architecture best practices'
    },
    {
      name: 'Docker Documentation',
      url: 'https://docs.docker.com/',
      type: 'article',
      isPaid: false,
      description: 'Official documentation for Docker containerization'
    }
  ]
};
