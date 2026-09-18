import React from 'react'
import { AtelierApp } from './AtelierApp'

interface AtelierRootProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const AtelierRoot: React.FC<AtelierRootProps> = (props) => {
  return <AtelierApp {...props} />
}

export default AtelierRoot
