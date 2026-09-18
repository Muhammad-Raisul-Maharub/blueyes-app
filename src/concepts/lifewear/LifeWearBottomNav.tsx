import React from 'react'
import { Home, Grid, BookOpen, Info, ShoppingBag } from 'lucide-react'
import type { LifeWearView } from './types'

interface LifeWearBottomNavProps {
  currentView: LifeWearView
  onNavigate: (view: LifeWearView) => void
  cartCount: number
  onOpenCart: () => void
}

export const LifeWearBottomNav: React.FC<LifeWearBottomNavProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const navItems: { id: LifeWearView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'women', label: 'Catalog', icon: <Grid className="w-4 h-4" /> },
    { id: 'lookbook', label: 'Lookbook', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ]

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[var(--color-canvas)]/95 backdrop-blur-md border-t border-[var(--color-border)] lg:hidden flex items-center justify-around h-14 select-none">
      {navItems.map((item) => {
        const isActive = currentView === item.id || (item.id === 'women' && ['men', 'kids', 'baby', 'accessories', 'pdp'].includes(currentView))
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full font-mono text-[10px] transition-colors cursor-pointer ${
              isActive
                ? 'text-[#004CE8] dark:text-[#387BFF] font-bold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {item.icon}
            <span className="mt-1 uppercase tracking-wider">{item.label}</span>
          </button>
        )
      })}

      {/* Bag Trigger in Bottom Nav */}
      <button
        type="button"
        onClick={onOpenCart}
        className="flex flex-col items-center justify-center flex-1 h-full font-mono text-[10px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer relative"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#004CE8] text-white text-[8px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="mt-1 uppercase tracking-wider">Bag</span>
      </button>
    </nav>
  )
}
