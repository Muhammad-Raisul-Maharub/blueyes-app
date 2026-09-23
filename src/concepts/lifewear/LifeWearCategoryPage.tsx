import React, { useState, useMemo } from 'react'
import { Filter, X, Check, SlidersHorizontal } from 'lucide-react'
import type { Currency, LifeWearCategory, LifeWearProduct } from './types'
import { LIFEWEAR_PRODUCTS } from './lifewearData'

interface LifeWearCategoryPageProps {
  category: LifeWearCategory
  onSelectCategory: (cat: LifeWearCategory) => void
  currency: Currency
  onSelectProduct: (product: LifeWearProduct) => void
  onQuickAdd: (product: LifeWearProduct) => void
}

export const LifeWearCategoryPage: React.FC<LifeWearCategoryPageProps> = ({
  category,
  onSelectCategory,
  currency,
  onSelectProduct,
  onQuickAdd,
}) => {
  // Filter states
  const [selectedAgeBracket, setSelectedAgeBracket] = useState<string>('all')
  const [selectedGsmRange, setSelectedGsmRange] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'gsm-desc'>('featured')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({})

  const formatPrice = (priceBDT: number, priceUSD: number) => {
    if (currency === 'USD') return `$${priceUSD}`
    return `৳${priceBDT.toLocaleString()}`
  }

  const handleCategoryChange = (newCat: LifeWearCategory) => {
    onSelectCategory(newCat)
    setSelectedAgeBracket('all')
  }

  // Age filter definitions for Kids & Baby
  const babyAgeOptions = [
    { id: 'all', label: 'All Ages' },
    { id: '0-3M', label: '0–3 Months' },
    { id: '3-6M', label: '3–6 Months' },
    { id: '6-12M', label: '6–12 Months' },
    { id: '12-24M', label: '12–24 Months' },
  ]

  const kidsAgeOptions = [
    { id: 'all', label: 'All Ages' },
    { id: '2-7Y', label: 'Toddler (2–7 Years)' },
    { id: '8-15Y', label: 'Junior (8–15 Years)' },
  ]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = LIFEWEAR_PRODUCTS

    // Category filter
    if (category !== 'all') {
      list = list.filter((p) => p.category === category)
    }

    // Age / Lifecycle filter for Kids or Baby
    if ((category === 'kids' || category === 'baby') && selectedAgeBracket !== 'all') {
      list = list.filter((p) => p.ageBracket === selectedAgeBracket)
    }

    // GSM filter
    if (selectedGsmRange === 'light') {
      list = list.filter((p) => p.gsm <= 200)
    } else if (selectedGsmRange === 'mid') {
      list = list.filter((p) => p.gsm > 200 && p.gsm <= 300)
    } else if (selectedGsmRange === 'heavy') {
      list = list.filter((p) => p.gsm > 300)
    }

    // Sorting
    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') {
        const pA = currency === 'USD' ? a.priceUSD : a.priceBDT
        const pB = currency === 'USD' ? b.priceUSD : b.priceBDT
        return pA - pB
      }
      if (sortBy === 'price-desc') {
        const pA = currency === 'USD' ? a.priceUSD : a.priceBDT
        const pB = currency === 'USD' ? b.priceUSD : b.priceBDT
        return pB - pA
      }
      if (sortBy === 'gsm-desc') {
        return b.gsm - a.gsm
      }
      return 0
    })
  }, [category, selectedAgeBracket, selectedGsmRange, sortBy, currency])

  const categoryTitles: Record<LifeWearCategory, { title: string; subtitle: string }> = {
    all: {
      title: 'Full Technical Inventory',
      subtitle: 'Complete utilitarian wardrobe essentials engineered for high humidity & durability.',
    },
    women: {
      title: 'Women’s Utilitarian Essentials',
      subtitle: 'Seamless AIR-touch tops, relaxed European linen trousers, and packable DWR shells.',
    },
    men: {
      title: 'Men’s Daily LifeWear',
      subtitle: 'Heavyweight 240 GSM Supima, 2-ply pinpoint Oxford weave, and 4-way stretch chinos.',
    },
    kids: {
      title: 'Kids’ High-Durability Apparel',
      subtitle: 'Reinforced 200 GSM play tees, loopback French terry, and brushed cotton hoodies.',
    },
    baby: {
      title: 'Baby Gentle Essentials',
      subtitle: '100% organic unbleached cotton, Oeko-Tex nickel-free snaps, and 2-way zip sleepsuits.',
    },
    accessories: {
      title: 'Accessories & Daily Carry',
      subtitle: '500D ballistic Cordura, extra-fine Australian merino wool, and vulcanized gum rubber trainers.',
    },
  }

  const currentCategoryInfo = categoryTitles[category] || categoryTitles.all

  const handleColorClick = (productId: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedColors((prev) => ({ ...prev, [productId]: idx }))
  }

  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      {/* Category Header Banner */}
      <div className="w-full bg-[var(--color-surface)] border-b border-[var(--color-border)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-[var(--color-text-secondary)] mb-1">
              <span className="uppercase">BLU EYES LIFEWEAR</span>
              <span>/</span>
              <span className="uppercase text-[#004CE8] dark:text-[#387BFF] font-semibold">{category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] text-left">
              {currentCategoryInfo.title}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-2xl text-left">
              {currentCategoryInfo.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="px-2.5 py-1 bg-[var(--color-canvas)] border border-[var(--color-border)]">
              {filteredProducts.length} ITEMS CATALOGUED
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Department Switcher */}
      <div className="w-full bg-[var(--color-canvas)] border-b border-[var(--color-border)] px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto no-scrollbar">
        <div className="max-w-[1600px] mx-auto flex items-center space-x-2">
          {(['all', 'women', 'men', 'kids', 'baby', 'accessories'] as LifeWearCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1 text-[12px] font-mono uppercase tracking-wider transition-colors cursor-pointer border ${
                category === cat
                  ? 'bg-[#004CE8] border-[#004CE8] text-white font-semibold'
                  : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]'
              }`}
            >
              [{cat}]
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout: Sticky Sidebar on Desktop + 4-Col Grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Left Sidebar: Sticky Filter Matrix */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="sticky top-28 p-5 bg-[var(--color-surface)] border border-[var(--color-border)] space-y-6 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                <span className="text-[12px] font-mono font-bold tracking-wider uppercase text-[var(--color-text-primary)] flex items-center space-x-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#004CE8] dark:text-[#387BFF]" />
                  <span>FILTER SPECIFICATIONS</span>
                </span>
                {(selectedAgeBracket !== 'all' || selectedGsmRange !== 'all' || sortBy !== 'featured') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAgeBracket('all')
                      setSelectedGsmRange('all')
                      setSortBy('featured')
                    }}
                    className="text-[10px] font-mono text-[#004CE8] dark:text-[#387BFF] hover:underline cursor-pointer"
                  >
                    RESET
                  </button>
                )}
              </div>

              {/* DEDICATED AGE / LIFECYCLE FILTER FOR BABY */}
              {category === 'baby' && (
                <div className="space-y-3 pb-4 border-b border-[var(--color-border)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold uppercase text-[var(--color-text-primary)]">
                      AGE / LIFECYCLE (BABY)
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-text-secondary)]">MONTHS</span>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    {babyAgeOptions.map((opt) => {
                      const isSelected = selectedAgeBracket === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedAgeBracket(opt.id)}
                          className={`w-full py-1.5 px-2.5 text-[11px] font-mono text-left transition-colors cursor-pointer border flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#004CE8] border-[#004CE8] text-white font-semibold'
                              : 'bg-[var(--color-canvas)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-3 h-3" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* DEDICATED AGE / LIFECYCLE FILTER FOR KIDS */}
              {category === 'kids' && (
                <div className="space-y-3 pb-4 border-b border-[var(--color-border)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold uppercase text-[var(--color-text-primary)]">
                      AGE / LIFECYCLE (KIDS)
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-text-secondary)]">YEARS</span>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    {kidsAgeOptions.map((opt) => {
                      const isSelected = selectedAgeBracket === opt.id
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedAgeBracket(opt.id)}
                          className={`w-full py-1.5 px-2.5 text-[11px] font-mono text-left transition-colors cursor-pointer border flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#004CE8] border-[#004CE8] text-white font-semibold'
                              : 'bg-[var(--color-canvas)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-3 h-3" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* GSM Fabric Density Filter */}
              <div className="space-y-3 pb-4 border-b border-[var(--color-border)]">
                <span className="text-[11px] font-mono font-semibold uppercase text-[var(--color-text-primary)] block">
                  FABRIC DENSITY (GSM)
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'all', label: 'All GSM' },
                    { id: 'light', label: '≤200 Lightweight' },
                    { id: 'mid', label: '201–300 Mid' },
                    { id: 'heavy', label: '>300 Heavy' },
                  ].map((gsm) => (
                    <button
                      key={gsm.id}
                      type="button"
                      onClick={() => setSelectedGsmRange(gsm.id)}
                      className={`py-1 px-2 text-[10px] font-mono text-center transition-colors cursor-pointer border ${
                        selectedGsmRange === gsm.id
                          ? 'bg-[#004CE8] border-[#004CE8] text-white font-semibold'
                          : 'bg-[var(--color-canvas)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {gsm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By Selector */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-semibold uppercase text-[var(--color-text-primary)] block">
                  SORT ORDER
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'gsm-desc')}
                  className="w-full p-2 bg-[var(--color-canvas)] border border-[var(--color-border)] text-[11px] font-mono text-[var(--color-text-primary)] focus:outline-none focus:border-[#004CE8] cursor-pointer"
                >
                  <option value="featured">Featured Essentials</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="gsm-desc">Fabric Density: Highest GSM</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Toolbar: Active Filters & Mobile Filter Trigger */}
            <div className="flex items-center justify-between p-3 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono">
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[var(--color-text-secondary)] uppercase">ACTIVE:</span>
                <span className="px-2 py-0.5 bg-[var(--color-canvas)] border border-[var(--color-border)] text-[var(--color-text-primary)]">
                  {category.toUpperCase()}
                </span>
                {selectedAgeBracket !== 'all' && (
                  <span className="px-2 py-0.5 bg-[#004CE8] text-white font-semibold flex items-center space-x-1">
                    <span>AGE: {selectedAgeBracket}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedAgeBracket('all')}
                      className="hover:opacity-75 cursor-pointer ml-1"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedGsmRange !== 'all' && (
                  <span className="px-2 py-0.5 bg-[var(--color-canvas)] border border-[var(--color-border)] text-[var(--color-text-primary)]">
                    GSM: {selectedGsmRange.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3 py-1.5 bg-[#004CE8] text-white flex items-center space-x-1.5 cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>FILTERS</span>
              </button>
            </div>

            {/* If Baby or Kids, also render quick horizontal chips on top of the grid for fast fingertip switching */}
            {(category === 'baby' || category === 'kids') && (
              <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center space-x-2 overflow-x-auto no-scrollbar">
                <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase whitespace-nowrap">
                  AGE CHIPS:
                </span>
                {(category === 'baby' ? babyAgeOptions : kidsAgeOptions).map((chip) => {
                  const isSelected = selectedAgeBracket === chip.id
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => setSelectedAgeBracket(chip.id)}
                      className={`px-2.5 py-1 text-[11px] font-mono whitespace-nowrap transition-colors cursor-pointer border ${
                        isSelected
                          ? 'bg-[#004CE8] border-[#004CE8] text-white font-semibold'
                          : 'bg-[var(--color-canvas)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]'
                      }`}
                    >
                      {chip.label}
                    </button>
                  )
                })}
              </div>
            )}

            {/* 4-Column Desktop / 2-Column Mobile Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center border border-[var(--color-border)] bg-[var(--color-surface)]">
                <p className="font-mono text-sm text-[var(--color-text-secondary)] mb-4">
                  No items match the selected age or GSM parameters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAgeBracket('all')
                    setSelectedGsmRange('all')
                  }}
                  className="px-4 py-2 bg-[#004CE8] text-white font-mono text-xs cursor-pointer"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => {
                  const activeColorIndex = selectedColors[product.id] ?? 0
                  const activeColor = product.colors[activeColorIndex] || product.colors[0]
                  const displayImage = activeColor?.image || product.defaultImage

                  return (
                    <div
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      className="group bg-[var(--color-canvas)] border border-[var(--color-border)] hover:border-[#004CE8] transition-colors cursor-pointer flex flex-col"
                    >
                      {/* 4:5 Aspect Ratio Image Container */}
                      <div className="relative aspect-[4/5] bg-[var(--color-surface)] overflow-hidden">
                        <img
                          src={displayImage}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                        />

                        {/* Badges: GSM & Age Bracket */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <span className="px-1.5 py-0.5 bg-[var(--color-canvas)]/90 backdrop-blur-sm border border-[var(--color-border)] font-mono text-[9px] sm:text-[10px] font-semibold text-[var(--color-text-primary)]">
                            {product.gsm} GSM
                          </span>
                          {product.ageBracket && (
                            <span className="px-1.5 py-0.5 bg-[#004CE8] text-white font-mono text-[9px] font-bold tracking-wider">
                              AGE: {product.ageBracket}
                            </span>
                          )}
                        </div>

                        {/* Quick Add Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onQuickAdd(product)
                          }}
                          className="absolute bottom-0 inset-x-0 py-2.5 bg-[#004CE8] text-white font-mono text-[11px] font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <span>QUICK ADD</span>
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between text-left space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-text-secondary)] mb-1">
                            <span className="uppercase">{product.category}</span>
                            <span>{product.sku}</span>
                          </div>
                          <h3 className="text-[12px] sm:text-[13px] font-semibold text-[var(--color-text-primary)] line-clamp-1 group-hover:text-[#004CE8] transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] text-[var(--color-text-secondary)] font-mono line-clamp-1">
                            {product.spec}
                          </p>
                        </div>

                        {/* Swatches */}
                        <div className="flex items-center space-x-1">
                          {product.colors.map((color, idx) => (
                            <button
                              key={color.name}
                              type="button"
                              onClick={(e) => handleColorClick(product.id, idx, e)}
                              title={color.name}
                              className={`w-3 h-3 border transition-all cursor-pointer ${
                                idx === activeColorIndex
                                  ? 'border-[#004CE8] scale-110 ring-1 ring-[#004CE8]'
                                  : 'border-[var(--color-border)] hover:scale-105'
                              }`}
                              style={{ backgroundColor: color.hex }}
                            />
                          ))}
                        </div>

                        {/* Price */}
                        <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
                          <span className="font-mono text-[12px] sm:text-[13px] font-bold text-[var(--color-text-primary)]">
                            {formatPrice(product.priceBDT, product.priceUSD)}
                          </span>
                          {product.bundlePriceBDT && (
                            <span className="text-[9px] sm:text-[10px] font-mono text-[#004CE8] dark:text-[#387BFF]">
                              Bundle: {formatPrice(product.bundlePriceBDT, product.bundlePriceUSD!)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Slide-Up Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 lg:hidden">
          <div className="w-full max-h-[85vh] bg-[var(--color-canvas)] border-t border-[var(--color-border)] flex flex-col overflow-hidden text-left">
            <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-surface)]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                SPECIFICATION FILTERS
              </span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 border border-[var(--color-border)] text-[var(--color-text-primary)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-6">
              {/* Mobile Age Filter */}
              {category === 'baby' && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-semibold uppercase text-[var(--color-text-primary)] block">
                    AGE / LIFECYCLE (BABY)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {babyAgeOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedAgeBracket(opt.id)}
                        className={`p-2 text-[11px] font-mono text-center border ${
                          selectedAgeBracket === opt.id
                            ? 'bg-[#004CE8] border-[#004CE8] text-white font-semibold'
                            : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {category === 'kids' && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-semibold uppercase text-[var(--color-text-primary)] block">
                    AGE / LIFECYCLE (KIDS)
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {kidsAgeOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedAgeBracket(opt.id)}
                        className={`p-2 text-[11px] font-mono text-center border ${
                          selectedAgeBracket === opt.id
                            ? 'bg-[#004CE8] border-[#004CE8] text-white font-semibold'
                            : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile GSM Filter */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-semibold uppercase text-[var(--color-text-primary)] block">
                  FABRIC WEIGHT (GSM)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: 'All GSM' },
                    { id: 'light', label: '≤200 Light' },
                    { id: 'mid', label: '201–300 Mid' },
                    { id: 'heavy', label: '>300 Heavy' },
                  ].map((gsm) => (
                    <button
                      key={gsm.id}
                      type="button"
                      onClick={() => setSelectedGsmRange(gsm.id)}
                      className={`p-2 text-[11px] font-mono text-center border ${
                        selectedGsmRange === gsm.id
                          ? 'bg-[#004CE8] border-[#004CE8] text-white font-semibold'
                          : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                      }`}
                    >
                      {gsm.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedAgeBracket('all')
                  setSelectedGsmRange('all')
                }}
                className="flex-1 py-3 border border-[var(--color-border)] bg-[var(--color-canvas)] text-[11px] font-mono uppercase"
              >
                RESET
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#004CE8] text-white text-[11px] font-mono font-semibold uppercase"
              >
                APPLY ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
