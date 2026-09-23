import React, { useState } from 'react'
import { X, CheckCircle, FileText, Truck, ShieldCheck, Layers, Package } from 'lucide-react'
import type { Currency, LifeWearCategory, LifeWearView } from './types'

interface LifeWearFooterProps {
  onNavigate: (view: LifeWearView, category?: LifeWearCategory) => void
  currency: Currency
}

export const LifeWearFooter: React.FC<LifeWearFooterProps> = ({ onNavigate, currency }) => {
  const [modalType, setModalType] = useState<
    'supima' | 'gsm' | 'bundling' | 'chattogram' | 'districts' | 'dhl' | 'cod' | 'bkash' | null
  >(null)

  return (
    <footer className="w-full bg-[var(--color-surface)] border-t border-[var(--color-border)] text-[var(--color-text-primary)] select-none">
      {/* Upper Logistics Callout Strip */}
      <div className="border-b border-[var(--color-border)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-left font-mono text-xs">
          <button
            type="button"
            onClick={() => setModalType('chattogram')}
            className="text-left space-y-1 hover:opacity-80 transition-opacity cursor-pointer p-2 -m-2 rounded"
          >
            <span className="font-bold text-[#004CE8] dark:text-[#387BFF] block">01 // CHATTOGRAM METRO</span>
            <p className="text-[var(--color-text-secondary)] text-[11px]">
              Same-day courier dispatch across Chattogram metro area on orders placed before 2 PM.
            </p>
          </button>
          <button
            type="button"
            onClick={() => setModalType('districts')}
            className="text-left space-y-1 hover:opacity-80 transition-opacity cursor-pointer p-2 -m-2 rounded"
          >
            <span className="font-bold text-[#004CE8] dark:text-[#387BFF] block">02 // 64 DISTRICT EXPRESS</span>
            <p className="text-[var(--color-text-secondary)] text-[11px]">
              Nationwide 48-hour delivery across all 64 districts in Bangladesh via domestic express.
            </p>
          </button>
          <button
            type="button"
            onClick={() => setModalType('dhl')}
            className="text-left space-y-1 hover:opacity-80 transition-opacity cursor-pointer p-2 -m-2 rounded"
          >
            <span className="font-bold text-[#004CE8] dark:text-[#387BFF] block">03 // DHL GLOBAL COURIER</span>
            <p className="text-[var(--color-text-secondary)] text-[11px]">
              Direct export air delivery to UK, USA, Europe, and UAE within 3–5 business days.
            </p>
          </button>
          <button
            type="button"
            onClick={() => setModalType('bundling')}
            className="text-left space-y-1 hover:opacity-80 transition-opacity cursor-pointer p-2 -m-2 rounded"
          >
            <span className="font-bold text-[#004CE8] dark:text-[#387BFF] block">04 // KRAFT UNBLEACHED</span>
            <p className="text-[var(--color-text-secondary)] text-[11px]">
              100% recyclable, plastic-free biodegradable packaging made from renewable pulp.
            </p>
          </button>
        </div>
      </div>

      {/* Main Directory Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-left">
          {/* Col 1: Brand */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight text-[var(--color-text-primary)]">
                BLU EYES
              </span>
              <span className="px-1.5 py-0.5 bg-[#004CE8] text-white text-[10px] font-mono font-semibold">
                LIFEWEAR
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
              Scandinavian Functional Utilitarianism engineered in Chattogram, Bangladesh. Daily wardrobe staples calibrated for coastal resilience and structural longevity.
            </p>
            <div className="font-mono text-[11px] text-[var(--color-text-secondary)] space-y-1 pt-2">
              <div>FLAGSHIP: Level 3, GEC Circle, Chattogram</div>
              <div>CONTACT: care@blueyes-lifewear.com</div>
              <div>HOTLINE: +880 1800-LIFEWEAR</div>
            </div>
          </div>

          {/* Col 2: Wardrobe Categories */}
          <div className="space-y-2.5 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-text-primary)] block">
              DEPARTMENTS
            </span>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('women', 'women')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer"
                >
                  Women's LifeWear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('men', 'men')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer"
                >
                  Men's LifeWear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('kids', 'kids')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer"
                >
                  Kids' Standards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('baby', 'baby')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer"
                >
                  Baby Essentials
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('accessories', 'accessories')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer"
                >
                  Technical Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Technical Docs */}
          <div className="space-y-2.5 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-text-primary)] block">
              SPECIFICATIONS
            </span>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('lookbook')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer"
                >
                  SS26 Lookbook
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer"
                >
                  Port Manufacturing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('supima')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer text-left"
                >
                  Supima Cotton Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('gsm')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer text-left"
                >
                  GSM Weight Matrix
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('bundling')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer text-left"
                >
                  Multi-Pack Bundling
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Logistics & Dispatch */}
          <div className="space-y-2.5 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-text-primary)] block">
              LOGISTICS
            </span>
            <ul className="space-y-2 text-[var(--color-text-secondary)]">
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('chattogram')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer text-left"
                >
                  Chattogram Same-Day
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('districts')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer text-left"
                >
                  64 Districts Courier
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('dhl')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer text-left"
                >
                  DHL Express Tracking
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('cod')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer text-left"
                >
                  Cash on Delivery (COD)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalType('bkash')}
                  className="hover:text-[#004CE8] transition-colors cursor-pointer text-left"
                >
                  bKash Direct Gateway
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Hairline & Legal */}
        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[var(--color-text-secondary)] gap-3">
          <div>
            © {new Date().getFullYear()} BLU EYES LIFEWEAR • SCANDINAVIAN FUNCTIONAL UTILITARIAN
          </div>
          <div className="flex items-center space-x-4">
            <span>CURRENCY: {currency}</span>
            <span>•</span>
            <span>CHATTOGRAM, BANGLADESH</span>
          </div>
        </div>
      </div>

      {/* Interactive Information Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
          <div className="w-full max-w-lg bg-[var(--color-canvas)] border border-[var(--color-border)] p-6 space-y-4 text-left shadow-2xl relative">
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-1.5 border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[#004CE8] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {modalType === 'supima' && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#004CE8]">
                  <FileText className="w-4 h-4" />
                  <span>TECHNICAL SPECIFICATION // SUPIMA COTTON</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  Extra-Long Staple (ELS) Supima Standard
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Our cotton fibers are 35% longer than conventional grades. This ensures twice the tensile strength, exceptional softness, and zero pill accumulation after 100+ industrial wash cycles.
                </p>
                <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] space-y-1">
                  <div>• <strong>Yarn Twist:</strong> Single-ring spun 32s/1 count</div>
                  <div>• <strong>Shrinkage:</strong> &lt; 1.8% residual variance</div>
                  <div>• <strong>Pre-Steaming:</strong> High-pressure decatized at 120°C</div>
                </div>
              </div>
            )}

            {modalType === 'gsm' && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#004CE8]">
                  <Layers className="w-4 h-4" />
                  <span>WEIGHT MATRIX // GSM CALIBRATION</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  Garment GSM Density Classifications
                </h3>
                <div className="space-y-2 text-xs text-[var(--color-text-secondary)]">
                  <div className="p-2 border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <span className="font-bold text-[var(--color-text-primary)]">110–160 GSM:</span> Lightweight summer air-knit for infant layettes and breathable inner layers.
                  </div>
                  <div className="p-2 border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <span className="font-bold text-[var(--color-text-primary)]">220–260 GSM:</span> Heavyweight Supima crewnecks offering opaque drape with structural collar permanence.
                  </div>
                  <div className="p-2 border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <span className="font-bold text-[var(--color-text-primary)]">380–500 GSM:</span> Ultra-dense loopback French Terry fleece engineered for monsoon wind protection.
                  </div>
                </div>
              </div>
            )}

            {modalType === 'bundling' && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#004CE8]">
                  <Package className="w-4 h-4" />
                  <span>MULTI-PACK BUNDLING // 15% INSTANT SAVINGS</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  Engineered 3-Pack Bundle System
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Select any 3 items across tees, joggers, or infant essentials. The system automatically applies a 15% volume discount, qualifies the package for free delivery, and packages items in a sealed unbleached kraft box.
                </p>
                <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] font-bold">
                  ✓ Applies automatically at bag checkout
                </div>
              </div>
            )}

            {modalType === 'chattogram' && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#004CE8]">
                  <Truck className="w-4 h-4" />
                  <span>DISPATCH // CHATTOGRAM SAME-DAY METRO</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  Chattogram Metropolitan Delivery
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Orders confirmed before 2:00 PM BST are dispatched via our dedicated motorcycle courier network from our GEC Circle hub. Delivered directly to your doorstep within 4 hours.
                </p>
                <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] space-y-1">
                  <div>• <strong>Delivery Fee:</strong> ৳80 (Complimentary over ৳2,000 / $20)</div>
                  <div>• <strong>Coverage:</strong> GEC, Agrabad, Nasirabad, Khulshi, Halishahar, Panchlaish, and CEPZ</div>
                </div>
              </div>
            )}

            {modalType === 'districts' && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#004CE8]">
                  <Truck className="w-4 h-4" />
                  <span>DOMESTIC REACH // ALL 64 DISTRICTS</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  Nationwide Express Transit (48 Hours)
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Direct partnership with top domestic road logistics providers. Real-time SMS and web tracking with every parcel sealed in moisture-resistant kraft barriers.
                </p>
                <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] space-y-1">
                  <div>• <strong>Standard Rate:</strong> ৳120 (Free for orders over ৳2,500 / $25)</div>
                  <div>• <strong>Transit Duration:</strong> 24–48 Hours to divisional cities; 48–72 Hours nationwide</div>
                </div>
              </div>
            )}

            {modalType === 'dhl' && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#004CE8]">
                  <Truck className="w-4 h-4" />
                  <span>GLOBAL LOGISTICS // DHL EXPRESS</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  International Air Courier
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Worldwide delivery originating from Shah Amanat International Airport, Chattogram. Direct flights servicing the UK, US, Canada, EU, and UAE in 3–5 business days.
                </p>
                <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] space-y-1">
                  <div>• <strong>Flat International Fee:</strong> $25 (Free for orders over $250)</div>
                  <div>• <strong>Customs:</strong> Delivered Duty Paid (DDP) options available</div>
                </div>
              </div>
            )}

            {modalType === 'cod' && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#004CE8]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>PAYMENT PROTOCOL // CASH ON DELIVERY</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  Cash on Delivery Across Bangladesh
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Inspect your sealed kraft parcel upon delivery before completing cash payment to the courier. Available nationwide across all 64 districts with zero surcharge fees.
                </p>
              </div>
            )}

            {modalType === 'bkash' && (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#004CE8]">
                  <CheckCircle className="w-4 h-4 text-[#E2136E]" />
                  <span>DIGITAL GATEWAY // BKASH DIRECT MERCHANT</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  Instant Verification via bKash
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Checkout in seconds using our integrated bKash Merchant Gateway. Direct OTP verification, immediate order confirmation, and zero transaction processing fees.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setModalType(null)}
              className="w-full py-2.5 bg-[#004CE8] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              CLOSE WINDOW
            </button>
          </div>
        </div>
      )}
    </footer>
  )
}
