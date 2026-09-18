import React, { useState } from 'react'
import type { DistrictProduct, DistrictCategory } from './types'
import {
  ArrowLeft,
  Zap,
  Check,
  Truck,
  Video,
  Info,
  Layers,
} from 'lucide-react'

interface DistrictPDPProps {
  product: DistrictProduct
  onBack: () => void
  onNavigateHome: () => void
  onNavigateCategory: (category: DistrictCategory) => void
  onAddToBag: (product: DistrictProduct, size: string, color: string) => void
}

export const DistrictPDP: React.FC<DistrictPDPProps> = ({
  product,
  onBack,
  onNavigateHome,
  onNavigateCategory,
  onAddToBag,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M')
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Pitch Black')
  const [addedToast, setAddedToast] = useState(false)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)

  const handleAddToBagClick = () => {
    onAddToBag(product, selectedSize, selectedColor)
    setAddedToast(true)
    setTimeout(() => setAddedToast(false), 2200)
  }

  return (
    <div className="w-full min-h-screen bg-[#F4F4F6] dark:bg-[#090A0E] text-[#090A0E] dark:text-white pb-28 lg:pb-16 animate-fadeIn transition-colors duration-200">
      {/* Top Breadcrumb Navigation Bar */}
      <div className="border-b border-[#E2E8F0] dark:border-[#2C3142] bg-white dark:bg-[#13151D] sticky top-16 z-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none font-mono-tech text-[11px] uppercase tracking-wider">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 text-[#64748B] dark:text-[#8E95A5] hover:text-[#0047FF] dark:hover:text-[#CCFF00] transition-colors cursor-pointer mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK</span>
            </button>

            <button
              type="button"
              onClick={onNavigateHome}
              className="text-[#64748B] dark:text-[#8E95A5] hover:text-[#0047FF] dark:hover:text-[#CCFF00] transition-colors cursor-pointer whitespace-nowrap"
            >
              DISTRICT
            </button>
            <span className="text-[#64748B] dark:text-[#8E95A5]">//</span>
            <button
              type="button"
              onClick={() => onNavigateCategory(product.category)}
              className="text-[#64748B] dark:text-[#8E95A5] hover:text-[#0047FF] dark:hover:text-[#CCFF00] transition-colors cursor-pointer whitespace-nowrap"
            >
              {product.category}
            </button>
            <span className="text-[#64748B] dark:text-[#8E95A5]">//</span>
            <span className="text-[#0047FF] dark:text-[#CCFF00] font-bold truncate max-w-[180px] sm:max-w-sm">
              {product.title}
            </span>
          </div>

          <span className="font-mono-tech text-[10px] text-[#64748B] dark:text-[#8E95A5] uppercase hidden md:inline">
            SPEC ID: #{product.id.slice(0, 10).toUpperCase()}
          </span>
        </div>
      </div>

      {/* 2-Column Split Layout on Desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Media Presentation (Col-span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sticky top-32">
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/5] bg-white dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] overflow-hidden shadow-[4px_4px_0px_0px_#0047FF]">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {/* Looping Video Badge Overlay */}
              <div
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                className="absolute top-3 left-3 bg-white/90 dark:bg-black/85 border border-[#E2E8F0] dark:border-[#2C3142] px-2.5 py-1 text-[#090A0E] dark:text-white font-mono-tech text-[9px] font-bold uppercase flex items-center gap-1.5 cursor-pointer backdrop-blur-md hover:border-[#0047FF] dark:hover:border-[#CCFF00] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF2A4B] animate-ping" />
                <Video className="w-3 h-3 text-[#0047FF] dark:text-[#CCFF00]" />
                <span>{isPlayingVideo ? 'ON-BODY FIT LOOPING (1080P)' : 'ON-BODY 360° FIT FEED'}</span>
              </div>

              {/* Fabric GSM Spec Tag */}
              <div className="absolute bottom-3 left-3 bg-[#CCFF00] text-[#090A0E] px-3 py-1 font-mono-tech text-[10px] font-extrabold uppercase shadow-[2px_2px_0px_0px_#000]">
                {typeof product.gsm === 'number' ? `[ ${product.gsm} GSM HEAVYWEIGHT ]` : `[ ${product.gsm} SPEC ]`}
              </div>

              {/* Stock Tag */}
              {product.stockLeft <= 8 && (
                <div className="absolute top-3 right-3 bg-[#FF2A4B] text-white px-2.5 py-1 font-mono-tech text-[9px] font-bold uppercase animate-pulse">
                  LIMITED: ONLY {product.stockLeft} PIECES
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-24 flex-shrink-0 border-2 overflow-hidden cursor-pointer transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#0047FF] dark:border-[#CCFF00] opacity-100 shadow-[2px_2px_0px_0px_#0047FF]'
                        : 'border-[#E2E8F0] dark:border-[#2C3142] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Spec Sheet & Purchase Details (Col-span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 mt-6 lg:mt-0">
            {/* Title, Category, Pricing */}
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono-tech text-[10px] font-bold text-[#0047FF] dark:text-[#CCFF00] uppercase tracking-widest">
                <span>{product.category} SECTOR</span>
                <span>//</span>
                <span>{product.fit}</span>
              </div>

              <h1 className="font-syne font-extrabold text-[28px] sm:text-[36px] text-[#090A0E] dark:text-white uppercase leading-tight mb-3">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono-tech font-extrabold text-[28px] sm:text-[32px] text-[#0047FF] dark:text-[#CCFF00]">
                  ৳{product.priceBDT.toLocaleString()}
                </span>
                <span className="font-mono-tech text-[14px] text-[#64748B] dark:text-[#8E95A5]">
                  (${product.priceUSD} USD)
                </span>
              </div>

              <p className="font-dm text-[14px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Colorway Selection */}
            <div>
              <span className="font-mono-tech text-[11px] uppercase font-bold text-[#64748B] dark:text-[#8E95A5] block mb-2">
                COLORWAY: <strong className="text-[#090A0E] dark:text-white">{selectedColor}</strong>
              </span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-2 border font-mono-tech text-[11px] uppercase font-bold cursor-pointer transition-all ${
                      selectedColor === c.name
                        ? 'border-[#0047FF] dark:border-[#CCFF00] bg-[#ECEEF2] dark:bg-[#13151D] text-[#090A0E] dark:text-white shadow-[2px_2px_0px_0px_#0047FF]'
                        : 'border-[#E2E8F0] dark:border-[#2C3142] bg-white dark:bg-[#090A0E] text-[#64748B] dark:text-[#8E95A5] hover:border-[#0047FF] dark:hover:border-white/40'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/20"
                      style={{ backgroundColor: c.preview }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Matrix */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-tech text-[11px] uppercase font-bold text-[#64748B] dark:text-[#8E95A5]">
                  STREETWEAR SIZE MATRIX
                </span>
                <span className="font-mono-tech text-[10px] text-[#0047FF] dark:text-[#CCFF00]">
                  [ TRUE TO BOXY FIT ]
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 px-2 font-mono-tech text-[11px] font-extrabold uppercase text-center border cursor-pointer transition-all ${
                      selectedSize === sz
                        ? 'bg-[#CCFF00] text-[#090A0E] border-[#CCFF00] shadow-[2px_2px_0px_0px_#0047FF]'
                        : 'bg-white dark:bg-[#13151D] text-[#090A0E] dark:text-white border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF] dark:hover:border-white/40'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Fit Recommender Box */}
            <div className="p-4 bg-[#ECEEF2] dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] flex items-start gap-3">
              <Info className="w-5 h-5 text-[#0047FF] dark:text-[#CCFF00] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-mono-tech text-[10px] font-bold text-[#0047FF] dark:text-[#CCFF00] uppercase tracking-wider block mb-1">
                  DISTRICT FIT RECOMMENDER
                </span>
                <p className="font-dm text-[12px] text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  Tailored with a dropped shoulder and oversized chest box. Standard size yields the signature skate drape. Order one size down if you prefer a slim body fit.
                </p>
              </div>
            </div>

            {/* Desktop ADD TO BAG Action Button */}
            <div className="hidden lg:flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={handleAddToBagClick}
                className="w-full py-4 px-6 bg-[#CCFF00] text-[#090A0E] font-syne font-extrabold text-[14px] uppercase tracking-wider hover:bg-[#0047FF] hover:text-white dark:hover:bg-white dark:hover:text-[#090A0E] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_#0047FF]"
              >
                {addedToast ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span>LOCKED IN STREETWEAR BAG</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-[#090A0E]" />
                    <span>ADD TO BAG • ৳{product.priceBDT.toLocaleString()}</span>
                  </>
                )}
              </button>
              <span className="font-mono-tech text-[10px] text-center text-[#64748B] dark:text-[#8E95A5]">
                DISPATCHING DIRECT FROM CHATTOGRAM DEPOT • FAST DELIVERY TO 64 DISTRICTS
              </span>
            </div>

            {/* Technical Specifications Accordion / Checklist */}
            <div className="border-t border-[#E2E8F0] dark:border-[#2C3142] pt-4 space-y-3 font-mono-tech text-[11px]">
              <div className="flex items-center gap-2 text-[#090A0E] dark:text-white font-bold uppercase">
                <Layers className="w-4 h-4 text-[#0047FF]" />
                <span>MATERIAL SPECIFICATIONS:</span>
              </div>
              <ul className="space-y-1.5 text-[#64748B] dark:text-[#94A3B8] pl-2 border-l-2 border-[#0047FF]">
                {product.specs.map((sp, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#0047FF] dark:text-[#CCFF00] font-bold">//</span>
                    <span>{sp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logistics Summary */}
            <div className="p-3.5 bg-[#ECEEF2] dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] flex items-center justify-between text-[11px] font-mono-tech">
              <div className="flex items-center gap-2 text-[#090A0E] dark:text-white">
                <Truck className="w-4 h-4 text-[#0047FF] dark:text-[#CCFF00]" />
                <span>CTG: SAME-DAY // 64 DISTRICTS: 48–72H</span>
              </div>
              <span className="text-[#0047FF] dark:text-[#CCFF00] font-bold">DHL GLOBAL 3–5D</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Only Sticky Bottom 'ADD TO BAG' Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 w-full bg-white/95 dark:bg-[#090A0E]/95 backdrop-blur-md border-t border-[#E2E8F0] dark:border-[#2C3142] p-3 pb-safe flex items-center gap-3">
        <div className="flex flex-col">
          <span className="font-mono-tech text-[9px] text-[#64748B] dark:text-[#8E95A5]">
            SIZE {selectedSize} // {selectedColor}
          </span>
          <span className="font-mono-tech font-extrabold text-[18px] text-[#0047FF] dark:text-[#CCFF00]">
            ৳{product.priceBDT.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToBagClick}
          className="flex-1 py-3.5 px-4 bg-[#CCFF00] text-[#090A0E] font-syne font-extrabold text-[13px] uppercase tracking-wider hover:bg-[#0047FF] hover:text-white dark:hover:bg-white dark:hover:text-[#090A0E] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_#0047FF]"
        >
          {addedToast ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>LOCKED IN BAG</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-[#090A0E]" />
              <span>ADD TO BAG</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
