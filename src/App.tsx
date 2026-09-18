import { useState, useEffect } from 'react'
import { ConceptSwitcherPill } from './components/shell/ConceptSwitcherPill'
import { CONCEPTS } from './components/shell/conceptTypes'
import type { ConceptId } from './components/shell/conceptTypes'
import { AtelierRoot } from './concepts/atelier/AtelierRoot'
import { DistrictApp } from './concepts/district/DistrictApp'
import { IndigoApp } from './concepts/indigo/IndigoApp'
import { LifeWearApp } from './concepts/lifewear/LifeWearApp'
import { FamilyApp } from './concepts/family/FamilyApp'
import { GlacierApp } from './concepts/glacier/GlacierApp'
import { Compass } from 'lucide-react'

export function App() {
  const [activeConcept, setActiveConcept] = useState<ConceptId>('glacier')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('blueyes-theme')
      if (saved === 'dark' || saved === 'light') return saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('blueyes-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] transition-colors duration-200 relative flex flex-col selection:bg-[var(--color-accent-blue)] selection:text-white">
      {/* Dynamic Concept Content */}
      <div className="w-full flex-1 flex flex-col">
        {activeConcept === 'atelier' && (
          <AtelierRoot theme={theme} onToggleTheme={toggleTheme} />
        )}

        {activeConcept === 'district' && (
          <DistrictApp theme={theme} onToggleTheme={toggleTheme} />
        )}

        {activeConcept === 'indigo' && (
          <IndigoApp theme={theme} onToggleTheme={toggleTheme} />
        )}

        {activeConcept === 'lifewear' && (
          <LifeWearApp theme={theme} onToggleTheme={toggleTheme} />
        )}

        {activeConcept === 'family' && (
          <FamilyApp theme={theme} onToggleTheme={toggleTheme} />
        )}

        {activeConcept === 'glacier' && (
          <GlacierApp theme={theme} onToggleTheme={toggleTheme} />
        )}

        {activeConcept !== 'atelier' &&
          activeConcept !== 'district' &&
          activeConcept !== 'indigo' &&
          activeConcept !== 'lifewear' &&
          activeConcept !== 'family' &&
          activeConcept !== 'glacier' && (
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh] pb-32">
            <div className="w-20 h-20 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-accent-blue)] flex items-center justify-center mb-5 shadow-sm">
              <Compass className="w-10 h-10" />
            </div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[var(--color-accent-bronze)] font-semibold mb-2">
              Blu Eyes Concept 0{CONCEPTS.find((c) => c.id === activeConcept)?.number}
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] text-[var(--color-text-primary)] mb-3">
              {CONCEPTS.find((c) => c.id === activeConcept)?.label}
            </h2>
            <p className="text-[14px] sm:text-[15px] font-sans text-[var(--color-text-secondary)] max-w-md mb-8 leading-relaxed">
              {CONCEPTS.find((c) => c.id === activeConcept)?.tagline}. Full multi-device experience currently in active development.
            </p>
            <button
              type="button"
              onClick={() => setActiveConcept('atelier')}
              className="px-8 py-3.5 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[12px] font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-blue)] transition-colors cursor-pointer shadow-md"
            >
              Return to 1. Atelier
            </button>
          </div>
        )}
      </div>

      {/* Floating Glassmorphic Concept Switcher Dock (Bottom-aligned across mobile & desktop) */}
      <ConceptSwitcherPill
        activeConcept={activeConcept}
        onSelectConcept={(id) => setActiveConcept(id)}
      />
    </div>
  )
}

export default App
