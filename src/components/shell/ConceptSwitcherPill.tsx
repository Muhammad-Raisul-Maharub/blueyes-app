import React from 'react'
import { CONCEPTS } from './conceptTypes'
import type { ConceptId } from './conceptTypes'

export type { ConceptId, ConceptInfo } from './conceptTypes'

interface ConceptSwitcherPillProps {
  activeConcept: ConceptId
  onSelectConcept: (concept: ConceptId) => void
}

export const ConceptSwitcherPill: React.FC<ConceptSwitcherPillProps> = ({
  activeConcept,
  onSelectConcept,
}) => {
  return (
    <aside aria-label="Concept Navigation" className="fixed bottom-20 md:bottom-6 left-0 right-0 z-40 flex justify-center px-3 pointer-events-none">
      <div className="pointer-events-auto bg-[var(--color-pill-bg)] backdrop-blur-xl border border-[var(--color-pill-border)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-1.5 flex items-center gap-1 max-w-[520px] w-full overflow-x-auto scrollbar-none transition-colors rounded-none sm:rounded-full">
        {CONCEPTS.map((concept) => {
          const isActive = activeConcept === concept.id
          return (
            <button
              key={concept.id}
              type="button"
              onClick={() => onSelectConcept(concept.id)}
              className={`flex-1 min-w-[58px] sm:min-w-[66px] py-1.5 px-1.5 sm:px-2 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer rounded-none sm:rounded-full ${
                isActive
                  ? concept.id === 'glacier'
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                    : 'bg-[#103FEF] text-white shadow-sm'
                  : 'text-white/65 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-0.5">
                <span className="text-[9px] font-mono font-bold opacity-60">
                  {concept.number}.
                </span>
                <span className="text-[10px] font-sans font-semibold tracking-wider uppercase">
                  {concept.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
