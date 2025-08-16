import type { Priority } from '@/modules/shared/data/mockData'
import { FilterInput } from './filter-input'
import { PriorityFilter } from './priority-filter'

interface FilterBarProps {
  searchText: string
  priority: Priority | string
  onSearchChange: (value: string) => void
  onPriorityChange: (value: Priority | string) => void
}

export function FilterBar({ searchText, priority, onSearchChange, onPriorityChange }: FilterBarProps) {
  return (
    <div className='flex items-center gap-4 w-full'>
      <div className='min-w-[350px]'>
        <FilterInput value={searchText} onChange={onSearchChange} />
      </div>
      <PriorityFilter value={priority} onChange={onPriorityChange} />
    </div>
  )
}
