
import { ArrowRight, Map, LineChart, Target, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import FeatureCard from "@/components/FeatureCard";
import { useRoadmap } from "@/context/RoadmapContext";
import { toast } from "sonner";

const Index = () => {
  const { savedRoadmaps, deleteRoadmap, loadRoadmap } = useRoadmap();
  const navigate = useNavigate();

  const handleRoadmapClick = (id: string) => {
    loadRoadmap(id);
    navigate('/roadmap');
  };

  const handleDeleteRoadmap = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteRoadmap(id);
    toast.success("Roadmap deleted successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-24 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 leading-tight animate-fade-in-up">
            Navigate Your Career Journey with Precision
          </h1>
          <p className="text-xl text-gray-600 mb-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Create a personalized roadmap to guide you toward your dream career goals with clear milestones and actionable steps
          </p>
          
          <Link 
            to="/build-roadmap" 
            className="primary-button inline-flex items-center animate-fade-in-up" 
            style={{ animationDelay: "0.2s" }}
          >
            Build your roadmap
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Saved Roadmaps Section */}
      {savedRoadmaps.length > 0 && (
        <section className="container mx-auto px-6 py-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Saved Roadmaps</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedRoadmaps.map((roadmap) => (
              <div 
                key={roadmap.id}
                onClick={() => handleRoadmapClick(roadmap.id)}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{roadmap.title}</h3>
                  <button 
                    onClick={(e) => handleDeleteRoadmap(e, roadmap.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Delete roadmap"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Overall Progress</span>
                    <span className="font-medium">{roadmap.progress}%</span>
                  </div>
                  <Progress value={roadmap.progress} className="h-2" />
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4 text-xs">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {roadmap.milestones.length} milestones
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">
                    {roadmap.milestones.filter(m => m.completed).length} completed
                  </span>
                  
                  {roadmap.budget && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {roadmap.budget}
                    </span>
                  )}
                  
                  {roadmap.timeCommitment && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                      {roadmap.timeCommitment}
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  Created: {new Date(roadmap.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Map}
            title="What is Roadmap Builder"
            description="A powerful tool designed to provide you with a personalized and actionable plan to guide you toward your desired career goals, reducing uncertainty and providing clarity."
          />
          <FeatureCard
            icon={LineChart}
            title="Why it Matters"
            description="Career transitions can be overwhelming and uncertain. Our roadmap offers clear milestones, timelines, and actionable steps to help you navigate your career journey with confidence."
          />
          <FeatureCard
            icon={Target}
            title="What's Next"
            description="Start by entering your current role and where you want to go. We'll analyze your skills and experience to create a tailored roadmap with specific steps to achieve your goals."
          />
        </div>
      </section>
    </div>
  );
};

export default Index;
