import React from 'react'
import { Search, ShoppingBag, Sun, Moon, Menu, Heart, Sparkles, UserCheck } from 'lucide-react'
import type { Currency, FamilyDemographic, FamilyView } from './types'

interface FamilyHeaderProps {
  currentView: FamilyView
  selectedDemographic: FamilyDemographic
  onNavigate: (view: FamilyView, demographic?: FamilyDemographic) => void
  currency: Currency
  onToggleCurrency: (c: Currency) => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  cartCount: number
  onOpenCart: () => void
  onOpenSearch: () => void
  onOpenMenu: () => void
}

export const FamilyHeader: React.FC<FamilyHeaderProps> = ({
  currentView,
  selectedDemographic,
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
  const demographicNav: { id: FamilyDemographic; label: string }[] = [
    { id: 'all', label: 'All Family' },
    { id: 'baby', label: 'Baby' },
    { id: 'kids', label: 'Kids' },
    { id: 'mom', label: 'Mom' },
    { id: 'dad', label: 'Dad' },
    { id: 'matching', label: 'Matching Sets' },
  ]

  return (
    <header className="w-full sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] select-none shadow-xs">
      {/* 1. Top Family Announcement Ticker */}
      <div className="w-full bg-[#175CD3] dark:bg-[#10439C] text-white py-1.5 px-3 overflow-hidden text-[11px] font-sans font-medium tracking-wide">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="inline-block w-2 h-2 bg-[#F5A623] rounded-full animate-ping" />
            <span className="font-bold">BLU EYES FAMILY</span>
            <span className="text-white/60">•</span>
            <span>CHATTOGRAM METRO SAME-DAY</span>
            <span className="hidden sm:inline text-white/60">•</span>
            <span className="hidden sm:inline">48H NATIONWIDE TO ALL 64 DISTRICTS</span>
            <span className="hidden md:inline text-white/60">•</span>
            <span className="hidden md:inline">100% NON-TOXIC BABY-SAFE DYES</span>
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-[11px] font-semibold text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>GEC CIRCLE FLAGSHIP HUB</span>
          </div>
        </div>
      </div>

      {/* 2. Secondary Utility Bar: Currency, Loyalty Club & Theme */}
      <div className="w-full bg-[var(--color-surface-soft)] border-b border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] py-1.5 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => onNavigate('hub')}
              className="inline-flex items-center space-x-1.5 text-[var(--color-brand-action)] hover:underline font-semibold cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-[#F76C5E] fill-[#F76C5E]" />
              <span>Family Loyalty Club: 20% Birthday Milestones</span>
            </button>
            <span className="opacity-30 hidden sm:inline">|</span>
            <span className="hidden sm:inline">Chattogram • Dhaka • All 64 Districts</span>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full p-0.5">
              <button
                type="button"
                onClick={() => onToggleCurrency('BDT')}
                className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                  currency === 'BDT'
                    ? 'bg-[#175CD3] text-white shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                BDT (৳)
              </button>
              <button
                type="button"
                onClick={() => onToggleCurrency('USD')}
                className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#175CD3] text-white shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Header Navigation Strip */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 h-18 flex items-center justify-between">
        {/* Mobile Hamburger */}
        <div className="flex items-center space-x-3 lg:hidden">
          <button
            type="button"
            onClick={onOpenMenu}
            className="p-2 border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft)] cursor-pointer"
            aria-label="Open family menu"
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
            <span className="font-extrabold text-[22px] sm:text-[24px] tracking-tight text-[var(--color-text-primary)] font-['Outfit']">
              Blu Eyes
            </span>
            <span className="px-2.5 py-0.5 bg-[#F76C5E] text-white text-[11px] font-bold tracking-wide rounded-full uppercase shadow-xs">
              Family
            </span>
          </div>
          <span className="text-[10px] font-medium text-[var(--color-text-secondary)] tracking-wider">
            WARM MULTI-GENERATIONAL HUB // 05
          </span>
        </div>

        {/* Desktop Demographic Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1.5">
          {demographicNav.map((dem) => {
            const isActive =
              (currentView === 'home' && dem.id === 'all') ||
              (currentView === 'category' && selectedDemographic === dem.id) ||
              (currentView !== 'about' && currentView !== 'hub' && selectedDemographic === dem.id)

            return (
              <button
                key={dem.id}
                type="button"
                onClick={() => onNavigate(dem.id === 'all' ? 'home' : 'category', dem.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#175CD3] text-white shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft)]'
                }`}
              >
                {dem.label}
              </button>
            )
          })}

          <span className="h-4 w-[1px] bg-[var(--color-border)] mx-1.5" />

          <button
            type="button"
            onClick={() => onNavigate('hub')}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
              currentView === 'hub'
                ? 'bg-[#F76C5E] text-white shadow-xs'
                : 'text-[#F76C5E] hover:bg-[#F76C5E]/10'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Family Hub</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'about'
                ? 'bg-[#175CD3] text-white shadow-xs'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft)]'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right Utilities: Search, Theme Toggle, Bag */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-2.5 border border-[var(--color-border)] rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft)] transition-colors cursor-pointer"
            title="Search family catalog"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2.5 border border-[var(--color-border)] rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft)] transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={onOpenCart}
            className="px-4 py-2 bg-[#175CD3] hover:bg-[#144fbb] text-white font-bold text-xs rounded-full transition-all cursor-pointer flex items-center space-x-2 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>[{cartCount}]</span>
          </button>
        </div>
      </div>
    </header>
  )
}
