
import React from 'react';
import { BookOpen, MessageSquare, Target, Flag } from 'lucide-react';
import RoadmapChart from '../RoadmapChart';
import { marketData, salaryData } from '@/lib/chartData';

// A mapping of roles to similar roles
const similarRolesMap: Record<string, string[]> = {
  'Product Manager': ['Product Owner', 'Technical Product Manager', 'UX Product Manager', 'Digital Product Manager', 'Product Marketing Manager'],
  'Software Engineer': ['Frontend Developer', 'Backend Engineer', 'Full Stack Developer', 'DevOps Engineer', 'Mobile Developer'],
  'Frontend Engineer': ['UI Developer', 'Frontend Developer', 'Web Developer', 'JavaScript Developer', 'React Developer'],
  'Data Scientist': ['Data Analyst', 'Machine Learning Engineer', 'AI Researcher', 'Quantitative Analyst', 'Business Intelligence Analyst'],
  'UX Designer': ['UI Designer', 'Product Designer', 'Interaction Designer', 'User Researcher', 'Information Architect'],
  'Marketing Manager': ['Brand Manager', 'Digital Marketing Manager', 'Content Marketing Manager', 'Growth Marketer', 'SEO Specialist'],
  'Data Analyst': ['Business Analyst', 'Data Engineer', 'BI Developer', 'Analytics Specialist', 'Financial Analyst']
  // Add more role mappings as needed
};

// Default roles if desired role is not in the mapping
const defaultSimilarRoles = ['Related Role 1', 'Related Role 2', 'Related Role 3', 'Related Role 4', 'Related Role 5'];

export const OverviewSection = ({ desiredRole }: { desiredRole?: string }) => {
  // Get similar roles based on the desired role
  const getSimilarRoles = () => {
    if (!desiredRole) return defaultSimilarRoles;
    
    // Case-insensitive normalized comparison
    const normalizedDesiredRole = desiredRole.toLowerCase().trim();
    
    // Try direct matches first (case insensitive)
    for (const [key, roles] of Object.entries(similarRolesMap)) {
      if (key.toLowerCase() === normalizedDesiredRole) {
        return roles;
      }
    }
    
    // Try partial matches next
    for (const [key, roles] of Object.entries(similarRolesMap)) {
      // Check if the normalized desired role contains the key or vice versa
      if (normalizedDesiredRole.includes(key.toLowerCase()) || 
          key.toLowerCase().includes(normalizedDesiredRole)) {
        return roles;
      }
    }
    
    // Check for specific keywords
    const keywordMap: Record<string, string[]> = {
      'data': ['Data Analyst', 'Data Scientist', 'Data Engineer', 'Business Intelligence Analyst', 'Database Administrator'],
      'developer': ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer', 'DevOps Engineer'],
      'manager': ['Product Manager', 'Project Manager', 'Engineering Manager', 'Marketing Manager', 'Customer Success Manager'],
      'designer': ['UX Designer', 'UI Designer', 'Product Designer', 'Graphic Designer', 'Web Designer']
    };
    
    for (const [keyword, roles] of Object.entries(keywordMap)) {
      if (normalizedDesiredRole.includes(keyword)) {
        return roles;
      }
    }
    
    return defaultSimilarRoles;
  };
  
  const displayedSimilarRoles = getSimilarRoles();

  return (
    <div className="space-y-8">
      <RoadmapChart 
        data={marketData} 
        color="#9B87F5" 
        title="Market Projection" 
        description="Estimated number of job openings for your target role over the next 5 years"
        height={350}
        chartType="bar"
        yAxisLabel="Number of Jobs"
        xAxisLabel="Year"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RoadmapChart 
          data={salaryData} 
          color="#0EA5E9" 
          title="Salary Projection" 
          description="Expected salary range as you progress through different career levels"
          chartType="line"
          yAxisLabel="Annual Salary (USD)"
          xAxisLabel="Career Level"
        />
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Similar Roles to {desiredRole || "Your Desired Role"}</h3>
          <ul className="space-y-3">
            {displayedSimilarRoles.map((role, index) => (
              <li key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                <span>{role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const ResourcesSection = () => {
  const resources = [
    { icon: BookOpen, title: 'Online Courses', description: 'Comprehensive learning platforms to build your skills', items: ['Coursera', 'Udemy', 'LinkedIn Learning'] },
    { icon: MessageSquare, title: 'Communities', description: 'Connect with like-minded professionals', items: ['Reddit', 'Slack Communities', 'LinkedIn Groups'] },
    { icon: Target, title: 'Career Development', description: 'Tools to advance your professional growth', items: ['Resume Builders', 'Interview Practice', 'Networking Events'] },
    { icon: Flag, title: 'Industry Standards', description: 'Stay updated with the latest in your field', items: ['Industry Publications', 'Research Papers', 'Certification Programs'] }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resources.map((resource, index) => {
        const Icon = resource.icon;
        return (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start">
              <div className="p-3 rounded-full bg-secondary/50 mr-4">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <ul className="space-y-2">
                  {resource.items.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
