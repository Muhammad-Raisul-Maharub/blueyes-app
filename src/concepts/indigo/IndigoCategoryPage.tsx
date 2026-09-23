import React, { useState, useMemo } from 'react'
import type { IndigoProduct, IndigoCategory, Language } from './types'
import { getTranslation } from './translations'
import { INDIGO_PRODUCTS } from './indigoData'
import { Filter, X, ChevronDown, Feather, Check, Sparkles } from 'lucide-react'

interface IndigoCategoryPageProps {
  category: IndigoCategory | 'All'
  onSelectProduct: (product: IndigoProduct) => void
  onNavigateHome: () => void
  onSelectCategory: (category: IndigoCategory) => void
  onQuickAdd: (product: IndigoProduct) => void
  language: Language
}

export const IndigoCategoryPage: React.FC<IndigoCategoryPageProps> = ({
  category,
  onSelectProduct,
  onNavigateHome,
  onSelectCategory,
  onQuickAdd,
  language,
}) => {
  const t = getTranslation(language)

  // Filters State
  const [selectedCraft, setSelectedCraft] = useState<string>('All')
  const [selectedSize, setSelectedSize] = useState<string>('All')
  const [selectedAge, setSelectedAge] = useState<string>('All')
  const [maxPrice, setMaxPrice] = useState<number>(20000)
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'weave-desc'>('featured')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Reset category-specific filters when category prop changes
  const [prevCategory, setPrevCategory] = useState(category)
  if (category !== prevCategory) {
    setPrevCategory(category)
    setSelectedAge('All')
    setSelectedSize('All')
    setSelectedCraft('All')
  }

  const categories: IndigoCategory[] = ['Women', 'Men', 'Kids', 'Baby', 'Accessories']

  const craftTags = useMemo(() => {
    const relevantProducts =
      category === 'All'
        ? INDIGO_PRODUCTS
        : INDIGO_PRODUCTS.filter((p) => p.category === category)
    const list = Array.from(new Set(relevantProducts.map((p) => p.craftTag)))
    return ['All', ...list]
  }, [category])

  const availableSizes = useMemo(() => {
    if (category === 'Baby') return ['All', '0–3M', '3–6M', '6–12M', '12–18M', 'One Size']
    if (category === 'Kids') return ['All', '2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y', '13-15Y']
    if (category === 'Women') return ['All', 'Free Size', 'S', 'M', 'L', 'XL']
    if (category === 'Men') return ['All', '38', '40', '42', '44']
    if (category === 'Accessories') return ['All', 'One Size', 'Free Size', '40', '41', '42', '43', '44']
    return ['All', 'S', 'M', 'L', 'XL', 'Free Size']
  }, [category])

  // Dedicated Age / Lifecycle chips for Baby and Kids
  const ageChips = useMemo(() => {
    if (category === 'Baby') {
      return [
        { id: 'All', label: t.filter.babyAges.all },
        { id: '0-3M', label: t.filter.babyAges.m0_3 },
        { id: '3-6M', label: t.filter.babyAges.m3_6 },
        { id: '6-12M', label: t.filter.babyAges.m6_12 },
        { id: '12-24M', label: t.filter.babyAges.m12_24 },
      ]
    }
    if (category === 'Kids') {
      return [
        { id: 'All', label: t.filter.kidsAges.all },
        { id: '2-7Y', label: t.filter.kidsAges.toddler },
        { id: '8-15Y', label: t.filter.kidsAges.junior },
      ]
    }
    return []
  }, [category, t])

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return INDIGO_PRODUCTS.filter((product) => {
      const matchCategory = category === 'All' || product.category === category
      const matchCraft = selectedCraft === 'All' || product.craftTag === selectedCraft
      const matchSize = selectedSize === 'All' || product.sizes.some((s) => s.includes(selectedSize))
      const matchAge =
        selectedAge === 'All' ||
        (product.ageBracket && product.ageBracket.includes(selectedAge))
      const matchPrice = product.priceBDT <= maxPrice
      return matchCategory && matchCraft && matchSize && matchAge && matchPrice
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceBDT - b.priceBDT
      if (sortBy === 'price-desc') return b.priceBDT - a.priceBDT
      if (sortBy === 'weave-desc') return b.weaveTimeDays - a.weaveTimeDays
      return (b.isHero ? 1 : 0) - (a.isHero ? 1 : 0)
    })
  }, [category, selectedCraft, selectedSize, selectedAge, maxPrice, sortBy])

  const clearFilters = () => {
    setSelectedCraft('All')
    setSelectedSize('All')
    setSelectedAge('All')
    setMaxPrice(20000)
    setSortBy('featured')
  }

  return (
    <div className="w-full flex flex-col pb-24 transition-colors duration-200">
      {/* Category Header Banner */}
      <section className="w-full bg-[#FFFFFF] dark:bg-[#1B1917] border-b border-[#E5DDD0] dark:border-[#36312B] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[11px] font-jakarta text-[#756A63] dark:text-[#A3968C] mb-3 uppercase tracking-wider">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-[#0A4269] dark:hover:text-[#3882B5] cursor-pointer"
            >
              {language === 'en' ? 'Maison Chattogram' : 'মেসন চট্টগ্রাম'}
            </button>
            <span>/</span>
            <span className="text-[#0A4269] dark:text-[#3882B5] font-bold">
              {category === 'All'
                ? language === 'en'
                  ? 'All Master Weaves'
                  : 'সকল তাঁত সংগ্রহ'
                : t.nav[category.toLowerCase() as keyof typeof t.nav] || category}
            </span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-cinzel font-bold text-[28px] sm:text-[38px] text-[#26201C] dark:text-[#F5EFE8]">
                {category === 'All'
                  ? language === 'en'
                    ? 'Artisanal Handloom Archives'
                    : 'ঐতিহ্যবাহী তাঁত সংরক্ষণাগার'
                  : t.nav[category.toLowerCase() as keyof typeof t.nav] || category}
              </h1>
              <p className="font-jakarta text-[13px] sm:text-[14px] text-[#756A63] dark:text-[#A3968C] mt-1 max-w-xl">
                {language === 'en'
                  ? 'Handwoven with natural botanical indigo fermentation, Tangail pit-looms, and pure mulberry silks.'
                  : 'প্রাকৃতিক ভেষজ নীল, টাঙ্গাইলের গর্ত তাঁত ও খাঁটি রেশম সিল্কের অনবদ্য মেলবন্ধন।'}
              </p>
            </div>

            {/* Demographic Selector Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-3 py-1.5 rounded-full text-[11px] font-jakarta font-semibold tracking-wide border transition-all cursor-pointer bg-[#F3ECE2] dark:bg-[#25221F] text-[#0A4269] dark:text-[#3882B5] border-[#E5DDD0] dark:border-[#36312B]"
              >
                {language === 'en' ? 'All' : 'সব'}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-jakarta font-semibold tracking-wide border transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-[#0A4269] dark:bg-[#3882B5] text-white border-transparent shadow-xs'
                      : 'bg-[#F9F6F0] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8] border-[#E5DDD0] dark:border-[#36312B] hover:border-[#0A4269]'
                  }`}
                >
                  {t.nav[cat.toLowerCase() as keyof typeof t.nav] || cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sub-bar: Filter triggers and Sort */}
      <section className="sticky top-16 sm:top-20 z-20 w-full bg-[#F9F6F0]/95 dark:bg-[#121110]/95 backdrop-blur-md border-b border-[#E5DDD0] dark:border-[#36312B]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-xl text-[12px] font-jakarta font-semibold text-[#26201C] dark:text-[#F5EFE8] shadow-xs cursor-pointer"
            >
              <Filter className="w-4 h-4 text-[#0A4269] dark:text-[#3882B5]" />
              <span>{t.filter.title}</span>
            </button>

            <span className="font-jakarta text-[12px] text-[#756A63] dark:text-[#A3968C]">
              <strong>{filteredProducts.length}</strong> {t.filter.productsFound}
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline font-jakarta text-[11px] text-[#756A63] dark:text-[#A3968C] uppercase tracking-wider">
              {t.filter.sort}:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'weave-desc')}
                aria-label="Sort products"
                className="bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-xl px-3 py-1.5 pr-8 text-[12px] font-jakarta font-semibold text-[#26201C] dark:text-[#F5EFE8] focus:outline-none focus:border-[#0A4269] cursor-pointer appearance-none shadow-xs"
              >
                <option value="featured">{t.filter.featured}</option>
                <option value="price-asc">{t.filter.priceLow}</option>
                <option value="price-desc">{t.filter.priceHigh}</option>
                <option value="weave-desc">
                  {language === 'en' ? 'Longest Weave Time' : 'দীর্ঘতম বুনন সময়'}
                </option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#756A63] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Layout */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Filter Sidebar (Col-span 3) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-36 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD0] dark:border-[#36312B]">
              <h2 className="font-cinzel font-bold text-[16px] text-[#26201C] dark:text-[#F5EFE8]">
                {t.filter.title}
              </h2>
              <button
                type="button"
                onClick={clearFilters}
                className="text-[11px] font-jakarta text-[#B85324] dark:text-[#D96F3D] hover:underline cursor-pointer"
              >
                {t.actions.reset}
              </button>
            </div>

            {/* Dedicated Age / Lifecycle Filter (for Kids & Baby) */}
            {(category === 'Kids' || category === 'Baby') && (
              <div className="space-y-2 pb-3 border-b border-[#E5DDD0] dark:border-[#36312B]">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-jakarta font-bold uppercase tracking-wider text-[#0A4269] dark:text-[#3882B5] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#B85324] dark:text-[#D96F3D]" />
                    <span>{t.filter.ageLifecycle}</span>
                  </label>
                  {selectedAge !== 'All' && (
                    <button
                      type="button"
                      onClick={() => setSelectedAge('All')}
                      className="text-[10px] font-jakarta text-[#B85324] hover:underline cursor-pointer"
                    >
                      {language === 'en' ? 'Reset' : 'মুছুন'}
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  {ageChips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => setSelectedAge(chip.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-jakarta text-left transition-colors cursor-pointer ${
                        selectedAge === chip.id
                          ? 'bg-[#0A4269] text-white font-bold shadow-xs'
                          : 'bg-[#F9F6F0] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8] border border-[#E5DDD0] dark:border-[#36312B] hover:border-[#0A4269]'
                      }`}
                    >
                      <span>{chip.label}</span>
                      {selectedAge === chip.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loom Craft Technique Filter */}
            <div className="space-y-2">
              <label className="text-[11px] font-jakarta font-bold uppercase tracking-wider text-[#0A4269] dark:text-[#3882B5] block">
                {t.filter.loomCraft}
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-none pr-1">
                {craftTags.map((craft) => (
                  <button
                    key={craft}
                    type="button"
                    onClick={() => setSelectedCraft(craft)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12px] font-jakarta transition-colors text-left cursor-pointer ${
                      selectedCraft === craft
                        ? 'bg-[#0A4269] text-white font-semibold'
                        : 'text-[#26201C] dark:text-[#F5EFE8] hover:bg-[#F3ECE2] dark:hover:bg-[#25221F]'
                    }`}
                  >
                    <span>{craft}</span>
                    {selectedCraft === craft && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Spec Filter */}
            <div className="space-y-2">
              <label className="text-[11px] font-jakarta font-bold uppercase tracking-wider text-[#0A4269] dark:text-[#3882B5] block">
                {t.filter.size}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-1.5 rounded-lg text-[11px] font-jakarta text-center border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#0A4269] text-white border-[#0A4269] font-bold'
                        : 'bg-[#F9F6F0] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8] border-[#E5DDD0] dark:border-[#36312B] hover:border-[#0A4269]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-jakarta">
                <span className="font-bold uppercase tracking-wider text-[#0A4269] dark:text-[#3882B5]">
                  {t.filter.maxPrice}
                </span>
                <span className="font-bold text-[#26201C] dark:text-[#F5EFE8]">
                  ৳{maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1500"
                max="20000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0A4269] dark:accent-[#3882B5] cursor-pointer"
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {/* Dedicated Horizontal Age / Lifecycle Filter Chips (for Kids & Baby) */}
            {(category === 'Kids' || category === 'Baby') && (
              <div className="mb-6 p-4 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl flex flex-col sm:flex-row sm:items-center gap-3 shadow-xs">
                <div className="flex items-center gap-2 text-[11px] font-jakarta font-bold uppercase tracking-wider text-[#0A4269] dark:text-[#3882B5] shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-[#B85324] dark:text-[#D96F3D]" />
                  <span>{t.filter.ageLifecycle}:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ageChips.map((chip) => {
                    const isSelected = selectedAge === chip.id
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => setSelectedAge(chip.id)}
                        className={`px-3.5 py-1.5 rounded-full text-[12px] font-jakarta font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0A4269] dark:bg-[#3882B5] text-white shadow-xs'
                            : 'bg-[#F9F6F0] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8] border border-[#E5DDD0] dark:border-[#36312B] hover:border-[#0A4269] dark:hover:border-[#3882B5]'
                        }`}
                      >
                        {chip.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl">
                <p className="font-cinzel text-[18px] text-[#26201C] dark:text-[#F5EFE8] font-bold">
                  {language === 'en'
                    ? 'No master weaves match your selected filters.'
                    : 'আপনার ফিল্টারের সাথে মিলে এমন কোনো পোশাক পাওয়া যায়নি।'}
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 px-5 py-2 bg-[#0A4269] dark:bg-[#3882B5] text-white rounded-xl text-[12px] font-jakarta font-semibold cursor-pointer"
                >
                  {t.actions.reset}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl overflow-hidden hover:border-[#0A4269] dark:hover:border-[#3882B5] hover:shadow-md transition-all flex flex-col group"
                  >
                    {/* Media Frame */}
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="relative w-full aspect-[3/4] sm:aspect-[4/5] bg-[#F9F6F0] dark:bg-[#121110] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Craft Tag Badge */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 bg-[#F9F6F0]/90 dark:bg-[#121110]/90 backdrop-blur-sm text-[#0A4269] dark:text-[#3882B5] text-[9px] sm:text-[10px] font-jakarta font-bold uppercase rounded shadow-xs border border-[#E5DDD0] dark:border-[#36312B]">
                          {language === 'en' ? product.craftTag : product.craftTagBn}
                        </span>
                      </div>

                      {/* Weave Time Badge */}
                      <div className="absolute bottom-2.5 right-2.5">
                        <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-[#F5EFE8] text-[9px] font-jakarta rounded flex items-center gap-1">
                          <Feather className="w-2.5 h-2.5 text-[#D96F3D]" />
                          <span>{product.weaveTimeDays}d Weave</span>
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#FFFFFF] dark:bg-[#1B1917]">
                      <div>
                        <span className="text-[10px] font-jakarta text-[#756A63] dark:text-[#A3968C] uppercase tracking-wider block mb-1">
                          {language === 'en' ? product.artisanOrigin : product.artisanOriginBn}
                        </span>
                        <h3
                          onClick={() => onSelectProduct(product)}
                          className="font-cinzel text-[14px] sm:text-[16px] font-bold text-[#26201C] dark:text-[#F5EFE8] line-clamp-1 group-hover:text-[#0A4269] dark:group-hover:text-[#3882B5] transition-colors cursor-pointer"
                        >
                          {language === 'en' ? product.title : product.titleBn}
                        </h3>
                        <p className="font-jakarta text-[11px] text-[#756A63] dark:text-[#A3968C] mt-1 line-clamp-1">
                          {language === 'en' ? product.fabric : product.fabricBn}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#E5DDD0] dark:border-[#36312B] flex items-center justify-between">
                        <div>
                          <span className="font-jakarta font-bold text-[14px] sm:text-[16px] text-[#0A4269] dark:text-[#3882B5]">
                            ৳{product.priceBDT.toLocaleString()}
                          </span>
                          <span className="text-[10px] font-jakarta text-[#756A63] dark:text-[#A3968C] ml-1.5">
                            ${product.priceUSD}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onQuickAdd(product)}
                          className="px-3 py-1.5 bg-[#F3ECE2] dark:bg-[#25221F] hover:bg-[#0A4269] hover:text-white dark:hover:bg-[#3882B5] text-[#0A4269] dark:text-[#3882B5] rounded-xl text-[11px] font-jakarta font-bold tracking-wide uppercase transition-colors cursor-pointer shadow-xs"
                        >
                          {t.actions.quickAdd}
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

      {/* Mobile Slide-Up Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm lg:hidden animate-fadeIn">
          <div className="w-full max-h-[85vh] bg-[#FFFFFF] dark:bg-[#1B1917] border-t border-[#E5DDD0] dark:border-[#36312B] rounded-t-3xl p-6 overflow-y-auto space-y-6 animate-slideInUp">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD0] dark:border-[#36312B]">
              <h3 className="font-cinzel font-bold text-[18px] text-[#26201C] dark:text-[#F5EFE8]">
                {t.filter.title}
              </h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-[#756A63] dark:text-[#A3968C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Age / Lifecycle (Mobile) */}
            {(category === 'Kids' || category === 'Baby') && (
              <div className="space-y-2">
                <label className="text-[11px] font-jakarta font-bold uppercase tracking-wider text-[#0A4269] dark:text-[#3882B5] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#B85324] dark:text-[#D96F3D]" />
                  <span>{t.filter.ageLifecycle}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {ageChips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => setSelectedAge(chip.id)}
                      className={`px-3.5 py-2 rounded-xl text-[11px] font-jakarta font-semibold transition-all ${
                        selectedAge === chip.id
                          ? 'bg-[#0A4269] text-white border border-[#0A4269] shadow-xs'
                          : 'bg-[#F9F6F0] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8] border border-[#E5DDD0] dark:border-[#36312B]'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loom Craft */}
            <div className="space-y-2">
              <label className="text-[11px] font-jakarta font-bold uppercase tracking-wider text-[#0A4269] dark:text-[#3882B5] block">
                {t.filter.loomCraft}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {craftTags.map((craft) => (
                  <button
                    key={craft}
                    type="button"
                    onClick={() => setSelectedCraft(craft)}
                    className={`px-3 py-2 rounded-xl text-[11px] font-jakarta text-left border ${
                      selectedCraft === craft
                        ? 'bg-[#0A4269] text-white border-[#0A4269] font-bold'
                        : 'bg-[#F9F6F0] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8] border-[#E5DDD0] dark:border-[#36312B]'
                    }`}
                  >
                    {craft}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <label className="text-[11px] font-jakarta font-bold uppercase tracking-wider text-[#0A4269] dark:text-[#3882B5] block">
                {t.filter.size}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-xl text-[11px] font-jakarta text-center border ${
                      selectedSize === size
                        ? 'bg-[#0A4269] text-white border-[#0A4269] font-bold'
                        : 'bg-[#F9F6F0] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8] border-[#E5DDD0] dark:border-[#36312B]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider (Mobile) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-jakarta">
                <span className="font-bold uppercase tracking-wider text-[#0A4269] dark:text-[#3882B5]">
                  {t.filter.maxPrice}
                </span>
                <span className="font-bold text-[#26201C] dark:text-[#F5EFE8]">
                  ৳{maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1500"
                max="20000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0A4269] dark:accent-[#3882B5] cursor-pointer"
              />
            </div>

            {/* Buttons */}
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 py-3 bg-[#F9F6F0] dark:bg-[#121110] border border-[#E5DDD0] dark:border-[#36312B] text-[#26201C] dark:text-[#F5EFE8] font-jakarta text-[12px] font-semibold rounded-xl"
              >
                {t.actions.reset}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#0A4269] dark:bg-[#3882B5] text-white font-jakarta text-[12px] font-semibold rounded-xl"
              >
                {t.actions.apply}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
