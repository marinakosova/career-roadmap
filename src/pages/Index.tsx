
import { ArrowRight, Map, LineChart, Target } from "lucide-react";
import { Link } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
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
