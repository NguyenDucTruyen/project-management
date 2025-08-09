import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Header } from '@/modules/shared/component/layout/Header'
import { Plus, Search } from 'lucide-react'

import { AppLayoutDispatch } from '@/App'
import { useContext } from 'react'

export function BacklogPage() {
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
  const bottomContent = (
    <>
      <div className='relative hidden md:block w-96'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
        <Input
          type='text'
          placeholder='Search user stories'
          className='pl-10 pr-4 py-2 placeholder:h-4 placeholder:leading-4'
        />
      </div>
    </>
  )

  const appDispatch = useContext(AppLayoutDispatch)

  function onClickSidebarToggle() {
    console.log('sidebar:toggle')
    appDispatch?.({
      type: 'sidebar:toggle'
    })
  }

  return (
    <Header
      title='Backlog'
      description='Manage user stories, sprints and tasks'
      rightContent={rightContent}
      bottomContent={bottomContent}
      onClickSidebarToggle={onClickSidebarToggle}
    />
  )
}
