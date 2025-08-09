import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Sprint, UserStory } from '@/modules/shared/data/mockData'
import { useDraggable } from '@dnd-kit/core'
import { ChevronDown, Hash } from 'lucide-react'
import { useState } from 'react'

type UserStoryCardProps = {
  story: UserStory
  onMoveToSprint?: (storyId: string, sprintId: string) => void
  onMoveToBacklog?: (storyId: string, fromSprintId: string) => void
  availableSprints?: Sprint[]
  currentSprintId?: string
  isDraggable?: boolean
}

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800'
}

const statusColors = {
  Todo: 'bg-gray-100 text-gray-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Done: 'bg-green-100 text-green-800'
}

export function UserStoryCard({
  story,
  onMoveToSprint,
  onMoveToBacklog,
  availableSprints = [],
  currentSprintId,
  isDraggable = true
}: UserStoryCardProps) {
  const [showActions, setShowActions] = useState(false)

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: story.id,
    disabled: !isDraggable
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined

  const handleMoveToSprint = (sprintId: string) => {
    if (onMoveToSprint) {
      onMoveToSprint(story.id, sprintId)
    }
    setShowActions(false)
  }

  const handleMoveToBacklog = () => {
    if (onMoveToBacklog && currentSprintId) {
      onMoveToBacklog(story.id, currentSprintId)
    }
    setShowActions(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow ${
        isDragging ? 'opacity-50' : ''
      } ${isDraggable ? 'cursor-grab' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className='space-y-3'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <div className='flex items-center space-x-2 mb-2'>
              <Badge className={priorityColors[story.priority]}>{story.priority}</Badge>
              <div className='flex items-center text-sm text-gray-500'>
                <Hash className='h-3 w-3 mr-1' />
                {story.storyPoints} pts
              </div>
            </div>
            <h3 className='font-medium text-gray-900 text-sm leading-relaxed'>{story.title}</h3>
          </div>
          {(onMoveToSprint || onMoveToBacklog) && (
            <div className='relative'>
              <Button variant='ghost' size='sm' onClick={() => setShowActions(!showActions)}>
                <ChevronDown className='h-4 w-4' />
              </Button>
              {showActions && (
                <div className='absolute right-0 top-8 w-48 bg-white border rounded-md shadow-lg z-10'>
                  <div className='py-1'>
                    {onMoveToBacklog && currentSprintId && (
                      <button
                        onClick={handleMoveToBacklog}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        Move to Backlog
                      </button>
                    )}
                    {onMoveToSprint &&
                      availableSprints.map((sprint) => (
                        <button
                          key={sprint.id}
                          onClick={() => handleMoveToSprint(sprint.id)}
                          className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          disabled={sprint.id === currentSprintId}
                        >
                          Move to {sprint.name}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <p className='text-gray-600 text-sm'>{story.description}</p>

        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            {story.assignee && (
              <div className='flex items-center text-sm text-gray-500'>
                <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2'>
                  {story.assignee
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                {story.assignee}
              </div>
            )}
            <div className='text-sm text-gray-500'>1 tasks</div>
          </div>

          <Badge className={statusColors[story.status]}>{story.status}</Badge>
        </div>

        {/* Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className='flex flex-wrap gap-1'>
            {story.tags.map((tag) => (
              <span
                key={tag}
                className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
