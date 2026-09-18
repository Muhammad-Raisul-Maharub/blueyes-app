import React, { useState } from 'react'
import { MapPin, Send, Check } from 'lucide-react'
import type { GlacierView, GlacierCategory } from './types'

interface GlacierFooterProps {
  onNavigateView: (view: GlacierView) => void
  onNavigateCategory: (category: GlacierCategory) => void
}

export const GlacierFooter: React.FC<GlacierFooterProps> = ({
  onNavigateView,
  onNavigateCategory,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setIsSubscribed(true)
    setTimeout(() => {
      setNewsletterEmail('')
    }, 2000)
  }

  return (
    <footer className="w-full bg-[#020617] text-[#F0F9FF] border-t border-sky-400/20 relative z-10 font-sans pb-28 md:pb-12">
      {/* Top Banner Notice */}
      <div className="border-b border-sky-400/15 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[11px] font-space-mono text-[#7DD3FC]">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
          <span>MAISON CHATTOGRAM: ZERO-EMISSION HYDRO TEXTILE ENGINEERING</span>
        </div>
        <div className="flex items-center gap-6 text-[11px] font-space-mono text-slate-400">
          <span>ALL 64 DISTRICTS INSURED</span>
          <span>•</span>
          <span>DHL GLOBAL COURIER</span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Brand & Narrative (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <svg
              viewBox="0 0 32 32"
              className="w-7 h-7 text-[#7DD3FC]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path d="M2 16C6 8 26 8 30 16C26 24 6 24 2 16Z" />
              <circle cx="16" cy="16" r="5" />
              <circle cx="16" cy="16" r="2" fill="currentColor" />
            </svg>
            <span className="font-syne font-extrabold text-[20px] text-white tracking-tight">
              BLU EYES GLACIER
            </span>
          </div>

          <p className="font-sans text-[13px] text-slate-400 leading-relaxed text-left mb-6 max-w-sm">
            Sub-zero architectural luxury loomed from closed-loop hydro-powered filaments. Designed in Chattogram, Bangladesh to endure the coldest extremities with effortless poise.
          </p>

          <div className="flex items-start gap-2.5 text-[12px] text-slate-300">
            <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
            <span>Maison Chattogram Flagship Atelier, GEC Circle, Chattogram-4000, Bangladesh</span>
          </div>
        </div>

        {/* Lineages Links (2 Cols) */}
        <div className="lg:col-span-2">
          <h4 className="font-space-mono text-[11px] font-bold text-[#7DD3FC] tracking-[0.2em] uppercase mb-4">
            COLLECTIONS
          </h4>
          <ul className="space-y-2.5 text-[13px] font-space text-slate-300">
            <li>
              <button
                type="button"
                onClick={() => onNavigateCategory('Women')}
                className="hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                Women's Cape & Silk
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigateCategory('Men')}
                className="hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                Men's Tech-Wool & Loom
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigateCategory('Kids')}
                className="hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                Junior Alpine Armour
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigateCategory('Baby')}
                className="hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                Newborn Merino Cradle
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigateCategory('Accessories')}
                className="hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                Titanium & Optical Shield
              </button>
            </li>
          </ul>
        </div>

        {/* Maison Links (2 Cols) */}
        <div className="lg:col-span-2">
          <h4 className="font-space-mono text-[11px] font-bold text-[#7DD3FC] tracking-[0.2em] uppercase mb-4">
            MAISON
          </h4>
          <ul className="space-y-2.5 text-[13px] font-space text-slate-300">
            <li>
              <button
                type="button"
                onClick={() => onNavigateView('lookbook')}
                className="hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                Runway Lookbook
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigateView('about')}
                className="hover:text-[#38BDF8] transition-colors cursor-pointer"
              >
                Research Manifesto
              </button>
            </li>
            <li>
              <span className="text-slate-500 cursor-default">Cryo-Lab Testing</span>
            </li>
            <li>
              <span className="text-slate-500 cursor-default">Net-0 Audits</span>
            </li>
            <li>
              <span className="text-slate-500 cursor-default">District Logistics</span>
            </li>
          </ul>
        </div>

        {/* Newsletter & Dispatch (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col">
          <h4 className="font-space-mono text-[11px] font-bold text-[#7DD3FC] tracking-[0.2em] uppercase mb-2">
            ARCHIVAL DISPATCH REGISTRY
          </h4>
          <p className="font-sans text-[12px] text-slate-400 mb-4 text-left leading-relaxed">
            Receive private notifications for limited 360-piece archival drops and seasonal laboratory walk-throughs in Chattogram.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="COLLECTOR EMAIL..."
              className="flex-1 bg-slate-900 border border-sky-400/30 text-[12px] font-space-mono text-white px-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#030712] font-space font-extrabold text-[11px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center shrink-0"
            >
              {isSubscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </button>
          </form>

          {isSubscribed && (
            <span className="text-[11px] font-space-mono text-[#7DD3FC] mt-2 block">
              REGISTRATION CONFIRMED • WELCOME TO MAISON ARCHIVE
            </span>
          )}
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 border-t border-sky-400/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-space-mono text-slate-500">
        <div>
          © {new Date().getFullYear()} BLU EYES GLACIER • MAISON CHATTOGRAM • ALL RIGHTS RESERVED
        </div>
        <div className="flex items-center gap-6">
          <span>PRIVACY REGISTRY</span>
          <span>TERMS OF COUTURE</span>
          <span>AUTHENTICITY VERIFICATION</span>
        </div>
      </div>
    </footer>
  )
}
