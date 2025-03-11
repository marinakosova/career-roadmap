
import { DetailedResource } from '../resourceUtilities';

/**
 * Detailed resources for project managers
 */
export const projectManagerResources: Record<string, DetailedResource[]> = {
  'project_management_foundation': [
    {
      name: 'PMBOK Guide',
      url: 'https://www.pmi.org/pmbok-guide-standards',
      type: 'book',
      isPaid: true,
      description: 'Project Management Body of Knowledge - definitive guide'
    },
    {
      name: 'Google Project Management Certificate',
      url: 'https://www.coursera.org/professional-certificates/google-project-management',
      type: 'certification',
      isPaid: true,
      description: 'Comprehensive project management course by Google'
    },
    {
      name: 'Microsoft Project Tutorial',
      url: 'https://support.microsoft.com/en-us/project',
      type: 'article',
      isPaid: false,
      description: 'Official tutorials for Microsoft Project'
    },
    {
      name: 'Project Management Institute (PMI)',
      url: 'https://www.pmi.org/',
      type: 'community',
      isPaid: true,
      description: 'Global community for project management professionals'
    }
  ],
  'agile_project_management': [
    {
      name: 'Scrum Guide',
      url: 'https://scrumguides.org/',
      type: 'article',
      isPaid: false,
      description: 'Official guide to the Scrum framework'
    },
    {
      name: 'Certified ScrumMaster (CSM)',
      url: 'https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster',
      type: 'certification',
      isPaid: true,
      description: 'Certification for Scrum masters'
    },
    {
      name: 'Atlassian Agile Coach',
      url: 'https://www.atlassian.com/agile',
      type: 'article',
      isPaid: false,
      description: 'Comprehensive guides to agile methodologies'
    },
    {
      name: 'Jira Software',
      url: 'https://www.atlassian.com/software/jira',
      type: 'tool',
      isPaid: true,
      description: 'Project management tool for agile teams'
    }
  ],
  'project_execution': [
    {
      name: 'The Deadline: A Novel About Project Management',
      url: 'https://www.amazon.com/Deadline-Novel-About-Project-Management/dp/0932633390',
      type: 'book',
      isPaid: true,
      description: 'Novel that teaches project management principles'
    },
    {
      name: 'Smartsheet',
      url: 'https://www.smartsheet.com/',
      type: 'tool',
      isPaid: true,
      description: 'Work management platform for project execution'
    },
    {
      name: 'Project Risk Management',
      url: 'https://www.pmi.org/learning/library/project-risk-management',
      type: 'article',
      isPaid: false,
      description: 'Resources on managing project risks'
    },
    {
      name: 'Earned Value Management (EVM)',
      url: 'https://www.pmi.org/learning/library/earned-value-management-systems-analysis-8026',
      type: 'article',
      isPaid: false,
      description: 'Guide to implementing EVM in projects'
    }
  ],
  'leadership': [
    {
      name: 'Leadership on the Line',
      url: 'https://www.amazon.com/Leadership-Line-Staying-through-Dangers/dp/1578514371',
      type: 'book',
      isPaid: true,
      description: 'Guide to leadership challenges in project management'
    },
    {
      name: 'Crucial Conversations',
      url: 'https://www.vitalsmarts.com/crucial-conversations-training/',
      type: 'course',
      isPaid: true,
      description: 'Training on handling difficult conversations'
    },
    {
      name: 'Program Management Professional (PgMP)',
      url: 'https://www.pmi.org/certifications/program-management-pgmp',
      type: 'certification',
      isPaid: true,
      description: 'Advanced certification for program managers'
    },
    {
      name: 'Digital Project Manager',
      url: 'https://thedigitalprojectmanager.com/',
      type: 'community',
      isPaid: false,
      description: 'Community and resources for digital project managers'
    }
  ]
};
