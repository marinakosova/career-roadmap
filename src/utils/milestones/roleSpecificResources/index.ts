
import { softwareEngineerResources } from './softwareEngineer';
import { dataScientistResources } from './dataScientist';
import { productManagerResources } from './productManager';
import { uxDesignerResources } from './uxDesigner';
import { marketingManagerResources } from './marketingManager';
import { projectManagerResources } from './projectManager';
import { DetailedResource } from '../resourceUtilities';

/**
 * Role-specific resources organized by categories and milestones
 */
export const roleSpecificResources: Record<string, Record<string, DetailedResource[]>> = {
  'software engineer': softwareEngineerResources,
  'software developer': softwareEngineerResources,
  'data scientist': dataScientistResources,
  'product manager': productManagerResources,
  'ux designer': uxDesignerResources,
  'ux': uxDesignerResources,
  'marketing manager': marketingManagerResources,
  'project manager': projectManagerResources
};

/**
 * Default resources for roles not specifically defined
 */
export const defaultResources: Record<string, DetailedResource[]> = {
  'skill_assessment': [
    {
      name: 'LinkedIn Learning',
      url: 'https://www.linkedin.com/learning/',
      type: 'course',
      isPaid: true,
      description: 'Platform with courses for various professional skills'
    },
    {
      name: 'Udemy',
      url: 'https://www.udemy.com/',
      type: 'course',
      isPaid: true,
      description: 'Online learning platform with courses on almost any topic'
    },
    {
      name: 'Career Planning Resources',
      url: 'https://www.indeed.com/career-advice',
      type: 'article',
      isPaid: false,
      description: 'Free career advice and planning resources'
    }
  ],
  'core_competency': [
    {
      name: 'Coursera',
      url: 'https://www.coursera.org/',
      type: 'course',
      isPaid: true,
      description: 'Platform with courses from universities and companies'
    },
    {
      name: 'Khan Academy',
      url: 'https://www.khanacademy.org/',
      type: 'course',
      isPaid: false,
      description: 'Free courses on various topics'
    },
    {
      name: 'Quora',
      url: 'https://www.quora.com/',
      type: 'community',
      isPaid: false,
      description: 'Q&A community for professional knowledge'
    }
  ],
  'practical_application': [
    {
      name: 'GitHub',
      url: 'https://github.com/',
      type: 'tool',
      isPaid: false,
      description: 'Platform for sharing and collaborating on code'
    },
    {
      name: 'Medium',
      url: 'https://medium.com/',
      type: 'article',
      isPaid: false,
      description: 'Platform with articles on various professional topics'
    },
    {
      name: 'Stack Overflow',
      url: 'https://stackoverflow.com/',
      type: 'community',
      isPaid: false,
      description: 'Community for technical questions and answers'
    }
  ]
};
