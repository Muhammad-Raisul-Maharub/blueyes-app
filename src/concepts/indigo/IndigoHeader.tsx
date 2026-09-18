import React from 'react'
import type { IndigoView, Language } from './types'
import { getTranslation } from './translations'
import { Search, ShoppingBag, Sun, Moon, Menu } from 'lucide-react'

interface IndigoHeaderProps {
  activeView: IndigoView
  onNavigateView: (view: IndigoView) => void
  onOpenSearch: () => void
  onOpenBag: () => void
  onOpenMenu: () => void
  bagCount: number
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  language: Language
  onToggleLanguage: () => void
}

export const IndigoHeader: React.FC<IndigoHeaderProps> = ({
  activeView,
  onNavigateView,
  onOpenSearch,
  onOpenBag,
  onOpenMenu,
  bagCount,
  theme,
  onToggleTheme,
  language,
  onToggleLanguage,
}) => {
  const t = getTranslation(language)

  const navItems: { view: IndigoView; label: string }[] = [
    { view: 'women', label: t.nav.women },
    { view: 'men', label: t.nav.men },
    { view: 'kids', label: t.nav.kids },
    { view: 'baby', label: t.nav.baby },
    { view: 'accessories', label: t.nav.accessories },
    { view: 'lookbook', label: t.nav.lookbook },
    { view: 'about', label: t.nav.about },
  ]

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200 border-b border-[#E5DDD0] dark:border-[#36312B] bg-[#F9F6F0]/95 dark:bg-[#121110]/95 backdrop-blur-md">
      {/* 1. Top Ticker Marquee */}
      <div className="w-full overflow-hidden bg-[#0A4269] dark:bg-[#1B1917] text-[#F9F6F0] dark:text-[#3882B5] py-1 border-b border-black/10 dark:border-[#36312B] font-jakarta text-[11px] sm:text-[12px] font-medium tracking-wider uppercase select-none">
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
          <span>{t.ticker}</span>
          <span className="text-[#B85324] dark:text-[#D96F3D]">✦</span>
          <span>{language === 'en' ? 'TANGAL JAMDANI • RAJSHAHI SILK • CUMILLA KHADI' : 'টাঙ্গাইল জামদানি • রাজশাহী সিল্ক • কুমিল্লা খাদি'}</span>
          <span className="text-[#B85324] dark:text-[#D96F3D]">✦</span>
          <span>{t.ticker}</span>
          <span className="text-[#B85324] dark:text-[#D96F3D]">✦</span>
          <span>{language === 'en' ? 'TANGAL JAMDANI • RAJSHAHI SILK • CUMILLA KHADI' : 'টাঙ্গাইল জামদানি • রাজশাহী সিল্ক • কুমিল্লা খাদি'}</span>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Mobile Left: Menu Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            className="p-2 text-[#26201C] dark:text-[#F5EFE8] hover:text-[#0A4269] dark:hover:text-[#3882B5] transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Wordmark & Emblem */}
        <button
          type="button"
          onClick={() => onNavigateView('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          {/* Artisanal Indigo Loom Emblem */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0A4269] dark:bg-[#3882B5] text-[#F9F6F0] flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-current"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v18" />
              <path d="M3 12h18" />
              <circle cx="12" cy="12" r="3" fill="#B85324" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-cinzel font-bold text-[17px] sm:text-[22px] tracking-[0.12em] text-[#0A4269] dark:text-[#F5EFE8] uppercase leading-none">
              {t.brandName}
            </span>
            <span className="font-jakarta text-[9px] sm:text-[10px] tracking-[0.25em] text-[#B85324] dark:text-[#D96F3D] uppercase font-semibold mt-1">
              {language === 'en' ? 'Maison Chattogram • Est. 2026' : 'মেসন চট্টগ্রাম • প্রতিষ্ঠিত ২০২৬'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const isActive = activeView === item.view
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => onNavigateView(item.view)}
                className={`font-jakarta text-[13px] tracking-wide transition-all cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-[#0A4269] dark:text-[#3882B5] font-bold'
                    : 'text-[#26201C] dark:text-[#F5EFE8] hover:text-[#0A4269] dark:hover:text-[#3882B5] font-medium'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0A4269] dark:bg-[#3882B5] rounded-full" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Utility Controls: Language Switcher, Theme Switcher, Search, Bag */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Functional [EN | বাংলা] Language Switcher */}
          <button
            type="button"
            onClick={onToggleLanguage}
            title={language === 'en' ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch to English'}
            className="flex items-center bg-[#F3ECE2] dark:bg-[#25221F] border border-[#E5DDD0] dark:border-[#36312B] rounded-full px-2.5 py-1 text-[11px] font-jakarta font-semibold tracking-wider text-[#26201C] dark:text-[#F5EFE8] hover:border-[#0A4269] dark:hover:border-[#3882B5] transition-all cursor-pointer shadow-xs"
          >
            <span className={language === 'en' ? 'text-[#0A4269] dark:text-[#3882B5] font-bold' : 'opacity-60'}>
              EN
            </span>
            <span className="mx-1 text-[#756A63] dark:text-[#A3968C] opacity-50">|</span>
            <span className={language === 'bn' ? 'text-[#0A4269] dark:text-[#3882B5] font-bold' : 'opacity-60'}>
              বাংলা
            </span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 text-[#26201C] dark:text-[#F5EFE8] hover:text-[#0A4269] dark:hover:text-[#3882B5] hover:bg-[#F3ECE2] dark:hover:bg-[#25221F] rounded-full transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#D96F3D]" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search Collection"
            className="p-2 text-[#26201C] dark:text-[#F5EFE8] hover:text-[#0A4269] dark:hover:text-[#3882B5] hover:bg-[#F3ECE2] dark:hover:bg-[#25221F] rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bag Trigger */}
          <button
            type="button"
            onClick={onOpenBag}
            aria-label="Shopping Bag"
            className="flex items-center gap-2 px-3 py-1.5 bg-[#0A4269] dark:bg-[#3882B5] text-white rounded-full hover:bg-[#083554] dark:hover:bg-[#2E709F] transition-all cursor-pointer shadow-sm text-[12px] font-jakarta font-semibold tracking-wide"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{t.nav.accessories === 'অ্যাক্সেসরিজ' ? 'ব্যাগ' : 'Bag'}</span>
            <span className="bg-[#B85324] dark:bg-[#D96F3D] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {bagCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
