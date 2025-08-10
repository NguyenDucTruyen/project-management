import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mockBacklog, type Sprint } from '@/modules/shared/data/mockData'
import { BookOpen, Calendar, CheckCircle, ChevronRight, Play } from 'lucide-react'
import { useState } from 'react'
import { UserStoryCard } from './userstory-card'

interface SprintListProps {
  sprints: Sprint[]
  onMoveToBacklog?: (storyId: string, fromSprintId: string) => void
  onMoveToSprint?: (storyId: string, toSprintId: string) => void
}

const sprintStatusColors = {
  Planning: '!bg-gray-100 text-gray-800',
  Active: '!bg-blue-100 text-blue-800',
  Completed: '!bg-green-100 text-green-800'
}

interface SprintItemProps {
  sprint: Sprint
  type: 'backlog' | 'sprint'
  defaultShowUserStories?: boolean
  onMoveToBacklog?: (storyId: string, fromSprintId: string) => void
  onMoveToSprint?: (storyId: string, toSprintId: string) => void
  availableSprints: Sprint[]
}

function SprintItem({
  sprint,
  onMoveToBacklog,
  onMoveToSprint,
  availableSprints,
  type,
  defaultShowUserStories
}: SprintItemProps) {
  const [showUserStory, setShowUserStory] = useState(defaultShowUserStories)
  return (
    <>
      {/* Sprint Header */}
      <div className='flex gap-2 p-4 border rounded-lg bg-primary-foreground items-center'>
        <button
          className='px-2 hover:bg-accent rounded-lg cursor-pointer h-10'
          onClick={() => setShowUserStory((pre) => !pre)}
        >
          <ChevronRight size={20} className={cn(showUserStory && 'rotate-90')} />
        </button>
        <div className='w-full'>
          <div className='flex items-center justify-between mb-3'>
            {type === 'sprint' ? (
              <div className='flex items-center space-x-3'>
                <h3 className='font-semibold text-gray-900'>{sprint.name}</h3>
                <Badge className={cn(sprintStatusColors[sprint.status])}>{sprint.status}</Badge>
              </div>
            ) : (
              <div className='flex items-center space-x-3'>
                <h3 className='font-semibold text-gray-900'>Backlog</h3>
              </div>
            )}

            {type === 'sprint' && sprint.status === 'Planning' && (
              <Button size='sm' className='flex items-center space-x-2 cursor-pointer'>
                <Play className='h-4 w-4' />
                <span>Start Sprint</span>
              </Button>
            )}
            {type === 'sprint' && sprint.status === 'Active' && (
              <Button size='sm' className='flex items-center space-x-2 cursor-pointer'>
                <CheckCircle className='h-4 w-4' />
                <span>Completed</span>
              </Button>
            )}
          </div>

          <div className='flex items-center space-x-4 text-sm text-gray-500'>
            {type === 'sprint' && (
              <div className='flex items-center'>
                <Calendar className='h-4 w-4 mr-1' />
                {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
              </div>
            )}
            <div className='flex items-center'>
              <BookOpen className='mr-1' size={16} />
              {sprint.userStories.length} stories
            </div>
          </div>
        </div>
      </div>

      {/* Sprint User Stories */}
      <div className={cn('p-4 min-h-20 pl-11', showUserStory ? 'block' : 'hidden')}>
        {sprint.userStories.length === 0 ? (
          <p className='text-gray-500 text-center py-8'>No user stories in this sprint yet.</p>
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
    </>
  )
}

export function SprintList({ sprints, onMoveToBacklog, onMoveToSprint }: SprintListProps) {
  return (
    <div className='space-y-4'>
      {sprints.map((sprint, index) => (
        <SprintItem
          key={sprint.id}
          sprint={sprint}
          onMoveToBacklog={onMoveToBacklog}
          onMoveToSprint={onMoveToSprint}
          defaultShowUserStories={[0, 1].includes(index)}
          availableSprints={sprints.filter((s) => s.id !== sprint.id)}
          type='sprint'
        />
      ))}
      <SprintItem
        key={'backlog'}
        sprint={mockBacklog}
        onMoveToBacklog={onMoveToBacklog}
        onMoveToSprint={onMoveToSprint}
        availableSprints={sprints.filter((s) => s.id !== 'backlog')}
        type='backlog'
      />
    </div>
  )
}
