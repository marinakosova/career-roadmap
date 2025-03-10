
import React, { useState, useEffect } from 'react';
import { useRoadmap } from '@/context/RoadmapContext';
import Navigation from '@/components/Navigation';
import RoadmapHeader from '@/components/roadmap/RoadmapHeader';
import RoadmapTabs from '@/components/roadmap/RoadmapTabs';

const Roadmap = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [overallProgress, setOverallProgress] = useState(0);
  
  const {
    desiredRole,
    milestones,
    completedMilestones,
    nextDeadline,
    saveRoadmap,
    budget,
    companySize,
    timeCommitment
  } = useRoadmap();

  useEffect(() => {
    if (milestones.length > 0) {
      const totalProgress = milestones.reduce((sum, milestone) => sum + milestone.progress, 0);
      setOverallProgress(Math.round(totalProgress / milestones.length));
    } else {
      setOverallProgress(0);
    }
  }, [milestones]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      
      <RoadmapHeader 
        desiredRole={desiredRole}
        overallProgress={overallProgress}
        saveRoadmap={saveRoadmap}
        budget={budget}
        companySize={companySize}
        timeCommitment={timeCommitment}
        milestonesExist={milestones.length > 0}
      />
      
      <div className="container mx-auto px-6">
        <RoadmapTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          milestones={milestones}
          desiredRole={desiredRole}
        />
      </div>
    </div>
  );
};

export default Roadmap;
