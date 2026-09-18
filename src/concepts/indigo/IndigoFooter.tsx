import React from 'react'
import type { IndigoView, IndigoCategory, Language } from './types'
import { getTranslation } from './translations'
import { MapPin, Phone, ShieldCheck } from 'lucide-react'

interface IndigoFooterProps {
  onNavigateView: (view: IndigoView) => void
  onNavigateCategory: (category: IndigoCategory) => void
  language: Language
}

export const IndigoFooter: React.FC<IndigoFooterProps> = ({
  onNavigateView,
  onNavigateCategory,
  language,
}) => {
  const t = getTranslation(language)

  return (
    <footer className="w-full bg-[#FFFFFF] dark:bg-[#1B1917] border-t border-[#E5DDD0] dark:border-[#36312B] transition-colors duration-200 pb-20 lg:pb-0">
      {/* 1. Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Manifesto & Guild Notice (Col-span 5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0A4269] dark:bg-[#3882B5] text-[#F9F6F0] flex items-center justify-center shadow-xs">
                <span className="font-cinzel text-[14px] font-bold">ই</span>
              </div>
              <span className="font-cinzel font-bold text-[18px] sm:text-[20px] tracking-[0.12em] text-[#0A4269] dark:text-[#F5EFE8] uppercase">
                {t.brandName}
              </span>
            </div>

            <p className="font-jakarta text-[13px] leading-relaxed text-[#756A63] dark:text-[#A3968C] max-w-sm">
              {t.footer.guildText}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F3ECE2] dark:bg-[#25221F] border border-[#E5DDD0] dark:border-[#36312B] rounded-xl text-[11px] font-jakarta font-semibold text-[#0A4269] dark:text-[#3882B5]">
              <ShieldCheck className="w-4 h-4 text-[#B85324]" />
              <span>{language === 'en' ? 'Natural Botanical Dyes Guaranteed' : 'শতভাগ প্রাকৃতিক ভেষজ নীল'}</span>
            </div>
          </div>

          {/* Department Directory (Col-span 3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-cinzel font-bold text-[14px] uppercase tracking-wider text-[#26201C] dark:text-[#F5EFE8]">
              {language === 'en' ? 'Artisanal Collections' : 'তাঁত সংগ্রহ'}
            </h4>
            <ul className="space-y-2 text-[13px] font-jakarta text-[#756A63] dark:text-[#A3968C]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Women')}
                  className="hover:text-[#0A4269] dark:hover:text-[#3882B5] transition-colors cursor-pointer"
                >
                  {t.nav.women}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Men')}
                  className="hover:text-[#0A4269] dark:hover:text-[#3882B5] transition-colors cursor-pointer"
                >
                  {t.nav.men}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Kids')}
                  className="hover:text-[#0A4269] dark:hover:text-[#3882B5] transition-colors cursor-pointer"
                >
                  {t.nav.kids}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Baby')}
                  className="hover:text-[#0A4269] dark:hover:text-[#3882B5] transition-colors cursor-pointer"
                >
                  {t.nav.baby}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Accessories')}
                  className="hover:text-[#0A4269] dark:hover:text-[#3882B5] transition-colors cursor-pointer"
                >
                  {t.nav.accessories}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateView('lookbook')}
                  className="hover:text-[#0A4269] dark:hover:text-[#3882B5] transition-colors cursor-pointer"
                >
                  {t.nav.lookbook}
                </button>
              </li>
            </ul>
          </div>

          {/* Maison Salons & Concierge (Col-span 4) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-cinzel font-bold text-[14px] uppercase tracking-wider text-[#26201C] dark:text-[#F5EFE8]">
              {t.footer.locations}
            </h4>
            <div className="space-y-3 text-[12px] font-jakarta text-[#756A63] dark:text-[#A3968C]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0A4269] dark:text-[#3882B5] flex-shrink-0 mt-0.5" />
                <span>{t.footer.flagship}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B85324] flex-shrink-0 mt-0.5" />
                <span>{t.footer.liaison}</span>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-[#E5DDD0] dark:border-[#36312B]">
                <Phone className="w-4 h-4 text-[#0A4269] dark:text-[#3882B5] flex-shrink-0 mt-0.5" />
                <span>{t.footer.helpline}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Copyright Ribbon */}
      <div className="border-t border-[#E5DDD0] dark:border-[#36312B] bg-[#F9F6F0] dark:bg-[#121110] py-4 px-4 text-center">
        <p className="font-jakarta text-[11px] text-[#756A63] dark:text-[#A3968C]">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
