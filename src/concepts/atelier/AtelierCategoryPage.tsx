import React, { useState, useMemo } from 'react'
import type { Product, Demographic, GarmentSize } from './types'
import { ATELIER_PRODUCTS } from './atelierData'
import {
  Search,
  SlidersHorizontal,
  X,
  Heart,
  ArrowRight,
  ChevronDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react'

interface AtelierCategoryPageProps {
  category: Demographic
  onSelectProduct: (product: Product) => void
  onNavigateHome: () => void
  onSelectCategory: (category: Demographic) => void
}

export const AtelierCategoryPage: React.FC<AtelierCategoryPageProps> = ({
  category,
  onSelectProduct,
  onNavigateHome,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSilhouette, setSelectedSilhouette] = useState<string>('All')
  const [selectedFabric, setSelectedFabric] = useState<string>('All')
  const [selectedSize, setSelectedSize] = useState<string>('All')
  const [maxPrice, setMaxPrice] = useState<number>(35000)
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  // Editorial details for category headers
  const categoryHeaders: Record<
    Demographic,
    { title: string; subtitle: string; tag: string; description: string }
  > = {
    All: {
      title: 'Complete Atelier Archive',
      subtitle: 'Haute Couture & Heritage Masterpieces',
      tag: 'Grand Collection',
      description:
        'Every hand-loomed and architecturally tailored creation produced inside Maison Chattogram.',
    },
    Women: {
      title: "Women's Haute Salon",
      subtitle: 'Draped Mulberry Silks & Bengal Jamdani Capes',
      tag: 'Salon Première',
      description:
        'Fluid silhouettes converging Rajshahi 22-momme pure silk with architectural pattern-cutting and 200-count Jamdani muslin.',
    },
    Men: {
      title: "Men's Imperial Sartorial",
      subtitle: 'Rajshahi Raw Silk Panjabis & Super 160s Tuxedos',
      tag: 'Imperial Tailoring',
      description:
        'Heritage eastern tailoring elevated with unlined raw silk construction, Giza cotton monograms, and razor-sharp evening suiting.',
    },
    Kids: {
      title: 'Kids Festive & Formal (2–15Y)',
      subtitle: 'Royal Velvet Sherwanis & Silk Pleated Frocks',
      tag: 'Youth Bespoke',
      description:
        'Heirloom ceremonial attire for young ladies and gentlemen, handcrafted with gentle hypoallergenic silk linings.',
    },
    Baby: {
      title: 'Baby Heirloom Layette (0–2Y)',
      subtitle: 'Organic Bengal Muslin & Spun Cashmere',
      tag: 'Newborn Heritage',
      description:
        'Gentle botanical-dyed heirloom garments and receiving sets tailored to cherish the beginning of life.',
    },
    Accessories: {
      title: 'Accessories & 24K Gold Objects',
      subtitle: 'Hand-hammered Cufflinks & Italian Leather',
      tag: 'Atelier Artifacts',
      description:
        'Sculptural finishing touches: 24K gold-plated maritime cufflinks, hand-spun Changthangi pashminas, and vegetable-tanned leather bags.',
    },
  }

  const currentHeader = categoryHeaders[category] || categoryHeaders['All']

  // Category products
  const categoryProducts = useMemo(() => {
    if (category === 'All') return ATELIER_PRODUCTS
    return ATELIER_PRODUCTS.filter((p) => p.category === category)
  }, [category])

  // Extract available filter options
  const silhouettes = useMemo(() => {
    const set = new Set<string>()
    categoryProducts.forEach((p) => {
      if (p.silhouette) set.add(p.silhouette)
    })
    return Array.from(set)
  }, [categoryProducts])

  const fabrics = useMemo(() => {
    const set = new Set<string>()
    categoryProducts.forEach((p) => {
      if (p.fabric) set.add(p.fabric)
    })
    return Array.from(set)
  }, [categoryProducts])

  const availableSizes = useMemo(() => {
    const set = new Set<GarmentSize>()
    categoryProducts.forEach((p) => {
      p.sizes.forEach((s) => set.add(s))
    })
    return Array.from(set)
  }, [categoryProducts])

  // Subcategories for quick chips
  const subcategories = useMemo(() => {
    const set = new Set<string>()
    categoryProducts.forEach((p) => {
      if (p.subcategory) set.add(p.subcategory)
    })
    return Array.from(set)
  }, [categoryProducts])

  // Active filter count
  const activeFilterCount =
    (selectedSilhouette !== 'All' ? 1 : 0) +
    (selectedFabric !== 'All' ? 1 : 0) +
    (selectedSize !== 'All' ? 1 : 0) +
    (maxPrice < 35000 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0)

  const handleResetFilters = () => {
    setSelectedSilhouette('All')
    setSelectedFabric('All')
    setSelectedSize('All')
    setMaxPrice(35000)
    setSearchQuery('')
    setSortBy('featured')
  }

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return categoryProducts
      .filter((product) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchesTitle = product.title.toLowerCase().includes(q)
          const matchesFabric = product.fabric.toLowerCase().includes(q)
          const matchesDesc = product.description.toLowerCase().includes(q)
          const matchesSub = product.subcategory?.toLowerCase().includes(q)
          if (!matchesTitle && !matchesFabric && !matchesDesc && !matchesSub) {
            return false
          }
        }

        // Silhouette
        if (selectedSilhouette !== 'All' && product.silhouette !== selectedSilhouette) {
          return false
        }

        // Fabric
        if (selectedFabric !== 'All' && product.fabric !== selectedFabric) {
          return false
        }

        // Size
        if (selectedSize !== 'All' && !product.sizes.includes(selectedSize as GarmentSize)) {
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
        return 0
      })
  }, [
    categoryProducts,
    searchQuery,
    selectedSilhouette,
    selectedFabric,
    selectedSize,
    maxPrice,
    sortBy,
  ])

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] pb-24 transition-colors">
      {/* 1. Category Breadcrumb & Editorial Header */}
      <section className="w-full border-b border-[var(--color-border)] bg-[var(--color-card)] transition-colors">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-3">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-[var(--color-accent-blue)] transition-colors cursor-pointer"
            >
              Maison Home
            </button>
            <span>/</span>
            <span className="text-[var(--color-text-primary)] font-semibold">{category}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-[var(--color-accent-bronze)] font-semibold">
                  {currentHeader.tag}
                </span>
                <span className="text-[var(--color-text-muted)]">•</span>
                <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  Maison Chattogram
                </span>
              </div>
              <h1 className="font-serif text-[28px] sm:text-[38px] lg:text-[44px] text-[var(--color-text-primary)] leading-tight">
                {currentHeader.title}
              </h1>
              <p className="text-[13px] sm:text-[14px] font-sans text-[var(--color-text-secondary)] max-w-2xl mt-1 leading-relaxed">
                {currentHeader.description}
              </p>
            </div>

            {/* Department Quick Switcher Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {(['Women', 'Men', 'Kids', 'Baby', 'Accessories'] as Demographic[]).map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => onSelectCategory(dept)}
                  className={`px-3 py-1.5 text-[11px] font-sans uppercase tracking-[0.14em] font-medium border cursor-pointer transition-all ${
                    category === dept
                      ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] border-[var(--color-text-primary)] font-semibold shadow-sm'
                      : 'bg-[var(--color-card-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Chips if available */}
          {subcategories.length > 0 && (
            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[var(--color-border)] overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[var(--color-text-muted)] flex-shrink-0">
                Silhouettes:
              </span>
              <button
                type="button"
                onClick={() => setSelectedSilhouette('All')}
                className={`px-3 py-1 text-[10px] font-sans uppercase tracking-wider rounded-full cursor-pointer transition-colors ${
                  selectedSilhouette === 'All'
                    ? 'bg-[var(--color-accent-blue)] text-white font-semibold'
                    : 'bg-[var(--color-card-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                All Pieces ({categoryProducts.length})
              </button>
              {silhouettes.map((sil) => (
                <button
                  key={sil}
                  type="button"
                  onClick={() => setSelectedSilhouette(sil === selectedSilhouette ? 'All' : sil)}
                  className={`px-3 py-1 text-[10px] font-sans uppercase tracking-wider rounded-full cursor-pointer transition-colors flex-shrink-0 ${
                    selectedSilhouette === sil
                      ? 'bg-[var(--color-accent-blue)] text-white font-semibold'
                      : 'bg-[var(--color-card-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {sil}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. Controls Bar (Search + Filter Trigger + Sort) */}
      <section className="sticky top-16 z-20 w-full bg-[var(--color-header-bg)] backdrop-blur-md border-b border-[var(--color-border)] transition-colors">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search within ${category} (e.g. Silk, Jamdani, Panjabi)...`}
              className="w-full pl-9 pr-8 py-2 bg-[var(--color-card)] border border-[var(--color-border)] text-[12px] font-sans text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-blue)] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
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
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-[var(--color-card)] border border-[var(--color-border)] text-[11px] font-sans uppercase tracking-wider text-[var(--color-text-primary)] hover:border-[var(--color-accent-blue)] cursor-pointer transition-colors shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--color-accent-blue)]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[var(--color-accent-blue)] text-white text-[9px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-[var(--color-card)] border border-[var(--color-border)] px-3 py-1.5">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[var(--color-text-muted)] mr-2 hidden sm:inline">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
                aria-label="Sort products"
                className="bg-transparent text-[11px] font-sans uppercase tracking-wider text-[var(--color-text-primary)] focus:outline-none cursor-pointer pr-4 appearance-none font-medium"
              >
                <option value="featured">Featured Archive</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-muted)] pointer-events-none absolute right-2" />
            </div>

            {/* Total Results Count */}
            <span className="text-[11px] font-sans text-[var(--color-text-muted)] hidden sm:inline">
              Showing <strong>{filteredProducts.length}</strong> creations
            </span>
          </div>
        </div>
      </section>

      {/* 3. Catalog Layout: Desktop 4-Column Grid with Sticky Left Sidebar */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* DESKTOP STICKY LEFT SIDEBAR (Col-span 3) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 space-y-6 bg-[var(--color-card)] border border-[var(--color-border)] p-5 shadow-sm transition-colors">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[var(--color-accent-bronze)]" />
                <span className="text-[12px] font-sans uppercase tracking-[0.2em] font-semibold text-[var(--color-text-primary)]">
                  Atelier Filters
                </span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[10px] font-sans uppercase tracking-wider text-[var(--color-accent-blue)] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ({activeFilterCount})</span>
                </button>
              )}
            </div>

            {/* Silhouette Filter */}
            {silhouettes.length > 0 && (
              <div>
                <span className="text-[11px] font-sans uppercase tracking-[0.16em] font-semibold text-[var(--color-text-primary)] block mb-2.5">
                  Silhouette & Cut
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-2.5 text-[12px] font-sans text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer">
                    <input
                      type="radio"
                      name="silhouette"
                      checked={selectedSilhouette === 'All'}
                      onChange={() => setSelectedSilhouette('All')}
                      className="text-[var(--color-accent-blue)] focus:ring-0 cursor-pointer"
                    />
                    <span>All Silhouettes</span>
                  </label>
                  {silhouettes.map((sil) => (
                    <label
                      key={sil}
                      className="flex items-center gap-2.5 text-[12px] font-sans text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="silhouette"
                        checked={selectedSilhouette === sil}
                        onChange={() => setSelectedSilhouette(sil)}
                        className="text-[var(--color-accent-blue)] focus:ring-0 cursor-pointer"
                      />
                      <span>{sil}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Fabric Filter */}
            {fabrics.length > 0 && (
              <div className="border-t border-[var(--color-border)] pt-4">
                <span className="text-[11px] font-sans uppercase tracking-[0.16em] font-semibold text-[var(--color-text-primary)] block mb-2.5">
                  Fabric & Weave
                </span>
                <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
                  <label className="flex items-center gap-2.5 text-[12px] font-sans text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer">
                    <input
                      type="radio"
                      name="fabric"
                      checked={selectedFabric === 'All'}
                      onChange={() => setSelectedFabric('All')}
                      className="text-[var(--color-accent-blue)] focus:ring-0 cursor-pointer"
                    />
                    <span>All Loom Weaves</span>
                  </label>
                  {fabrics.map((fab) => (
                    <label
                      key={fab}
                      className="flex items-center gap-2.5 text-[12px] font-sans text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="fabric"
                        checked={selectedFabric === fab}
                        onChange={() => setSelectedFabric(fab)}
                        className="text-[var(--color-accent-blue)] focus:ring-0 cursor-pointer"
                      />
                      <span className="truncate">{fab}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Size Filter */}
            {availableSizes.length > 0 && (
              <div className="border-t border-[var(--color-border)] pt-4">
                <span className="text-[11px] font-sans uppercase tracking-[0.16em] font-semibold text-[var(--color-text-primary)] block mb-2.5">
                  Garment Dimension / Size
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedSize('All')}
                    className={`py-2 px-1 text-[10px] font-sans uppercase tracking-wider text-center border cursor-pointer transition-colors ${
                      selectedSize === 'All'
                        ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] border-[var(--color-text-primary)] font-semibold'
                        : 'bg-[var(--color-card-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent-blue)]'
                    }`}
                  >
                    All Sizes
                  </button>
                  {availableSizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(selectedSize === sz ? 'All' : sz)}
                      className={`py-2 px-1 text-[10px] font-sans uppercase tracking-wider text-center border cursor-pointer transition-colors ${
                        selectedSize === sz
                          ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] border-[var(--color-text-primary)] font-semibold'
                          : 'bg-[var(--color-card-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent-blue)]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range Slider */}
            <div className="border-t border-[var(--color-border)] pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-sans uppercase tracking-[0.16em] font-semibold text-[var(--color-text-primary)]">
                  Maximum Price
                </span>
                <span className="text-[12px] font-sans font-semibold text-[var(--color-accent-bronze)] tabular-nums">
                  ৳{maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="35000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[var(--color-accent-blue)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-sans text-[var(--color-text-muted)] mt-1">
                <span>৳5,000</span>
                <span>৳35,000</span>
              </div>
            </div>

            {/* Maison Guarantee Note */}
            <div className="p-3 bg-[var(--color-card-subtle)] border border-[var(--color-border)] text-[11px] font-sans text-[var(--color-text-secondary)] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-accent-bronze)] flex-shrink-0 mt-0.5" />
              <span>
                All pieces include complimentary 28-point bespoke fitting at GEC Circle, Chattogram.
              </span>
            </div>
          </aside>

          {/* PRODUCT GRID AREA (Col-span 9 on desktop) */}
          <main className="lg:col-span-9 mt-6 lg:mt-0">
            {filteredProducts.length === 0 ? (
              <div className="py-24 px-4 bg-[var(--color-card)] border border-[var(--color-border)] flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-card-subtle)] border border-[var(--color-border)] flex items-center justify-center mb-4 text-[var(--color-accent-bronze)]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-[22px] text-[var(--color-text-primary)] mb-2">
                  No Matching Creations Found
                </h3>
                <p className="text-[13px] font-sans text-[var(--color-text-secondary)] max-w-sm mb-6">
                  Try clearing some filters or searching for different fabric weaves or silhouettes.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[11px] font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-blue)] transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Responsive Grid: 2-column on mobile, 4-column on desktop */
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
                {filteredProducts.map((product) => {
                  const isFav = !!favorites[product.id]
                  return (
                    <div
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      className="w-full bg-[var(--color-card)] border border-[var(--color-border)] p-2.5 sm:p-3.5 shadow-sm flex flex-col group cursor-pointer transition-all duration-300 hover:border-[var(--color-accent-blue)] hover:shadow-md"
                    >
                      {/* Product Image Container */}
                      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--color-surface-container)]">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute top-2 left-2 bg-[var(--color-accent-bronze-light)] text-[var(--color-accent-bronze-dark)] px-2 py-0.5 shadow-sm">
                            <span className="text-[8px] sm:text-[9px] font-sans font-semibold uppercase tracking-wider">
                              {product.badge}
                            </span>
                          </div>
                        )}

                        {/* Wishlist Heart */}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(product.id, e)}
                          aria-label="Save to Wishlist"
                          className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 bg-[var(--color-card)]/85 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--color-text-primary)] shadow-sm hover:text-[var(--color-accent-blue)] active:scale-90 transition-all cursor-pointer"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                              isFav ? 'fill-[var(--color-accent-blue)] text-[var(--color-accent-blue)]' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Details */}
                      <div className="pt-3 pb-1 flex flex-col flex-1 justify-between">
                        <div>
                          <span className="text-[8px] sm:text-[9px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-bronze)] font-medium block mb-1 truncate">
                            {product.edition}
                          </span>
                          <h4 className="font-serif text-[14px] sm:text-[17px] text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-blue)] transition-colors line-clamp-1 leading-snug">
                            {product.title}
                          </h4>
                          <p className="text-[11px] font-sans text-[var(--color-text-secondary)] mt-0.5 line-clamp-1">
                            {product.fabric}
                          </p>

                          {/* Color Swatch Dots */}
                          <div className="flex items-center gap-1.5 mt-2">
                            {product.colors.map((c) => (
                              <span
                                key={c.name}
                                title={c.name}
                                className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-inner"
                                style={{ backgroundColor: c.preview }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Pricing & CTA */}
                        <div className="mt-3 pt-2 border-t border-[var(--color-border)] flex items-baseline justify-between">
                          <div>
                            <span className="text-[13px] sm:text-[15px] font-sans font-semibold text-[var(--color-text-primary)] tabular-nums block">
                              ৳{product.priceBDT.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-sans text-[var(--color-text-muted)]">
                              (${product.priceUSD})
                            </span>
                          </div>
                          <span className="text-[10px] font-sans uppercase tracking-wider text-[var(--color-accent-blue)] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            <span className="hidden sm:inline">View</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
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

      {/* MOBILE FLOATING FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-sm lg:hidden animate-fadeIn">
          <div className="flex-1" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="w-[85%] max-w-sm h-full bg-[var(--color-canvas)] text-[var(--color-text-primary)] border-l border-[var(--color-border)] flex flex-col shadow-2xl animate-slideInRight">
            {/* Header */}
            <div className="p-4 bg-[var(--color-card)] border-b border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[var(--color-accent-bronze)]" />
                <span className="text-[12px] font-sans uppercase tracking-[0.2em] font-semibold">
                  Filter {category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Silhouette */}
              {silhouettes.length > 0 && (
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-wider font-semibold block mb-2">
                    Silhouette & Cut
                  </span>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-[12px] font-sans cursor-pointer">
                      <input
                        type="radio"
                        name="mob-sil"
                        checked={selectedSilhouette === 'All'}
                        onChange={() => setSelectedSilhouette('All')}
                      />
                      <span>All Silhouettes</span>
                    </label>
                    {silhouettes.map((sil) => (
                      <label key={sil} className="flex items-center gap-2 text-[12px] font-sans cursor-pointer">
                        <input
                          type="radio"
                          name="mob-sil"
                          checked={selectedSilhouette === sil}
                          onChange={() => setSelectedSilhouette(sil)}
                        />
                        <span>{sil}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Fabric */}
              {fabrics.length > 0 && (
                <div className="border-t border-[var(--color-border)] pt-4">
                  <span className="text-[11px] font-sans uppercase tracking-wider font-semibold block mb-2">
                    Fabric & Weave
                  </span>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-[12px] font-sans cursor-pointer">
                      <input
                        type="radio"
                        name="mob-fab"
                        checked={selectedFabric === 'All'}
                        onChange={() => setSelectedFabric('All')}
                      />
                      <span>All Weaves</span>
                    </label>
                    {fabrics.map((fab) => (
                      <label key={fab} className="flex items-center gap-2 text-[12px] font-sans cursor-pointer">
                        <input
                          type="radio"
                          name="mob-fab"
                          checked={selectedFabric === fab}
                          onChange={() => setSelectedFabric(fab)}
                        />
                        <span className="truncate">{fab}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Size */}
              {availableSizes.length > 0 && (
                <div className="border-t border-[var(--color-border)] pt-4">
                  <span className="text-[11px] font-sans uppercase tracking-wider font-semibold block mb-2">
                    Garment Size
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {availableSizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(selectedSize === sz ? 'All' : sz)}
                        className={`py-2 text-[10px] font-sans uppercase tracking-wider border cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-semibold'
                            : 'bg-[var(--color-card-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="flex justify-between text-[11px] font-sans font-semibold mb-2">
                  <span>Max Price:</span>
                  <span className="text-[var(--color-accent-bronze)]">৳{maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="35000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[var(--color-accent-blue)]"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-[var(--color-card)] border-t border-[var(--color-border)] flex gap-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex-1 py-3 text-[11px] font-sans uppercase tracking-wider border border-[var(--color-border)] hover:bg-[var(--color-card-subtle)] cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[11px] font-sans uppercase tracking-wider font-semibold hover:bg-[var(--color-accent-blue)] cursor-pointer"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
