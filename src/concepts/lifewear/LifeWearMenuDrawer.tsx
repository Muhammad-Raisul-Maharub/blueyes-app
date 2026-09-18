import React from 'react'
import { X, ArrowRight, Sun, Moon } from 'lucide-react'
import type { Currency, LifeWearCategory, LifeWearView } from './types'

interface LifeWearMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentView: LifeWearView
  selectedCategory: LifeWearCategory
  onNavigate: (view: LifeWearView, category?: LifeWearCategory) => void
  currency: Currency
  onToggleCurrency: (c: Currency) => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const LifeWearMenuDrawer: React.FC<LifeWearMenuDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  selectedCategory,
  onNavigate,
  currency,
  onToggleCurrency,
  theme,
  onToggleTheme,
}) => {
  if (!isOpen) return null

  const categories: { id: LifeWearCategory; label: string }[] = [
    { id: 'all', label: 'All LifeWear' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'kids', label: 'Kids' },
    { id: 'baby', label: 'Baby' },
    { id: 'accessories', label: 'Accessories' },
  ]

  const handleSelect = (view: LifeWearView, cat?: LifeWearCategory) => {
    onNavigate(view, cat)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs select-none lg:hidden">
      <div className="w-4/5 max-w-xs bg-[var(--color-canvas)] border-r border-[var(--color-border)] h-full flex flex-col justify-between text-left">
        {/* Header */}
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sm text-[var(--color-text-primary)]">BLU EYES</span>
            <span className="px-1.5 py-0.5 bg-[#004CE8] text-white text-[9px] font-mono font-bold">
              LIFEWEAR
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 border border-[var(--color-border)] text-[var(--color-text-primary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Nav */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider block mb-2">
              DEPARTMENTS (CLEAN LABELS)
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id && currentView !== 'about' && currentView !== 'lookbook'
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelect(cat.id === 'all' ? 'home' : (cat.id as LifeWearView), cat.id)}
                  className={`w-full py-2.5 px-3 text-left font-mono text-xs flex items-center justify-between transition-colors border ${
                    isSelected
                      ? 'bg-[#004CE8] border-[#004CE8] text-white font-semibold'
                      : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                  }`}
                >
                  <span>[{cat.label}]</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )
            })}
          </div>

          {/* Editorial & About Links */}
          <div className="space-y-1 pt-4 border-t border-[var(--color-border)]">
            <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider block mb-2">
              SPECIFICATIONS & ORIGIN
            </span>
            <button
              type="button"
              onClick={() => handleSelect('lookbook')}
              className="w-full py-2 px-3 text-left font-mono text-xs text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] flex justify-between"
            >
              <span>LOOKBOOK (SS26)</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-50" />
            </button>
            <button
              type="button"
              onClick={() => handleSelect('about')}
              className="w-full py-2 px-3 text-left font-mono text-xs text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] flex justify-between"
            >
              <span>ABOUT / CHATTOGRAM</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-50" />
            </button>
          </div>
        </div>

        {/* Footer Utilities: Currency & Theme */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[var(--color-text-secondary)] uppercase">CURRENCY:</span>
            <div className="inline-flex border border-[var(--color-border)] bg-[var(--color-canvas)]">
              <button
                type="button"
                onClick={() => onToggleCurrency('BDT')}
                className={`px-2 py-0.5 text-[11px] ${currency === 'BDT' ? 'bg-[#004CE8] text-white' : ''}`}
              >
                BDT (৳)
              </button>
              <button
                type="button"
                onClick={() => onToggleCurrency('USD')}
                className={`px-2 py-0.5 text-[11px] ${currency === 'USD' ? 'bg-[#004CE8] text-white' : ''}`}
              >
                USD ($)
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
            <span className="text-[10px] text-[var(--color-text-secondary)] uppercase">APPEARANCE:</span>
            <button
              type="button"
              onClick={onToggleTheme}
              className="px-2 py-1 border border-[var(--color-border)] bg-[var(--color-canvas)] flex items-center space-x-1 text-[11px]"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
