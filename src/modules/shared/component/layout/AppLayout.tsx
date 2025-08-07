import { Sidebar } from './Sidebar'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className='min-h-screen flex'>
      <Sidebar />
      <div className='flex-1 flex'>{children}</div>
    </div>
  )
}
