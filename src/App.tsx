import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ActiveSprintPage } from './components/pages/ActiveSprintPage';
import { BacklogPage } from './components/pages/BacklogPage';
import { MemoDemo } from './components/pages/MemoDemo';
import { TimelinePage } from './components/pages/TimelinePage';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/backlog" replace />} />
          <Route path="/backlog" element={<BacklogPage />} />
          <Route path="/sprint" element={<ActiveSprintPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/memo-demo" element={<MemoDemo />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
