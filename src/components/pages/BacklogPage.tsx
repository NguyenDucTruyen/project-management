import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useDroppable,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { mockBacklog, mockSprints } from "../../data/mockData";
import type { Sprint, UserStory } from "../../types";
import { SprintList } from "../project/SprintList";
import { UserStoryCard } from "../project/UserStoryCard";

export function BacklogPage() {
  const [backlogStories, setBacklogStories] = useState<UserStory[]>(mockBacklog);
  const [sprints, setSprints] = useState<Sprint[]>(mockSprints);
  const [activeStory, setActiveStory] = useState<UserStory | null>(null);

  const { isOver: isBacklogOver, setNodeRef: setBacklogRef } = useDroppable({
    id: 'backlog',
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const storyId = active.id as string;
    
    // Find the story in backlog or sprints
    let story = backlogStories.find(s => s.id === storyId);
    if (!story) {
      for (const sprint of sprints) {
        story = sprint.userStories.find(s => s.id === storyId);
        if (story) break;
      }
    }
    
    setActiveStory(story || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveStory(null);

    if (!over) return;

    const storyId = active.id as string;
    const dropTargetId = over.id as string;

    // Handle drop to backlog
    if (dropTargetId === 'backlog') {
      handleMoveToBacklog(storyId);
      return;
    }

    // Handle drop to sprint
    if (dropTargetId.startsWith('sprint-')) {
      handleMoveToSprint(storyId, dropTargetId);
      return;
    }
  };

  const handleMoveToSprint = (storyId: string, sprintId: string) => {
    // Find the story in backlog
    const storyIndex = backlogStories.findIndex(story => story.id === storyId);
    
    if (storyIndex !== -1) {
      const story = backlogStories[storyIndex];
      
      // Remove from backlog
      const newBacklog = backlogStories.filter(s => s.id !== storyId);
      setBacklogStories(newBacklog);

      // Add to sprint
      const newSprints = sprints.map(sprint => {
        if (sprint.id === sprintId) {
          return {
            ...sprint,
            userStories: [...sprint.userStories, story]
          };
        }
        return sprint;
      });
      setSprints(newSprints);
    } else {
      // Story is in another sprint, move between sprints
      const fromSprint = sprints.find(sprint => 
        sprint.userStories.some(s => s.id === storyId)
      );
      
      if (fromSprint && fromSprint.id !== sprintId) {
        const story = fromSprint.userStories.find(s => s.id === storyId);
        if (!story) return;

        const newSprints = sprints.map(sprint => {
          if (sprint.id === fromSprint.id) {
            return {
              ...sprint,
              userStories: sprint.userStories.filter(s => s.id !== storyId)
            };
          }
          if (sprint.id === sprintId) {
            return {
              ...sprint,
              userStories: [...sprint.userStories, story]
            };
          }
          return sprint;
        });
        setSprints(newSprints);
      }
    }
  };

  const handleMoveToBacklog = (storyId: string, fromSprintId?: string) => {
    // If fromSprintId is provided, use it; otherwise find the sprint
    let sourceSprintId = fromSprintId;
    
    if (!sourceSprintId) {
      const sourceSprint = sprints.find(sprint => 
        sprint.userStories.some(s => s.id === storyId)
      );
      sourceSprintId = sourceSprint?.id;
    }
    
    if (!sourceSprintId) return;

    const fromSprint = sprints.find(sprint => sprint.id === sourceSprintId);
    const story = fromSprint?.userStories.find(s => s.id === storyId);
    
    if (!story) return;

    // Remove from sprint
    const newSprints = sprints.map(sprint => {
      if (sprint.id === sourceSprintId) {
        return {
          ...sprint,
          userStories: sprint.userStories.filter(s => s.id !== storyId)
        };
      }
      return sprint;
    });
    setSprints(newSprints);

    // Add to backlog
    setBacklogStories([...backlogStories, story]);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Backlog</h2>
          <div 
            ref={setBacklogRef}
            className={`bg-white rounded-lg border p-4 min-h-32 ${
              isBacklogOver ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {backlogStories.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No items in backlog
                {isBacklogOver && <span className="block text-blue-600 mt-2">Drop here to add to backlog</span>}
              </p>
            ) : (
              <div className="space-y-3">
                {backlogStories.map((story) => (
                  <UserStoryCard
                    key={story.id}
                    story={story}
                    onMoveToSprint={handleMoveToSprint}
                    availableSprints={sprints}
                    isDraggable={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sprints</h2>
          <SprintList 
            sprints={sprints}
            onMoveToBacklog={handleMoveToBacklog}
            onMoveToSprint={handleMoveToSprint}
          />
        </div>
      </div>

      <DragOverlay>
        {activeStory ? (
          <UserStoryCard story={activeStory} isDraggable={false} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
