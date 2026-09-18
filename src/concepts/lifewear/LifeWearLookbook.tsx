import React from 'react'
import { ArrowRight } from 'lucide-react'
import type { Currency, LifeWearCategory, LifeWearProduct, LifeWearView } from './types'
import { LIFEWEAR_PRODUCTS } from './lifewearData'

interface LifeWearLookbookProps {
  currency: Currency
  onNavigate: (view: LifeWearView, category?: LifeWearCategory) => void
  onSelectProduct: (product: LifeWearProduct) => void
}

export const LifeWearLookbook: React.FC<LifeWearLookbookProps> = ({
  currency,
  onNavigate,
  onSelectProduct,
}) => {
  const editorialSeries = [
    {
      id: 'ed-01',
      title: 'Monsoon Transit // Heavy Supima Layers',
      location: 'Chattogram Marine Port Terminal',
      description:
        'Engineered for sudden coastal downpours and fluctuating humidity. Heavy 240 GSM Supima absorbs and breathes, paired with waterproof ripstop shells.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      featuredProductId: 'lw-m-01',
    },
    {
      id: 'ed-02',
      title: 'Architectural Flax // Coastal Breeze Trousers',
      location: 'Karnaphuli River Estuary',
      description:
        'Linen woven with long-staple cotton produces an effortless structural drape that softens with age without sagging or losing its crease.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      featuredProductId: 'lw-w-02',
    },
    {
      id: 'ed-03',
      title: 'Tactical Commute // 500D Cordura & Rubber',
      location: 'Agrabad Commercial Area',
      description:
        'Built for 10,000+ daily steps in urban transit. Heavy duck canvas vulcanized trainers paired with stormproof ballistic nylon backpacks.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
      featuredProductId: 'lw-a-01',
    },
  ]

  const formatPrice = (bdt: number, usd: number) => {
    return currency === 'USD' ? `$${usd}` : `৳${bdt.toLocaleString()}`
  }

  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      {/* Header Banner */}
      <section className="w-full border-b border-[var(--color-border)] bg-[var(--color-surface)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-left space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-text-secondary)]">
            <span>EDITORIAL SPEC</span>
            <span>/</span>
            <span className="text-[#004CE8] dark:text-[#387BFF] font-semibold">SS26 VOLUME 04</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Lookbook: Form Follows Utility.
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-mono leading-relaxed">
            A visual study of technical staples tested in the coastal environment of Chattogram, Bangladesh.
          </p>
        </div>
      </section>

      {/* Editorial Blocks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {editorialSeries.map((item, idx) => {
          const product = LIFEWEAR_PRODUCTS.find((p) => p.id === item.featuredProductId)

          return (
            <div
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden"
            >
              {/* Visual Side */}
              <div className="lg:col-span-7 relative aspect-[4/3] bg-black/10 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter contrast-[105%]"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 text-white font-mono text-[10px] tracking-wider uppercase">
                  PLATE 0{idx + 1} // {item.location}
                </div>
              </div>

              {/* Editorial Text Side */}
              <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 text-left">
                <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider block">
                  TECHNICAL DOCUMENTARY
                </span>

                <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                  {item.title}
                </h2>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {item.description}
                </p>

                {product && (
                  <div className="pt-4 border-t border-[var(--color-border)] space-y-3">
                    <div className="p-3 bg-[var(--color-canvas)] border border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="font-semibold block text-[var(--color-text-primary)]">
                          {product.name}
                        </span>
                        <span className="text-[10px] text-[var(--color-text-secondary)]">
                          {product.gsm} GSM • {formatPrice(product.priceBDT, product.priceUSD)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => onNavigate(product.category as LifeWearView, product.category)}
                          className="px-2.5 py-1.5 border border-[var(--color-border)] text-[var(--color-text-primary)] text-[10px] font-semibold uppercase hover:bg-[var(--color-surface)] cursor-pointer"
                        >
                          DEPT
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="px-3 py-1.5 bg-[#004CE8] text-white text-[11px] font-semibold uppercase flex items-center space-x-1 cursor-pointer hover:bg-[#0039B4]"
                        >
                          <span>VIEW</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
