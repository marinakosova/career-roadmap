import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoadmap } from '@/context/RoadmapContext';
import { Button } from '@/components/ui/button';

const BuildRoadmap = () => {
  const navigate = useNavigate();
  const { setMilestones } = useRoadmap();

  const handleGenerateRoadmap = () => {
    setMilestones([
      {
        id: "milestone-1",
        title: "Get Started with Product Management",
        description: "Learn the fundamentals of product management",
        timeline: "1-2 weeks",
        completed: false,
        progress: 0,
        skills: [
          { id: "skill-1", name: "Product Strategy" },
          { id: "skill-2", name: "User Research" }
        ],
        steps: [
          {
            id: "step-1",
            description: "Complete Product Management Fundamentals course",
            completed: false
          },
          {
            id: "step-2",
            description: "Read 'Inspired' by Marty Cagan",
            completed: false
          }
        ],
        tools: [
          { id: "tool-1", name: "Jira" },
          { id: "tool-2", name: "Figma" }
        ],
        resources: [
          { 
            id: "resource-1", 
            name: "Product School Blog",
            url: "https://productschool.com/blog"
          }
        ]
      },
      {
        id: "milestone-2",
        title: "Build Your First Product Strategy",
        description: "Apply product management principles to a real project",
        timeline: "2-3 weeks",
        completed: false,
        progress: 0,
        skills: [
          { id: "skill-3", name: "Product Analytics" },
          { id: "skill-4", name: "Stakeholder Management" }
        ],
        steps: [
          {
            id: "step-3",
            description: "Define product vision and strategy",
            completed: false
          },
          {
            id: "step-4",
            description: "Create a product roadmap",
            completed: false
          }
        ],
        tools: [
          { id: "tool-3", name: "Amplitude" },
          { id: "tool-4", name: "Miro" }
        ],
        resources: [
          {
            id: "resource-2",
            name: "Product Plan Templates",
            url: "https://www.productplan.com/templates/"
          }
        ]
      }
    ]);
    
    navigate('/roadmap');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Build Your Career Roadmap</h1>
      <Button onClick={handleGenerateRoadmap}>
        Generate Roadmap
      </Button>
    </div>
  );
};

export default BuildRoadmap;
