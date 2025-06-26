import { useState, useCallback } from 'react'
import { siteConfig } from '@/config'

export function useHue() {
  const [hue, setHueState] = useState<number>(siteConfig.themeColor.hue)

  const getDefaultHue = useCallback((): number => {
    return siteConfig.themeColor.hue
  }, [])

  const getStoredHue = useCallback((): number => {
    const stored = localStorage.getItem('hue')
    return stored ? parseInt(stored) : getDefaultHue()
  }, [getDefaultHue])

  const setHue = useCallback((newHue: number) => {
    localStorage.setItem('hue', String(newHue))
    setHueState(newHue)
    const root = document.querySelector(':root') as HTMLElement
    if (root) {
      root.style.setProperty('--hue', String(newHue))
    }
  }, [])

  const initializeHue = useCallback(() => {
    const storedHue = getStoredHue()
    setHue(storedHue)
  }, [getStoredHue, setHue])

  return {
    hue,
    setHue,
    initializeHue,
    getDefaultHue,
  }
}