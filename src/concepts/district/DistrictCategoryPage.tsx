import React, { useState, useMemo } from 'react'
import type { DistrictProduct, DistrictCategory } from './types'
import { DISTRICT_PRODUCTS } from './districtData'
import { Search, SlidersHorizontal, X, RotateCcw, ChevronDown, ArrowLeft } from 'lucide-react'

interface DistrictCategoryPageProps {
  category: DistrictCategory
  onSelectProduct: (product: DistrictProduct) => void
  onNavigateHome: () => void
  onSelectCategory: (category: DistrictCategory) => void
  onQuickAdd: (product: DistrictProduct) => void
  onBack?: () => void
}

export const DistrictCategoryPage: React.FC<DistrictCategoryPageProps> = ({
  category,
  onSelectProduct,
  onNavigateHome,
  onSelectCategory,
  onQuickAdd,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFit, setSelectedFit] = useState<string>('All')
  const [selectedGSM, setSelectedGSM] = useState<string>('All')
  const [selectedSize, setSelectedSize] = useState<string>('All')
  const [maxPrice, setMaxPrice] = useState<number>(5500)
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'gsm-desc'>('featured')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Products belonging to category
  const baseProducts = useMemo(() => {
    if (category === 'All') return DISTRICT_PRODUCTS
    return DISTRICT_PRODUCTS.filter((p) => p.category === category)
  }, [category])

  // Extract unique filter choices
  const fits = useMemo(() => {
    const set = new Set<string>()
    baseProducts.forEach((p) => set.add(p.fit))
    return Array.from(set)
  }, [baseProducts])

  const gsms = useMemo(() => {
    const set = new Set<string>()
    baseProducts.forEach((p) => {
      set.add(typeof p.gsm === 'number' ? `${p.gsm} GSM` : String(p.gsm))
    })
    return Array.from(set)
  }, [baseProducts])

  const sizes = useMemo(() => {
    const set = new Set<string>()
    baseProducts.forEach((p) => p.sizes.forEach((s) => set.add(s)))
    return Array.from(set)
  }, [baseProducts])

  // Active filter count
  const activeFilterCount =
    (selectedFit !== 'All' ? 1 : 0) +
    (selectedGSM !== 'All' ? 1 : 0) +
    (selectedSize !== 'All' ? 1 : 0) +
    (maxPrice < 5500 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0)

  const handleResetFilters = () => {
    setSelectedFit('All')
    setSelectedGSM('All')
    setSelectedSize('All')
    setMaxPrice(5500)
    setSearchQuery('')
    setSortBy('featured')
  }

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return baseProducts
      .filter((product) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchTitle = product.title.toLowerCase().includes(q)
          const matchFabric = product.fabric.toLowerCase().includes(q)
          const matchDesc = product.description.toLowerCase().includes(q)
          const matchFit = product.fit.toLowerCase().includes(q)
          if (!matchTitle && !matchFabric && !matchDesc && !matchFit) return false
        }

        // Fit
        if (selectedFit !== 'All' && product.fit !== selectedFit) {
          return false
        }

        // GSM
        if (selectedGSM !== 'All') {
          const productGsmStr = typeof product.gsm === 'number' ? `${product.gsm} GSM` : String(product.gsm)
          if (productGsmStr !== selectedGSM) return false
        }

        // Size
        if (selectedSize !== 'All' && !product.sizes.includes(selectedSize)) {
          return false
        }

        // Price
        if (product.priceBDT > maxPrice) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceBDT - b.priceBDT
        if (sortBy === 'price-desc') return b.priceBDT - a.priceBDT
        if (sortBy === 'gsm-desc') {
          const gsmA = typeof a.gsm === 'number' ? a.gsm : 0
          const gsmB = typeof b.gsm === 'number' ? b.gsm : 0
          return gsmB - gsmA
        }
        return 0
      })
  }, [baseProducts, searchQuery, selectedFit, selectedGSM, selectedSize, maxPrice, sortBy])

  return (
    <div className="w-full min-h-screen bg-[#F4F4F6] dark:bg-[#090A0E] text-[#090A0E] dark:text-white pb-24 transition-colors duration-200">
      {/* 1. Category Header & Sector Switcher */}
      <section className="w-full border-b border-[#E2E8F0] dark:border-[#2C3142] bg-white dark:bg-[#13151D]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
          {/* Breadcrumb & Back Button */}
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] uppercase tracking-wider text-[#64748B] dark:text-[#8E95A5] hover:text-[#0047FF] dark:hover:text-[#CCFF00] px-2.5 py-1 rounded bg-[#F4F4F6] dark:bg-[#1E2230] border border-[#E2E8F0] dark:border-[#2C3142] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK</span>
              </button>
            )}
            <div className="flex items-center gap-2 font-mono-tech text-[11px] uppercase tracking-wider text-[#64748B] dark:text-[#8E95A5]">
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-[#0047FF] dark:hover:text-[#CCFF00] transition-colors cursor-pointer"
              >
                DISTRICT
              </button>
              <span>//</span>
              <span className="text-[#0047FF] dark:text-[#CCFF00] font-bold">{category} SECTOR</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-[#0047FF] text-white font-mono-tech text-[9px] font-bold uppercase">
                  DROP PROTOCOL 02
                </span>
                <span className="font-mono-tech text-[10px] text-[#64748B] dark:text-[#8E95A5]">
                  CHATTOGRAM DISPATCH
                </span>
              </div>
              <h1 className="font-syne font-extrabold text-[30px] sm:text-[40px] text-[#090A0E] dark:text-white uppercase leading-tight">
                {category === 'All' ? 'COMPLETE DISTRICT ARCHIVE' : `${category} STREETWEAR`}
              </h1>
              <p className="font-dm text-[13px] sm:text-[14px] text-[#64748B] dark:text-[#94A3B8] max-w-xl mt-1">
                Engineered with high-density textile weights, industrial reinforcements, and raw brutalist cuts.
              </p>
            </div>

            {/* Quick Sector Switcher */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {(['All', 'Women', 'Men', 'Kids', 'Baby', 'Accessories'] as DistrictCategory[]).map(
                (dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => onSelectCategory(dept)}
                    className={`px-3 py-1.5 font-mono-tech text-[10.5px] font-bold uppercase border cursor-pointer transition-all ${
                      category === dept
                        ? 'bg-[#CCFF00] text-[#090A0E] border-[#CCFF00] shadow-[2px_2px_0px_0px_#0047FF]'
                        : 'bg-[#ECEEF2] dark:bg-[#090A0E] text-[#090A0E] dark:text-[#8E95A5] border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-white/40'
                    }`}
                  >
                    {dept}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Controls Bar (Search + Filter Trigger + Sort) */}
      <section className="sticky top-16 z-20 w-full bg-[#F4F4F6]/95 dark:bg-[#090A0E]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#2C3142]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Live Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#8E95A5] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${category} (e.g. 480 GSM, Cargo, Parachute, Romper)...`}
              className="w-full pl-9 pr-8 py-2 bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] font-mono-tech text-[12px] text-[#090A0E] dark:text-white placeholder-[#64748B] dark:placeholder-[#8E95A5] focus:outline-none focus:border-[#0047FF] dark:focus:border-[#CCFF00] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#8E95A5] hover:text-[#090A0E] dark:hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] font-mono-tech text-[11px] font-bold text-[#090A0E] dark:text-white hover:border-[#0047FF] dark:hover:border-[#CCFF00] cursor-pointer shadow-[2px_2px_0px_0px_#0047FF]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0047FF] dark:text-[#CCFF00]" />
              <span>FILTERS</span>
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#CCFF00] text-[#090A0E] text-[9px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] px-3 py-1.5">
              <span className="font-mono-tech text-[10px] text-[#64748B] dark:text-[#8E95A5] uppercase mr-2 hidden sm:inline">
                SORT:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'gsm-desc')}
                aria-label="Sort products"
                className="bg-transparent font-mono-tech text-[11px] font-bold uppercase text-[#090A0E] dark:text-white focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                <option value="featured" className="bg-white dark:bg-[#13151D] text-[#090A0E] dark:text-white">
                  FEATURED DROPS
                </option>
                <option value="price-asc" className="bg-white dark:bg-[#13151D] text-[#090A0E] dark:text-white">
                  PRICE: LOW TO HIGH
                </option>
                <option value="price-desc" className="bg-white dark:bg-[#13151D] text-[#090A0E] dark:text-white">
                  PRICE: HIGH TO LOW
                </option>
                <option value="gsm-desc" className="bg-white dark:bg-[#13151D] text-[#090A0E] dark:text-white">
                  GSM: HEAVY TO LIGHT
                </option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748B] dark:text-[#8E95A5] pointer-events-none absolute right-2" />
            </div>

            {/* Results Count */}
            <span className="font-mono-tech text-[11px] text-[#64748B] dark:text-[#8E95A5] hidden sm:inline">
              [{filteredProducts.length} CREATIONS]
            </span>
          </div>
        </div>
      </section>

      {/* 3. Catalog Layout: Desktop 4-Column Grid with Sticky Filter Sidebar */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* DESKTOP STICKY LEFT SIDEBAR (Col-span 3) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 space-y-5 bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] p-5 shadow-[3px_3px_0px_0px_#0047FF]">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2C3142] pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#0047FF] dark:text-[#CCFF00]" />
                <span className="font-syne font-extrabold text-[13px] uppercase tracking-wider text-[#090A0E] dark:text-white">
                  TECH FILTERS
                </span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="font-mono-tech text-[10px] text-[#0047FF] dark:text-[#CCFF00] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>RESET ({activeFilterCount})</span>
                </button>
              )}
            </div>

            {/* GSM Weight Filter */}
            {gsms.length > 0 && (
              <div>
                <span className="font-mono-tech text-[10.5px] uppercase font-bold text-[#64748B] dark:text-[#8E95A5] block mb-2">
                  FABRIC GSM WEIGHT
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-2 font-mono-tech text-[11px] text-[#090A0E]/80 dark:text-white/80 hover:text-[#0047FF] dark:hover:text-[#CCFF00] cursor-pointer">
                    <input
                      type="radio"
                      name="gsm"
                      checked={selectedGSM === 'All'}
                      onChange={() => setSelectedGSM('All')}
                      className="accent-[#0047FF] dark:accent-[#CCFF00]"
                    />
                    <span>ALL WEIGHTS</span>
                  </label>
                  {gsms.map((gsm) => (
                    <label
                      key={gsm}
                      className="flex items-center gap-2 font-mono-tech text-[11px] text-[#090A0E]/80 dark:text-white/80 hover:text-[#0047FF] dark:hover:text-[#CCFF00] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="gsm"
                        checked={selectedGSM === gsm}
                        onChange={() => setSelectedGSM(gsm)}
                        className="accent-[#0047FF] dark:accent-[#CCFF00]"
                      />
                      <span>{gsm}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Fit Filter */}
            {fits.length > 0 && (
              <div className="border-t border-[#E2E8F0] dark:border-[#2C3142] pt-4">
                <span className="font-mono-tech text-[10.5px] uppercase font-bold text-[#64748B] dark:text-[#8E95A5] block mb-2">
                  SILHOUETTE & FIT
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-2 font-space text-[12px] text-[#090A0E]/80 dark:text-white/80 hover:text-[#0047FF] dark:hover:text-[#CCFF00] cursor-pointer">
                    <input
                      type="radio"
                      name="fit"
                      checked={selectedFit === 'All'}
                      onChange={() => setSelectedFit('All')}
                      className="accent-[#0047FF] dark:accent-[#CCFF00]"
                    />
                    <span>All Silhouettes</span>
                  </label>
                  {fits.map((fit) => (
                    <label
                      key={fit}
                      className="flex items-center gap-2 font-space text-[12px] text-[#090A0E]/80 dark:text-white/80 hover:text-[#0047FF] dark:hover:text-[#CCFF00] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="fit"
                        checked={selectedFit === fit}
                        onChange={() => setSelectedFit(fit)}
                        className="accent-[#0047FF] dark:accent-[#CCFF00]"
                      />
                      <span className="truncate">{fit}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Size Filter */}
            {sizes.length > 0 && (
              <div className="border-t border-[#E2E8F0] dark:border-[#2C3142] pt-4">
                <span className="font-mono-tech text-[10.5px] uppercase font-bold text-[#64748B] dark:text-[#8E95A5] block mb-2">
                  SIZE SPEC
                </span>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedSize('All')}
                    className={`py-1.5 px-1 font-mono-tech text-[10px] font-bold uppercase border cursor-pointer transition-colors ${
                      selectedSize === 'All'
                        ? 'bg-[#CCFF00] text-[#090A0E] border-[#CCFF00]'
                        : 'bg-[#ECEEF2] dark:bg-[#090A0E] text-[#090A0E] dark:text-[#8E95A5] border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-white/40'
                    }`}
                  >
                    ALL
                  </button>
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(selectedSize === sz ? 'All' : sz)}
                      className={`py-1.5 px-1 font-mono-tech text-[10px] font-bold uppercase border cursor-pointer transition-colors truncate ${
                        selectedSize === sz
                          ? 'bg-[#CCFF00] text-[#090A0E] border-[#CCFF00]'
                          : 'bg-[#ECEEF2] dark:bg-[#090A0E] text-[#090A0E] dark:text-[#8E95A5] border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-white/40'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Filter */}
            <div className="border-t border-[#E2E8F0] dark:border-[#2C3142] pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-tech text-[10.5px] uppercase font-bold text-[#64748B] dark:text-[#8E95A5]">
                  MAX PRICE:
                </span>
                <span className="font-mono-tech text-[12px] font-bold text-[#0047FF] dark:text-[#CCFF00]">
                  ৳{maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="5500"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0047FF] dark:accent-[#CCFF00] cursor-pointer"
              />
              <div className="flex justify-between font-mono-tech text-[9px] text-[#64748B] dark:text-[#8E95A5] mt-1">
                <span>৳1,000</span>
                <span>৳5,500</span>
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID (Col-span 9) */}
          <main className="lg:col-span-9 mt-6 lg:mt-0">
            {filteredProducts.length === 0 ? (
              <div className="py-24 px-4 bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] flex flex-col items-center justify-center text-center">
                <Search className="w-10 h-10 text-[#64748B] dark:text-[#8E95A5] mb-3 opacity-40" />
                <h3 className="font-syne font-bold text-[22px] text-[#090A0E] dark:text-white uppercase mb-2">
                  NO MATCHING DROPS
                </h3>
                <p className="font-dm text-[13px] text-[#64748B] dark:text-[#8E95A5] max-w-sm mb-6">
                  Adjust your GSM weight or size filters to display active inventory.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-[#CCFF00] text-[#090A0E] font-mono-tech text-[11px] font-bold uppercase tracking-wider hover:bg-white cursor-pointer shadow-[2px_2px_0px_0px_#0047FF]"
                >
                  RESET ALL FILTERS
                </button>
              </div>
            ) : (
              /* Responsive Grid: 2 columns on mobile, 4 columns on desktop */
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-[#CCFF00] transition-all p-2.5 sm:p-3 flex flex-col group cursor-pointer shadow-sm hover:shadow-[3px_3px_0px_0px_#0047FF] dark:hover:shadow-[3px_3px_0px_0px_#CCFF00]"
                  >
                    {/* Image Box */}
                    <div className="relative w-full aspect-[4/5] bg-[#ECEEF2] dark:bg-[#090A0E] overflow-hidden border border-[#E2E8F0] dark:border-[#2C3142]">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#CCFF00] text-[#090A0E] font-mono-tech text-[8.5px] sm:text-[9px] font-extrabold uppercase shadow-sm">
                          {product.badge}
                        </div>
                      )}

                      {/* GSM Tag */}
                      <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/80 text-white font-mono-tech text-[8.5px] font-bold uppercase backdrop-blur-sm">
                        {typeof product.gsm === 'number' ? `${product.gsm} GSM` : product.gsm}
                      </div>

                      {/* Low Stock Indicator Tag */}
                      {product.stockLeft <= 8 && (
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#FF2A4B] text-white font-mono-tech text-[8px] font-bold uppercase animate-pulse">
                          LOW STOCK
                        </div>
                      )}
                    </div>

                    {/* Product Metadata */}
                    <div className="pt-2.5 pb-1 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="font-mono-tech text-[8.5px] sm:text-[9px] text-[#64748B] dark:text-[#8E95A5] uppercase font-bold block mb-1 truncate">
                          {product.category} // {product.fit}
                        </span>
                        <h4 className="font-space font-bold text-[13px] sm:text-[15px] text-[#090A0E] dark:text-white group-hover:text-[#0047FF] dark:group-hover:text-[#CCFF00] transition-colors line-clamp-1 leading-snug">
                          {product.title}
                        </h4>
                        <p className="font-dm text-[11px] text-[#64748B] dark:text-[#8E95A5] line-clamp-1 mt-0.5">
                          {product.fabric}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] dark:border-[#2C3142] flex items-center justify-between">
                        <div>
                          <span className="font-mono-tech font-extrabold text-[13px] sm:text-[15px] text-[#090A0E] dark:text-white block">
                            ৳{product.priceBDT.toLocaleString()}
                          </span>
                          <span className="font-mono-tech text-[9.5px] text-[#64748B] dark:text-[#8E95A5]">
                            (${product.priceUSD})
                          </span>
                        </div>

                        {/* QUICK ADD Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onQuickAdd(product)
                          }}
                          className="px-2.5 sm:px-3 py-1 bg-[#CCFF00] text-[#090A0E] font-mono-tech text-[9px] sm:text-[10px] font-extrabold uppercase hover:bg-[#0047FF] hover:text-white dark:hover:bg-white dark:hover:text-[#090A0E] active:scale-95 transition-all shadow-[2px_2px_0px_0px_#0047FF] cursor-pointer flex-shrink-0"
                        >
                          QUICK ADD
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FLOATING FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm lg:hidden animate-fadeIn">
          <div className="flex-1" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="w-[85%] max-w-sm h-full bg-white dark:bg-[#090A0E] text-[#090A0E] dark:text-white border-l border-[#E2E8F0] dark:border-[#2C3142] flex flex-col shadow-2xl animate-slideInRight">
            <div className="p-4 bg-[#ECEEF2] dark:bg-[#13151D] border-b border-[#E2E8F0] dark:border-[#2C3142] flex items-center justify-between">
              <div className="flex items-center gap-2 font-syne font-bold text-[13px] uppercase">
                <SlidersHorizontal className="w-4 h-4 text-[#0047FF] dark:text-[#CCFF00]" />
                <span>FILTER {category}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-[#090A0E]/70 dark:text-white/70 hover:text-[#0047FF] dark:hover:text-[#CCFF00] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* GSM */}
              {gsms.length > 0 && (
                <div>
                  <span className="font-mono-tech text-[10px] uppercase font-bold text-[#64748B] dark:text-[#8E95A5] block mb-2">
                    FABRIC GSM WEIGHT
                  </span>
                  <div className="flex flex-col gap-2 font-mono-tech text-[11px]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mob-gsm"
                        checked={selectedGSM === 'All'}
                        onChange={() => setSelectedGSM('All')}
                        className="accent-[#0047FF] dark:accent-[#CCFF00]"
                      />
                      <span>ALL WEIGHTS</span>
                    </label>
                    {gsms.map((gsm) => (
                      <label key={gsm} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mob-gsm"
                          checked={selectedGSM === gsm}
                          onChange={() => setSelectedGSM(gsm)}
                          className="accent-[#0047FF] dark:accent-[#CCFF00]"
                        />
                        <span>{gsm}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Fit */}
              {fits.length > 0 && (
                <div className="border-t border-[#E2E8F0] dark:border-[#2C3142] pt-4">
                  <span className="font-mono-tech text-[10px] uppercase font-bold text-[#64748B] dark:text-[#8E95A5] block mb-2">
                    SILHOUETTE & FIT
                  </span>
                  <div className="flex flex-col gap-2 font-space text-[12px]">
                    {fits.map((fit) => (
                      <label key={fit} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mob-fit"
                          checked={selectedFit === fit}
                          onChange={() => setSelectedFit(fit)}
                          className="accent-[#0047FF] dark:accent-[#CCFF00]"
                        />
                        <span>{fit}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="border-t border-[#E2E8F0] dark:border-[#2C3142] pt-4">
                <div className="flex justify-between font-mono-tech text-[11px] mb-1.5 font-bold">
                  <span>MAX PRICE:</span>
                  <span className="text-[#0047FF] dark:text-[#CCFF00]">৳{maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="5500"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#0047FF] dark:accent-[#CCFF00]"
                />
              </div>
            </div>

            <div className="p-4 bg-[#ECEEF2] dark:bg-[#13151D] border-t border-[#E2E8F0] dark:border-[#2C3142] flex gap-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex-1 py-3 font-mono-tech text-[11px] uppercase border border-[#E2E8F0] dark:border-[#2C3142] hover:bg-white dark:hover:bg-[#1B1E2B] cursor-pointer font-bold"
              >
                RESET
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#CCFF00] text-[#090A0E] font-syne text-[11px] uppercase font-extrabold cursor-pointer shadow-[2px_2px_0px_0px_#0047FF]"
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
