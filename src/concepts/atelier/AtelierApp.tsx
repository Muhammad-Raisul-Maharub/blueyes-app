import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { AtelierView, Product, CartItem, Demographic, GarmentSize } from './types'
import { ATELIER_PRODUCTS } from './atelierData'
import { AtelierHeader } from './AtelierHeader'
import { AtelierBottomNav } from './AtelierBottomNav'
import { AtelierHome } from './AtelierHome'
import { AtelierCategoryPage } from './AtelierCategoryPage'
import { AtelierAbout } from './AtelierAbout'
import { AtelierRunway } from './AtelierRunway'
import { AtelierCurate } from './AtelierCurate'
import { AtelierPDP } from './AtelierPDP'
import { AtelierCartDrawer } from './AtelierCartDrawer'
import { AtelierVIPHub } from './AtelierVIPHub'
import { AtelierMenuDrawer } from './AtelierMenuDrawer'

interface AtelierAppProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

interface AtelierHistoryEntry {
  view: AtelierView
  product?: Product | null
}

export const AtelierApp: React.FC<AtelierAppProps> = ({
  theme,
  onToggleTheme,
}) => {
  const [activeView, setActiveView] = useState<AtelierView>('home')
  const [navHistory, setNavHistory] = useState<AtelierHistoryEntry[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Curated initial cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: ATELIER_PRODUCTS[0], // Mulberry Silk Draped Evening Gown
      selectedSize: '40 / S',
      selectedColor: 'Obsidian Noir',
      quantity: 1,
    },
    {
      id: 'cart-2',
      product: ATELIER_PRODUCTS[3], // Imperial Rajshahi Raw Silk Panjabi
      selectedSize: '42 / M',
      selectedColor: 'Natural Tussar Ecru',
      quantity: 1,
    },
  ])

  // Total quantity in bag
  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Navigation handlers
  const handleNavigateView = (view: AtelierView, pushToHistory = true) => {
    if (pushToHistory && (activeView !== view || (activeView === 'pdp' && selectedProduct))) {
      setNavHistory((prev) => [...prev, { view: activeView, product: selectedProduct }])
      try {
        window.history.pushState({ view, concept: 'atelier' }, '', window.location.pathname)
      } catch {
        // Safe fallback in restricted environments
      }
    }
    setSelectedProduct(null)
    setActiveView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectProduct = (product: Product, pushToHistory = true) => {
    if (pushToHistory) {
      setNavHistory((prev) => [...prev, { view: activeView, product: selectedProduct }])
      try {
        window.history.pushState({ view: 'pdp', productId: product.id, concept: 'atelier' }, '', window.location.pathname)
      } catch {
        // Safe fallback
      }
    }
    setSelectedProduct(product)
    setActiveView('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGoBack = () => {
    if (navHistory.length > 0) {
      const lastEntry = navHistory[navHistory.length - 1]
      setNavHistory((prev) => prev.slice(0, -1))
      setSelectedProduct(lastEntry.product || null)
      setActiveView(lastEntry.view)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setSelectedProduct(null)
      setActiveView('home')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Browser popstate listener for back/forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.concept === 'atelier') {
        if (e.state.view === 'pdp' && e.state.productId) {
          const prod = ATELIER_PRODUCTS.find((p) => p.id === e.state.productId)
          if (prod) {
            setSelectedProduct(prod)
            setActiveView('pdp')
            return
          }
        }
        if (e.state.view) {
          setSelectedProduct(null)
          setActiveView(e.state.view)
          return
        }
      }
      handleGoBack()
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [navHistory])

  const handleNavigateCategory = (category: Demographic, pushToHistory = true) => {
    const categoryViewMap: Record<Demographic, AtelierView> = {
      All: 'curate',
      Women: 'women',
      Men: 'men',
      Kids: 'kids',
      Baby: 'baby',
      Accessories: 'accessories',
    }
    const target = categoryViewMap[category] || 'curate'
    if (pushToHistory && (activeView !== target || selectedProduct)) {
      setNavHistory((prev) => [...prev, { view: activeView, product: selectedProduct }])
      try {
        window.history.pushState({ view: target, concept: 'atelier' }, '', window.location.pathname)
      } catch {
        // Safe fallback
      }
    }
    setSelectedProduct(null)
    setActiveView(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cart actions
  const handleAddToCart = (product: Product, size: GarmentSize, color: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      )
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity: 1,
        },
      ]
    })
  }

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
        .filter(Boolean) as CartItem[]
    )
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] relative flex flex-col transition-colors duration-200">
      {/* Global Minimalist Header with Chattogram Notification Ticker */}
      <AtelierHeader
        activeView={activeView}
        onNavigateView={handleNavigateView}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => handleNavigateView('curate')}
        onOpenBag={() => setIsCartOpen(true)}
        bagCount={totalBagCount}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {/* Main View Area wrapped in Framer Motion editorial cross-fades */}
      <main className="flex-1 w-full flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView + (selectedProduct ? `-${selectedProduct.id}` : '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full flex-1 flex flex-col"
          >
            {/* Product Detail Page View */}
            {activeView === 'pdp' && selectedProduct && (
              <AtelierPDP
                product={selectedProduct}
                onBack={handleGoBack}
                onNavigateHome={() => handleNavigateView('home')}
                onNavigateCategory={handleNavigateCategory}
                onAddToBag={handleAddToCart}
              />
            )}

            {/* Home View */}
            {activeView === 'home' && (
              <AtelierHome
                onSelectProduct={handleSelectProduct}
                onNavigateToCategory={handleNavigateCategory}
                onNavigateToCurate={() => handleNavigateView('curate')}
                onNavigateToVIP={() => handleNavigateView('vip')}
                onNavigateToRunway={() => handleNavigateView('lookbook')}
                onNavigateToAbout={() => handleNavigateView('about')}
              />
            )}

            {/* Category Page Views */}
            {activeView === 'women' && (
              <AtelierCategoryPage
                category="Women"
                onSelectProduct={handleSelectProduct}
                onNavigateHome={() => handleNavigateView('home')}
                onSelectCategory={handleNavigateCategory}
                onBack={handleGoBack}
              />
            )}

            {activeView === 'men' && (
              <AtelierCategoryPage
                category="Men"
                onSelectProduct={handleSelectProduct}
                onNavigateHome={() => handleNavigateView('home')}
                onSelectCategory={handleNavigateCategory}
                onBack={handleGoBack}
              />
            )}

            {activeView === 'kids' && (
              <AtelierCategoryPage
                category="Kids"
                onSelectProduct={handleSelectProduct}
                onNavigateHome={() => handleNavigateView('home')}
                onSelectCategory={handleNavigateCategory}
                onBack={handleGoBack}
              />
            )}

            {activeView === 'baby' && (
              <AtelierCategoryPage
                category="Baby"
                onSelectProduct={handleSelectProduct}
                onNavigateHome={() => handleNavigateView('home')}
                onSelectCategory={handleNavigateCategory}
                onBack={handleGoBack}
              />
            )}

            {activeView === 'accessories' && (
              <AtelierCategoryPage
                category="Accessories"
                onSelectProduct={handleSelectProduct}
                onNavigateHome={() => handleNavigateView('home')}
                onSelectCategory={handleNavigateCategory}
                onBack={handleGoBack}
              />
            )}

            {/* Runway Lookbook View */}
            {activeView === 'lookbook' && (
              <AtelierRunway
                onSelectProduct={handleSelectProduct}
                onBack={handleGoBack}
              />
            )}

            {/* Maison Chattogram About Story & Fitting Booking */}
            {activeView === 'about' && (
              <AtelierAbout
                onExploreCollection={(category) =>
                  handleNavigateCategory((category as Demographic) || 'Women')
                }
                onBack={handleGoBack}
              />
            )}

            {/* Curated Search & Deep Faceted Filters View */}
            {activeView === 'curate' && (
              <AtelierCurate
                initialDemographic="All"
                onSelectProduct={handleSelectProduct}
                onBack={handleGoBack}
              />
            )}

            {/* Obsidian VIP Club View */}
            {activeView === 'vip' && <AtelierVIPHub onBack={handleGoBack} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation Dock (Hidden on md+ screens, hidden when cart drawer is open or on PDP) */}
      {!isCartOpen && activeView !== 'pdp' && (
        <AtelierBottomNav
          activeView={activeView}
          onSelectView={handleNavigateView}
          onOpenBag={() => setIsCartOpen(true)}
          bagCount={totalBagCount}
        />
      )}

      {/* Slide-out Cart Drawer (Triggerable from ANY view) */}
      <AtelierCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Mobile Left Menu Slide-Out Drawer */}
      <AtelierMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigateView}
      />
    </div>
  )
}

export default AtelierApp
