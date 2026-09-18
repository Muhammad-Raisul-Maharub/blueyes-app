import React from 'react'
import { Home, Grid, Heart, Info, ShoppingBag } from 'lucide-react'
import type { FamilyView } from './types'

interface FamilyBottomNavProps {
  currentView: FamilyView
  onNavigate: (view: FamilyView) => void
  cartCount: number
  onOpenCart: () => void
}

export const FamilyBottomNav: React.FC<FamilyBottomNavProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const navItems: { id: FamilyView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'category', label: 'Catalog', icon: <Grid className="w-4 h-4" /> },
    { id: 'hub', label: 'Family Hub', icon: <Heart className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ]

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[var(--color-surface)]/95 backdrop-blur-md border-t border-[var(--color-border)] lg:hidden flex items-center justify-around h-15 select-none shadow-md">
      {navItems.map((item) => {
        const isActive = currentView === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full text-[10px] font-bold transition-all cursor-pointer ${
              isActive
                ? 'text-[#175CD3] dark:text-[#4E8DFF]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {item.icon}
            <span className="mt-1 font-['Outfit']">{item.label}</span>
          </button>
        )
      })}

      {/* Bag Trigger */}
      <button
        type="button"
        onClick={onOpenCart}
        className="flex flex-col items-center justify-center flex-1 h-full text-[10px] font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer relative"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#F76C5E] text-white text-[9px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="mt-1 font-['Outfit']">Bag</span>
      </button>
    </nav>
  )
}
