import React from 'react'
import type { DistrictView } from './types'
import {
  X,
  MapPin,
  Truck,
  Globe,
  Sun,
  Moon,
  ArrowRight,
} from 'lucide-react'

interface DistrictMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
  onNavigateView: (view: DistrictView) => void
  activeView: DistrictView
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const DistrictMenuDrawer: React.FC<DistrictMenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateView,
  activeView,
  theme,
  onToggleTheme,
}) => {
  if (!isOpen) return null

  const navItems: { label: string; view: DistrictView; sub: string }[] = [
    { label: 'HOME', view: 'home', sub: 'Archive 02 Drop Live' },
    { label: 'WOMEN', view: 'women', sub: 'Tech-Fleece, Denim, Tanks' },
    { label: 'MEN', view: 'men', sub: '480 GSM Heavyweight, Tactical Cargo' },
    { label: 'KIDS (2–15Y)', view: 'kids', sub: 'Boxy Skate Sets, Mini-Me' },
    { label: 'BABY (0–2Y)', view: 'baby', sub: 'Organic Rompers & Bodysuits' },
    { label: 'ACCESSORIES', view: 'accessories', sub: 'Cordura Bags, Hats, Chains' },
    { label: 'LOOKBOOK', view: 'lookbook', sub: 'Port City Runway Editorial' },
    { label: 'ABOUT DISTRICT', view: 'about', sub: 'Chattogram Underground Origin' },
  ]

  const handleSelect = (view: DistrictView) => {
    onNavigateView(view)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 left-0 max-w-[340px] w-full bg-white dark:bg-[#090A0E] text-[#090A0E] dark:text-white border-r border-[#E2E8F0] dark:border-[#2C3142] shadow-[5px_0px_0px_0px_#0047FF] flex flex-col justify-between z-10 transition-colors">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E2E8F0] dark:border-[#2C3142] flex items-center justify-between bg-[#ECEEF2] dark:bg-[#12141C]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0047FF] dark:bg-[#CCFF00] animate-ping" />
            <span className="font-mono-tech text-[10px] font-bold text-[#0047FF] dark:text-[#CCFF00] tracking-widest uppercase">
              DISTRICT DIRECTORY
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Menu"
            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-[#1B1E2B] text-[#090A0E] dark:text-white hover:text-[#0047FF] dark:hover:text-[#CCFF00] border border-[#E2E8F0] dark:border-[#2C3142] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-5 space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeView === item.view
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleSelect(item.view)}
                className={`w-full text-left p-3 border transition-all cursor-pointer group flex items-center justify-between ${
                  isActive
                    ? 'bg-[#ECEEF2] dark:bg-[#12141C] border-[#0047FF] dark:border-[#CCFF00] shadow-[2px_2px_0px_0px_#0047FF] dark:shadow-[2px_2px_0px_0px_#CCFF00]'
                    : 'bg-white dark:bg-[#090A0E] border-transparent hover:border-[#E2E8F0] dark:hover:border-[#2C3142] hover:bg-[#ECEEF2] dark:hover:bg-[#12141C]'
                }`}
              >
                <div>
                  <h3
                    className={`font-syne font-extrabold text-[15px] uppercase tracking-wide leading-tight ${
                      isActive ? 'text-[#0047FF] dark:text-[#CCFF00]' : 'text-[#090A0E] dark:text-white group-hover:text-[#0047FF] dark:group-hover:text-[#CCFF00]'
                    }`}
                  >
                    {item.label}
                  </h3>
                  <p className="font-mono-tech text-[10px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                    {item.sub}
                  </p>
                </div>
                <ArrowRight
                  className={`w-4 h-4 transition-transform ${
                    isActive
                      ? 'text-[#0047FF] dark:text-[#CCFF00] translate-x-1'
                      : 'text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#090A0E] dark:group-hover:text-white group-hover:translate-x-1'
                  }`}
                />
              </button>
            )
          })}
        </div>

        {/* Provenance & Quick Settings */}
        <div className="p-5 border-t border-[#E2E8F0] dark:border-[#2C3142] bg-[#ECEEF2] dark:bg-[#12141C] space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-[10px] uppercase text-[#64748B] dark:text-[#94A3B8] tracking-widest">
              SYSTEM THEME
            </span>
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#090A0E] border border-[#E2E8F0] dark:border-[#2C3142] text-[#090A0E] dark:text-white font-mono-tech text-[11px] font-bold uppercase hover:border-[#0047FF] dark:hover:border-[#CCFF00] cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span>DARK MODE</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#090A0E]" />
                  <span>LIGHT MODE</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3 bg-white dark:bg-[#090A0E] border border-[#E2E8F0] dark:border-[#2C3142] space-y-2">
            <div className="flex items-center gap-2 text-[#0047FF] dark:text-[#CCFF00] font-mono-tech text-[10px] font-bold uppercase">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>FLAGSHIP LAB: GEC CIRCLE, CHATTOGRAM</span>
            </div>
            <div className="flex items-center gap-2 text-[#64748B] dark:text-[#94A3B8] font-mono-tech text-[10px] uppercase">
              <Truck className="w-3.5 h-3.5 flex-shrink-0 text-[#0047FF]" />
              <span>ALL 64 DISTRICTS DISPATCH • 24-72H</span>
            </div>
            <div className="flex items-center gap-2 text-[#64748B] dark:text-[#94A3B8] font-mono-tech text-[10px] uppercase">
              <Globe className="w-3.5 h-3.5 flex-shrink-0 text-[#0047FF]" />
              <span>DHL GLOBAL EXPRESS • 3-5 DAYS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
