import { Button } from '@/components/ui/button'
import { Plus, Settings } from 'lucide-react'
import { Header } from '../shared/component/layout/Header'

export const ActiveSprintPage = () => {
  const rightContent = (
    <div className='flex items-center space-x-3'>
      <Button variant='outline' className='flex items-center space-x-2 py-2 px-3'>
        <Settings className='h-4 w-4' />
        <span>Sprint Settings</span>
      </Button>
      <Button variant='default' className='flex items-center space-x-2 py-2 px-3'>
        <Plus className='h-4 w-4' />
        <span>Add Task</span>
      </Button>
    </div>
  )
  return (
    <div className='w-full'>
      <Header
        title='Active Sprint'
        description='Work in progress zone'
        rightContent={rightContent}
        bottomContent={null}
      />
    </div>
  )
}
