import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { navBarConfig, siteConfig } from '@/config'
import { LinkPresets } from '@/constants/link-presets'
import { LinkPreset, type NavBarLink } from '@/types/config'
import LightDarkSwitch from './LightDarkSwitch'
import Search from './Search'
import DisplaySettings from './widget/DisplaySettings'

const Navbar: React.FC = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links: NavBarLink[] = navBarConfig.links.map(
    (item: NavBarLink | LinkPreset): NavBarLink => {
      if (typeof item === 'number') {
        return LinkPresets[item]
      }
      return item
    }
  )

  return (
    <div id="navbar" className="z-50 onload-animation">
      <div className="absolute h-8 left-0 right-0 -top-8 bg-[var(--card-bg)] transition" />
      <div className="card-base !overflow-visible max-w-[var(--page-width)] h-[4.5rem] !rounded-t-none mx-auto flex items-center justify-between px-4">
        <Link 
          to="/" 
          className="btn-plain scale-animation rounded-lg h-[3.25rem] px-5 font-bold active:scale-95"
        >
          <div className="flex flex-row text-[var(--primary)] items-center text-md">
            <Icon icon="material-symbols:home-outline-rounded" className="text-[1.75rem] mb-1 mr-2" />
            {siteConfig.title}
          </div>
        </Link>

        <div className="hidden md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.external ? link.url : link.url}
              target={link.external ? "_blank" : undefined}
              className="btn-plain scale-animation rounded-lg h-11 font-bold px-5 active:scale-95"
            >
              <div className="flex items-center">
                {link.name}
                {link.external && (
                  <Icon 
                    icon="fa6-solid:arrow-up-right-from-square" 
                    className="text-[0.875rem] transition -translate-y-[1px] ml-1 text-black/[0.2] dark:text-white/[0.2]"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex">
          <Search />
          {!siteConfig.themeColor.fixed && <DisplaySettings />}
          <LightDarkSwitch />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn-plain scale-animation rounded-lg w-11 h-11 active:scale-90 md:!hidden"
          >
            <Icon icon="material-symbols:menu-rounded" className="text-[1.25rem]" />
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-4 right-4 bg-[var(--float-panel-bg)] rounded-lg shadow-xl md:hidden">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.external ? link.url : link.url}
                target={link.external ? "_blank" : undefined}
                className="block px-4 py-3 hover:bg-[var(--btn-plain-bg-hover)] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-black/75 dark:text-white/75">
                    {link.name}
                  </span>
                  <Icon 
                    icon={link.external ? "fa6-solid:arrow-up-right-from-square" : "material-symbols:chevron-right-rounded"}
                    className="text-[var(--primary)]"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar