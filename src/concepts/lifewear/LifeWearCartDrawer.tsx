import React, { useState } from 'react'
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Gift,
} from 'lucide-react'
import type { Currency, LifeWearCartItem } from './types'

interface LifeWearCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: LifeWearCartItem[]
  currency: Currency
  onUpdateQuantity: (cartId: string, delta: number) => void
  onRemoveItem: (cartId: string) => void
  kraftBoxSelected: boolean
  onToggleKraftBox: () => void
  onClearCart: () => void
}

export const LifeWearCartDrawer: React.FC<LifeWearCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  kraftBoxSelected,
  onToggleKraftBox,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'card'>('cod')
  const [district, setDistrict] = useState<'chattogram' | 'other' | 'intl'>('chattogram')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')

  if (!isOpen) return null

  const formatPrice = (priceBDT: number, priceUSD: number) => {
    if (currency === 'USD') return `$${priceUSD}`
    return `৳${priceBDT.toLocaleString()}`
  }

  // Subtotal calculation
  const subtotalBDT = items.reduce((sum, item) => {
    const itemPrice = item.isBundle && item.product.bundlePriceBDT
      ? item.product.bundlePriceBDT
      : item.product.priceBDT
    return sum + itemPrice * item.quantity
  }, 0)

  const subtotalUSD = items.reduce((sum, item) => {
    const itemPrice = item.isBundle && item.product.bundlePriceUSD
      ? item.product.bundlePriceUSD
      : item.product.priceUSD
    return sum + itemPrice * item.quantity
  }, 0)

  // Free shipping threshold
  const freeShippingThresholdBDT = 2000
  const freeShippingThresholdUSD = 20

  const subtotal = currency === 'USD' ? subtotalUSD : subtotalBDT
  const threshold = currency === 'USD' ? freeShippingThresholdUSD : freeShippingThresholdBDT
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100))
  const remainingForFreeShipping = Math.max(0, threshold - subtotal)

  // Shipping costs
  let shippingCostBDT = 0
  let shippingCostUSD = 0

  if (subtotal < threshold) {
    if (district === 'chattogram') {
      shippingCostBDT = 80
      shippingCostUSD = 2
    } else if (district === 'other') {
      shippingCostBDT = 120
      shippingCostUSD = 3
    } else {
      shippingCostBDT = 2500
      shippingCostUSD = 25
    }
  }

  // Recyclable Kraft Box Add-on: +৳60 / $0.80
  const kraftBoxCostBDT = kraftBoxSelected ? 60 : 0
  const kraftBoxCostUSD = kraftBoxSelected ? 0.8 : 0

  const totalBDT = subtotalBDT + shippingCostBDT + kraftBoxCostBDT
  const totalUSD = subtotalUSD + shippingCostUSD + kraftBoxCostUSD

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setCheckoutStep('confirmed')
  }

  const handleFinishAndReset = () => {
    onClearCart()
    setCheckoutStep('cart')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs select-none">
      {/* Slide-over Drawer Panel */}
      <div className="w-full max-w-md bg-[var(--color-canvas)] border-l border-[var(--color-border)] h-full flex flex-col justify-between text-left">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4 text-[#004CE8] dark:text-[#387BFF]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              BAG DISPATCH MANIFEST [{items.length}]
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-canvas)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-4 py-3 bg-[var(--color-surface)] border-b border-[var(--color-border)] font-mono text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-[var(--color-text-secondary)] uppercase">
              {progressPercent >= 100
                ? 'COMPLIMENTARY SHIPPING UNLOCKED (ALL 64 DISTRICTS)'
                : `ADD ${currency === 'USD' ? `$${remainingForFreeShipping}` : `৳${remainingForFreeShipping}`} FOR FREE DISPATCH`}
            </span>
            <span className="text-[11px] font-bold text-[#004CE8] dark:text-[#387BFF]">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[var(--color-border)] overflow-hidden">
            <div
              className="h-full bg-[#004CE8] dark:bg-[#387BFF] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Drawer Body: Cart Items vs Checkout vs Confirmation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-3 font-mono">
                  <div className="w-12 h-12 border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center mx-auto text-[var(--color-text-secondary)]">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">Your LifeWear bag is empty.</p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-[#004CE8] text-white text-xs uppercase font-semibold cursor-pointer"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => {
                    const priceBDT = item.isBundle && item.product.bundlePriceBDT
                      ? item.product.bundlePriceBDT
                      : item.product.priceBDT
                    const priceUSD = item.isBundle && item.product.bundlePriceUSD
                      ? item.product.bundlePriceUSD
                      : item.product.priceUSD

                    return (
                      <div
                        key={item.cartId}
                        className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] flex space-x-3 text-xs"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-20 bg-[var(--color-canvas)] border border-[var(--color-border)] overflow-hidden flex-shrink-0">
                          <img
                            src={item.color?.image || item.product.defaultImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between">
                              <h4 className="font-semibold text-[var(--color-text-primary)] text-[12px] line-clamp-1">
                                {item.product.name}
                              </h4>
                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.cartId)}
                                className="text-[var(--color-text-secondary)] hover:text-red-600 cursor-pointer ml-2"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center space-x-2 text-[10px] font-mono text-[var(--color-text-secondary)] mt-0.5">
                              <span>SIZE: {item.size}</span>
                              <span>•</span>
                              <span>{item.color?.name}</span>
                              <span>•</span>
                              <span>{item.product.gsm} GSM</span>
                            </div>

                            {item.isBundle && (
                              <span className="inline-block mt-1 px-1.5 py-0.2 bg-[#004CE8] text-white text-[9px] font-mono font-bold">
                                3-PACK BUNDLE
                              </span>
                            )}
                          </div>

                          {/* Price & Quantity Controls */}
                          <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                            <span className="font-mono font-bold text-[var(--color-text-primary)]">
                              {formatPrice(priceBDT * item.quantity, priceUSD * item.quantity)}
                            </span>

                            <div className="flex items-center border border-[var(--color-border)] bg-[var(--color-canvas)]">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.cartId, -1)}
                                className="p-1 hover:bg-[var(--color-surface)] cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 font-mono text-[11px] font-bold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.cartId, 1)}
                                className="p-1 hover:bg-[var(--color-surface)] cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* CUSTOM ADD-ON: Recyclable Kraft Gift Box (+৳60 / $0.80) */}
                  <div className="p-3 border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Gift className="w-4 h-4 text-[#004CE8] dark:text-[#387BFF] flex-shrink-0" />
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[var(--color-text-primary)] block">
                          Recyclable Kraft Gift Box
                        </span>
                        <span className="text-[10px] text-[var(--color-text-secondary)] font-mono">
                          100% unbleached pulp + jute string (+{currency === 'USD' ? '$0.80' : '৳60'})
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onToggleKraftBox}
                      className={`px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider border cursor-pointer ${
                        kraftBoxSelected
                          ? 'bg-[#004CE8] border-[#004CE8] text-white'
                          : 'bg-[var(--color-canvas)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                      }`}
                    >
                      {kraftBoxSelected ? 'ADDED ✓' : '+ ADD'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handleCompleteOrder} className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
                <span className="font-bold text-[var(--color-text-primary)] uppercase">
                  TRANSPARENT DISPATCH CHECKOUT
                </span>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="text-[10px] text-[#004CE8] dark:text-[#387BFF] hover:underline"
                >
                  ← EDIT BAG
                </button>
              </div>

              {/* Destination Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-[var(--color-text-secondary)] uppercase">
                  DISPATCH ZONE:
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setDistrict('chattogram')}
                    className={`p-2 border text-center cursor-pointer ${
                      district === 'chattogram'
                        ? 'bg-[#004CE8] border-[#004CE8] text-white font-bold'
                        : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                    }`}
                  >
                    CHATTOGRAM (SAME-DAY)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDistrict('other')}
                    className={`p-2 border text-center cursor-pointer ${
                      district === 'other'
                        ? 'bg-[#004CE8] border-[#004CE8] text-white font-bold'
                        : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                    }`}
                  >
                    64 DISTRICTS (48H)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDistrict('intl')}
                    className={`p-2 border text-center cursor-pointer ${
                      district === 'intl'
                        ? 'bg-[#004CE8] border-[#004CE8] text-white font-bold'
                        : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                    }`}
                  >
                    DHL GLOBAL (3-5D)
                  </button>
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="space-y-2">
                <input
                  type="text"
                  required
                  placeholder="Full Recipient Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:border-[#004CE8] outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Contact Mobile (+880 / WhatsApp)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:border-[#004CE8] outline-none"
                />
                <textarea
                  required
                  rows={2}
                  placeholder="Delivery Street Address & Thana / City"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:border-[#004CE8] outline-none resize-none"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-1.5 pt-2 border-t border-[var(--color-border)]">
                <label className="text-[10px] text-[var(--color-text-secondary)] uppercase">
                  PAYMENT SETTLEMENT:
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center justify-between p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#004CE8]"
                      />
                      <span className="font-semibold text-[var(--color-text-primary)]">Cash on Delivery (COD)</span>
                    </div>
                    <span className="text-[10px] text-[var(--color-text-secondary)]">Pay on inspection</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                        className="accent-[#004CE8]"
                      />
                      <span className="font-semibold text-[var(--color-text-primary)]">bKash Direct Merchant</span>
                    </div>
                    <span className="text-[10px] text-[#E2136E] font-bold">Instant OTP</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-[#004CE8]"
                      />
                      <span className="font-semibold text-[var(--color-text-primary)]">International Cards</span>
                    </div>
                    <span className="text-[10px] text-[var(--color-text-secondary)]">Visa / Mastercard / Amex</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#004CE8] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0039B4] transition-colors cursor-pointer mt-3"
              >
                CONFIRM DISPATCH & ORDER • {formatPrice(totalBDT, totalUSD)}
              </button>
            </form>
          )}

          {checkoutStep === 'confirmed' && (
            <div className="py-8 text-center space-y-4 font-mono">
              <div className="w-14 h-14 bg-[#004CE8] text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-[var(--color-text-secondary)] uppercase">
                  ORDER #LW-849201
                </span>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                  DISPATCH CONFIRMED
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] max-w-xs mx-auto">
                  Your order is queued for packing in Chattogram. Tracking link will be dispatched via SMS.
                </p>
              </div>

              <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] text-left text-xs space-y-1 max-w-xs mx-auto">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Zone:</span>
                  <span className="font-bold text-[var(--color-text-primary)] uppercase">{district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Payment:</span>
                  <span className="font-bold text-[var(--color-text-primary)] uppercase">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Total Paid/Due:</span>
                  <span className="font-bold text-[#004CE8] dark:text-[#387BFF]">
                    {formatPrice(totalBDT, totalUSD)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishAndReset}
                className="px-6 py-3 bg-[#004CE8] text-white text-xs font-semibold uppercase cursor-pointer"
              >
                COMPLETE & RETURN TO STORE
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer: Price Summary & Checkout Action */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] space-y-3 font-mono text-xs">
            <div className="space-y-1.5 text-[var(--color-text-secondary)]">
              <div className="flex justify-between">
                <span>SUBTOTAL:</span>
                <span className="font-bold text-[var(--color-text-primary)]">
                  {formatPrice(subtotalBDT, subtotalUSD)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>SHIPPING:</span>
                <span>
                  {shippingCostBDT === 0 ? (
                    <strong className="text-[#004CE8] dark:text-[#387BFF]">FREE DISPATCH</strong>
                  ) : (
                    formatPrice(shippingCostBDT, shippingCostUSD)
                  )}
                </span>
              </div>
              {kraftBoxSelected && (
                <div className="flex justify-between text-[#004CE8] dark:text-[#387BFF]">
                  <span>RECYCLABLE KRAFT BOX:</span>
                  <span>+{formatPrice(kraftBoxCostBDT, kraftBoxCostUSD)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[var(--color-border)] flex justify-between text-sm font-bold text-[var(--color-text-primary)]">
                <span>ESTIMATED TOTAL:</span>
                <span className="text-base text-[#004CE8] dark:text-[#387BFF]">
                  {formatPrice(totalBDT, totalUSD)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCheckoutStep('checkout')}
              className="w-full py-3.5 bg-[#004CE8] hover:bg-[#0039B4] text-white font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <span>PROCEED TO DISPATCH CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
