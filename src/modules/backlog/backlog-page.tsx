import {
  getListSprints,
  getListTasks,
  getListUserStories,
  type Priority,
  type Sprint,
  type Task,
  type UserStory
} from '@/modules/shared/data/mockData'
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react'
import { BacklogHeader } from './backlog-header'
import { SprintList } from './sprint-list/sprint-list'

export type BacklogData = {
  sprints: Sprint[]
  searchText: string
  priority: Priority | string
  assignee: string
  userStoryMap: Map<string, UserStory>
  taskMap: Map<string, Task>
  loading: 'userstories' | 'sprints' | 'tasks' | null
  error: string | null
}
const INIT_BACKLOG_DATA: BacklogData = {
  sprints: [],
  searchText: '',
  priority: '',
  assignee: '',
  userStoryMap: new Map(),
  taskMap: new Map(),
  loading: null,
  error: null
}
type FilterOptions = {
  priority: 'High' | 'Medium' | 'Low'
  assignee: string
  searchText: string
}

type FilterUserstory = {
  type: 'search:userStory'
  data: FilterOptions
}
type UpdateListUserStory = {
  type: 'search:userStory:success'
  data: UserStory[]
}
type UpdateListSprints = {
  type: 'load:sprints:success'
  data: Sprint[]
}
type ChangeStateLoading = {
  type: 'search:userStory:start' | 'load:sprints:start' | 'load:tasks:start' | 'error'
}
type ToggleShowUserStory = {
  type: 'toggle:showUserStory'
  sprintId: string | null
}
type ToggleShowTask = {
  type: 'toggle:showTask'
  userStoryId: string
}
type UpdateListTasks = {
  type: 'load:tasks:success'
  data: Task[]
}
type UpdateFilter = {
  type: 'update:filter'
  payload: {
    searchText?: string
    priority?: Priority | string
    assignee?: string
  }
}

type BacklogDispatchAction =
  | ChangeStateLoading
  | UpdateListUserStory
  | UpdateListSprints
  | ToggleShowUserStory
  | ToggleShowTask
  | UpdateListTasks
  | UpdateFilter
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
    case 'load:tasks:start':
      return {
        ...state,
        loading: 'tasks',
        error: null
      }
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
    case 'toggle:showTask': {
      const updatedUserStoryMap = new Map(state.userStoryMap)
      const userStory = updatedUserStoryMap.get(payload.userStoryId)

      if (userStory) {
        updatedUserStoryMap.set(payload.userStoryId, {
          ...userStory,
          showTask: !userStory.showTask
        })
      }

      return {
        ...state,
        userStoryMap: updatedUserStoryMap
      }
    }
    case 'load:tasks:success': {
      const newTaskMap = new Map(state.taskMap)
      payload.data.forEach((task: Task) => {
        newTaskMap.set(task.id, task)
      })

      return {
        ...state,
        taskMap: newTaskMap,
        loading: null,
        error: null
      }
    }
    case 'update:filter': {
      return {
        ...state,
        searchText: payload.payload.searchText ?? state.searchText,
        priority: payload.payload.priority ?? state.priority,
        assignee: payload.payload.assignee ?? state.assignee
      }
    }
    default:
      return state
  }
}
export const BacklogDataContext = createContext(INIT_BACKLOG_DATA)
export const BacklogDispatchContext = createContext<React.Dispatch<BacklogDispatchAction> | null>(null)
export const BacklogActionsContext = createContext<{
  loadSprints: () => Promise<void>
  loadTasks: (userStoryId: string) => Promise<void>
  loadUserStoriesForSprint: (sprintId: string | null) => Promise<void>
  searchUserStories: (payload: FilterUserstory) => Promise<void>
  updateFilter: (filterPayload: { searchText?: string; priority?: Priority | string; assignee?: string }) => void
  searchWithCurrentFilters: () => Promise<void>
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

  const loadSprints = useCallback(async () => {
    dispatchBacklogStore({ type: 'load:sprints:start' })

    try {
      const sprints = await getListSprints()
      console.log('sprints', sprints)
      dispatchBacklogStore({
        type: 'load:sprints:success',
        data: sprints
      })
    } catch {
      dispatchBacklogStore({
        type: 'error'
      })
    }
  }, [])

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

  const loadUserStoriesForSprint = useCallback(async (sprintId: string | null) => {
    console.log('loadUserStoriesForSprint - Function called for sprintId:', sprintId)
    dispatchBacklogStore({ type: 'search:userStory:start' })

    try {
      if (!sprintId) return

      // Sử dụng filters hiện tại từ state
      const currentState = backlogStoreRef.current
      const userStories = await getListUserStories({
        sprintId,
        priority: currentState.priority as 'High' | 'Medium' | 'Low',
        assignee: currentState.assignee,
        searchText: currentState.searchText
      })

      console.log('loadUserStoriesForSprint - Data received:', userStories.length, 'user stories for sprint', sprintId)
      dispatchBacklogStore({
        type: 'search:userStory:success',
        data: userStories
      })
    } catch {
      dispatchBacklogStore({
        type: 'error'
      })
    }
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
      loadTasks,
      loadUserStoriesForSprint,
      searchUserStories,
      updateFilter,
      searchWithCurrentFilters
    }),
    [loadSprints, loadTasks, loadUserStoriesForSprint, searchUserStories, updateFilter, searchWithCurrentFilters]
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
