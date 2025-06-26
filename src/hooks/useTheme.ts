import { useState, useCallback, useEffect } from 'react'
import type { LIGHT_DARK_MODE } from '@/types/config'
import {
  AUTO_MODE,
  DARK_MODE,
  DEFAULT_THEME,
  LIGHT_MODE,
} from '@constants/constants'

export function useTheme() {
  const [theme, setThemeState] = useState<LIGHT_DARK_MODE>(DEFAULT_THEME)

  const applyThemeToDocument = useCallback((theme: LIGHT_DARK_MODE) => {
    switch (theme) {
      case LIGHT_MODE:
        document.documentElement.classList.remove('dark')
        break
      case DARK_MODE:
        document.documentElement.classList.add('dark')
        break
      case AUTO_MODE:
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        break
    }
  }, [])

  const setTheme = useCallback((newTheme: LIGHT_DARK_MODE) => {
    localStorage.setItem('theme', newTheme)
    setThemeState(newTheme)
    applyThemeToDocument(newTheme)
  }, [applyThemeToDocument])

  const getStoredTheme = useCallback((): LIGHT_DARK_MODE => {
    return (localStorage.getItem('theme') as LIGHT_DARK_MODE) || DEFAULT_THEME
  }, [])

  const initializeTheme = useCallback(() => {
    const storedTheme = getStoredTheme()
    setThemeState(storedTheme)
    applyThemeToDocument(storedTheme)
  }, [getStoredTheme, applyThemeToDocument])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === AUTO_MODE) {
        applyThemeToDocument(AUTO_MODE)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, applyThemeToDocument])

  return {
    theme,
    setTheme,
    initializeTheme,
    getStoredTheme,
  }
}