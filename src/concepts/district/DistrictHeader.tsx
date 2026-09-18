import React from 'react'
import { Search, ShoppingBag, Sun, Moon, Menu } from 'lucide-react'
import type { DistrictView } from './types'

interface DistrictHeaderProps {
  activeView: DistrictView
  onNavigateView: (view: DistrictView) => void
  onOpenSearch: () => void
  onOpenBag: () => void
  onOpenMenu: () => void
  bagCount: number
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const DistrictHeader: React.FC<DistrictHeaderProps> = ({
  activeView,
  onNavigateView,
  onOpenSearch,
  onOpenBag,
  onOpenMenu,
  bagCount,
  theme,
  onToggleTheme,
}) => {
  const navLinks: { label: string; view: DistrictView }[] = [
    { label: 'WOMEN', view: 'women' },
    { label: 'MEN', view: 'men' },
    { label: 'KIDS', view: 'kids' },
    { label: 'BABY', view: 'baby' },
    { label: 'ACCESSORIES', view: 'accessories' },
    { label: 'LOOKBOOK', view: 'lookbook' },
    { label: 'ABOUT', view: 'about' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200 border-b border-[#E2E8F0] dark:border-[#2C3142] bg-[#F4F4F6]/95 dark:bg-[#090A0E]/95 backdrop-blur-md">
      {/* 1. Continuous Animated Marquee Ticker */}
      <div className="w-full overflow-hidden bg-[#090A0E] dark:bg-[#CCFF00] text-[#CCFF00] dark:text-[#090A0E] py-1 border-b border-black/10 dark:border-black/20 font-mono-tech text-[10px] sm:text-[11px] font-bold tracking-widest uppercase select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="mx-4 flex items-center gap-2">
            <span>DISTRICT CHATTOGRAM</span>
            <span>//</span>
            <span>PORT CITY STREETWEAR PROTOCOL</span>
            <span>//</span>
            <span>COMPLIMENTARY EXPRESS DISPATCH ACROSS ALL 64 DISTRICTS</span>
            <span>//</span>
            <span>DHL GLOBAL COURIER 3–5 DAYS</span>
            <span>//</span>
            <span>480 GSM HEAVYWEIGHT ARCHIVE DROP 02</span>
            <span>//</span>
            <span>SPRING/SUMMER STREETWEAR ACTIVE // WORLDWIDE DISPATCH</span>
            <span>//</span>
          </span>
          {/* Repeating copy for seamless loop */}
          <span className="mx-4 flex items-center gap-2" aria-hidden="true">
            <span>DISTRICT CHATTOGRAM</span>
            <span>//</span>
            <span>PORT CITY STREETWEAR PROTOCOL</span>
            <span>//</span>
            <span>COMPLIMENTARY EXPRESS DISPATCH ACROSS ALL 64 DISTRICTS</span>
            <span>//</span>
            <span>DHL GLOBAL COURIER 3–5 DAYS</span>
            <span>//</span>
            <span>480 GSM HEAVYWEIGHT ARCHIVE DROP 02</span>
            <span>//</span>
            <span>SPRING/SUMMER STREETWEAR ACTIVE // WORLDWIDE DISPATCH</span>
            <span>//</span>
          </span>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Mobile Left: Menu Hamburger */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open Streetwear Menu"
            className="w-10 h-10 -ml-2 flex items-center justify-center text-[#080808] dark:text-white hover:text-[#CCFF00] active:scale-95 transition-all cursor-pointer"
          >
            <Menu className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Minimalist Neon Eye Logo & Wordmark */}
        <div
          onClick={() => onNavigateView('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          {/* Exact Stitch Neon Eye SVG Logo */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 relative flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <rect width="120" height="120" fill="#090A0E" />
              <rect
                x="2"
                y="2"
                width="116"
                height="116"
                stroke="#0047FF"
                strokeWidth="4"
                strokeDasharray="8 6"
              />
              <path
                d="M15 60 C 35 25, 85 25, 105 60 C 85 95, 35 95, 15 60 Z"
                stroke="#CCFF00"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#12141C"
              />
              <circle cx="60" cy="60" r="22" fill="#0047FF" />
              <circle cx="60" cy="60" r="10" fill="#090A0E" />
              <circle cx="67" cy="53" r="4" fill="#CCFF00" />
              <line
                x1="60"
                y1="10"
                x2="60"
                y2="24"
                stroke="#CCFF00"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <line
                x1="60"
                y1="96"
                x2="60"
                y2="110"
                stroke="#0047FF"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono-tech font-bold uppercase tracking-[0.2em] text-[#0047FF] dark:text-[#CCFF00]">
                CHATTOGRAM
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-ping" />
            </div>
            <h1 className="font-syne font-extrabold text-[17px] sm:text-[20px] tracking-tight uppercase text-[#080808] dark:text-white group-hover:text-[#CCFF00] transition-colors leading-none">
              BLU EYES <span className="text-[#0047FF]">DISTRICT</span>
            </h1>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeView === link.view
            return (
              <button
                key={link.label}
                type="button"
                onClick={() => onNavigateView(link.view)}
                className={`text-[12px] font-space font-bold uppercase tracking-[0.14em] transition-all cursor-pointer py-1 relative group ${
                  isActive
                    ? 'text-[#0047FF] dark:text-[#CCFF00]'
                    : 'text-[#080808]/80 dark:text-white/80 hover:text-[#0047FF] dark:hover:text-[#CCFF00]'
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#0047FF] dark:bg-[#CCFF00] transition-all duration-200 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            )
          })}
        </nav>

        {/* Right Actions: Theme Toggle, Search, Cart Bag */}
        <div className="flex items-center gap-2">
          {/* Dual Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-10 h-10 flex items-center justify-center text-[#080808] dark:text-white hover:text-[#CCFF00] hover:bg-[#ECEEF2] dark:hover:bg-[#1B1E2B] transition-all active:scale-95 cursor-pointer border border-transparent hover:border-[#CBD5E1] dark:hover:border-[#2C3142]"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#CCFF00] stroke-[2]" />
            ) : (
              <Moon className="w-4 h-4 text-[#080808] stroke-[2]" />
            )}
          </button>

          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search District Catalog"
            className="w-10 h-10 flex items-center justify-center text-[#080808] dark:text-white hover:text-[#0047FF] dark:hover:text-[#CCFF00] hover:bg-[#ECEEF2] dark:hover:bg-[#1B1E2B] transition-all active:scale-95 cursor-pointer border border-transparent hover:border-[#CBD5E1] dark:hover:border-[#2C3142]"
          >
            <Search className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Shopping Bag Button with Badge */}
          <button
            type="button"
            onClick={onOpenBag}
            aria-label="View Streetwear Bag"
            className="relative h-10 px-3.5 bg-[#0047FF] text-white hover:bg-[#2A66FF] active:scale-95 transition-all flex items-center gap-2 cursor-pointer font-mono-tech text-[12px] font-bold tracking-wider shadow-[2px_2px_0px_0px_#CCFF00]"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
            <span className="hidden sm:inline">BAG</span>
            {bagCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#CCFF00] text-[#090A0E] text-[10px] font-bold font-mono-tech">
                {bagCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
