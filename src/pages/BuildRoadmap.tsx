import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import FormStep from '@/components/FormStep';
import { useRoadmap, Skill, SkillProficiency, SkillCategory } from '@/context/RoadmapContext';
import { toast } from 'sonner';
import Step1BasicInfo from '@/components/build-roadmap/Step1BasicInfo';
import Step2Background from '@/components/build-roadmap/Step2Background';
import Step3Preferences from '@/components/build-roadmap/Step3Preferences';
import { generateRoadmapMilestones } from '@/utils/roadmapGenerator';
import { getRecommendedSkills } from '@/utils/skillsRecommendation';

const skillCategories = [
  { id: 'technical', name: 'Technical Skills', icon: 'code', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { id: 'soft', name: 'Soft Skills', icon: 'users', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { id: 'industry', name: 'Industry Knowledge', icon: 'building2', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { id: 'domain', name: 'Domain Expertise', icon: 'brain', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { id: 'business', name: 'Business Skills', icon: 'briefcase', color: 'bg-rose-50 border-rose-200 text-rose-700' },
  { id: 'analytics', name: 'Analytics', icon: 'lineChart', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
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
  const [suggestedSkills, setSuggestedSkills] = useState<Array<Skill & { relevance?: string; score?: number }>>([]);
  const [customBudget, setCustomBudget] = useState('');
  const [showCustomBudget, setShowCustomBudget] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
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
    saveRoadmap,
    updateSkillProficiency
  } = useRoadmap();

  const generateRoadmap = () => {
    if (!desiredRole.trim()) {
      toast.error("Please enter your desired role");
      return;
    }

    const milestones = generateRoadmapMilestones(selectedSkills, budget, companySize, timeCommitment);
    
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
    if (currentRole && desiredRole) {
      const recommendations = getRecommendedSkills(currentRole, desiredRole);
      setSuggestedSkills(recommendations);
    } else {
      setSuggestedSkills([]);
    }
  }, [currentRole, desiredRole]);

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
          <Step1BasicInfo 
            currentRole={currentRole}
            setCurrentRole={setCurrentRole}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            experience={experience}
            setExperience={setExperience}
            desiredRole={desiredRole}
            setDesiredRole={setDesiredRole}
            desiredLevel={desiredLevel}
            setDesiredLevel={setDesiredLevel}
            nextStep={nextStep}
            levels={levels}
          />
        </FormStep>
      )}

      {currentStep === 2 && (
        <FormStep
          step={2}
          totalSteps={3}
          title="Tell us more about your background"
          subtitle="The more you add, the more personalized and relevant results you'll get. Add skills and set your proficiency level to create a comprehensive skill inventory."
        >
          <Step2Background 
            background={background}
            setBackground={setBackground}
            currentRole={currentRole}
            desiredRole={desiredRole}
            selectedSkills={selectedSkills}
            toggleSkill={toggleSkill}
            updateSkillProficiency={updateSkillProficiency}
            currentState={currentState}
            setCurrentState={setCurrentState}
            currentStateOptions={currentStateOptions}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        </FormStep>
      )}

      {currentStep === 3 && (
        <FormStep
          step={3}
          totalSteps={3}
          title="Tell us where you want to be"
          subtitle="Consider the ideal industry you'd like to work in and the realistic constraints that may impact your career path."
        >
          <Step3Preferences 
            desiredIndustry={desiredIndustry}
            setDesiredIndustry={setDesiredIndustry}
            companySize={companySize}
            setCompanySize={setCompanySize}
            budget={budget}
            setBudget={setBudget}
            timeCommitment={timeCommitment}
            setTimeCommitment={setTimeCommitment}
            industries={industries}
            companySizes={companySizes}
            budgetOptions={budgetOptions}
            timeCommitments={timeCommitments}
            customBudget={customBudget}
            setCustomBudget={setCustomBudget}
            showCustomBudget={showCustomBudget}
            setShowCustomBudget={setShowCustomBudget}
            handleBudgetChange={handleBudgetChange}
            handleCustomBudgetChange={handleCustomBudgetChange}
            prevStep={prevStep}
            generateRoadmap={generateRoadmap}
          />
        </FormStep>
      )}
    </div>
  );
};

export default BuildRoadmap;
