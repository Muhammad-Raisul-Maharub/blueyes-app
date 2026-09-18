import React, { useState, useMemo } from 'react'
import type { Product, Demographic, GarmentSize, GarmentFit } from './types'
import { ATELIER_PRODUCTS, AUTOCOMPLETE_TAGS } from './atelierData'
import { Search, X, SlidersHorizontal, ArrowUpDown, Filter, Check } from 'lucide-react'

interface AtelierCurateProps {
  initialDemographic?: Demographic
  onSelectProduct: (product: Product) => void
}

type PriceFilter = 'All' | 'under-10k' | '10k-20k' | 'over-20k'

export const AtelierCurate: React.FC<AtelierCurateProps> = ({
  initialDemographic = 'All',
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDemographic, setSelectedDemographic] = useState<Demographic>(initialDemographic)
  const [selectedSize, setSelectedSize] = useState<string>('All')
  const [selectedFit, setSelectedFit] = useState<string>('All')
  const [selectedPrice, setSelectedPrice] = useState<PriceFilter>('All')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured')

  const demographics: Demographic[] = ['All', 'Women', 'Men', 'Kids', 'Baby', 'Accessories']
  const sizes: (string | GarmentSize)[] = ['All', '38 / XS', '40 / S', '42 / M', '44 / L', '46 / XL', 'Bespoke M2M']
  const fits: (string | GarmentFit)[] = ['All', 'Architectural Slim', 'Fluid Draped', 'Relaxed Atelier', 'Structured Tailoring']

  // Filter logic
  const filteredProducts = useMemo(() => {
    return ATELIER_PRODUCTS.filter((product) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = product.title.toLowerCase().includes(q)
        const matchDesc = product.description.toLowerCase().includes(q)
        const matchComp = product.composition.toLowerCase().includes(q)
        const matchCategory = product.category.toLowerCase().includes(q)
        if (!matchTitle && !matchDesc && !matchComp && !matchCategory) return false
      }

      // Demographic
      if (selectedDemographic !== 'All' && product.category !== selectedDemographic) {
        return false
      }

      // Size
      if (selectedSize !== 'All' && !product.sizes.includes(selectedSize as GarmentSize)) {
        return false
      }

      // Fit
      if (selectedFit !== 'All' && !product.fits.includes(selectedFit as GarmentFit)) {
        return false
      }

      // Price
      if (selectedPrice === 'under-10k' && product.priceBDT >= 10000) return false
      if (selectedPrice === '10k-20k' && (product.priceBDT < 10000 || product.priceBDT > 20000)) return false
      if (selectedPrice === 'over-20k' && product.priceBDT <= 20000) return false

      return true
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceBDT - b.priceBDT
      if (sortBy === 'price-desc') return b.priceBDT - a.priceBDT
      return 0
    })
  }, [searchQuery, selectedDemographic, selectedSize, selectedFit, selectedPrice, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedDemographic('All')
    setSelectedSize('All')
    setSelectedFit('All')
    setSelectedPrice('All')
  }

  const activeFilterCount =
    (selectedDemographic !== 'All' ? 1 : 0) +
    (selectedSize !== 'All' ? 1 : 0) +
    (selectedFit !== 'All' ? 1 : 0) +
    (selectedPrice !== 'All' ? 1 : 0)

  // Reusable Filter Content (used in Desktop Sidebar and Mobile Modal)
  const renderFilterPanel = () => (
    <div className="flex flex-col gap-6">
      {/* Category / Demographic */}
      <div>
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-bronze)] block mb-2.5">
          Curated Department
        </span>
        <div className="flex flex-col gap-1.5">
          {demographics.map((dem) => (
            <button
              key={dem}
              type="button"
              onClick={() => setSelectedDemographic(dem)}
              className={`text-left text-[12px] font-sans px-2.5 py-1.5 transition-colors cursor-pointer flex items-center justify-between ${
                selectedDemographic === dem
                  ? 'bg-[var(--color-card)] text-[var(--color-accent-blue)] font-semibold border-l-2 border-[var(--color-accent-blue)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <span>{dem === 'All' ? 'All Pieces' : `${dem}'s Salon`}</span>
              {selectedDemographic === dem && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Garment Size */}
      <div>
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-bronze)] block mb-2.5">
          Garment Dimension / Size
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSelectedSize(s)}
              className={`px-2 py-1.5 text-[10px] font-sans uppercase tracking-wider text-center border cursor-pointer transition-colors ${
                selectedSize === s
                  ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] border-[var(--color-text-primary)] font-semibold'
                  : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-text-primary)]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Fit & Silhouette */}
      <div>
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-bronze)] block mb-2.5">
          Atelier Silhouette
        </span>
        <div className="flex flex-col gap-1.5">
          {fits.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedFit(f)}
              className={`text-left text-[11px] font-sans px-2.5 py-1.5 border transition-colors cursor-pointer ${
                selectedFit === f
                  ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] border-[var(--color-text-primary)] font-semibold'
                  : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-text-primary)]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-bronze)] block mb-2.5">
          Price Range
        </span>
        <div className="flex flex-col gap-1.5">
          {[
            { id: 'All', label: 'All Values' },
            { id: 'under-10k', label: 'Under ৳10,000' },
            { id: '10k-20k', label: '৳10,000 – ৳20,000' },
            { id: 'over-20k', label: '৳20,000 & Above' },
          ].map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedPrice(tier.id as PriceFilter)}
              className={`text-left text-[11px] font-sans px-2.5 py-1.5 border transition-colors cursor-pointer ${
                selectedPrice === tier.id
                  ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] border-[var(--color-text-primary)] font-semibold'
                  : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-text-primary)]'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-28 animate-fadeIn">
      {/* Search Header Bar */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-4 sm:p-6 mb-6 shadow-sm transition-colors">
        {/* Search Input */}
        <div className="relative flex items-center w-full bg-[var(--color-card-subtle)] border border-[var(--color-border)] focus-within:border-[var(--color-accent-blue)] transition-colors">
          <Search className="w-4 h-4 text-[var(--color-text-muted)] ml-3.5 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search silk, tailoring, panjabi, bridal, cashmere..."
            className="w-full py-3 px-3 text-[13px] sm:text-[14px] font-sans text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none bg-transparent"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="p-2.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Autocomplete Quick Suggestion Tags */}
        <div className="flex gap-2 overflow-x-auto pt-3 scrollbar-none items-center">
          <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-bronze)] font-semibold flex-shrink-0 mr-1">
            Tags:
          </span>
          {AUTOCOMPLETE_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchQuery(tag)}
              className={`flex-shrink-0 px-3 py-1 text-[11px] font-sans uppercase tracking-wider transition-colors cursor-pointer border ${
                searchQuery.toLowerCase() === tag.toLowerCase()
                  ? 'bg-[var(--color-accent-blue)] text-white border-[var(--color-accent-blue)]'
                  : 'bg-[var(--color-card)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-text-primary)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Top Results & Sort Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-6">
        <div className="flex items-baseline gap-3">
          <h2 className="font-serif text-[22px] sm:text-[28px] text-[var(--color-text-primary)]">
            Curated Archive
          </h2>
          <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[var(--color-accent-bronze)]">
            ({filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'})
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Trigger Button */}
          <button
            type="button"
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-[11px] font-sans uppercase tracking-wider font-semibold cursor-pointer shadow-sm hover:border-[var(--color-accent-blue)]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-wider text-[var(--color-text-secondary)]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
              className="bg-[var(--color-card)] border border-[var(--color-border)] px-2.5 py-1.5 text-[var(--color-text-primary)] font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Archive</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Sticky Sidebar (Desktop) + Product Grid */}
      <div className="flex gap-8 items-start">
        {/* Desktop Sticky Left Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 bg-[var(--color-card)] border border-[var(--color-border)] p-5 shadow-sm transition-colors">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border)]">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[var(--color-accent-blue)]" />
              Faceted Filters
            </span>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-[10px] font-sans uppercase tracking-wider text-[var(--color-accent-blue)] underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          {renderFilterPanel()}
        </aside>

        {/* Product Grid (4-cols on Desktop, 2-cols on Mobile) */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="bg-[var(--color-card)] border border-[var(--color-border)] p-3 flex flex-col group cursor-pointer hover:border-[var(--color-accent-blue)] hover:shadow-md transition-all duration-200"
                >
                  {/* Portrait Aspect Ratio */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--color-surface-container)]">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {product.badge && (
                      <div className="absolute top-2.5 left-2.5 bg-[var(--color-accent-bronze-light)] text-[var(--color-accent-bronze-dark)] px-2 py-0.5 text-[9px] font-sans font-semibold uppercase tracking-wider shadow-sm">
                        {product.badge}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 pb-1 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[9px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] block">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-[15px] text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors line-clamp-1 mt-0.5">
                        {product.title}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[var(--color-border)] flex items-baseline justify-between">
                      <span className="text-[13px] font-sans font-semibold text-[var(--color-text-primary)] tabular-nums">
                        ৳{product.priceBDT.toLocaleString()}
                      </span>
                      <span className="text-[11px] font-sans text-[var(--color-text-muted)]">
                        (${product.priceUSD})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center p-8 bg-[var(--color-card)] border border-[var(--color-border)]">
              <p className="font-serif text-[22px] text-[var(--color-text-primary)] italic mb-2">
                No Pieces Match Your Curation
              </p>
              <p className="text-[13px] font-sans text-[var(--color-text-muted)] max-w-sm mb-6">
                Try clearing selected filters or modifying your query to discover pieces in the wider archive.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[11px] font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-blue)] cursor-pointer shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Faceted Filter Drawer / Slide-Over Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden animate-fadeIn">
          <div className="w-[85%] max-w-sm h-full bg-[var(--color-canvas)] border-l border-[var(--color-border)] flex flex-col justify-between p-5 shadow-2xl overflow-y-auto animate-slideInRight">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)] mb-5">
                <span className="text-[12px] font-sans uppercase tracking-[0.2em] font-bold text-[var(--color-text-primary)]">
                  Faceted Filters
                </span>
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1.5 text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {renderFilterPanel()}
            </div>

            <div className="pt-6 border-t border-[var(--color-border)] flex gap-2 mt-6">
              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 py-3 text-[11px] font-sans uppercase tracking-wider border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 py-3 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[11px] font-sans uppercase tracking-wider font-semibold hover:bg-[var(--color-accent-blue)] cursor-pointer"
              >
                View ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
