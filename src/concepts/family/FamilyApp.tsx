import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type {
  Currency,
  FamilyDemographic,
  FamilyProduct,
  FamilyView,
  FamilyCartItem,
  FamilyProductColor,
} from './types'
import { FAMILY_PRODUCTS } from './familyData'
import { FAMILY_THEME } from '../../styles/themes'
import { FamilyHeader } from './FamilyHeader'
import { FamilyHome } from './FamilyHome'
import { FamilyCategoryPage } from './FamilyCategoryPage'
import { FamilyPDP } from './FamilyPDP'
import { FamilyHub } from './FamilyHub'
import { FamilyAbout } from './FamilyAbout'
import { FamilyFooter } from './FamilyFooter'
import { FamilyBottomNav } from './FamilyBottomNav'
import { FamilyMenuDrawer } from './FamilyMenuDrawer'
import { FamilyCartDrawer } from './FamilyCartDrawer'
import { FamilySearchModal } from './FamilySearchModal'
import { Heart } from 'lucide-react'

interface FamilyAppProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const FamilyApp: React.FC<FamilyAppProps> = ({ theme, onToggleTheme }) => {
  const [currentView, setCurrentView] = useState<FamilyView>('home')
  const [selectedDemographic, setSelectedDemographic] = useState<FamilyDemographic>('all')
  const [selectedProduct, setSelectedProduct] = useState<FamilyProduct>(FAMILY_PRODUCTS[0])
  const [currency, setCurrency] = useState<Currency>('BDT')
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Seeded cart with initial family items
  const [cart, setCart] = useState<FamilyCartItem[]>([
    {
      id: 'seed-fam-01',
      productId: 'fam-b-01',
      product: FAMILY_PRODUCTS[0], // 100% GOTS Organic Cloud Layette Romper
      selectedColor: FAMILY_PRODUCTS[0].colors[0],
      selectedSize: '0–3 Months',
      quantity: 1,
    },
    {
      id: 'seed-fam-02',
      productId: 'fam-m-01',
      product: FAMILY_PRODUCTS[4], // Relaxed Linen Nursing Midi Dress
      selectedColor: FAMILY_PRODUCTS[4].colors[0],
      selectedSize: 'M',
      quantity: 1,
    },
  ])

  const tokens = theme === 'dark' ? FAMILY_THEME.dark : FAMILY_THEME.light

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2500)
  }

  // Navigation handlers
  const handleNavigate = (view: FamilyView, demographic?: FamilyDemographic) => {
    setCurrentView(view)
    if (demographic) {
      setSelectedDemographic(demographic)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectProduct = (product: FamilyProduct) => {
    setSelectedProduct(product)
    setCurrentView('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cart Operations
  const handleAddToCart = (
    product: FamilyProduct,
    color: FamilyProductColor,
    size: string,
    bundledMembers?: string[]
  ) => {
    const newItem: FamilyCartItem = {
      id: `fam-cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      productId: product.id,
      product,
      selectedColor: color,
      selectedSize: size,
      quantity: 1,
      bundledMembers,
    }

    setCart((prev) => [newItem, ...prev])
    showToast(`Added to Family Bag: ${product.title}`)
    setCartOpen(true)
  }

  const handleQuickAdd = (product: FamilyProduct) => {
    handleAddToCart(product, product.colors[0], product.sizes[0] || 'Standard')
  }

  // Add multiple matching items from "Match the Family Look" widget
  const handleAddFamilyBundleToCart = (items: { role: string; product: FamilyProduct }[]) => {
    const newItems: FamilyCartItem[] = items.map((item) => ({
      id: `fam-bundle-${Date.now()}-${item.role}-${Math.random().toString(36).substr(2, 4)}`,
      productId: item.product.id,
      product: item.product,
      selectedColor: item.product.colors[0],
      selectedSize: item.product.sizes[0] || 'Standard',
      quantity: 1,
      bundledMembers: [item.role],
    }))

    setCart((prev) => [...newItems, ...prev])
    showToast(`Added ${items.length} Family Matching Outfits with 15% Savings!`)
    setCartOpen(true)
  }

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as FamilyCartItem[]
    )
  }

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
    showToast('Item removed from bag')
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div
      style={
        {
          '--color-canvas': tokens.canvas,
          '--color-surface': tokens.surface,
          '--color-surface-soft': tokens.surfaceSoft,
          '--color-card': tokens.card,
          '--color-text-primary': tokens.textPrimary,
          '--color-text-secondary': tokens.textSecondary,
          '--color-brand-action': tokens.brandAction,
          '--color-accent-coral': tokens.accentCoral,
          '--color-highlight-honey': tokens.highlightHoney,
          '--color-border': tokens.border,
          fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        } as React.CSSProperties
      }
      className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] transition-colors duration-200 flex flex-col relative selection:bg-[#F76C5E] selection:text-white"
    >
      {/* 1. Header */}
      <FamilyHeader
        currentView={currentView}
        selectedDemographic={selectedDemographic}
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

      {/* 2. Main View with Framer Motion Spring Transitions */}
      <main className="w-full flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (currentView === 'pdp' ? `-${selectedProduct.id}` : '')}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="w-full flex-1 flex flex-col"
          >
            {currentView === 'home' && (
              <FamilyHome
                currency={currency}
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
                onQuickAdd={handleQuickAdd}
                onAddFamilyBundleToCart={handleAddFamilyBundleToCart}
              />
            )}

            {currentView === 'category' && (
              <FamilyCategoryPage
                demographic={selectedDemographic}
                onSelectDemographic={(dem) => handleNavigate('category', dem)}
                currency={currency}
                onSelectProduct={handleSelectProduct}
                onQuickAdd={handleQuickAdd}
              />
            )}

            {currentView === 'pdp' && (
              <FamilyPDP
                product={selectedProduct}
                currency={currency}
                onBack={() => handleNavigate('category', selectedProduct.demographic)}
                onAddToCart={handleAddToCart}
              />
            )}

            {currentView === 'hub' && (
              <FamilyHub
                currency={currency}
                onNavigateCatalog={() => handleNavigate('category', 'all')}
              />
            )}

            {currentView === 'about' && (
              <FamilyAbout onNavigate={handleNavigate} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer */}
      <FamilyFooter onNavigate={handleNavigate} currency={currency} />

      {/* 4. Mobile Bottom Nav */}
      <FamilyBottomNav
        currentView={currentView}
        onNavigate={(v) => handleNavigate(v)}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 5. Mobile Menu Drawer */}
      <FamilyMenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentView={currentView}
        selectedDemographic={selectedDemographic}
        onNavigate={handleNavigate}
        currency={currency}
        onToggleCurrency={(c) => setCurrency(c)}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {/* 6. Search Modal */}
      <FamilySearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        currency={currency}
        onSelectProduct={handleSelectProduct}
      />

      {/* 7. Slide-over Cart Drawer */}
      <FamilyCartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />

      {/* 8. Warm Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-50 px-4 py-3 rounded-2xl bg-[#175CD3] text-white text-xs font-bold shadow-xl flex items-center space-x-2 border border-white/20 select-none animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Heart className="w-4 h-4 text-[#F76C5E] fill-[#F76C5E]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
