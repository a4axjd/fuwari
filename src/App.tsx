import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { useHue } from '@/hooks/useHue'
import { siteConfig } from '@/config'
import HomePage from '@/pages/HomePage'
import PostPage from '@/pages/PostPage'
import ArchivePage from '@/pages/ArchivePage'
import AboutPage from '@/pages/AboutPage'
import CategoryPage from '@/pages/CategoryPage'
import TagPage from '@/pages/TagPage'
import ConfigCarrier from '@/components/ConfigCarrier'

function App() {
  const { initializeTheme } = useTheme()
  const { initializeHue } = useHue()

  useEffect(() => {
    initializeTheme()
    initializeHue()
  }, [initializeTheme, initializeHue])

  return (
    <>
      <ConfigCarrier />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:slug" element={<PostPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/archive/category/:category" element={<CategoryPage />} />
        <Route path="/archive/tag/:tag" element={<TagPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/:page" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App