
import React from 'react';
import { Sparkles } from 'lucide-react';

interface Step1Props {
  currentRole: string;
  setCurrentRole: (role: string) => void;
  currentLevel: string;
  setCurrentLevel: (level: string) => void;
  experience: string;
  setExperience: (experience: string) => void;
  desiredRole: string;
  setDesiredRole: (role: string) => void;
  desiredLevel: string;
  setDesiredLevel: (level: string) => void;
  nextStep: () => void;
  levels: string[];
}

const Step1BasicInfo: React.FC<Step1Props> = ({
  currentRole,
  setCurrentRole,
  currentLevel,
  setCurrentLevel,
  experience,
  setExperience,
  desiredRole,
  setDesiredRole,
  desiredLevel,
  setDesiredLevel,
  nextStep,
  levels
}) => {
  return (
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
  );
};

export default Step1BasicInfo;
