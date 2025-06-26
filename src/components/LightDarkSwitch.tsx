import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useTheme } from '@/hooks/useTheme'
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from '@constants/constants'
import type { LIGHT_DARK_MODE } from '@/types/config'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'

const LightDarkSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [showPanel, setShowPanel] = useState(false)

  const seq: LIGHT_DARK_MODE[] = [LIGHT_MODE, DARK_MODE, AUTO_MODE]

  const toggleScheme = () => {
    const currentIndex = seq.indexOf(theme)
    const nextIndex = (currentIndex + 1) % seq.length
    setTheme(seq[nextIndex])
  }

  const switchScheme = (newMode: LIGHT_DARK_MODE) => {
    setTheme(newMode)
    setShowPanel(false)
  }

  return (
    <div 
      className="relative z-50" 
      onMouseLeave={() => setShowPanel(false)}
    >
      <button
        className="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
        onClick={toggleScheme}
        onMouseEnter={() => setShowPanel(true)}
      >
        <div className={`absolute ${theme !== LIGHT_MODE ? 'opacity-0' : ''}`}>
          <Icon icon="material-symbols:wb-sunny-outline-rounded" className="text-[1.25rem]" />
        </div>
        <div className={`absolute ${theme !== DARK_MODE ? 'opacity-0' : ''}`}>
          <Icon icon="material-symbols:dark-mode-outline-rounded" className="text-[1.25rem]" />
        </div>
        <div className={`absolute ${theme !== AUTO_MODE ? 'opacity-0' : ''}`}>
          <Icon icon="material-symbols:radio-button-partial-outline" className="text-[1.25rem]" />
        </div>
      </button>

      <div 
        className={`hidden lg:block absolute transition-all w-80 right-4 px-4 py-4 top-11 -right-2 pt-5 ${
          showPanel ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <div className="card-base float-panel p-2">
          <button
            className={`flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5 ${
              theme === LIGHT_MODE ? 'current-theme-btn' : ''
            }`}
            onClick={() => switchScheme(LIGHT_MODE)}
          >
            <Icon icon="material-symbols:wb-sunny-outline-rounded" className="text-[1.25rem] mr-3" />
            {i18n(I18nKey.lightMode)}
          </button>
          <button
            className={`flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5 ${
              theme === DARK_MODE ? 'current-theme-btn' : ''
            }`}
            onClick={() => switchScheme(DARK_MODE)}
          >
            <Icon icon="material-symbols:dark-mode-outline-rounded" className="text-[1.25rem] mr-3" />
            {i18n(I18nKey.darkMode)}
          </button>
          <button
            className={`flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 ${
              theme === AUTO_MODE ? 'current-theme-btn' : ''
            }`}
            onClick={() => switchScheme(AUTO_MODE)}
          >
            <Icon icon="material-symbols:radio-button-partial-outline" className="text-[1.25rem] mr-3" />
            {i18n(I18nKey.systemMode)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LightDarkSwitch