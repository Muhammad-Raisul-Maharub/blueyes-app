import React from 'react'
import { Search, ShoppingBag, Sun, Moon, Menu } from 'lucide-react'
import type { Currency, LifeWearCategory, LifeWearView } from './types'

interface LifeWearHeaderProps {
  currentView: LifeWearView
  selectedCategory: LifeWearCategory
  onNavigate: (view: LifeWearView, category?: LifeWearCategory) => void
  currency: Currency
  onToggleCurrency: (c: Currency) => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  cartCount: number
  onOpenCart: () => void
  onOpenSearch: () => void
  onOpenMenu: () => void
}

export const LifeWearHeader: React.FC<LifeWearHeaderProps> = ({
  currentView,
  selectedCategory,
  onNavigate,
  currency,
  onToggleCurrency,
  theme,
  onToggleTheme,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenMenu,
}) => {
  const categories: { id: LifeWearCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'kids', label: 'Kids' },
    { id: 'baby', label: 'Baby' },
    { id: 'accessories', label: 'Accessories' },
  ]

  return (
    <header className="w-full sticky top-0 z-40 bg-[var(--color-canvas)] border-b border-[var(--color-border)] select-none">
      {/* 1. Top Logistics Notification Ticker */}
      <div className="w-full bg-[#004CE8] dark:bg-[#0039B4] text-white py-1.5 px-3 overflow-hidden text-[11px] font-mono tracking-wider">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center space-x-2 truncate">
            <span className="inline-block w-1.5 h-1.5 bg-white rounded-none animate-pulse" />
            <span className="font-semibold">BLU EYES LIFEWEAR</span>
            <span className="text-white/60">•</span>
            <span>SAME-DAY DISPATCH IN CHATTOGRAM</span>
            <span className="hidden sm:inline text-white/60">•</span>
            <span className="hidden sm:inline">48H NATIONWIDE TO ALL 64 DISTRICTS</span>
            <span className="hidden md:inline text-white/60">•</span>
            <span className="hidden md:inline">DHL GLOBAL EXPRESS</span>
          </div>
          <div className="hidden lg:flex items-center space-x-3 text-[10px] uppercase font-mono tracking-widest pl-4">
            <span className="text-white/80">PORT OF CHATTOGRAM // GEC FLAGSHIP</span>
          </div>
        </div>
      </div>

      {/* 2. Secondary Utility Bar: Currency & Coordinates */}
      <div className="w-full bg-[var(--color-surface)] border-b border-[var(--color-border)] text-[11px] text-[var(--color-text-secondary)] font-mono py-1 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-[var(--color-text-primary)] font-medium">LOC: BD / CHATTOGRAM</span>
            <span className="opacity-40">|</span>
            <span className="hidden sm:inline">COORDINATES: 22.3569° N, 91.8215° E</span>
          </div>

          {/* Currency Toggle [ BDT ] / USD */}
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)]">CURRENCY:</span>
            <div className="inline-flex items-center border border-[var(--color-border)] bg-[var(--color-canvas)] p-0.5">
              <button
                type="button"
                onClick={() => onToggleCurrency('BDT')}
                className={`px-2 py-0.5 text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                  currency === 'BDT'
                    ? 'bg-[#004CE8] text-white'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                BDT (৳)
              </button>
              <button
                type="button"
                onClick={() => onToggleCurrency('USD')}
                className={`px-2 py-0.5 text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#004CE8] text-white'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Brand & Navigation Strip */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-3 lg:hidden">
          <button
            type="button"
            onClick={onOpenMenu}
            className="p-2 border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Lockup */}
        <div
          onClick={() => onNavigate('home')}
          className="flex flex-col cursor-pointer group text-left"
        >
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[20px] sm:text-[22px] tracking-[-0.03em] text-[var(--color-text-primary)] uppercase">
              BLU EYES
            </span>
            <span className="px-1.5 py-0.5 bg-[#004CE8] text-white text-[10px] font-mono font-semibold tracking-wider uppercase">
              LIFEWEAR
            </span>
          </div>
          <span className="text-[9px] font-mono text-[var(--color-text-secondary)] tracking-widest uppercase">
            SCANDINAVIAN FUNCTIONAL UTILITARIAN // SPEC-04
          </span>
        </div>

        {/* Desktop Demographic Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {categories.map((cat) => {
            const isActive =
              (currentView === cat.id) ||
              (currentView === 'home' && cat.id === 'all') ||
              (selectedCategory === cat.id && currentView !== 'about' && currentView !== 'lookbook' && currentView !== 'home')

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onNavigate(cat.id === 'all' ? 'home' : (cat.id as LifeWearView), cat.id)}
                className={`px-3.5 py-1.5 text-[13px] font-medium transition-colors cursor-pointer border ${
                  isActive
                    ? 'border-[#004CE8] bg-[#004CE8]/5 text-[#004CE8] dark:text-[#387BFF] font-semibold'
                    : 'border-transparent text-[var(--color-text-primary)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface)]'
                }`}
              >
                {cat.label}
              </button>
            )
          })}

          <span className="h-4 w-[1px] bg-[var(--color-border)] mx-2" />

          <button
            type="button"
            onClick={() => onNavigate('lookbook')}
            className={`px-3 py-1.5 text-[13px] font-medium transition-colors cursor-pointer border ${
              currentView === 'lookbook'
                ? 'border-[#004CE8] bg-[#004CE8]/5 text-[#004CE8] dark:text-[#387BFF] font-semibold'
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)]'
            }`}
          >
            Lookbook
          </button>

          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`px-3 py-1.5 text-[13px] font-medium transition-colors cursor-pointer border ${
              currentView === 'about'
                ? 'border-[#004CE8] bg-[#004CE8]/5 text-[#004CE8] dark:text-[#387BFF] font-semibold'
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)]'
            }`}
          >
            About
          </button>
        </nav>

        {/* Utilities: Search, Theme Toggle, Bag */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-2 border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors cursor-pointer flex items-center space-x-1.5"
            title="Search catalog"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline text-[11px] font-mono text-[var(--color-text-secondary)]">
              SEARCH
            </span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={onOpenCart}
            className="px-3 py-2 border border-[#004CE8] bg-[#004CE8] text-white hover:bg-[#0039B4] transition-colors cursor-pointer flex items-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-[12px] font-mono font-bold tracking-wider">
              [{cartCount}]
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
