import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sun, Moon, MapPin, ChevronRight } from 'lucide-react'
import type { GlacierView, Currency } from './types'

interface GlacierMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
  onNavigateView: (view: GlacierView) => void
  activeView: GlacierView
  currency: Currency
  onToggleCurrency: () => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const GlacierMenuDrawer: React.FC<GlacierMenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateView,
  activeView,
  currency,
  onToggleCurrency,
  theme,
  onToggleTheme,
}) => {
  const links: { label: string; view: GlacierView; spec: string }[] = [
    { label: 'WOMEN', view: 'women', spec: 'Cape Gowns & Thermal Crepe' },
    { label: 'MEN', view: 'men', spec: 'Tech-Wool & Silk Loom' },
    { label: 'KIDS', view: 'kids', spec: 'Junior Alpine Armour' },
    { label: 'BABY', view: 'baby', spec: 'Merino Cradle Sets' },
    { label: 'ACCESSORIES', view: 'accessories', spec: 'Titanium & Optical Shields' },
    { label: 'LOOKBOOK', view: 'lookbook', spec: 'Runway Editorial Archive' },
    { label: 'ABOUT MAISON', view: 'about', spec: 'Sub-Zero Lab Narrative' },
  ]

  const handleSelect = (view: GlacierView) => {
    onNavigateView(view)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md"
          />

          {/* Drawer Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="absolute inset-y-0 left-0 max-w-xs w-full bg-[#030712]/95 backdrop-blur-2xl border-r border-sky-400/25 p-6 flex flex-col justify-between text-[#F0F9FF] shadow-2xl"
          >
            {/* Top Logo & Close */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-sky-400/20">
                <div className="flex items-center gap-2">
                  <span className="font-syne font-extrabold text-[18px] text-white">
                    BLU EYES
                  </span>
                  <span className="font-space-mono text-[10px] text-[#7DD3FC] font-bold tracking-widest uppercase">
                    GLACIER
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 space-y-1">
                {links.map((link) => {
                  const isActive = activeView === link.view
                  return (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => handleSelect(link.view)}
                      className={`w-full py-3 px-3 text-left transition-all cursor-pointer flex items-center justify-between border-l-2 ${
                        isActive
                          ? 'border-[#38BDF8] bg-sky-500/15 text-[#7DD3FC] font-bold'
                          : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div>
                        <span className="font-syne text-[15px] font-bold uppercase tracking-wider block">
                          {link.label}
                        </span>
                        <span className="font-space-mono text-[9px] text-slate-400 block mt-0.5">
                          {link.spec}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Bottom Controls (Currency & Theme) */}
            <div className="pt-6 border-t border-sky-400/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-space-mono text-[11px] text-slate-400">CURRENCY:</span>
                <button
                  type="button"
                  onClick={onToggleCurrency}
                  className="px-3 py-1 bg-sky-950 border border-sky-400/40 text-[#7DD3FC] font-space-mono text-[11px] font-bold cursor-pointer"
                >
                  {currency === 'BDT' ? '৳ BDT (Taka)' : '$ USD (Dollar)'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-space-mono text-[11px] text-slate-400">AESTHETIC:</span>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="px-3 py-1 bg-sky-950 border border-sky-400/40 text-[#7DD3FC] font-space-mono text-[11px] font-bold cursor-pointer flex items-center gap-1.5"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{theme === 'dark' ? 'Arctic Abyss' : 'Alpine Frost'}</span>
                </button>
              </div>

              <div className="text-[10px] font-space-mono text-slate-500 pt-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Maison Chattogram • 64 Districts Courier</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
