import React, { useState } from 'react'
import type { DistrictCartItem, PaymentMethod } from './types'
import {
  X,
  Plus,
  Minus,
  Trash2,
  Package,
  Zap,
  ShieldCheck,
  ArrowRight,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
} from 'lucide-react'
import confetti from 'canvas-confetti'

interface DistrictCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems: DistrictCartItem[]
  onUpdateQuantity: (id: string, delta: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
}

export const DistrictCartDrawer: React.FC<DistrictCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [includeMylarPack, setIncludeMylarPack] = useState(true)
  const [stencilNote, setStencilNote] = useState('')
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash')
  const [selectedZone, setSelectedZone] = useState<'chattogram' | 'nationwide' | 'global'>('chattogram')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [orderTrackingId, setOrderTrackingId] = useState('')

  if (!isOpen) return null

  // Thresholds
  const thresholds = {
    chattogram: { freeBDT: 3000, feeBDT: 80, freeUSD: 25, feeUSD: 1, eta: 'Same-Day / 24 Hours' },
    nationwide: { freeBDT: 5000, feeBDT: 150, freeUSD: 45, feeUSD: 2, eta: '48–72 Hours Express' },
    global: { freeBDT: 25000, feeBDT: 2800, freeUSD: 220, feeUSD: 25, eta: '3–5 Days DHL Express' },
  }

  const activeZone = thresholds[selectedZone]

  const subtotalBDT = cartItems.reduce(
    (sum, item) => sum + item.product.priceBDT * item.quantity,
    0
  )
  const subtotalUSD = cartItems.reduce(
    (sum, item) => sum + item.product.priceUSD * item.quantity,
    0
  )

  const mylarPriceBDT = includeMylarPack ? 120 : 0
  const mylarPriceUSD = includeMylarPack ? 1.5 : 0

  const freeThreshold = currency === 'BDT' ? activeZone.freeBDT : activeZone.freeUSD
  const currentSubtotal = currency === 'BDT' ? subtotalBDT : subtotalUSD
  const isFreeDelivery = currentSubtotal >= freeThreshold

  const shippingCostBDT = isFreeDelivery ? 0 : activeZone.feeBDT
  const shippingCostUSD = isFreeDelivery ? 0 : activeZone.feeUSD

  const totalBDT = subtotalBDT + mylarPriceBDT + shippingCostBDT
  const totalUSD = subtotalUSD + mylarPriceUSD + shippingCostUSD

  const progressPercent = Math.min(
    100,
    Math.round((currentSubtotal / freeThreshold) * 100)
  )
  const remaining = Math.max(0, freeThreshold - currentSubtotal)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#CCFF00', '#0047FF', '#FFFFFF', '#090A0E'],
    })

    setTimeout(() => {
      setIsCheckingOut(false)
      setOrderTrackingId(`#D-CTG-${Math.floor(100000 + Math.random() * 900000)}`)
      setOrderConfirmed(true)
    }, 1000)
  }

  const handleDone = () => {
    setOrderConfirmed(false)
    onClearCart()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="flex-1" onClick={onClose} />

      {/* Slide-over Drawer Panel */}
      <div className="relative z-10 w-full max-w-md h-full bg-white dark:bg-[#090A0E] text-[#090A0E] dark:text-white border-l border-[#E2E8F0] dark:border-[#2C3142] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-slideInRight transition-colors duration-200">
        {/* Header Bar */}
        <div className="px-5 py-4 bg-[#ECEEF2] dark:bg-[#13151D] border-b border-[#E2E8F0] dark:border-[#2C3142] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-syne font-extrabold text-[15px] uppercase tracking-wider text-[#090A0E] dark:text-white">
              STREETWEAR BAG
            </span>
            <span className="font-mono-tech text-[12px] text-[#0047FF] dark:text-[#CCFF00] font-bold">
              [{cartItems.reduce((acc, i) => acc + i.quantity, 0)} UNITS]
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="flex items-center border border-[#E2E8F0] dark:border-[#2C3142] p-0.5 bg-white dark:bg-[#090A0E]">
              <button
                type="button"
                onClick={() => setCurrency('BDT')}
                className={`px-2 py-0.5 font-mono-tech text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                  currency === 'BDT' ? 'bg-[#CCFF00] text-[#090A0E]' : 'text-[#64748B] dark:text-[#8E95A5]'
                }`}
              >
                BDT ৳
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 font-mono-tech text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                  currency === 'USD' ? 'bg-[#CCFF00] text-[#090A0E]' : 'text-[#64748B] dark:text-[#8E95A5]'
                }`}
              >
                USD $
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#090A0E]/70 dark:text-white/70 hover:text-[#0047FF] dark:hover:text-[#CCFF00] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Delivery Zone Selector & Progress Bar */}
        <div className="px-5 py-3.5 bg-[#F4F4F6] dark:bg-[#13151D] border-b border-[#E2E8F0] dark:border-[#2C3142]">
          <div className="flex items-center justify-between mb-2 font-mono-tech text-[10px] uppercase">
            <span className="text-[#64748B] dark:text-[#8E95A5] flex items-center gap-1.5 font-semibold">
              <Truck className="w-3.5 h-3.5 text-[#0047FF]" />
              Shipping Destination
            </span>
            <span className="text-[#0047FF] dark:text-[#CCFF00] font-bold">EST. {activeZone.eta}</span>
          </div>

          {/* 3 Zone Buttons */}
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            <button
              type="button"
              onClick={() => setSelectedZone('chattogram')}
              className={`py-1.5 px-1 font-mono-tech text-[9.5px] font-bold uppercase border cursor-pointer transition-all ${
                selectedZone === 'chattogram'
                  ? 'bg-[#0047FF] text-white border-[#0047FF] shadow-[2px_2px_0px_0px_#CCFF00]'
                  : 'bg-white dark:bg-[#090A0E] text-[#64748B] dark:text-[#8E95A5] border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF]'
              }`}
            >
              Chattogram
            </button>
            <button
              type="button"
              onClick={() => setSelectedZone('nationwide')}
              className={`py-1.5 px-1 font-mono-tech text-[9.5px] font-bold uppercase border cursor-pointer transition-all ${
                selectedZone === 'nationwide'
                  ? 'bg-[#0047FF] text-white border-[#0047FF] shadow-[2px_2px_0px_0px_#CCFF00]'
                  : 'bg-white dark:bg-[#090A0E] text-[#64748B] dark:text-[#8E95A5] border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF]'
              }`}
            >
              64 Districts
            </button>
            <button
              type="button"
              onClick={() => setSelectedZone('global')}
              className={`py-1.5 px-1 font-mono-tech text-[9.5px] font-bold uppercase border cursor-pointer transition-all ${
                selectedZone === 'global'
                  ? 'bg-[#0047FF] text-white border-[#0047FF] shadow-[2px_2px_0px_0px_#CCFF00]'
                  : 'bg-white dark:bg-[#090A0E] text-[#64748B] dark:text-[#8E95A5] border-[#E2E8F0] dark:border-[#2C3142] hover:border-[#0047FF]'
              }`}
            >
              Global DHL
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between font-mono-tech text-[10.5px] mb-1.5">
            {isFreeDelivery ? (
              <span className="text-[#0047FF] dark:text-[#CCFF00] font-bold uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-[#0047FF] dark:fill-[#CCFF00]" />
                COMPLIMENTARY DISPATCH UNLOCKED
              </span>
            ) : (
              <span className="text-[#64748B] dark:text-[#8E95A5]">
                ADD{' '}
                <strong className="text-[#090A0E] dark:text-white">
                  {currency === 'BDT' ? `৳${remaining.toLocaleString()}` : `$${remaining}`}
                </strong>{' '}
                FOR FREE SHIPPING
              </span>
            )}
            <span className="font-bold text-[#0047FF] dark:text-[#CCFF00]">{progressPercent}%</span>
          </div>

          <div className="w-full h-2 bg-[#ECEEF2] dark:bg-[#090A0E] border border-[#E2E8F0] dark:border-[#2C3142] overflow-hidden">
            <div
              className="h-full bg-[#0047FF] dark:bg-[#CCFF00] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Order Confirmed State */}
        {orderConfirmed ? (
          <div className="p-8 flex flex-col items-center text-center my-auto">
            <div className="w-16 h-16 bg-[#CCFF00] text-[#090A0E] flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_#0047FF]">
              <ShieldCheck className="w-9 h-9 stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#0047FF] dark:text-[#CCFF00] font-bold mb-1">
              ORDER CONFIRMED
            </span>
            <h3 className="font-syne font-extrabold text-[26px] text-[#090A0E] dark:text-white uppercase mb-2">
              LOCKED & DISPATCHING
            </h3>
            <p className="text-[13px] font-dm text-[#64748B] dark:text-[#8E95A5] max-w-xs mb-4 leading-relaxed">
              Order verified at District Chattogram Depot. Your gear is being sealed in industrial anti-static packaging.
            </p>

            <div className="w-full p-3.5 bg-[#ECEEF2] dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] text-[11px] font-mono-tech text-[#090A0E] dark:text-white text-left space-y-1.5 mb-6">
              <div className="flex justify-between">
                <span className="text-[#64748B] dark:text-[#8E95A5]">TRACKING ID:</span>
                <strong className="text-[#0047FF] dark:text-[#CCFF00]">
                  {orderTrackingId || '#D-CTG-842910'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B] dark:text-[#8E95A5]">PAYMENT:</span>
                <span className="uppercase">{paymentMethod} VERIFIED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B] dark:text-[#8E95A5]">EST. DELIVERY:</span>
                <span className="text-[#0047FF] font-bold">{activeZone.eta}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDone}
              className="w-full py-4 bg-[#CCFF00] text-[#090A0E] font-syne font-extrabold text-[13px] uppercase tracking-wider hover:bg-[#0047FF] hover:text-white dark:hover:bg-white dark:hover:text-[#090A0E] active:scale-95 transition-all cursor-pointer shadow-[3px_3px_0px_0px_#0047FF]"
            >
              RETURN TO DISTRICT
            </button>
          </div>
        ) : (
          /* Item List Scroll Area */
          <div className="overflow-y-auto flex-1 p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <Package className="w-12 h-12 text-[#64748B] dark:text-[#8E95A5] mb-3 opacity-40" />
                <p className="font-syne text-[20px] font-bold text-[#090A0E] dark:text-white uppercase mb-1">
                  NO GEAR IN BAG
                </p>
                <p className="text-[13px] font-dm text-[#64748B] dark:text-[#8E95A5] max-w-xs mb-6">
                  Check the latest drops in Men, Women, Kids, or Tactical Gear to add pieces before sizes sell out.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-[#0047FF] text-white font-mono-tech text-[11px] font-bold uppercase tracking-wider hover:bg-[#2A66FF] cursor-pointer shadow-[2px_2px_0px_0px_#CCFF00]"
                >
                  EXPLORE DROPS
                </button>
              </div>
            ) : (
              <>
                {/* Products */}
                <div className="flex flex-col divide-y divide-[#E2E8F0] dark:divide-[#2C3142]">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 flex gap-3.5 first:pt-0">
                      {/* Thumbnail */}
                      <div className="w-20 h-24 bg-[#ECEEF2] dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] flex-shrink-0 overflow-hidden relative">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1 left-1 bg-black/80 text-[#CCFF00] font-mono-tech text-[8px] px-1 font-bold">
                          {typeof item.product.gsm === 'number' ? `${item.product.gsm}GSM` : item.product.gsm}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-space font-bold text-[14px] text-[#090A0E] dark:text-white leading-snug">
                              {item.product.title}
                            </h4>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              className="text-[#64748B] dark:text-[#8E95A5] hover:text-[#FF2A4B] p-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="font-mono-tech text-[10px] text-[#0047FF] dark:text-[#CCFF00] block mt-1">
                            SIZE: {item.selectedSize} // {item.selectedColor}
                          </span>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-[#E2E8F0] dark:border-[#2C3142] bg-white dark:bg-[#13151D]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-[#090A0E] dark:text-white hover:bg-[#ECEEF2] dark:hover:bg-[#1B1E2B] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-mono-tech text-[12px] font-bold text-[#090A0E] dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#090A0E] dark:text-white hover:bg-[#ECEEF2] dark:hover:bg-[#1B1E2B] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono-tech font-bold text-[14px] text-[#090A0E] dark:text-white">
                            {currency === 'BDT'
                              ? `৳${(item.product.priceBDT * item.quantity).toLocaleString()}`
                              : `$${item.product.priceUSD * item.quantity}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Silver Mylar HypePack Gift Packaging Option (+৳120 / $1.50) */}
                <div className="p-3.5 bg-[#ECEEF2] dark:bg-[#13151D] border border-[#E2E8F0] dark:border-[#2C3142] flex flex-col gap-2.5">
                  <div className="flex items-start justify-between">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeMylarPack}
                        onChange={(e) => setIncludeMylarPack(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#0047FF] dark:accent-[#CCFF00] rounded-none cursor-pointer"
                      />
                      <div>
                        <span className="font-space font-bold text-[12px] text-[#090A0E] dark:text-white flex items-center gap-1.5 uppercase">
                          <Package className="w-3.5 h-3.5 text-[#0047FF] dark:text-[#CCFF00]" />
                          Silver Mylar HypePack (+৳120 / $1.50)
                        </span>
                        <p className="font-dm text-[11px] text-[#64748B] dark:text-[#8E95A5] mt-0.5 leading-snug">
                          Vacuum-sealed metallic silver mylar foil with industrial hazard tags and spray-stencil gift card.
                        </p>
                      </div>
                    </label>
                    <span className="font-mono-tech text-[11px] font-bold text-[#0047FF] dark:text-[#CCFF00]">
                      {currency === 'BDT' ? '+৳120' : '+$1.50'}
                    </span>
                  </div>

                  {includeMylarPack && (
                    <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2C3142]">
                      <input
                        type="text"
                        value={stencilNote}
                        onChange={(e) => setStencilNote(e.target.value)}
                        placeholder="Spray-stencil note (e.g., 'TO SAKIB: RUN CHATTOGRAM STREETS')..."
                        className="w-full p-2 text-[11px] font-mono-tech bg-white dark:bg-[#090A0E] border border-[#E2E8F0] dark:border-[#2C3142] text-[#090A0E] dark:text-white placeholder-[#64748B] dark:placeholder-[#8E95A5] focus:outline-none focus:border-[#0047FF] dark:focus:border-[#CCFF00]"
                      />
                    </div>
                  )}
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-1.5">
                  <span className="font-mono-tech text-[10px] uppercase font-bold text-[#64748B] dark:text-[#8E95A5] block">
                    Instant Express Checkout Option:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bkash')}
                      className={`p-2 flex flex-col items-center justify-center gap-1 border cursor-pointer font-mono-tech text-[10px] font-bold transition-all ${
                        paymentMethod === 'bkash'
                          ? 'border-[#E2136E] bg-[#E2136E]/15 text-[#090A0E] dark:text-white'
                          : 'border-[#E2E8F0] dark:border-[#2C3142] bg-white dark:bg-[#13151D] text-[#64748B] dark:text-[#8E95A5] hover:border-[#E2136E]'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-[#E2136E]" />
                      <span>bKash FastPay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2 flex flex-col items-center justify-center gap-1 border cursor-pointer font-mono-tech text-[10px] font-bold transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#0047FF] dark:border-[#CCFF00] bg-[#0047FF]/10 dark:bg-[#CCFF00]/15 text-[#090A0E] dark:text-white'
                          : 'border-[#E2E8F0] dark:border-[#2C3142] bg-white dark:bg-[#13151D] text-[#64748B] dark:text-[#8E95A5] hover:border-[#0047FF]'
                      }`}
                    >
                      <Banknote className="w-4 h-4 text-[#0047FF] dark:text-[#CCFF00]" />
                      <span>Cash on Delivery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2 flex flex-col items-center justify-center gap-1 border cursor-pointer font-mono-tech text-[10px] font-bold transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#0047FF] bg-[#0047FF]/15 text-[#090A0E] dark:text-white'
                          : 'border-[#E2E8F0] dark:border-[#2C3142] bg-white dark:bg-[#13151D] text-[#64748B] dark:text-[#8E95A5] hover:border-[#0047FF]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-[#0047FF]" />
                      <span>Global Cards</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Sticky Checkout Footer */}
        {cartItems.length > 0 && !orderConfirmed && (
          <div className="p-5 bg-[#ECEEF2] dark:bg-[#13151D] border-t border-[#E2E8F0] dark:border-[#2C3142] flex flex-col gap-3">
            <div className="space-y-1 font-mono-tech text-[11px]">
              <div className="flex justify-between text-[#64748B] dark:text-[#8E95A5]">
                <span>GEAR SUBTOTAL:</span>
                <span className="text-[#090A0E] dark:text-white">
                  {currency === 'BDT' ? `৳${subtotalBDT.toLocaleString()}` : `$${subtotalUSD}`}
                </span>
              </div>

              {includeMylarPack && (
                <div className="flex justify-between text-[#64748B] dark:text-[#8E95A5]">
                  <span>MYLAR HYPEPACK:</span>
                  <span className="text-[#090A0E] dark:text-white">
                    {currency === 'BDT' ? `৳${mylarPriceBDT}` : `$${mylarPriceUSD}`}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[#64748B] dark:text-[#8E95A5]">
                <span>COURIER DISPATCH ({selectedZone.toUpperCase()}):</span>
                <span className={isFreeDelivery ? 'text-[#0047FF] dark:text-[#CCFF00] font-bold' : 'text-[#090A0E] dark:text-white'}>
                  {isFreeDelivery
                    ? 'FREE'
                    : currency === 'BDT'
                    ? `৳${shippingCostBDT}`
                    : `$${shippingCostUSD}`}
                </span>
              </div>

              <div className="flex justify-between text-[#090A0E] dark:text-white font-bold pt-2 border-t border-[#E2E8F0] dark:border-[#2C3142] text-[14px]">
                <span className="font-syne uppercase">TOTAL DUE:</span>
                <span className="font-mono-tech text-[#0047FF] dark:text-[#CCFF00] text-[16px]">
                  {currency === 'BDT' ? `৳${totalBDT.toLocaleString()}` : `$${totalUSD}`}
                </span>
              </div>
            </div>

            {/* CHECKOUT CTA */}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 bg-[#CCFF00] text-[#090A0E] font-syne font-extrabold text-[13px] uppercase tracking-wider hover:bg-[#0047FF] hover:text-white dark:hover:bg-white dark:hover:text-[#090A0E] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_#0047FF] disabled:opacity-70"
            >
              {isCheckingOut ? (
                <span>SECURING DROPS VIA {paymentMethod.toUpperCase()}...</span>
              ) : (
                <>
                  <span>PROCEED TO CHECKOUT VIA {paymentMethod.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
