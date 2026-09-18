import React, { useState } from 'react'
import type { IndigoProduct, IndigoCategory, Language } from './types'
import { getTranslation } from './translations'
import {
  ArrowLeft,
  Feather,
  ShieldCheck,
  Truck,
  Check,
  Sparkles,
  ShoppingBag,
} from 'lucide-react'

interface IndigoPDPProps {
  product: IndigoProduct
  onBack: () => void
  onNavigateHome: () => void
  onNavigateCategory: (category: IndigoCategory) => void
  onAddToBag: (product: IndigoProduct, size: string, color: string) => void
  language: Language
}

export const IndigoPDP: React.FC<IndigoPDPProps> = ({
  product,
  onBack,
  onNavigateHome,
  onNavigateCategory,
  onAddToBag,
  language,
}) => {
  const t = getTranslation(language)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard')
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Natural')
  const [isZoomed, setIsZoomed] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleAdd = () => {
    onAddToBag(product, selectedSize, selectedColor)
    setToastMessage(
      `${language === 'en' ? product.title : product.titleBn} (${selectedSize}) ${t.pdp.addedToast}`
    )
    setTimeout(() => setToastMessage(null), 2500)
  }

  return (
    <div className="w-full flex flex-col pb-32 lg:pb-20 transition-colors duration-200">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="w-full border-b border-[#E5DDD0] dark:border-[#36312B] bg-[#FFFFFF] dark:bg-[#1B1917] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-[12px] font-jakarta font-semibold text-[#756A63] dark:text-[#A3968C] hover:text-[#0A4269] dark:hover:text-[#3882B5] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'en' ? 'Back' : 'পূর্ববর্তী'}</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] font-jakarta text-[#756A63] dark:text-[#A3968C] uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:underline cursor-pointer hidden sm:inline"
            >
              {language === 'en' ? 'Maison' : 'মেসন'}
            </button>
            <span className="hidden sm:inline">/</span>
            <button
              type="button"
              onClick={() => onNavigateCategory(product.category)}
              className="hover:underline cursor-pointer"
            >
              {t.nav[product.category.toLowerCase() as keyof typeof t.nav] || product.category}
            </button>
            <span>/</span>
            <span className="text-[#0A4269] dark:text-[#3882B5] font-bold line-clamp-1 max-w-[180px] sm:max-w-xs">
              {language === 'en' ? product.title : product.titleBn}
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Split (Desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: High-Res Gallery with Zoom */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage */}
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              className="relative w-full aspect-[4/5] bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl overflow-hidden shadow-sm cursor-zoom-in group"
            >
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.title}
                className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                  isZoomed ? 'scale-150' : 'group-hover:scale-103'
                }`}
              />

              {/* Loom Craft Stamp */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-[#F9F6F0]/90 dark:bg-[#121110]/90 backdrop-blur-md text-[#0A4269] dark:text-[#3882B5] text-[11px] font-jakarta font-bold uppercase rounded-full shadow-xs border border-[#E5DDD0] dark:border-[#36312B]">
                  {language === 'en' ? product.craftTag : product.craftTagBn}
                </span>
              </div>

              {/* Zoom hint badge */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-jakarta">
                {isZoomed
                  ? language === 'en'
                    ? 'Click to Reset Zoom'
                    : 'জুম কমাতে ক্লিক করুন'
                  : language === 'en'
                  ? 'Click to Inspect Loom Texture'
                  : 'বুনন দেখতে ক্লিক করুন'}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                      selectedImage === idx
                        ? 'border-[#0A4269] dark:border-[#3882B5] shadow-xs'
                        : 'border-[#E5DDD0] dark:border-[#36312B] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover object-center" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Garment Specs, Artisan Story & Purchase Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              {/* Provenance Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3ECE2] dark:bg-[#25221F] text-[#B85324] dark:text-[#D96F3D] rounded-full text-[11px] font-jakarta font-bold uppercase mb-3">
                <Sparkles className="w-3 h-3" />
                <span>BLU EYES INDIGO • {language === 'en' ? product.artisanOrigin : product.artisanOriginBn}</span>
              </div>

              <h1 className="font-cinzel text-[26px] sm:text-[34px] font-bold text-[#26201C] dark:text-[#F5EFE8] leading-tight">
                {language === 'en' ? product.title : product.titleBn}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-jakarta font-bold text-[24px] sm:text-[28px] text-[#0A4269] dark:text-[#3882B5]">
                  ৳{product.priceBDT.toLocaleString()}
                </span>
                <span className="font-jakarta text-[14px] text-[#756A63] dark:text-[#A3968C]">
                  (${product.priceUSD} USD)
                </span>
                <span className="text-[11px] font-jakarta text-[#B85324] dark:text-[#D96F3D] font-semibold uppercase bg-[#F3ECE2] dark:bg-[#25221F] px-2 py-0.5 rounded">
                  {language === 'en' ? 'Includes Blouse/Slip' : 'সম্পূর্ণ সেট'}
                </span>
              </div>
            </div>

            {/* Artisan Loom Origin Story Box */}
            <div className="p-4 sm:p-5 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#0A4269] dark:text-[#3882B5]">
                <Feather className="w-4 h-4" />
                <h3 className="font-cinzel font-bold text-[14px] uppercase tracking-wider">
                  {t.pdp.artisanOrigin}
                </h3>
              </div>
              <p className="font-jakarta text-[13px] text-[#756A63] dark:text-[#A3968C] leading-relaxed">
                {language === 'en' ? product.description : product.descriptionBn}
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-[#E5DDD0] dark:border-[#36312B] text-[11px] font-jakarta text-[#26201C] dark:text-[#F5EFE8]">
                <span>
                  <strong>{product.weaveTimeDays} {t.pdp.days}</strong>
                </span>
                <span className="text-[#B85324] dark:text-[#D96F3D] font-semibold">
                  {language === 'en' ? 'Fair Wage Certified' : 'ন্যায্য মজুরি প্রত্যয়িত'}
                </span>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2">
              <label className="text-[11px] font-jakarta font-bold uppercase tracking-wider text-[#756A63] dark:text-[#A3968C] block">
                {language === 'en' ? 'Natural Dye Swatch:' : 'প্রাকৃতিক রঙের শেড:'}
              </label>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12px] font-jakarta transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-[#0A4269] dark:border-[#3882B5] bg-[#F3ECE2] dark:bg-[#25221F] font-bold text-[#0A4269] dark:text-[#3882B5]'
                        : 'border-[#E5DDD0] dark:border-[#36312B] text-[#26201C] dark:text-[#F5EFE8]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{language === 'en' ? c.name : c.nameBn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Ethnic Measurements */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-jakarta">
                <span className="font-bold uppercase tracking-wider text-[#756A63] dark:text-[#A3968C]">
                  {t.actions.selectSize}
                </span>
                <span className="text-[#0A4269] dark:text-[#3882B5] font-semibold">
                  {t.pdp.measurements}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 rounded-xl text-[12px] font-jakarta font-semibold border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#0A4269] dark:bg-[#3882B5] text-white border-[#0A4269] shadow-xs'
                        : 'bg-[#FFFFFF] dark:bg-[#1B1917] text-[#26201C] dark:text-[#F5EFE8] border-[#E5DDD0] dark:border-[#36312B] hover:border-[#0A4269]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Ethnic Measurement Spec Box */}
              {product.sizeMeasurements.length > 0 && (
                <div className="p-3 bg-[#F9F6F0] dark:bg-[#121110] border border-[#E5DDD0] dark:border-[#36312B] rounded-xl text-[11px] font-jakarta text-[#756A63] dark:text-[#A3968C] space-y-1">
                  <span className="font-bold text-[#26201C] dark:text-[#F5EFE8] block">
                    {t.pdp.ethnicSpecs}:
                  </span>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {product.sizeMeasurements.map((m) => (
                      <span key={m.size}>
                        <strong>{m.size}:</strong> {m.chest && `Chest ${m.chest}, `}
                        {m.length && `Length ${m.length}`}
                        {m.waist && `, Waist ${m.waist}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Add to Bag CTA */}
            <div className="pt-2 hidden lg:flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-4 bg-[#0A4269] dark:bg-[#3882B5] text-white rounded-xl font-jakarta text-[14px] font-semibold tracking-wide hover:bg-[#083554] dark:hover:bg-[#2E709F] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>
                  {t.actions.addToBag} • ৳{product.priceBDT.toLocaleString()}
                </span>
              </button>

              <div className="flex items-center justify-between text-[11px] font-jakarta text-[#756A63] dark:text-[#A3968C] px-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#0A4269] dark:text-[#3882B5]" />
                  <span>{language === 'en' ? 'Same-Day CTG / 48h Nationwide' : 'চট্টগ্রামে একই দিন / সারাদেশে ৪৮ ঘণ্টা'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B85324] dark:text-[#D96F3D]" />
                  <span>{language === 'en' ? 'Natural Dyes Guarantee' : 'প্রাকৃতিক রঙের নিশ্চয়তা'}</span>
                </span>
              </div>
            </div>

            {/* Fabric Composition Features */}
            <div className="p-4 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl space-y-2">
              <span className="text-[11px] font-jakarta font-bold uppercase tracking-wider text-[#0A4269] dark:text-[#3882B5] block">
                {t.pdp.fabricComposition}
              </span>
              <ul className="space-y-1.5">
                {(language === 'en' ? product.features : product.featuresBn).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[12px] font-jakarta text-[#756A63] dark:text-[#A3968C]">
                    <Check className="w-3.5 h-3.5 text-[#0A4269] dark:text-[#3882B5] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar on Mobile (lg:hidden) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 w-full bg-[#FFFFFF]/95 dark:bg-[#1B1917]/95 backdrop-blur-md border-t border-[#E5DDD0] dark:border-[#36312B] p-3 pb-safe flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-[10px] font-jakarta text-[#756A63] dark:text-[#A3968C] block uppercase">
            {selectedSize} • {selectedColor}
          </span>
          <span className="font-jakarta font-bold text-[16px] text-[#0A4269] dark:text-[#3882B5]">
            ৳{product.priceBDT.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 py-3 px-5 bg-[#0A4269] dark:bg-[#3882B5] text-white rounded-xl font-jakarta text-[12px] font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t.actions.addToBag}</span>
        </button>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 bg-[#0A4269] text-white px-4 py-3 rounded-xl font-jakarta text-[12px] font-semibold shadow-lg flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-[#B85324]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
