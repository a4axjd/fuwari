import React from 'react'
import { siteConfig } from '@/config'

const ConfigCarrier: React.FC = () => {
  return (
    <div 
      id="config-carrier" 
      data-hue={siteConfig.themeColor.hue}
      style={{ display: 'none' }}
    />
  )
}

export default ConfigCarrier