import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter, X, Check, SlidersHorizontal, ArrowLeft } from 'lucide-react'
import type { Currency, FamilyDemographic, FamilyAgeBracket, FamilyProduct } from './types'
import { FAMILY_PRODUCTS } from './familyData'

interface FamilyCategoryPageProps {
  demographic: FamilyDemographic
  onSelectDemographic: (d: FamilyDemographic) => void
  currency: Currency
  onSelectProduct: (product: FamilyProduct) => void
  onQuickAdd: (product: FamilyProduct) => void
  onBack?: () => void
  onNavigateHome?: () => void
}

export const FamilyCategoryPage: React.FC<FamilyCategoryPageProps> = ({
  demographic,
  onSelectDemographic,
  currency,
  onSelectProduct,
  onQuickAdd,
  onBack,
  onNavigateHome,
}) => {
  const [selectedAgeBracket, setSelectedAgeBracket] = useState<FamilyAgeBracket>('all')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured')

  const formatPrice = (priceBDT: number, priceUSD: number) => {
    if (currency === 'USD') return `$${priceUSD}`
    return `৳${priceBDT.toLocaleString()}`
  }

  const ageFilterOptions: { id: FamilyAgeBracket; label: string }[] = [
    { id: 'all', label: 'All Ages' },
    { id: 'newborn-0-3m', label: 'Newborn (0–3M)' },
    { id: 'infant-3-6m', label: 'Infant (3–6M)' },
    { id: 'toddler-2-7y', label: 'Toddler (2–7Y)' },
    { id: 'junior-8-15y', label: 'Junior (8–15Y)' },
  ]

  const demographicOptions: { id: FamilyDemographic; label: string }[] = [
    { id: 'all', label: 'All Family' },
    { id: 'baby', label: 'Baby' },
    { id: 'kids', label: 'Kids' },
    { id: 'mom', label: 'Mom' },
    { id: 'dad', label: 'Dad' },
    { id: 'matching', label: 'Matching Sets' },
  ]

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    let list = FAMILY_PRODUCTS

    // Filter by demographic
    if (demographic !== 'all') {
      list = list.filter((p) => p.demographic === demographic)
    }

    // Filter by age bracket (for Baby, Kids, or All)
    if (selectedAgeBracket !== 'all') {
      list = list.filter((p) => p.ageBracket === selectedAgeBracket)
    }

    // Sort
    return [...list].sort((a, b) => {
      const priceA = currency === 'USD' ? a.priceUSD : a.priceBDT
      const priceB = currency === 'USD' ? b.priceUSD : b.priceBDT
      if (sortBy === 'price-asc') return priceA - priceB
      if (sortBy === 'price-desc') return priceB - priceA
      return 0
    })
  }, [demographic, selectedAgeBracket, sortBy, currency])

  const titles: Record<FamilyDemographic, { title: string; desc: string }> = {
    all: {
      title: 'The Full Multi-Generational Wardrobe',
      desc: 'Comfortable, durable, and allergen-safe garments engineered for grandparents, parents, kids, and newborns.',
    },
    baby: {
      title: 'Baby & Newborn Care Wardrobe',
      desc: '100% GOTS organic cotton layettes, 2-way zip sleepsuits, and nickel-free snap bodysuits for sensitive skin.',
    },
    kids: {
      title: 'Kids’ High-Mobility Play Apparel',
      desc: 'Reinforced knee panels, scuff-resistant loopback French terry, and safety cordless hoodies for playground explorers.',
    },
    mom: {
      title: 'Mom’s Everyday Comfort & Nursing Wear',
      desc: 'Breathable linen-tencel midi dresses with concealed nursing zips, relaxed trousers, and coordinated mini sets.',
    },
    dad: {
      title: 'Dad’s Relaxed & Weekend Wardrobe',
      desc: 'Micro-honeycomb organic piqué polos, stretch chino trousers, and matching dad & son ensembles.',
    },
    matching: {
      title: 'Coordinated Family Matching Sets',
      desc: 'Festive Eid collections, weekend Sunday lounge sets, and seaside holiday matching outfits with bundled savings.',
    },
  }

  const currentInfo = titles[demographic] || titles.all

  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] font-['Public_Sans']">
      {/* Category Hero Banner */}
      <section className="w-full bg-[var(--color-surface-soft)] border-b border-[var(--color-border)] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#175CD3] mb-2">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] hover:border-[#175CD3] cursor-pointer mr-2 shadow-2xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#175CD3]" />
                  <span>Back</span>
                </button>
              )}
              {onNavigateHome ? (
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:underline uppercase tracking-wider cursor-pointer"
                >
                  BLU EYES FAMILY
                </button>
              ) : (
                <span className="uppercase tracking-wider">BLU EYES FAMILY</span>
              )}
              <span>//</span>
              <span className="uppercase tracking-wider text-[var(--color-text-secondary)]">{demographic}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
              {currentInfo.title}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
              {currentInfo.desc}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-bold shadow-xs">
              {filteredProducts.length} Items Available
            </span>
          </div>
        </div>
      </section>

      {/* Horizontal Demographic Switcher */}
      <div className="w-full bg-[var(--color-canvas)] border-b border-[var(--color-border)] px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto no-scrollbar">
        <div className="max-w-[1600px] mx-auto flex items-center space-x-2">
          {demographicOptions.map((opt) => (
            <motion.button
              key={opt.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => {
                onSelectDemographic(opt.id)
                setSelectedAgeBracket('all')
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                demographic === opt.id
                  ? 'bg-[#175CD3] text-white shadow-xs'
                  : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft)]'
              }`}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Layout: Sticky Filter Sidebar (Desktop) & Responsive Grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Filter (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 text-left">
            <div className="sticky top-28 p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] flex items-center space-x-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#175CD3]" />
                  <span>Age & Fit Filters</span>
                </span>
                {selectedAgeBracket !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedAgeBracket('all')}
                    className="text-[11px] font-bold text-[#175CD3] dark:text-[#4E8DFF] hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Age Bracket Filter Chips */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-[var(--color-text-primary)] block uppercase">
                  Developmental Age Bracket
                </span>
                <div className="flex flex-col space-y-1.5">
                  {ageFilterOptions.map((opt) => {
                    const isSelected = selectedAgeBracket === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedAgeBracket(opt.id)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer flex items-center justify-between border ${
                          isSelected
                            ? 'bg-[#175CD3] border-[#175CD3] text-white shadow-xs'
                            : 'bg-[var(--color-surface-soft)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[#175CD3]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Sort Order Selector */}
              <div className="space-y-2 pt-3 border-t border-[var(--color-border)]">
                <span className="text-xs font-bold text-[var(--color-text-primary)] block uppercase">
                  Sort Collection
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
                  className="w-full p-2.5 rounded-xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] focus:outline-none focus:border-[#175CD3] cursor-pointer"
                >
                  <option value="featured">Featured Family Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9 space-y-6">
            {/* Horizontal Age Chips for Fast Finger Switching on All Devices */}
            <div className="p-3 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-between gap-3 text-left">
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[11px] font-bold text-[var(--color-text-secondary)] uppercase whitespace-nowrap hidden sm:inline">
                  AGE FILTER:
                </span>
                {ageFilterOptions.map((chip) => {
                  const isSelected = selectedAgeBracket === chip.id
                  return (
                    <motion.button
                      key={chip.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setSelectedAgeBracket(chip.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#F76C5E] text-white shadow-xs'
                          : 'bg-[var(--color-surface-soft)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[#F76C5E]'
                      }`}
                    >
                      {chip.label}
                    </motion.button>
                  )
                })}
              </div>

              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-1.5 rounded-full bg-[#175CD3] text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Product Cards Grid: 4 cols on desktop, 2 cols on mobile */}
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4">
                <p className="text-sm font-semibold text-[var(--color-text-secondary)]">
                  No items match the selected age bracket in this department.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedAgeBracket('all')}
                  className="px-5 py-2.5 rounded-full bg-[#175CD3] text-white text-xs font-bold uppercase cursor-pointer"
                >
                  Reset Age Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 text-left">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectProduct(product)}
                    className="group p-3 sm:p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#175CD3] transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md"
                  >
                    <div>
                      {/* Image container */}
                      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 mb-3">
                        <img
                          src={product.defaultImage}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-400"
                        />

                        {product.badge && (
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#F76C5E] text-white text-[9px] font-bold shadow-xs">
                            {product.badge}
                          </span>
                        )}

                        {product.matchFamilyTag && (
                          <span className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-white/95 dark:bg-black/95 backdrop-blur-xs text-[10px] font-bold text-[#175CD3] dark:text-[#4E8DFF] truncate text-center">
                            ♥ {product.matchFamilyTag}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 text-[10px] font-bold text-[var(--color-text-secondary)] uppercase">
                        <span>{product.demographic}</span>
                        <span>•</span>
                        <span>{product.sku}</span>
                      </div>

                      <h3 className="text-sm font-bold text-[var(--color-text-primary)] font-['Outfit'] mt-1 group-hover:text-[#175CD3] transition-colors line-clamp-1">
                        {product.title}
                      </h3>

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
            )}
          </main>
        </div>
      </div>

      {/* Mobile Slide-Up Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 lg:hidden">
          <div className="w-full max-h-[85vh] bg-[var(--color-surface)] rounded-t-3xl border-t border-[var(--color-border)] flex flex-col overflow-hidden text-left shadow-2xl">
            <div className="p-5 border-b border-[var(--color-border)] flex items-center justify-between">
              <span className="font-bold text-base text-[var(--color-text-primary)] font-['Outfit']">
                Filter by Age & Developmental Stage
              </span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 border border-[var(--color-border)] rounded-full text-[var(--color-text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase block">
                AGE BRACKET
              </span>
              <div className="grid grid-cols-1 gap-2">
                {ageFilterOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedAgeBracket(opt.id)
                      setMobileFilterOpen(false)
                    }}
                    className={`p-3 rounded-xl text-xs font-bold text-left border ${
                      selectedAgeBracket === opt.id
                        ? 'bg-[#175CD3] border-[#175CD3] text-white'
                        : 'bg-[var(--color-surface-soft)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
