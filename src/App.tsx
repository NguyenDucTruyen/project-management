// 1️⃣ External imports
import { createContext, useReducer } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// 2️⃣ Internal imports
import { ApiProvider } from '@/lib/api-context'
import { ActiveSprintPage } from '@/modules/active-sprint/active-sprint-page'
import { BacklogPage } from '@/modules/backlog/backlog-page'
import { AppLayout } from '@/modules/shared/component/layout/AppLayout'
import { TimelinePage } from '@/modules/timeline/timeline-page'

// 3️⃣ Types
type AppLayoutContextType = {
  sidebarOpen: boolean
  darkTheme: boolean
}

type UpdateSidebarAction = {
  type: typeof APP_LAYOUT_ACTIONS.SIDEBAR_UPDATE
  data: boolean
}

type ToggleSidebarAction = {
  type: typeof APP_LAYOUT_ACTIONS.SIDEBAR_TOGGLE
}

type UpdateThemeAction = {
  type: typeof APP_LAYOUT_ACTIONS.THEME_UPDATE
  data: boolean
}

type ToggleThemeAction = {
  type: typeof APP_LAYOUT_ACTIONS.THEME_TOGGLE
}

export type AppLayoutAction = UpdateSidebarAction | ToggleSidebarAction | UpdateThemeAction | ToggleThemeAction

// 4️⃣ Constants
export const INITIAL_APP_LAYOUT_STATE: AppLayoutContextType = {
  sidebarOpen: true,
  darkTheme: false
}

export const APP_LAYOUT_ACTIONS = {
  SIDEBAR_UPDATE: 'sidebar:update',
  SIDEBAR_TOGGLE: 'sidebar:toggle',
  THEME_UPDATE: 'theme:update',
  THEME_TOGGLE: 'theme:toggle'
} as const

// 5️⃣ Contexts
export const AppLayoutContext = createContext<AppLayoutContextType>(INITIAL_APP_LAYOUT_STATE)
export const AppLayoutDispatch = createContext<React.Dispatch<AppLayoutAction> | null>(null)

// 6️⃣ Reducer
const appLayoutReducer = (state: AppLayoutContextType, action: AppLayoutAction): AppLayoutContextType => {
  switch (action.type) {
    case APP_LAYOUT_ACTIONS.SIDEBAR_UPDATE:
      return { ...state, sidebarOpen: action.data }
    case APP_LAYOUT_ACTIONS.SIDEBAR_TOGGLE:
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case APP_LAYOUT_ACTIONS.THEME_UPDATE:
      return { ...state, darkTheme: action.data }
    case APP_LAYOUT_ACTIONS.THEME_TOGGLE:
      return { ...state, darkTheme: !state.darkTheme }
    default:
      return state
  }
}

// 7️⃣ Root Provider
const RootContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appLayoutReducer, INITIAL_APP_LAYOUT_STATE)
  return (
    <ApiProvider>
      <AppLayoutContext.Provider value={state}>
        <AppLayoutDispatch.Provider value={dispatch}>{children}</AppLayoutDispatch.Provider>
      </AppLayoutContext.Provider>
    </ApiProvider>
  )
}

// 8️⃣ App Component
function App() {
  return (
    <BrowserRouter>
      <RootContextProvider>
        <AppLayout>
          <Routes>
            <Route path='/' element={<Navigate to='/backlog' replace />} />
            <Route path='/backlog' element={<BacklogPage />} />
            <Route path='/sprint' element={<ActiveSprintPage />} />
            <Route path='/timeline' element={<TimelinePage />} />
          </Routes>
        </AppLayout>
      </RootContextProvider>
    </BrowserRouter>
  )
}

export default App
