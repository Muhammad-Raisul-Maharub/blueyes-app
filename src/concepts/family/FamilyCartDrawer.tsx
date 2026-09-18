import React, { useState } from 'react'
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Gift,
  CheckCircle2,
  Heart,
  Tag,
} from 'lucide-react'
import type { Currency, FamilyCartItem } from './types'

interface FamilyCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: FamilyCartItem[]
  currency: Currency
  onUpdateQuantity: (id: string, delta: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
}

export const FamilyCartDrawer: React.FC<FamilyCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart')
  const [giftBoxSelected, setGiftBoxSelected] = useState(false)
  const [selectedOccasion, setSelectedOccasion] = useState<string>('Newborn Baby Shower')
  const [selectedBoxColor, setSelectedBoxColor] = useState<string>('Pastel Peach')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash'>('cod')
  const [district, setDistrict] = useState<'chattogram' | 'other'>('chattogram')
  const [voucherCode, setVoucherCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')

  if (!isOpen) return null

  const formatPrice = (priceBDT: number, priceUSD: number) => {
    if (currency === 'USD') return `$${priceUSD}`
    return `৳${priceBDT.toLocaleString()}`
  }

  // Calculate Subtotal
  const subtotalBDT = items.reduce((sum, item) => {
    return sum + item.product.priceBDT * item.quantity
  }, 0)

  const subtotalUSD = items.reduce((sum, item) => {
    return sum + item.product.priceUSD * item.quantity
  }, 0)

  // Voucher discount (20% if code matches FAMILY20 or contains 20)
  const discountRatio = discountApplied ? 0.2 : 0
  const discountBDT = Math.round(subtotalBDT * discountRatio)
  const discountUSD = Math.round(subtotalUSD * discountRatio)

  // Free shipping over ৳2,000 / $20
  const freeShippingThresholdBDT = 2000
  const freeShippingThresholdUSD = 20
  const subtotal = currency === 'USD' ? subtotalUSD : subtotalBDT
  const threshold = currency === 'USD' ? freeShippingThresholdUSD : freeShippingThresholdBDT
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100))
  const remainingForFreeShipping = Math.max(0, threshold - subtotal)

  const shippingBDT = subtotal < threshold ? (district === 'chattogram' ? 80 : 120) : 0
  const shippingUSD = subtotal < threshold ? (district === 'chattogram' ? 2 : 3) : 0

  // Gift box module (+৳140 / $1.80)
  const giftBoxCostBDT = giftBoxSelected ? 140 : 0
  const giftBoxCostUSD = giftBoxSelected ? 1.8 : 0

  const finalTotalBDT = subtotalBDT - discountBDT + shippingBDT + giftBoxCostBDT
  const finalTotalUSD = subtotalUSD - discountUSD + shippingUSD + giftBoxCostUSD

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault()
    if (voucherCode.toUpperCase().includes('20') || voucherCode.toUpperCase() === 'FAMILY') {
      setDiscountApplied(true)
    }
  }

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setCheckoutStep('confirmed')
  }

  const handleFinishAndReset = () => {
    onClearCart()
    setCheckoutStep('cart')
    onClose()
  }

  const occasions = [
    'Newborn Baby Shower',
    '1st Birthday Milestone',
    'Eid & Festive Blessing',
    'Welcome Home Baby',
  ]

  const boxColors = ['Pastel Peach', 'Sky Baby Blue', 'Honey Buttercup']

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs select-none font-['Public_Sans']">
      <div className="w-full max-w-md bg-[var(--color-surface)] border-l border-[var(--color-border)] h-full flex flex-col justify-between text-left shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-soft)] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-[#F76C5E] fill-[#F76C5E]" />
            <span className="font-extrabold text-sm text-[var(--color-text-primary)] font-['Outfit']">
              Family Bag & Registry [{items.length}]
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-4 py-3 bg-[var(--color-surface-soft)] border-b border-[var(--color-border)] text-xs">
          <div className="flex items-center justify-between mb-1.5 font-bold">
            <span className="text-[11px] text-[var(--color-text-secondary)]">
              {progressPercent >= 100
                ? '🎉 FREE NATIONWIDE DISPATCH UNLOCKED (ALL 64 DISTRICTS)'
                : `Add ${currency === 'USD' ? `$${remainingForFreeShipping}` : `৳${remainingForFreeShipping}`} for Free Shipping`}
            </span>
            <span className="text-[#175CD3] dark:text-[#4E8DFF]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#175CD3] to-[#F76C5E] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#175CD3]/10 flex items-center justify-center mx-auto text-[#175CD3]">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-[var(--color-text-secondary)]">
                    Your Family Bag is currently empty.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full bg-[#175CD3] text-white text-xs font-bold uppercase cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] flex space-x-3 text-xs"
                    >
                      <div className="w-16 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                        <img
                          src={item.selectedColor?.image || item.product.defaultImage}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-bold text-[var(--color-text-primary)] font-['Outfit'] text-[13px] line-clamp-1">
                              {item.product.title}
                            </h4>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              className="text-[var(--color-text-secondary)] hover:text-red-600 cursor-pointer ml-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[10px] text-[var(--color-text-secondary)] font-medium mt-0.5">
                            <span>Size: {item.selectedSize}</span> •{' '}
                            <span>{item.selectedColor?.name}</span>
                          </div>

                          {item.bundledMembers && item.bundledMembers.length > 0 && (
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[#F76C5E]/15 text-[#F76C5E] text-[9px] font-bold">
                              Includes Matching: {item.bundledMembers.join(', ')}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                          <span className="font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
                            {formatPrice(
                              item.product.priceBDT * item.quantity,
                              item.product.priceUSD * item.quantity
                            )}
                          </span>

                          <div className="flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1 hover:bg-[var(--color-surface-soft)] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-bold text-xs">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1 hover:bg-[var(--color-surface-soft)] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* PASTEL BABY SHOWER CELEBRATION GIFT BOX MODULE (+৳140 / $1.80) */}
                  <div className="p-4 rounded-2xl border-2 border-[#F76C5E]/30 bg-[#F76C5E]/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Gift className="w-4 h-4 text-[#F76C5E]" />
                        <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase">
                          Pastel Baby Shower Celebration Box
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#F76C5E]">
                        +{currency === 'USD' ? '$1.80' : '৳140'}
                      </span>
                    </div>

                    <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                      Custom satin ribbon, embossed greeting card, and unbleached tissue lining.
                    </p>

                    {/* Occasion Selector */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase block">
                        Select Celebration Occasion:
                      </label>
                      <select
                        value={selectedOccasion}
                        onChange={(e) => setSelectedOccasion(e.target.value)}
                        className="w-full p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] outline-none"
                      >
                        {occasions.map((occ) => (
                          <option key={occ} value={occ}>
                            {occ}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Box Color */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-2">
                        {boxColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedBoxColor(color)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                              selectedBoxColor === color
                                ? 'bg-[#F76C5E] text-white border-[#F76C5E]'
                                : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setGiftBoxSelected(!giftBoxSelected)}
                        className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all ${
                          giftBoxSelected
                            ? 'bg-[#175CD3] text-white'
                            : 'bg-white dark:bg-black border border-[var(--color-border)] text-[var(--color-text-primary)]'
                        }`}
                      >
                        {giftBoxSelected ? 'Box Added ✓' : '+ Add Box'}
                      </button>
                    </div>
                  </div>

                  {/* Voucher Apply Form */}
                  <form onSubmit={handleApplyVoucher} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Family Voucher (e.g. FAMILY20)"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="flex-1 p-2.5 rounded-xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] text-xs font-bold uppercase text-[var(--color-text-primary)] outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-full bg-[#175CD3] text-white text-xs font-bold uppercase cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {discountApplied && (
                    <div className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>20% Family Birthday Discount Applied!</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handleCompleteOrder} className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
                <span className="font-bold text-[var(--color-text-primary)] uppercase">
                  Fast Family Checkout
                </span>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="text-xs font-bold text-[#175CD3] hover:underline cursor-pointer"
                >
                  ← Edit Bag
                </button>
              </div>

              {/* District Zone */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase">
                  Fulfillment Destination:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDistrict('chattogram')}
                    className={`p-2.5 rounded-xl border text-center font-bold cursor-pointer ${
                      district === 'chattogram'
                        ? 'bg-[#175CD3] border-[#175CD3] text-white'
                        : 'bg-[var(--color-surface-soft)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                    }`}
                  >
                    Chattogram Metro (Same-Day)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDistrict('other')}
                    className={`p-2.5 rounded-xl border text-center font-bold cursor-pointer ${
                      district === 'other'
                        ? 'bg-[#175CD3] border-[#175CD3] text-white'
                        : 'bg-[var(--color-surface-soft)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                    }`}
                  >
                    All 64 Districts (48H)
                  </button>
                </div>
              </div>

              {/* Customer Inputs */}
              <div className="space-y-2">
                <input
                  type="text"
                  required
                  placeholder="Parent / Guardian Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:border-[#175CD3]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile Phone (+880 / WhatsApp)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:border-[#175CD3]"
                />
                <textarea
                  required
                  rows={2}
                  placeholder="Delivery Address (Street, House, Thana)"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:border-[#175CD3] resize-none"
                />
              </div>

              {/* Payment Methods: COD & bKash */}
              <div className="space-y-2 pt-2 border-t border-[var(--color-border)]">
                <label className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase">
                  Payment Method:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#175CD3]"
                      />
                      <span className="font-bold text-[var(--color-text-primary)]">
                        Cash on Delivery (COD)
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--color-text-secondary)]">Pay on inspection</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                        className="accent-[#175CD3]"
                      />
                      <span className="font-bold text-[var(--color-text-primary)]">
                        bKash Direct Merchant
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#E2136E]">Instant Verification</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#175CD3] hover:bg-[#144fbb] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md mt-4"
              >
                Confirm Family Order • {formatPrice(finalTotalBDT, finalTotalUSD)}
              </button>
            </form>
          )}

          {checkoutStep === 'confirmed' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#175CD3] text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[var(--color-text-secondary)] uppercase">
                  ORDER #FAM-928104
                </span>
                <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
                  Order Dispatched with Love!
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] max-w-xs mx-auto leading-relaxed">
                  We are preparing your family pieces with non-toxic care in Chattogram. You will receive an SMS delivery tracker.
                </p>
              </div>

              {giftBoxSelected && (
                <div className="p-3 rounded-2xl bg-[#F76C5E]/10 text-xs font-bold text-[#F76C5E]">
                  🎁 Enclosed in {selectedBoxColor} Box for {selectedOccasion}
                </div>
              )}

              <button
                type="button"
                onClick={handleFinishAndReset}
                className="px-6 py-3 rounded-full bg-[#175CD3] text-white text-xs font-bold uppercase cursor-pointer"
              >
                Return to Family Hub
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-soft)] space-y-3 text-xs">
            <div className="space-y-1 text-[var(--color-text-secondary)]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-[var(--color-text-primary)]">
                  {formatPrice(subtotalBDT, subtotalUSD)}
                </span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Family Discount (20%):</span>
                  <span>-{formatPrice(discountBDT, discountUSD)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Shipping:</span>
                <span>
                  {shippingBDT === 0 ? (
                    <strong className="text-emerald-600">FREE</strong>
                  ) : (
                    formatPrice(shippingBDT, shippingUSD)
                  )}
                </span>
              </div>
              {giftBoxSelected && (
                <div className="flex justify-between text-[#F76C5E] font-bold">
                  <span>Celebration Gift Box:</span>
                  <span>+{formatPrice(giftBoxCostBDT, giftBoxCostUSD)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[var(--color-border)] flex justify-between text-base font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
                <span>Estimated Total:</span>
                <span className="text-lg text-[#175CD3] dark:text-[#4E8DFF]">
                  {formatPrice(finalTotalBDT, finalTotalUSD)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCheckoutStep('checkout')}
              className="w-full py-3.5 rounded-full bg-[#175CD3] hover:bg-[#144fbb] text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
            >
              <span>Proceed to Fast Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
