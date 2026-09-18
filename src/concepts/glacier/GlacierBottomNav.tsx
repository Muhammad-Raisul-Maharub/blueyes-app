import React from 'react'
import { Home, Compass, Sparkles, ShoppingBag } from 'lucide-react'
import type { GlacierView } from './types'

interface GlacierBottomNavProps {
  activeView: GlacierView
  onNavigateView: (view: GlacierView) => void
  onOpenBag: () => void
  bagCount: number
}

export const GlacierBottomNav: React.FC<GlacierBottomNavProps> = ({
  activeView,
  onNavigateView,
  onOpenBag,
  bagCount,
}) => {
  const isCategoryView = ['women', 'men', 'kids', 'baby', 'accessories'].includes(activeView)

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#030712]/92 backdrop-blur-xl border-t border-sky-400/25 px-4 py-2 flex items-center justify-around shadow-[0_-8px_24px_rgba(0,0,0,0.6)]">
      {/* 1. Home */}
      <button
        type="button"
        onClick={() => onNavigateView('home')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
          activeView === 'home' ? 'text-[#38BDF8]' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Home className="w-4.5 h-4.5" />
        <span className="font-space text-[9px] uppercase tracking-wider font-bold">Home</span>
      </button>

      {/* 2. Catalog / Archive */}
      <button
        type="button"
        onClick={() => onNavigateView('women')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
          isCategoryView ? 'text-[#38BDF8]' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Compass className="w-4.5 h-4.5" />
        <span className="font-space text-[9px] uppercase tracking-wider font-bold">Archive</span>
      </button>

      {/* 3. Lookbook */}
      <button
        type="button"
        onClick={() => onNavigateView('lookbook')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
          activeView === 'lookbook' ? 'text-[#38BDF8]' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Sparkles className="w-4.5 h-4.5" />
        <span className="font-space text-[9px] uppercase tracking-wider font-bold">Lookbook</span>
      </button>

      {/* 4. Bag */}
      <button
        type="button"
        onClick={onOpenBag}
        className="flex flex-col items-center gap-1 cursor-pointer text-slate-400 hover:text-[#38BDF8] relative transition-colors"
      >
        <ShoppingBag className="w-4.5 h-4.5" />
        {bagCount > 0 && (
          <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#38BDF8] text-[#030712] font-space-mono text-[9px] font-extrabold flex items-center justify-center">
            {bagCount}
          </span>
        )}
        <span className="font-space text-[9px] uppercase tracking-wider font-bold">Bag</span>
      </button>
    </div>
  )
}
