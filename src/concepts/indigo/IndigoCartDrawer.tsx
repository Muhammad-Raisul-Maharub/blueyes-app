import React, { useState } from 'react'
import type { IndigoCartItem, DeliveryZone, Language } from './types'
import { getTranslation } from './translations'
import {
  X,
  Plus,
  Minus,
  Trash2,
  Package,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'
import confetti from 'canvas-confetti'

interface IndigoCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems: IndigoCartItem[]
  onUpdateQuantity: (id: string, delta: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
  language: Language
}

export const IndigoCartDrawer: React.FC<IndigoCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  language,
}) => {
  const t = getTranslation(language)
  const [includeJuteBox, setIncludeJuteBox] = useState(true)
  const [greetingCardNote, setGreetingCardNote] = useState('')
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>('chattogram')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'cards'>('bkash')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [trackingId, setTrackingId] = useState('')

  if (!isOpen) return null

  // Delivery Thresholds
  const deliveryZones = {
    chattogram: {
      name: language === 'en' ? 'Chattogram Metro' : 'চট্টগ্রাম মেট্রো',
      fee: 80,
      freeThreshold: 3000,
      eta: language === 'en' ? 'Same-Day / 24 Hours' : 'একই দিন / ২৪ ঘণ্টা',
    },
    nationwide: {
      name: language === 'en' ? 'All 64 Districts' : 'সারাদেশের ৬৪ জেলা',
      fee: 140,
      freeThreshold: 5000,
      eta: language === 'en' ? '48–72 Hours Express' : '৪৮–৭২ ঘণ্টা এক্সপ্রেস',
    },
    global: {
      name: language === 'en' ? 'Global DHL Express' : 'আন্তর্জাতিক ডিএইচএল',
      fee: 2800,
      freeThreshold: 25000,
      eta: language === 'en' ? '3–5 Business Days' : '৩–৫ কার্যদিবস',
    },
  }

  const activeZone = deliveryZones[selectedZone]

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.priceBDT * item.quantity,
    0
  )

  const juteBoxFee = includeJuteBox ? 180 : 0
  const isFreeDelivery = subtotal >= activeZone.freeThreshold
  const shippingFee = isFreeDelivery ? 0 : activeZone.fee
  const totalDue = subtotal + juteBoxFee + shippingFee

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / activeZone.freeThreshold) * 100)
  )
  const remainingForFree = Math.max(0, activeZone.freeThreshold - subtotal)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#0A4269', '#B85324', '#F9F6F0', '#3882B5'],
    })

    setTimeout(() => {
      setIsCheckingOut(false)
      setTrackingId(`#IND-CTG-${Math.floor(100000 + Math.random() * 900000)}`)
      setOrderConfirmed(true)
    }, 1200)
  }

  const handleFinish = () => {
    setOrderConfirmed(false)
    onClearCart()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative z-10 w-full max-w-md h-full bg-[#FFFFFF] dark:bg-[#1B1917] text-[#26201C] dark:text-[#F5EFE8] border-l border-[#E5DDD0] dark:border-[#36312B] flex flex-col shadow-2xl animate-slideInRight transition-colors duration-200">
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-[#F9F6F0] dark:bg-[#121110] border-b border-[#E5DDD0] dark:border-[#36312B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-cinzel font-bold text-[17px] text-[#0A4269] dark:text-[#3882B5]">
              {t.cart.bagTitle}
            </h2>
            <span className="px-2 py-0.5 bg-[#B85324] text-white text-[10px] font-jakarta font-bold rounded-full">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-[#756A63] dark:text-[#A3968C] hover:text-[#0A4269] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#FFFFFF] dark:bg-[#1B1917] border-b border-[#E5DDD0] dark:border-[#36312B] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-jakarta">
            <span className="text-[#756A63] dark:text-[#A3968C]">
              {isFreeDelivery ? (
                <span className="text-[#0A4269] dark:text-[#3882B5] font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B85324]" />
                  {t.cart.freeShippingProgress}
                </span>
              ) : (
                <span>
                  ৳{remainingForFree.toLocaleString()} {t.cart.awayFromFree}
                </span>
              )}
            </span>
            <span className="font-bold text-[#0A4269] dark:text-[#3882B5]">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#F3ECE2] dark:bg-[#25221F] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0A4269] dark:bg-[#3882B5] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Delivery Zone Selector Tabs */}
        <div className="px-5 py-2.5 bg-[#F9F6F0] dark:bg-[#121110] border-b border-[#E5DDD0] dark:border-[#36312B] grid grid-cols-3 gap-1.5">
          {(['chattogram', 'nationwide', 'global'] as DeliveryZone[]).map((zone) => (
            <button
              key={zone}
              type="button"
              onClick={() => setSelectedZone(zone)}
              className={`py-1 px-2 rounded-lg text-[10px] font-jakarta font-semibold transition-all text-center cursor-pointer ${
                selectedZone === zone
                  ? 'bg-[#0A4269] dark:bg-[#3882B5] text-white shadow-xs'
                  : 'bg-transparent text-[#756A63] dark:text-[#A3968C] hover:bg-[#F3ECE2] dark:hover:bg-[#25221F]'
              }`}
            >
              {deliveryZones[zone].name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-none">
          {orderConfirmed ? (
            /* Order Confirmed State */
            <div className="py-8 flex flex-col items-center text-center my-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F3ECE2] dark:bg-[#25221F] text-[#0A4269] dark:text-[#3882B5] flex items-center justify-center shadow-xs">
                <CheckCircle className="w-8 h-8 text-[#B85324]" />
              </div>
              <div>
                <span className="text-[10px] font-jakarta uppercase tracking-[0.25em] text-[#B85324] font-bold">
                  {t.cart.orderConfirmed}
                </span>
                <h3 className="font-cinzel font-bold text-[22px] text-[#26201C] dark:text-[#F5EFE8] mt-1">
                  {language === 'en' ? 'Handloom Garment Reserved' : 'তাঁতের পোশাক সংরক্ষিত হয়েছে'}
                </h3>
                <p className="font-jakarta text-[13px] text-[#756A63] dark:text-[#A3968C] mt-2 leading-relaxed max-w-xs mx-auto">
                  {t.cart.orderConfirmedSubtitle}
                </p>
              </div>

              <div className="w-full p-4 bg-[#F9F6F0] dark:bg-[#121110] border border-[#E5DDD0] dark:border-[#36312B] rounded-xl text-[12px] font-jakarta space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-[#756A63] dark:text-[#A3968C]">{t.cart.trackingId}:</span>
                  <strong className="text-[#0A4269] dark:text-[#3882B5]">{trackingId}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#756A63] dark:text-[#A3968C]">{language === 'en' ? 'Estimated Arrival:' : 'সম্ভাব্য আগমন:'}</span>
                  <span className="font-semibold text-[#B85324]">{activeZone.eta}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-3.5 bg-[#0A4269] dark:bg-[#3882B5] text-white rounded-xl font-jakarta text-[13px] font-semibold cursor-pointer shadow-sm"
              >
                {t.actions.keepShopping}
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty State */
            <div className="py-16 flex flex-col items-center text-center space-y-3">
              <Package className="w-12 h-12 text-[#756A63] opacity-50" />
              <p className="font-cinzel text-[16px] text-[#26201C] dark:text-[#F5EFE8] font-bold">
                {t.cart.bagTitle} {language === 'en' ? 'is currently empty' : 'খালি রয়েছে'}
              </p>
              <p className="font-jakarta text-[12px] text-[#756A63] dark:text-[#A3968C] max-w-xs">
                {language === 'en'
                  ? 'Explore our Tangail Jamdani and Rajshahi Silk collections to add items.'
                  : 'আমাদের টাঙ্গাইল জামদানি ও রাজশাহী সিল্কের সম্ভার থেকে পোশাক নির্বাচন করুন।'}
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#F9F6F0] dark:bg-[#121110] border border-[#E5DDD0] dark:border-[#36312B] rounded-xl flex gap-3"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-cinzel font-bold text-[13px] text-[#26201C] dark:text-[#F5EFE8] line-clamp-1">
                            {language === 'en' ? item.product.title : item.product.titleBn}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            aria-label="Remove item"
                            className="text-[#756A63] hover:text-[#B85324] cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="font-jakarta text-[10px] text-[#756A63] dark:text-[#A3968C]">
                          {item.selectedSize} • {item.selectedColor}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="font-jakarta font-bold text-[13px] text-[#0A4269] dark:text-[#3882B5]">
                          ৳{(item.product.priceBDT * item.quantity).toLocaleString()}
                        </span>

                        <div className="flex items-center border border-[#E5DDD0] dark:border-[#36312B] rounded-lg bg-white dark:bg-[#1B1917]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-[#756A63] hover:text-[#0A4269] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-jakarta text-[11px] font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-[#756A63] hover:text-[#0A4269] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Jute Gift Box Module (+৳180 / $2.20) */}
              <div className="p-4 bg-[#F3ECE2] dark:bg-[#25221F] border border-[#E5DDD0] dark:border-[#36312B] rounded-2xl space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="juteBox"
                    checked={includeJuteBox}
                    onChange={(e) => setIncludeJuteBox(e.target.checked)}
                    className="mt-0.5 rounded accent-[#0A4269] cursor-pointer"
                  />
                  <label htmlFor="juteBox" className="flex-1 cursor-pointer">
                    <span className="font-cinzel font-bold text-[12px] text-[#26201C] dark:text-[#F5EFE8] block">
                      {t.cart.juteBoxTitle}
                    </span>
                    <span className="font-jakarta text-[11px] text-[#756A63] dark:text-[#A3968C] block mt-0.5">
                      {t.cart.juteBoxDesc}
                    </span>
                  </label>
                </div>

                {includeJuteBox && (
                  <div className="pt-2 border-t border-[#E5DDD0] dark:border-[#36312B]">
                    <textarea
                      value={greetingCardNote}
                      onChange={(e) => setGreetingCardNote(e.target.value)}
                      placeholder={t.cart.greetingCardPlaceholder}
                      rows={2}
                      className="w-full p-2.5 bg-white dark:bg-[#1B1917] border border-[#E5DDD0] dark:border-[#36312B] rounded-xl text-[11px] font-jakarta text-[#26201C] dark:text-[#F5EFE8] focus:outline-none focus:border-[#0A4269] resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Payment Method Selectors */}
              <div className="space-y-2">
                <span className="text-[11px] font-jakarta font-bold uppercase tracking-wider text-[#0A4269] dark:text-[#3882B5] block">
                  {t.cart.paymentMethod}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`py-2 px-2 rounded-xl text-[11px] font-jakarta font-semibold border text-center cursor-pointer transition-all ${
                      paymentMethod === 'bkash'
                        ? 'bg-[#E2136E] text-white border-[#E2136E] shadow-xs'
                        : 'bg-[#F9F6F0] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8] border-[#E5DDD0] dark:border-[#36312B]'
                    }`}
                  >
                    {t.cart.bkash}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-2 rounded-xl text-[11px] font-jakarta font-semibold border text-center cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-[#0A4269] text-white border-[#0A4269] shadow-xs'
                        : 'bg-[#F9F6F0] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8] border-[#E5DDD0] dark:border-[#36312B]'
                    }`}
                  >
                    {t.cart.cod}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cards')}
                    className={`py-2 px-2 rounded-xl text-[11px] font-jakarta font-semibold border text-center cursor-pointer transition-all ${
                      paymentMethod === 'cards'
                        ? 'bg-[#0A4269] text-white border-[#0A4269] shadow-xs'
                        : 'bg-[#F9F6F0] dark:bg-[#121110] text-[#26201C] dark:text-[#F5EFE8] border-[#E5DDD0] dark:border-[#36312B]'
                    }`}
                  >
                    {t.cart.cards}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {!orderConfirmed && cartItems.length > 0 && (
          <div className="p-5 bg-[#F9F6F0] dark:bg-[#121110] border-t border-[#E5DDD0] dark:border-[#36312B] space-y-3">
            <div className="space-y-1.5 text-[12px] font-jakarta">
              <div className="flex justify-between text-[#756A63] dark:text-[#A3968C]">
                <span>{t.cart.subtotal}</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              {includeJuteBox && (
                <div className="flex justify-between text-[#756A63] dark:text-[#A3968C]">
                  <span>{t.cart.jutePack}</span>
                  <span>৳180</span>
                </div>
              )}
              <div className="flex justify-between text-[#756A63] dark:text-[#A3968C]">
                <span>{t.cart.courierFee} ({activeZone.name})</span>
                <span>{isFreeDelivery ? t.cart.complimentary : `৳${shippingFee}`}</span>
              </div>
              <div className="pt-2 border-t border-[#E5DDD0] dark:border-[#36312B] flex justify-between font-bold text-[15px] text-[#26201C] dark:text-[#F5EFE8]">
                <span>{t.cart.totalDue}</span>
                <span className="text-[#0A4269] dark:text-[#3882B5]">৳{totalDue.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              disabled={isCheckingOut}
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#0A4269] dark:bg-[#3882B5] text-white rounded-xl font-jakarta text-[13px] font-semibold tracking-wide hover:bg-[#083554] dark:hover:bg-[#2E709F] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
            >
              {isCheckingOut ? (
                <span>{language === 'en' ? 'Confirming Dispatch...' : 'অর্ডার প্রক্রিয়াধীন...'}</span>
              ) : (
                <>
                  <span>
                    {t.actions.proceedToCheckout} • ৳{totalDue.toLocaleString()}
                  </span>
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
