import React from 'react'
import { Menu, Search, ShoppingBag, Sun, Moon } from 'lucide-react'
import type { AtelierView } from './types'

interface AtelierHeaderProps {
  activeView?: AtelierView
  onNavigateView: (view: AtelierView) => void
  onOpenMenu: () => void
  onOpenSearch: () => void
  onOpenBag: () => void
  bagCount: number
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const AtelierHeader: React.FC<AtelierHeaderProps> = ({
  activeView,
  onNavigateView,
  onOpenMenu,
  onOpenSearch,
  onOpenBag,
  bagCount,
  theme,
  onToggleTheme,
}) => {
  const navLinks: { label: string; view: AtelierView }[] = [
    { label: 'WOMEN', view: 'women' },
    { label: 'MEN', view: 'men' },
    { label: 'KIDS', view: 'kids' },
    { label: 'BABY', view: 'baby' },
    { label: 'ACCESSORIES', view: 'accessories' },
    { label: 'LOOKBOOK', view: 'lookbook' },
    { label: 'ABOUT', view: 'about' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--color-header-bg)] backdrop-blur-md border-b border-[var(--color-border)] transition-colors duration-200">
      {/* Top Notification Ticker: Maison Chattogram Logistics */}
      <div className="h-7 px-4 bg-[var(--color-card-subtle)] border-b border-[var(--color-border)] flex items-center justify-between transition-colors overflow-hidden">
        <div className="hidden sm:flex items-center gap-2 text-[9px] font-sans uppercase tracking-[0.22em] text-[var(--color-accent-bronze)] font-semibold mx-auto">
          <span>MAISON CHATTOGRAM</span>
          <span className="text-[var(--color-text-muted)]">•</span>
          <span>COMPLIMENTARY EXPRESS DISPATCH ACROSS ALL 64 DISTRICTS</span>
          <span className="text-[var(--color-text-muted)]">•</span>
          <span>GLOBAL WHITE-GLOVE COURIER</span>
        </div>

        <div className="sm:hidden mx-auto text-[8.5px] font-sans uppercase tracking-[0.16em] text-[var(--color-accent-bronze)] font-semibold truncate px-2">
          MAISON CHATTOGRAM • EXPRESS ACROSS 64 DISTRICTS • GLOBAL COURIER
        </div>
      </div>

      {/* Main Responsive Navigation Bar */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Mobile Left: Hamburger */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open Atelier Menu"
            className="w-10 h-10 -ml-2 flex items-center justify-center text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] active:scale-95 transition-all cursor-pointer"
          >
            <Menu className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Brand Wordmark (Left on Desktop, Center on Mobile) */}
        <div
          onClick={() => onNavigateView('home')}
          className="flex flex-col items-center lg:items-start cursor-pointer select-none group"
        >
          <span className="text-[8px] font-sans uppercase tracking-[0.3em] text-[var(--color-accent-bronze)] font-semibold -mb-0.5">
            Maison Chattogram
          </span>
          <h1 className="font-serif text-[18px] sm:text-[20px] lg:text-[22px] tracking-[0.18em] uppercase text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors leading-tight font-medium">
            BLU EYES ATELIER
          </h1>
        </div>

        {/* Desktop Category Navigation: [WOMEN, MEN, KIDS, BABY, ACCESSORIES, LOOKBOOK, ABOUT] */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeView === link.view
            return (
              <button
                key={link.label}
                type="button"
                onClick={() => onNavigateView(link.view)}
                className={`text-[11.5px] font-sans uppercase tracking-[0.18em] transition-colors cursor-pointer py-1 relative group font-medium ${
                  isActive
                    ? 'text-[var(--color-accent-blue)] font-bold'
                    : 'text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)]'
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[var(--color-accent-blue)] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            )
          })}
        </nav>

        {/* Right Actions: Theme Toggle + Search + Bag */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Dual Light/Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-10 h-10 flex items-center justify-center text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] hover:bg-[var(--color-card-subtle)] rounded-full transition-all active:scale-95 cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-[#FDDDB9] stroke-[1.75]" />
            ) : (
              <Moon className="w-5 h-5 text-[#1C1B1B] stroke-[1.75]" />
            )}
          </button>

          {/* Search / Curate Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search Archive"
            className="w-10 h-10 flex items-center justify-center text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] hover:bg-[var(--color-card-subtle)] rounded-full transition-all active:scale-95 cursor-pointer"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Bag Button with Counter */}
          <button
            type="button"
            onClick={onOpenBag}
            aria-label="View Shopping Bag"
            className="w-10 h-10 flex items-center justify-center text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] hover:bg-[var(--color-card-subtle)] rounded-full transition-all relative active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {bagCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-[16px] px-1 bg-[var(--color-accent-blue)] text-white text-[9px] font-sans font-bold rounded-full flex items-center justify-center leading-none">
                {bagCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
