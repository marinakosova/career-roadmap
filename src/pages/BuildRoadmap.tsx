import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, ChevronLeft, Code, Users, Building2, Brain, Briefcase, LineChart, BookOpen, TrendingUp, Star } from 'lucide-react';
import FormStep from '@/components/FormStep';
import SkillTag from '@/components/SkillTag';
import SkillRecommendations from '@/components/SkillRecommendations';
import PersonalizedLearning from '@/components/PersonalizedLearning';
import { useRoadmap, Skill, SkillProficiency, SkillCategory } from '@/context/RoadmapContext';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

const skillCategories = [
  { id: 'technical', name: 'Technical Skills', icon: Code, color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { id: 'soft', name: 'Soft Skills', icon: Users, color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { id: 'industry', name: 'Industry Knowledge', icon: Building2, color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { id: 'domain', name: 'Domain Expertise', icon: Brain, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { id: 'business', name: 'Business Skills', icon: Briefcase, color: 'bg-rose-50 border-rose-200 text-rose-700' },
  { id: 'analytics', name: 'Analytics', icon: LineChart, color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
];

const roleSkills: Record<string, Array<{ name: string, category: SkillCategory }>> = {
  'software developer': [
    { name: 'JavaScript', category: 'technical' },
    { name: 'React', category: 'technical' },
    { name: 'Node.js', category: 'technical' },
    { name: 'TypeScript', category: 'technical' },
    { name: 'Git', category: 'technical' },
    { name: 'API Design', category: 'technical' },
    { name: 'Problem Solving', category: 'soft' },
    { name: 'Communication', category: 'soft' },
    { name: 'Agile Methodology', category: 'industry' },
    { name: 'System Design', category: 'domain' },
  ],
  'product manager': [
    { name: 'User Research', category: 'domain' },
    { name: 'Agile', category: 'industry' },
    { name: 'Roadmapping', category: 'business' },
    { name: 'Stakeholder Management', category: 'soft' },
    { name: 'Data Analysis', category: 'analytics' },
    { name: 'UX Design', category: 'domain' },
    { name: 'Market Research', category: 'business' },
    { name: 'Presentation', category: 'soft' },
    { name: 'Product Strategy', category: 'business' },
    { name: 'Competitive Analysis', category: 'industry' },
  ],
  'data scientist': [
    { name: 'Python', category: 'technical' },
    { name: 'R', category: 'technical' },
    { name: 'Machine Learning', category: 'technical' },
    { name: 'SQL', category: 'technical' },
    { name: 'Data Visualization', category: 'analytics' },
    { name: 'Statistical Analysis', category: 'analytics' },
    { name: 'Pandas', category: 'technical' },
    { name: 'TensorFlow', category: 'technical' },
    { name: 'Data Storytelling', category: 'soft' },
    { name: 'Business Intelligence', category: 'business' },
  ],
  'ux designer': [
    { name: 'Figma', category: 'technical' },
    { name: 'User Research', category: 'domain' },
    { name: 'Wireframing', category: 'technical' },
    { name: 'Prototyping', category: 'technical' },
    { name: 'Design Systems', category: 'technical' },
    { name: 'UI Design', category: 'technical' },
    { name: 'User Testing', category: 'soft' },
    { name: 'Adobe XD', category: 'technical' },
  ],
  'marketing manager': [
    { name: 'SEO', category: 'technical' },
    { name: 'Content Strategy', category: 'technical' },
    { name: 'Social Media', category: 'technical' },
    { name: 'Analytics', category: 'analytics' },
    { name: 'Email Marketing', category: 'technical' },
    { name: 'Branding', category: 'technical' },
    { name: 'Campaign Management', category: 'technical' },
  ],
  'project manager': [
    { name: 'Agile', category: 'technical' },
    { name: 'Scrum', category: 'technical' },
    { name: 'Budgeting', category: 'technical' },
    { name: 'Risk Management', category: 'technical' },
    { name: 'Stakeholder Management', category: 'soft' },
    { name: 'Documentation', category: 'technical' },
    { name: 'Jira', category: 'technical' },
  ],
};

const currentStateOptions = [
  'I don\'t like my current job',
  'I\'m thinking about career change',
  'I decided to change career',
  'I\'m currently studying for my new career',
  'I\'m currently networking & interviewing'
];

const budgetOptions = [
  '$0 (Free resources only)',
  '$100-500',
  '$500-1,000',
  '$1,000-5,000',
  '$5,000+',
  'Other'
];

const levels = ['Entry', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Executive'];
const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Entertainment'];
const companySizes = ['Startup (1-10)', 'Small (11-50)', 'Medium (51-200)', 'Large (201-1000)', 'Enterprise (1000+)'];
const timeCommitments = [
  '0-5 hours/week',
  '5-10 hours/week',
  '10-20 hours/week',
  '20-30 hours/week',
  '30+ hours/week'
];

const BuildRoadmap = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [suggestedSkills, setSuggestedSkills] = useState<Skill[]>([]);
  const [customBudget, setCustomBudget] = useState('');
  const [showCustomBudget, setShowCustomBudget] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('skills');
  
  const {
    currentRole, setCurrentRole,
    currentLevel, setCurrentLevel,
    experience, setExperience,
    desiredRole, setDesiredRole,
    desiredLevel, setDesiredLevel,
    background, setBackground,
    selectedSkills, setSelectedSkills,
    currentState, setCurrentState,
    desiredIndustry, setDesiredIndustry,
    companySize, setCompanySize,
    budget, setBudget,
    timeCommitment, setTimeCommitment,
    setMilestones,
    setCompletedMilestones,
    setNextDeadline,
    saveRoadmap
  } = useRoadmap();

  const generateRoadmap = () => {
    if (!desiredRole.trim()) {
      toast.error("Please enter your desired role");
      return;
    }

    const generateSteps = (milestoneTitle: string) => {
      const steps = [];
      
      if (milestoneTitle.includes('Skill Assessment')) {
        steps.push(
          { id: `step-${Date.now()}-1`, description: 'Take self-assessment quizzes for key skills', completed: false },
          { id: `step-${Date.now()}-2`, description: 'Have your skills evaluated by a mentor or peer', completed: false },
          { id: `step-${Date.now()}-3`, description: 'Create a skills matrix chart comparing your current vs. required skills', completed: false }
        );
      } else if (milestoneTitle.includes('Learning Path')) {
        steps.push(
          { id: `step-${Date.now()}-1`, description: 'Research online courses that fit your learning style', completed: false },
          { id: `step-${Date.now()}-2`, description: 'Create a weekly learning schedule with specific goals', completed: false },
          { id: `step-${Date.now()}-3`, description: 'Join study groups or find an accountability partner', completed: false }
        );
      } else if (milestoneTitle.includes('Portfolio')) {
        steps.push(
          { id: `step-${Date.now()}-1`, description: 'Define 2-3 projects that showcase your target skills', completed: false },
          { id: `step-${Date.now()}-2`, description: 'Set up your portfolio website or platform', completed: false },
          { id: `step-${Date.now()}-3`, description: 'Get feedback on your portfolio from professionals', completed: false }
        );
      } else if (milestoneTitle.includes('Network')) {
        steps.push(
          { id: `step-${Date.now()}-1`, description: 'Join 3-5 relevant professional groups online', completed: false },
          { id: `step-${Date.now()}-2`, description: 'Schedule 1 informational interview per week', completed: false },
          { id: `step-${Date.now()}-3`, description: 'Attend industry meetups or conferences', completed: false }
        );
      } else if (milestoneTitle.includes('Job Application')) {
        steps.push(
          { id: `step-${Date.now()}-1`, description: 'Update resume highlighting transferable skills', completed: false },
          { id: `step-${Date.now()}-2`, description: 'Draft a template cover letter you can customize', completed: false },
          { id: `step-${Date.now()}-3`, description: 'Practice interview responses for common questions', completed: false }
        );
      } else if (milestoneTitle.includes('Budget')) {
        steps.push(
          { id: `step-${Date.now()}-1`, description: 'List all free resources available for your learning path', completed: false },
          { id: `step-${Date.now()}-2`, description: 'Prioritize paid resources by ROI for your career', completed: false },
          { id: `step-${Date.now()}-3`, description: 'Create a monthly spending plan for your career transition', completed: false }
        );
      } else if (milestoneTitle.includes('Company')) {
        steps.push(
          { id: `step-${Date.now()}-1`, description: 'Research culture and workflows specific to your target company size', completed: false },
          { id: `step-${Date.now()}-2`, description: 'Connect with professionals working at similar companies', completed: false },
          { id: `step-${Date.now()}-3`, description: 'Tailor your approach to match expectations at your target companies', completed: false }
        );
      } else if (milestoneTitle.includes('Schedule')) {
        steps.push(
          { id: `step-${Date.now()}-1`, description: 'Create a realistic timeline based on your availability', completed: false },
          { id: `step-${Date.now()}-2`, description: 'Break down learning into manageable chunks that fit your schedule', completed: false },
          { id: `step-${Date.now()}-3`, description: 'Set up calendar reminders and time blocks for consistent progress', completed: false }
        );
      } else {
        steps.push(
          { id: `step-${Date.now()}-1`, description: 'Research best practices for this milestone', completed: false },
          { id: `step-${Date.now()}-2`, description: 'Create an action plan with measurable outcomes', completed: false },
          { id: `step-${Date.now()}-3`, description: 'Get feedback on your progress from mentors', completed: false }
        );
      }
      
      return steps;
    };

    const generateSkills = (milestoneTitle: string) => {
      const allSkills = [...selectedSkills];
      
      if (allSkills.length < 3) {
        if (milestoneTitle.includes('Skill Assessment')) {
          allSkills.push({ id: `skill-${Date.now()}-1`, name: 'Self-assessment' });
          allSkills.push({ id: `skill-${Date.now()}-2`, name: 'Critical thinking' });
        } else if (milestoneTitle.includes('Learning')) {
          allSkills.push({ id: `skill-${Date.now()}-1`, name: 'Time management' });
          allSkills.push({ id: `skill-${Date.now()}-2`, name: 'Self-directed learning' });
        } else if (milestoneTitle.includes('Portfolio')) {
          allSkills.push({ id: `skill-${Date.now()}-1`, name: 'Project management' });
          allSkills.push({ id: `skill-${Date.now()}-2`, name: 'Documentation' });
        }
      }
      
      return allSkills.slice(0, Math.min(3, allSkills.length));
    };

    const generateTools = (milestoneTitle: string) => {
      const tools = [];
      
      if (milestoneTitle.includes('Skill Assessment')) {
        tools.push(
          { id: `tool-${Date.now()}-1`, name: 'LinkedIn Skill Assessments' },
          { id: `tool-${Date.now()}-2`, name: 'Skill Radar Chart Maker' }
        );
      } else if (milestoneTitle.includes('Learning Path')) {
        tools.push(
          { id: `tool-${Date.now()}-1`, name: 'Coursera' },
          { id: `tool-${Date.now()}-2`, name: 'Notion for scheduling' }
        );
      } else if (milestoneTitle.includes('Portfolio')) {
        tools.push(
          { id: `tool-${Date.now()}-1`, name: 'GitHub' },
          { id: `tool-${Date.now()}-2`, name: 'Wix/WordPress' }
        );
      } else if (milestoneTitle.includes('Network')) {
        tools.push(
          { id: `tool-${Date.now()}-1`, name: 'LinkedIn' },
          { id: `tool-${Date.now()}-2`, name: 'Meetup' }
        );
      } else if (milestoneTitle.includes('Job Application')) {
        tools.push(
          { id: `tool-${Date.now()}-1`, name: 'Resume Builder' },
          { id: `tool-${Date.now()}-2`, name: 'LinkedIn Easy Apply' }
        );
      }
      
      return tools;
    };

    const generateResources = (milestoneTitle: string) => {
      const resources = [];
      
      if (milestoneTitle.includes('Skill Assessment')) {
        resources.push(
          { id: `resource-${Date.now()}-1`, name: 'Free skill assessment templates', url: 'https://www.linkedin.com/learning' },
          { id: `resource-${Date.now()}-2`, name: 'Industry skill standards guide' }
        );
      } else if (milestoneTitle.includes('Learning Path')) {
        resources.push(
          { id: `resource-${Date.now()}-1`, name: 'Top courses for beginners', url: 'https://www.coursera.org' },
          { id: `resource-${Date.now()}-2`, name: 'Learning path templates' }
        );
      } else if (milestoneTitle.includes('Portfolio')) {
        resources.push(
          { id: `resource-${Date.now()}-1`, name: 'Portfolio examples in your field', url: 'https://www.behance.net' },
          { id: `resource-${Date.now()}-2`, name: 'Project idea generator' }
        );
      } else if (milestoneTitle.includes('Network')) {
        resources.push(
          { id: `resource-${Date.now()}-1`, name: 'Networking scripts for introverts', url: 'https://www.themuse.com/advice/networking-tips-for-introverts' },
          { id: `resource-${Date.now()}-2`, name: 'Industry groups directory' }
        );
      }
      
      return resources;
    };

    const milestones = [
      {
        id: '1',
        title: 'Skill Assessment & Gap Analysis',
        description: 'Identify your current skills and compare them with those required for your target role.',
        timeline: '2 weeks',
        completed: false,
        progress: 0,
        skills: generateSkills('Skill Assessment'),
        steps: generateSteps('Skill Assessment'),
        tools: generateTools('Skill Assessment'),
        resources: generateResources('Skill Assessment')
      },
      {
        id: '2',
        title: 'Learning Path Creation',
        description: 'Develop a structured learning plan focused on acquiring the missing skills.',
        timeline: '1 month',
        completed: false,
        progress: 0,
        skills: generateSkills('Learning Path'),
        steps: generateSteps('Learning Path'),
        tools: generateTools('Learning Path'),
        resources: generateResources('Learning Path')
      },
      {
        id: '3',
        title: 'Portfolio Development',
        description: 'Create projects that demonstrate your new skills and highlight your expertise.',
        timeline: '3 months',
        completed: false,
        progress: 0,
        skills: generateSkills('Portfolio'),
        steps: generateSteps('Portfolio'),
        tools: generateTools('Portfolio'),
        resources: generateResources('Portfolio')
      },
      {
        id: '4',
        title: 'Network Building',
        description: 'Connect with professionals in your target field and attend industry events.',
        timeline: '2 months',
        completed: false,
        progress: 0,
        skills: generateSkills('Network'),
        steps: generateSteps('Network'),
        tools: generateTools('Network'),
        resources: generateResources('Network')
      },
      {
        id: '5',
        title: 'Job Application Strategy',
        description: 'Prepare resume, cover letter, and interview skills tailored to your target role.',
        timeline: '1 month',
        completed: false,
        progress: 0,
        skills: generateSkills('Job Application'),
        steps: generateSteps('Job Application'),
        tools: generateTools('Job Application'),
        resources: generateResources('Job Application')
      }
    ];

    if (budget) {
      milestones.push({
        id: '6',
        title: 'Budget-Conscious Learning Plan',
        description: `Optimize your learning plan within your ${budget} budget by focusing on high-ROI resources.`,
        timeline: '1 week',
        completed: false,
        progress: 0,
        skills: generateSkills('Budget'),
        steps: generateSteps('Budget'),
        tools: generateTools('Budget'),
        resources: generateResources('Budget')
      });
    }

    if (companySize) {
      milestones.push({
        id: '7',
        title: `${companySize} Company Preparation`,
        description: `Tailor your approach to match the dynamics of ${companySize} companies in your industry.`,
        timeline: '2 weeks',
        completed: false,
        progress: 0,
        skills: generateSkills('Company'),
        steps: generateSteps('Company'),
        tools: generateTools('Company'),
        resources: generateResources('Company')
      });
    }

    if (timeCommitment) {
      milestones.push({
        id: '8',
        title: `${timeCommitment} Schedule Planning`,
        description: `Organize your career transition timeline considering your ${timeCommitment.toLowerCase()} availability.`,
        timeline: '1 week',
        completed: false,
        progress: 0,
        skills: generateSkills('Schedule'),
        steps: generateSteps('Schedule'),
        tools: generateTools('Schedule'),
        resources: generateResources('Schedule')
      });
    }

    setMilestones(milestones);
    setCompletedMilestones(0);
    
    const deadline = new Date();
    deadline.setMonth(deadline.getMonth() + 1);
    setNextDeadline(deadline.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));

    saveRoadmap();

    toast.success("Creating your personalized roadmap...");
    
    setTimeout(() => {
      navigate('/roadmap');
    }, 1500);
  };

  useEffect(() => {
    const normalizedRole = currentRole.toLowerCase().trim();
    
    if (normalizedRole && roleSkills[normalizedRole]) {
      const skills = roleSkills[normalizedRole].map(skill => ({
        id: `suggested-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: skill.name,
        category: skill.category,
        proficiency: undefined as SkillProficiency
      }));
      setSuggestedSkills(skills);
    } else {
      const allSkills = Object.values(roleSkills).flat();
      const uniqueSkillNames = [...new Set(allSkills.map(skill => skill.name))];
      const mixedSkills = uniqueSkillNames.slice(0, 15).map(name => {
        const originalSkill = allSkills.find(s => s.name === name);
        return { 
          id: `suggested-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name,
          category: originalSkill?.category || undefined,
          proficiency: undefined as SkillProficiency
        };
      });
      setSuggestedSkills(mixedSkills);
    }
  }, [currentRole]);

  const toggleSkill = (skill: Skill) => {
    setSelectedSkills(prev => {
      const existingSkill = prev.find(s => s.name === skill.name);
      
      if (existingSkill) {
        return prev.filter(s => s.name !== skill.name);
      } else {
        return [...prev, { 
          id: skill.id || `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
          name: skill.name, 
          selected: true,
          category: skill.category,
          proficiency: skill.proficiency || undefined as SkillProficiency
        }];
      }
    });
  };

  const updateSkillProficiency = (skillName: string, proficiency: SkillProficiency) => {
    setSelectedSkills(prev => {
      return prev.map(skill => {
        if (skill.name === skillName) {
          return { ...skill, proficiency };
        }
        return skill;
      });
    });
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!currentRole.trim() || !desiredRole.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'Other') {
      setShowCustomBudget(true);
      setBudget(customBudget || '');
    } else {
      setShowCustomBudget(false);
      setBudget(value);
    }
  };

  const handleCustomBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomBudget(value);
    setBudget(value);
  };

  const getFilteredSkills = (skills: Skill[]) => {
    if (selectedCategory === 'all') return skills;
    return skills.filter(skill => skill.category === selectedCategory);
  };

  const getCategoryIcon = (categoryId?: SkillCategory) => {
    const category = skillCategories.find(c => c.id === categoryId);
    if (!category) return null;
    
    const IconComponent = category.icon;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Link 
        to="/" 
        className="absolute top-6 left-6 text-gray-600 hover:text-gray-900 transition-colors flex items-center"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back to Home
      </Link>

      {currentStep === 1 && (
        <FormStep
          step={1}
          totalSteps={3}
          title="Build roadmap"
          subtitle="Create your personalized roadmap in seconds—enter your current role, choose your goal, and watch your path unfold effortlessly."
        >
          <div className="space-y-6">
            <div className="grid gap-4">
              <label className="font-medium">Current role</label>
              <input
                type="text"
                placeholder="Enter your current role..."
                className="form-input"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Level</label>
                <select 
                  className="form-select" 
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value)}
                >
                  <option value="">Choose your current level</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="font-medium">Year of experience (optional)</label>
                <select 
                  className="form-select" 
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="">Choose years of experience</option>
                  {Array.from({ length: 20 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} year{i !== 0 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4">
              <label className="font-medium">Desired role</label>
              <input
                type="text"
                placeholder="Enter your desired role..."
                className="form-input"
                value={desiredRole}
                onChange={(e) => setDesiredRole(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="font-medium">Level</label>
              <select 
                className="form-select" 
                value={desiredLevel}
                onChange={(e) => setDesiredLevel(e.target.value)}
              >
                <option value="">Choose your desired level</option>
                {levels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end pt-4">
              <button
                className="primary-button inline-flex items-center"
                onClick={nextStep}
              >
                Analyse
                <Sparkles className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </FormStep>
      )}

      {currentStep === 2 && (
        <FormStep
          step={2}
          totalSteps={3}
          title="Tell us more about your background"
          subtitle="The more you add, the more personalized and relevant results you'll get. Add skills, set your proficiency level, and create a comprehensive skill inventory for your career path."
        >
          <div className="space-y-6">
            <div>
              <label className="font-medium">Describe your professional background and qualifications</label>
              <textarea
                className="form-input min-h-32"
                placeholder="List your relevant work history, education, certifications, and projects that showcase your expertise..."
                value={background}
                onChange={(e) => setBackground(e.target.value)}
              />
            </div>

            <Tabs defaultValue="skills" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="skills">Skill Selection</TabsTrigger>
                <TabsTrigger value="learning">Learning Path</TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills" className="space-y-4 pt-4">
                <SkillRecommendations
                  currentRole={currentRole}
                  desiredRole={desiredRole}
                  selectedSkills={selectedSkills}
                  onSkillToggle={toggleSkill}
                  onSkillProficiencyChange={updateSkillProficiency}
                />
              </TabsContent>
              
              <TabsContent value="learning" className="pt-4">
                {selectedSkills.length > 0 ? (
                  <PersonalizedLearning
                    selectedSkills={selectedSkills}
                    currentRole={currentRole}
                    desiredRole={desiredRole}
                  />
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-700 mb-1">No skills selected yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-4">
                      Select skills from the "Skill Selection" tab to generate your personalized learning recommendations.
                    </p>
                    <button
                      className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      onClick={() => setActiveTab('skills')}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Go to Skill Selection
                    </button>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div>
              <label className="font-medium">Your current state (optional)</label>
              <select 
                className="form-select" 
                value={currentState}
                onChange={(e) => setCurrentState(e.target.value)}
              >
                <option value="">Select an option</option>
                {currentStateOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-between pt-4">
              <button
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center"
                onClick={prevStep}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Prev
              </button>
              <button
                className="primary-button inline-flex items-center"
                onClick={nextStep}
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </FormStep>
      )}

      {currentStep === 3 && (
        <FormStep
          step={3}
          totalSteps={3}
          title="Tell us where you want to be"
          subtitle="Consider the ideal industry you'd like to work in and the realistic constraints that may impact your career path."
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Desired industry (optional)</label>
                <select 
                  className="form-select" 
                  value={desiredIndustry}
                  onChange={(e) => setDesiredIndustry(e.target.value)}
                >
                  <option value="">Choose desired industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="font-medium">Company size (optional)</label>
                <select 
                  className="form-select" 
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                >
                  <option value="">Choose company size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Your budget (optional)</label>
                <select
                  className="form-select mb-2"
                  value={showCustomBudget ? 'Other' : budget}
                  onChange={handleBudgetChange}
                >
                  <option value="">Choose your budget</option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                
                {showCustomBudget && (
                  <input
                    type="text"
                    placeholder="Enter custom budget..."
                    className="form-input"
                    value={customBudget}
                    onChange={handleCustomBudgetChange}
                  />
                )}
              </div>
              
              <div>
                <label className="font-medium">Time commitment (optional)</label>
                <select 
                  className="form-select" 
                  value={timeCommitment}
                  onChange={(e) => setTimeCommitment(e.target.value)}
                >
                  <option value="">Choose time commitment</option>
                  {timeCommitments.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center"
                onClick={prevStep}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Prev
              </button>
              <button
                className="primary-button inline-flex items-center"
                onClick={generateRoadmap}
              >
                Build roadmap
                <Sparkles className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </FormStep>
      )}
    </div>
  );
};

export default BuildRoadmap;
