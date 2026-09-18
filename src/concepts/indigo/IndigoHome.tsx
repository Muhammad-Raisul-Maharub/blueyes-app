import React from 'react'
import type { IndigoProduct, IndigoCategory, Language } from './types'
import { getTranslation } from './translations'
import { INDIGO_PRODUCTS, DEMOGRAPHIC_PODS } from './indigoData'
import { ArrowRight, Sparkles, Feather, Heart } from 'lucide-react'

interface IndigoHomeProps {
  onSelectProduct: (product: IndigoProduct) => void
  onNavigateCategory: (category: IndigoCategory) => void
  onNavigateLookbook: () => void
  onNavigateAbout: () => void
  onQuickAdd: (product: IndigoProduct) => void
  language: Language
}

export const IndigoHome: React.FC<IndigoHomeProps> = ({
  onSelectProduct,
  onNavigateCategory,
  onNavigateLookbook,
  onNavigateAbout,
  onQuickAdd,
  language,
}) => {
  const t = getTranslation(language)
  const heroProduct = INDIGO_PRODUCTS.find((p) => p.isHero) || INDIGO_PRODUCTS[0]
  const featuredWeaves = INDIGO_PRODUCTS.filter((p) => p.isFeatured).slice(0, 6)

  return (
    <div className="w-full flex flex-col pb-24 transition-colors duration-200">
      {/* 1. Hero Banner: The Tangail & Rajshahi Silk Edit */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="w-full bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl overflow-hidden shadow-sm flex flex-col lg:grid lg:grid-cols-12">
          {/* Left Media Spread */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] lg:h-[600px] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
              alt="The Tangail & Rajshahi Silk Edit"
              className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />

            {/* Artisanal Heritage Tag */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#0A4269]/90 backdrop-blur-sm text-white font-jakarta text-[10px] font-semibold tracking-widest uppercase rounded-full shadow-xs">
                {language === 'en' ? 'Authentic Master Loom' : 'খাঁটি তাঁতের সৃষ্টি'}
              </span>
              <span className="px-3 py-1 bg-[#B85324]/90 backdrop-blur-sm text-white font-jakarta text-[10px] font-semibold tracking-widest uppercase rounded-full shadow-xs">
                {language === 'en' ? 'Natural Botanical Dye' : 'প্রাকৃতিক উদ্ভিজ্জ নীল'}
              </span>
            </div>

            {/* Micro Badge for Hero Piece */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#F9F6F0]/95 dark:bg-[#121110]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E5DDD0] dark:border-[#36312B] flex items-center justify-between sm:justify-start gap-4 shadow-sm">
              <div>
                <p className="text-[10px] font-jakarta tracking-wider text-[#B85324] dark:text-[#D96F3D] uppercase font-bold">
                  {language === 'en' ? 'Featured Masterpiece' : 'নির্বাচিত শিল্পকর্ম'}
                </p>
                <p className="text-[13px] font-cinzel font-bold text-[#26201C] dark:text-[#F5EFE8]">
                  {language === 'en' ? heroProduct.title : heroProduct.titleBn}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectProduct(heroProduct)}
                className="px-3 py-1.5 bg-[#0A4269] text-white text-[11px] font-jakarta font-semibold rounded-lg hover:bg-[#083554] cursor-pointer transition-colors flex items-center gap-1"
              >
                <span>{language === 'en' ? 'Explore' : 'দেখুন'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Narrative & CTAs */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#FFFFFF] dark:bg-[#1B1917] border-t lg:border-t-0 lg:border-l border-[#E5DDD0] dark:border-[#36312B]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3ECE2] dark:bg-[#25221F] text-[#B85324] dark:text-[#D96F3D] rounded-full text-[11px] font-jakarta font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.hero.eyebrow}</span>
              </div>

              <h1 className="font-cinzel text-[30px] sm:text-[38px] lg:text-[42px] leading-[1.15] text-[#26201C] dark:text-[#F5EFE8] font-bold">
                {t.hero.title}
              </h1>

              <p className="font-jakarta text-[14px] sm:text-[15px] leading-relaxed text-[#756A63] dark:text-[#A3968C]">
                {t.hero.subtitle}
              </p>

              {/* Cultural Trust Specs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#F9F6F0] dark:bg-[#121110] rounded-xl border border-[#E5DDD0] dark:border-[#36312B]">
                  <span className="text-[10px] font-jakarta tracking-wider text-[#B85324] dark:text-[#D96F3D] font-bold uppercase block">
                    {language === 'en' ? 'Loom Provenance' : 'তাঁতের উৎস'}
                  </span>
                  <span className="text-[12px] font-jakarta font-bold text-[#26201C] dark:text-[#F5EFE8]">
                    {language === 'en' ? 'Tangail & Rajshahi' : 'টাঙ্গাইল ও রাজশাহী'}
                  </span>
                </div>
                <div className="p-3 bg-[#F9F6F0] dark:bg-[#121110] rounded-xl border border-[#E5DDD0] dark:border-[#36312B]">
                  <span className="text-[10px] font-jakarta tracking-wider text-[#0A4269] dark:text-[#3882B5] font-bold uppercase block">
                    {language === 'en' ? 'Craft Guild' : 'কারিগর সংখ্যা'}
                  </span>
                  <span className="text-[12px] font-jakarta font-bold text-[#26201C] dark:text-[#F5EFE8]">
                    {language === 'en' ? '1,200+ Master Weavers' : '১,২০০+ তাঁতশিল্পী'}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onNavigateCategory('Women')}
                className="flex-1 py-3.5 px-6 bg-[#0A4269] dark:bg-[#3882B5] text-white rounded-xl font-jakarta text-[13px] font-semibold tracking-wide hover:bg-[#083554] dark:hover:bg-[#2E709F] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onNavigateAbout}
                className="py-3.5 px-6 bg-[#F9F6F0] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8] border border-[#E5DDD0] dark:border-[#36312B] rounded-xl font-jakarta text-[13px] font-medium hover:border-[#0A4269] dark:hover:border-[#3882B5] transition-all cursor-pointer text-center"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Demographic Discovery Pods: 5 Circular Cards with Authentic Framing */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 pb-4 border-b border-[#E5DDD0] dark:border-[#36312B] gap-3">
          <div>
            <span className="text-[10px] font-jakarta uppercase tracking-[0.25em] text-[#B85324] dark:text-[#D96F3D] font-bold">
              {t.pods.sectionTitle}
            </span>
            <h2 className="font-cinzel text-[24px] sm:text-[32px] text-[#26201C] dark:text-[#F5EFE8] font-bold mt-1">
              {language === 'en' ? 'Explore by Department' : 'বিভাগ অনুযায়ী অন্বেষণ'}
            </h2>
          </div>
          <p className="font-jakarta text-[13px] text-[#756A63] dark:text-[#A3968C] max-w-md text-left">
            {t.pods.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {DEMOGRAPHIC_PODS.map((pod) => (
            <button
              key={pod.id}
              type="button"
              onClick={() => onNavigateCategory(pod.category as IndigoCategory)}
              className="flex flex-col items-center text-center p-4 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl hover:border-[#0A4269] dark:hover:border-[#3882B5] hover:shadow-md transition-all group cursor-pointer"
            >
              {/* Circular Pod with Terracotta Weave Ring */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 border-2 border-dashed border-[#B85324]/40 group-hover:border-[#0A4269] dark:group-hover:border-[#3882B5] transition-all mb-3 overflow-hidden flex-shrink-0">
                <img
                  src={pod.image}
                  alt={pod.title}
                  className="w-full h-full object-cover object-center rounded-full group-hover:scale-108 transition-transform duration-500"
                />
              </div>

              <h3 className="font-cinzel text-[15px] sm:text-[17px] font-bold text-[#26201C] dark:text-[#F5EFE8] group-hover:text-[#0A4269] dark:group-hover:text-[#3882B5] transition-colors">
                {language === 'en' ? pod.title : pod.titleBn}
              </h3>
              <p className="font-jakarta text-[11px] text-[#756A63] dark:text-[#A3968C] mt-0.5">
                {language === 'en' ? pod.tagline : pod.taglineBn}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Asymmetrical Bento Grid: Khadi, Muslin Baby, Brass Jewelry */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="mb-8">
          <span className="text-[10px] font-jakarta uppercase tracking-[0.25em] text-[#B85324] dark:text-[#D96F3D] font-bold">
            {language === 'en' ? 'Craft Specialization' : 'প্রাচীন বুনন নৈপুণ্য'}
          </span>
          <h2 className="font-cinzel text-[24px] sm:text-[32px] text-[#26201C] dark:text-[#F5EFE8] font-bold mt-1">
            {language === 'en' ? 'Artisanal Bento Matrix' : 'ঐতিহ্যের তিন স্তম্ভ'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Bento Item 1: Handloom Khadi (7 columns) */}
          <div
            onClick={() => onNavigateCategory('Men')}
            className="md:col-span-7 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl p-6 sm:p-8 relative overflow-hidden group cursor-pointer hover:border-[#0A4269] dark:hover:border-[#3882B5] hover:shadow-md transition-all flex flex-col justify-between min-h-[340px]"
          >
            <div className="z-10 max-w-sm">
              <span className="px-3 py-1 bg-[#F3ECE2] dark:bg-[#25221F] text-[#0A4269] dark:text-[#3882B5] text-[10px] font-jakarta font-bold uppercase rounded-full">
                {language === 'en' ? 'Cumilla Weave Guild' : 'কুমিল্লা তাঁত সমবায়'}
              </span>
              <h3 className="font-cinzel font-bold text-[22px] sm:text-[28px] text-[#26201C] dark:text-[#F5EFE8] mt-3">
                {t.bento.khadiTitle}
              </h3>
              <p className="font-jakarta text-[13px] text-[#756A63] dark:text-[#A3968C] mt-2 leading-relaxed">
                {t.bento.khadiSubtitle}
              </p>
            </div>

            <div className="z-10 pt-6">
              <span className="inline-flex items-center gap-2 text-[12px] font-jakarta font-semibold text-[#0A4269] dark:text-[#3882B5] group-hover:gap-3 transition-all">
                <span>{language === 'en' ? 'Shop Khadi Silhouettes' : 'খাদি পোশাক দেখুন'}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <img
              src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=700&q=80"
              alt="Handloom Khadi"
              className="absolute right-0 bottom-0 w-1/2 h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700 hidden sm:block mask-radial"
            />
          </div>

          {/* Bento Item 2 & 3 (5 columns stacked) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Muslin Baby Care */}
            <div
              onClick={() => onNavigateCategory('Baby')}
              className="flex-1 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:border-[#B85324] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="z-10">
                <span className="px-2.5 py-0.5 bg-[#F3ECE2] dark:bg-[#25221F] text-[#B85324] dark:text-[#D96F3D] text-[10px] font-jakarta font-bold uppercase rounded-full">
                  {language === 'en' ? 'Gentle for Newborns' : 'নবজাতকের কোমলতা'}
                </span>
                <h3 className="font-cinzel font-bold text-[18px] text-[#26201C] dark:text-[#F5EFE8] mt-2">
                  {t.bento.muslinTitle}
                </h3>
                <p className="font-jakarta text-[12px] text-[#756A63] dark:text-[#A3968C] mt-1 leading-relaxed">
                  {t.bento.muslinSubtitle}
                </p>
              </div>
              <div className="z-10 pt-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-jakarta font-semibold text-[#B85324] dark:text-[#D96F3D]">
                  <span>{language === 'en' ? 'Explore Muslin Hampers' : 'মসলিন উপহার সেট'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Handcrafted Brass Jewelry */}
            <div
              onClick={() => onNavigateCategory('Accessories')}
              className="flex-1 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:border-[#0A4269] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="z-10">
                <span className="px-2.5 py-0.5 bg-[#F3ECE2] dark:bg-[#25221F] text-[#0A4269] dark:text-[#3882B5] text-[10px] font-jakarta font-bold uppercase rounded-full">
                  {language === 'en' ? 'Lost-Wax Heritage' : 'ধামরাই মেটাল ক্রাফট'}
                </span>
                <h3 className="font-cinzel font-bold text-[18px] text-[#26201C] dark:text-[#F5EFE8] mt-2">
                  {t.bento.brassTitle}
                </h3>
                <p className="font-jakarta text-[12px] text-[#756A63] dark:text-[#A3968C] mt-1 leading-relaxed">
                  {t.bento.brassSubtitle}
                </p>
              </div>
              <div className="z-10 pt-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-jakarta font-semibold text-[#0A4269] dark:text-[#3882B5]">
                  <span>{language === 'en' ? 'Discover Brass Ornaments' : 'অলঙ্কার দেখুন'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Curated Master Weaves Product Showcase with Quick Add */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 pb-4 border-b border-[#E5DDD0] dark:border-[#36312B] gap-3">
          <div>
            <span className="text-[10px] font-jakarta uppercase tracking-[0.25em] text-[#B85324] dark:text-[#D96F3D] font-bold">
              {language === 'en' ? 'Artisan Spotlight' : 'নির্বাচিত তাঁতের সম্ভার'}
            </span>
            <h2 className="font-cinzel text-[24px] sm:text-[32px] text-[#26201C] dark:text-[#F5EFE8] font-bold mt-1">
              {language === 'en' ? 'Festive & Heritage Masterpieces' : 'উৎসবের সেরা পোশাকসমূহ'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateCategory('Women')}
            className="font-jakarta text-[12px] font-semibold text-[#0A4269] dark:text-[#3882B5] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t.actions.viewArchive}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWeaves.map((product) => (
            <div
              key={product.id}
              className="bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl overflow-hidden hover:border-[#0A4269] dark:hover:border-[#3882B5] hover:shadow-md transition-all flex flex-col group"
            >
              {/* Card Image */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative w-full aspect-[4/5] bg-[#F9F6F0] dark:bg-[#121110] overflow-hidden cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {/* Loom Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-[#F9F6F0]/90 dark:bg-[#121110]/90 backdrop-blur-sm text-[#0A4269] dark:text-[#3882B5] text-[10px] font-jakarta font-bold uppercase rounded-md shadow-xs border border-[#E5DDD0] dark:border-[#36312B]">
                    {language === 'en' ? product.craftTag : product.craftTagBn}
                  </span>
                </div>
                {/* Weave Time Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-jakarta rounded flex items-center gap-1">
                    <Feather className="w-3 h-3 text-[#D96F3D]" />
                    <span>{product.weaveTimeDays} {language === 'en' ? 'Days Loom' : 'দিনের বুনন'}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-jakarta text-[#756A63] dark:text-[#A3968C] mb-1.5">
                    <span>{language === 'en' ? product.artisanOrigin : product.artisanOriginBn}</span>
                    <span className="text-[#0A4269] dark:text-[#3882B5] font-semibold">{product.category}</span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-cinzel font-bold text-[16px] text-[#26201C] dark:text-[#F5EFE8] group-hover:text-[#0A4269] dark:group-hover:text-[#3882B5] transition-colors line-clamp-1 cursor-pointer"
                  >
                    {language === 'en' ? product.title : product.titleBn}
                  </h3>

                  <p className="font-jakarta text-[12px] text-[#756A63] dark:text-[#A3968C] mt-1 line-clamp-2 leading-relaxed">
                    {language === 'en' ? product.description : product.descriptionBn}
                  </p>
                </div>

                {/* Price and Quick Add */}
                <div className="pt-4 mt-3 border-t border-[#E5DDD0] dark:border-[#36312B] flex items-center justify-between">
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
                    className="px-3.5 py-1.5 bg-[#0A4269] dark:bg-[#3882B5] text-white rounded-lg text-[11px] font-jakarta font-semibold tracking-wide hover:bg-[#083554] dark:hover:bg-[#2E709F] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    {t.actions.quickAdd}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Cultural Manifesto Callout */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="w-full bg-[#F3ECE2] dark:bg-[#25221F] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-jakarta font-bold tracking-[0.2em] text-[#B85324] dark:text-[#D96F3D] uppercase">
              <Heart className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Craft Guild Ethical Mission' : 'নৈতিক কারুশিল্প অঙ্গীকার'}</span>
            </span>

            <h2 className="font-cinzel text-[26px] sm:text-[34px] font-bold text-[#26201C] dark:text-[#F5EFE8]">
              {language === 'en'
                ? 'Preserving 500 Years of Bengal Handloom Heritage'
                : 'বাংলার ৫০০ বছরের ঐতিহ্যবাহী তাঁতশিল্পের সংরক্ষণ'}
            </h2>

            <p className="font-jakarta text-[14px] text-[#756A63] dark:text-[#A3968C] leading-relaxed">
              {language === 'en'
                ? 'Every thread of Blu Eyes Indigo directly empowers generational weaving clusters along the Karnaphuli, Shitalakshya, and Padma rivers. We pledge 100% fair wages and natural, eco-positive botanical dyes.'
                : 'ব্লু আইজ ইন্ডিগোর প্রতিটি পোশাক কর্ণফুলী, শীতলক্ষ্যা ও পদ্মা নদীর তীরের ঐতিহ্যবাহী তাঁতিদের সরাসরি সহায়তা করে। আমরা শতভাগ ন্যায্য মজুরি এবং পরিবেশবান্ধব প্রাকৃতিক রঞ্জকের নিশ্চয়তা দিই।'}
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={onNavigateLookbook}
                className="px-6 py-3 bg-[#0A4269] dark:bg-[#3882B5] text-white rounded-xl text-[12px] font-jakarta font-semibold tracking-wide hover:bg-[#083554] transition-all cursor-pointer shadow-sm"
              >
                {language === 'en' ? 'View Runway Lookbook' : 'লুকবুক দেখুন'}
              </button>
              <button
                type="button"
                onClick={onNavigateAbout}
                className="px-6 py-3 bg-[#FFFFFF] dark:bg-[#1B1917] text-[#26201C] dark:text-[#F5EFE8] border border-[#E5DDD0] dark:border-[#36312B] rounded-xl text-[12px] font-jakarta font-semibold hover:border-[#0A4269] transition-all cursor-pointer"
              >
                {language === 'en' ? 'Our Flagship Salons' : 'আমাদের সেলুন পরিচিতি'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
