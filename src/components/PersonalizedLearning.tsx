
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skill, SkillProficiency } from '@/context/RoadmapContext';
import { useSkillAnalytics } from '@/hooks/useSkillAnalytics';
import { ExternalLink, BookOpen, Lightbulb, BarChart, TrendingUp, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PersonalizedLearningProps {
  selectedSkills: Skill[];
  currentRole: string;
  desiredRole: string;
}

const PersonalizedLearning: React.FC<PersonalizedLearningProps> = ({
  selectedSkills,
  currentRole,
  desiredRole
}) => {
  const analytics = useSkillAnalytics(selectedSkills, currentRole, desiredRole);
  
  const getSkillProgress = (proficiency?: SkillProficiency): number => {
    switch (proficiency) {
      case 'want-to-learn': return 10;
      case 'want-to-improve': return 50;
      case 'proficient': return 100;
      default: return 0;
    }
  };
  
  const getCategoryColor = (category?: string): string => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'soft': return 'bg-purple-100 text-purple-800';
      case 'industry': return 'bg-amber-100 text-amber-800';
      case 'domain': return 'bg-emerald-100 text-emerald-800';
      case 'business': return 'bg-rose-100 text-rose-800';
      case 'analytics': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getProficiencyIcon = (proficiency?: SkillProficiency) => {
    switch (proficiency) {
      case 'want-to-learn': return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'want-to-improve': return <TrendingUp className="h-4 w-4 text-amber-600" />;
      case 'proficient': return <Star className="h-4 w-4 text-green-600" />;
      default: return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Learning Path</h2>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{analytics.totalSkills}</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">To Learn</span>
                  <span className="font-medium text-blue-600">{analytics.skillsByProficiency['want-to-learn'] || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">To Improve</span>
                  <span className="font-medium text-amber-600">{analytics.skillsByProficiency['want-to-improve'] || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Proficient</span>
                  <span className="font-medium text-green-600">{analytics.skillsByProficiency['proficient'] || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Skill Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(analytics.skillsByCategory).map(([category, count]) => (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{category}</span>
                      <span>{count} skills</span>
                    </div>
                    <Progress value={(count / analytics.totalSkills) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Learning Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-1 rounded-full bg-blue-50">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-100">
                    <span className="text-2xl font-bold text-blue-700">
                      {analytics.skillsByProficiency['proficient'] ? 
                        Math.round((analytics.skillsByProficiency['proficient'] / analytics.totalSkills) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Proficiency rate</p>
              </div>
              <Button variant="outline" className="w-full">
                <BarChart className="h-4 w-4 mr-2" />
                View Detailed Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {analytics.topSkillGaps.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Skills to Develop</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {analytics.topSkillGaps.map((gap, index) => (
              <Card key={index} className={cn(
                "border-l-4",
                gap.importance > 80 ? "border-l-red-500" :
                gap.importance > 60 ? "border-l-amber-500" : "border-l-blue-500"
              )}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{gap.skillName}</CardTitle>
                    <Badge className={getCategoryColor(gap.category)}>
                      {gap.category}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    {getProficiencyIcon(gap.currentLevel)}
                    <span className="ml-1 capitalize">
                      {gap.currentLevel?.replace(/-/g, ' ')}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Importance</span>
                      <span className="font-semibold">{gap.importance}%</span>
                    </div>
                    <Progress value={gap.importance} className="h-2" />
                  </div>
                  
                  {gap.recommendedResources && gap.recommendedResources.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Lightbulb className="h-4 w-4 text-amber-500 mr-1" />
                        Recommended Resources
                      </h4>
                      <ul className="space-y-1">
                        {gap.recommendedResources.map((resource, i) => (
                          <li key={i} className="text-sm flex items-center justify-between">
                            <span className="truncate">{resource}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 text-gray-400 hover:text-gray-700">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-full text-blue-700">
            <Lightbulb className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Personalized Learning Recommendation</h3>
            <p className="text-blue-800 text-sm">
              {desiredRole ? `Based on your goal to become a ${desiredRole}, ` : ''}
              we recommend focusing on the high-importance skills first. These skills will have the greatest impact on 
              your career transition{currentRole ? ` from ${currentRole}` : ''}.
            </p>
            <Button variant="link" className="text-blue-700 p-0 h-auto mt-2">
              Generate detailed learning plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedLearning;
