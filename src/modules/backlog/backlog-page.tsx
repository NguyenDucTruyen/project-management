import { useApiQuery } from '@/lib/useApiQuery'
import type { Priority } from '@/modules/shared/data/mockData'
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react'
import { BacklogHeader } from './backlog-header'
import type { Sprint, UserStory } from './services/api'
import { fetchSprints, fetchUserStories } from './services/api'
import { SprintList } from './sprint-list/sprint-list'

export type BacklogData = {
  sprints: Sprint[]
  searchText: string
  priority: Priority | string
  assignee: string
  userStoryMap: Map<string, UserStory>
  loading: 'userstories' | 'sprints' | null
  error: string | null
}
const INIT_BACKLOG_DATA: BacklogData = {
  sprints: [],
  searchText: '',
  priority: '',
  assignee: '',
  userStoryMap: new Map(),
  loading: null,
  error: null
}
type BacklogDispatchAction =
  | { type: 'search:userStory:start' }
  | { type: 'load:sprints:start' }
  | { type: 'error' }
  | { type: 'load:sprints:success'; data: Sprint[] }
  | { type: 'search:userStory:success'; data: UserStory[] }
  | { type: 'toggle:showUserStory'; sprintId: string | null }
function backlogDispatch(state: BacklogData, payload: BacklogDispatchAction): BacklogData {
  switch (payload.type) {
    case 'search:userStory:start':
      return {
        ...state,
        loading: 'userstories',
        error: null
      }
    case 'load:sprints:start':
      return {
        ...state,
        loading: 'sprints',
        error: null
      }
    // removed load:tasks:start
    case 'error':
      return {
        ...state,
        loading: null,
        error: 'Something went wrong'
      }
    case 'load:sprints:success':
      return {
        ...state,
        sprints: payload.data,
        loading: null,
        error: null
      }
    case 'search:userStory:success': {
      const newUserStoryMap = new Map(state.userStoryMap)
      // Không clear map, chỉ thêm/update user stories mới
      payload.data.forEach((item: UserStory) => {
        newUserStoryMap.set(item.id, item)
      })
      return {
        ...state,
        userStoryMap: newUserStoryMap,
        loading: null,
        error: null
      }
    }
    case 'toggle:showUserStory': {
      const updatedSprints = state.sprints.map((sprint) => {
        if (sprint.id === payload.sprintId) {
          return {
            ...sprint,
            showUserStory: !sprint.showUserStory
          }
        }
        return sprint
      })

      return {
        ...state,
        sprints: updatedSprints
      }
    }
    // removed toggle:showTask and load:tasks:success cases
    // removed update:filter case
    default:
      return state
  }
}
export const BacklogDataContext = createContext(INIT_BACKLOG_DATA)
export const BacklogDispatchContext = createContext<React.Dispatch<BacklogDispatchAction> | null>(null)
export const BacklogActionsContext = createContext<{
  loadSprints: () => Promise<void>
  loadUserStoriesForSprint: (sprintId: string | null) => Promise<void>
  createSprint: (data: Partial<Sprint>) => Promise<void>
  createUserStory: (data: Partial<UserStory>) => Promise<void>
} | null>(null)

export function useBacklogActions() {
  const context = useContext(BacklogActionsContext)
  if (!context) {
    throw new Error('useBacklogActions must be used within a BacklogContext')
  }
  return context
}

export function useBacklogData() {
  return useContext(BacklogDataContext)
}

export function BacklogContext({ children }: { children: React.ReactNode }) {
  const [backlogStore, dispatchBacklogStore] = useReducer(backlogDispatch, INIT_BACKLOG_DATA)
  const backlogStoreRef = useRef(backlogStore)

  backlogStoreRef.current = backlogStore

  // Fetch sprints from API and store in context
  const { data: sprintsData, loading: sprintsLoading, error: sprintsError } = useApiQuery('sprints', fetchSprints)
  // Fetch all user stories (for demo, could be per sprint)
  const {
    data: userStoriesData,
    loading: userStoriesLoading,
    error: userStoriesError
  } = useApiQuery('userStories', fetchUserStories)

  // Sync API data to context state
  useEffect(() => {
    if (sprintsData) {
      dispatchBacklogStore({ type: 'load:sprints:success', data: sprintsData })
    }
  }, [sprintsData])

  useEffect(() => {
    if (userStoriesData) {
      dispatchBacklogStore({ type: 'search:userStory:success', data: userStoriesData })
    }
  }, [userStoriesData])

  const loadSprints = useCallback(async () => {}, []) // No-op, handled by useApiQuery

  const loadTasks = useCallback(async (userStoryId: string) => {
    console.log('loadTasks - Function called for userStoryId:', userStoryId)
    dispatchBacklogStore({ type: 'load:tasks:start' })

    try {
      const tasks = await getListTasks(userStoryId)
      console.log('loadTasks - Data received:', tasks.length, 'tasks')
      dispatchBacklogStore({
        type: 'load:tasks:success',
        data: tasks
      })
    } catch {
      dispatchBacklogStore({
        type: 'error'
      })
    }
  }, [])

  const updateFilter = useCallback(
    (filterPayload: { searchText?: string; priority?: Priority | string; assignee?: string }) => {
      console.log('updateFilter - Called with:', filterPayload)
      dispatchBacklogStore({
        type: 'update:filter',
        payload: filterPayload
      })
    },
    []
  )

  const searchWithCurrentFilters = useCallback(async () => {
    console.log('searchWithCurrentFilters - Called')
    dispatchBacklogStore({ type: 'search:userStory:start' })

    try {
      // Sử dụng state mới nhất từ ref
      const currentState = backlogStoreRef.current
      const openSprints = currentState.sprints.filter((sprint) => sprint.showUserStory)

      if (openSprints.length === 0) {
        console.log('No open sprints to search')
        return
      }

      const searchPromises = openSprints.map((sprint) =>
        getListUserStories({
          sprintId: sprint.id || '',
          priority: currentState.priority as 'High' | 'Medium' | 'Low',
          assignee: currentState.assignee,
          searchText: currentState.searchText
        })
      )

      const results = await Promise.all(searchPromises)
      const flattenedUserStories = results.flat()

      dispatchBacklogStore({
        type: 'search:userStory:success',
        data: flattenedUserStories
      })

      console.log('searchWithCurrentFilters - Found:', flattenedUserStories.length, 'user stories')
    } catch {
      console.log('searchWithCurrentFilters - Error occurred')
      dispatchBacklogStore({
        type: 'error'
      })
    }
  }, [])

  // For demo, just refetch all user stories (could be filtered by sprintId)
  const loadUserStoriesForSprint = useCallback(async (sprintId: string | null) => {
    // Could implement per-sprint fetch if API supports
    // For now, just refetch all
    await fetchUserStories()
  }, [])

  // Modal create handlers (to be used in modal forms)
  const createSprint = useCallback(async (data: Partial<Sprint>) => {
    await fetch('/sprints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }, [])

  const createUserStory = useCallback(async (data: Partial<UserStory>) => {
    await fetch('/user-stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }, [])

  const searchUserStories = useCallback(async (payload: FilterUserstory) => {
    dispatchBacklogStore({ type: 'search:userStory:start' })

    try {
      // Sử dụng ref để lấy state mới nhất mà không cần dependency
      const listSprintsShowUserStories = backlogStoreRef.current.sprints.filter((sprint) => sprint.showUserStory)

      const listPromiseListUserStories = listSprintsShowUserStories.map((item) =>
        getListUserStories({ sprintId: item.id || '', ...payload.data })
      )

      const listUserStories = await Promise.all(listPromiseListUserStories)
      const flattenedUserStories = listUserStories.flat()

      dispatchBacklogStore({
        type: 'search:userStory:success',
        data: flattenedUserStories
      })
      console.log('listUserStories', flattenedUserStories)
    } catch {
      dispatchBacklogStore({
        type: 'error'
      })
    }
  }, [])

  const actions = useMemo(
    () => ({
      loadSprints,
      loadUserStoriesForSprint,
      createSprint,
      createUserStory
    }),
    [loadSprints, loadUserStoriesForSprint, createSprint, createUserStory]
  )

  return (
    <BacklogDataContext.Provider value={backlogStore}>
      <BacklogDispatchContext.Provider value={dispatchBacklogStore}>
        <BacklogActionsContext.Provider value={actions}>{children}</BacklogActionsContext.Provider>
      </BacklogDispatchContext.Provider>
    </BacklogDataContext.Provider>
  )
}

export function BacklogPage() {
  return (
    <BacklogContext>
      <BacklogPageContent />
    </BacklogContext>
  )
}

function BacklogPageContent() {
  const backlogData = useBacklogData()
  const { loadSprints } = useBacklogActions()

  useEffect(() => {
    loadSprints()
  }, [loadSprints])

  return (
    <>
      <BacklogHeader />
      <div className='p-4'>
        <SprintList sprints={backlogData.sprints}></SprintList>
      </div>
    </>
  )
}
