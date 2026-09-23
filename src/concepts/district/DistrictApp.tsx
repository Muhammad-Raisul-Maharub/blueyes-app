import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { DistrictView, DistrictCategory, DistrictProduct, DistrictCartItem } from './types'
import { DISTRICT_PRODUCTS } from './districtData'
import { DistrictHeader } from './DistrictHeader'
import { DistrictMenuDrawer } from './DistrictMenuDrawer'
import { DistrictSearchModal } from './DistrictSearchModal'
import { DistrictCartDrawer } from './DistrictCartDrawer'
import { DistrictHome } from './DistrictHome'
import { DistrictCategoryPage } from './DistrictCategoryPage'
import { DistrictPDP } from './DistrictPDP'
import { DistrictLookbook } from './DistrictLookbook'
import { DistrictAbout } from './DistrictAbout'
import { DistrictFooter } from './DistrictFooter'
import { DistrictBottomNav } from './DistrictBottomNav'

interface DistrictAppProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const DistrictApp: React.FC<DistrictAppProps> = ({
  theme,
  onToggleTheme,
}) => {
  const [activeView, setActiveView] = useState<DistrictView>('home')
  const [selectedProduct, setSelectedProduct] = useState<DistrictProduct | null>(
    DISTRICT_PRODUCTS[3] // Default: Exo-Skeleton Heavyweight Hoodie 480 GSM
  )
  const [navHistory, setNavHistory] = useState<
    { view: DistrictView; product?: DistrictProduct | null }[]
  >([{ view: 'home' }])

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Seeded cart with initial streetwear items for immediate checkout & drawer interactions
  const [cartItems, setCartItems] = useState<DistrictCartItem[]>([
    {
      id: 'cart-1',
      product: DISTRICT_PRODUCTS[3], // Exo-Skeleton Hoodie 480 GSM
      selectedSize: 'L',
      selectedColor: 'Pitch Black',
      quantity: 1,
    },
    {
      id: 'cart-2',
      product: DISTRICT_PRODUCTS[4], // Acid-Wash Cargo Pants
      selectedSize: '32',
      selectedColor: 'Acid Carbon',
      quantity: 1,
    },
  ])

  // Scroll to top on view changes
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

  // Navigation handlers with historical tracking
  const handleNavigateView = (view: DistrictView, pushToHistory = true) => {
    if (pushToHistory) {
      setNavHistory((prev) => [...prev, { view }])
      try {
        window.history.pushState({ concept: 'district', view }, '')
      } catch {
        // Safe fallback in restricted sandboxes
      }
    }
    setActiveView(view)
  }

  const handleSelectProduct = (product: DistrictProduct, pushToHistory = true) => {
    if (pushToHistory) {
      setNavHistory((prev) => [...prev, { view: 'pdp', product }])
      try {
        window.history.pushState({ concept: 'district', view: 'pdp', productId: product.id }, '')
      } catch {
        // Safe fallback
      }
    }
    setSelectedProduct(product)
    setActiveView('pdp')
  }

  const handleGoBack = () => {
    if (navHistory.length > 1) {
      const updatedHistory = [...navHistory]
      updatedHistory.pop() // Remove current active view
      const previousEntry = updatedHistory[updatedHistory.length - 1]
      setNavHistory(updatedHistory)
      if (previousEntry.view === 'pdp' && previousEntry.product) {
        setSelectedProduct(previousEntry.product)
      }
      setActiveView(previousEntry.view)
    } else {
      setActiveView('home')
    }
  }

  // Native browser back button listener
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.view) {
        setActiveView(e.state.view)
      } else {
        handleGoBack()
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [navHistory])

  const handleNavigateCategory = (cat: DistrictCategory) => {
    if (cat === 'Women') handleNavigateView('women')
    else if (cat === 'Men') handleNavigateView('men')
    else if (cat === 'Kids') handleNavigateView('kids')
    else if (cat === 'Baby') handleNavigateView('baby')
    else if (cat === 'Accessories') handleNavigateView('accessories')
    else handleNavigateView('men')
  }

  // Quick Add action from cards/tiles: adds default size & opens drawer with confirmation
  const handleQuickAdd = (product: DistrictProduct) => {
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
      const newItem: DistrictCartItem = {
        id: `district-${Date.now()}-${product.id}`,
        product,
        selectedSize: product.sizes[0] || 'M',
        selectedColor: product.colors[0]?.name || 'Standard',
        quantity: 1,
      }
      setCartItems((prev) => [newItem, ...prev])
    }

    showToast(`⚡ ADDED TO BAG: ${product.title.toUpperCase()}`)
    setIsCartOpen(true)
  }

  // Add from PDP with customized size and color
  const handleAddToCart = (
    product: DistrictProduct,
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
      const newItem: DistrictCartItem = {
        id: `district-${Date.now()}-${product.id}`,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity: 1,
      }
      setCartItems((prev) => [newItem, ...prev])
    }

    showToast(`⚡ ADDED TO BAG: ${product.title.toUpperCase()} (${size} / ${color})`)
    setIsCartOpen(true)
  }

  // Cart modifications
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
        .filter(Boolean) as DistrictCartItem[]
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
  const getCurrentCategory = (): DistrictCategory => {
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
    <div className="w-full min-h-screen bg-[#F4F4F6] dark:bg-[#090A0E] text-[#090A0E] dark:text-white flex flex-col selection:bg-[#0047FF] dark:selection:bg-[#CCFF00] selection:text-white dark:selection:text-[#090A0E] relative font-dm transition-colors duration-200">
      {/* 1. Global Header */}
      <DistrictHeader
        activeView={activeView}
        onNavigateView={handleNavigateView}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBag={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        bagCount={totalBagCount}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {/* 2. Main Content Area with 150ms Snappy View Transitions (ANIMATION.md) */}
      <main className="flex-1 w-full flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView + (activeView === 'pdp' ? `-${selectedProduct?.id}` : '')}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full flex-1 flex flex-col"
          >
            {activeView === 'home' && (
              <DistrictHome
                onSelectProduct={handleSelectProduct}
                onNavigateCategory={handleNavigateCategory}
                onNavigateRunway={() => handleNavigateView('lookbook')}
                onNavigateAbout={() => handleNavigateView('about')}
                onQuickAdd={handleQuickAdd}
              />
            )}

            {[
              'women',
              'men',
              'kids',
              'baby',
              'accessories',
            ].includes(activeView) && (
              <DistrictCategoryPage
                category={getCurrentCategory()}
                onSelectProduct={handleSelectProduct}
                onNavigateHome={() => handleNavigateView('home')}
                onSelectCategory={handleNavigateCategory}
                onQuickAdd={handleQuickAdd}
                onBack={handleGoBack}
              />
            )}

            {activeView === 'pdp' && selectedProduct && (
              <DistrictPDP
                product={selectedProduct}
                onBack={handleGoBack}
                onNavigateHome={() => handleNavigateView('home')}
                onNavigateCategory={handleNavigateCategory}
                onAddToBag={(prod, size, col) => handleAddToCart(prod, size, col)}
              />
            )}

            {activeView === 'lookbook' && (
              <DistrictLookbook
                onSelectProduct={handleSelectProduct}
                onNavigateCategory={handleNavigateCategory}
                onBack={handleGoBack}
              />
            )}

            {activeView === 'about' && (
              <DistrictAbout
                onExploreDrops={() => handleNavigateView('men')}
                onBack={handleGoBack}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global District Footer */}
      <DistrictFooter
        onNavigateView={handleNavigateView}
        onNavigateCategory={handleNavigateCategory}
      />

      {/* 4. Mobile Bottom Navigation Dock (md:hidden) */}
      <DistrictBottomNav
        activeView={activeView}
        onNavigateView={handleNavigateView}
        onOpenBag={() => setIsCartOpen(true)}
        bagCount={totalBagCount}
      />

      {/* 5. Mobile Side Menu Drawer */}
      <DistrictMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateView={handleNavigateView}
        activeView={activeView}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {/* 6. Quick Streetwear Search Modal */}
      <DistrictSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* 7. Slide-over Cart Drawer with bKash / COD / Mylar HypePack */}
      <DistrictCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 8. Toast Feedback Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 bg-[#0047FF] text-white dark:bg-[#CCFF00] dark:text-[#090A0E] px-4 py-3 font-mono-tech text-[11px] font-extrabold tracking-wider shadow-[4px_4px_0px_0px_#090A0E] dark:shadow-[4px_4px_0px_0px_#0047FF] border border-black flex items-center gap-2 select-none"
          >
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
