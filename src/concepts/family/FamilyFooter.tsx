import React from 'react'
import type { Currency, FamilyDemographic, FamilyView } from './types'

interface FamilyFooterProps {
  onNavigate: (view: FamilyView, demographic?: FamilyDemographic) => void
  currency: Currency
}

export const FamilyFooter: React.FC<FamilyFooterProps> = ({ onNavigate, currency }) => {
  return (
    <footer className="w-full bg-[var(--color-surface-soft)] border-t border-[var(--color-border)] text-[var(--color-text-primary)] font-['Public_Sans'] select-none">
      {/* Upper Promise Strip */}
      <div className="border-b border-[var(--color-border)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-left text-xs">
          <div className="space-y-1">
            <span className="font-extrabold text-[#175CD3] dark:text-[#4E8DFF] block uppercase font-['Outfit']">
              01 // NON-TOXIC PROMISE
            </span>
            <p className="text-[var(--color-text-secondary)] text-[11px] leading-relaxed">
              100% GOTS certified organic cotton and OEKO-TEX Standard 100 Class 1 safe dyes.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-extrabold text-[#F76C5E] block uppercase font-['Outfit']">
              02 // SAME-DAY CHATTOGRAM
            </span>
            <p className="text-[var(--color-text-secondary)] text-[11px] leading-relaxed">
              Same-day courier delivery to Chattogram homes for emergency baby and family needs.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-extrabold text-[#F5A623] block uppercase font-['Outfit']">
              03 // ALL 64 DISTRICTS
            </span>
            <p className="text-[var(--color-text-secondary)] text-[11px] leading-relaxed">
              Nationwide express fulfillment with celebratory pastel gift box wrapping.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-extrabold text-[#175CD3] dark:text-[#4E8DFF] block uppercase font-['Outfit']">
              04 // FAMILY MILESTONE PERKS
            </span>
            <p className="text-[var(--color-text-secondary)] text-[11px] leading-relaxed">
              20% discount vouchers on your registered children’s birthdays every year.
            </p>
          </div>
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
                <span className="opacity-75">Developmental Sizing Guide</span>
              </li>
              <li>
                <span className="opacity-75">Baby Shower Registry</span>
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
                <span className="opacity-75">Chattogram Same-Day</span>
              </li>
              <li>
                <span className="opacity-75">64 District Express</span>
              </li>
              <li>
                <span className="opacity-75">Cash on Delivery (COD)</span>
              </li>
              <li>
                <span className="opacity-75">bKash Direct Merchant</span>
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
    </footer>
  )
}
