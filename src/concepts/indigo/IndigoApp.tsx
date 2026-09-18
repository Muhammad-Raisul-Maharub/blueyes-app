import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type {
  IndigoView,
  IndigoCategory,
  IndigoProduct,
  IndigoCartItem,
  Language,
} from './types'
import { INDIGO_PRODUCTS } from './indigoData'
import { IndigoHeader } from './IndigoHeader'
import { IndigoMenuDrawer } from './IndigoMenuDrawer'
import { IndigoSearchModal } from './IndigoSearchModal'
import { IndigoCartDrawer } from './IndigoCartDrawer'
import { IndigoHome } from './IndigoHome'
import { IndigoCategoryPage } from './IndigoCategoryPage'
import { IndigoPDP } from './IndigoPDP'
import { IndigoLookbook } from './IndigoLookbook'
import { IndigoAbout } from './IndigoAbout'
import { IndigoFooter } from './IndigoFooter'
import { IndigoBottomNav } from './IndigoBottomNav'
import { Feather, Check } from 'lucide-react'

interface IndigoAppProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const IndigoApp: React.FC<IndigoAppProps> = ({
  theme,
  onToggleTheme,
}) => {
  const [activeView, setActiveView] = useState<IndigoView>('home')
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('indigo-language')
      if (saved === 'en' || saved === 'bn') return saved
    }
    return 'en'
  })

  const [selectedProduct, setSelectedProduct] = useState<IndigoProduct | null>(
    INDIGO_PRODUCTS[0] // Default: Hand-Woven Tangail Indigo Jamdani Saree
  )
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Seeded cart with initial authentic artisanal textiles for instant bag interactions
  const [cartItems, setCartItems] = useState<IndigoCartItem[]>([
    {
      id: 'indigo-cart-1',
      product: INDIGO_PRODUCTS[0], // Hand-Woven Tangail Indigo Jamdani Saree
      selectedSize: 'Free Size',
      selectedColor: 'Natural Deep Indigo',
      quantity: 1,
    },
    {
      id: 'indigo-cart-2',
      product: INDIGO_PRODUCTS[3], // Imperial Indigo Raw Silk Panjabi
      selectedSize: '40 (M)',
      selectedColor: 'Royal Bengal Indigo',
      quantity: 1,
    },
  ])

  // Persist language preference
  useEffect(() => {
    localStorage.setItem('indigo-language', language)
  }, [language])

  // Scroll to top on view or product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activeView, selectedProduct])

  // Toast notification helper
  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  // Language switch handler
  const handleToggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'bn' : 'en'
      showToast(
        next === 'en'
          ? 'Language switched to English'
          : 'ভাষা পরিবর্তন করা হয়েছে: বাংলা'
      )
      return next
    })
  }

  // Navigation handlers
  const handleNavigateView = (view: IndigoView) => {
    setActiveView(view)
  }

  const handleSelectProduct = (product: IndigoProduct) => {
    setSelectedProduct(product)
    setActiveView('pdp')
  }

  const handleNavigateCategory = (cat: IndigoCategory) => {
    if (cat === 'Women') setActiveView('women')
    else if (cat === 'Men') setActiveView('men')
    else if (cat === 'Kids') setActiveView('kids')
    else if (cat === 'Baby') setActiveView('baby')
    else if (cat === 'Accessories') setActiveView('accessories')
    else setActiveView('women')
  }

  // Quick Add action from product cards & pods
  const handleQuickAdd = (product: IndigoProduct) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id
    )

    if (existingIndex > -1) {
      setCartItems((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      const newItem: IndigoCartItem = {
        id: `indigo-${Date.now()}-${product.id}`,
        product,
        selectedSize: product.sizes[0] || 'Free Size',
        selectedColor: product.colors[0]?.name || 'Natural Indigo',
        quantity: 1,
      }
      setCartItems((prev) => [newItem, ...prev])
    }

    showToast(
      language === 'en'
        ? `Added to Bag: ${product.title}`
        : `ব্যাগে যোগ করা হয়েছে: ${product.titleBn}`
    )
    setIsCartOpen(true)
  }

  // Add from PDP with customized size and color
  const handleAddToCart = (
    product: IndigoProduct,
    size: string,
    color: string
  ) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color
    )

    if (existingIndex > -1) {
      setCartItems((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      const newItem: IndigoCartItem = {
        id: `indigo-${Date.now()}-${product.id}-${size}`,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity: 1,
      }
      setCartItems((prev) => [newItem, ...prev])
    }

    showToast(
      language === 'en'
        ? `Added to Bag: ${product.title} (${size})`
        : `ব্যাগে যোগ করা হয়েছে: ${product.titleBn} (${size})`
    )
    setIsCartOpen(true)
  }

  // Cart operations
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as IndigoCartItem[]
    )
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    showToast(language === 'en' ? 'Item removed from bag' : 'আইটেমটি ব্যাগ থেকে সরানো হয়েছে')
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const totalBagItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  // Map activeView to category if applicable
  const currentCategory: IndigoCategory | 'All' =
    activeView === 'women'
      ? 'Women'
      : activeView === 'men'
      ? 'Men'
      : activeView === 'kids'
      ? 'Kids'
      : activeView === 'baby'
      ? 'Baby'
      : activeView === 'accessories'
      ? 'Accessories'
      : 'All'

  return (
    <div className="w-full min-h-screen bg-[#F9F6F0] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8] font-jakarta transition-colors duration-200 flex flex-col selection:bg-[#0A4269] selection:text-white">
      {/* 1. Header with Ticker, [EN | বাংলা] switch, Theme switch, Search & Bag */}
      <IndigoHeader
        activeView={activeView}
        onNavigateView={handleNavigateView}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBag={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        bagCount={totalBagItemsCount}
        theme={theme}
        onToggleTheme={onToggleTheme}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* 2. Main Content View with gentle 250ms editorial cross-fade transitions */}
      <main className="w-full flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView + (activeView === 'pdp' ? `-${selectedProduct?.id}` : '')}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full flex-1 flex flex-col"
          >
            {activeView === 'home' && (
              <IndigoHome
                onSelectProduct={handleSelectProduct}
                onNavigateCategory={handleNavigateCategory}
                onNavigateLookbook={() => setActiveView('lookbook')}
                onNavigateAbout={() => setActiveView('about')}
                onQuickAdd={handleQuickAdd}
                language={language}
              />
            )}

            {(activeView === 'women' ||
              activeView === 'men' ||
              activeView === 'kids' ||
              activeView === 'baby' ||
              activeView === 'accessories') && (
              <IndigoCategoryPage
                category={currentCategory}
                onSelectProduct={handleSelectProduct}
                onNavigateHome={() => setActiveView('home')}
                onSelectCategory={handleNavigateCategory}
                onQuickAdd={handleQuickAdd}
                language={language}
              />
            )}

            {activeView === 'pdp' && selectedProduct && (
              <IndigoPDP
                product={selectedProduct}
                onBack={() => setActiveView('home')}
                onNavigateHome={() => setActiveView('home')}
                onNavigateCategory={handleNavigateCategory}
                onAddToBag={handleAddToCart}
                language={language}
              />
            )}

            {activeView === 'lookbook' && (
              <IndigoLookbook
                onSelectProduct={handleSelectProduct}
                onNavigateCategory={handleNavigateCategory}
                language={language}
              />
            )}

            {activeView === 'about' && (
              <IndigoAbout
                onExploreDrops={() => setActiveView('women')}
                language={language}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer */}
      <IndigoFooter
        onNavigateView={handleNavigateView}
        onNavigateCategory={handleNavigateCategory}
        language={language}
      />

      {/* 4. Mobile Bottom Navigation Dock */}
      <IndigoBottomNav
        activeView={activeView}
        onNavigateView={handleNavigateView}
        onOpenBag={() => setIsCartOpen(true)}
        bagCount={totalBagItemsCount}
        language={language}
      />

      {/* 5. Mobile Menu Drawer */}
      <IndigoMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateView={handleNavigateView}
        onSelectCategory={handleNavigateCategory}
        activeView={activeView}
        theme={theme}
        onToggleTheme={onToggleTheme}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* 6. Search Modal */}
      <IndigoSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          handleSelectProduct(p)
          setIsSearchOpen(false)
        }}
        language={language}
      />

      {/* 7. Slide-over Cart Drawer with Jute Gift Box Module & bKash/COD */}
      <IndigoCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        language={language}
      />

      {/* 8. Toast Feedback Pill */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#26201C] dark:bg-[#F5EFE8] text-[#F9F6F0] dark:text-[#121110] px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2.5 text-[12px] font-jakarta font-medium border border-[#E5DDD0]/20 animate-fadeIn">
          <div className="w-5 h-5 rounded-full bg-[#0A4269] text-white flex items-center justify-center">
            <Feather className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
          <Check className="w-3.5 h-3.5 text-[#B85324]" />
        </div>
      )}
    </div>
  )
}
