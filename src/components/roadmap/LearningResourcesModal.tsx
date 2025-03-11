
import React from 'react';
import { X } from 'lucide-react';
import { SkillProficiency, SkillCategory } from '@/context/RoadmapContext';

interface LearningResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillName: string;
  proficiency?: SkillProficiency;
  category?: SkillCategory;
}

interface Resource {
  title: string;
  url: string;
  type: 'course' | 'article' | 'video' | 'book' | 'tool';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

const LearningResourcesModal: React.FC<LearningResourcesModalProps> = ({
  isOpen,
  onClose,
  skillName,
  proficiency,
  category
}) => {
  if (!isOpen) return null;
  
  const getResourcesForSkill = (
    skillName: string, 
    proficiency?: SkillProficiency,
    category?: SkillCategory
  ): Resource[] => {
    const normalizedSkill = skillName.toLowerCase();
    
    // General resources based on proficiency level
    const beginnerResources: Resource[] = [
      {
        title: "Beginner's Guide to Learning New Skills",
        url: "https://www.coursera.org/",
        type: "course",
        difficulty: "beginner",
        description: "Comprehensive introduction to learning techniques and methodologies."
      },
      {
        title: "Foundations: Step-by-Step Learning Approach",
        url: "https://www.udemy.com/",
        type: "course",
        difficulty: "beginner",
        description: "Learn the fundamentals with practical exercises and projects."
      }
    ];
    
    const intermediateResources: Resource[] = [
      {
        title: "Intermediate Skill Building Techniques",
        url: "https://www.pluralsight.com/",
        type: "course",
        difficulty: "intermediate",
        description: "Take your skills to the next level with advanced concepts and practice."
      },
      {
        title: "Project-Based Learning for Intermediate Practitioners",
        url: "https://www.linkedin.com/learning/",
        type: "course",
        difficulty: "intermediate",
        description: "Apply your knowledge through real-world projects and case studies."
      }
    ];
    
    const advancedResources: Resource[] = [
      {
        title: "Advanced Mastery Program",
        url: "https://www.edx.org/",
        type: "course",
        difficulty: "advanced",
        description: "Expert-level training with in-depth analysis and specialized techniques."
      },
      {
        title: "Professional Certification Path",
        url: "https://www.masterclass.com/",
        type: "course",
        difficulty: "advanced",
        description: "Become an expert through certification programs and specialized knowledge."
      }
    ];
    
    // Skill-specific resources
    const skillSpecificResources: Record<string, Resource[]> = {
      "javascript": [
        {
          title: "JavaScript.info",
          url: "https://javascript.info/",
          type: "article",
          difficulty: "beginner",
          description: "Modern JavaScript tutorial from basics to advanced topics."
        },
        {
          title: "Eloquent JavaScript",
          url: "https://eloquentjavascript.net/",
          type: "book",
          difficulty: "intermediate",
          description: "A comprehensive book on JavaScript programming."
        }
      ],
      "react": [
        {
          title: "React Official Documentation",
          url: "https://react.dev/",
          type: "article",
          difficulty: "beginner",
          description: "The official React documentation and tutorials."
        },
        {
          title: "Epic React by Kent C. Dodds",
          url: "https://epicreact.dev/",
          type: "course",
          difficulty: "advanced",
          description: "Workshop series about React from the fundamentals to advanced patterns."
        }
      ],
      "leadership": [
        {
          title: "Leadership in Practice",
          url: "https://www.coursera.org/learn/leadership-in-practice",
          type: "course",
          difficulty: "intermediate",
          description: "Practical leadership skills for professionals at all levels."
        },
        {
          title: "Harvard Business Review: Leadership Articles",
          url: "https://hbr.org/topic/leadership",
          type: "article",
          difficulty: "advanced",
          description: "Curated articles on leadership from Harvard Business Review."
        }
      ],
      "communication": [
        {
          title: "Effective Communication Skills",
          url: "https://www.linkedin.com/learning/effective-communication-skills-for-professionals",
          type: "course",
          difficulty: "beginner",
          description: "Learn the foundations of effective professional communication."
        },
        {
          title: "Advanced Business Communication",
          url: "https://www.edx.org/course/advanced-business-communication",
          type: "course",
          difficulty: "advanced",
          description: "Master the art of business communication in complex scenarios."
        }
      ],
      "data analysis": [
        {
          title: "Data Analysis with Python",
          url: "https://www.datacamp.com/courses/data-analysis-with-python",
          type: "course",
          difficulty: "beginner",
          description: "Learn to analyze data using Python and powerful libraries."
        },
        {
          title: "Data Analysis for Business Decisions",
          url: "https://www.coursera.org/specializations/data-analysis",
          type: "course",
          difficulty: "intermediate",
          description: "Use data analysis techniques to drive business decisions."
        }
      ]
    };
    
    // Check if we have specific resources for this skill
    let resources: Resource[] = [];
    
    // Add skill-specific resources
    for (const [key, res] of Object.entries(skillSpecificResources)) {
      if (normalizedSkill.includes(key)) {
        resources = [...resources, ...res];
      }
    }
    
    // Add category-specific resources
    if (category) {
      const categoryResources: Record<SkillCategory, Resource[]> = {
        technical: [
          {
            title: "Technical Skills Bootcamp",
            url: "https://www.codecademy.com/",
            type: "course",
            difficulty: "beginner",
            description: "Hands-on learning for technical skills with interactive lessons."
          }
        ],
        soft: [
          {
            title: "Soft Skills Development Program",
            url: "https://www.mindtools.com/",
            type: "article",
            difficulty: "intermediate",
            description: "Comprehensive guide to developing essential soft skills for career advancement."
          }
        ],
        industry: [
          {
            title: "Industry Knowledge Hub",
            url: "https://www.mckinsey.com/insights",
            type: "article",
            difficulty: "advanced",
            description: "Latest industry insights and trends from top professionals."
          }
        ],
        domain: [
          {
            title: "Domain Expertise Masterclass",
            url: "https://www.udemy.com/course/domain-expertise/",
            type: "course",
            difficulty: "intermediate",
            description: "Develop specialized knowledge in your domain of interest."
          }
        ],
        business: [
          {
            title: "Business Skills Essentials",
            url: "https://www.harvard.edu/business-skills",
            type: "course",
            difficulty: "intermediate",
            description: "Core business skills every professional should master."
          }
        ],
        analytics: [
          {
            title: "Analytics Foundation",
            url: "https://www.datacamp.com/courses/analytics",
            type: "course",
            difficulty: "beginner",
            description: "Learn the fundamentals of data analytics and interpretation."
          }
        ],
        undefined: []
      };
      
      if (categoryResources[category]) {
        resources = [...resources, ...categoryResources[category]];
      }
    }
    
    // If we have no specific resources, provide general ones based on proficiency
    if (resources.length === 0) {
      if (proficiency === 'want-to-learn' || !proficiency) {
        resources = beginnerResources;
      } else if (proficiency === 'want-to-improve') {
        resources = intermediateResources;
      } else if (proficiency === 'proficient') {
        resources = advancedResources;
      } else {
        resources = [...beginnerResources, ...intermediateResources.slice(0, 1)];
      }
    }
    
    // Filter resources based on proficiency to ensure appropriate difficulty
    if (proficiency === 'want-to-learn' || !proficiency) {
      resources = resources.filter(r => r.difficulty === 'beginner');
    } else if (proficiency === 'want-to-improve') {
      resources = resources.filter(r => r.difficulty === 'intermediate' || r.difficulty === 'beginner');
    }
    
    return resources.slice(0, 5); // Limit to 5 resources
  };
  
  const resources = getResourcesForSkill(skillName, proficiency, category);
  
  const getProficiencyText = (proficiency?: SkillProficiency) => {
    switch (proficiency) {
      case 'want-to-learn':
        return 'Beginner level resources to start learning';
      case 'want-to-improve':
        return 'Intermediate resources to enhance your skills';
      case 'proficient':
        return 'Advanced resources to master and share knowledge';
      default:
        return 'Recommended learning resources';
    }
  };
  
  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return '🎓';
      case 'article':
        return '📄';
      case 'video':
        return '🎬';
      case 'book':
        return '📚';
      case 'tool':
        return '🔧';
      default:
        return '📌';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Learning Resources: {skillName}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-grow">
          <p className="text-gray-600 mb-4">{getProficiencyText(proficiency)}</p>
          
          <div className="space-y-4">
            {resources.length > 0 ? (
              resources.map((resource, index) => (
                <a 
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{getResourceTypeIcon(resource.type)}</span>
                    <div>
                      <h3 className="font-medium text-primary">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded mr-2">
                          {resource.type}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {resource.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No specific resources found for this skill.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t">
          <button 
            onClick={onClose}
            className="w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningResourcesModal;
