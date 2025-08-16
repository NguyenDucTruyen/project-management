import { Button } from '@/components/ui/button'
import type { Priority } from '@/modules/shared/data/mockData'
import { Plus } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { Header } from '../shared/component/layout/Header'
import { useBacklogActions, useBacklogData } from './backlog-page'
import { FilterBar } from './sprint-list/filter/filter-bar'

export const BacklogHeader = () => {
  const backlogData = useBacklogData()
  const { updateFilter, searchWithCurrentFilters } = useBacklogActions()

  const handleSearchChange = useCallback(
    (searchText: string) => {
      updateFilter({ searchText })
    },
    [updateFilter]
  )

  const handlePriorityChange = useCallback(
    (priority: Priority | string) => {
      updateFilter({ priority })
    },
    [updateFilter]
  )

  // Trigger search when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (backlogData.searchText || backlogData.priority) {
        searchWithCurrentFilters()
      }
    }, 300) // Debounce search

    return () => clearTimeout(timer)
  }, [backlogData.searchText, backlogData.priority, searchWithCurrentFilters])

  const bottomContent = (
    <FilterBar
      searchText={backlogData.searchText}
      priority={backlogData.priority}
      onSearchChange={handleSearchChange}
      onPriorityChange={handlePriorityChange}
    />
  )

  return (
    <Header
      title='Backlog'
      description='Manage user stories, sprints and tasks'
      rightContent={rightContent}
      bottomContent={bottomContent}
    />
  )
}
const rightContent = (
  <div className='flex items-center space-x-3'>
    <Button variant='outline' className='flex items-center space-x-2 py-2 px-3'>
      <Plus className='h-4 w-4' />
      <span>Create Sprint</span>
    </Button>
    <Button variant='outline' className='flex items-center space-x-2 py-2 px-3'>
      <Plus className='h-4 w-4' />
      <span>Add Task</span>
    </Button>
    <Button variant='default' className='flex items-center space-x-2 py-2 px-3'>
      <Plus className='h-4 w-4' />
      <span>Add User Story</span>
    </Button>
  </div>
)
