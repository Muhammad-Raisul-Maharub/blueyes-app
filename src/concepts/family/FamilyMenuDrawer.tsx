import React from 'react'
import { X, ArrowRight, Sun, Moon, Heart } from 'lucide-react'
import type { Currency, FamilyDemographic, FamilyView } from './types'

interface FamilyMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentView: FamilyView
  selectedDemographic: FamilyDemographic
  onNavigate: (view: FamilyView, demographic?: FamilyDemographic) => void
  currency: Currency
  onToggleCurrency: (c: Currency) => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const FamilyMenuDrawer: React.FC<FamilyMenuDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  selectedDemographic,
  onNavigate,
  currency,
  onToggleCurrency,
  theme,
  onToggleTheme,
}) => {
  if (!isOpen) return null

  const departments: { id: FamilyDemographic; label: string }[] = [
    { id: 'all', label: 'All Family Essentials' },
    { id: 'baby', label: 'Baby & Newborn Layettes' },
    { id: 'kids', label: 'Kids’ Play Apparel' },
    { id: 'mom', label: 'Mom’s Everyday & Nursing' },
    { id: 'dad', label: 'Dad’s Weekend Wardrobe' },
    { id: 'matching', label: 'Coordinated Matching Sets' },
  ]

  const handleSelect = (view: FamilyView, dem?: FamilyDemographic) => {
    onNavigate(view, dem)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs select-none lg:hidden font-['Public_Sans']">
      <div className="w-4/5 max-w-xs bg-[var(--color-surface)] border-r border-[var(--color-border)] h-full flex flex-col justify-between text-left shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-soft)] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-base text-[var(--color-text-primary)] font-['Outfit']">
              Blu Eyes
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#F76C5E] text-white text-[10px] font-bold uppercase">
              Family
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 border border-[var(--color-border)] rounded-full text-[var(--color-text-primary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Departments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider block mb-2">
              DEPARTMENTS
            </span>
            {departments.map((dep) => {
              const isSelected = selectedDemographic === dep.id && currentView !== 'about' && currentView !== 'hub'
              return (
                <button
                  key={dep.id}
                  type="button"
                  onClick={() => handleSelect('category', dep.id)}
                  className={`w-full py-3 px-3.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#175CD3] text-white shadow-xs'
                      : 'bg-[var(--color-surface-soft)] text-[var(--color-text-primary)] hover:bg-[#175CD3]/10'
                  }`}
                >
                  <span>{dep.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              )
            })}
          </div>

          {/* Special Hub & About */}
          <div className="space-y-1 pt-4 border-t border-[var(--color-border)]">
            <span className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider block mb-2">
              FAMILY CLUB & HERITAGE
            </span>
            <button
              type="button"
              onClick={() => handleSelect('hub')}
              className="w-full py-2.5 px-3 rounded-xl text-left text-xs font-bold text-[#F76C5E] hover:bg-[#F76C5E]/10 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 fill-[#F76C5E]" />
                <span>Family Loyalty Hub (-20%)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </button>
            <button
              type="button"
              onClick={() => handleSelect('about')}
              className="w-full py-2.5 px-3 rounded-xl text-left text-xs font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft)] flex items-center justify-between cursor-pointer"
            >
              <span>About Maison Chattogram</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </button>
          </div>
        </div>

        {/* Footer Utilities */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-soft)] space-y-3 text-xs">
          <div className="flex items-center justify-between font-bold">
            <span className="text-[10px] text-[var(--color-text-secondary)] uppercase">CURRENCY:</span>
            <div className="inline-flex bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full p-0.5">
              <button
                type="button"
                onClick={() => onToggleCurrency('BDT')}
                className={`px-3 py-0.5 rounded-full ${currency === 'BDT' ? 'bg-[#175CD3] text-white' : ''}`}
              >
                BDT (৳)
              </button>
              <button
                type="button"
                onClick={() => onToggleCurrency('USD')}
                className={`px-3 py-0.5 rounded-full ${currency === 'USD' ? 'bg-[#175CD3] text-white' : ''}`}
              >
                USD ($)
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)] font-bold">
            <span className="text-[10px] text-[var(--color-text-secondary)] uppercase">APPEARANCE:</span>
            <button
              type="button"
              onClick={onToggleTheme}
              className="px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center space-x-1.5 cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
