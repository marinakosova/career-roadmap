
import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface Step3Props {
  desiredIndustry: string;
  setDesiredIndustry: (industry: string) => void;
  companySize: string;
  setCompanySize: (size: string) => void;
  budget: string;
  setBudget: (budget: string) => void;
  timeCommitment: string;
  setTimeCommitment: (time: string) => void;
  industries: string[];
  companySizes: string[];
  budgetOptions: string[];
  timeCommitments: string[];
  customBudget: string;
  setCustomBudget: (budget: string) => void;
  showCustomBudget: boolean;
  setShowCustomBudget: (show: boolean) => void;
  handleBudgetChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCustomBudgetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevStep: () => void;
  generateRoadmap: () => void;
}

const Step3Preferences: React.FC<Step3Props> = ({
  desiredIndustry,
  setDesiredIndustry,
  companySize,
  setCompanySize,
  budget,
  timeCommitment,
  setTimeCommitment,
  industries,
  companySizes,
  budgetOptions,
  timeCommitments,
  customBudget,
  showCustomBudget,
  handleBudgetChange,
  handleCustomBudgetChange,
  prevStep,
  generateRoadmap
}) => {
  return (
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
  );
};

export default Step3Preferences;
