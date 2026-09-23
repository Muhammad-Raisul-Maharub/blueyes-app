import React, { useState } from 'react'
import type { DistrictView, DistrictCategory } from './types'
import {
  MapPin,
  Truck,
  Globe,
  ShieldCheck,
  Check,
  Send,
  X,
} from 'lucide-react'

interface DistrictFooterProps {
  onNavigateView: (view: DistrictView) => void
  onNavigateCategory: (cat: DistrictCategory) => void
}

export const DistrictFooter: React.FC<DistrictFooterProps> = ({
  onNavigateView,
  onNavigateCategory,
}) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [infoModal, setInfoModal] = useState<'origin' | 'dispatch' | 'dhl' | 'commercial' | null>(null)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 4000)
  }

  return (
    <footer className="w-full bg-[#F4F4F6] dark:bg-[#090A0E] text-[#090A0E] dark:text-white border-t border-[#E2E8F0] dark:border-[#2C3142] transition-colors duration-200 pb-16 lg:pb-0">
      {/* 1. Value Props Ticker Grid */}
      <div className="border-b border-[#E2E8F0] dark:border-[#2C3142] bg-white dark:bg-[#13151D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            type="button"
            onClick={() => setInfoModal('origin')}
            className="flex items-center gap-3 text-left p-2 -m-2 rounded hover:bg-[#F4F4F6] dark:hover:bg-[#1E2230] transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-[#ECEEF2] dark:bg-[#1B1E2B] text-[#0047FF] dark:text-[#CCFF00] border border-[#E2E8F0] dark:border-[#2C3142] flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-space font-bold text-[13px] uppercase text-[#090A0E] dark:text-white">
                CHATTOGRAM ORIGIN
              </h4>
              <p className="font-dm text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                Flagship Studio at GEC Circle, Port City
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setInfoModal('dispatch')}
            className="flex items-center gap-3 text-left p-2 -m-2 rounded hover:bg-[#F4F4F6] dark:hover:bg-[#1E2230] transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-[#ECEEF2] dark:bg-[#1B1E2B] text-[#0047FF] border border-[#E2E8F0] dark:border-[#2C3142] flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-space font-bold text-[13px] uppercase text-[#090A0E] dark:text-white">
                64 DISTRICTS DISPATCH
              </h4>
              <p className="font-dm text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                24h Chattogram / 48-72h Nationwide
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setInfoModal('dhl')}
            className="flex items-center gap-3 text-left p-2 -m-2 rounded hover:bg-[#F4F4F6] dark:hover:bg-[#1E2230] transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-[#ECEEF2] dark:bg-[#1B1E2B] text-[#0047FF] dark:text-[#CCFF00] border border-[#E2E8F0] dark:border-[#2C3142] flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-space font-bold text-[13px] uppercase text-[#090A0E] dark:text-white">
                DHL GLOBAL EXPRESS
              </h4>
              <p className="font-dm text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                3–5 Days to USA, UK, UAE & Worldwide
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setInfoModal('commercial')}
            className="flex items-center gap-3 text-left p-2 -m-2 rounded hover:bg-[#F4F4F6] dark:hover:bg-[#1E2230] transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-[#ECEEF2] dark:bg-[#1B1E2B] text-[#0047FF] border border-[#E2E8F0] dark:border-[#2C3142] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-space font-bold text-[13px] uppercase text-[#090A0E] dark:text-white">
                COMMERCIAL CHECKOUT
              </h4>
              <p className="font-dm text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                bKash, Cash on Delivery & Global Cards
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info & Newsletter (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#0047FF] dark:bg-[#CCFF00]" />
              <h3 className="font-syne font-extrabold text-[22px] tracking-tight uppercase text-[#090A0E] dark:text-white">
                BLU EYES <span className="text-[#0047FF]">DISTRICT</span>
              </h3>
            </div>
            <p className="font-dm text-[13px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed max-w-sm">
              Port city underground streetwear born along the Bay of Bengal. Engineered with custom heavyweight textiles, modular utility cuts, and brutalist aesthetics.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2 max-w-md">
              <label className="font-mono-tech text-[10px] uppercase font-bold text-[#0047FF] dark:text-[#CCFF00] tracking-wider block mb-2">
                DROP NOTIFICATION PROTOCOL
              </label>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER EMAIL FOR ARCHIVE 03 DROP..."
                  required
                  className="flex-1 bg-white dark:bg-[#12141C] border border-[#E2E8F0] dark:border-[#2C3142] px-3.5 py-2.5 text-[#090A0E] dark:text-white font-mono-tech text-[11px] placeholder:text-[#64748B] dark:placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0047FF] dark:focus:border-[#CCFF00]"
                />
                <button
                  type="submit"
                  className="px-4 bg-[#CCFF00] text-[#090A0E] font-mono-tech text-[11px] font-extrabold uppercase hover:bg-[#0047FF] hover:text-white dark:hover:bg-white dark:hover:text-[#090A0E] transition-colors cursor-pointer flex items-center justify-center shadow-[2px_2px_0px_0px_#0047FF]"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="font-mono-tech text-[10px] text-[#0047FF] dark:text-[#CCFF00] mt-1.5 flex items-center gap-1">
                  <Check className="w-3 h-3" /> SUBSCRIBED TO DISTRICT PRIORITY DISPATCH.
                </p>
              )}
            </form>
          </div>

          {/* Drops Directory (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono-tech text-[11px] uppercase tracking-widest text-[#0047FF] dark:text-[#CCFF00] font-bold">
              DROPS
            </h4>
            <ul className="space-y-2 font-space text-[12px] uppercase">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Men')}
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#0047FF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Men Streetwear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Women')}
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#0047FF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Women Streetwear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Kids')}
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#0047FF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Kids Skate (2–15Y)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Baby')}
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#0047FF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Baby Mini (0–2Y)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Accessories')}
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#0047FF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Tactical Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Archive & Story (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono-tech text-[11px] uppercase tracking-widest text-[#0047FF] dark:text-[#CCFF00] font-bold">
              ARCHIVE
            </h4>
            <ul className="space-y-2 font-space text-[12px] uppercase">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateView('lookbook')}
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#0047FF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Runway Lookbook
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateView('about')}
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#0047FF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Port City Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateView('home')}
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#0047FF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Heavyweight 480 GSM
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Accessories')}
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#0047FF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Cordura Hardware
                </button>
              </li>
            </ul>
          </div>

          {/* Locations & Depot (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono-tech text-[11px] uppercase tracking-widest text-[#0047FF] dark:text-[#CCFF00] font-bold">
              LOGISTICS DEPOT
            </h4>
            <div className="space-y-2 font-mono-tech text-[11px] text-[#64748B] dark:text-[#94A3B8]">
              <p>
                <strong className="text-[#090A0E] dark:text-white">FLAGSHIP LAB:</strong>
                <br />
                GEC Circle, Nasirabad, Chattogram 4000
              </p>
              <p>
                <strong className="text-[#090A0E] dark:text-white">DHAKA DEPOT:</strong>
                <br />
                Road 11, Block D, Banani, Dhaka 1213
              </p>
              <p>
                <strong className="text-[#090A0E] dark:text-white">DISPATCH PROTOCOL:</strong>
                <br />
                Mon–Sat: 10:00 AM – 8:00 PM (GMT+6)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Copyright Bar */}
      <div className="border-t border-[#E2E8F0] dark:border-[#2C3142] bg-[#ECEEF2] dark:bg-[#090A0E] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[10px] text-[#64748B] dark:text-[#94A3B8]">
          <p>© {new Date().getFullYear()} BLU EYES DISTRICT • PORT CITY CHATTOGRAM • ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4 uppercase">
            <span>WCAG AAA COMPLIANT</span>
            <span>•</span>
            <span>SECURE ENCRYPTED CHECKOUT</span>
            <span>•</span>
            <span>100% COMMERCIAL STOCK</span>
          </div>
        </div>
      </div>
      {/* Info Modal */}
      {infoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setInfoModal(null)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-[#13151D] border-2 border-[#0047FF] dark:border-[#CCFF00] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#0047FF] relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setInfoModal(null)}
              className="absolute top-4 right-4 p-2 bg-[#ECEEF2] dark:bg-[#1B1E2B] text-[#090A0E] dark:text-white hover:bg-[#CCFF00] hover:text-[#090A0E] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {infoModal === 'origin' && (
              <div className="space-y-4 font-mono-tech">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#CCFF00] text-[#090A0E] font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold uppercase text-[#090A0E] dark:text-white">
                      CHATTOGRAM ORIGIN PROTOCOL
                    </h3>
                    <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                      Latitude 22.3569° N, Longitude 91.7832° E
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-[#64748B] dark:text-[#94A3B8] font-dm leading-relaxed pt-2">
                  <p>
                    Every Blu Eyes District garment is formulated, sampled, and finished in the port city of Chattogram. Surrounded by the Bay of Bengal, container ships, and industrial docklands, our garments inherit brutal structural durability.
                  </p>
                  <p>
                    Visit our flagship design laboratory located at Level 2, GEC Circle Commercial Centre, Chattogram for archive try-ons and custom bespoke tailoring.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setInfoModal(null)
                    onNavigateView('about')
                  }}
                  className="w-full py-2.5 bg-[#0047FF] hover:bg-[#2A66FF] text-white font-mono-tech text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  READ PORT CITY MANIFESTO
                </button>
              </div>
            )}

            {infoModal === 'dispatch' && (
              <div className="space-y-4 font-mono-tech">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#CCFF00] text-[#090A0E] font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold uppercase text-[#090A0E] dark:text-white">
                      64 DISTRICTS LOGISTICS MATRIX
                    </h3>
                    <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                      Nationwide Hub Distribution Network
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-[#64748B] dark:text-[#94A3B8] font-dm leading-relaxed pt-2">
                  <div className="p-3 bg-[#ECEEF2] dark:bg-[#1B1E2B] border border-[#E2E8F0] dark:border-[#2C3142]">
                    <span className="font-mono-tech text-[11px] font-bold text-[#0047FF] dark:text-[#CCFF00] block mb-1">
                      CHATTOGRAM METRO: 24 HOURS
                    </span>
                    <p>Same-day dispatch on orders placed before 2 PM. Direct courier drop to Agrabad, GEC, Nasirabad, Panchlaish, and Halishahar.</p>
                  </div>
                  <div className="p-3 bg-[#ECEEF2] dark:bg-[#1B1E2B] border border-[#E2E8F0] dark:border-[#2C3142]">
                    <span className="font-mono-tech text-[11px] font-bold text-[#0047FF] dark:text-[#CCFF00] block mb-1">
                      DHAKA & ALL 63 OTHER DISTRICTS: 48–72 HOURS
                    </span>
                    <p>Tracked express surface transit with tamper-evident matte black industrial poly mailers.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setInfoModal(null)}
                  className="w-full py-2.5 bg-[#090A0E] dark:bg-white text-white dark:text-[#090A0E] font-mono-tech text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  ACKNOWLEDGE
                </button>
              </div>
            )}

            {infoModal === 'dhl' && (
              <div className="space-y-4 font-mono-tech">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#CCFF00] text-[#090A0E] font-bold">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold uppercase text-[#090A0E] dark:text-white">
                      DHL GLOBAL AIRLINE DISPATCH
                    </h3>
                    <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                      Export Air Waybill to 190+ Countries
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-[#64748B] dark:text-[#94A3B8] font-dm leading-relaxed pt-2">
                  <p>
                    International streetwear orders are exported via Shah Amanat International Airport (CGP) or Hazrat Shahjalal International Airport (DAC) with DHL Express priority cargo clearance.
                  </p>
                  <p>
                    Delivery timelines: United Kingdom (3–4 days), USA & Canada (3–5 days), United Arab Emirates & GCC (2–3 days), European Union (3–5 days). Fully insured with signature confirmation.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setInfoModal(null)}
                  className="w-full py-2.5 bg-[#0047FF] hover:bg-[#2A66FF] text-white font-mono-tech text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  DISMISS
                </button>
              </div>
            )}

            {infoModal === 'commercial' && (
              <div className="space-y-4 font-mono-tech">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#CCFF00] text-[#090A0E] font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold uppercase text-[#090A0E] dark:text-white">
                      COMMERCIAL SETTLEMENT & COD
                    </h3>
                    <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                      PCI-DSS Level 1 Encrypted Gateways
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-[#64748B] dark:text-[#94A3B8] font-dm leading-relaxed pt-2">
                  <p>
                    We support both instant local digital checkout and cash on arrival:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 font-mono-tech text-[11px]">
                    <li><strong>Cash on Delivery (COD):</strong> Pay rider in cash upon unboxing across all 64 districts.</li>
                    <li><strong>bKash Merchant Direct:</strong> 1-click tokenized payment via secure PIN.</li>
                    <li><strong>Visa / Mastercard / Amex:</strong> 3D Secure 2.0 dual-factor authentication.</li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => setInfoModal(null)}
                  className="w-full py-2.5 bg-[#090A0E] dark:bg-white text-white dark:text-[#090A0E] font-mono-tech text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  CONFIRM
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  )
}
