
import React, { useState } from 'react';
import { Calendar, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock, TimerIcon, Trophy } from 'lucide-react';
import { Milestone, ActionableStep } from '@/context/RoadmapContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ProgressTrackerSectionProps {
  milestones: Milestone[];
}

type TimeframeOption = 'all' | 'weekly' | 'monthly' | 'quarterly';

const ProgressTrackerSection: React.FC<ProgressTrackerSectionProps> = ({ milestones }) => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('monthly');
  const [currentPeriod, setCurrentPeriod] = useState<number>(0);

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
    
    // Calculate streak (consecutive days with completed tasks)
    // For demo purposes, we'll use a random streak number
    const streak = Math.floor(Math.random() * 10) + 1;
    
    return {
      totalSteps,
      completedSteps,
      completionRate,
      upcomingDeadlines,
      streak
    };
  }, [allSteps]);

  // Filter tasks based on selected timeframe
  const filteredTasks = React.useMemo(() => {
    const today = new Date();
    
    // Default to showing all tasks
    if (timeframe === 'all') return allSteps;
    
    // Define the start and end dates based on timeframe and current period
    let startDate = new Date();
    let endDate = new Date();
    
    switch (timeframe) {
      case 'weekly':
        // Set to the beginning of the current week + period offset
        startDate.setDate(today.getDate() - today.getDay() + (currentPeriod * 7));
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        break;
      case 'monthly':
        // Set to the beginning of the current month + period offset
        startDate = new Date(today.getFullYear(), today.getMonth() + currentPeriod, 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + currentPeriod + 1, 0);
        break;
      case 'quarterly':
        // Set to the beginning of the current quarter + period offset
        const quarter = Math.floor(today.getMonth() / 3) + currentPeriod;
        startDate = new Date(today.getFullYear(), quarter * 3, 1);
        endDate = new Date(today.getFullYear(), (quarter + 1) * 3, 0);
        break;
    }
    
    // Filter tasks that have deadlines within the selected time period
    return allSteps.filter(task => {
      if (!task.deadline) return false;
      
      const taskDate = new Date(task.deadline);
      return taskDate >= startDate && taskDate <= endDate;
    });
  }, [allSteps, timeframe, currentPeriod]);

  // Get the current period name (e.g., "August 2023" for monthly)
  const getCurrentPeriodName = () => {
    const today = new Date();
    
    switch (timeframe) {
      case 'weekly':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay() + (currentPeriod * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      
      case 'monthly':
        const monthDate = new Date(today.getFullYear(), today.getMonth() + currentPeriod, 1);
        return monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      case 'quarterly':
        const quarter = Math.floor(today.getMonth() / 3) + currentPeriod;
        const quarterStart = new Date(today.getFullYear(), quarter * 3, 1);
        return `Q${(quarter % 4) + 1} ${quarterStart.getFullYear()}`;
      
      default:
        return 'All time';
    }
  };

  const handlePreviousPeriod = () => {
    setCurrentPeriod(prev => prev - 1);
  };

  const handleNextPeriod = () => {
    setCurrentPeriod(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
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
              Keep it up for better results!
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
      
      {/* Tasks section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tasks</CardTitle>
            <div className="flex items-center gap-2">
              <Select
                value={timeframe}
                onValueChange={(value: string) => {
                  setTimeframe(value as TimeframeOption);
                  setCurrentPeriod(0);
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
              
              {timeframe !== 'all' && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePreviousPeriod}
                    className="h-8 w-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm font-medium w-36 text-center">
                    {getCurrentPeriodName()}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextPeriod}
                    className="h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <CardDescription>
            {timeframe === 'all' 
              ? 'Showing all tasks from your roadmap'
              : `Showing tasks for ${getCurrentPeriodName()}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <div 
                  key={task.id} 
                  className={cn(
                    "p-4 rounded-lg border flex items-start gap-3 transition-colors",
                    task.completed
                      ? "bg-green-50 border-green-100"
                      : "bg-white border-gray-200"
                  )}
                >
                  <div>
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={cn(
                        "font-medium",
                        task.completed && "line-through text-gray-500"
                      )}>
                        {task.description}
                      </h4>
                      {task.deadline && (
                        <Badge variant="outline" className="ml-2">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(task.deadline).toLocaleDateString('en-US', { 
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      From milestone: {task.milestoneName}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <TimerIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600">No tasks for this period</h3>
                <p className="text-gray-500 max-w-xs mx-auto mt-2">
                  {timeframe === 'all'
                    ? "You don't have any tasks in your roadmap yet."
                    : "Try selecting a different timeframe or add tasks to your milestones."
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTrackerSection;
