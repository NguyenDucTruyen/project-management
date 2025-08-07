import { ActiveSprintPage } from '@/modules/active-sprint/active-sprint-page'
import { BacklogPage } from '@/modules/backlog/backlog-page'
import { AppLayout } from '@/modules/shared/component/layout/AppLayout'
import { TimelinePage } from '@/modules/timeline/timeline-page'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path='/' element={<Navigate to='/backlog' replace />} />
          <Route path='/backlog' element={<BacklogPage />} />
          <Route path='/sprint' element={<ActiveSprintPage />} />
          <Route path='/timeline' element={<TimelinePage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
