
import { DetailedResource } from '../resourceUtilities';

/**
 * Detailed resources for product managers
 */
export const productManagerResources: Record<string, DetailedResource[]> = {
  'product_strategy': [
    {
      name: 'Inspired: How to Create Tech Products Customers Love',
      url: 'https://www.amazon.com/INSPIRED-Create-Tech-Products-Customers/dp/1119387507/',
      type: 'book',
      isPaid: true,
      description: 'The definitive guide to creating successful products'
    },
    {
      name: 'Product School',
      url: 'https://productschool.com/free-product-management-resources/',
      type: 'article',
      isPaid: false,
      description: 'Free product management resources and guides'
    },
    {
      name: 'ProductPlan Roadmapping Tool',
      url: 'https://www.productplan.com/',
      type: 'tool',
      isPaid: true,
      description: 'Tool for creating and sharing product roadmaps'
    },
    {
      name: 'Mind the Product',
      url: 'https://www.mindtheproduct.com/',
      type: 'community',
      isPaid: false,
      description: 'Product management community with free resources'
    }
  ],
  'user_research': [
    {
      name: 'Just Enough Research',
      url: 'https://abookapart.com/products/just-enough-research',
      type: 'book',
      isPaid: true,
      description: 'Practical guide to conducting effective user research'
    },
    {
      name: 'UserTesting Platform',
      url: 'https://www.usertesting.com/',
      type: 'tool',
      isPaid: true,
      description: 'Tool for conducting remote user testing'
    },
    {
      name: 'Optimal Workshop',
      url: 'https://www.optimalworkshop.com/',
      type: 'tool',
      isPaid: true,
      description: 'Suite of user research tools'
    },
    {
      name: 'Nielsen Norman Group Articles',
      url: 'https://www.nngroup.com/articles/',
      type: 'article',
      isPaid: false,
      description: 'Research-based articles on user experience'
    }
  ],
  'agile_development': [
    {
      name: 'Scrum Guide',
      url: 'https://scrumguides.org/',
      type: 'article',
      isPaid: false,
      description: 'Official guide to the Scrum framework'
    },
    {
      name: 'Professional Scrum Product Owner Certification',
      url: 'https://www.scrum.org/professional-scrum-product-owner-certifications',
      type: 'certification',
      isPaid: true,
      description: 'Certification for product owners in Scrum teams'
    },
    {
      name: 'Jira Software',
      url: 'https://www.atlassian.com/software/jira',
      type: 'tool',
      isPaid: true,
      description: 'Project management tool for agile teams'
    },
    {
      name: 'Mountain Goat Software',
      url: 'https://www.mountaingoatsoftware.com/blog',
      type: 'article',
      isPaid: false,
      description: 'Blog with resources on agile and Scrum'
    }
  ],
  'product_analytics': [
    {
      name: 'Google Analytics Academy',
      url: 'https://analytics.google.com/analytics/academy/',
      type: 'course',
      isPaid: false,
      description: 'Free courses on Google Analytics'
    },
    {
      name: 'Amplitude Product Analytics',
      url: 'https://amplitude.com/',
      type: 'tool',
      isPaid: true,
      description: 'Product analytics platform'
    },
    {
      name: 'The Lean Product Playbook',
      url: 'https://leanproductplaybook.com/',
      type: 'book',
      isPaid: true,
      description: 'Guide to building products using Lean principles'
    },
    {
      name: 'Product Analytics Certification by Mixpanel',
      url: 'https://mixpanel.com/certificate/',
      type: 'certification',
      isPaid: false,
      description: 'Free certification on product analytics'
    }
  ]
};
