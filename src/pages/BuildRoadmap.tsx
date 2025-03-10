
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import FormStep from '@/components/FormStep';
import SkillTag from '@/components/SkillTag';
import { useRoadmap } from '@/context/RoadmapContext';
import { toast } from 'sonner';

// Sample skills based on roles
const roleSkills: Record<string, string[]> = {
  'software developer': ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Git', 'API Design', 'CSS', 'HTML', 'MongoDB'],
  'product manager': ['User Research', 'Agile', 'Roadmapping', 'Stakeholder Management', 'Data Analysis', 'UX Design', 'Market Research'],
  'data scientist': ['Python', 'R', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistical Analysis', 'Pandas', 'TensorFlow'],
  'ux designer': ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'UI Design', 'User Testing', 'Adobe XD'],
  'marketing manager': ['SEO', 'Content Strategy', 'Social Media', 'Analytics', 'Email Marketing', 'Branding', 'Campaign Management'],
  'project manager': ['Agile', 'Scrum', 'Budgeting', 'Risk Management', 'Stakeholder Management', 'Documentation', 'Jira'],
};

const currentStateOptions = [
  'I don\'t like my current job',
  'I\'m thinking about career change',
  'I decided to change career',
  'I\'m currently studying for my new career',
  'I\'m currently networking & interviewing'
];

const levels = ['Entry', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Executive'];
const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Entertainment'];
const companySizes = ['Startup (1-10)', 'Small (11-50)', 'Medium (51-200)', 'Large (201-1000)', 'Enterprise (1000+)'];
const timeCommitments = ['Part-time', 'Full-time', 'Flexible hours', 'Contract'];

const BuildRoadmap = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  
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
    setNextDeadline
  } = useRoadmap();

  // Initialize milestones when generating roadmap
  const generateRoadmap = () => {
    if (!desiredRole.trim()) {
      toast.error("Please enter your desired role");
      return;
    }

    const milestones = [
      {
        id: '1',
        title: 'Skill Assessment & Gap Analysis',
        description: 'Identify your current skills and compare them with those required for your target role.',
        timeline: '2 weeks',
        completed: false
      },
      {
        id: '2',
        title: 'Learning Path Creation',
        description: 'Develop a structured learning plan focused on acquiring the missing skills.',
        timeline: '1 month',
        completed: false
      },
      {
        id: '3',
        title: 'Portfolio Development',
        description: 'Create projects that demonstrate your new skills and highlight your expertise.',
        timeline: '3 months',
        completed: false
      },
      {
        id: '4',
        title: 'Network Building',
        description: 'Connect with professionals in your target field and attend industry events.',
        timeline: '2 months',
        completed: false
      },
      {
        id: '5',
        title: 'Job Application Strategy',
        description: 'Prepare resume, cover letter, and interview skills tailored to your target role.',
        timeline: '1 month',
        completed: false
      }
    ];

    setMilestones(milestones);
    setCompletedMilestones(0);
    
    // Set a deadline 6 months from now
    const deadline = new Date();
    deadline.setMonth(deadline.getMonth() + 1);
    setNextDeadline(deadline.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));

    toast.success("Creating your personalized roadmap...");
    
    // Navigate to the roadmap page
    setTimeout(() => {
      navigate('/roadmap');
    }, 1500);
  };

  // Update suggested skills when current role changes
  useEffect(() => {
    const normalizedRole = currentRole.toLowerCase().trim();
    
    if (normalizedRole && roleSkills[normalizedRole]) {
      setSuggestedSkills(roleSkills[normalizedRole]);
    } else {
      // If role not found in our mapping, provide generic skills
      const allSkills = Object.values(roleSkills).flat();
      const uniqueSkills = [...new Set(allSkills)];
      setSuggestedSkills(uniqueSkills.slice(0, 10));
    }
  }, [currentRole]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => {
      const isSelected = prev.some(s => s.name === skill);
      
      if (isSelected) {
        return prev.filter(s => s.name !== skill);
      } else {
        return [...prev, { id: Date.now().toString(), name: skill, selected: true }];
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
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
          subtitle="The more you add, the more personalized and relevant results you'll get. Anything you can think of related to your skillset will be valuable and help to achieve better results."
        >
          <div className="space-y-6">
            <div>
              <label className="font-medium">Tell us more about your experience, include relevant education and certificates</label>
              <textarea
                className="form-input min-h-32"
                placeholder="Share your background..."
                value={background}
                onChange={(e) => setBackground(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-medium">Add relevant skills</label>
                <p className="text-sm text-gray-500 mb-2">Add up to 10 skills to create a personalized roadmap that factors in your current and transferable skills.</p>
                <div className="mt-2">
                  {selectedSkills.map((skill) => (
                    <SkillTag 
                      key={skill.id} 
                      name={skill.name} 
                      selected={true} 
                      onClick={() => toggleSkill(skill.name)} 
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="font-medium">Suggested skills</label>
                <div className="mt-2">
                  {suggestedSkills
                    .filter(skill => !selectedSkills.some(s => s.name === skill))
                    .map((skill) => (
                      <SkillTag 
                        key={skill} 
                        name={skill} 
                        selected={false}
                        onClick={() => toggleSkill(skill)} 
                      />
                    ))}
                </div>
              </div>
            </div>

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
          subtitle="Consider the ideal industry you'd like to work in and the realistic constraints that may impact your career path. Take a moment to assess your current stress level to gain awareness of your emotional state."
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
                <input
                  type="text"
                  placeholder="Enter your budget..."
                  className="form-input"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
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
