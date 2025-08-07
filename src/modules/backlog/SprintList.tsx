import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Sprint } from '@/modules/shared/data/mockData'
import { useDroppable } from '@dnd-kit/core'
import { Calendar, Play, Users } from 'lucide-react'
import { UserStoryCard } from './UserStoryCard'

interface SprintListProps {
  sprints: Sprint[]
  onMoveToBacklog?: (storyId: string, fromSprintId: string) => void
  onMoveToSprint?: (storyId: string, toSprintId: string) => void
}

const sprintStatusColors = {
  Planning: 'bg-gray-100 text-gray-800',
  Active: 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800'
}

interface SprintItemProps {
  sprint: Sprint
  onMoveToBacklog?: (storyId: string, fromSprintId: string) => void
  onMoveToSprint?: (storyId: string, toSprintId: string) => void
  availableSprints: Sprint[]
}

function SprintItem({ sprint, onMoveToBacklog, onMoveToSprint, availableSprints }: SprintItemProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: sprint.id
  })

  return (
    <div ref={setNodeRef} className={`bg-white rounded-lg border ${isOver ? 'ring-2 ring-blue-500' : ''}`}>
      {/* Sprint Header */}
      <div className='p-4 border-b'>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center space-x-3'>
            <h3 className='font-semibold text-gray-900'>{sprint.name}</h3>
            <Badge className={sprintStatusColors[sprint.status]}>{sprint.status}</Badge>
          </div>

          {sprint.status === 'Planning' && (
            <Button size='sm' className='flex items-center space-x-2'>
              <Play className='h-4 w-4' />
              <span>Start Sprint</span>
            </Button>
          )}
        </div>

        <div className='flex items-center space-x-4 text-sm text-gray-500'>
          <div className='flex items-center'>
            <Calendar className='h-4 w-4 mr-1' />
            {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
          </div>
          <div className='flex items-center'>
            <Users className='h-4 w-4 mr-1' />
            {sprint.userStories.length} stories
          </div>
        </div>
      </div>

      {/* Sprint User Stories */}
      <div className='p-4 min-h-20'>
        {sprint.userStories.length === 0 ? (
          <p className='text-gray-500 text-center py-8'>
            No user stories in this sprint
            {isOver && <span className='block text-blue-600 mt-2'>Drop here to add story</span>}
          </p>
        ) : (
          <div className='space-y-3'>
            {sprint.userStories.map((story) => (
              <UserStoryCard
                key={story.id}
                story={story}
                onMoveToBacklog={onMoveToBacklog}
                onMoveToSprint={onMoveToSprint}
                availableSprints={availableSprints}
                currentSprintId={sprint.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function SprintList({ sprints, onMoveToBacklog, onMoveToSprint }: SprintListProps) {
  return (
    <div className='space-y-4'>
      {sprints.map((sprint) => (
        <SprintItem
          key={sprint.id}
          sprint={sprint}
          onMoveToBacklog={onMoveToBacklog}
          onMoveToSprint={onMoveToSprint}
          availableSprints={sprints.filter((s) => s.id !== sprint.id)}
        />
      ))}
    </div>
  )
}
