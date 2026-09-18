import React from 'react'
import type { IndigoView, IndigoCategory, Language } from './types'
import { getTranslation } from './translations'
import { X, Sun, Moon, ArrowRight } from 'lucide-react'

interface IndigoMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
  onNavigateView: (view: IndigoView) => void
  onSelectCategory: (category: IndigoCategory) => void
  activeView: IndigoView
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  language: Language
  onToggleLanguage: () => void
}

export const IndigoMenuDrawer: React.FC<IndigoMenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateView,
  onSelectCategory,
  activeView,
  theme,
  onToggleTheme,
  language,
  onToggleLanguage,
}) => {
  const t = getTranslation(language)

  if (!isOpen) return null

  const categories: IndigoCategory[] = ['Women', 'Men', 'Kids', 'Baby', 'Accessories']

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-[320px] h-full bg-[#FFFFFF] dark:bg-[#1B1917] text-[#26201C] dark:text-[#F5EFE8] border-r border-[#E5DDD0] dark:border-[#36312B] flex flex-col justify-between shadow-2xl animate-slideInLeft transition-colors">
        {/* Header */}
        <div>
          <div className="p-5 border-b border-[#E5DDD0] dark:border-[#36312B] flex items-center justify-between bg-[#F9F6F0] dark:bg-[#121110]">
            <div>
              <span className="font-cinzel font-bold text-[16px] text-[#0A4269] dark:text-[#3882B5] uppercase block">
                {t.brandName}
              </span>
              <span className="font-jakarta text-[9px] text-[#B85324] dark:text-[#D96F3D] font-bold uppercase tracking-widest">
                {language === 'en' ? 'Maison Chattogram' : 'মেসন চট্টগ্রাম'}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#756A63] hover:text-[#0A4269] rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-5 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-jakarta font-bold uppercase tracking-widest text-[#B85324] dark:text-[#D96F3D] pl-2 block">
                {language === 'en' ? 'Collections' : 'পোশাক সম্ভার'}
              </span>
              {categories.map((cat) => {
                const isCatActive = activeView === cat.toLowerCase()
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat)
                      onClose()
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl font-jakarta text-[14px] font-medium text-left transition-colors cursor-pointer ${
                      isCatActive
                        ? 'bg-[#F3ECE2] dark:bg-[#25221F] text-[#0A4269] dark:text-[#3882B5] font-bold'
                        : 'hover:bg-[#F3ECE2] dark:hover:bg-[#25221F] hover:text-[#0A4269]'
                    }`}
                  >
                    <span>{t.nav[cat.toLowerCase() as keyof typeof t.nav] || cat}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#756A63]" />
                  </button>
                )
              })}
            </div>

            <div className="pt-2 border-t border-[#E5DDD0] dark:border-[#36312B] space-y-1">
              <button
                type="button"
                onClick={() => {
                  onNavigateView('lookbook')
                  onClose()
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl font-jakarta text-[14px] font-medium text-left transition-colors cursor-pointer ${
                  activeView === 'lookbook'
                    ? 'bg-[#F3ECE2] dark:bg-[#25221F] text-[#0A4269] dark:text-[#3882B5] font-bold'
                    : 'hover:bg-[#F3ECE2] dark:hover:bg-[#25221F] hover:text-[#0A4269]'
                }`}
              >
                <span>{t.nav.lookbook}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#756A63]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigateView('about')
                  onClose()
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl font-jakarta text-[14px] font-medium text-left transition-colors cursor-pointer ${
                  activeView === 'about'
                    ? 'bg-[#F3ECE2] dark:bg-[#25221F] text-[#0A4269] dark:text-[#3882B5] font-bold'
                    : 'hover:bg-[#F3ECE2] dark:hover:bg-[#25221F] hover:text-[#0A4269]'
                }`}
              >
                <span>{t.nav.about}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#756A63]" />
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer with Language & Theme Switches */}
        <div className="p-5 border-t border-[#E5DDD0] dark:border-[#36312B] bg-[#F9F6F0] dark:bg-[#121110] space-y-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-full text-[12px] font-jakarta font-bold text-[#0A4269] dark:text-[#3882B5] cursor-pointer"
            >
              <span>{language === 'en' ? 'বাংলা সংস্করণ' : 'English Edition'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-full text-[#26201C] dark:text-[#F5EFE8] cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#D96F3D]" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <p className="text-[10px] font-jakarta text-[#756A63] dark:text-[#A3968C] text-center">
            GEC Circle, Chattogram • Flagship Salon
          </p>
        </div>
      </div>
    </div>
  )
}
