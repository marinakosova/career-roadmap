
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Trash2 } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRoadmap } from '@/context/RoadmapContext';
import { toast } from 'sonner';

const Index = () => {
  const { savedRoadmaps, deleteRoadmap, loadRoadmap } = useRoadmap();

  const handleDeleteRoadmap = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    deleteRoadmap(id);
    toast.success("Roadmap deleted");
  };

  const handleRoadmapClick = (id: string) => {
    loadRoadmap(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="container mx-auto px-6 py-28">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Transform Your <span className="text-primary">Career Path</span> with AI Guidance
          </h1>
          <p className="text-xl text-gray-600">
            Build a personalized roadmap that takes you from where you are to where you want to be in your career journey.
          </p>
          <div className="pt-4">
            <Link to="/build-roadmap">
              <Button size="lg" className="rounded-full px-8">
                Build your roadmap
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Saved roadmaps section */}
      {savedRoadmaps.length > 0 && (
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Your Saved Roadmaps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedRoadmaps.map((roadmap) => (
              <Link
                key={roadmap.id}
                to="/roadmap"
                onClick={() => handleRoadmapClick(roadmap.id)}
                className="block group"
              >
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md group-hover:border-primary/20">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">{roadmap.title}</h3>
                        <p className="text-sm text-gray-500">
                          Created: {new Date(roadmap.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <Button
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-500"
                        onClick={(e) => handleDeleteRoadmap(e, roadmap.id)}
                        aria-label="Delete roadmap"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-medium text-primary">{roadmap.progress}%</span>
                        </div>
                        <Progress value={roadmap.progress} className="h-2" />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {roadmap.budget && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                            {roadmap.budget}
                          </span>
                        )}
                        {roadmap.companySize && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800">
                            {roadmap.companySize}
                          </span>
                        )}
                        {roadmap.timeCommitment && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                            {roadmap.timeCommitment}
                          </span>
                        )}
                      </div>
                      
                      <div className="pt-2">
                        <div className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                          Continue to roadmap
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Features section */}
      <div className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Personalized Career Roadmap"
            description="Get a tailored step-by-step plan to achieve your career goals based on your current skills and experience."
            icon="Sparkles"
          />
          <FeatureCard
            title="Skill Gap Analysis"
            description="Identify the skills you need to develop to reach your target role and get resources to learn them."
            icon="LineChart"
          />
          <FeatureCard
            title="Progress Tracking"
            description="Track your career development journey with milestones and celebrate your achievements."
            icon="CheckCircle"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
