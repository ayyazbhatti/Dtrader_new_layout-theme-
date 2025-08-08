// Custom hooks for the DTrader Dashboard

import { useState, useEffect, useCallback, useRef } from 'react'
import { debounce } from '../utils'

/**
 * Hook for managing API loading states
 */
export const useApiState = <T>() => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, execute }
}

/**
 * Hook for managing pagination
 */
export const usePagination = (initialPage = 1, initialLimit = 10) => {
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)
  const [total, setTotal] = useState(0)

  const totalPages = Math.ceil(total / limit)
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const nextPage = useCallback(() => {
    if (hasNextPage) setPage(page + 1)
  }, [page, hasNextPage])

  const prevPage = useCallback(() => {
    if (hasPrevPage) setPage(page - 1)
  }, [page, hasPrevPage])

  const goToPage = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }, [totalPages])

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
    setPage,
    setLimit,
    setTotal,
    nextPage,
    prevPage,
    goToPage,
  }
}

/**
 * Hook for managing search with debouncing
 */
export const useSearch = (initialValue = '', delay = 300) => {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialValue)

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchTerm(searchTerm)
    }, delay)

    handler()
  }, [searchTerm, delay])

  return { searchTerm, setSearchTerm, debouncedSearchTerm }
}

/**
 * Hook for managing window size
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

/**
 * Hook for managing local storage
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}

/**
 * Hook for managing click outside
 */
export const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [callback])

  return ref
}

/**
 * Hook for managing keyboard shortcuts
 */
export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === key && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        callback()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [key, callback, ...dependencies])
} 