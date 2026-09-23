import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Check,
  ShoppingBag,
  Gift,
  Star,
  Users,
  Baby,
  ArrowRight,
} from 'lucide-react'
import type { Currency, FamilyDemographic, FamilyProduct, FamilyView } from './types'
import { FAMILY_PRODUCTS } from './familyData'

interface FamilyHomeProps {
  currency: Currency
  onNavigate: (view: FamilyView, demographic?: FamilyDemographic) => void
  onSelectProduct: (product: FamilyProduct) => void
  onQuickAdd: (product: FamilyProduct) => void
  onAddFamilyBundleToCart: (items: { role: string; product: FamilyProduct }[]) => void
}

export const FamilyHome: React.FC<FamilyHomeProps> = ({
  currency,
  onNavigate,
  onSelectProduct,
  onQuickAdd,
  onAddFamilyBundleToCart,
}) => {
  const [activeDemographic, setActiveDemographic] = useState<FamilyDemographic>('all')
  const [activeAgeBracket, setActiveAgeBracket] = useState<string>('All Ages')

  // Interactive "Match the Family Look" bundle builder state
  const [matchSelected, setMatchSelected] = useState({
    mom: true,
    dad: true,
    toddler: true,
  })

  // Household segmented pills
  const demographics: { id: FamilyDemographic; label: string }[] = [
    { id: 'all', label: 'All Family' },
    { id: 'baby', label: 'Baby' },
    { id: 'kids', label: 'Kids' },
    { id: 'mom', label: 'Mom' },
    { id: 'dad', label: 'Dad' },
    { id: 'matching', label: 'Matching Sets' },
  ]

  // Developmental age-bracket chips for Kids and Baby
  const ageBrackets = [
    'All Ages',
    '0–6M Layette',
    '6–12M Crawlers',
    '12–24M Walkers',
    '2–4Y Toddler',
    '5–8Y School',
    '9–14Y Junior',
  ]

  const formatPrice = (priceBDT: number, priceUSD: number) => {
    if (currency === 'USD') return `$${priceUSD}`
    return `৳${priceBDT.toLocaleString()}`
  }

  // Filtered catalog products with age bracket awareness
  const displayProducts = FAMILY_PRODUCTS.filter((product) => {
    const matchesDemographic =
      activeDemographic === 'all' || product.demographic === activeDemographic
    if (!matchesDemographic) return false

    if (activeAgeBracket === 'All Ages') return true
    if (activeAgeBracket.includes('0–6M') && (product.sku.includes('LAYETTE') || product.demographic === 'baby')) return true
    if (activeAgeBracket.includes('6–12M') && product.demographic === 'baby') return true
    if (activeAgeBracket.includes('12–24M') && (product.demographic === 'baby' || product.demographic === 'kids')) return true
    if (activeAgeBracket.includes('2–4Y') && product.demographic === 'kids') return true
    if (activeAgeBracket.includes('5–8Y') && product.demographic === 'kids') return true
    if (activeAgeBracket.includes('9–14Y') && product.demographic === 'kids') return true
    return true
  })

  // Bundle pricing for "Match the Family Look" widget
  const momPriceBDT = 3400
  const momPriceUSD = 30
  const dadPriceBDT = 2200
  const dadPriceUSD = 20
  const toddlerPriceBDT = 1800
  const toddlerPriceUSD = 16

  const rawTotalBDT =
    (matchSelected.mom ? momPriceBDT : 0) +
    (matchSelected.dad ? dadPriceBDT : 0) +
    (matchSelected.toddler ? toddlerPriceBDT : 0)
  const rawTotalUSD =
    (matchSelected.mom ? momPriceUSD : 0) +
    (matchSelected.dad ? dadPriceUSD : 0) +
    (matchSelected.toddler ? toddlerPriceUSD : 0)

  // 15% discount when 2 or more members selected
  const memberCount =
    (matchSelected.mom ? 1 : 0) + (matchSelected.dad ? 1 : 0) + (matchSelected.toddler ? 1 : 0)
  const bundleDiscountRatio = memberCount >= 2 ? 0.15 : 0
  const bundleSavingsBDT = Math.round(rawTotalBDT * bundleDiscountRatio)
  const bundleSavingsUSD = Math.round(rawTotalUSD * bundleDiscountRatio)
  const finalBundleTotalBDT = rawTotalBDT - bundleSavingsBDT
  const finalBundleTotalUSD = rawTotalUSD - bundleSavingsUSD

  const handleAddMatchingLook = () => {
    const momProduct = FAMILY_PRODUCTS.find((p) => p.id === 'fam-m-01') || FAMILY_PRODUCTS[0]
    const dadProduct = FAMILY_PRODUCTS.find((p) => p.id === 'fam-d-01') || FAMILY_PRODUCTS[0]
    const toddlerProduct = FAMILY_PRODUCTS.find((p) => p.id === 'fam-k-01') || FAMILY_PRODUCTS[0]

    const bundleItems: { role: string; product: FamilyProduct }[] = []
    if (matchSelected.mom) bundleItems.push({ role: 'Mom', product: momProduct })
    if (matchSelected.dad) bundleItems.push({ role: 'Dad', product: dadProduct })
    if (matchSelected.toddler) bundleItems.push({ role: 'Toddler', product: toddlerProduct })

    if (bundleItems.length > 0) {
      onAddFamilyBundleToCart(bundleItems)
    }
  }

  return (
    <div className="w-full flex flex-col bg-[var(--color-canvas)] text-[var(--color-text-primary)] font-['Public_Sans'] pb-28 transition-colors duration-200">
      {/* =========================================================================
          1. EDGE-TO-EDGE SOFT PORCELAIN HERO LEADING INTO "MATCH THE FAMILY LOOK"
          Fluid wide card layout with organic rounded-3xl containers & milestone stickers
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-10">
        <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#FDFBF9] via-[#F7F3EE] to-[#EFE8DF] dark:from-[#171D25] dark:via-[#1A222C] dark:to-[#12161C] border border-[#E5DDD4] dark:border-[#2C3440] p-6 sm:p-10 lg:p-14 shadow-sm text-left">
          {/* Subtle Background Family Photo Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 dark:opacity-10 mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=85')`,
            }}
          />

          {/* Floating Pastel Milestone Stickers */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex flex-col gap-2 z-10">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white/95 dark:bg-[#1C2430]/95 backdrop-blur-md border border-[#E5DDD4] dark:border-[#2C3440] px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623]">
                <Star className="w-4 h-4 fill-[#F5A623]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F76C5E] block">
                  MILESTONE TESTED
                </span>
                <span className="text-xs font-bold text-[var(--color-text-primary)]">
                  100% Organic & Baby-Safe
                </span>
              </div>
            </motion.div>

            <div className="hidden sm:flex items-center gap-2 bg-[#175CD3]/10 dark:bg-[#175CD3]/20 border border-[#175CD3]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#175CD3] dark:text-[#4E8DFF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Save 15% on Multi-Member Bundles</span>
            </div>
          </div>

          {/* Hero Narrative Heading */}
          <div className="relative z-10 max-w-2xl space-y-3 mb-8">
            <div className="inline-flex items-center space-x-2 bg-[#F76C5E]/15 text-[#F76C5E] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-[#F76C5E]" />
              <span>Interactive Household Studio</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] font-['Outfit'] leading-[1.1]">
              Clothing Every Generation of the Family.
            </h1>

            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
              From pure organic newborn layettes to durable playground outfits and coordinated festive family sets. Mindfully crafted at the Port of Chattogram.
            </p>
          </div>

          {/* =====================================================================
              INTERACTIVE "MATCH THE FAMILY LOOK" BUNDLE BUILDER CARD
              Mom + Dad + Toddler live checkbox bundler with instant 15% calculator
              ===================================================================== */}
          <div className="relative z-10 bg-white dark:bg-[#1A212B] border border-[#E5DDD4] dark:border-[#2C3440] rounded-3xl p-5 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-[#E5DDD4] dark:border-[#2C3440] mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#175CD3]" />
                  <h2 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-[var(--color-text-primary)]">
                    Match the Family Look Studio
                  </h2>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                  Select matching outfits for Mom, Dad, and Toddler. Automatically save 15% when 2 or more are bundled!
                </p>
              </div>

              {memberCount >= 2 && (
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold self-start md:self-auto flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>15% AUTOMATIC BUNDLE DISCOUNT APPLIED</span>
                </span>
              )}
            </div>

            {/* 3 Coordinated Family Member Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Mom's Outfit */}
              <div
                onClick={() => setMatchSelected((p) => ({ ...p, mom: !p.mom }))}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  matchSelected.mom
                    ? 'bg-[#FDFBF9] dark:bg-[#202936] border-[#175CD3] shadow-md ring-2 ring-[#175CD3]/20'
                    : 'bg-gray-50 dark:bg-[#141A22] border-gray-200 dark:border-gray-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F76C5E]/15 text-[#F76C5E] text-[10px] font-bold uppercase">
                    FOR MAMA
                  </span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      matchSelected.mom
                        ? 'bg-[#175CD3] border-[#175CD3] text-white'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {matchSelected.mom && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                    alt="Mom Outfit"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[var(--color-text-primary)] line-clamp-1">
                    Relaxed Linen Nursing Midi Dress
                  </h4>
                  <span className="text-xs font-bold text-[#175CD3] dark:text-[#4E8DFF] block mt-0.5">
                    {formatPrice(momPriceBDT, momPriceUSD)}
                  </span>
                </div>
              </div>

              {/* Dad's Outfit */}
              <div
                onClick={() => setMatchSelected((p) => ({ ...p, dad: !p.dad }))}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  matchSelected.dad
                    ? 'bg-[#FDFBF9] dark:bg-[#202936] border-[#175CD3] shadow-md ring-2 ring-[#175CD3]/20'
                    : 'bg-gray-50 dark:bg-[#141A22] border-gray-200 dark:border-gray-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#175CD3]/15 text-[#175CD3] text-[10px] font-bold uppercase">
                    FOR PAPA
                  </span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      matchSelected.dad
                        ? 'bg-[#175CD3] border-[#175CD3] text-white'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {matchSelected.dad && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
                    alt="Dad Outfit"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[var(--color-text-primary)] line-clamp-1">
                    Everyday Organic Piqué Polo
                  </h4>
                  <span className="text-xs font-bold text-[#175CD3] dark:text-[#4E8DFF] block mt-0.5">
                    {formatPrice(dadPriceBDT, dadPriceUSD)}
                  </span>
                </div>
              </div>

              {/* Toddler's Outfit */}
              <div
                onClick={() => setMatchSelected((p) => ({ ...p, toddler: !p.toddler }))}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  matchSelected.toddler
                    ? 'bg-[#FDFBF9] dark:bg-[#202936] border-[#175CD3] shadow-md ring-2 ring-[#175CD3]/20'
                    : 'bg-gray-50 dark:bg-[#141A22] border-gray-200 dark:border-gray-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F5A623]/20 text-[#b5730a] dark:text-[#FDB843] text-[10px] font-bold uppercase">
                    FOR TODDLER / MINI
                  </span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      matchSelected.toddler
                        ? 'bg-[#175CD3] border-[#175CD3] text-white'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {matchSelected.toddler && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80"
                    alt="Toddler Outfit"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[var(--color-text-primary)] line-clamp-1">
                    Coordinated Organic Play Set
                  </h4>
                  <span className="text-xs font-bold text-[#175CD3] dark:text-[#4E8DFF] block mt-0.5">
                    {formatPrice(toddlerPriceBDT, toddlerPriceUSD)}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Pricing Summary & Add Bundle Button */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F3EE] dark:bg-[#141A22] border border-[#E5DDD4] dark:border-[#2C3440] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[var(--color-text-secondary)] block">
                  {memberCount} Family Outfits Selected
                </span>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-2xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
                    {formatPrice(finalBundleTotalBDT, finalBundleTotalUSD)}
                  </span>
                  {bundleSavingsBDT > 0 && (
                    <span className="text-xs font-bold text-[#F76C5E] line-through">
                      {formatPrice(rawTotalBDT, rawTotalUSD)}
                    </span>
                  )}
                  {bundleSavingsBDT > 0 && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      (Save {currency === 'USD' ? `$${bundleSavingsUSD}` : `৳${bundleSavingsBDT.toLocaleString()}`})
                    </span>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                disabled={memberCount === 0}
                onClick={handleAddMatchingLook}
                className={`px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md ${
                  memberCount > 0
                    ? 'bg-[#175CD3] hover:bg-[#144fbb] text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Complete Family Look to Bag</span>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SEGMENTED HOUSEHOLD PILLS WITH SOFT BOUNCE ANIMATIONS & AGE BRACKETS
          Stiffness: 280, Damping: 18
          ========================================================================= */}
      <section className="sticky top-16 z-20 w-full bg-[var(--color-canvas)]/95 backdrop-blur-md border-y border-[var(--color-border)] py-3 px-4 sm:px-6 lg:px-12 shadow-xs">
        <div className="max-w-[1600px] mx-auto space-y-2.5">
          {/* Main Demographic Segmented Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none py-0.5">
            {demographics.map((dem) => {
              const isSelected = activeDemographic === dem.id
              return (
                <motion.button
                  key={dem.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  type="button"
                  onClick={() => setActiveDemographic(dem.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#175CD3] text-white shadow-xs'
                      : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[#F3EFE9] dark:hover:bg-[#202936]'
                  }`}
                >
                  {dem.label}
                </motion.button>
              )
            })}
          </div>

          {/* Developmental Age-Bracket Chips for Kids & Baby */}
          <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none pt-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mr-1 flex items-center gap-1">
              <Baby className="w-3 h-3 text-[#175CD3]" />
              <span>AGE BRACKET:</span>
            </span>
            {ageBrackets.map((bracket) => {
              const isSelected = activeAgeBracket === bracket
              return (
                <button
                  key={bracket}
                  type="button"
                  onClick={() => setActiveAgeBracket(bracket)}
                  className={`px-2.5 py-1 rounded-lg text-[10.5px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#F76C5E] text-white font-bold'
                      : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {bracket}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. EXPANSIVE 4-TO-5 COLUMN PRODUCT MATRIX WITH ORGANIC ROUNDED-3XL CARDS
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[var(--color-border)]">
          <div className="text-left">
            <span className="text-xs font-bold text-[#175CD3] uppercase tracking-wider">
              {activeDemographic.toUpperCase()} • {activeAgeBracket.toUpperCase()}
            </span>
            <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
              Featured Family Wardrobe Essentials
            </h3>
          </div>
          <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
            {displayProducts.length} ESSENTIALS CATALOGUED
          </span>
        </div>

        {/* 5-Column Responsive Grid on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 text-left">
          {displayProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -4 }}
              onClick={() => onSelectProduct(product)}
              className="group p-3.5 sm:p-4 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#175CD3] transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                {/* 4:5 Aspect Ratio Image Container with rounded-2xl */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={product.defaultImage}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-400"
                  />

                  {product.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#F76C5E] text-white text-[9px] font-bold shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  {product.matchFamilyTag && (
                    <span className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-white/95 dark:bg-black/95 backdrop-blur-xs text-[9.5px] font-bold text-[#175CD3] dark:text-[#4E8DFF] truncate text-center">
                      ♥ {product.matchFamilyTag}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-[9.5px] font-bold text-[var(--color-text-secondary)] uppercase">
                  <span>{product.demographic}</span>
                  <span>•</span>
                  <span>{product.sku}</span>
                </div>

                <h4 className="text-sm font-bold text-[var(--color-text-primary)] font-['Outfit'] mt-1 group-hover:text-[#175CD3] transition-colors line-clamp-1">
                  {product.title}
                </h4>

                <p className="text-[11px] text-[var(--color-text-secondary)] line-clamp-1 mt-0.5">
                  {product.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                <div>
                  <span className="text-sm sm:text-base font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
                    {formatPrice(product.priceBDT, product.priceUSD)}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onQuickAdd(product)
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-[#175CD3] hover:bg-[#144fbb] text-white font-bold text-xs cursor-pointer shadow-xs min-h-[36px]"
                >
                  Quick Add
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. FAMILY SAFETY & CARE GUARANTEE (ROUNDED-3XL CONTAINERS)
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => onNavigate('about')}
            className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#175CD3]/40 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#175CD3]/10 flex items-center justify-center text-[#175CD3] group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[var(--color-text-primary)] font-['Outfit'] group-hover:text-[#175CD3] transition-colors">
                Non-Toxic Baby-Safe Dyes
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-1">
                Every yarn is certified OEKO-TEX Standard 100 Class 1. Zero harmful phthalates, zero lead, and hypoallergenic for delicate newborn skin.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#175CD3] pt-1">
              <span>Read Safety Standards</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => onNavigate('hub')}
            className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#F76C5E]/40 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#F76C5E]/10 flex items-center justify-center text-[#F76C5E] group-hover:scale-110 transition-transform">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[var(--color-text-primary)] font-['Outfit'] group-hover:text-[#F76C5E] transition-colors">
                Pastel Baby Shower Keepsake Boxes
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-1">
                Add our bespoke celebration box in pastel peach or sky blue with personalized handwritten welcome cards for loved ones.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F76C5E] pt-1">
              <span>Explore Keepsake Registry</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => onNavigate('hub')}
            className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#F5A623]/40 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 fill-[#F5A623]" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[var(--color-text-primary)] font-['Outfit'] group-hover:text-[#F5A623] transition-colors">
                20% Birthday Milestone Vouchers
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-1">
                Register your children’s birthdays in our Family Hub and automatically receive 20% privilege vouchers every milestone year.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b5730a] dark:text-[#FDB843] pt-1">
              <span>Register In Family Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
