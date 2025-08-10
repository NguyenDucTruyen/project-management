import { Sidebar } from './Sidebar'

type AppLayoutProps = {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className='min-h-screen flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>{children}</div>
    </div>
  )
}
