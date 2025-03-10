
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Target, Calendar, Flag, CheckCircle, CheckSquare, BookOpen, MessageSquare, Clock, Award, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRoadmap } from '@/context/RoadmapContext';
import { Progress } from "@/components/ui/progress";
import StatCard from '@/components/StatCard';
import RoadmapChart from '@/components/RoadmapChart';
import MilestoneCard from '@/components/MilestoneCard';

// Sample market data
const marketData = [
  { name: '2022', value: 5000 },
  { name: '2023', value: 7500 },
  { name: '2024', value: 10000 },
  { name: '2025', value: 14000 },
  { name: '2026', value: 18000 },
  { name: '2027', value: 20000 },
];

// Sample salary data
const salaryData = [
  { name: 'Entry', value: 50000 },
  { name: 'Junior', value: 70000 },
  { name: 'Mid', value: 90000 },
  { name: 'Senior', value: 120000 },
  { name: 'Lead', value: 150000 },
];

// Sample similar roles
const similarRoles = [
  'Product Owner', 
  'Technical Product Manager', 
  'UX Product Manager', 
  'Digital Product Manager',
  'Product Marketing Manager'
];

const Roadmap = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [overallProgress, setOverallProgress] = useState(0);
  
  const {
    desiredRole,
    milestones,
    completedMilestones,
    nextDeadline,
  } = useRoadmap();

  // Calculate overall progress based on milestones
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
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold">
              Your roadmap to <span className="text-primary">{desiredRole}</span>
            </h1>
            <Link 
              to="/build-roadmap" 
              className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary text-primary hover:bg-secondary/80 transition-colors"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Rebuild roadmap
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            icon={Target} 
            value={milestones.length} 
            label="Total Milestones" 
          />
          <StatCard 
            icon={CheckCircle} 
            value={completedMilestones} 
            label="Completed" 
          />
          <StatCard 
            icon={Calendar} 
            value={nextDeadline} 
            label="Upcoming Deadline" 
          />
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
            <TabsTrigger 
              value="chat" 
              className={`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent opacity-50`}
              disabled
            >
              AI Chat
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="pt-8 animate-fade-in-up">
            <div className="space-y-8">
              <RoadmapChart 
                data={marketData} 
                color="#9B87F5" 
                title="Market Projection" 
                height={350}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RoadmapChart 
                  data={salaryData} 
                  color="#0EA5E9" 
                  title="Salary Projection" 
                />
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">Similar Roles</h3>
                  <ul className="space-y-3">
                    {similarRoles.map((role, index) => (
                      <li key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones" className="pt-8 animate-fade-in-up">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-xl font-semibold">Overall Progress</h3>
                  </div>
                  <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
                </div>
                
                <Progress value={overallProgress} className="h-3 mb-4" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Milestones</div>
                      <div className="font-semibold">{milestones.length} total</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Completed</div>
                      <div className="font-semibold">{completedMilestones} milestones</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Estimated Time</div>
                      <div className="font-semibold">{milestones.length * 2} weeks</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative pl-8">
                <h2 className="text-2xl font-bold mb-6">Your Career Milestones</h2>
                
                <div className="space-y-2">
                  {milestones.map((milestone, index) => (
                    <MilestoneCard 
                      key={milestone.id}
                      id={milestone.id}
                      index={index}
                      title={milestone.title}
                      description={milestone.description}
                      timeline={milestone.timeline}
                      completed={milestone.completed}
                      progress={milestone.progress}
                      skills={milestone.skills || []}
                      steps={milestone.steps || []}
                      tools={milestone.tools || []}
                      resources={milestone.resources || []}
                      feedback={milestone.feedback}
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

          {/* Resources Tab */}
          <TabsContent value="resources" className="pt-8 animate-fade-in-up">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-secondary/50 mr-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Online Courses</h3>
                      <p className="text-gray-600 mb-4">Comprehensive learning platforms to build your skills</p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>Coursera</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>Udemy</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>LinkedIn Learning</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-secondary/50 mr-4">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Communities</h3>
                      <p className="text-gray-600 mb-4">Connect with like-minded professionals</p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>Reddit</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>Slack Communities</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>LinkedIn Groups</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-secondary/50 mr-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Career Development</h3>
                      <p className="text-gray-600 mb-4">Tools to advance your professional growth</p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>Resume Builders</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>Interview Practice</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>Networking Events</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-secondary/50 mr-4">
                      <Flag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Industry Standards</h3>
                      <p className="text-gray-600 mb-4">Stay updated with the latest in your field</p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>Industry Publications</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>Research Papers</span>
                        </li>
                        <li className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                          <span>Certification Programs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* AI Chat Tab (Disabled) */}
          <TabsContent value="chat" className="pt-8 animate-fade-in-up">
            <div className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-600">AI Chat coming soon</h3>
              <p className="text-gray-500 max-w-md text-center mt-2">
                Our AI assistant will be available soon to answer your questions and provide personalized guidance.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Roadmap;
