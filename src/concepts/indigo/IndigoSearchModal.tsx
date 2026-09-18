import React, { useState, useMemo } from 'react'
import type { IndigoProduct, Language } from './types'
import { INDIGO_PRODUCTS } from './indigoData'
import { Search, X, Feather, ArrowRight } from 'lucide-react'

interface IndigoSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProduct: (product: IndigoProduct) => void
  language: Language
}

export const IndigoSearchModal: React.FC<IndigoSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  language,
}) => {
  const [query, setQuery] = useState('')

  const suggestionTags = [
    { label: 'Jamdani', labelBn: 'জামদানি' },
    { label: 'Rajshahi Silk', labelBn: 'রাজশাহী সিল্ক' },
    { label: 'Khadi Panjabi', labelBn: 'খাদি পাঞ্জাবি' },
    { label: 'Organic Muslin', labelBn: 'অর্গানিক মসলিন' },
    { label: 'Filigree Brass', labelBn: 'পিতলের গহনা' },
    { label: 'Kantha Blanket', labelBn: 'নকশী কাঁথা' },
  ]

  const searchResults = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return INDIGO_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.titleBn.toLowerCase().includes(q) ||
        p.craftTag.toLowerCase().includes(q) ||
        p.craftTagBn.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
    )
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#FFFFFF] dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl shadow-2xl overflow-hidden mt-12 sm:mt-20">
        {/* Search Input Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5DDD0] dark:border-[#36312B] flex items-center gap-3 bg-[#F9F6F0] dark:bg-[#121110]">
          <Search className="w-5 h-5 text-[#0A4269] dark:text-[#3882B5] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Search by weave, fabric, or artisan (e.g. Jamdani, Khadi, Silk)...'
                : 'তাঁত, ফেব্রিক বা কারিগর অনুসন্ধান করুন (যেমন: জামদানি, সিল্ক)...'
            }
            autoFocus
            className="w-full bg-transparent font-jakarta text-[14px] sm:text-[15px] text-[#26201C] dark:text-[#F5EFE8] placeholder-[#756A63] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#756A63] hover:text-[#0A4269] text-[12px] font-jakarta"
            >
              {language === 'en' ? 'Clear' : 'মুছুন'}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#756A63] hover:text-[#0A4269] rounded-lg transition-colors cursor-pointer ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="p-3.5 bg-[#FFFFFF] dark:bg-[#1B1917] border-b border-[#E5DDD0] dark:border-[#36312B] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-jakarta font-bold uppercase tracking-wider text-[#756A63] dark:text-[#A3968C] whitespace-nowrap pl-1">
            {language === 'en' ? 'Loom Tags:' : 'তাঁত ট্যাগ:'}
          </span>
          {suggestionTags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => setQuery(language === 'en' ? tag.label : tag.labelBn)}
              className="px-2.5 py-1 bg-[#F9F6F0] dark:bg-[#121110] hover:bg-[#0A4269] hover:text-white dark:hover:bg-[#3882B5] text-[#26201C] dark:text-[#F5EFE8] border border-[#E5DDD0] dark:border-[#36312B] rounded-lg text-[11px] font-jakarta whitespace-nowrap transition-colors cursor-pointer"
            >
              {language === 'en' ? tag.label : tag.labelBn}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5 scrollbar-none">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-[#756A63] dark:text-[#A3968C] space-y-2">
              <Feather className="w-8 h-8 mx-auto opacity-40 text-[#0A4269]" />
              <p className="font-jakarta text-[13px]">
                {language === 'en'
                  ? 'Type to search across all 15 authentic heritage masterworks'
                  : 'সকল ১৫টি ঐতিহ্যবাহী তাঁত পোশাক থেকে অনুসন্ধান করুন'}
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center text-[#756A63] dark:text-[#A3968C]">
              <p className="font-jakarta text-[13px]">
                {language === 'en' ? 'No garments matched your search.' : 'কোনো পোশাক খুঁজে পাওয়া যায়নি।'}
              </p>
            </div>
          ) : (
            searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product)
                  onClose()
                }}
                className="flex items-center justify-between p-3 rounded-xl border border-[#E5DDD0] dark:border-[#36312B] bg-[#F9F6F0] dark:bg-[#121110] hover:border-[#0A4269] dark:hover:border-[#3882B5] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-jakarta text-[#B85324] font-bold uppercase">
                      {language === 'en' ? product.craftTag : product.craftTagBn}
                    </span>
                    <h4 className="font-cinzel font-bold text-[13px] text-[#26201C] dark:text-[#F5EFE8] group-hover:text-[#0A4269] dark:group-hover:text-[#3882B5] transition-colors line-clamp-1">
                      {language === 'en' ? product.title : product.titleBn}
                    </h4>
                    <span className="text-[12px] font-jakarta font-bold text-[#0A4269] dark:text-[#3882B5]">
                      ৳{product.priceBDT.toLocaleString()}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#756A63] group-hover:text-[#0A4269] group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
