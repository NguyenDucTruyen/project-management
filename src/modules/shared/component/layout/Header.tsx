import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Sidebar } from 'lucide-react'

type HeaderProps = {
  className?: string
  title: string
  description?: string
  rightContent?: React.ReactNode
  bottomContent?: React.ReactNode
  onClickSidebarToggle?: () => void
}

export function Header({
  className,
  title,
  description,
  rightContent,
  bottomContent,
  onClickSidebarToggle
}: HeaderProps) {
  return (
    <header className={cn('bg-white border-b p-6 w-full', className)}>
      <div className='flex items-center justify-between gap-4 mb-4 flex-wrap'>
        <div className='flex items-center gap-3'>
          <Button
            variant='ghost'
            aria-label='Toggle Sidebar'
            onClick={onClickSidebarToggle}
            className='p-1 cursor-pointer'
          >
            <Sidebar className='h-5 w-5' />
            <span className='sr-only'>Toggle Sidebar</span>
          </Button>
          <div>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-muted-foreground'>{description}</p>
          </div>
        </div>
        {rightContent}
      </div>
      {bottomContent && <div className='mt-2'>{bottomContent}</div>}
    </header>
  )
}
