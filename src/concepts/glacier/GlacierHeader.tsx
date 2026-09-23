import React from 'react'
import { Search, ShoppingBag, Sun, Moon, Menu } from 'lucide-react'
import type { GlacierView, Currency } from './types'

interface GlacierHeaderProps {
  activeView: GlacierView
  onNavigateView: (view: GlacierView) => void
  onOpenSearch: () => void
  onOpenBag: () => void
  onOpenMenu: () => void
  bagCount: number
  currency: Currency
  onToggleCurrency: () => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const GlacierHeader: React.FC<GlacierHeaderProps> = ({
  activeView,
  onNavigateView,
  onOpenSearch,
  onOpenBag,
  onOpenMenu,
  bagCount,
  currency,
  onToggleCurrency,
  theme,
  onToggleTheme,
}) => {
  const navLinks: { label: string; view: GlacierView }[] = [
    { label: 'WOMEN', view: 'women' },
    { label: 'MEN', view: 'men' },
    { label: 'KIDS', view: 'kids' },
    { label: 'BABY', view: 'baby' },
    { label: 'ACCESSORIES', view: 'accessories' },
    { label: 'LOOKBOOK', view: 'lookbook' },
    { label: 'ABOUT', view: 'about' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-300">
      {/* 1. Sub-Zero Top Announcement Ticker */}
      <div className="w-full bg-[#020617] dark:bg-[#020617] border-b border-sky-400/20 text-[#7DD3FC] px-3 py-1.5 text-[10px] sm:text-[11px] font-space-mono tracking-widest uppercase overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse shadow-[0_0_8px_#38BDF8]" />
            <div className="animate-marquee flex items-center gap-8">
              <span>BLU EYES GLACIER • ARCHITECTURAL COUTURE DISPATCHED TO ALL 64 DISTRICTS & WORLDWIDE • HYDRO-POWERED FIBERS</span>
              <span className="text-sky-400/50">•</span>
              <span>MAISON CHATTOGRAM LABS • CRYOGENIC SUB-ZERO TEXTILES • NET-0 CERTIFIED</span>
              <span className="text-sky-400/50">•</span>
              <span>BLU EYES GLACIER • ARCHITECTURAL COUTURE DISPATCHED TO ALL 64 DISTRICTS & WORLDWIDE • HYDRO-POWERED FIBERS</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0 pl-4 border-l border-sky-400/20">
            <span className="text-[10px] text-slate-400">CHATTOGRAM 24H • NATIONWIDE 48H</span>
            <button
              type="button"
              onClick={onToggleCurrency}
              className="text-[10px] font-bold text-[#7DD3FC] hover:text-white transition-colors cursor-pointer bg-sky-950/60 px-2 py-0.5 border border-sky-400/30"
            >
              {currency === 'BDT' ? '৳ BDT' : '$ USD'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Frosted Glass Luxury Navigation Bar */}
      <nav className="w-full bg-white/90 dark:bg-[#030712]/75 backdrop-blur-xl border-b border-sky-200 dark:border-sky-400/20 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 h-18 flex items-center justify-between gap-4">
          {/* Left: Mobile Menu & Luminescent Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onOpenMenu}
              className="lg:hidden p-2 text-slate-700 dark:text-sky-300 hover:text-sky-500 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Luminescent Eye Logo */}
            <button
              type="button"
              onClick={() => onNavigateView('home')}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              {/* Geometric Ice-Cyan Iris SVG */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-sm group-hover:bg-sky-400/40 transition-all duration-300" />
                <svg
                  viewBox="0 0 32 32"
                  className="w-8 h-8 text-[#0284C7] dark:text-[#7DD3FC] transition-transform duration-300 group-hover:scale-105"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  {/* Outer Diamond Eye Shape */}
                  <path
                    d="M2 16C6 8 26 8 30 16C26 24 6 24 2 16Z"
                    className="stroke-current opacity-80"
                  />
                  {/* Central Concentric Crystal Iris */}
                  <circle cx="16" cy="16" r="5" className="fill-current/20 stroke-current" />
                  <circle cx="16" cy="16" r="2" className="fill-current" />
                  {/* Micro Ice Sparks */}
                  <line x1="16" y1="5" x2="16" y2="8" strokeLinecap="round" />
                  <line x1="16" y1="24" x2="16" y2="27" strokeLinecap="round" />
                  <line x1="5" y1="16" x2="8" y2="16" strokeLinecap="round" />
                  <line x1="24" y1="16" x2="27" y2="16" strokeLinecap="round" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-syne font-extrabold text-[17px] sm:text-[19px] tracking-[-0.03em] text-[#082F49] dark:text-[#F0F9FF] flex items-center gap-1 leading-none">
                  BLU EYES
                </span>
                <span className="font-space-mono text-[9px] font-bold tracking-[0.25em] text-[#0284C7] dark:text-[#7DD3FC] uppercase leading-tight">
                  GLACIER
                </span>
              </div>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((item) => {
              const isActive = activeView === item.view
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onNavigateView(item.view)}
                  className={`relative py-2 font-space text-[12px] xl:text-[13px] font-bold tracking-[0.14em] transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#0284C7] dark:text-[#7DD3FC] glacier-glow-text font-extrabold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#7DD3FC]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0284C7] dark:via-[#7DD3FC] to-transparent shadow-[0_0_8px_#38BDF8]" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right: Actions (Currency, Search, Theme, Bag) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Currency Toggle */}
            <button
              type="button"
              onClick={onToggleCurrency}
              className="md:hidden text-[10px] font-space-mono font-bold px-2 py-1 bg-sky-100 dark:bg-sky-950/60 text-[#0284C7] dark:text-[#7DD3FC] border border-sky-300 dark:border-sky-400/30"
              aria-label="Toggle currency"
            >
              {currency}
            </button>

            {/* Quick Search */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:text-[#0284C7] dark:hover:text-[#7DD3FC] hover:bg-sky-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
              aria-label="Search catalog"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:text-[#0284C7] dark:hover:text-[#7DD3FC] hover:bg-sky-50 dark:hover:bg-slate-800/60 transition-transform duration-300 hover:rotate-45 cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-[#7DD3FC]" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-[#0284C7]" />
              )}
            </button>

            {/* Shopping Bag Button with Active Count */}
            <button
              type="button"
              onClick={onOpenBag}
              className="relative p-2.5 bg-[#0284C7] dark:bg-[#38BDF8] text-white dark:text-[#030712] rounded-none hover:bg-sky-600 dark:hover:bg-[#7DD3FC] transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.3)] font-space-mono font-bold text-[11px]"
              aria-label="View acquisition bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">ACQUISITIONS</span>
              <span className="ml-1 w-5 h-5 rounded-full bg-white dark:bg-[#030712] text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center text-[10px] font-extrabold border border-current">
                {bagCount}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
