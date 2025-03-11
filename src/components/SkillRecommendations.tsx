import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Filter, X, PlusCircle, CheckCircle, BookOpen, TrendingUp, Star } from 'lucide-react';
import SkillTag from './SkillTag';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SkillCategory, Skill, SkillProficiency } from '@/context/RoadmapContext';
import { cn } from '@/lib/utils';

// Industry skill datasets for recommendations
const industrySkillsData: Record<string, Array<{name: string, category: SkillCategory, relevance: 'essential' | 'recommended' | 'optional', score: number}>> = {
  'software developer': [
    { name: 'Data Structures', category: 'technical', relevance: 'essential', score: 95 },
    { name: 'Algorithms', category: 'technical', relevance: 'essential', score: 93 },
    { name: 'System Design', category: 'technical', relevance: 'essential', score: 90 },
    { name: 'Code Reviews', category: 'technical', relevance: 'recommended', score: 85 },
    { name: 'Design Patterns', category: 'technical', relevance: 'recommended', score: 82 },
    { name: 'CI/CD', category: 'technical', relevance: 'recommended', score: 80 },
    { name: 'Unit Testing', category: 'technical', relevance: 'essential', score: 88 },
    { name: 'RESTful APIs', category: 'technical', relevance: 'essential', score: 87 },
    { name: 'Database Design', category: 'technical', relevance: 'recommended', score: 84 },
    { name: 'Cloud Services', category: 'technical', relevance: 'recommended', score: 83 },
    { name: 'Mentoring', category: 'soft', relevance: 'optional', score: 75 },
    { name: 'Technical Writing', category: 'soft', relevance: 'optional', score: 70 },
  ],
  'frontend developer': [
    { name: 'JavaScript', category: 'technical', relevance: 'essential', score: 95 },
    { name: 'HTML/CSS', category: 'technical', relevance: 'essential', score: 94 },
    { name: 'React', category: 'technical', relevance: 'essential', score: 92 },
    { name: 'Responsive Design', category: 'technical', relevance: 'essential', score: 90 },
    { name: 'TypeScript', category: 'technical', relevance: 'recommended', score: 88 },
    { name: 'CSS Frameworks', category: 'technical', relevance: 'recommended', score: 85 },
    { name: 'Web Performance', category: 'technical', relevance: 'recommended', score: 82 },
    { name: 'Git', category: 'technical', relevance: 'essential', score: 89 },
    { name: 'UI/UX Principles', category: 'domain', relevance: 'recommended', score: 84 },
    { name: 'Testing Libraries', category: 'technical', relevance: 'recommended', score: 80 },
    { name: 'Browser DevTools', category: 'technical', relevance: 'essential', score: 86 },
    { name: 'Accessibility', category: 'domain', relevance: 'recommended', score: 83 },
  ],
  'frontend engineer': [
    { name: 'JavaScript', category: 'technical', relevance: 'essential', score: 95 },
    { name: 'HTML/CSS', category: 'technical', relevance: 'essential', score: 94 },
    { name: 'React', category: 'technical', relevance: 'essential', score: 93 },
    { name: 'TypeScript', category: 'technical', relevance: 'essential', score: 92 },
    { name: 'Web Performance', category: 'technical', relevance: 'essential', score: 90 },
    { name: 'Testing Libraries', category: 'technical', relevance: 'essential', score: 88 },
    { name: 'Responsive Design', category: 'technical', relevance: 'essential', score: 91 },
    { name: 'UI Architecture', category: 'technical', relevance: 'recommended', score: 87 },
    { name: 'CI/CD', category: 'technical', relevance: 'recommended', score: 85 },
    { name: 'Design Systems', category: 'domain', relevance: 'recommended', score: 86 },
    { name: 'Accessibility', category: 'domain', relevance: 'essential', score: 89 },
    { name: 'Browser APIs', category: 'technical', relevance: 'recommended', score: 84 },
  ],
  'graphic design': [
    { name: 'Adobe Photoshop', category: 'technical', relevance: 'essential', score: 95 },
    { name: 'Adobe Illustrator', category: 'technical', relevance: 'essential', score: 94 },
    { name: 'Typography', category: 'domain', relevance: 'essential', score: 93 },
    { name: 'Color Theory', category: 'domain', relevance: 'essential', score: 92 },
    { name: 'Layout Design', category: 'domain', relevance: 'essential', score: 91 },
    { name: 'Branding', category: 'domain', relevance: 'recommended', score: 88 },
    { name: 'Print Design', category: 'domain', relevance: 'recommended', score: 85 },
    { name: 'Digital Design', category: 'domain', relevance: 'recommended', score: 87 },
    { name: 'UI Design', category: 'domain', relevance: 'recommended', score: 84 },
    { name: 'Adobe InDesign', category: 'technical', relevance: 'essential', score: 90 },
    { name: 'Client Communication', category: 'soft', relevance: 'recommended', score: 86 },
    { name: 'Design Thinking', category: 'soft', relevance: 'recommended', score: 83 },
  ],
  'product manager': [
    { name: 'Product Analytics', category: 'analytics', relevance: 'essential', score: 95 },
    { name: 'Customer Interviews', category: 'soft', relevance: 'essential', score: 94 },
    { name: 'A/B Testing', category: 'analytics', relevance: 'essential', score: 92 },
    { name: 'Product Roadmapping', category: 'business', relevance: 'essential', score: 95 },
    { name: 'Prototyping', category: 'technical', relevance: 'recommended', score: 85 },
    { name: 'User Stories', category: 'domain', relevance: 'essential', score: 90 },
    { name: 'Competitor Analysis', category: 'business', relevance: 'essential', score: 88 },
    { name: 'Prioritization', category: 'business', relevance: 'essential', score: 93 },
    { name: 'Growth Metrics', category: 'analytics', relevance: 'recommended', score: 86 },
    { name: 'Product Strategy', category: 'business', relevance: 'essential', score: 94 },
    { name: 'Technical Understanding', category: 'technical', relevance: 'recommended', score: 82 },
    { name: 'Stakeholder Management', category: 'soft', relevance: 'essential', score: 91 },
  ],
  'data scientist': [
    { name: 'Machine Learning', category: 'technical', relevance: 'essential', score: 96 },
    { name: 'Feature Engineering', category: 'technical', relevance: 'essential', score: 94 },
    { name: 'Statistical Analysis', category: 'analytics', relevance: 'essential', score: 95 },
    { name: 'Experiment Design', category: 'domain', relevance: 'essential', score: 90 },
    { name: 'Data Cleaning', category: 'technical', relevance: 'essential', score: 93 },
    { name: 'Data Visualization', category: 'analytics', relevance: 'essential', score: 92 },
    { name: 'Big Data Technologies', category: 'technical', relevance: 'recommended', score: 85 },
    { name: 'Deep Learning', category: 'technical', relevance: 'recommended', score: 86 },
    { name: 'NLP', category: 'technical', relevance: 'optional', score: 78 },
    { name: 'Model Deployment', category: 'technical', relevance: 'recommended', score: 84 },
    { name: 'Business Understanding', category: 'business', relevance: 'recommended', score: 83 },
    { name: 'Data Ethics', category: 'domain', relevance: 'recommended', score: 82 },
  ],
  'ux designer': [
    { name: 'User Research', category: 'domain', relevance: 'essential', score: 95 },
    { name: 'Usability Testing', category: 'domain', relevance: 'essential', score: 94 },
    { name: 'Interaction Design', category: 'technical', relevance: 'essential', score: 93 },
    { name: 'Information Architecture', category: 'domain', relevance: 'essential', score: 91 },
    { name: 'Visual Design', category: 'technical', relevance: 'essential', score: 90 },
    { name: 'Prototyping Tools', category: 'technical', relevance: 'essential', score: 92 },
    { name: 'Design Systems', category: 'technical', relevance: 'recommended', score: 85 },
    { name: 'Accessibility', category: 'domain', relevance: 'essential', score: 89 },
    { name: 'Design Thinking', category: 'domain', relevance: 'essential', score: 94 },
    { name: 'User Personas', category: 'domain', relevance: 'essential', score: 93 },
    { name: 'Design Critique', category: 'soft', relevance: 'recommended', score: 83 },
    { name: 'Basic UI Development', category: 'technical', relevance: 'optional', score: 75 },
  ]
};

// More focused dataset for common skills by category
const categorizedSkillsDataset: Record<Exclude<SkillCategory, undefined>, Array<{name: string, category: SkillCategory}>> = {
  'technical': [
    { name: 'JavaScript', category: 'technical' },
    { name: 'Python', category: 'technical' },
    { name: 'React', category: 'technical' },
    { name: 'Node.js', category: 'technical' },
    { name: 'SQL', category: 'technical' },
    { name: 'TypeScript', category: 'technical' },
    { name: 'Git', category: 'technical' },
    { name: 'Java', category: 'technical' },
    { name: 'Docker', category: 'technical' },
    { name: 'AWS', category: 'technical' },
  ],
  'soft': [
    { name: 'Communication', category: 'soft' },
    { name: 'Leadership', category: 'soft' },
    { name: 'Team Collaboration', category: 'soft' },
    { name: 'Problem Solving', category: 'soft' },
    { name: 'Time Management', category: 'soft' },
    { name: 'Critical Thinking', category: 'soft' },
    { name: 'Adaptability', category: 'soft' },
    { name: 'Emotional Intelligence', category: 'soft' },
    { name: 'Negotiation', category: 'soft' },
    { name: 'Public Speaking', category: 'soft' },
  ],
  'business': [
    { name: 'Project Management', category: 'business' },
    { name: 'Strategic Planning', category: 'business' },
    { name: 'Budget Management', category: 'business' },
    { name: 'Marketing', category: 'business' },
    { name: 'Sales', category: 'business' },
    { name: 'Business Analysis', category: 'business' },
    { name: 'Risk Management', category: 'business' },
    { name: 'Stakeholder Management', category: 'business' },
    { name: 'Product Strategy', category: 'business' },
    { name: 'Customer Service', category: 'business' },
  ],
  'analytics': [
    { name: 'Data Analysis', category: 'analytics' },
    { name: 'Data Visualization', category: 'analytics' },
    { name: 'Business Intelligence', category: 'analytics' },
    { name: 'A/B Testing', category: 'analytics' },
    { name: 'Statistical Analysis', category: 'analytics' },
    { name: 'Market Research', category: 'analytics' },
    { name: 'Google Analytics', category: 'analytics' },
    { name: 'Predictive Analytics', category: 'analytics' },
    { name: 'Data Mining', category: 'analytics' },
    { name: 'Tableau', category: 'analytics' },
  ],
  'domain': [
    { name: 'Agile Methodology', category: 'domain' },
    { name: 'Scrum', category: 'domain' },
    { name: 'DevOps', category: 'domain' },
    { name: 'UX Design', category: 'domain' },
    { name: 'UI Design', category: 'domain' },
    { name: 'Product Management', category: 'domain' },
    { name: 'Content Strategy', category: 'domain' },
    { name: 'SEO', category: 'domain' },
    { name: 'Cybersecurity', category: 'domain' },
    { name: 'Blockchain', category: 'domain' },
    { name: 'Machine Learning', category: 'domain' },
    { name: 'Artificial Intelligence', category: 'domain' },
  ],
  'industry': [
    { name: 'Industry Knowledge', category: 'industry' },
    { name: 'Regulatory Compliance', category: 'industry' },
    { name: 'Market Trends', category: 'industry' },
    { name: 'Competitive Analysis', category: 'industry' },
  ],
};

const uncategorizedSkills: Array<{name: string, category: undefined}> = [
  { name: 'Academic Research', category: undefined },
  { name: 'Teaching', category: undefined },
  { name: 'Mentoring', category: undefined },
  { name: 'Personal Development', category: undefined },
];

interface SkillRecommendationsProps {
  currentRole: string;
  desiredRole: string;
  selectedSkills: Skill[];
  onSkillToggle: (skill: Skill) => void;
  onSkillProficiencyChange: (skillName: string, proficiency: SkillProficiency) => void;
}

const SkillRecommendations: React.FC<SkillRecommendationsProps> = ({
  currentRole,
  desiredRole,
  selectedSkills,
  onSkillToggle,
  onSkillProficiencyChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [filteredSkills, setFilteredSkills] = useState<Array<{name: string, category: SkillCategory, relevance?: 'essential' | 'recommended' | 'optional', score?: number}>>([]);
  const [recommendedSkills, setRecommendedSkills] = useState<Array<{name: string, category: SkillCategory, relevance: 'essential' | 'recommended' | 'optional', score: number}>>([]);
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  // Categories for filtering
  const skillCategories = [
    { id: 'all', name: 'All Categories' },
    { id: 'technical', name: 'Technical Skills' },
    { id: 'soft', name: 'Soft Skills' },
    { id: 'industry', name: 'Industry Knowledge' },
    { id: 'domain', name: 'Domain Expertise' },
    { id: 'business', name: 'Business Skills' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'essential', name: 'Essential Skills' },
    { id: 'recommended', name: 'Recommended Skills' },
    { id: 'optional', name: 'Optional Skills' },
  ];

  // Helper function to normalize role names
  const normalizeRoleName = (role: string): string => {
    return role.toLowerCase().trim();
  };

  // Generate skill recommendations based on desired role
  useEffect(() => {
    if (!desiredRole) return;
    
    const normalizedRole = normalizeRoleName(desiredRole);
    let recommendations: Array<{name: string, category: SkillCategory, relevance: 'essential' | 'recommended' | 'optional', score: number}> = [];
    
    // Check for exact match
    if (industrySkillsData[normalizedRole]) {
      recommendations = industrySkillsData[normalizedRole];
    } else {
      // Try to find similar roles
      for (const [role, skills] of Object.entries(industrySkillsData)) {
        // Check if the normalized desired role contains this role key or vice versa
        if (normalizedRole.includes(role) || role.includes(normalizedRole)) {
          recommendations = [...recommendations, ...skills];
          break; // Found a match, no need to continue
        }
      }
    }
    
    // If we still don't have recommendations, use a default
    if (recommendations.length === 0) {
      // Try software developer as a fallback
      recommendations = industrySkillsData['software developer'];
    }
    
    // Sort by relevance and score
    recommendations.sort((a, b) => {
      const relevanceOrder = { 'essential': 0, 'recommended': 1, 'optional': 2 };
      if (relevanceOrder[a.relevance] !== relevanceOrder[b.relevance]) {
        return relevanceOrder[a.relevance] - relevanceOrder[b.relevance];
      }
      return b.score - a.score;
    });
    
    setRecommendedSkills(recommendations);
    
    // Generate a smaller set of relevant skills for initial display
    const relevantCategories: SkillCategory[] = ['technical', 'soft', 'domain', 'business', 'analytics'];
    const initialFilteredSkills = relevantCategories.flatMap(category => 
      categorizedSkillsDataset[category].slice(0, 5)
    );
    
    // Add recommendations to filtered skills
    const allFilteredSkills = [...recommendations, ...initialFilteredSkills];
    
    // Remove duplicates
    const uniqueSkills = Array.from(
      new Map(allFilteredSkills.map(item => [item.name, item])).values()
    );
    
    setFilteredSkills(uniqueSkills);
  }, [desiredRole]);
  
  // Handle search and filter changes
  useEffect(() => {
    let skillsToFilter: Array<{name: string, category: SkillCategory, relevance?: 'essential' | 'recommended' | 'optional', score?: number}> = [];
    
    // If showing all skills, combine all categorized skills
    if (showAllSkills) {
      // Get skills from all categories
      const allCategorizedSkills = Object.values(categorizedSkillsDataset).flat();
      // Add uncategorized skills as well
      skillsToFilter = [...allCategorizedSkills, ...uncategorizedSkills, ...recommendedSkills];
    } else {
      // Otherwise, just use the recommended skills and a smaller selection
      skillsToFilter = [...recommendedSkills];
      
      // Add a small selection from each category
      Object.entries(categorizedSkillsDataset).forEach(([_, skills]) => {
        const categorySkills = skills.slice(0, 2); // Just take the first 2 from each category
        skillsToFilter.push(...categorySkills);
      });
    }
    
    // Remove duplicates
    skillsToFilter = Array.from(
      new Map(skillsToFilter.map(item => [item.name, item])).values()
    );
    
    // Apply text search
    if (searchQuery) {
      skillsToFilter = skillsToFilter.filter(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category/relevance filter
    if (filter !== 'all') {
      if (['essential', 'recommended', 'optional'].includes(filter)) {
        skillsToFilter = skillsToFilter.filter(skill => 
          'relevance' in skill && skill.relevance === filter
        );
      } else {
        skillsToFilter = skillsToFilter.filter(skill => skill.category === filter);
      }
    }
    
    setFilteredSkills(skillsToFilter);
  }, [searchQuery, filter, recommendedSkills, showAllSkills]);
  
  const handleSkillToggle = (skill: {name: string, category: SkillCategory, relevance?: 'essential' | 'recommended' | 'optional', score?: number}) => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: skill.name,
      category: skill.category,
      selected: true,
      proficiency: undefined
    };
    
    onSkillToggle(newSkill);
  };
  
  const isSkillSelected = (skillName: string) => {
    return selectedSkills.some(s => s.name === skillName);
  };
  
  const getSkillByName = (skillName: string) => {
    return selectedSkills.find(s => s.name === skillName);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 h-5 w-5 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden md:inline">Filter</span>
              {filter !== 'all' && <Badge variant="secondary" className="ml-1">{filter}</Badge>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Skill Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {skillCategories.map(category => (
              <DropdownMenuItem 
                key={category.id}
                className="cursor-pointer"
                onClick={() => setFilter(category.id)}
              >
                {category.name}
                {filter === category.id && <CheckCircle className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="space-y-5">
        {filter === 'all' && recommendedSkills.length > 0 && (
          <div>
            <h3 className="font-medium text-lg flex items-center mb-3">
              <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
              Recommended Skills for {desiredRole}
            </h3>
            <div className="flex flex-wrap">
              {recommendedSkills.slice(0, 8).map((skill) => {
                const selectedSkill = getSkillByName(skill.name);
                return (
                  <SkillTag 
                    key={skill.name}
                    name={skill.name}
                    selected={isSkillSelected(skill.name)}
                    onClick={() => handleSkillToggle(skill)}
                    proficiency={selectedSkill?.proficiency}
                    category={skill.category}
                    onProficiencyChange={(proficiency) => onSkillProficiencyChange(skill.name, proficiency)}
                    showProficiency={isSkillSelected(skill.name)}
                    recommendationScore={skill.score}
                    relevanceTag={skill.relevance}
                  />
                );
              })}
            </div>
          </div>
        )}
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-lg flex items-center">
              {filter !== 'all' ? `${filter.charAt(0).toUpperCase() + filter.slice(1)} Skills` : 'Additional Skills'}
              <Badge variant="outline" className="ml-2 text-xs">
                Browse skills from different categories
              </Badge>
            </h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAllSkills(!showAllSkills)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showAllSkills ? 'Show Less' : 'Show More Skills'}
            </Button>
          </div>
          
          {filteredSkills.length > 0 ? (
            <div className="flex flex-wrap">
              {filteredSkills
                .filter(skill => !recommendedSkills.some(r => r.name === skill.name) || filter !== 'all')
                .slice(0, showAllSkills ? undefined : 8) // Limit to 8 skills unless Show More is clicked
                .map((skill) => {
                  const selectedSkill = getSkillByName(skill.name);
                  return (
                    <SkillTag 
                      key={skill.name}
                      name={skill.name}
                      selected={isSkillSelected(skill.name)}
                      onClick={() => handleSkillToggle(skill)}
                      proficiency={selectedSkill?.proficiency}
                      category={skill.category}
                      onProficiencyChange={(proficiency) => onSkillProficiencyChange(skill.name, proficiency)}
                      showProficiency={isSkillSelected(skill.name)}
                      recommendationScore={'score' in skill ? skill.score : undefined}
                      relevanceTag={'relevance' in skill ? skill.relevance : undefined}
                    />
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Search className="h-10 w-10 mx-auto text-gray-300 mb-2" />
              <p>No skills found matching your search</p>
              <Button variant="link" onClick={() => {setSearchQuery(''); setFilter('all');}}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
        <h4 className="font-medium flex items-center text-blue-800">
          <BookOpen className="h-4 w-4 mr-2" />
          Learning Paths Legend
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className="flex items-center text-sm">
            <Badge variant="info" className="mr-2">
              <BookOpen className="h-3.5 w-3.5" />
            </Badge>
            <span className="text-blue-600">Want to learn</span>
          </div>
          <div className="flex items-center text-sm">
            <Badge variant="warning" className="mr-2">
              <TrendingUp className="h-3.5 w-3.5" />
            </Badge>
            <span className="text-amber-600">Want to improve</span>
          </div>
          <div className="flex items-center text-sm">
            <Badge variant="success" className="mr-2">
              <Star className="h-3.5 w-3.5" />
            </Badge>
            <span className="text-green-600">Already proficient</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillRecommendations;
