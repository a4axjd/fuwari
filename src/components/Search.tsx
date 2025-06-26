import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { usePosts } from '@/hooks/usePosts'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'

interface SearchResult {
  slug: string
  title: string
  excerpt: string
}

const Search: React.FC = () => {
  const [keywordDesktop, setKeywordDesktop] = useState('')
  const [keywordMobile, setKeywordMobile] = useState('')
  const [showPanel, setShowPanel] = useState(false)
  const [showMobilePanel, setShowMobilePanel] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  
  const { data: posts } = usePosts()

  const search = (keyword: string) => {
    if (!keyword.trim() || !posts) {
      setResults([])
      return
    }

    const filtered = posts
      .filter(post => 
        post.title.toLowerCase().includes(keyword.toLowerCase()) ||
        post.content.toLowerCase().includes(keyword.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
      )
      .slice(0, 5)
      .map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || post.description || ''
      }))

    setResults(filtered)
  }

  useEffect(() => {
    search(keywordDesktop)
    setShowPanel(keywordDesktop.length > 0 && results.length > 0)
  }, [keywordDesktop, posts])

  useEffect(() => {
    search(keywordMobile)
  }, [keywordMobile, posts])

  return (
    <>
      {/* Desktop search bar */}
      <div className="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10">
        <Icon 
          icon="material-symbols:search" 
          className="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
        />
        <input
          placeholder={i18n(I18nKey.search)}
          value={keywordDesktop}
          onChange={(e) => setKeywordDesktop(e.target.value)}
          onFocus={() => search(keywordDesktop)}
          className="transition-all pl-10 text-sm bg-transparent outline-0 h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50"
        />
      </div>

      {/* Mobile search toggle */}
      <button
        onClick={() => setShowMobilePanel(!showMobilePanel)}
        className="btn-plain scale-animation lg:!hidden rounded-lg w-11 h-11 active:scale-90"
      >
        <Icon icon="material-symbols:search" className="text-[1.25rem]" />
      </button>

      {/* Desktop search panel */}
      {showPanel && (
        <div className="absolute top-20 right-4 w-[30rem] bg-[var(--float-panel-bg)] rounded-2xl shadow-2xl p-2 z-50">
          {results.map((item) => (
            <a
              key={item.slug}
              href={`/posts/${item.slug}`}
              className="group block rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition"
            >
              <div className="text-90 inline-flex font-bold group-hover:text-[var(--primary)] transition">
                {item.title}
                <Icon icon="fa6-solid:chevron-right" className="text-[0.75rem] translate-x-1 my-auto text-[var(--primary)] transition" />
              </div>
              <div className="text-sm text-50 transition">
                {item.excerpt}
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Mobile search panel */}
      {showMobilePanel && (
        <div className="absolute top-20 left-4 right-4 bg-[var(--float-panel-bg)] rounded-2xl shadow-2xl p-2 md:hidden z-50">
          <div className="flex relative transition-all items-center h-11 rounded-xl bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06] dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10 mb-2">
            <Icon 
              icon="material-symbols:search" 
              className="absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"
            />
            <input
              placeholder="Search"
              value={keywordMobile}
              onChange={(e) => setKeywordMobile(e.target.value)}
              className="pl-10 absolute inset-0 text-sm bg-transparent outline-0 text-black/50 dark:text-white/50"
            />
          </div>
          
          {results.map((item) => (
            <a
              key={item.slug}
              href={`/posts/${item.slug}`}
              className="group block rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition"
              onClick={() => setShowMobilePanel(false)}
            >
              <div className="text-90 inline-flex font-bold group-hover:text-[var(--primary)] transition">
                {item.title}
                <Icon icon="fa6-solid:chevron-right" className="text-[0.75rem] translate-x-1 my-auto text-[var(--primary)] transition" />
              </div>
              <div className="text-sm text-50 transition">
                {item.excerpt}
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  )
}

export default Search