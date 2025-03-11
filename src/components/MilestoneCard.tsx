import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckSquare, Square, Calendar, Edit, Trash, ThumbsUp, ThumbsDown, MoveUp, MoveDown, Plus } from 'lucide-react';
import { useRoadmap, ActionableStep, Skill } from '@/context/RoadmapContext';
import SkillTag from './SkillTag';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface MilestoneCardProps {
  id: string;
  index: number;
  title: string;
  description: string;
  timeline: string;
  completed: boolean;
  progress: number;
  skills: Skill[];
  steps: ActionableStep[];
  tools: { id: string; name: string }[];
  resources: { id: string; name: string; url?: string }[];
  feedback?: 'like' | 'dislike' | null;
  isLast: boolean;
  totalMilestones: number;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
  id,
  index,
  title,
  description,
  timeline,
  completed,
  progress,
  skills,
  steps,
  tools,
  resources,
  feedback,
  isLast,
  totalMilestones
}) => {
  const [expanded, setExpanded] = useState(false);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [newStepText, setNewStepText] = useState('');
  const [editText, setEditText] = useState('');
  const [newStepMode, setNewStepMode] = useState(false);
  
  const { 
    updateMilestoneStep, 
    addMilestoneStep, 
    deleteMilestoneStep, 
    toggleMilestoneFeedback,
    swapMilestones
  } = useRoadmap();

  const handleExpandToggle = () => {
    setExpanded(!expanded);
  };

  const handleStepToggle = (stepId: string, completed: boolean) => {
    updateMilestoneStep(id, stepId, { completed: !completed });
  };

  const handleStepEdit = (stepId: string, text: string) => {
    setEditingStepId(stepId);
    setEditText(text);
  };

  const handleSaveEdit = (stepId: string) => {
    updateMilestoneStep(id, stepId, { description: editText });
    setEditingStepId(null);
    setEditText('');
  };

  const handleDelete = (stepId: string) => {
    deleteMilestoneStep(id, stepId);
  };

  const handleAddStep = () => {
    if (newStepText.trim()) {
      addMilestoneStep(id, {
        description: newStepText,
        completed: false
      });
      setNewStepText('');
      setNewStepMode(false);
    }
  };

  const handleSetDeadline = (stepId: string, deadline: string) => {
    updateMilestoneStep(id, stepId, { deadline });
  };

  const handleMoveUp = () => {
    if (index > 0) {
      swapMilestones(index, index - 1);
    }
  };

  const handleMoveDown = () => {
    if (index < totalMilestones - 1) {
      swapMilestones(index, index + 1);
    }
  };

  return (
    <div className="relative">
      {/* Move Up/Down buttons */}
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-1">
        <button 
          onClick={handleMoveUp} 
          disabled={index === 0}
          className={cn(
            "p-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors",
            index === 0 && "opacity-50 cursor-not-allowed"
          )}
          aria-label="Move milestone up"
        >
          <MoveUp className="h-4 w-4 text-gray-500" />
        </button>
        <button 
          onClick={handleMoveDown} 
          disabled={index === totalMilestones - 1}
          className={cn(
            "p-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors",
            index === totalMilestones - 1 && "opacity-50 cursor-not-allowed"
          )}
          aria-label="Move milestone down"
        >
          <MoveDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      
      {/* Timeline connector */}
      <div className={cn(
        "absolute -left-3 top-0 bottom-0 w-0.5 bg-gray-200",
        isLast ? "h-6" : "h-full"
      )} />
      
      {/* Timeline dot */}
      <div className="absolute -left-3 top-6 -ml-1.5 h-4 w-4 rounded-full bg-white border-2 border-primary flex items-center justify-center z-10">
        {completed ? (
          <div className="h-2 w-2 rounded-full bg-primary" />
        ) : (
          <div className="h-2 w-2 rounded-full bg-gray-300" />
        )}
      </div>
      
      {/* Card */}
      <div className={cn(
        "ml-6 mb-6 overflow-hidden transition-all duration-300 ease-in-out",
        "border border-gray-200 rounded-xl shadow-sm bg-white"
      )}>
        {/* Collapsed view */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="mr-2 font-semibold text-lg">{title}</div>
              <div className="text-sm text-gray-500">{timeline}</div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3 text-sm font-medium">
                {progress}%
              </div>
              <button 
                onClick={handleExpandToggle}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={expanded ? "Collapse milestone" : "Expand milestone"}
              >
                {expanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 mb-3 text-sm">{description}</p>
          
          <div className="mb-3">
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <SkillTag key={skill.id} name={skill.name} />
            ))}
          </div>
        </div>
        
        {/* Expanded view */}
        {expanded && (
          <div className="border-t border-gray-200 p-5 bg-gray-50 animate-accordion-down">
            <div className="mb-5">
              <h4 className="text-sm font-semibold mb-2 text-gray-700">Actionable Steps</h4>
              <div className="space-y-2">
                {steps.map(step => (
                  <div key={step.id} className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
                    {editingStepId === step.id ? (
                      <div className="flex-1">
                        <Input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="mb-2"
                        />
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setEditingStepId(null)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleSaveEdit(step.id)}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStepToggle(step.id, step.completed)}
                          className="mt-0.5 mr-3 flex-shrink-0"
                          aria-label={step.completed ? "Mark as incomplete" : "Mark as complete"}
                        >
                          {step.completed ? (
                            <CheckSquare className="h-5 w-5 text-primary" />
                          ) : (
                            <Square className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                        
                        <div className="flex-1">
                          <div className={cn(
                            "text-sm mb-1",
                            step.completed && "line-through text-gray-500"
                          )}>
                            {step.description}
                          </div>
                          
                          {step.deadline && (
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>Deadline: {step.deadline}</span>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            {!step.deadline && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-7 text-xs"
                                onClick={() => handleSetDeadline(step.id, new Date().toISOString().split('T')[0])}
                              >
                                <Calendar className="h-3 w-3 mr-1" />
                                Add deadline
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex ml-2 gap-1">
                          <button
                            onClick={() => handleStepEdit(step.id, step.description)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            aria-label="Edit step"
                          >
                            <Edit className="h-4 w-4 text-gray-500" />
                          </button>
                          <button
                            onClick={() => handleDelete(step.id)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            aria-label="Delete step"
                          >
                            <Trash className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                
                {newStepMode ? (
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <Input
                      placeholder="Describe the step..."
                      value={newStepText}
                      onChange={(e) => setNewStepText(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => {
                          setNewStepMode(false);
                          setNewStepText('');
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleAddStep}
                        disabled={!newStepText.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-center"
                    onClick={() => setNewStepMode(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Step
                  </Button>
                )}
              </div>
            </div>
            
            {(tools.length > 0 || resources.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                {tools.length > 0 && (
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Tools</h4>
                    <ul className="space-y-1">
                      {tools.map(tool => (
                        <li key={tool.id} className="text-sm text-gray-600 flex items-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 mt-1.5"></span>
                          {tool.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {resources.length > 0 && (
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Resources</h4>
                    <ul className="space-y-2">
                      {resources.map(resource => (
                        <li key={resource.id} className="text-sm text-gray-600 flex items-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 mt-1.5"></span>
                          {resource.url ? (
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-primary hover:underline"
                            >
                              {resource.name}
                            </a>
                          ) : (
                            resource.name
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "gap-2",
                  feedback === 'like' && "bg-green-50 border-green-200 text-green-600"
                )}
                onClick={() => toggleMilestoneFeedback(id, 'like')}
                aria-label="Mark as helpful"
              >
                <ThumbsUp className="h-4 w-4" />
                Helpful
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "gap-2",
                  feedback === 'dislike' && "bg-red-50 border-red-200 text-red-600"
                )}
                onClick={() => toggleMilestoneFeedback(id, 'dislike')}
                aria-label="Mark as not helpful"
              >
                <ThumbsDown className="h-4 w-4" />
                Not helpful
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MilestoneCard;
