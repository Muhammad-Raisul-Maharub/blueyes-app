import React, { useState } from 'react'
import type { CartItem, DeliveryZone } from './types'
import { DELIVERY_ESTIMATES } from './atelierData'
import {
  X,
  Plus,
  Minus,
  Trash2,
  Gift,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Truck,
  Clock,
} from 'lucide-react'
import confetti from 'canvas-confetti'

interface AtelierCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (id: string, delta: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
}

export const AtelierCartDrawer: React.FC<AtelierCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>('chattogram')
  const [includeGiftBox, setIncludeGiftBox] = useState(true)
  const [giftMessage, setGiftMessage] = useState('')
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState('')

  if (!isOpen) return null

  const activeDelivery = DELIVERY_ESTIMATES[selectedZone] || DELIVERY_ESTIMATES['chattogram']

  const subtotalBDT = cartItems.reduce(
    (sum, item) => sum + item.product.priceBDT * item.quantity,
    0
  )
  const subtotalUSD = cartItems.reduce(
    (sum, item) => sum + item.product.priceUSD * item.quantity,
    0
  )

  const giftBoxPriceBDT = includeGiftBox ? 150 : 0
  const giftBoxPriceUSD = includeGiftBox ? 2 : 0

  const freeThreshold =
    currency === 'BDT' ? activeDelivery.freeThresholdBDT : activeDelivery.freeThresholdUSD
  const currentSubtotal = currency === 'BDT' ? subtotalBDT : subtotalUSD
  const isFreeShipping = currentSubtotal >= freeThreshold

  const shippingCostBDT = isFreeShipping ? 0 : activeDelivery.costBDT
  const shippingCostUSD = isFreeShipping ? 0 : activeDelivery.costUSD

  const totalBDT = subtotalBDT + giftBoxPriceBDT + shippingCostBDT
  const totalUSD = subtotalUSD + giftBoxPriceUSD + shippingCostUSD

  const progressPercent = Math.min(
    100,
    Math.round((currentSubtotal / freeThreshold) * 100)
  )
  const remainingThreshold = Math.max(0, freeThreshold - currentSubtotal)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#103FEF', '#4D76FF', '#8C7355', '#C4A47C', '#FDDDB9'],
    })

    setTimeout(() => {
      setIsCheckingOut(false)
      setOrderId(`#BLU-CTG-${Math.floor(1000 + Math.random() * 9000)}`)
      setOrderComplete(true)
    }, 1200)
  }

  const handleDone = () => {
    setOrderComplete(false)
    onClearCart()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-over sheet panel from RIGHT on both Desktop and Mobile */}
      <div className="relative z-10 w-full max-w-md h-full bg-[var(--color-canvas)] text-[var(--color-text-primary)] border-l border-[var(--color-border)] flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.3)] animate-slideInRight transition-colors duration-200">
        {/* Header Bar */}
        <div className="px-5 py-4 bg-[var(--color-card)] border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-[var(--color-accent-bronze)] font-semibold">
              Maison Bag
            </span>
            <span className="text-[12px] font-sans font-medium text-[var(--color-text-muted)]">
              ({cartItems.reduce((total, i) => total + i.quantity, 0)} pieces)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency conversion options */}
            <div className="flex items-center border border-[var(--color-border)] p-0.5 bg-[var(--color-card-subtle)]">
              <button
                type="button"
                onClick={() => setCurrency('BDT')}
                className={`px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-wider font-semibold cursor-pointer transition-colors ${
                  currency === 'BDT'
                    ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                BDT ৳
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-wider font-semibold cursor-pointer transition-colors ${
                  currency === 'USD'
                    ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                USD $
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Local & Global Logistics Delivery Zone Selector */}
        <div className="px-5 py-3 bg-[var(--color-card-subtle)] border-b border-[var(--color-border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-sans uppercase tracking-wider font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[var(--color-accent-blue)]" />
              Dispatch Destination
            </span>
            <span className="text-[9px] font-sans uppercase text-[var(--color-accent-bronze)] font-semibold">
              Flagship: GEC Circle, Ctg
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[var(--color-card)] border border-[var(--color-border)] mb-2.5">
            <button
              type="button"
              onClick={() => setSelectedZone('chattogram')}
              className={`py-1.5 px-1 text-[9.5px] font-sans uppercase tracking-wider text-center cursor-pointer transition-colors ${
                selectedZone === 'chattogram'
                  ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-semibold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              Chattogram
            </button>
            <button
              type="button"
              onClick={() => setSelectedZone('dhaka_nationwide')}
              className={`py-1.5 px-1 text-[9.5px] font-sans uppercase tracking-wider text-center cursor-pointer transition-colors ${
                selectedZone === 'dhaka_nationwide'
                  ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-semibold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              Dhaka & 64 Dist
            </button>
            <button
              type="button"
              onClick={() => setSelectedZone('international')}
              className={`py-1.5 px-1 text-[9.5px] font-sans uppercase tracking-wider text-center cursor-pointer transition-colors ${
                selectedZone === 'international'
                  ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-semibold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              Global DHL
            </button>
          </div>

          {/* Zone ETA summary line */}
          <div className="flex items-center justify-between text-[10px] font-sans text-[var(--color-text-secondary)] mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[var(--color-accent-bronze)]" />
              {activeDelivery.eta}
            </span>
            <span className="text-[var(--color-accent-blue)] font-medium">
              {isFreeShipping
                ? 'Free Delivery Unlocked'
                : currency === 'BDT'
                ? `৳${activeDelivery.costBDT} (Free over ৳${activeDelivery.freeThresholdBDT.toLocaleString()})`
                : `$${activeDelivery.costUSD} (Free over $${activeDelivery.freeThresholdUSD})`}
            </span>
          </div>

          {/* Free Delivery Progress Bar */}
          <div className="flex items-center justify-between text-[11px] font-sans mb-1.5">
            {isFreeShipping ? (
              <span className="text-[var(--color-accent-blue)] font-semibold uppercase tracking-wider flex items-center gap-1.5 text-[10px]">
                <Sparkles className="w-3.5 h-3.5" />
                Complimentary Express Courier Active
              </span>
            ) : (
              <span className="text-[10.5px] font-sans text-[var(--color-text-secondary)]">
                Add{' '}
                <strong className="text-[var(--color-text-primary)]">
                  {currency === 'BDT'
                    ? `৳${remainingThreshold.toLocaleString()}`
                    : `$${remainingThreshold}`}
                </strong>{' '}
                for Free Express
              </span>
            )}
            <span className="font-semibold text-[var(--color-accent-bronze)] text-[10.5px]">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[var(--color-border)] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-accent-bronze)] to-[var(--color-accent-blue)] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Order Completion State */}
        {orderComplete ? (
          <div className="p-8 flex flex-col items-center text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-[var(--color-accent-blue)] text-white flex items-center justify-center mb-4 shadow-lg animate-bounce">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[var(--color-accent-bronze)] font-semibold mb-1">
              Atelier Order Confirmed
            </span>
            <h3 className="font-serif text-[26px] text-[var(--color-text-primary)] mb-2">
              Dispatching from Chattogram Flagship
            </h3>
            <p className="text-[13px] font-sans text-[var(--color-text-secondary)] max-w-xs mb-3 leading-relaxed">
              Your garments have been assigned to our master tailors at GEC Circle for final inspection, hand steaming, and navy silk box packaging.
            </p>
            <div className="w-full p-3 bg-[var(--color-card-subtle)] border border-[var(--color-border)] text-[11px] font-sans text-[var(--color-text-primary)] mb-4 text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Order Identifier:</span>
                <strong>{orderId || '#BLU-CTG-7821'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Courier Partner:</span>
                <span>{activeDelivery.courier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Estimated Arrival:</span>
                <span className="font-semibold text-[var(--color-accent-blue)]">{activeDelivery.eta}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDone}
              className="w-full py-4 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[12px] font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-blue)] cursor-pointer shadow-md"
            >
              Return to Atelier
            </button>
          </div>
        ) : (
          /* Cart Content Scroll Area */
          <div className="overflow-y-auto flex-1 p-5 flex flex-col gap-4">
            {cartItems.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <p className="font-serif text-[22px] text-[var(--color-text-primary)] italic mb-2">
                  Your Bag is Empty
                </p>
                <p className="text-[13px] font-sans text-[var(--color-text-muted)] max-w-xs mb-6">
                  Explore our curated salons in Women, Men, Kids, Baby, or Accessories to select your pieces.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[11px] font-sans uppercase tracking-widest hover:bg-[var(--color-accent-blue)] cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                {/* Item List */}
                <div className="flex flex-col divide-y divide-[var(--color-border)]">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 flex gap-3.5 first:pt-0">
                      {/* Image */}
                      <div className="w-20 h-26 bg-[var(--color-surface-container)] overflow-hidden flex-shrink-0 border border-[var(--color-border)]">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-serif text-[15px] text-[var(--color-text-primary)] leading-snug">
                              {item.product.title}
                            </h4>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              className="text-[var(--color-text-muted)] hover:text-[#BA1A1A] p-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-[10px] font-sans uppercase tracking-wider text-[var(--color-accent-bronze)] block mt-1">
                            {item.selectedSize} • {item.selectedColor}
                          </span>
                        </div>

                        {/* Controls & Price */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-[var(--color-border)] bg-[var(--color-card)]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-card-subtle)] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-[12px] font-sans font-semibold text-[var(--color-text-primary)]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-card-subtle)] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="font-sans font-semibold text-[14px] text-[var(--color-text-primary)] tabular-nums">
                              {currency === 'BDT'
                                ? `৳${(item.product.priceBDT * item.quantity).toLocaleString()}`
                                : `$${item.product.priceUSD * item.quantity}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* One-Click Gift Option: Signature Navy Embossed Silk Gift Box (+৳150 / $2) */}
                <div className="p-4 bg-[var(--color-card)] border border-[var(--color-border)] flex flex-col gap-3 shadow-sm">
                  <div className="flex items-start justify-between">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeGiftBox}
                        onChange={(e) => setIncludeGiftBox(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-[var(--color-accent-blue)] border-[var(--color-text-muted)] rounded-none focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[var(--color-text-primary)] flex items-center gap-1.5">
                          <Gift className="w-3.5 h-3.5 text-[var(--color-accent-bronze)]" />
                          Signature Navy Embossed Silk Gift Box (+৳150 / $2)
                        </span>
                        <p className="text-[11px] font-sans text-[var(--color-text-secondary)] mt-0.5 leading-relaxed">
                          Includes golden seal wax stamp, midnight blue raw silk ribbon, and bespoke calligraphy card note.
                        </p>
                      </div>
                    </label>
                    <span className="text-[12px] font-sans font-semibold text-[var(--color-accent-blue)] tabular-nums flex-shrink-0">
                      {currency === 'BDT' ? '+৳150' : '+$2'}
                    </span>
                  </div>

                  {includeGiftBox && (
                    <div className="mt-1 pt-2.5 border-t border-[var(--color-border)]">
                      <label className="text-[10px] font-sans uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
                        Custom Calligraphy Note:
                      </label>
                      <textarea
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Inscribe a personalized gift note (e.g. 'For Nazia on our milestone anniversary, with all my love')..."
                        rows={2}
                        className="w-full p-2.5 text-[11px] font-sans text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] bg-[var(--color-card-subtle)] focus:outline-none focus:border-[var(--color-accent-blue)]"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Sticky Bottom Checkout Footer */}
        {cartItems.length > 0 && !orderComplete && (
          <div className="p-5 bg-[var(--color-card)] border-t border-[var(--color-border)] pb-safe flex flex-col gap-3.5">
            {/* Calculation rows */}
            <div className="flex flex-col gap-1.5 text-[12px] font-sans">
              <div className="flex justify-between text-[var(--color-text-secondary)]">
                <span>Atelier Subtotal</span>
                <span className="tabular-nums font-medium text-[var(--color-text-primary)]">
                  {currency === 'BDT' ? `৳${subtotalBDT.toLocaleString()}` : `$${subtotalUSD}`}
                </span>
              </div>
              {includeGiftBox && (
                <div className="flex justify-between text-[var(--color-text-secondary)]">
                  <span>Navy Embossed Silk Gift Box</span>
                  <span className="tabular-nums font-medium text-[var(--color-text-primary)]">
                    {currency === 'BDT' ? `৳${giftBoxPriceBDT}` : `$${giftBoxPriceUSD}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-[var(--color-text-secondary)]">
                <span>
                  Courier ({activeDelivery.title})
                </span>
                <span className="text-[var(--color-accent-blue)] font-medium">
                  {isFreeShipping
                    ? 'Complimentary'
                    : currency === 'BDT'
                    ? `৳${shippingCostBDT}`
                    : `$${shippingCostUSD}`}
                </span>
              </div>
              <div className="flex justify-between text-[var(--color-text-primary)] font-semibold pt-2 border-t border-[var(--color-border)] text-[14px]">
                <span>Total Amount</span>
                <span className="font-serif text-[18px] tabular-nums text-[var(--color-text-primary)]">
                  {currency === 'BDT' ? `৳${totalBDT.toLocaleString()}` : `$${totalUSD}`}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 px-6 bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-sans text-[12px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-[var(--color-accent-blue)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75"
            >
              {isCheckingOut ? (
                <span>Securing Atelier Garments...</span>
              ) : (
                <>
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
