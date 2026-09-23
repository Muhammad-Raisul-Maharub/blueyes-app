import React, { useState } from 'react'
import { X, Truck, ShieldCheck, Ruler, CreditCard, ArrowRight } from 'lucide-react'
import type { Currency, FamilyDemographic, FamilyView } from './types'

interface FamilyFooterProps {
  onNavigate: (view: FamilyView, demographic?: FamilyDemographic) => void
  currency: Currency
}

export const FamilyFooter: React.FC<FamilyFooterProps> = ({ onNavigate, currency }) => {
  const [modalType, setModalType] = useState<'sizing' | 'sameDay' | 'express' | 'cod' | 'bkash' | null>(null)

  return (
    <footer className="w-full bg-[var(--color-surface-soft)] border-t border-[var(--color-border)] text-[var(--color-text-primary)] font-['Public_Sans'] select-none">
      {/* Upper Promise Strip */}
      <div className="border-b border-[var(--color-border)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-left text-xs">
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="space-y-1 text-left hover:opacity-85 transition-opacity cursor-pointer p-2 -m-2 rounded-xl"
          >
            <span className="font-extrabold text-[#175CD3] dark:text-[#4E8DFF] block uppercase font-['Outfit']">
              01 // NON-TOXIC PROMISE
            </span>
            <p className="text-[var(--color-text-secondary)] text-[11px] leading-relaxed">
              100% GOTS certified organic cotton and OEKO-TEX Standard 100 Class 1 safe dyes.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setModalType('sameDay')}
            className="space-y-1 text-left hover:opacity-85 transition-opacity cursor-pointer p-2 -m-2 rounded-xl"
          >
            <span className="font-extrabold text-[#F76C5E] block uppercase font-['Outfit']">
              02 // SAME-DAY CHATTOGRAM
            </span>
            <p className="text-[var(--color-text-secondary)] text-[11px] leading-relaxed">
              Same-day courier delivery to Chattogram homes for emergency baby and family needs.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setModalType('express')}
            className="space-y-1 text-left hover:opacity-85 transition-opacity cursor-pointer p-2 -m-2 rounded-xl"
          >
            <span className="font-extrabold text-[#F5A623] block uppercase font-['Outfit']">
              03 // ALL 64 DISTRICTS
            </span>
            <p className="text-[var(--color-text-secondary)] text-[11px] leading-relaxed">
              Nationwide express fulfillment with celebratory pastel gift box wrapping.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('hub')}
            className="space-y-1 text-left hover:opacity-85 transition-opacity cursor-pointer p-2 -m-2 rounded-xl"
          >
            <span className="font-extrabold text-[#175CD3] dark:text-[#4E8DFF] block uppercase font-['Outfit']">
              04 // FAMILY MILESTONE PERKS
            </span>
            <p className="text-[var(--color-text-secondary)] text-[11px] leading-relaxed">
              20% discount vouchers on your registered children’s birthdays every year.
            </p>
          </button>
        </div>
      </div>

      {/* Directory Links */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-left">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-2xl tracking-tight text-[var(--color-text-primary)] font-['Outfit']">
                Blu Eyes
              </span>
              <span className="px-2.5 py-0.5 bg-[#F76C5E] text-white text-[11px] font-bold rounded-full uppercase">
                Family
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
              Warm multi-generational fashion crafted for everyday living in Bangladesh. Soft on newborns, durable on playground toddlers, and tailored for mothers and fathers.
            </p>
            <div className="text-xs text-[var(--color-text-secondary)] space-y-1 pt-2 font-medium">
              <div>FLAGSHIP: Level 2, GEC Circle Commercial Centre, Chattogram</div>
              <div>CARE: family@blueyes.com.bd • +880 1800-FAMILY</div>
            </div>
          </div>

          {/* Departments */}
          <div className="space-y-2.5 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-text-primary)] block font-['Outfit']">
              Departments
            </span>
            <ul className="space-y-2 text-[var(--color-text-secondary)] font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('category', 'baby')}
                  className="hover:text-[#175CD3] cursor-pointer"
                >
                  Baby & Newborn Layettes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('category', 'kids')}
                  className="hover:text-[#175CD3] cursor-pointer"
                >
                  Kids’ Play Apparel
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('category', 'mom')}
                  className="hover:text-[#175CD3] cursor-pointer"
                >
                  Mom’s Nursing Wear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('category', 'dad')}
                  className="hover:text-[#175CD3] cursor-pointer"
                >
                  Dad’s Weekend Polos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('category', 'matching')}
                  className="hover:text-[#175CD3] cursor-pointer"
                >
                  Coordinated Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Loyalty */}
          <div className="space-y-2.5 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-text-primary)] block font-['Outfit']">
              Family Club
            </span>
            <ul className="space-y-2 text-[var(--color-text-secondary)] font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('hub')}
                  className="hover:text-[#F76C5E] cursor-pointer font-bold text-[#F76C5E]"
                >
                  Register Milestone (-20%)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#175CD3] cursor-pointer"
                >
                  Chattogram Workshop
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('sizing')}
                  className="hover:text-[#175CD3] cursor-pointer text-left"
                >
                  Developmental Sizing Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('hub')}
                  className="hover:text-[#175CD3] cursor-pointer text-left"
                >
                  Baby Shower Registry
                </button>
              </li>
            </ul>
          </div>

          {/* Fulfillment */}
          <div className="space-y-2.5 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-text-primary)] block font-['Outfit']">
              Fulfillment
            </span>
            <ul className="space-y-2 text-[var(--color-text-secondary)] font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('sameDay')}
                  className="hover:text-[#175CD3] cursor-pointer text-left"
                >
                  Chattogram Same-Day
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('express')}
                  className="hover:text-[#175CD3] cursor-pointer text-left"
                >
                  64 District Express
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('cod')}
                  className="hover:text-[#175CD3] cursor-pointer text-left"
                >
                  Cash on Delivery (COD)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('bkash')}
                  className="hover:text-[#175CD3] cursor-pointer text-left"
                >
                  bKash Direct Merchant
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-text-secondary)] gap-3 font-medium">
          <div>
            © {new Date().getFullYear()} BLU EYES FAMILY • MAISON CHATTOGRAM
          </div>
          <div className="flex items-center space-x-3">
            <span>CURRENCY: {currency}</span>
            <span>•</span>
            <span>CHATTOGRAM, BANGLADESH</span>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {modalType && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setModalType(null)}
        >
          <div
            className="w-full max-w-lg bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[var(--color-surface-soft)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'sizing' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#175CD3]/10 text-[#175CD3] flex items-center justify-center">
                    <Ruler className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] font-['Outfit']">
                      Developmental Sizing Guide
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Age, weight, and height benchmarks for growing family members
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[var(--color-text-secondary)] pt-2 leading-relaxed">
                  <div className="p-3 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border)]">
                    <span className="font-bold text-[var(--color-text-primary)] block mb-1">
                      Newborn & Baby (0–24M)
                    </span>
                    <p>Designed with extra hip width to comfortably accommodate cloth and disposable diapers, plus snap buttons for quick changes without overhead strain.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border)]">
                    <span className="font-bold text-[var(--color-text-primary)] block mb-1">
                      Kids & Play (2–10Y)
                    </span>
                    <p>Features elastic drawstrings, reinforced double knees, and growth-spurt room so garments fit comfortably across multiple seasons.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border)]">
                    <span className="font-bold text-[var(--color-text-primary)] block mb-1">
                      Maternity & Mom Nursing
                    </span>
                    <p>Concealed side zips and stretch modal fibers ensure comfort before, during, and after nursing phases.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setModalType(null)
                    onNavigate('category', 'baby')
                  }}
                  className="w-full py-2.5 mt-2 bg-[#175CD3] hover:bg-[#144fbb] text-white font-bold text-xs rounded-full flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Explore Baby Sizing Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {modalType === 'sameDay' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F76C5E]/10 text-[#F76C5E] flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] font-['Outfit']">
                      Chattogram Same-Day Delivery
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Direct courier dispatch from our GEC Circle hub
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[var(--color-text-secondary)] pt-2 leading-relaxed">
                  <p>
                    For emergency baby apparel, maternity essentials, or last-minute shower gifts, order by 2:00 PM for doorstep delivery by 8:00 PM anywhere in the Chattogram metropolitan area (GEC, Nasirabad, Agrabad, Panchlaish, Halishahar, Khulshi).
                  </p>
                  <div className="p-3 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border)]">
                    <span className="font-bold text-[var(--color-text-primary)] block mb-1">
                      Flat Rate: ৳80 BDT (Free over ৳3,000)
                    </span>
                    <p>All packages are wrapped in sealed rain-resistant outer packaging to protect organic cotton fibers.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="w-full py-2.5 mt-2 bg-[#F76C5E] hover:bg-[#e4584a] text-white font-bold text-xs rounded-full cursor-pointer transition-colors"
                >
                  Understood
                </button>
              </div>
            )}

            {modalType === 'express' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F5A623]/20 text-[#F5A623] flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] font-['Outfit']">
                      64 District Express Fulfillment
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Delivered across Bangladesh within 24–48 hours
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[var(--color-text-secondary)] pt-2 leading-relaxed">
                  <p>
                    We partner with Steadfast and Paperfly to ensure rapid, dependable delivery to every corner of Bangladesh, from Sylhet to Cox's Bazar, Rajshahi, and Dhaka.
                  </p>
                  <div className="p-3 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border)]">
                    <span className="font-bold text-[var(--color-text-primary)] block mb-1">
                      Nationwide Rate: ৳120 BDT
                    </span>
                    <p>Live SMS tracking sent the moment your parcel leaves our Chattogram distribution warehouse.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="w-full py-2.5 mt-2 bg-[#175CD3] hover:bg-[#144fbb] text-white font-bold text-xs rounded-full cursor-pointer transition-colors"
                >
                  Got It
                </button>
              </div>
            )}

            {modalType === 'cod' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#175CD3]/10 text-[#175CD3] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] font-['Outfit']">
                      Cash on Delivery (COD)
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Zero upfront risk — inspect at your doorstep
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[var(--color-text-secondary)] pt-2 leading-relaxed">
                  <p>
                    Inspect your parcel upon arrival and pay cash directly to the courier rider. Available across all 64 districts in Bangladesh with no extra convenience fees.
                  </p>
                  <div className="p-3 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border)]">
                    <span className="font-bold text-[var(--color-text-primary)] block mb-1">
                      Hassle-Free Doorstep Exchanges
                    </span>
                    <p>If sizing for your little one isn't 100% ideal, hand it right back to the courier for instant size exchange processing.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="w-full py-2.5 mt-2 bg-[#175CD3] hover:bg-[#144fbb] text-white font-bold text-xs rounded-full cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            )}

            {modalType === 'bkash' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#E2136E]/10 text-[#E2136E] flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] font-['Outfit']">
                      bKash Direct Merchant Gateway
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Instant 1-tap checkout via authorized merchant QR & API
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[var(--color-text-secondary)] pt-2 leading-relaxed">
                  <p>
                    Pay seamlessly with bKash Merchant checkout. Enjoy instant payment confirmation, automatic SMS receipts, and eligible seasonal bKash cashback rewards.
                  </p>
                  <div className="p-3 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border)]">
                    <span className="font-bold text-[var(--color-text-primary)] block mb-1">
                      Official Merchant Number
                    </span>
                    <p className="font-mono text-xs text-[#E2136E]">01800-FAMILY (Blu Eyes Family)</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="w-full py-2.5 mt-2 bg-[#E2136E] hover:bg-[#c71060] text-white font-bold text-xs rounded-full cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  )
}
