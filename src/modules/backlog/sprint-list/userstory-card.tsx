import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Task, UserStory } from '@/modules/shared/data/mockData'
import { BookOpen, ChevronRight } from 'lucide-react'
import { useContext } from 'react'
import { BacklogDataContext, BacklogDispatchContext } from '../backlog-page'

interface UserStoryCardProps {
  story: UserStory
  onMoveToSprint?: (storyId: string, sprintId: string) => void
  onMoveToBacklog?: (storyId: string, fromSprintId: string) => void
  isDraggable?: boolean
}

const priorityColors = {
  High: '!bg-red-100 text-red-800',
  Medium: '!bg-yellow-100 text-yellow-800',
  Low: '!bg-green-100 text-green-800'
}

const statusColors = {
  Todo: '!bg-gray-100 text-gray-800',
  'In Progress': '!bg-blue-100 text-blue-800',
  Done: '!bg-green-100 text-green-800'
}

export function UserStoryCard({ story }: UserStoryCardProps) {
  const backlogData = useContext(BacklogDataContext)
  const backlogDispatch = useContext(BacklogDispatchContext)
  // const { loadTasks } = useBacklogActions()

  // Lấy tasks từ taskMap dựa trên userStoryId
  // const storyTasks = Array.from(backlogData.taskMap.values()).filter((task) => task.userStoryId === story.id)

  // const handleToggleShowTasks = useCallback(async () => {
  //   // Toggle visibility
  //   backlogDispatch?.({ type: 'toggle:showTask', userStoryId: story.id })

  //   // Load tasks nếu chưa có và đang mở
  //   if (!story.showTask && storyTasks.length === 0) {
  //     await loadTasks(story.id)
  //   }
  // }, [backlogDispatch, story.id, story.showTask, storyTasks.length, loadTasks])

  return (
    <div
      className={`bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow border-l-4 border-l-primary-500`}
      draggable
    >
      <div className='space-y-3'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <div className='flex items-center space-x-2 mb-2'>
              <BookOpen size={16} className='mr-2' />
              <Badge className={priorityColors[story.priority]}>{story.priority}</Badge>
              <Badge className='!bg-transparent text-foreground border border-border'>{story.storyPoints} pts</Badge>
            </div>
            <h3 className='font-medium text-gray-900 text-sm leading-relaxed'>{story.title}</h3>
          </div>
          <button className='px-1 hover:bg-accent rounded-sm cursor-pointer h-6'>
            <ChevronRight size={16} className={cn(story.showTask && 'rotate-90')} />
          </button>
        </div>

        <p className='text-gray-600 text-sm'>{story.description}</p>

        <div className='flex items-center justify-between'>
          {/* <div className='text-sm text-gray-500'>
            {storyTasks.length} {storyTasks.length > 1 ? 'tasks' : 'task'}
          </div> */}
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

        {/* List task */}
        {/* <div className={cn('mt-4 space-y-2 border-t pt-4', story.showTask ? 'block' : 'hidden')}>
          <h4 className='text-sm font-medium text-muted-foreground flex items-center gap-1'>
            <Target size={16} />
            Tasks ({storyTasks.length})
          </h4>
          {storyTasks.length === 0 && story.showTask ? (
            <p className='text-gray-500 text-center py-4'>No tasks found for this user story.</p>
          ) : (
            storyTasks.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </div> */}
      </div>
    </div>
  )
}

const TaskItem = ({ task }: { task: Task }) => {
  return (
    <div className='flex items-center justify-between ml-4 py-6 rounded-xl border'>
      <div data-slot='card-content' className='p-3 pl-6'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <h5 className='font-medium text-sm mb-1'>{task.title}</h5>
            <p className='text-xs text-muted-foreground line-clamp-1'>{task.description}</p>
            <div className='flex items-center gap-2 mt-2'>
              <Badge className={statusColors[task.status]}>{task.status}</Badge>

              <span className='text-xs text-muted-foreground'>{task.assignee}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
