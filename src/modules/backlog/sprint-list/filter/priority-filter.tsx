import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { Priority } from '@/modules/shared/data/mockData'
import { ChevronDown } from 'lucide-react'

interface PriorityFilterProps {
  value: Priority | string
  onChange: (value: Priority | string) => void
}

const priorityOptions: { value: Priority | string; label: string }[] = [
  { value: '', label: 'All Priorities' },
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' }
]

const priorityColors = {
  High: 'text-red-600 bg-red-50 border-red-200',
  Medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  Low: 'text-green-600 bg-green-50 border-green-200',
  '': 'text-gray-600 bg-gray-50 border-gray-200'
}

export function PriorityFilter({ value, onChange }: PriorityFilterProps) {
  const selectedOption = priorityOptions.find((option) => option.value === value) || priorityOptions[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className={`min-w-32 justify-between ${priorityColors[value as keyof typeof priorityColors]}`}
        >
          {selectedOption.label}
          <ChevronDown className='ml-2 h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='min-w-32'>
        {priorityOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`cursor-pointer ${value === option.value ? 'bg-accent font-medium' : ''}`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
