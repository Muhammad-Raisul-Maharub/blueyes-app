import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Plus,
  Minus,
  Trash2,
  Package,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Smartphone,
  Banknote,
  Box,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import type { GlacierCartItem, Currency } from './types'

interface GlacierCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems: GlacierCartItem[]
  onUpdateQuantity: (id: string, delta: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
  currency: Currency
}

export const GlacierCartDrawer: React.FC<GlacierCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
}) => {
  const [includesKeepsakeBox, setIncludesKeepsakeBox] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'card'>('bkash')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [orderRef, setOrderRef] = useState('')

  // Pricing calculations
  const keepsakePriceBDT = 250
  const keepsakePriceUSD = 3

  const itemsSubtotalBDT = cartItems.reduce(
    (sum, item) => sum + item.product.priceBDT * item.quantity,
    0
  )
  const itemsSubtotalUSD = cartItems.reduce(
    (sum, item) => sum + item.product.priceUSD * item.quantity,
    0
  )

  const keepsakeCostBDT = includesKeepsakeBox && cartItems.length > 0 ? keepsakePriceBDT : 0
  const keepsakeCostUSD = includesKeepsakeBox && cartItems.length > 0 ? keepsakePriceUSD : 0

  // Free shipping over ৳10,000 BDT or $90 USD
  const freeShippingThresholdBDT = 10000
  const freeShippingThresholdUSD = 90
  const isFreeShipping =
    currency === 'BDT'
      ? itemsSubtotalBDT >= freeShippingThresholdBDT
      : itemsSubtotalUSD >= freeShippingThresholdUSD

  const shippingCostBDT = isFreeShipping || cartItems.length === 0 ? 0 : 120
  const shippingCostUSD = isFreeShipping || cartItems.length === 0 ? 0 : 2

  const finalTotalBDT = itemsSubtotalBDT + keepsakeCostBDT + shippingCostBDT
  const finalTotalUSD = itemsSubtotalUSD + keepsakeCostUSD + shippingCostUSD

  const formatPrice = (bdt: number, usd: number) => {
    return currency === 'BDT' ? `৳${bdt.toLocaleString()}` : `$${usd}`
  }

  // Free shipping progress percentage
  const freeShippingProgress = Math.min(
    100,
    currency === 'BDT'
      ? Math.round((itemsSubtotalBDT / freeShippingThresholdBDT) * 100)
      : Math.round((itemsSubtotalUSD / freeShippingThresholdUSD) * 100)
  )

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      const generatedRef = `GLC-${Math.floor(100000 + Math.random() * 900000)}`
      setOrderRef(generatedRef)
      setIsCheckingOut(false)
      setIsOrderComplete(true)

      // Trigger icy celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7DD3FC', '#38BDF8', '#0284C7', '#BAE6FD', '#FFFFFF'],
        })
      } catch {
        // Safe fallback
      }
    }, 1400)
  }

  const handleResetOrder = () => {
    setIsOrderComplete(false)
    onClearCart()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#030712]/75 backdrop-blur-md transition-opacity"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#030712]/90 text-[#F0F9FF] backdrop-blur-2xl border-l border-sky-400/25 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between"
            >
              {/* Top Header */}
              <div className="p-5 sm:p-6 border-b border-sky-400/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                  <h2 className="font-syne font-extrabold text-[18px] sm:text-[20px] tracking-wider uppercase text-white">
                    Acquisition Drawer
                  </h2>
                  <span className="font-space-mono text-[11px] px-2 py-0.5 bg-sky-950 text-[#7DD3FC] border border-sky-400/30">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {cartItems.length > 0 && !isOrderComplete && (
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Clear acquisitions"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Body Area */}
              <div className="flex-1 overflow-y-auto scrollbar-none p-5 sm:p-6">
                {isOrderComplete ? (
                  /* Acquisition Confirmed Screen */
                  <div className="py-12 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-sky-950/80 border border-sky-400 text-[#7DD3FC] flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(125,211,252,0.3)]">
                      <CheckCircle2 className="w-9 h-9 text-[#38BDF8]" />
                    </div>

                    <span className="font-space-mono text-[11px] uppercase tracking-[0.25em] text-[#7DD3FC] block mb-1 font-bold">
                      ACQUISITION LOGGED
                    </span>
                    <h3 className="font-syne font-extrabold text-[24px] text-white uppercase mb-2">
                      Allocation Secured
                    </h3>
                    <p className="font-sans text-[13px] text-slate-300 max-w-xs leading-relaxed mb-6">
                      Your sub-zero numbered archival order has been assigned to Maison Chattogram Cryo-Fulfillment.
                    </p>

                    <div className="w-full bg-slate-950/80 p-4 border border-sky-400/30 text-left font-space-mono text-[11px] mb-8 space-y-2">
                      <div className="flex justify-between text-slate-400">
                        <span>ORDER MANIFEST:</span>
                        <strong className="text-sky-200">{orderRef}</strong>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>SETTLEMENT:</span>
                        <span className="text-white uppercase font-bold">{paymentMethod}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>TOTAL AMOUNT:</span>
                        <span className="text-[#7DD3FC] font-bold">
                          {formatPrice(finalTotalBDT, finalTotalUSD)}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-400 pt-2 border-t border-sky-400/20">
                        <span>DISPATCH:</span>
                        <span className="text-sky-300">24H Chattogram / 48H Nationwide</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetOrder}
                      className="w-full py-3.5 bg-[#38BDF8] text-[#030712] font-space font-extrabold text-[12px] uppercase tracking-[0.16em] hover:bg-[#7DD3FC] transition-colors cursor-pointer"
                    >
                      Return to Archive
                    </button>
                  </div>
                ) : cartItems.length > 0 ? (
                  <div className="space-y-6">
                    {/* Free Shipping Progress Indicator */}
                    <div className="p-3.5 bg-slate-950/70 border border-sky-400/20">
                      <div className="flex items-center justify-between text-[11px] font-space-mono mb-1.5">
                        <span className="text-slate-300">
                          {isFreeShipping ? (
                            <span className="text-[#7DD3FC] font-bold flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                              FREE 64-DISTRICT EXPRESS SECURED
                            </span>
                          ) : (
                            <span>
                              ADD{' '}
                              <strong className="text-[#38BDF8]">
                                {currency === 'BDT'
                                  ? `৳${(freeShippingThresholdBDT - itemsSubtotalBDT).toLocaleString()}`
                                  : `$${freeShippingThresholdUSD - itemsSubtotalUSD}`}
                              </strong>{' '}
                              FOR FREE COURIER
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] text-slate-400">{freeShippingProgress}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8]"
                          style={{ width: `${freeShippingProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 bg-slate-950/50 border border-sky-400/20 flex gap-3 relative group"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="w-16 h-20 object-cover border border-sky-400/30 shrink-0"
                          />

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-syne font-bold text-[13px] text-white line-clamp-1 uppercase">
                                  {item.product.title}
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <span className="text-[10px] font-space-mono text-slate-400 block">
                                {item.selectedSize} • {item.selectedColor}
                              </span>
                              <span className="text-[9px] font-space-mono text-sky-400 block mt-0.5">
                                {item.product.spec}
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-sky-400/10">
                              <span className="font-space-mono font-bold text-[13px] text-[#7DD3FC]">
                                {formatPrice(
                                  item.product.priceBDT * item.quantity,
                                  item.product.priceUSD * item.quantity
                                )}
                              </span>

                              {/* Quantity buttons */}
                              <div className="flex items-center gap-2 bg-slate-900 border border-sky-400/30 px-1 py-0.5">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.id, -1)}
                                  className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-space-mono text-[11px] font-bold text-white px-1">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.id, 1)}
                                  className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Glacial Frosted Keepsake Box (+৳250 / $3.00) Option */}
                    <div
                      onClick={() => setIncludesKeepsakeBox(!includesKeepsakeBox)}
                      className={`p-4 border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        includesKeepsakeBox
                          ? 'bg-sky-950/40 border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                          : 'bg-slate-950/40 border-sky-400/20 hover:border-sky-400/40'
                      }`}
                    >
                      <div className="mt-0.5">
                        <div
                          className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                            includesKeepsakeBox
                              ? 'bg-[#38BDF8] border-[#38BDF8] text-[#030712]'
                              : 'border-slate-500'
                          }`}
                        >
                          {includesKeepsakeBox && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-syne font-bold text-[13px] text-white uppercase flex items-center gap-1.5">
                            <Box className="w-3.5 h-3.5 text-[#38BDF8]" />
                            Glacial Frosted Keepsake Box
                          </h4>
                          <span className="font-space-mono text-[11px] text-[#7DD3FC] font-bold">
                            +{formatPrice(keepsakePriceBDT, keepsakePriceUSD)}
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-slate-400 mt-1 text-left leading-tight">
                          Custom laser-milled frosted acrylic capsule box with cryo-seal and archive certificate.
                        </p>
                      </div>
                    </div>

                    {/* Settlement / Payment Method Selector */}
                    <div>
                      <span className="font-space-mono text-[10px] font-bold uppercase text-slate-400 block mb-2">
                        SETTLEMENT METHOD:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bkash')}
                          className={`p-2.5 border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                            paymentMethod === 'bkash'
                              ? 'bg-sky-500/20 border-[#38BDF8] text-[#7DD3FC] font-bold'
                              : 'bg-slate-950/60 border-sky-400/20 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <Smartphone className="w-4 h-4" />
                          <span className="font-space-mono text-[10px] uppercase">bKash Direct</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('cod')}
                          className={`p-2.5 border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                            paymentMethod === 'cod'
                              ? 'bg-sky-500/20 border-[#38BDF8] text-[#7DD3FC] font-bold'
                              : 'bg-slate-950/60 border-sky-400/20 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <Banknote className="w-4 h-4" />
                          <span className="font-space-mono text-[10px] uppercase">Cash on Delivery</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`p-2.5 border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                            paymentMethod === 'card'
                              ? 'bg-sky-500/20 border-[#38BDF8] text-[#7DD3FC] font-bold'
                              : 'bg-slate-950/60 border-sky-400/20 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                          <span className="font-space-mono text-[10px] uppercase">Global Card</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Empty State */
                  <div className="py-24 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-slate-900 border border-sky-400/20 text-sky-400 flex items-center justify-center mb-4">
                      <Package className="w-6 h-6 text-sky-400/60" />
                    </div>
                    <h3 className="font-syne font-bold text-[18px] text-white uppercase mb-1">
                      Acquisition Drawer Empty
                    </h3>
                    <p className="font-sans text-[12px] text-slate-400 max-w-xs mb-6">
                      Explore our 15-piece sub-zero architectural drop to claim an archival allocation.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2.5 bg-sky-500/20 hover:bg-sky-500/30 text-[#7DD3FC] border border-sky-400/40 font-space font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Browse Archival Catalog
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Fixed Checkout Summary */}
              {cartItems.length > 0 && !isOrderComplete && (
                <div className="p-5 sm:p-6 border-t border-sky-400/20 bg-slate-950/80 backdrop-blur-xl space-y-3">
                  <div className="space-y-1.5 font-space-mono text-[11px] text-slate-400">
                    <div className="flex justify-between">
                      <span>PIECES SUBTOTAL:</span>
                      <span className="text-slate-200 font-semibold">
                        {formatPrice(itemsSubtotalBDT, itemsSubtotalUSD)}
                      </span>
                    </div>

                    {includesKeepsakeBox && (
                      <div className="flex justify-between">
                        <span>FROSTED KEEPSAKE BOX:</span>
                        <span className="text-[#7DD3FC]">
                          +{formatPrice(keepsakePriceBDT, keepsakePriceUSD)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>64-DISTRICT COURIER:</span>
                      <span className="text-slate-200">
                        {isFreeShipping ? (
                          <strong className="text-[#38BDF8]">FREE (CHATTOGRAM 24H)</strong>
                        ) : (
                          formatPrice(shippingCostBDT, shippingCostUSD)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-[14px] text-white font-bold pt-2 border-t border-sky-400/20">
                      <span className="font-syne uppercase">TOTAL VALUE:</span>
                      <span className="font-space-mono text-[#7DD3FC] text-[16px]">
                        {formatPrice(finalTotalBDT, finalTotalUSD)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-[#38BDF8] hover:bg-[#7DD3FC] disabled:opacity-50 text-[#030712] font-space font-extrabold text-[13px] tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <span className="inline-flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        CRYOGENIC VERIFICATION...
                      </span>
                    ) : (
                      <span>SECURE ACQUISITION ALLOCATION</span>
                    )}
                  </button>
                </div>
              )}
            </motion.aside>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
