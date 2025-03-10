
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Target, Calendar, Flag, CheckCircle, CheckSquare, BookOpen, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRoadmap } from '@/context/RoadmapContext';
import StatCard from '@/components/StatCard';
import RoadmapChart from '@/components/RoadmapChart';

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
  
  const {
    desiredRole,
    milestones,
    completedMilestones,
    nextDeadline,
    setCompletedMilestones,
  } = useRoadmap();

  const toggleMilestoneCompletion = (id: string) => {
    const updatedMilestones = milestones.map(milestone => {
      if (milestone.id === id) {
        const updatedMilestone = { ...milestone, completed: !milestone.completed };
        return updatedMilestone;
      }
      return milestone;
    });
    
    const newCompletedCount = updatedMilestones.filter(m => m.completed).length;
    setCompletedMilestones(newCompletedCount);
  };

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
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Your Career Milestones</h2>
              
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div 
                    key={milestone.id} 
                    className={`relative pl-8 pb-8 ${
                      index !== milestones.length - 1 ? 'border-l-2 border-gray-200 ml-3' : ''
                    }`}
                  >
                    <div className="absolute left-0 top-0 -ml-3 h-6 w-6 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                      {milestone.completed ? (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                      )}
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                          <p className="text-gray-600 mb-4">{milestone.description}</p>
                          <div className="inline-block bg-secondary text-primary text-sm px-3 py-1 rounded-full">
                            {milestone.timeline}
                          </div>
                        </div>
                        <button 
                          onClick={() => toggleMilestoneCompletion(milestone.id)}
                          className={`p-2 rounded-md transition-colors ${
                            milestone.completed 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          <CheckSquare className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
