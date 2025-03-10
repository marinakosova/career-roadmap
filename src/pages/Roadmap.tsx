
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Save, Target } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRoadmap } from '@/context/RoadmapContext';
import { toast } from "sonner";
import Navigation from '@/components/Navigation';
import StatCard from '@/components/StatCard';
import { OverviewSection, ResourcesSection } from '@/components/roadmap/RoadmapSections';
import MilestoneCard from '@/components/MilestoneCard';

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

  const handleSaveRoadmap = () => {
    saveRoadmap();
    toast.success("Roadmap saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">
                {desiredRole || "Your Career Goal"}
              </h1>
              {milestones.length > 0 && (
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

      {/* Tabs Navigation */}
      <div className="container mx-auto px-6">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto">
            <TabsTrigger 
              value="overview" 
              className={`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent`}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="milestones" 
              className={`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent`}
            >
              Milestones
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className={`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent`}
            >
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-8 animate-fade-in-up">
            <OverviewSection />
          </TabsContent>

          <TabsContent value="milestones" className="pt-8 animate-fade-in-up">
            <div className="space-y-8">
              <div className="relative pl-8">
                <h2 className="text-2xl font-bold mb-6">Your Career Milestones</h2>
                
                <div className="space-y-2">
                  {milestones.map((milestone, index) => (
                    <MilestoneCard 
                      key={milestone.id}
                      index={index}
                      {...milestone}
                      isLast={index === milestones.length - 1}
                      totalMilestones={milestones.length}
                    />
                  ))}
                  
                  {milestones.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                      <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-600">No milestones yet</h3>
                      <p className="text-gray-500 max-w-md mx-auto mt-2">
                        Complete the roadmap builder to generate personalized career milestones.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="pt-8 animate-fade-in-up">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
              <ResourcesSection />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Roadmap;
