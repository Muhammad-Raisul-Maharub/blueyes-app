import React from 'react'
import type { Language } from './types'
import { getTranslation } from './translations'
import { MapPin, Phone, Clock, ShieldCheck, Heart, Sparkles, Feather, ArrowLeft } from 'lucide-react'

interface IndigoAboutProps {
  onExploreDrops: () => void
  language: Language
  onBack?: () => void
}

export const IndigoAbout: React.FC<IndigoAboutProps> = ({ onExploreDrops, language, onBack }) => {
  const t = getTranslation(language)

  return (
    <div className="w-full flex flex-col pb-24 transition-colors duration-200">
      {/* Top Return Navigation Bar */}
      {onBack && (
        <div className="w-full bg-[#FFFFFF] dark:bg-[#1B1917] border-b border-[#E5DDD0] dark:border-[#36312B] py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-[11px] font-jakarta font-semibold text-[#756A63] dark:text-[#A3968C] hover:text-[#0A4269] dark:hover:text-[#3882B5] px-3 py-1.5 rounded-full bg-[#F3ECE2] dark:bg-[#25221F] border border-[#E5DDD0] dark:border-[#36312B] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Return to Previous Screen' : 'পূর্ববর্তী পর্দায় ফিরে যান'}</span>
            </button>
            <span className="font-cinzel text-[11px] text-[#756A63] dark:text-[#A3968C] uppercase tracking-widest hidden sm:inline-block">
              {language === 'en' ? 'Maison Provenance' : 'মেসন পটভূমি'}
            </span>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <section className="relative w-full bg-[#FFFFFF] dark:bg-[#1B1917] border-b border-[#E5DDD0] dark:border-[#36312B] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F3ECE2] dark:bg-[#25221F] text-[#B85324] dark:text-[#D96F3D] rounded-full text-[11px] font-jakarta font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Artisanal Heritage Manifesto' : 'ঐতিহ্য ও কারুশিল্পের মেলবন্ধন'}</span>
          </div>

          <h1 className="font-cinzel font-bold text-[32px] sm:text-[46px] text-[#26201C] dark:text-[#F5EFE8] leading-tight">
            {language === 'en'
              ? 'Maison Chattogram: From the Karnaphuli to the Ancient Looms of Bengal'
              : 'মেসন চট্টগ্রাম: কর্ণফুলীর বুক থেকে বাংলার শতবর্ষী প্রাচীন তাঁতে'}
          </h1>

          <p className="font-jakarta text-[14px] sm:text-[16px] text-[#756A63] dark:text-[#A3968C] leading-relaxed max-w-2xl mx-auto">
            {language === 'en'
              ? 'We bridge ancestral textile wisdom with modern editorial silhouettes. Discover how our 1,200+ master weavers bring plant-based indigo and raw mulberry silks to life.'
              : 'বাংলার পূর্বপুরুষদের তাঁতবিদ্যা ও আধুনিক নান্দনিকতার অপূর্ব মেলবন্ধন। জানুন কীভাবে ১২০০+ তাঁতশিল্পী খাঁটি উদ্ভিজ্জ নীল ও রেশম সিল্ক দিয়ে তৈরি করেন প্রতিটি অনবদ্য সৃষ্টি।'}
          </p>
        </div>
      </section>

      {/* Craft Pillars */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F3ECE2] dark:bg-[#25221F] text-[#0A4269] dark:text-[#3882B5] flex items-center justify-center">
              <Feather className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel font-bold text-[18px] text-[#26201C] dark:text-[#F5EFE8]">
              {language === 'en' ? 'Natural Botanical Vats' : 'প্রাকৃতিক উদ্ভিজ্জ নীল গাঁজন'}
            </h3>
            <p className="font-jakarta text-[13px] text-[#756A63] dark:text-[#A3968C] leading-relaxed">
              {language === 'en'
                ? 'Our deep blue dye is steeped in earthen vats using indigenous indigo leaves, jaggery, and slaked lime. Zero synthetic chemical mordants, zero stream pollution.'
                : 'মাটির জাবলায় খাঁটি নীল পাতা, গুড় ও চুনের গাঁজনে তৈরি হয় আমাদের নীল রঙ। কোনো ক্ষতিকর রাসায়নিক বা নদী দূষণ ছাড়াই শতভাগ পরিবেশবান্ধব।'}
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F3ECE2] dark:bg-[#25221F] text-[#B85324] dark:text-[#D96F3D] flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel font-bold text-[18px] text-[#26201C] dark:text-[#F5EFE8]">
              {language === 'en' ? 'Fair Wage Guilds' : 'ন্যায্য মজুরি ও সমবায়'}
            </h3>
            <p className="font-jakarta text-[13px] text-[#756A63] dark:text-[#A3968C] leading-relaxed">
              {language === 'en'
                ? 'We partner directly with craft cooperatives in Tangail, Rajshahi, and Cumilla, eliminating predatory middlemen to guarantee fair, dignified livelihoods.'
                : 'টাঙ্গাইল, রাজশাহী ও কুমিল্লার প্রান্তিক তাঁতিদের সাথে সরাসরি কাজের মাধ্যমে মধ্যস্বত্বভোগী নির্মূল করে সম্মানজনক মজুরি নিশ্চিত করা হয়েছে।'}
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F3ECE2] dark:bg-[#25221F] text-[#0A4269] dark:text-[#3882B5] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel font-bold text-[18px] text-[#26201C] dark:text-[#F5EFE8]">
              {language === 'en' ? 'Slow Fashion Integrity' : 'ধীর ও টেকসই ফ্যাশন'}
            </h3>
            <p className="font-jakarta text-[13px] text-[#756A63] dark:text-[#A3968C] leading-relaxed">
              {language === 'en'
                ? 'Each piece requires between 4 to 24 days on traditional handlooms. We believe true luxury lies in patience, provenance, and tactile memories.'
                : 'প্রতিটি পোশাক বুনতে সময় লাগে ৪ থেকে ২৪ দিন পর্যন্ত। আমরা বিশ্বাস করি সত্যিকারের বিলাসিতা ধৈর্য ও শ্রদ্ধাশীল শ্রমে নিহিত।'}
            </p>
          </div>
        </div>
      </section>

      {/* Physical Maison Locations */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="mb-8">
          <span className="text-[10px] font-jakarta uppercase tracking-[0.25em] text-[#B85324] dark:text-[#D96F3D] font-bold">
            {language === 'en' ? 'Physical Presence' : 'সরাসরি প্রদর্শনী'}
          </span>
          <h2 className="font-cinzel text-[24px] sm:text-[32px] text-[#26201C] dark:text-[#F5EFE8] font-bold mt-1">
            {t.footer.locations}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flagship CTG */}
          <div className="p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-[#0A4269] dark:text-[#3882B5]">
              <MapPin className="w-5 h-5" />
              <h3 className="font-cinzel font-bold text-[18px]">
                {language === 'en' ? 'Chattogram Flagship Salon' : 'চট্টগ্রাম ফ্ল্যাগশিপ সেলুন'}
              </h3>
            </div>
            <p className="font-jakarta text-[13px] text-[#756A63] dark:text-[#A3968C]">
              {language === 'en'
                ? 'Level 4, GEC Circle Heritage Galleria, Nasirabad, Chattogram'
                : 'লেভেল ৪, জিইসি মোড় হেরিটেজ গ্যালারিয়া, নাসিরাবাদ, চট্টগ্রাম'}
            </p>
            <div className="space-y-1.5 text-[12px] font-jakarta text-[#756A63] dark:text-[#A3968C] pt-2 border-t border-[#E5DDD0] dark:border-[#36312B]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B85324]" />
                <span>{language === 'en' ? 'Saturday – Thursday: 10:00 AM – 9:00 PM BST' : 'শনিবার – বৃহস্পতিবার: সকাল ১০টা – রাত ৯টা'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0A4269] dark:text-[#3882B5]" />
                <span>+880 1711-987654</span>
              </div>
            </div>
          </div>

          {/* Dhaka Liaison Suite */}
          <div className="p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-[#0A4269] dark:text-[#3882B5]">
              <MapPin className="w-5 h-5" />
              <h3 className="font-cinzel font-bold text-[18px]">
                {language === 'en' ? 'Dhaka Liaison Suite' : 'ঢাকা লিয়াজোঁ স্যুট'}
              </h3>
            </div>
            <p className="font-jakarta text-[13px] text-[#756A63] dark:text-[#A3968C]">
              {language === 'en'
                ? 'House 42, Road 11, Block D, Banani, Dhaka'
                : 'বাড়ি ৪২, রোড ১১, ব্লক ডি, বনানী, ঢাকা'}
            </p>
            <div className="space-y-1.5 text-[12px] font-jakarta text-[#756A63] dark:text-[#A3968C] pt-2 border-t border-[#E5DDD0] dark:border-[#36312B]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B85324]" />
                <span>{language === 'en' ? 'Sunday – Friday: 11:00 AM – 8:00 PM BST' : 'রবিবার – শুক্রবার: সকাল ১১টা – রাত ৮টা'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0A4269] dark:text-[#3882B5]" />
                <span>+880 1819-234567</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Return */}
        <div className="pt-12 text-center">
          <button
            type="button"
            onClick={onExploreDrops}
            className="px-8 py-4 bg-[#0A4269] dark:bg-[#3882B5] text-white rounded-xl font-jakarta text-[13px] font-semibold tracking-wide hover:bg-[#083554] dark:hover:bg-[#2E709F] transition-all cursor-pointer shadow-sm"
          >
            {language === 'en' ? 'Explore Handcrafted Collections' : 'হস্তনির্মিত পোশাক সংগ্রহ দেখুন'}
          </button>
        </div>
      </section>
    </div>
  )
}
