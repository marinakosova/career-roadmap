import { DetailedResource } from '../resourceUtilities';

/**
 * Detailed resources for UX designers
 */
export const uxDesignerResources: Record<string, DetailedResource[]> = {
  'ux_foundations': [
    {
      name: 'Don\'t Make Me Think',
      url: 'https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515/',
      type: 'book',
      isPaid: true,
      description: 'Classic book on web usability principles'
    },
    {
      name: 'Interaction Design Foundation',
      url: 'https://www.interaction-design.org/',
      type: 'course',
      isPaid: true,
      description: 'Comprehensive UX design courses and resources'
    },
    {
      name: 'Laws of UX',
      url: 'https://lawsofux.com/',
      type: 'article',
      isPaid: false,
      description: 'Collection of UX principles for better design'
    },
    {
      name: 'Design System Examples',
      url: 'https://designsystemsrepo.com/design-systems/',
      type: 'article',
      isPaid: false,
      description: 'Collection of design systems to learn from'
    }
  ],
  'user_research': [
    {
      name: 'The User Experience Team of One',
      url: 'https://www.amazon.com/User-Experience-Team-One-Research/dp/1933820187/',
      type: 'book',
      isPaid: true,
      description: 'Guide to conducting UX research with limited resources'
    },
    {
      name: 'UserTesting',
      url: 'https://www.usertesting.com/',
      type: 'tool',
      isPaid: true,
      description: 'Platform for remote user testing'
    },
    {
      name: 'Lookback',
      url: 'https://www.lookback.io/',
      type: 'tool',
      isPaid: true,
      description: 'Tool for user research and interviews'
    },
    {
      name: 'UX Research Field Guide',
      url: 'https://www.userinterviews.com/ux-research-field-guide',
      type: 'article',
      isPaid: false,
      description: 'Comprehensive guide to UX research methods'
    }
  ],
  'ui_design': [
    {
      name: 'Figma',
      url: 'https://www.figma.com/',
      type: 'tool',
      isPaid: false,
      description: 'Collaborative design tool with free tier'
    },
    {
      name: 'Refactoring UI',
      url: 'https://refactoringui.com/',
      type: 'book',
      isPaid: true,
      description: 'Guide to designing beautiful user interfaces'
    },
    {
      name: 'UI Design Daily',
      url: 'https://uidesigndaily.com/',
      type: 'article',
      isPaid: false,
      description: 'Daily UI design inspiration'
    },
    {
      name: 'Design Systems 101',
      url: 'https://www.invisionapp.com/inside-design/guide-to-design-systems/',
      type: 'article',
      isPaid: false,
      description: 'Guide to creating design systems'
    }
  ],
  'portfolio': [
    {
      name: 'Dribbble',
      url: 'https://dribbble.com/',
      type: 'community',
      isPaid: false,
      description: 'Design community for sharing and discovering work'
    },
    {
      name: 'Behance',
      url: 'https://www.behance.net/',
      type: 'community',
      isPaid: false,
      description: 'Platform to showcase creative work'
    },
    {
      name: 'DesignCourse: Portfolio Building',
      url: 'https://designcourse.com/',
      type: 'course',
      isPaid: true,
      description: 'Course on building an effective design portfolio'
    },
    {
      name: 'UX Portfolio Formula',
      url: 'https://uxportfolioformula.com/',
      type: 'course',
      isPaid: true,
      description: 'Guide to creating a UX portfolio that gets interviews'
    }
  ]
};
