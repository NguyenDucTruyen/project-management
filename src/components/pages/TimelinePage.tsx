import { Calendar, CheckCircle, Clock, Users } from "lucide-react";
import { mockSprints } from "../../data/mockData";
import { Badge } from "../ui/badge";

export function TimelinePage() {
  const sortedSprints = [...mockSprints].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const sprintStatusColors = {
    Planning: "bg-gray-100 text-gray-800",
    Active: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Active':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Timeline</h1>
        <p className="text-gray-600">Overview of all sprints and their progress</p>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <div className="space-y-6">
            {sortedSprints.map((sprint, index) => (
              <div key={sprint.id} className="relative">
                {/* Timeline Line */}
                {index !== sortedSprints.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                )}
                
                <div className="flex items-start space-x-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {getStatusIcon(sprint.status)}
                  </div>
                  
                  {/* Sprint Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{sprint.name}</h3>
                      <Badge className={sprintStatusColors[sprint.status]}>
                        {sprint.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {sprint.userStories.length} stories
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          sprint.status === 'Completed' ? 'bg-green-600' : 
                          sprint.status === 'Active' ? 'bg-blue-600' : 'bg-gray-400'
                        }`}
                        style={{
                          width: sprint.status === 'Completed' ? '100%' : 
                                 sprint.status === 'Active' ? '60%' : '0%'
                        }}
                      ></div>
                    </div>
                    
                    {/* User Stories Summary */}
                    {sprint.userStories.length > 0 && (
                      <div className="mt-3">
                        <div className="flex space-x-4 text-xs">
                          <span className="text-gray-600">
                            Done: {sprint.userStories.filter(s => s.status === 'Done').length}
                          </span>
                          <span className="text-gray-600">
                            In Progress: {sprint.userStories.filter(s => s.status === 'In Progress').length}
                          </span>
                          <span className="text-gray-600">
                            To Do: {sprint.userStories.filter(s => s.status === 'Todo').length}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
