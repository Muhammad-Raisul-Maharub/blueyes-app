import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { IndigoProduct, IndigoCategory, Language } from './types'
import { getTranslation } from './translations'
import { INDIGO_PRODUCTS } from './indigoData'
import { ArrowRight, Sparkles, Feather, Heart, Globe } from 'lucide-react'

interface IndigoHomeProps {
  onSelectProduct: (product: IndigoProduct) => void
  onNavigateCategory: (category: IndigoCategory) => void
  onNavigateLookbook: () => void
  onNavigateAbout: () => void
  onQuickAdd: (product: IndigoProduct) => void
  language: Language
  onToggleLanguage?: () => void
}

export const IndigoHome: React.FC<IndigoHomeProps> = ({
  onSelectProduct,
  onNavigateCategory,
  onNavigateLookbook,
  onNavigateAbout,
  onQuickAdd,
  language: initialLanguage,
}) => {
  const [currentLang, setCurrentLang] = useState<Language>(initialLanguage)
  const [selectedCluster, setSelectedCluster] = useState<string>('All')
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  const t = getTranslation(currentLang)

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Craft cluster badges
  const craftClusters = [
    { id: 'All', labelEn: 'All Weaves', labelBn: 'সকল বুনন', tag: 'All Guilds' },
    { id: 'Tangail', labelEn: 'Tangail Silk', labelBn: 'টাঙ্গাইল সিল্ক', tag: 'Jacquard Weave' },
    { id: 'Rajshahi', labelEn: 'Rajshahi Mulberry', labelBn: 'রাজশাহী রেশম', tag: 'Pure Silk' },
    { id: 'Cumilla', labelEn: 'Cumilla Khadi', labelBn: 'কুমিল্লা খাদি', tag: 'Handspun' },
    { id: 'Dhaka', labelEn: 'Shitalakshya Muslin', labelBn: 'শীতলক্ষ্যা মসলিন', tag: 'Jamdani' },
  ]

  // Filtered cascading products for right feed
  const cascadingProducts =
    selectedCluster === 'All'
      ? INDIGO_PRODUCTS
      : INDIGO_PRODUCTS.filter((p) =>
          p.artisanOrigin.toLowerCase().includes(selectedCluster.toLowerCase()) ||
          p.craftTag.toLowerCase().includes(selectedCluster.toLowerCase())
        )

  return (
    <div className="w-full flex flex-col pb-28 transition-colors duration-300 bg-[#FBF8F3] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8]">
      {/* =========================================================================
          1. FULL-WIDTH HANDLOOM TEXTILE HERO SHOWCASE
          Full-width handloom textile showcase with bilingual typography and cluster callout
          ========================================================================= */}
      <section className="w-full border-b border-[#E5DDD0] dark:border-[#36312B] bg-[#FFFFFF] dark:bg-[#1B1917] transition-colors">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          <div className="relative w-full rounded-2xl overflow-hidden border border-[#E5DDD0] dark:border-[#36312B] bg-[#F5EFE8] dark:bg-[#201D1A] min-h-[440px] sm:min-h-[520px] flex flex-col justify-end p-6 sm:p-10 lg:p-14 shadow-sm">
            {/* Background Handloom Textile Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1800&q=90"
                alt="Bengal Indigo Handloom"
                className="w-full h-full object-cover object-center filter contrast-105 brightness-[0.75] dark:brightness-[0.55]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/95 via-[#121110]/40 to-transparent" />
            </div>

            {/* Overlaid Badges */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-auto">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#0A4269]/90 backdrop-blur-md text-white font-jakarta text-[11px] font-bold tracking-wider uppercase rounded-full shadow-xs border border-white/20">
                  {currentLang === 'en' ? 'Tangail & Rajshahi Master Looms' : 'টাঙ্গাইল ও রাজশাহী মাস্টার তাঁত'}
                </span>
                <span className="px-3 py-1 bg-[#B85324]/90 backdrop-blur-md text-white font-jakarta text-[11px] font-bold tracking-wider uppercase rounded-full shadow-xs border border-white/20">
                  {currentLang === 'en' ? 'Natural Botanical Indigo Dye' : 'প্রাকৃতিক উদ্ভিজ্জ নীল রঞ্জক'}
                </span>
              </div>

              {/* Live Bilingual Toggle in Hero */}
              <button
                type="button"
                onClick={() => setCurrentLang((prev) => (prev === 'en' ? 'bn' : 'en'))}
                className="px-3.5 py-1.5 bg-[#FFFFFF]/90 dark:bg-[#1B1917]/90 backdrop-blur-md text-[#0A4269] dark:text-[#3882B5] font-jakarta text-[11px] font-bold uppercase rounded-full border border-[#E5DDD0] dark:border-[#36312B] hover:border-[#0A4269] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLang === 'en' ? 'বাংলা সংস্করণ' : 'ENGLISH VIEW'}</span>
              </button>
            </div>

            {/* Hero Bilingual Content with 400ms curtain fade */}
            <div className="relative z-10 max-w-3xl pt-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLang}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className="flex items-center gap-2 mb-2 text-[#D96F3D]">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[11px] font-jakarta font-bold uppercase tracking-[0.25em]">
                      {currentLang === 'en' ? '500 Years of Handloom Lineage' : 'বাংলার ৫০০ বছরের ঐতিহ্যবাহী বুনন'}
                    </span>
                  </div>

                  <h1 className="font-cinzel text-[32px] sm:text-[46px] lg:text-[56px] font-bold text-[#F5EFE8] leading-[1.08] tracking-tight mb-4 drop-shadow-sm">
                    {currentLang === 'en'
                      ? 'The Cultural Craft Curtain.'
                      : 'বাংলার কারুশিল্প ও তাঁত ঐতিহ্য।'}
                  </h1>

                  <p className="font-jakarta text-[14px] sm:text-[16px] text-white/85 leading-relaxed mb-6 max-w-2xl">
                    {currentLang === 'en'
                      ? 'Celebrating UNESCO-recognized Jamdani, pure Rajshahi Mulberry silks, and Cumilla Khadi. Directly empowering 1,200+ artisan families across Bangladesh.'
                      : 'ইউনেস্কো স্বীকৃত জামদানি, খাঁটি রাজশাহী সিল্ক এবং কুমিল্লার ঐতিহ্যবাহী খাদি। বাংলাদেশের ১,২০০+ তাঁতশিল্পী পরিবারের সরাসরি ক্ষমতায়নে অঙ্গীকারবদ্ধ।'}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigateCategory('Women')}
                  className="px-8 py-3.5 bg-[#0A4269] hover:bg-[#083554] text-white rounded-xl font-jakarta text-[12px] font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>{currentLang === 'en' ? 'Explore Master Sarees' : 'শাড়ি সংগ্রহ দেখুন'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onNavigateLookbook}
                  className="px-7 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 rounded-xl font-jakarta text-[12px] font-semibold tracking-wider transition-all cursor-pointer"
                >
                  <span>{currentLang === 'en' ? 'Artisan Lookbook' : 'লুকবুক দেখুন'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. HORIZONTAL CASCADING CARDS WITH AUTHENTIC HANDLOOM BORDER MOTIFS
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <div className="border-b border-[#E5DDD0] dark:border-[#36312B] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-jakarta font-bold uppercase tracking-[0.25em] text-[#B85324] dark:text-[#D96F3D]">
              {currentLang === 'en' ? 'Artisan Guild Clusters' : 'তাঁত সমবায় অঞ্চল'}
            </span>
            <h2 className="font-cinzel text-[22px] sm:text-[28px] font-bold text-[#26201C] dark:text-[#F5EFE8]">
              {currentLang === 'en' ? 'Authentic Craft Provenance' : 'ঐতিহাসিক বুনন ক্লাস্টার'}
            </h2>
          </div>
          <span className="text-[12px] font-jakarta text-[#756A63] dark:text-[#A3968C]">
            {currentLang === 'en' ? 'Select cluster to filter feed' : 'ফিল্টার করতে সমবায় নির্বাচন করুন'}
          </span>
        </div>

        {/* Cascading Category Cards with authentic border motifs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {craftClusters.map((cluster) => {
            const isSelected = selectedCluster === cluster.id
            return (
              <button
                key={cluster.id}
                type="button"
                onClick={() => setSelectedCluster(cluster.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[90px] relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#0A4269] text-white border-[#0A4269] shadow-md'
                    : 'bg-white dark:bg-[#1B1917] text-[#26201C] dark:text-[#F5EFE8] border-[#E5DDD0] dark:border-[#36312B] hover:border-[#0A4269]'
                }`}
              >
                {/* Decorative Loom Motif Border Pattern Accent */}
                <div
                  className={`absolute top-0 inset-x-0 h-1 ${
                    isSelected ? 'bg-[#D96F3D]' : 'bg-[#E5DDD0] dark:bg-[#36312B]'
                  }`}
                />
                <span className="font-cinzel text-[14px] sm:text-[15px] font-bold mt-1">
                  {currentLang === 'en' ? cluster.labelEn : cluster.labelBn}
                </span>
                <div className="flex items-center justify-between mt-2 pt-1 text-[10px] font-jakarta tracking-wider uppercase opacity-85">
                  <span>{cluster.tag}</span>
                  <span className="text-xs">→</span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* =========================================================================
          3. TWO-COLUMN SPLIT-SCREEN LAYOUT (STICKY LEFT STORYTELLING + RIGHT FEED)
          Left: Sticky artisan loom video/story with bilingual [EN | বাংলা] toggle
          Right: Cascading 2-column feed of handloom Sarees, Khadi, & Muslin Baby sets
          ========================================================================= */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY STORYTELLING PANEL (Col-span 4 on desktop)
              ===================================================================== */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl p-6 sm:p-7 shadow-sm">
              {/* Media Story Box */}
              <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-[#F5EFE8] dark:bg-[#201D1A] mb-5 border border-[#E5DDD0] dark:border-[#36312B]">
                <img
                  src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80"
                  alt="Bengal Handloom Documentary"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0A4269]/90 backdrop-blur-sm text-white font-jakarta text-[9.5px] font-bold uppercase rounded-md">
                  {currentLang === 'en' ? 'Live Loom Documentary' : 'তাঁতের জীবন্ত দলিল'}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-jakarta uppercase tracking-wider text-[#D96F3D] font-bold block">
                    Tangail Jacquard Cluster
                  </span>
                  <p className="text-[13px] font-cinzel font-bold leading-tight">
                    Shri Balaram Pal • Master Weaver (42 Years)
                  </p>
                </div>
              </div>

              {/* Story Narrative Box with 400ms curtain fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLang}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#E5DDD0] dark:border-[#36312B] pb-3">
                    <span className="font-jakarta text-[11px] font-bold text-[#B85324] dark:text-[#D96F3D] uppercase tracking-wider">
                      {currentLang === 'en' ? 'Bilingual Heritage Record' : 'দ্বিভাষিক ঐতিহ্য বিবরণ'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentLang((p) => (p === 'en' ? 'bn' : 'en'))}
                      className="text-[11px] font-jakarta font-bold text-[#0A4269] dark:text-[#3882B5] hover:underline cursor-pointer"
                    >
                      [{currentLang.toUpperCase()} | {currentLang === 'en' ? 'বাংলা' : 'EN'}]
                    </button>
                  </div>

                  <h3 className="font-cinzel text-[20px] font-bold text-[#26201C] dark:text-[#F5EFE8] leading-snug">
                    {currentLang === 'en'
                      ? 'Zero Synthetic Yarns. 100% Fair Artisan Guild.'
                      : 'শতভাগ বিশুদ্ধ সুতো ও তাঁতিদের ন্যায্য মজুরি।'}
                  </h3>

                  <p className="font-jakarta text-[13px] text-[#756A63] dark:text-[#A3968C] leading-relaxed">
                    {currentLang === 'en'
                      ? 'Every motif in Blu Eyes Indigo is hand-counted on traditional pit looms without computerized Jacquard machines. The botanical indigo is cultivated along the Shitalakshya and fermented naturally for 21 days.'
                      : 'ব্লু আইজ ইন্ডিগোর প্রতিটি নকশা ঐতিহ্যবাহী তাঁতে নিজ হাতে তৈরি, কোনো আধুনিক ডিজিটাল নকল ছাড়া। শীতলক্ষ্যা নদীর তীরের প্রাকৃতিক নীল ২১ দিন গাঁজন করে এই গাঢ় আভিজাত্য আনা হয়।'}
                  </p>

                  {/* Provenance Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#F9F6F0] dark:bg-[#121110] border border-[#E5DDD0] dark:border-[#36312B]">
                      <span className="text-[9.5px] font-jakarta uppercase font-bold text-[#B85324] dark:text-[#D96F3D] block">
                        {currentLang === 'en' ? 'Weaving Guild' : 'কারিগর সংঘ'}
                      </span>
                      <span className="font-cinzel text-[16px] font-bold text-[#26201C] dark:text-[#F5EFE8]">
                        1,200+
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F9F6F0] dark:bg-[#121110] border border-[#E5DDD0] dark:border-[#36312B]">
                      <span className="text-[9.5px] font-jakarta uppercase font-bold text-[#0A4269] dark:text-[#3882B5] block">
                        {currentLang === 'en' ? 'Avg Loom Time' : 'বুনন সময়কাল'}
                      </span>
                      <span className="font-cinzel text-[16px] font-bold text-[#26201C] dark:text-[#F5EFE8]">
                        14–28 Days
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-5 mt-4 border-t border-[#E5DDD0] dark:border-[#36312B] flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={onNavigateAbout}
                  className="w-full py-3 bg-[#0A4269] hover:bg-[#083554] text-white rounded-xl font-jakarta text-[12px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  {currentLang === 'en' ? 'Our Tangail Guild Story' : 'আমাদের তাঁত সমবায় কথা'}
                </button>
                <button
                  type="button"
                  onClick={onNavigateLookbook}
                  className="w-full py-2.5 bg-transparent border border-[#E5DDD0] dark:border-[#36312B] text-[#26201C] dark:text-[#F5EFE8] rounded-xl font-jakarta text-[11.5px] font-semibold hover:border-[#0A4269] transition-colors cursor-pointer text-center"
                >
                  {currentLang === 'en' ? 'View Runway Lookbook' : 'রানওয়ে লুকবুক দেখুন'}
                </button>
              </div>
            </div>
          </aside>

          {/* =====================================================================
              RIGHT COLUMN: CASCADING 2-COLUMN FEED (Col-span 8 on desktop)
              ===================================================================== */}
          <main className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-[#E5DDD0] dark:border-[#36312B] pb-3">
              <div>
                <span className="font-jakarta text-[10px] font-bold uppercase tracking-widest text-[#B85324] dark:text-[#D96F3D]">
                  CASCADING MASTER WEAVES
                </span>
                <h3 className="font-cinzel text-[22px] sm:text-[26px] font-bold text-[#26201C] dark:text-[#F5EFE8]">
                  {selectedCluster === 'All'
                    ? (currentLang === 'en' ? 'Complete Handloom Feed' : 'পূর্ণাঙ্গ তাঁত সংগ্রহ')
                    : `${selectedCluster} Collection`}
                </h3>
              </div>
              <span className="text-[12px] font-jakarta text-[#756A63] dark:text-[#A3968C]">
                {cascadingProducts.length} {currentLang === 'en' ? 'Silhouettes' : 'পোশাক'}
              </span>
            </div>

            {/* Cascading 2-Column Responsive Feed on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {cascadingProducts.map((product) => {
                const isFav = !!favorites[product.id]
                return (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl overflow-hidden hover:border-[#0A4269] dark:hover:border-[#3882B5] hover:shadow-md transition-all flex flex-col group"
                  >
                    {/* Image Stage */}
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="relative w-full aspect-[4/5] bg-[#F9F6F0] dark:bg-[#121110] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Loom Provenance Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm text-[#0A4269] dark:text-[#3882B5] text-[10px] font-jakarta font-bold uppercase rounded-md border border-[#E5DDD0] dark:border-[#36312B]">
                          {currentLang === 'en' ? product.craftTag : product.craftTagBn}
                        </span>
                      </div>

                      {/* Weave Time Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-jakarta rounded flex items-center gap-1">
                          <Feather className="w-3 h-3 text-[#D96F3D]" />
                          <span>
                            {product.weaveTimeDays} {currentLang === 'en' ? 'Days Loom' : 'দিনের বুনন'}
                          </span>
                        </span>
                      </div>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(product.id, e)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md flex items-center justify-center text-[#26201C] dark:text-white hover:text-[#B85324] transition-colors cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFav ? 'fill-[#B85324] text-[#B85324]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-jakarta text-[#756A63] dark:text-[#A3968C] mb-1">
                          <span>{currentLang === 'en' ? product.artisanOrigin : product.artisanOriginBn}</span>
                          <span className="text-[#0A4269] dark:text-[#3882B5] font-semibold">{product.category}</span>
                        </div>

                        <h4
                          onClick={() => onSelectProduct(product)}
                          className="font-cinzel font-bold text-[16px] text-[#26201C] dark:text-[#F5EFE8] group-hover:text-[#0A4269] dark:group-hover:text-[#3882B5] transition-colors line-clamp-1 cursor-pointer"
                        >
                          {currentLang === 'en' ? product.title : product.titleBn}
                        </h4>

                        <p className="font-jakarta text-[12px] text-[#756A63] dark:text-[#A3968C] mt-1 line-clamp-2 leading-relaxed">
                          {currentLang === 'en' ? product.description : product.descriptionBn}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#E5DDD0] dark:border-[#36312B] flex items-center justify-between">
                        <div>
                          <span className="font-jakarta font-bold text-[16px] text-[#0A4269] dark:text-[#3882B5]">
                            ৳{product.priceBDT.toLocaleString()}
                          </span>
                          <span className="font-jakarta text-[11px] text-[#756A63] dark:text-[#A3968C] ml-1.5">
                            (${product.priceUSD})
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onQuickAdd(product)}
                          className="px-3.5 py-1.5 bg-[#0A4269] dark:bg-[#3882B5] text-white rounded-lg text-[11px] font-jakarta font-semibold hover:bg-[#083554] transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          {t.actions.quickAdd}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </section>
    </div>
  )
}
