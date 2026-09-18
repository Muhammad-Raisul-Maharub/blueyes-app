import React from 'react'
import type { DistrictView } from './types'
import { Home, Layers, Flame, ShoppingBag, Info } from 'lucide-react'

interface DistrictBottomNavProps {
  activeView: DistrictView
  onNavigateView: (view: DistrictView) => void
  onOpenBag: () => void
  bagCount: number
}

export const DistrictBottomNav: React.FC<DistrictBottomNavProps> = ({
  activeView,
  onNavigateView,
  onOpenBag,
  bagCount,
}) => {
  const isCategoryActive = [
    'women',
    'men',
    'kids',
    'baby',
    'accessories',
  ].includes(activeView)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 dark:bg-[#090A0E]/95 backdrop-blur-md border-t border-[#E2E8F0] dark:border-[#2C3142] px-2 py-1.5 flex items-center justify-around shadow-[0px_-4px_10px_rgba(0,0,0,0.1)] dark:shadow-[0px_-4px_10px_rgba(0,0,0,0.5)] transition-colors">
      {/* 1. Home */}
      <button
        type="button"
        onClick={() => onNavigateView('home')}
        className={`flex flex-col items-center justify-center py-1 px-3 transition-colors cursor-pointer ${
          activeView === 'home'
            ? 'text-[#0047FF] dark:text-[#CCFF00]'
            : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#090A0E] dark:hover:text-white'
        }`}
      >
        <Home className="w-5 h-5 stroke-[2]" />
        <span className="font-mono-tech text-[9px] font-bold uppercase tracking-wider mt-1">
          HOME
        </span>
      </button>

      {/* 2. Drops / Categories */}
      <button
        type="button"
        onClick={() => onNavigateView('men')}
        className={`flex flex-col items-center justify-center py-1 px-3 transition-colors cursor-pointer ${
          isCategoryActive
            ? 'text-[#0047FF] dark:text-[#CCFF00]'
            : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#090A0E] dark:hover:text-white'
        }`}
      >
        <Layers className="w-5 h-5 stroke-[2]" />
        <span className="font-mono-tech text-[9px] font-bold uppercase tracking-wider mt-1">
          DROPS
        </span>
      </button>

      {/* 3. Runway / Lookbook */}
      <button
        type="button"
        onClick={() => onNavigateView('lookbook')}
        className={`flex flex-col items-center justify-center py-1 px-3 transition-colors cursor-pointer ${
          activeView === 'lookbook'
            ? 'text-[#0047FF] dark:text-[#CCFF00]'
            : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#090A0E] dark:hover:text-white'
        }`}
      >
        <Flame className="w-5 h-5 stroke-[2]" />
        <span className="font-mono-tech text-[9px] font-bold uppercase tracking-wider mt-1">
          LOOKBOOK
        </span>
      </button>

      {/* 4. Bag */}
      <button
        type="button"
        onClick={onOpenBag}
        className="flex flex-col items-center justify-center py-1 px-3 text-[#64748B] dark:text-[#94A3B8] hover:text-[#090A0E] dark:hover:text-white transition-colors cursor-pointer relative"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 stroke-[2]" />
          {bagCount > 0 && (
            <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-[#CCFF00] text-[#090A0E] text-[9px] font-extrabold font-mono-tech leading-none">
              {bagCount}
            </span>
          )}
        </div>
        <span className="font-mono-tech text-[9px] font-bold uppercase tracking-wider mt-1">
          BAG
        </span>
      </button>

      {/* 5. About */}
      <button
        type="button"
        onClick={() => onNavigateView('about')}
        className={`flex flex-col items-center justify-center py-1 px-3 transition-colors cursor-pointer ${
          activeView === 'about'
            ? 'text-[#0047FF] dark:text-[#CCFF00]'
            : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#090A0E] dark:hover:text-white'
        }`}
      >
        <Info className="w-5 h-5 stroke-[2]" />
        <span className="font-mono-tech text-[9px] font-bold uppercase tracking-wider mt-1">
          ABOUT
        </span>
      </button>
    </nav>
  )
}
