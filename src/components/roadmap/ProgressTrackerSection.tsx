
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
    
    // Calculate streak based on completed tasks
    // If we have no completed tasks or steps, streak is 0
    let streak = 0;
    
    if (completedSteps > 0) {
      // Get the completed steps with completion dates
      const completedWithDates = allSteps
        .filter(step => step.completed && step.completedDate)
        .map(step => ({
          ...step,
          completedDate: step.completedDate ? new Date(step.completedDate) : new Date()
        }))
        .sort((a, b) => b.completedDate.getTime() - a.completedDate.getTime());
      
      if (completedWithDates.length > 0) {
        // Check if there's at least one task completed today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const mostRecentDate = completedWithDates[0].completedDate;
        mostRecentDate.setHours(0, 0, 0, 0);
        
        const daysDifference = Math.floor((today.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        // If completed today or yesterday, start counting streak
        if (daysDifference <= 1) {
          streak = 1;
          
          // Count back through previous days
          let currentDate = new Date(today);
          currentDate.setDate(currentDate.getDate() - 1);
          
          let streakContinues = true;
          
          while (streakContinues) {
            const tasksCompletedOnDate = completedWithDates.filter(task => {
              const taskDate = new Date(task.completedDate);
              taskDate.setHours(0, 0, 0, 0);
              return taskDate.getTime() === currentDate.getTime();
            });
            
            if (tasksCompletedOnDate.length > 0) {
              streak++;
              currentDate.setDate(currentDate.getDate() - 1);
            } else {
              streakContinues = false;
            }
          }
        }
      }
    }
    
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
