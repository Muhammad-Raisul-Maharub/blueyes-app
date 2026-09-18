import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Heart,
  Sparkles,
  ShieldCheck,
  Check,
  ShoppingBag,
  Gift,
  Star,
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

  // Interactive "Match the Family Look" widget state
  const [matchSelected, setMatchSelected] = useState({
    mom: true,
    dad: true,
    toddler: true,
  })

  const demographics: { id: FamilyDemographic; label: string }[] = [
    { id: 'all', label: 'All Family' },
    { id: 'baby', label: 'Baby' },
    { id: 'kids', label: 'Kids' },
    { id: 'mom', label: 'Mom' },
    { id: 'dad', label: 'Dad' },
    { id: 'matching', label: 'Matching Sets' },
  ]

  const formatPrice = (priceBDT: number, priceUSD: number) => {
    if (currency === 'USD') return `$${priceUSD}`
    return `৳${priceBDT.toLocaleString()}`
  }

  // Filtered catalog products
  const displayProducts =
    activeDemographic === 'all'
      ? FAMILY_PRODUCTS
      : FAMILY_PRODUCTS.filter((p) => p.demographic === activeDemographic)

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
    <div className="w-full flex flex-col bg-[var(--color-canvas)] text-[var(--color-text-primary)] font-['Public_Sans']">
      {/* 1. Full-Width Immersive Family Lifestyle Hero Banner with rounded-3xl corners & Floating Milestone Sticker */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#175CD3] via-[#0E43A5] to-[#0A2E73] text-white min-h-[480px] sm:min-h-[540px] flex flex-col justify-end p-6 sm:p-10 lg:p-14 shadow-lg">
          {/* Background image overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-35"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=85')`,
            }}
          />

          {/* Floating Milestone Sticker with subtle floating motion */}
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-white/95 dark:bg-[#171D25]/95 backdrop-blur-md text-[var(--color-text-primary)] border border-white/20 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center space-x-3 max-w-xs z-10 text-left"
          >
            <div className="w-10 h-10 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider text-[#F76C5E]">
                <Star className="w-3 h-3 fill-[#F76C5E]" />
                <span>MILESTONE SAFE</span>
              </div>
              <p className="text-xs font-bold text-[var(--color-text-primary)] leading-tight">
                100% Organic & Allergen-Tested
              </p>
              <span className="text-[10px] text-[var(--color-text-secondary)]">Born in Chattogram</span>
            </div>
          </motion.div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-white">
              <Heart className="w-3.5 h-3.5 text-[#F76C5E] fill-[#F76C5E]" />
              <span>Multi-Generational Wardrobe Care</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] font-['Outfit']">
              Clothing Every Generation of the Family.
            </h1>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
              From pure organic newborn layettes to durable playground outfits and coordinated festive family sets. Mindfully crafted at the Port of Chattogram.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => onNavigate('category', 'matching')}
                className="px-7 py-3.5 bg-[#F76C5E] hover:bg-[#e45b4d] text-white font-bold text-xs sm:text-sm rounded-full transition-all flex items-center space-x-2 shadow-md cursor-pointer"
              >
                <span>Shop Family Bundles</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => onNavigate('hub')}
                className="px-6 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs sm:text-sm rounded-full transition-all cursor-pointer"
              >
                Register Children's Birthday (-20%)
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Demographic Segmented Switcher: Horizontal Pill Bar */}
      <section className="sticky top-[108px] z-30 w-full bg-[var(--color-canvas)]/95 backdrop-blur-md border-y border-[var(--color-border)] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
            {demographics.map((dem) => {
              const isSelected = activeDemographic === dem.id
              return (
                <motion.button
                  key={dem.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setActiveDemographic(dem.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#175CD3] text-white shadow-xs'
                      : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft)]'
                  }`}
                >
                  {dem.label}
                </motion.button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('category', activeDemographic)}
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold text-[#175CD3] dark:text-[#4E8DFF] hover:underline cursor-pointer"
          >
            <span>View All Department Grid</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Interactive "Match the Family Look" Widget */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] shadow-sm text-left space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#F76C5E]/15 text-[#F76C5E] text-[11px] font-bold uppercase mb-2">
                <Heart className="w-3 h-3 fill-[#F76C5E]" />
                <span>COORDINATED STYLING STUDIO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
                Match the Family Look
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
                Select matching outfits for Mom, Dad, and Toddler. Save 15% automatically when bundling 2 or more members!
              </p>
            </div>

            {memberCount >= 2 && (
              <div className="px-3 py-1.5 rounded-full bg-[#175CD3] text-white text-xs font-bold self-start md:self-auto">
                15% BUNDLE SAVINGS APPLIED ✓
              </div>
            )}
          </div>

          {/* 3 Interactive Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Mom's Outfit Card */}
            <div
              onClick={() => setMatchSelected((p) => ({ ...p, mom: !p.mom }))}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                matchSelected.mom
                  ? 'bg-[var(--color-surface)] border-[#175CD3] shadow-md ring-2 ring-[#175CD3]/20'
                  : 'bg-[var(--color-surface)]/60 border-[var(--color-border)] opacity-70'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F76C5E]/15 text-[#F76C5E] text-[10px] font-bold">
                  FOR MAMA
                </span>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    matchSelected.mom
                      ? 'bg-[#175CD3] border-[#175CD3] text-white'
                      : 'border-[var(--color-border)] bg-transparent'
                  }`}
                >
                  {matchSelected.mom && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>

              <div className="my-3 aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                  alt="Mom Outfit"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="font-bold text-sm text-[var(--color-text-primary)]">
                  Relaxed Linen Nursing Midi Dress
                </h4>
                <span className="text-xs font-bold text-[#175CD3] dark:text-[#4E8DFF] block mt-1">
                  {formatPrice(momPriceBDT, momPriceUSD)}
                </span>
              </div>
            </div>

            {/* Dad's Outfit Card */}
            <div
              onClick={() => setMatchSelected((p) => ({ ...p, dad: !p.dad }))}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                matchSelected.dad
                  ? 'bg-[var(--color-surface)] border-[#175CD3] shadow-md ring-2 ring-[#175CD3]/20'
                  : 'bg-[var(--color-surface)]/60 border-[var(--color-border)] opacity-70'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#175CD3]/15 text-[#175CD3] text-[10px] font-bold">
                  FOR PAPA
                </span>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    matchSelected.dad
                      ? 'bg-[#175CD3] border-[#175CD3] text-white'
                      : 'border-[var(--color-border)] bg-transparent'
                  }`}
                >
                  {matchSelected.dad && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>

              <div className="my-3 aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
                  alt="Dad Outfit"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="font-bold text-sm text-[var(--color-text-primary)]">
                  Everyday Organic Piqué Polo
                </h4>
                <span className="text-xs font-bold text-[#175CD3] dark:text-[#4E8DFF] block mt-1">
                  {formatPrice(dadPriceBDT, dadPriceUSD)}
                </span>
              </div>
            </div>

            {/* Toddler Outfit Card */}
            <div
              onClick={() => setMatchSelected((p) => ({ ...p, toddler: !p.toddler }))}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                matchSelected.toddler
                  ? 'bg-[var(--color-surface)] border-[#175CD3] shadow-md ring-2 ring-[#175CD3]/20'
                  : 'bg-[var(--color-surface)]/60 border-[var(--color-border)] opacity-70'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F5A623]/20 text-[#b5730a] dark:text-[#FDB843] text-[10px] font-bold">
                  FOR TODDLER / MINI
                </span>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    matchSelected.toddler
                      ? 'bg-[#175CD3] border-[#175CD3] text-white'
                      : 'border-[var(--color-border)] bg-transparent'
                  }`}
                >
                  {matchSelected.toddler && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>

              <div className="my-3 aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80"
                  alt="Toddler Outfit"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="font-bold text-sm text-[var(--color-text-primary)]">
                  Coordinated Organic Play Set
                </h4>
                <span className="text-xs font-bold text-[#175CD3] dark:text-[#4E8DFF] block mt-1">
                  {formatPrice(toddlerPriceBDT, toddlerPriceUSD)}
                </span>
              </div>
            </div>
          </div>

          {/* Bundle Summary Bar */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[var(--color-text-secondary)] block">
                {memberCount} Family Members Selected
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
      </section>

      {/* 4. Curated Lifestyle Bento: Layettes, Sibling Festive Sets, Travel Gear */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[var(--color-border)]">
          <div className="text-left">
            <span className="text-xs font-bold text-[#175CD3] uppercase tracking-wider">
              CURATED LIFESTYLE CHAPTERS
            </span>
            <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
              Everyday Milestones
            </h3>
          </div>
          <span className="text-xs text-[var(--color-text-secondary)] hidden sm:inline">
            Tested for Bangladesh Coastal Living
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Bento Card 1: 100% Organic Layettes */}
          <div
            onClick={() => onNavigate('category', 'baby')}
            className="group p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#175CD3] transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md min-h-[320px]"
          >
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5A623]/20 text-[#b5730a] dark:text-[#FDB843] text-[10px] font-bold">
                NEWBORN & INFANT
              </span>
              <h4 className="text-xl font-bold text-[var(--color-text-primary)] font-['Outfit'] group-hover:text-[#175CD3] transition-colors">
                100% Organic Layettes
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Chemical-free unbleached cotton rompers with nickel-free snaps, fold-over scratch cuffs, and gentle stretch for delicate infant skin.
              </p>
            </div>
            <div className="mt-4 aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80"
                alt="Organic Layette"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Bento Card 2: Sibling Festive Sets */}
          <div
            onClick={() => onNavigate('category', 'matching')}
            className="group p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#F76C5E] transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md min-h-[320px]"
          >
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F76C5E]/15 text-[#F76C5E] text-[10px] font-bold">
                EID & FESTIVE MATCH
              </span>
              <h4 className="text-xl font-bold text-[var(--color-text-primary)] font-['Outfit'] group-hover:text-[#F76C5E] transition-colors">
                Sibling Festive Sets
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Handloom Khadi & Jamdani inspired matching kurtas, sarees, and mini ensembles. Perfectly coordinated for unforgettable family portraits.
              </p>
            </div>
            <div className="mt-4 aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                alt="Festive Sets"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Bento Card 3: Family Travel Gear */}
          <div
            onClick={() => onNavigate('category', 'kids')}
            className="group p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#175CD3] transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md min-h-[320px]"
          >
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#175CD3]/15 text-[#175CD3] text-[10px] font-bold">
                WEEKEND TRANSIT
              </span>
              <h4 className="text-xl font-bold text-[var(--color-text-primary)] font-['Outfit'] group-hover:text-[#175CD3] transition-colors">
                Family Travel Gear
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Scuff-resistant French terry tracksuits with reinforced knees, lightweight sun hats, and travel-ready parent tote bags.
              </p>
            </div>
            <div className="mt-4 aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80"
                alt="Family Travel Gear"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Fast-Browse Product Rail with rounded-2xl cards and Quick Add */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[var(--color-border)]">
          <div className="text-left">
            <span className="text-xs font-bold text-[#175CD3] uppercase tracking-wider">
              {activeDemographic.toUpperCase()} HIGHLIGHTS
            </span>
            <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
              Featured Family Essentials
            </h3>
          </div>
          <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
            {displayProducts.length} ESSENTIALS CATALOGUED
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          {displayProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectProduct(product)}
              className="group p-3 sm:p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#175CD3] transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                {/* 4:5 Aspect Ratio Image Container with rounded-xl */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 mb-3">
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
                    <span className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-white/90 dark:bg-black/90 backdrop-blur-xs text-[10px] font-bold text-[#175CD3] dark:text-[#4E8DFF] truncate text-center">
                      ♥ {product.matchFamilyTag}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-[10px] font-bold text-[var(--color-text-secondary)] uppercase">
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
                  className="px-3 py-1.5 rounded-full bg-[#175CD3] hover:bg-[#144fbb] text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Quick Add
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Family Care & Safety Guarantee Banner */}
      <section className="w-full bg-[var(--color-surface-soft)] border-t border-[var(--color-border)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#175CD3]/10 flex items-center justify-center text-[#175CD3]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[var(--color-text-primary)] font-['Outfit']">
              Non-Toxic Baby-Safe Dyes
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Every yarn is certified OEKO-TEX Standard 100 Class 1. Zero harmful phthalates, zero lead, and hypoallergenic for delicate skin.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F76C5E]/10 flex items-center justify-center text-[#F76C5E]">
              <Gift className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[var(--color-text-primary)] font-['Outfit']">
              Pastel Baby Shower Gift Boxes
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Add our bespoke celebration box in pastel peach or sky blue with personalized handwritten welcome cards for loved ones.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623]">
              <Heart className="w-5 h-5 fill-[#F5A623]" />
            </div>
            <h4 className="font-bold text-base text-[var(--color-text-primary)] font-['Outfit']">
              20% Birthday Milestone Vouchers
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Register your children’s birthdays in our Family Hub and automatically receive 20% privilege vouchers every milestone year.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
