
import React, { useState } from 'react';
import { Calendar, CheckCircle2, Trophy } from 'lucide-react';
import { Milestone } from '@/context/RoadmapContext';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProgressTrackerSectionProps {
  milestones: Milestone[];
  showTasksSection?: boolean;
}

const ProgressTrackerSection: React.FC<ProgressTrackerSectionProps> = ({ 
  milestones,
  showTasksSection = true 
}) => {
  // Get all actionable steps from all milestones
  const allSteps = React.useMemo(() => {
    return milestones.flatMap(milestone => 
      milestone.steps.map(step => ({
        ...step,
        milestoneId: milestone.id,
        milestoneName: milestone.title
      }))
    );
  }, [milestones]);

  // Calculate statistics
  const stats = React.useMemo(() => {
    const totalSteps = allSteps.length;
    const completedSteps = allSteps.filter(step => step.completed).length;
    const completionRate = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
    
    // Get upcoming deadlines
    const today = new Date();
    const upcomingDeadlines = allSteps
      .filter(step => !step.completed && step.deadline)
      .sort((a, b) => {
        if (!a.deadline || !b.deadline) return 0;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      })
      .slice(0, 3);
    
    // For now, set streak to 0 since we don't have completedDate information
    // In a real application, we would need to add completedDate to the ActionableStep type
    // and update it whenever a step is marked as completed
    const streak = 0;
    
    return {
      totalSteps,
      completedSteps,
      completionRate,
      upcomingDeadlines,
      streak
    };
  }, [allSteps]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Progress Tracker</h2>
        <p className="text-gray-600 mb-6">
          Track your progress towards your career goals. Monitor tasks, deadlines, and achievements.
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.completionRate}%</div>
              <Progress value={stats.completionRate} className="h-2 w-24" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.completedSteps} of {stats.totalSteps} tasks completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.streak} days</div>
              <Trophy className="h-6 w-6 text-amber-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.streak === 0 
                ? "Complete tasks to start your streak!" 
                : "Keep it up for better results!"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Next Deadline</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.upcomingDeadlines.length > 0 ? (
              <div>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Calendar className="h-4 w-4 text-primary" />
                  {new Date(stats.upcomingDeadlines[0].deadline!).toLocaleDateString('en-US', { 
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {stats.upcomingDeadlines[0].description}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTrackerSection;
