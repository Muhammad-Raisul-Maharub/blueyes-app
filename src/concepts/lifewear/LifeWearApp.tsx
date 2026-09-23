import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type {
  Currency,
  LifeWearCategory,
  LifeWearProduct,
  LifeWearView,
  LifeWearCartItem,
  ProductColor,
} from './types'
import { LIFEWEAR_PRODUCTS } from './lifewearData'
import { LIFEWEAR_THEME } from '../../styles/themes'
import { LifeWearHeader } from './LifeWearHeader'
import { LifeWearHome } from './LifeWearHome'
import { LifeWearCategoryPage } from './LifeWearCategoryPage'
import { LifeWearPDP } from './LifeWearPDP'
import { LifeWearCartDrawer } from './LifeWearCartDrawer'
import { LifeWearAbout } from './LifeWearAbout'
import { LifeWearLookbook } from './LifeWearLookbook'
import { LifeWearFooter } from './LifeWearFooter'
import { LifeWearBottomNav } from './LifeWearBottomNav'
import { LifeWearMenuDrawer } from './LifeWearMenuDrawer'
import { LifeWearSearchModal } from './LifeWearSearchModal'
import { Check } from 'lucide-react'

interface LifeWearAppProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const LifeWearApp: React.FC<LifeWearAppProps> = ({ theme, onToggleTheme }) => {
  const [currentView, setCurrentView] = useState<LifeWearView>('home')
  const [selectedCategory, setSelectedCategory] = useState<LifeWearCategory>('all')
  const [selectedProduct, setSelectedProduct] = useState<LifeWearProduct>(LIFEWEAR_PRODUCTS[0])
  const [currency, setCurrency] = useState<Currency>('BDT')
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [kraftBoxSelected, setKraftBoxSelected] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [navHistory, setNavHistory] = useState<
    Array<{ view: LifeWearView; category: LifeWearCategory; product: LifeWearProduct }>
  >([])

  // Initial seeded cart with authentic LifeWear items for instant testing
  const [cart, setCart] = useState<LifeWearCartItem[]>([
    {
      cartId: 'seed-01',
      productId: 'lw-m-01',
      product: LIFEWEAR_PRODUCTS[0], // Heavyweight Supima Crewneck Tee
      color: LIFEWEAR_PRODUCTS[0].colors[0],
      size: 'L',
      quantity: 1,
      isBundle: false,
    },
    {
      cartId: 'seed-02',
      productId: 'lw-m-03',
      product: LIFEWEAR_PRODUCTS[2], // All-Day Stretch Chino Utility Joggers
      color: LIFEWEAR_PRODUCTS[2].colors[0],
      size: '32',
      quantity: 1,
      isBundle: false,
    },
  ])

  const tokens = theme === 'dark' ? LIFEWEAR_THEME.dark : LIFEWEAR_THEME.light

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2400)
  }

  // Navigation handlers with history tracking
  const handleNavigate = (view: LifeWearView, category?: LifeWearCategory) => {
    if (view !== currentView || (category && category !== selectedCategory)) {
      setNavHistory((prev) => [
        ...prev,
        { view: currentView, category: selectedCategory, product: selectedProduct },
      ])
      try {
        window.history.pushState({ concept: 'lifewear', view, category }, '')
      } catch {
        // Safe fallback in restricted environments
      }
    }
    setCurrentView(view)
    if (category) {
      setSelectedCategory(category)
    } else if (
      view === 'women' ||
      view === 'men' ||
      view === 'kids' ||
      view === 'baby' ||
      view === 'accessories'
    ) {
      setSelectedCategory(view)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectProduct = (product: LifeWearProduct) => {
    setNavHistory((prev) => [
      ...prev,
      { view: currentView, category: selectedCategory, product: selectedProduct },
    ])
    try {
      window.history.pushState({ concept: 'lifewear', view: 'pdp', productId: product.id }, '')
    } catch {
      // Safe fallback
    }
    setSelectedProduct(product)
    setCurrentView('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGoBack = () => {
    if (navHistory.length > 0) {
      const prevEntry = navHistory[navHistory.length - 1]
      setNavHistory((prev) => prev.slice(0, -1))
      setCurrentView(prevEntry.view)
      setSelectedCategory(prevEntry.category)
      setSelectedProduct(prevEntry.product)
    } else {
      setCurrentView('home')
      setSelectedCategory('all')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Browser popstate integration for native / gesture back navigation
  useEffect(() => {
    const onPopState = () => {
      if (navHistory.length > 0) {
        const prevEntry = navHistory[navHistory.length - 1]
        setNavHistory((prev) => prev.slice(0, -1))
        setCurrentView(prevEntry.view)
        setSelectedCategory(prevEntry.category)
        setSelectedProduct(prevEntry.product)
      } else {
        setCurrentView('home')
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [navHistory])

  // Cart operations
  const handleAddToCart = (
    product: LifeWearProduct,
    color: ProductColor,
    size: string,
    isBundle?: boolean
  ) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === product.id &&
        item.size === size &&
        item.color.name === color.name &&
        Boolean(item.isBundle) === Boolean(isBundle)
    )

    if (existingIndex > -1) {
      setCart((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      const newItem: LifeWearCartItem = {
        cartId: `lw-cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        product,
        color,
        size,
        quantity: 1,
        isBundle,
      }
      setCart((prev) => [newItem, ...prev])
    }

    showToast(
      isBundle
        ? `Added 3-Pack Bundle: ${product.name} (${size})`
        : `Added to Bag: ${product.name} (${size})`
    )
    setCartOpen(true)
  }

  const handleQuickAdd = (product: LifeWearProduct) => {
    handleAddToCart(product, product.colors[0], product.sizes[0] || 'Standard', false)
  }

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as LifeWearCartItem[]
    )
  }

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId))
    showToast('Item removed from bag')
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div
      style={
        {
          '--color-canvas': tokens.canvas,
          '--color-surface': tokens.surface,
          '--color-card': tokens.card,
          '--color-text-primary': tokens.textPrimary,
          '--color-text-secondary': tokens.textSecondary,
          '--color-action-cta': tokens.actionCta,
          '--color-alert': tokens.alert,
          '--color-border': tokens.border,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        } as React.CSSProperties
      }
      className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] transition-colors duration-150 flex flex-col relative selection:bg-[#004CE8] selection:text-white"
    >
      {/* 1. Header */}
      <LifeWearHeader
        currentView={currentView}
        selectedCategory={selectedCategory}
        onNavigate={handleNavigate}
        currency={currency}
        onToggleCurrency={(c) => setCurrency(c)}
        theme={theme}
        onToggleTheme={onToggleTheme}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
      />

      {/* 2. Main View with 120ms Linear Transitions matching ANIMATION.md */}
      <main className="w-full flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (currentView === 'pdp' ? `-${selectedProduct.id}` : '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: 'linear' }}
            className="w-full flex-1 flex flex-col"
          >
            {currentView === 'home' && (
              <LifeWearHome
                currency={currency}
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
                onQuickAdd={handleQuickAdd}
              />
            )}

            {(currentView === 'women' ||
              currentView === 'men' ||
              currentView === 'kids' ||
              currentView === 'baby' ||
              currentView === 'accessories') && (
              <LifeWearCategoryPage
                category={currentView}
                onSelectCategory={(cat) => handleNavigate(cat as LifeWearView, cat)}
                currency={currency}
                onSelectProduct={handleSelectProduct}
                onQuickAdd={handleQuickAdd}
                onBack={handleGoBack}
                onNavigateHome={() => handleNavigate('home', 'all')}
              />
            )}

            {currentView === 'pdp' && (
              <LifeWearPDP
                product={selectedProduct}
                currency={currency}
                onBack={handleGoBack}
                onAddToCart={handleAddToCart}
              />
            )}

            {currentView === 'lookbook' && (
              <LifeWearLookbook
                currency={currency}
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
                onBack={handleGoBack}
              />
            )}

            {currentView === 'about' && (
              <LifeWearAbout onNavigate={handleNavigate} onBack={handleGoBack} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer */}
      <LifeWearFooter onNavigate={handleNavigate} currency={currency} />

      {/* 4. Mobile Bottom Nav */}
      <LifeWearBottomNav
        currentView={currentView}
        onNavigate={(v) => handleNavigate(v)}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 5. Mobile Menu Drawer */}
      <LifeWearMenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentView={currentView}
        selectedCategory={selectedCategory}
        onNavigate={handleNavigate}
        currency={currency}
        onToggleCurrency={(c) => setCurrency(c)}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {/* 6. Search Modal */}
      <LifeWearSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        currency={currency}
        onSelectProduct={handleSelectProduct}
      />

      {/* 7. Slide-over Cart Drawer */}
      <LifeWearCartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        kraftBoxSelected={kraftBoxSelected}
        onToggleKraftBox={() => setKraftBoxSelected(!kraftBoxSelected)}
        onClearCart={() => setCart([])}
      />

      {/* 8. Tactical Confirmation Toast */}
      {toastMessage && (
        <div className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-50 p-3 bg-[#004CE8] text-white font-mono text-xs shadow-xl flex items-center space-x-2 border border-white/20 select-none animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
