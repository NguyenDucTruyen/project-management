import React, { createContext, useContext, useReducer } from 'react'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

type Action =
  | { type: 'FETCH_START'; key: string }
  | { type: 'FETCH_SUCCESS'; key: string; data: unknown }
  | { type: 'FETCH_ERROR'; key: string; error: string }

interface ApiContextType {
  state: Record<string, ApiState<unknown>>
  fetchData: <T>(key: string, fetcher: () => Promise<T>) => void
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

function apiReducer(state: Record<string, ApiState<unknown>>, action: Action): Record<string, ApiState<unknown>> {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        [action.key]: { data: null, loading: true, error: null }
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        [action.key]: { data: action.data, loading: false, error: null }
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        [action.key]: { data: null, loading: false, error: action.error }
      }
    default:
      return state
  }
}

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(apiReducer, {})

  const fetchData = async <T,>(key: string, fetcher: () => Promise<T>) => {
    dispatch({ type: 'FETCH_START', key })
    try {
      const data = await fetcher()
      dispatch({ type: 'FETCH_SUCCESS', key, data })
    } catch (error) {
      let message = 'Error'
      if (error instanceof Error) message = error.message
      dispatch({ type: 'FETCH_ERROR', key, error: message })
    }
  }

  return <ApiContext.Provider value={{ state, fetchData }}>{children}</ApiContext.Provider>
}

export function useApiContext() {
  const ctx = useContext(ApiContext)
  if (!ctx) throw new Error('useApiContext must be used within ApiProvider')
  return ctx
}
