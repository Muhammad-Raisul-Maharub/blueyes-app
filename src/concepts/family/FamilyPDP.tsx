import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Check,
  Sparkles,
  ChevronDown,
  Ruler,
  Users,
} from 'lucide-react'
import type { Currency, FamilyProduct, FamilyProductColor } from './types'

interface FamilyPDPProps {
  product: FamilyProduct
  currency: Currency
  onBack: () => void
  onAddToCart: (
    product: FamilyProduct,
    color: FamilyProductColor,
    size: string,
    bundledMembers?: string[]
  ) => void
}

export const FamilyPDP: React.FC<FamilyPDPProps> = ({
  product,
  currency,
  onBack,
  onAddToCart,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard')
  const [sizingUnit, setSizingUnit] = useState<'metric' | 'imperial'>('metric')
  const [selectedBundleMembers, setSelectedBundleMembers] = useState<string[]>([])
  const [activeAccordion, setActiveAccordion] = useState<'sizing' | 'fabric' | 'shipping' | null>('sizing')

  const activeColor = product.colors[selectedColorIndex] || product.colors[0]
  const currentImage = activeColor?.image || product.defaultImage

  const formatPrice = (priceBDT: number, priceUSD: number) => {
    if (currency === 'USD') return `$${priceUSD}`
    return `৳${priceBDT.toLocaleString()}`
  }

  // Calculate pricing with matching members if selected
  const basePriceBDT = product.priceBDT
  const basePriceUSD = product.priceUSD

  const additionalMatchingBDT = selectedBundleMembers.reduce((sum, role) => {
    const member = product.matchingMembers?.find((m) => m.role === role)
    return sum + (member ? member.priceBDT : 0)
  }, 0)

  const additionalMatchingUSD = selectedBundleMembers.reduce((sum, role) => {
    const member = product.matchingMembers?.find((m) => m.role === role)
    return sum + (member ? member.priceUSD : 0)
  }, 0)

  // 10% bundle discount on matching members
  const hasMatchingDiscount = selectedBundleMembers.length > 0
  const discountRatio = hasMatchingDiscount ? 0.1 : 0
  const rawTotalBDT = basePriceBDT + additionalMatchingBDT
  const rawTotalUSD = basePriceUSD + additionalMatchingUSD
  const savingsBDT = Math.round(rawTotalBDT * discountRatio)
  const savingsUSD = Math.round(rawTotalUSD * discountRatio)
  const finalPriceBDT = rawTotalBDT - savingsBDT
  const finalPriceUSD = rawTotalUSD - savingsUSD

  const toggleMatchingMember = (role: string) => {
    setSelectedBundleMembers((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    )
  }

  const handleAdd = () => {
    onAddToCart(product, activeColor, selectedSize, selectedBundleMembers)
  }

  const currentSizingRows =
    sizingUnit === 'metric' ? product.sizingData.metric : product.sizingData.imperial

  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] font-['Public_Sans'] pb-24">
      {/* Top Breadcrumbs / Return Bar */}
      <div className="w-full bg-[var(--color-surface-soft)] border-b border-[var(--color-border)] py-3 px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#175CD3] dark:text-[#4E8DFF] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Family Catalog</span>
          </button>

          <div className="flex items-center space-x-2 text-xs text-[var(--color-text-secondary)]">
            <span className="uppercase font-bold">{product.demographic}</span>
            <span>/</span>
            <span className="font-semibold text-[var(--color-text-primary)]">{product.sku}</span>
          </div>
        </div>
      </div>

      {/* Main Split Layout: 2 Columns */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left">
          {/* Left Column: Image Gallery with rounded-3xl corners */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 border border-[var(--color-border)] shadow-md">
              <img
                src={currentImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#F76C5E] text-white text-xs font-bold shadow-sm">
                  {product.badge}
                </span>
              )}

              {product.matchFamilyTag && (
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/95 dark:bg-black/95 backdrop-blur-md border border-[var(--color-border)] flex items-center space-x-2 shadow-sm">
                  <Heart className="w-4 h-4 text-[#F76C5E] fill-[#F76C5E] flex-shrink-0" />
                  <span className="text-xs font-bold text-[var(--color-text-primary)]">
                    {product.matchFamilyTag}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {product.galleryImages.map((img, i) => (
                <div
                  key={img}
                  className="aspect-square rounded-2xl overflow-hidden border border-[var(--color-border)] cursor-pointer hover:border-[#175CD3]"
                >
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Developmental Milestone Badge Box */}
            <div className="p-5 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] space-y-2">
              <div className="flex items-center space-x-2 text-[#175CD3] dark:text-[#4E8DFF]">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  DEVELOPMENTAL FIT PROFILE
                </span>
              </div>
              <h4 className="text-base font-bold text-[var(--color-text-primary)] font-['Outfit']">
                {product.developmentalStage}
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {product.organicCert} • Non-toxic dyes tested by Chattogram Quality Labs for sensitive skin.
              </p>
            </div>
          </div>

          {/* Right Column: Sizing, Matching Members Bundler, & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Lockup */}
            <div className="space-y-2 border-b border-[var(--color-border)] pb-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#175CD3] dark:text-[#4E8DFF] uppercase tracking-wide">
                  {product.demographic} ESSENTIAL
                </span>
                <span className="font-semibold text-[var(--color-text-secondary)]">
                  ★ {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] font-['Outfit'] leading-tight">
                {product.title}
              </h1>

              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="pt-2 flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
                  {formatPrice(finalPriceBDT, finalPriceUSD)}
                </span>
                {hasMatchingDiscount && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                    10% Matching Bundle Saved (Save {currency === 'USD' ? `$${savingsUSD}` : `৳${savingsBDT.toLocaleString()}`})
                  </span>
                )}
              </div>
            </div>

            {/* INTERACTIVE "ADD MATCHING FAMILY MEMBERS" OUTFIT BUNDLER */}
            {product.matchingMembers && product.matchingMembers.length > 0 && (
              <div className="p-5 rounded-3xl bg-[var(--color-surface-soft)] border-2 border-[#175CD3] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-[#175CD3]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                      ADD MATCHING FAMILY MEMBERS
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#175CD3] text-white text-[10px] font-bold">
                    SAVE 10%
                  </span>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)]">
                  Bundle coordinated pieces for your loved ones with automatic family bundle savings!
                </p>

                <div className="space-y-2 pt-1">
                  {product.matchingMembers.map((member) => {
                    const isSelected = selectedBundleMembers.includes(member.role)
                    return (
                      <div
                        key={member.role}
                        onClick={() => toggleMatchingMember(member.role)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[var(--color-surface)] border-[#175CD3] shadow-xs'
                            : 'bg-[var(--color-surface)]/70 border-[var(--color-border)] hover:border-[#175CD3]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={member.image}
                            alt={member.role}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <span className="text-[10px] font-bold uppercase text-[#F76C5E] block">
                              MATCH WITH {member.role.toUpperCase()}
                            </span>
                            <span className="text-xs font-bold text-[var(--color-text-primary)] block">
                              {member.title}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-[#175CD3] dark:text-[#4E8DFF]">
                            +{formatPrice(member.priceBDT, member.priceUSD)}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                              isSelected
                                ? 'bg-[#175CD3] border-[#175CD3] text-white'
                                : 'border-[var(--color-border)] bg-transparent'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Color Swatches */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase block">
                COLORWAY: <strong className="text-[var(--color-text-primary)]">{activeColor.name}</strong>
              </span>
              <div className="flex items-center space-x-2.5">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColorIndex(idx)}
                    title={color.name}
                    className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                      idx === selectedColorIndex
                        ? 'border-[#175CD3] scale-110 shadow-xs'
                        : 'border-[var(--color-border)] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {idx === selectedColorIndex && (
                      <Check className={`w-4 h-4 ${color.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector Box Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase block">
                SELECT DEVELOPMENTAL SIZE: <strong className="text-[var(--color-text-primary)]">{selectedSize}</strong>
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedSize === sz
                        ? 'bg-[#175CD3] text-white border-[#175CD3] shadow-xs'
                        : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[#175CD3]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordions: Developmental Sizing Chart (Metric & Imperial) */}
            <div className="rounded-3xl border border-[var(--color-border)] overflow-hidden divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">
              {/* Sizing Chart Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'sizing' ? null : 'sizing')}
                  className="w-full p-4 flex items-center justify-between text-xs font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft)] cursor-pointer"
                >
                  <span className="flex items-center space-x-2">
                    <Ruler className="w-4 h-4 text-[#175CD3]" />
                    <span>DEVELOPMENTAL SIZING CHART (KG/CM vs LBS/IN)</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'sizing' ? 'rotate-180 text-[#175CD3]' : ''
                    }`}
                  />
                </button>

                {activeAccordion === 'sizing' && (
                  <div className="p-4 bg-[var(--color-surface-soft)] space-y-3">
                    {/* Metric / Imperial Switcher */}
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
                      <span className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
                        Measurement Unit:
                      </span>
                      <div className="inline-flex bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full p-0.5 text-[10px] font-bold">
                        <button
                          type="button"
                          onClick={() => setSizingUnit('metric')}
                          className={`px-2.5 py-0.5 rounded-full ${
                            sizingUnit === 'metric' ? 'bg-[#175CD3] text-white' : ''
                          }`}
                        >
                          Metric (CM / KG)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSizingUnit('imperial')}
                          className={`px-2.5 py-0.5 rounded-full ${
                            sizingUnit === 'imperial' ? 'bg-[#175CD3] text-white' : ''
                          }`}
                        >
                          Imperial (IN / LBS)
                        </button>
                      </div>
                    </div>

                    {/* Sizing Table */}
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-[var(--color-border)] text-[10px] text-[var(--color-text-secondary)] uppercase">
                          <th className="py-1.5">Size</th>
                          <th className="py-1.5">Height</th>
                          <th className="py-1.5">Weight</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--color-border)]">
                        {currentSizingRows.map((row) => (
                          <tr key={row.size}>
                            <td className="py-2 font-bold text-[var(--color-text-primary)]">{row.size}</td>
                            <td className="py-2 text-[var(--color-text-secondary)]">{row.height}</td>
                            <td className="py-2 text-[var(--color-text-secondary)]">{row.weight}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Fabric & Safety Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveAccordion(activeAccordion === 'fabric' ? null : 'fabric')}
                  className="w-full p-4 flex items-center justify-between text-xs font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft)] cursor-pointer"
                >
                  <span className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#175CD3]" />
                    <span>NON-TOXIC BABY-SAFE SPECIFICATIONS</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === 'fabric' ? 'rotate-180 text-[#175CD3]' : ''
                    }`}
                  />
                </button>

                {activeAccordion === 'fabric' && (
                  <div className="p-4 bg-[var(--color-surface-soft)] text-xs text-[var(--color-text-secondary)] space-y-2">
                    <p>• {product.fabricDescription}</p>
                    <p>• <strong>Certification:</strong> {product.organicCert}</p>
                    <p>• <strong>Care:</strong> Gentle machine wash at 30°C with non-bio baby detergent.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Add to Bag Action */}
            <div className="hidden lg:block pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleAdd}
                className="w-full py-4 rounded-full bg-[#175CD3] hover:bg-[#144fbb] text-white font-bold text-sm tracking-wide uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  Add to Family Bag • {formatPrice(finalPriceBDT, finalPriceUSD)}
                  {selectedBundleMembers.length > 0 ? ` (+${selectedBundleMembers.length} Matching)` : ''}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Buy Bar (Mobile & Desktop) */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-[var(--color-surface)]/95 backdrop-blur-md border-t border-[var(--color-border)] p-3 lg:hidden shadow-lg">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-[var(--color-text-secondary)] block uppercase">
              {product.title} ({selectedSize})
            </span>
            <span className="text-base font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
              {formatPrice(finalPriceBDT, finalPriceUSD)}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-4 rounded-full bg-[#175CD3] text-white font-bold text-xs uppercase tracking-wide flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
