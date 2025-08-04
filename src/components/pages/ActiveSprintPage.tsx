import { mockSprints } from "../../data/mockData";
import { UserStoryCard } from "../project/UserStoryCard";
import { Badge } from "../ui/badge";

export function ActiveSprintPage() {
  const activeSprint = mockSprints.find(sprint => sprint.status === 'Active');

  if (!activeSprint) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Active Sprint</h2>
        <p className="text-gray-600">There is currently no active sprint. Start a new sprint from the backlog.</p>
      </div>
    );
  }

  const todoStories = activeSprint.userStories.filter(story => story.status === 'Todo');
  const inProgressStories = activeSprint.userStories.filter(story => story.status === 'In Progress');
  const doneStories = activeSprint.userStories.filter(story => story.status === 'Done');

  return (
    <div className="space-y-6">
      {/* Sprint Header */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{activeSprint.name}</h1>
            <p className="text-gray-600 mt-1">
              {new Date(activeSprint.startDate).toLocaleDateString()} - {new Date(activeSprint.endDate).toLocaleDateString()}
            </p>
          </div>
          <Badge className="bg-blue-100 text-blue-800">
            {activeSprint.status}
          </Badge>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Todo Column */}
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900">To Do ({todoStories.length})</h3>
          </div>
          <div className="p-4 space-y-3 min-h-64">
            {todoStories.map((story) => (
              <UserStoryCard key={story.id} story={story} isDraggable={true} />
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900">In Progress ({inProgressStories.length})</h3>
          </div>
          <div className="p-4 space-y-3 min-h-64">
            {inProgressStories.map((story) => (
              <UserStoryCard key={story.id} story={story} isDraggable={true} />
            ))}
          </div>
        </div>

        {/* Done Column */}
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900">Done ({doneStories.length})</h3>
          </div>
          <div className="p-4 space-y-3 min-h-64">
            {doneStories.map((story) => (
              <UserStoryCard key={story.id} story={story} isDraggable={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
