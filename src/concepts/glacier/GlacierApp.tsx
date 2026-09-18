import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type {
  GlacierView,
  GlacierCategory,
  GlacierProduct,
  GlacierCartItem,
  Currency,
} from './types'
import { GLACIER_PRODUCTS } from './glacierData'
import { GlacierParticleCanvas } from './GlacierParticleCanvas'
import { GlacierHeader } from './GlacierHeader'
import { GlacierHome } from './GlacierHome'
import { GlacierCategoryPage } from './GlacierCategoryPage'
import { GlacierPDP } from './GlacierPDP'
import { GlacierLookbook } from './GlacierLookbook'
import { GlacierAbout } from './GlacierAbout'
import { GlacierFooter } from './GlacierFooter'
import { GlacierCartDrawer } from './GlacierCartDrawer'
import { GlacierMenuDrawer } from './GlacierMenuDrawer'
import { GlacierSearchModal } from './GlacierSearchModal'
import { GlacierBottomNav } from './GlacierBottomNav'

interface GlacierAppProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const GlacierApp: React.FC<GlacierAppProps> = ({ theme, onToggleTheme }) => {
  const [activeView, setActiveView] = useState<GlacierView>('home')
  const [selectedProduct, setSelectedProduct] = useState<GlacierProduct>(
    GLACIER_PRODUCTS[0] // Sculptural Hydro-Silk Evening Cape Gown
  )
  const [currency, setCurrency] = useState<Currency>('BDT')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Seeded cart for immediate drawer interaction
  const [cartItems, setCartItems] = useState<GlacierCartItem[]>([
    {
      id: 'glacier-seed-1',
      product: GLACIER_PRODUCTS[0], // Sculptural Cape Gown
      selectedSize: 'FR 36 (S)',
      selectedColor: 'Arctic Obsidian',
      quantity: 1,
    },
    {
      id: 'glacier-seed-2',
      product: GLACIER_PRODUCTS[12], // Polarized Optical Shield
      selectedSize: 'One Size (Universal Fit)',
      selectedColor: 'Electric Ice Cyan Mirror',
      quantity: 1,
    },
  ])

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activeView, selectedProduct])

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'BDT' ? 'USD' : 'BDT'))
  }

  // Navigation handlers
  const handleNavigateView = (view: GlacierView) => {
    setActiveView(view)
  }

  const handleSelectProduct = (product: GlacierProduct) => {
    setSelectedProduct(product)
    setActiveView('pdp')
  }

  const handleNavigateCategory = (cat: GlacierCategory) => {
    if (cat === 'Women') setActiveView('women')
    else if (cat === 'Men') setActiveView('men')
    else if (cat === 'Kids') setActiveView('kids')
    else if (cat === 'Baby') setActiveView('baby')
    else if (cat === 'Accessories') setActiveView('accessories')
    else setActiveView('women')
  }

  // Quick Add handler
  const handleQuickAdd = (product: GlacierProduct) => {
    const existingIndex = cartItems.findIndex((item) => item.product.id === product.id)

    if (existingIndex > -1) {
      setCartItems((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      const newItem: GlacierCartItem = {
        id: `glacier-${Date.now()}-${product.id}`,
        product,
        selectedSize: product.sizes[0] || 'Standard',
        selectedColor: product.colors[0]?.name || 'Standard',
        quantity: 1,
      }
      setCartItems((prev) => [newItem, ...prev])
    }

    showToast(`⚡ ALLOCATED: ${product.title.toUpperCase()}`)
    setIsCartOpen(true)
  }

  // Detailed Add from PDP
  const handleAddToCart = (product: GlacierProduct, size: string, color: string) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color
    )

    if (existingIndex > -1) {
      setCartItems((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      const newItem: GlacierCartItem = {
        id: `glacier-${Date.now()}-${product.id}`,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity: 1,
      }
      setCartItems((prev) => [newItem, ...prev])
    }

    showToast(`⚡ ACQUISITION LOGGED: ${product.title.toUpperCase()} (${size})`)
    setIsCartOpen(true)
  }

  // Cart operations
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as GlacierCartItem[]
    )
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const totalBagCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  // Determine current active category for category pages
  const getCurrentCategory = (): GlacierCategory => {
    switch (activeView) {
      case 'women':
        return 'Women'
      case 'men':
        return 'Men'
      case 'kids':
        return 'Kids'
      case 'baby':
        return 'Baby'
      case 'accessories':
        return 'Accessories'
      default:
        return 'All'
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#F0F9FF] dark:bg-[#030712] text-[#082F49] dark:text-[#F0F9FF] flex flex-col relative font-sans transition-colors duration-300 selection:bg-[#38BDF8] selection:text-[#030712] overflow-x-hidden">
      {/* 1. Ambient Ice-Particle Canvas Background */}
      <GlacierParticleCanvas theme={theme} />

      {/* 2. Global Frosted Header */}
      <GlacierHeader
        activeView={activeView}
        onNavigateView={handleNavigateView}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBag={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        bagCount={totalBagCount}
        currency={currency}
        onToggleCurrency={toggleCurrency}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {/* 3. Main Views Router */}
      <main className="flex-1 w-full flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView + (activeView === 'pdp' ? `-${selectedProduct.id}` : '')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full flex-1 flex flex-col"
          >
            {activeView === 'home' && (
              <GlacierHome
                onSelectProduct={handleSelectProduct}
                onNavigateCategory={handleNavigateCategory}
                onNavigateRunway={() => handleNavigateView('lookbook')}
                onNavigateAbout={() => handleNavigateView('about')}
                onQuickAdd={handleQuickAdd}
                currency={currency}
              />
            )}

            {['women', 'men', 'kids', 'baby', 'accessories'].includes(activeView) && (
              <GlacierCategoryPage
                category={getCurrentCategory()}
                onSelectProduct={handleSelectProduct}
                onNavigateHome={() => handleNavigateView('home')}
                onSelectCategory={handleNavigateCategory}
                onQuickAdd={handleQuickAdd}
                currency={currency}
              />
            )}

            {activeView === 'pdp' && (
              <GlacierPDP
                product={selectedProduct}
                onBack={() => handleNavigateView('home')}
                onNavigateHome={() => handleNavigateView('home')}
                onNavigateCategory={handleNavigateCategory}
                onAddToBag={handleAddToCart}
                currency={currency}
              />
            )}

            {activeView === 'lookbook' && (
              <GlacierLookbook
                onSelectProduct={handleSelectProduct}
                onNavigateCategory={handleNavigateCategory}
              />
            )}

            {activeView === 'about' && (
              <GlacierAbout
                onExploreDrops={() => handleNavigateCategory('Women')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Global Glacier Luxury Footer */}
      <GlacierFooter
        onNavigateView={handleNavigateView}
        onNavigateCategory={handleNavigateCategory}
      />

      {/* 5. Mobile Bottom Navigation Dock */}
      <GlacierBottomNav
        activeView={activeView}
        onNavigateView={handleNavigateView}
        onOpenBag={() => setIsCartOpen(true)}
        bagCount={totalBagCount}
      />

      {/* 6. Mobile Menu Drawer */}
      <GlacierMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateView={handleNavigateView}
        activeView={activeView}
        currency={currency}
        onToggleCurrency={toggleCurrency}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {/* 7. Live Product Search Modal */}
      <GlacierSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        currency={currency}
      />

      {/* 8. Slide-Over Acquisition Cart Drawer */}
      <GlacierCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currency={currency}
      />

      {/* 9. Luminescent Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 bg-[#030712] text-[#7DD3FC] px-4 py-3 font-space-mono text-[11px] font-bold tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.4)] border border-[#38BDF8] flex items-center gap-2 select-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
