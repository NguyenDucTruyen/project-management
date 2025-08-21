import { useEffect } from 'react'
import { useApiContext } from './api-context'

export function useApiQuery<T>(key: string, fetcher: () => Promise<T>, options?: { enabled?: boolean }) {
  const { state, fetchData } = useApiContext()
  const apiState = state[key] || { data: null, loading: false, error: null }

  useEffect(() => {
    if (options?.enabled === false) return
    if (!apiState.data && !apiState.loading && !apiState.error) {
      fetchData(key, fetcher)
    }
    // eslint-disable-next-line
  }, [key, fetcher, options?.enabled])

  return apiState
}
