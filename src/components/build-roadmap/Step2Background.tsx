
import React from 'react';
import { ArrowLeft, ArrowRight, Upload, Edit } from 'lucide-react';
import SkillRecommendations from '@/components/SkillRecommendations';
import { Button } from '@/components/ui/button';
import { Skill, SkillProficiency, useRoadmap } from '@/context/RoadmapContext';
import { toast } from 'sonner';

interface Step2Props {
  background: string;
  setBackground: (background: string) => void;
  currentRole: string;
  desiredRole: string;
  selectedSkills: Skill[];
  toggleSkill: (skill: Skill) => void;
  updateSkillProficiency: (skillName: string, proficiency: SkillProficiency) => void;
  currentState: string;
  setCurrentState: (state: string) => void;
  currentStateOptions: string[];
  prevStep: () => void;
  nextStep: () => void;
}

const Step2Background: React.FC<Step2Props> = ({
  background,
  setBackground,
  currentRole,
  desiredRole,
  selectedSkills,
  toggleSkill,
  updateSkillProficiency,
  currentState,
  setCurrentState,
  currentStateOptions,
  prevStep,
  nextStep
}) => {
  const handleResumeUpload = () => {
    toast.info("Resume upload feature coming soon in the full version");
  };

  const handleManualAdd = () => {
    toast.info("Manual entry feature coming soon in the full version");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="font-medium block mb-2">Add your work history</label>
        <div className="flex gap-3 mb-4">
          <Button 
            onClick={handleResumeUpload} 
            className="flex-1 flex items-center justify-center gap-2"
            variant="outline"
          >
            <Upload className="h-4 w-4" />
            Upload Resume
          </Button>
          <Button 
            onClick={handleManualAdd} 
            className="flex-1 flex items-center justify-center gap-2"
            variant="outline"
          >
            <Edit className="h-4 w-4" />
            Add Manually
          </Button>
        </div>
      </div>

      <div>
        <label className="font-medium">Additional certifications or qualifications</label>
        <textarea
          className="form-input min-h-32"
          placeholder="List any certifications, courses, or other qualifications that may not be on your resume..."
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <SkillRecommendations
          currentRole={currentRole}
          desiredRole={desiredRole}
          selectedSkills={selectedSkills}
          onSkillToggle={toggleSkill}
          onSkillProficiencyChange={updateSkillProficiency}
        />
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
  );
};

export default Step2Background;
