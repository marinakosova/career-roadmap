import React, { useState, useEffect } from 'react';
import { Milestone, Skill, useRoadmap, SkillProficiency, SkillCategory } from '@/context/RoadmapContext';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  LucideIcon, 
  Brain,
  Code,
  Users,
  Building2,
  Briefcase,
  LineChart,
  BookOpen,
  TrendingUp,
  Star
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SkillsSectionProps {
  desiredRole?: string;
  milestones: Milestone[];
}

type SkillCategoryType = {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  variant: string;
};

const skillCategories: SkillCategoryType[] = [
  { id: 'technical', name: 'Technical Skills', icon: Code, color: 'bg-blue-100 text-blue-600', variant: 'info' },
  { id: 'soft', name: 'Soft Skills', icon: Users, color: 'bg-purple-100 text-purple-600', variant: 'purple' },
  { id: 'industry', name: 'Industry Knowledge', icon: Building2, color: 'bg-amber-100 text-amber-600', variant: 'warning' },
  { id: 'domain', name: 'Domain Expertise', icon: Brain, color: 'bg-emerald-100 text-emerald-600', variant: 'success' },
  { id: 'business', name: 'Business Skills', icon: Briefcase, color: 'bg-rose-100 text-rose-600', variant: 'rose' },
  { id: 'analytics', name: 'Analytics', icon: LineChart, color: 'bg-indigo-100 text-indigo-600', variant: 'indigo' },
];

// Mapping skills to categories based on common patterns if category is not provided
const categorizeSkill = (skillName: string, existingCategory?: SkillCategory): SkillCategory => {
  if (existingCategory) return existingCategory;
  
  skillName = skillName.toLowerCase();
  
  if (/javascript|python|html|css|git|react|node|database|code|programming|algorithm|data structure|api|sql/.test(skillName)) {
    return 'technical';
  } else if (/communicat|leadership|team|collab|listen|speak|present|negotiate|conflict|mentor|time|management|problem solving/.test(skillName)) {
    return 'soft';
  } else if (/industry|market|compliance|regulation|standards|trend/.test(skillName)) {
    return 'industry';
  } else if (/analytics|data|statistics|analysis|research|report|visualization/.test(skillName)) {
    return 'analytics';
  } else if (/finance|budget|planning|strategy|business|ROI|stakeholder/.test(skillName)) {
    return 'business';
  } else {
    return 'domain';
  }
};

// For our demo, define learning paths for different proficiency levels
const LEARNING_PATHS: Record<string, string[]> = {
  'want-to-learn': ['Find beginner tutorials', 'Enroll in introductory courses', 'Start simple projects'],
  'want-to-improve': ['Complete advanced courses', 'Seek mentorship', 'Work on complex projects'],
  'proficient': ['Stay updated with latest trends', 'Contribute to open source', 'Mentor others'],
  'default': ['Assess your current level', 'Find appropriate resources', 'Practice regularly']
};

// Get proficiency icon
const getProficiencyIcon = (proficiency?: SkillProficiency) => {
  switch (proficiency) {
    case 'want-to-learn':
      return <BookOpen className="h-3.5 w-3.5 text-blue-600" />;
    case 'want-to-improve':
      return <TrendingUp className="h-3.5 w-3.5 text-amber-600" />;
    case 'proficient':
      return <Star className="h-3.5 w-3.5 text-green-600" />;
    default:
      return <Circle className="h-3.5 w-3.5 text-gray-400" />;
  }
};

// Get proficiency level name and color
const getProficiencyInfo = (proficiency?: SkillProficiency) => {
  switch (proficiency) {
    case 'want-to-learn':
      return { name: 'Want to learn', color: 'text-blue-600', badge: 'info' };
    case 'want-to-improve':
      return { name: 'Want to improve', color: 'text-amber-600', badge: 'warning' };
    case 'proficient':
      return { name: 'Already proficient', color: 'text-green-600', badge: 'success' };
    default:
      return { name: 'Not specified', color: 'text-gray-600', badge: 'gray' };
  }
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ desiredRole, milestones }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [focusedSkills, setFocusedSkills] = useState<string[]>([]);
  const { toggleMilestoneFeedback } = useRoadmap();
  
  // Collect all skills from milestones
  const allSkills = React.useMemo(() => {
    const skillMap = new Map<string, { 
      skill: Skill, 
      count: number, 
      milestonesWithSkill: string[],
      category: SkillCategory,
      proficiency: SkillProficiency
    }>();
    
    milestones.forEach(milestone => {
      milestone.skills.forEach(skill => {
        const existingSkill = skillMap.get(skill.name);
        const category = categorizeSkill(skill.name, skill.category);
        
        if (existingSkill) {
          existingSkill.count += 1;
          if (!existingSkill.milestonesWithSkill.includes(milestone.id)) {
            existingSkill.milestonesWithSkill.push(milestone.id);
          }
          // Keep the existing proficiency if already set
        } else {
          skillMap.set(skill.name, { 
            skill, 
            count: 1, 
            milestonesWithSkill: [milestone.id],
            category,
            proficiency: skill.proficiency || undefined
          });
        }
      });
    });
    
    return Array.from(skillMap.values());
  }, [milestones]);
  
  const toggleFocusSkill = (skillName: string) => {
    setFocusedSkills(prev => 
      prev.includes(skillName)
        ? prev.filter(s => s !== skillName)
        : [...prev, skillName]
    );
  };
  
  // Filter skills based on selected category
  const filteredSkills = selectedCategory === 'all'
    ? allSkills
    : allSkills.filter(skill => skill.category === selectedCategory);
  
  // Determine the proficiency level for display purposes
  const getDisplayProficiency = (proficiency?: SkillProficiency, count: number = 0): SkillProficiency => {
    if (proficiency) return proficiency;
    
    // If no explicit proficiency, infer from occurrence count
    if (count <= 1) return 'want-to-learn';
    if (count <= 3) return 'want-to-improve';
    return 'proficient';
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Skills Development</h2>
        <p className="text-gray-600 mb-6">
          Track the skills you need to develop for your career as {desiredRole || 'a professional'}. 
          Focus on high-impact skills to accelerate your progress.
        </p>
      </div>
      
      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          className="rounded-full"
          onClick={() => setSelectedCategory('all')}
        >
          All Skills
        </Button>
        
        {skillCategories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setSelectedCategory(category.id)}
          >
            <category.icon className="h-4 w-4 mr-2" />
            {category.name}
          </Button>
        ))}
      </div>
      
      {/* Skills List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.length > 0 ? (
          filteredSkills.map(({ skill, count, milestonesWithSkill, category, proficiency }) => {
            const categoryObj = skillCategories.find(c => c.id === category) || skillCategories[0];
            const displayProficiency = getDisplayProficiency(proficiency, count);
            const proficiencyInfo = getProficiencyInfo(displayProficiency);
            const levelPercentage = { 
              'want-to-learn': 33, 
              'want-to-improve': 66, 
              'proficient': 100,
              undefined: 10
            }[displayProficiency];
            
            const isFocused = focusedSkills.includes(skill.name);
            
            return (
              <div 
                key={skill.id} 
                className={cn(
                  "p-5 rounded-xl border transition-all",
                  isFocused ? "border-primary bg-primary/5 shadow-sm" : "border-gray-200 bg-white"
                )}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-lg">{skill.name}</h3>
                    <Badge variant={categoryObj.variant as any} className="border-0">
                      <categoryObj.icon className="h-3 w-3 mr-1" />
                      {categoryObj.name}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "rounded-full p-2 h-auto",
                      isFocused && "bg-primary/10"
                    )}
                    onClick={() => toggleFocusSkill(skill.name)}
                  >
                    {isFocused ? (
                      <Bookmark className="h-5 w-5 fill-primary text-primary" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Proficiency Level</span>
                    <span className={`font-medium ${proficiencyInfo.color}`}>
                      {getProficiencyIcon(displayProficiency)}
                      <span className="ml-1">{proficiencyInfo.name}</span>
                    </span>
                  </div>
                  <Progress value={levelPercentage} className="h-2" />
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Learning Path:</div>
                  <ul className="space-y-1">
                    {LEARNING_PATHS[displayProficiency || 'default'].map((step, i) => (
                      <li key={i} className="text-sm flex items-start">
                        <span className="mr-2 mt-1">
                          {i === 0 ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Circle className="h-3.5 w-3.5 text-gray-300" />
                          )}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Relevant Milestones:</div>
                  <div className="space-y-1.5">
                    {milestonesWithSkill.map(id => {
                      const milestone = milestones.find(m => m.id === id);
                      if (!milestone) return null;
                      
                      return (
                        <div key={id} className="flex items-center text-sm">
                          <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                          <span className="text-gray-700">{milestone.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Button variant="outline" className="w-full text-sm" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Find Learning Resources
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No skills yet</h3>
            <p className="text-gray-500 max-w-md mx-auto mt-2">
              Complete the roadmap builder to generate skills for your career path.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
