
import React, { ReactNode } from 'react';

interface FormStepProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  step: number;
  totalSteps: number;
}

const FormStep: React.FC<FormStepProps> = ({ children, title, subtitle, step, totalSteps }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl mx-auto animate-scale-in">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {step} OF {totalSteps}
          </div>
        </div>
        <div className="step-indicator mb-8">
          <div className="step-indicator-progress" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default FormStep;
