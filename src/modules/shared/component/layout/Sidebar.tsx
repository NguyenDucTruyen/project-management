import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Calendar, ChevronRight, Kanban, List, LogOut, Settings, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
interface SidebarProps {
  className?: string
}

const navigation = [
  {
    name: 'Backlog',
    href: '/backlog',
    icon: List,
    count: 12
  },
  {
    name: 'Active Sprint',
    href: '/sprint',
    icon: Kanban,
    count: 8
  },
  {
    name: 'Timeline',
    href: '/timeline',
    icon: Calendar,
    count: 3
  }
]

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation()

  return (
    <div className={cn('flex sticky left-0 top-0 h-screen w-64 flex-col bg-gray-50 border-r', className)}>
      <div className='flex flex-col gap-2 p-4'>
        <div className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
            <Kanban className='h-4 w-4' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>TaskFlow</span>
            <span className='truncate text-xs text-muted-foreground'>Project Management</span>
          </div>
        </div>
      </div>

      <div className='flex flex-1 flex-col'>
        <Separator className='mb-2' />

        <nav className='space-y-1 p-2'>
          <span className='text-xs font-medium pl-2 text-muted-foreground mt-2 leading-9'>Navigation</span>
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Button
                key={item.name}
                variant={isActive ? 'secondary' : 'ghost'}
                className='w-full justify-between p-2 pr-3'
                asChild
              >
                <Link to={item.href}>
                  <div className='flex items-center'>
                    <Icon className='mr-2 h-4 w-4' />
                    {item.name}
                  </div>
                  {item.count && <span className='text-gray-900 text-xs'>{item.count}</span>}
                </Link>
              </Button>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className='p-4'>
          <h3 className='font-medium text-muted-foreground text-xs mb-3'>Quick Stats</h3>
          <div className='space-y-2 text-ring'>
            <div className='flex items-center justify-between text-sm'>
              <span>Total Tasks</span>
              <span className='font-medium'>20</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span>In Progress</span>
              <span className='font-medium'>8</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span>Due Soon</span>
              <span className='font-medium'>3</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className='p-4'>
          <h3 className='font-medium text-gray-500 text-xs mb-3'>Recent Activity</h3>
          <div className='space-y-2 text-xs text-gray-600'>
            <div className='flex gap-2 items-center'>
              <div className='w-2 h-2 rounded-full bg-green-500'></div>
              Task completed
            </div>
            <div className='flex gap-2 items-center'>
              <div className='w-2 h-2 rounded-full bg-blue-500'></div>
              Sprint started
            </div>
            <div className='flex gap-2 items-center'>
              <div className='w-2 h-2 rounded-full bg-orange-500'></div>
              New task assigned
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2 p-2'>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex p-2 rounded-sm items-center justify-between cursor-pointer hover:bg-accent focus:outline-none'>
            <div className='flex gap-2 items-center'>
              <div className='w-8 h-8 bg-border rounded-lg'></div>
              <div className='hidden md:block text-left'>
                <div className='text-sm font-medium'>John Doe</div>
                <div className='text-xs text-gray-500'>john@example.com</div>
              </div>
            </div>
            <ChevronRight className='h-4 w-4 text-gray-400' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-60'>
            <DropdownMenuLabel className='flex p-2 rounded-sm items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <div className='w-8 h-8 bg-border rounded-lg'></div>
                <div className='hidden md:block text-left'>
                  <div className='text-sm font-medium'>John Doe</div>
                  <div className='text-xs text-gray-500'>john@example.com</div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className='mr-2 h-4 w-4' />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className='mr-2 h-4 w-4' />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to='/logout' className='flex items-center'>
                <LogOut className='mr-2 h-4 w-4' />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
