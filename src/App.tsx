import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { TargetAndTransition, Transition } from 'framer-motion'
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

// Concept-specific motion profiles
const CONCEPT_MOTION_VARIANTS: Record<
  ConceptId,
  {
    initial: TargetAndTransition
    animate: TargetAndTransition
    exit: TargetAndTransition
    transition: Transition
  }
> = {
  // Atelier: 350ms smooth cubic-bezier opacity and slight Y-translation fades
  atelier: {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -14 },
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
  // District: 100ms snappy spring state transitions with scale feedback
  district: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { type: 'spring', stiffness: 450, damping: 32, duration: 0.1 },
  },
  // Indigo: Gentle 400ms curtain fade between English and Bengali glyphs / views
  indigo: {
    initial: { opacity: 0, filter: 'blur(4px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(4px)' },
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  // LifeWear: Instantaneous 80ms state changes with zero layout shift
  lifewear: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.08, ease: 'linear' },
  },
  // Family: Playful spring bounce (stiffness: 280, damping: 18)
  family: {
    initial: { opacity: 0, scale: 0.97, y: 12 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97, y: -12 },
    transition: { type: 'spring', stiffness: 280, damping: 18 },
  },
  // Glacier: Cyan luminescent pulse and smooth frosted drawer blur animations
  glacier: {
    initial: { opacity: 0, filter: 'brightness(1.4) blur(4px)' },
    animate: { opacity: 1, filter: 'brightness(1) blur(0px)' },
    exit: { opacity: 0, filter: 'brightness(1.4) blur(4px)' },
    transition: { duration: 0.35, ease: 'easeOut' },
  },
}

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

  const currentMotion = CONCEPT_MOTION_VARIANTS[activeConcept] || CONCEPT_MOTION_VARIANTS.atelier

  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] transition-colors duration-200 relative flex flex-col selection:bg-[var(--color-accent-blue)] selection:text-white overflow-x-hidden">
      {/* Dynamic Concept Content wrapped in AnimatePresence with concept-specific transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeConcept}
          initial={currentMotion.initial}
          animate={currentMotion.animate}
          exit={currentMotion.exit}
          transition={currentMotion.transition}
          className="w-full flex-1 flex flex-col"
        >
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
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh] pb-32">
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
        </motion.div>
      </AnimatePresence>

      {/* Floating Glassmorphic Concept Switcher Dock (Bottom-aligned across mobile & desktop) */}
      <ConceptSwitcherPill
        activeConcept={activeConcept}
        onSelectConcept={(id) => setActiveConcept(id)}
      />
    </div>
  )
}

export default App
