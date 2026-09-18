import React from 'react'
import type { AtelierView } from './types'
import { Sparkles, Film, SlidersHorizontal, ShoppingBag, Crown } from 'lucide-react'

interface AtelierBottomNavProps {
  activeView: AtelierView
  onSelectView: (view: AtelierView) => void
  onOpenBag: () => void
  bagCount: number
}

export const AtelierBottomNav: React.FC<AtelierBottomNavProps> = ({
  activeView,
  onSelectView,
  onOpenBag,
  bagCount,
}) => {
  const navItems = [
    { id: 'home' as AtelierView, label: 'Atelier', icon: Sparkles },
    { id: 'lookbook' as AtelierView, label: 'Runway', icon: Film },
    { id: 'curate' as AtelierView, label: 'Curate', icon: SlidersHorizontal },
    { id: 'bag' as const, label: 'Bag', icon: ShoppingBag },
    { id: 'vip' as AtelierView, label: 'VIP Hub', icon: Crown },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 w-full bg-[var(--color-header-bg)] backdrop-blur-xl border-t border-[var(--color-border)] pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)] transition-colors duration-200">
      <div className="max-w-md mx-auto h-16 grid grid-cols-5 items-center px-1">
        {navItems.map((item) => {
          const isActive =
            item.id === 'bag'
              ? false
              : item.id === 'curate'
              ? activeView === 'curate' ||
                activeView === 'women' ||
                activeView === 'men' ||
                activeView === 'kids' ||
                activeView === 'baby' ||
                activeView === 'accessories'
              : activeView === item.id
          const Icon = item.icon

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                if (item.id === 'bag') {
                  onOpenBag()
                } else {
                  onSelectView(item.id)
                }
              }}
              aria-label={item.label}
              className={`relative flex flex-col items-center justify-center h-full py-1 transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[var(--color-accent-blue)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2]' : 'stroke-[1.5]'
                  }`}
                />
                {item.id === 'bag' && bagCount > 0 && (
                  <span className="absolute -top-1 -right-2.5 min-w-[14px] h-[14px] px-0.5 bg-[var(--color-accent-blue)] text-white text-[8px] font-sans font-bold rounded-full flex items-center justify-center">
                    {bagCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] uppercase tracking-[0.15em] mt-1 transition-all ${
                  isActive
                    ? 'font-semibold text-[var(--color-accent-blue)]'
                    : 'font-normal text-[var(--color-text-muted)]'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 bg-[var(--color-accent-blue)] rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
