import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useHue } from '@/hooks/useHue'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'

const DisplaySettings: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false)
  const { hue, setHue, getDefaultHue } = useHue()
  const defaultHue = getDefaultHue()

  const resetHue = () => {
    setHue(getDefaultHue())
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
      >
        <Icon icon="material-symbols:palette-outline" className="text-[1.25rem]" />
      </button>

      {showPanel && (
        <div className="absolute top-11 right-0 w-80 bg-[var(--float-panel-bg)] rounded-lg shadow-xl p-4 z-50">
          <div className="flex flex-row gap-2 mb-3 items-center justify-between">
            <div className="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)] before:absolute before:-left-3 before:top-[0.33rem]">
              {i18n(I18nKey.themeColor)}
              <button
                onClick={resetHue}
                className={`btn-regular w-7 h-7 rounded-md active:scale-90 transition ${
                  hue === defaultHue ? 'opacity-0 pointer-events-none' : ''
                }`}
              >
                <Icon icon="fa6-solid:arrow-rotate-left" className="text-[0.875rem]" />
              </button>
            </div>
            <div className="flex gap-1">
              <div className="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center font-bold text-sm items-center text-[var(--btn-content)]">
                {hue}
              </div>
            </div>
          </div>
          <div className="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none">
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => setHue(parseInt(e.target.value))}
              step="5"
              className="slider w-full"
              style={{
                background: 'var(--color-selection-bar)',
                height: '1.5rem',
                borderRadius: '0.125rem',
                appearance: 'none',
                WebkitAppearance: 'none',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default DisplaySettings