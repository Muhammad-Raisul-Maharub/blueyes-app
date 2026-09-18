import React from 'react'
import type { IndigoProduct, IndigoCategory, Language } from './types'
import { INDIGO_PRODUCTS } from './indigoData'
import { ArrowRight, MapPin, Feather } from 'lucide-react'

interface IndigoLookbookProps {
  onSelectProduct: (product: IndigoProduct) => void
  onNavigateCategory: (category: IndigoCategory) => void
  language: Language
}

export const IndigoLookbook: React.FC<IndigoLookbookProps> = ({
  onSelectProduct,
  onNavigateCategory,
  language,
}) => {

  const editorialStories = [
    {
      id: 'look-1',
      title: 'The Tangail Sovereign Jamdani Series',
      titleBn: 'টাঙ্গাইল জামদানি রাজকীয় সিরিজ',
      location: 'Bajitpur Village, Tangail',
      locationBn: 'বাজিতপুর গ্রাম, টাঙ্গাইল',
      curator: 'Master Weaver Abdul Mannan',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      narrative:
        'Captured on the misty morning banks of the Jamuna river. A celebration of fine 100-count unbleached gold zari and botanical indigo steeped over six generational fermentation cycles.',
      narrativeBn:
        'যমুনা নদীর তীরে কুয়াশাচ্ছন্ন ভোরের দৃশ্য। শতবর্ষের প্রাকৃতিক নীল গাঁজন এবং সোনালী জরির সুক্ষ্ম নকশায় বোনা অনন্য শিল্পকর্ম।',
      taggedProduct: INDIGO_PRODUCTS[0],
    },
    {
      id: 'look-2',
      title: 'Imperial Rajshahi Raw Silk Architecture',
      titleBn: 'রাজশাহী র সিল্ক আভিজাত্য',
      location: 'Sopura Mulberry Cluster, Rajshahi',
      locationBn: 'সোপুরা তুঁত বাগান, রাজশাহী',
      curator: 'Silk Master Faruk Hossain',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      narrative:
        'Tailored panjabis re-imagined with modern architectural lines. Hand-spun Matka raw silk carrying natural slub imperfections that define royal Bengal craftsmanship.',
      narrativeBn:
        'আধুনিক কাটে তৈরি রাজকীয় র সিল্ক পাঞ্জাবি। হাতে টানা মটকা সিল্কের প্রাকৃতিক টেক্সচার যা বাংলার ঐতিহ্যবাহী কারুশিল্পের প্রতীক।',
      taggedProduct: INDIGO_PRODUCTS[3],
    },
    {
      id: 'look-3',
      title: 'Karnaphuli Riverbank Khadi Cape & Drape',
      titleBn: 'কর্ণফুলীর বাঁকে খাদি কেপ ও ড্র্যাপ',
      location: 'Karnaphuli Estuary, Chattogram',
      locationBn: 'কর্ণফুলী মোহনা, চট্টগ্রাম',
      curator: 'Maison Chattogram Studio',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      narrative:
        'Where port breezes meet ancient hand-spun khadi. Lightweight, all-weather unbleached cotton embroidered with river wave running stitches.',
      narrativeBn:
        'চট্টগ্রামের সামুদ্রিক বাতাসের সাথে খাদি সুতার মেলবন্ধন। নদীর ঢেউয়ের নকশায় হাতে সেলাই করা আধুনিক কেপ ও কুর্তি।',
      taggedProduct: INDIGO_PRODUCTS[1],
    },
  ]

  return (
    <div className="w-full flex flex-col pb-24 transition-colors duration-200">
      {/* Editorial Header */}
      <section className="w-full bg-[#FFFFFF] dark:bg-[#1B1917] border-b border-[#E5DDD0] dark:border-[#36312B] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-[10px] font-jakarta font-bold uppercase tracking-[0.25em] text-[#B85324] dark:text-[#D96F3D]">
            {language === 'en' ? 'Editorial Lookbook Series' : 'সম্পাদনা লুকবুক সিরিজ'}
          </span>
          <h1 className="font-cinzel font-bold text-[32px] sm:text-[44px] text-[#26201C] dark:text-[#F5EFE8]">
            {language === 'en' ? 'From the Ancient Looms of Bengal' : 'বাংলার শতবর্ষী প্রাচীন তাঁতের গল্প'}
          </h1>
          <p className="font-jakarta text-[14px] text-[#756A63] dark:text-[#A3968C] max-w-xl mx-auto">
            {language === 'en'
              ? 'A curated visual journey through the river clusters of Tangail, Rajshahi, Cumilla, and the port city of Chattogram.'
              : 'টাঙ্গাইল, রাজশাহী, কুমিল্লা ও বন্দরনগরী চট্টগ্রামের নদী অববাহিকার কারিগরদের জীবন ও সৃষ্টির এক অনন্য চিত্রমালা।'}
          </p>
        </div>
      </section>

      {/* Editorial Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {editorialStories.map((story, idx) => (
          <article
            key={story.id}
            className="w-full bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image (7 cols) */}
            <div
              className={`lg:col-span-7 relative h-[380px] sm:h-[480px] lg:h-[540px] overflow-hidden ${
                idx % 2 === 1 ? 'lg:order-2' : ''
              }`}
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-jakarta flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D96F3D]" />
                <span>{language === 'en' ? story.location : story.locationBn}</span>
              </div>
            </div>

            {/* Narrative & Tagged Product (5 cols) */}
            <div
              className={`lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-[#FFFFFF] dark:bg-[#1B1917] border-t lg:border-t-0 ${
                idx % 2 === 1 ? 'lg:order-1 lg:border-r' : 'lg:border-l'
              } border-[#E5DDD0] dark:border-[#36312B]`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[11px] font-jakarta text-[#B85324] dark:text-[#D96F3D] font-bold uppercase tracking-wider">
                  <Feather className="w-3.5 h-3.5" />
                  <span>{story.curator}</span>
                </div>

                <h2 className="font-cinzel font-bold text-[22px] sm:text-[28px] text-[#26201C] dark:text-[#F5EFE8] leading-snug">
                  {language === 'en' ? story.title : story.titleBn}
                </h2>

                <p className="font-jakarta text-[13px] sm:text-[14px] text-[#756A63] dark:text-[#A3968C] leading-relaxed">
                  {language === 'en' ? story.narrative : story.narrativeBn}
                </p>
              </div>

              {/* Tagged Product Box */}
              {story.taggedProduct && (
                <div className="pt-6 mt-6 border-t border-[#E5DDD0] dark:border-[#36312B]">
                  <div
                    onClick={() => onSelectProduct(story.taggedProduct!)}
                    className="p-3.5 bg-[#F9F6F0] dark:bg-[#121110] border border-[#E5DDD0] dark:border-[#36312B] rounded-xl flex items-center justify-between gap-3 hover:border-[#0A4269] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                        <img
                          src={story.taggedProduct.images[0]}
                          alt={story.taggedProduct.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-jakarta text-[#B85324] font-bold uppercase block">
                          {language === 'en' ? 'Garment Featured' : 'ছবিতে প্রদর্শিত পোশাক'}
                        </span>
                        <h4 className="font-cinzel font-bold text-[13px] text-[#26201C] dark:text-[#F5EFE8] group-hover:text-[#0A4269] transition-colors line-clamp-1">
                          {language === 'en' ? story.taggedProduct.title : story.taggedProduct.titleBn}
                        </h4>
                        <span className="font-jakarta font-bold text-[12px] text-[#0A4269] dark:text-[#3882B5]">
                          ৳{story.taggedProduct.priceBDT.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#756A63] group-hover:text-[#0A4269] group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onNavigateCategory(story.taggedProduct!.category)}
                      className="text-[11px] font-jakarta font-semibold text-[#0A4269] dark:text-[#3882B5] hover:underline cursor-pointer"
                    >
                      {language === 'en'
                        ? `Explore ${story.taggedProduct!.category} Collection →`
                        : `${story.taggedProduct!.category} সংগ্রহ দেখুন →`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
