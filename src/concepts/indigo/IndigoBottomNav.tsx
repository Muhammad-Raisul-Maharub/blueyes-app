import React from 'react'
import type { IndigoView, Language } from './types'
import { getTranslation } from './translations'
import { Home, Compass, ShoppingBag, Feather, Info } from 'lucide-react'

interface IndigoBottomNavProps {
  activeView: IndigoView
  onNavigateView: (view: IndigoView) => void
  onOpenBag: () => void
  bagCount: number
  language: Language
}

export const IndigoBottomNav: React.FC<IndigoBottomNavProps> = ({
  activeView,
  onNavigateView,
  onOpenBag,
  bagCount,
  language,
}) => {
  const t = getTranslation(language)

  const items = [
    {
      view: 'home' as IndigoView,
      label: language === 'en' ? 'Maison' : 'হোম',
      icon: Home,
    },
    {
      view: 'lookbook' as IndigoView,
      label: t.nav.lookbook,
      icon: Compass,
    },
    {
      view: 'women' as IndigoView,
      label: language === 'en' ? 'Weaves' : 'তাঁত',
      icon: Feather,
    },
    {
      view: 'about' as IndigoView,
      label: t.nav.about,
      icon: Info,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#FFFFFF]/95 dark:bg-[#1B1917]/95 backdrop-blur-md border-t border-[#E5DDD0] dark:border-[#36312B] px-3 py-2 flex items-center justify-around shadow-md transition-colors">
      {items.map((item) => {
        const isActive = activeView === item.view
        const Icon = item.icon
        return (
          <button
            key={item.view}
            type="button"
            onClick={() => onNavigateView(item.view)}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              isActive
                ? 'text-[#0A4269] dark:text-[#3882B5]'
                : 'text-[#756A63] dark:text-[#A3968C] hover:text-[#0A4269]'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-jakarta text-[10px] font-semibold">{item.label}</span>
          </button>
        )
      })}

      {/* Bag Trigger Button */}
      <button
        type="button"
        onClick={onOpenBag}
        className="flex flex-col items-center gap-1 text-[#756A63] dark:text-[#A3968C] hover:text-[#0A4269] transition-colors cursor-pointer relative"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4" />
          {bagCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#B85324] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {bagCount}
            </span>
          )}
        </div>
        <span className="font-jakarta text-[10px] font-semibold">
          {language === 'en' ? 'Bag' : 'ব্যাগ'}
        </span>
      </button>
    </nav>
  )
}
