
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewSection, ResourcesSection } from '@/components/roadmap/RoadmapSections';
import MilestonesSection from '@/components/roadmap/MilestonesSection';
import SkillsSection from '@/components/roadmap/SkillsSection';
import { Milestone } from '@/context/RoadmapContext';
import ProgressTrackerSection from '@/components/roadmap/ProgressTrackerSection';

interface RoadmapTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  milestones: Milestone[];
  desiredRole?: string;
}

const RoadmapTabs: React.FC<RoadmapTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  milestones,
  desiredRole 
}) => {
  return (
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
          value="skills" 
          className={`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent`}
        >
          Skills
        </TabsTrigger>
        <TabsTrigger 
          value="progress" 
          className={`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent`}
        >
          Progress
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
        <MilestonesSection milestones={milestones} desiredRole={desiredRole} />
      </TabsContent>

      <TabsContent value="skills" className="pt-8 animate-fade-in-up">
        <SkillsSection desiredRole={desiredRole} milestones={milestones} />
      </TabsContent>

      <TabsContent value="progress" className="pt-8 animate-fade-in-up">
        <ProgressTrackerSection milestones={milestones} />
      </TabsContent>

      <TabsContent value="resources" className="pt-8 animate-fade-in-up">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
          <ResourcesSection />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default RoadmapTabs;
