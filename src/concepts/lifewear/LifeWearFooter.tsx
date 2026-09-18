import React from 'react'
import type { Currency, LifeWearCategory, LifeWearView } from './types'

interface LifeWearFooterProps {
  onNavigate: (view: LifeWearView, category?: LifeWearCategory) => void
  currency: Currency
}

export const LifeWearFooter: React.FC<LifeWearFooterProps> = ({ onNavigate, currency }) => {
  return (
    <footer className="w-full bg-[var(--color-surface)] border-t border-[var(--color-border)] text-[var(--color-text-primary)] select-none">
      {/* Upper Logistics Callout Strip */}
      <div className="border-b border-[var(--color-border)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-left font-mono text-xs">
          <div className="space-y-1">
            <span className="font-bold text-[#004CE8] dark:text-[#387BFF] block">01 // CHATTOGRAM METRO</span>
            <p className="text-[var(--color-text-secondary)] text-[11px]">
              Same-day courier dispatch across Chattogram metro area on orders placed before 2 PM.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-[#004CE8] dark:text-[#387BFF] block">02 // 64 DISTRICT EXPRESS</span>
            <p className="text-[var(--color-text-secondary)] text-[11px]">
              Nationwide 48-hour delivery across all 64 districts in Bangladesh via domestic express.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-[#004CE8] dark:text-[#387BFF] block">03 // DHL GLOBAL COURIER</span>
            <p className="text-[var(--color-text-secondary)] text-[11px]">
              Direct export air delivery to UK, USA, Europe, and UAE within 3–5 business days.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-[#004CE8] dark:text-[#387BFF] block">04 // KRAFT UNBLEACHED</span>
            <p className="text-[var(--color-text-secondary)] text-[11px]">
              100% recyclable, plastic-free biodegradable packaging made from renewable pulp.
            </p>
          </div>
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
                <span className="opacity-75">Supima Cotton Guide</span>
              </li>
              <li>
                <span className="opacity-75">GSM Weight Matrix</span>
              </li>
              <li>
                <span className="opacity-75">Multi-Pack Bundling</span>
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
                <span className="opacity-75">Chattogram Same-Day</span>
              </li>
              <li>
                <span className="opacity-75">64 Districts Courier</span>
              </li>
              <li>
                <span className="opacity-75">DHL Express Tracking</span>
              </li>
              <li>
                <span className="opacity-75">Cash on Delivery (COD)</span>
              </li>
              <li>
                <span className="opacity-75">bKash Direct Gateway</span>
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
    </footer>
  )
}
