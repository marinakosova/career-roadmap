
import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Save } from 'lucide-react';
import { toast } from 'sonner';

interface RoadmapHeaderProps {
  desiredRole: string;
  overallProgress: number;
  saveRoadmap: () => void;
  budget?: string;
  companySize?: string;
  timeCommitment?: string;
  milestonesExist: boolean;
}

const RoadmapHeader: React.FC<RoadmapHeaderProps> = ({
  desiredRole,
  overallProgress,
  saveRoadmap,
  budget,
  companySize,
  timeCommitment,
  milestonesExist
}) => {
  const handleSaveRoadmap = () => {
    saveRoadmap();
    toast.success("Roadmap saved successfully!");
  };

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">
              Your roadmap to <span className="text-primary">{desiredRole || "Your Career Goal"}</span>
            </h1>
            {milestonesExist && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {overallProgress}% complete
              </div>
            )}
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleSaveRoadmap}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-primary text-primary hover:bg-primary/5 transition-colors"
            >
              <Save className="mr-2 h-4 w-4" />
              Save roadmap
            </button>
            <Link 
              to="/build-roadmap" 
              className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary text-primary hover:bg-secondary/80 transition-colors"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Rebuild roadmap
            </Link>
          </div>
        </div>
        
        {/* User preferences tags */}
        {(budget || companySize || timeCommitment) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {budget && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Budget: {budget}
              </span>
            )}
            {companySize && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Company: {companySize}
              </span>
            )}
            {timeCommitment && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Time: {timeCommitment}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapHeader;
