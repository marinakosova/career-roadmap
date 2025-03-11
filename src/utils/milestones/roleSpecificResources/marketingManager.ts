
import { DetailedResource } from '../resourceUtilities';

/**
 * Detailed resources for marketing managers
 */
export const marketingManagerResources: Record<string, DetailedResource[]> = {
  'marketing_strategy': [
    {
      name: 'Marketing Strategy Course by Cornell',
      url: 'https://www.ecornell.com/certificates/marketing/marketing-strategy/',
      type: 'course',
      isPaid: true,
      description: 'Comprehensive marketing strategy course'
    },
    {
      name: 'HubSpot Academy',
      url: 'https://academy.hubspot.com/',
      type: 'course',
      isPaid: false,
      description: 'Free marketing courses and certifications'
    },
    {
      name: 'SurveyMonkey',
      url: 'https://www.surveymonkey.com/',
      type: 'tool',
      isPaid: true,
      description: 'Tool for conducting market research surveys'
    },
    {
      name: 'Marketing Research Kit by SEMrush',
      url: 'https://www.semrush.com/market-research/',
      type: 'tool',
      isPaid: true,
      description: 'Tools for market and competitor research'
    }
  ],
  'digital_marketing': [
    {
      name: 'Google Digital Marketing & E-commerce Certificate',
      url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce',
      type: 'certification',
      isPaid: true,
      description: 'Comprehensive digital marketing certification by Google'
    },
    {
      name: 'Ahrefs Academy',
      url: 'https://ahrefs.com/academy',
      type: 'course',
      isPaid: false,
      description: 'Free SEO courses and tutorials'
    },
    {
      name: 'Hootsuite Academy',
      url: 'https://education.hootsuite.com/',
      type: 'certification',
      isPaid: true,
      description: 'Social media marketing courses and certification'
    },
    {
      name: 'Mailchimp Marketing Library',
      url: 'https://mailchimp.com/resources/',
      type: 'article',
      isPaid: false,
      description: 'Free marketing guides and resources'
    }
  ],
  'marketing_analytics': [
    {
      name: 'Google Analytics Certification',
      url: 'https://skillshop.exceedlms.com/student/path/2938',
      type: 'certification',
      isPaid: false,
      description: 'Free certification for Google Analytics'
    },
    {
      name: 'Tableau for Marketing Analytics',
      url: 'https://www.tableau.com/learn/training',
      type: 'course',
      isPaid: false,
      description: 'Free training for data visualization with Tableau'
    },
    {
      name: 'Hotjar',
      url: 'https://www.hotjar.com/',
      type: 'tool',
      isPaid: true,
      description: 'User behavior analytics and feedback tool'
    },
    {
      name: 'Marketing Metrics: The Definitive Guide',
      url: 'https://www.amazon.com/Marketing-Metrics-Definitive-Measuring-Performance/dp/0137058292',
      type: 'book',
      isPaid: true,
      description: 'Comprehensive guide to marketing measurement'
    }
  ],
  'marketing_campaigns': [
    {
      name: 'HubSpot Marketing Hub',
      url: 'https://www.hubspot.com/products/marketing',
      type: 'tool',
      isPaid: true,
      description: 'All-in-one marketing automation software'
    },
    {
      name: 'Salesforce Marketing Cloud Guide',
      url: 'https://help.salesforce.com/s/articleView?id=sf.mc_overview_marketing.htm',
      type: 'article',
      isPaid: false,
      description: 'Documentation for Salesforce Marketing Cloud'
    },
    {
      name: 'Canva Pro',
      url: 'https://www.canva.com/pro/',
      type: 'tool',
      isPaid: true,
      description: 'Design tool for creating marketing materials'
    },
    {
      name: 'Content Marketing Institute',
      url: 'https://contentmarketinginstitute.com/',
      type: 'community',
      isPaid: false,
      description: 'Resources and community for content marketing'
    }
  ]
};
