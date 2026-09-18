import React from 'react'
import { X, ArrowRight, MapPin, Phone, Crown, Anchor } from 'lucide-react'
import type { AtelierView } from './types'

interface AtelierMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (view: AtelierView) => void
}

export const AtelierMenuDrawer: React.FC<AtelierMenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null

  const mainLinks: { label: string; view: AtelierView; icon?: React.FC<{ className?: string }> }[] = [
    { label: 'Maison Home', view: 'home' },
    { label: 'Runway Lookbook', view: 'lookbook' },
    { label: 'Curated Archive & Filters', view: 'curate' },
    { label: 'Maison Chattogram Story', view: 'about', icon: Anchor },
    { label: 'Obsidian VIP Club', view: 'vip', icon: Crown },
  ]

  const departmentLinks: { label: string; view: AtelierView }[] = [
    { label: "Women's Haute Salon", view: 'women' },
    { label: "Men's Imperial Sartorial", view: 'men' },
    { label: 'Kids Festive & Formal (2–15Y)', view: 'kids' },
    { label: 'Baby Heirloom Layette (0–2Y)', view: 'baby' },
    { label: 'Accessories & 24K Gold Objects', view: 'accessories' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Click backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Menu sheet from Left */}
      <div className="w-[85%] max-w-[360px] h-full bg-[var(--color-canvas)] text-[var(--color-text-primary)] border-r border-[var(--color-border)] flex flex-col justify-between p-6 shadow-2xl animate-slideInLeft transition-colors overflow-y-auto">
        {/* Top brand & close */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
            <div className="flex flex-col">
              <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-[var(--color-accent-bronze)] font-semibold">
                Maison Chattogram
              </span>
              <h3 className="font-serif text-[18px] uppercase tracking-[0.16em] text-[var(--color-text-primary)]">
                Blu Eyes Atelier
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Department Quick List */}
          <div className="mt-6">
            <span className="text-[10px] font-sans uppercase tracking-[0.22em] font-semibold text-[var(--color-accent-bronze)] block mb-3">
              Departments & Salons
            </span>
            <div className="flex flex-col gap-2">
              {departmentLinks.map((dept) => (
                <button
                  key={dept.label}
                  type="button"
                  onClick={() => {
                    onNavigate(dept.view)
                    onClose()
                  }}
                  className="text-left py-1 text-[13.5px] font-serif text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] flex items-center justify-between group cursor-pointer"
                >
                  <span>{dept.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-accent-blue)]" />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 pt-5 border-t border-[var(--color-border)] flex flex-col gap-3.5">
            <span className="text-[10px] font-sans uppercase tracking-[0.22em] font-semibold text-[var(--color-text-muted)] block mb-1">
              Atelier Discovery
            </span>
            {mainLinks.map((link) => {
              const Icon = link.icon
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    onNavigate(link.view)
                    onClose()
                  }}
                  className="text-left font-sans text-[13px] text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4 text-[var(--color-accent-bronze)]" />}
                    <span>{link.label}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )
            })}
          </nav>
        </div>

        {/* Bottom Concierge Contacts */}
        <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex flex-col gap-2.5 text-[11px] font-sans text-[var(--color-text-secondary)]">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-accent-bronze)] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[var(--color-text-primary)] block">Chattogram Flagship Salon:</span>
              <span>GEC Circle, Nasirabad, Chattogram</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-accent-blue)] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[var(--color-text-primary)] block">Dhaka Liaison Suite:</span>
              <span>Diplomatic Enclave, Gulshan 2</span>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Phone className="w-3.5 h-3.5 text-[var(--color-accent-blue)]" />
            <span>Salon Concierge: +880 1711 000999</span>
          </div>
          <span className="text-[9px] text-[var(--color-text-muted)] mt-1">
            © 2025 Blu Eyes Atelier • Maison Chattogram.
          </span>
        </div>
      </div>
    </div>
  )
}
