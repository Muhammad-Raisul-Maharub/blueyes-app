import React, { useState } from 'react'
import { MapPin, CheckCircle, ShieldCheck, Compass, Anchor, ArrowLeft } from 'lucide-react'
import confetti from 'canvas-confetti'
import type { BookingDetails } from './types'

interface AtelierAboutProps {
  onExploreCollection: (category?: string) => void
  onBack?: () => void
}

export const AtelierAbout: React.FC<AtelierAboutProps> = ({ onExploreCollection, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSalon, setSelectedSalon] = useState<BookingDetails['salon']>(
    'Chattogram Flagship Salon • GEC Circle'
  )
  const [selectedService, setSelectedService] = useState<BookingDetails['service']>(
    'Bespoke 28-Point Fitting & Tailoring'
  )
  const [selectedDate, setSelectedDate] = useState('2026-09-22')
  const [selectedTime, setSelectedTime] = useState('04:30 PM (Sunset Fitting)')
  const [guestName, setGuestName] = useState('Nazia Chowdhury')
  const [phone, setPhone] = useState('+880 1711 987654')
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingConfirmed(true)
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#103FEF', '#8C7355', '#C4A47C', '#FDDDB9'],
    })
  }

  const resetModal = () => {
    setBookingConfirmed(false)
    setIsModalOpen(false)
  }

  return (
    <div className="w-full flex flex-col pb-28 animate-fadeIn text-[var(--color-text-primary)]">
      {onBack && (
        <div className="w-full bg-[#0B0C0E] border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-[1400px] mx-auto flex items-center">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.2em] text-[#FDDDB9] hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Previous Screen</span>
            </button>
          </div>
        </div>
      )}

      {/* 1. Hero: Maritime Heritage Meets Haute Tailoring */}
      <section className="relative w-full bg-[#0B0C0E] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#C4A47C_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center relative z-10">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#8C7355]/20 border border-[#8C7355]/40 text-[#FDDDB9] text-[10px] font-sans uppercase tracking-[0.25em] font-semibold mb-6">
            <Anchor className="w-3.5 h-3.5" />
            <span>Port City Provenance • Est. Chattogram</span>
          </div>

          <h1 className="font-serif text-[34px] sm:text-[48px] lg:text-[58px] leading-[1.1] tracking-tight mb-6 max-w-4xl">
            Maison Chattogram: Maritime Heritage Meets Haute Tailoring
          </h1>

          <p className="text-[14px] sm:text-[16px] font-sans text-white/80 max-w-2xl leading-relaxed mb-8">
            Born along the historic maritime trade routes of the Karnaphuli River, Blu Eyes Atelier converges historic Bengal silk weaving with sharp architectural European pattern cutting.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-7 py-3.5 bg-white text-[#1C1B1B] text-[12px] font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-blue)] hover:text-white transition-colors cursor-pointer shadow-lg"
            >
              Book Bespoke Salon Fitting
            </button>
            <button
              type="button"
              onClick={() => onExploreCollection('Women')}
              className="px-7 py-3.5 bg-transparent border border-white/30 text-white text-[12px] font-sans uppercase tracking-[0.2em] font-semibold hover:bg-white/10 transition-colors cursor-pointer"
            >
              Explore Creations
            </button>
          </div>
        </div>
      </section>

      {/* 2. Brand Story & Bengal Loom Convergence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-b border-[var(--color-border)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[var(--color-accent-bronze)] font-semibold">
              The Atelier Genesis
            </span>
            <h2 className="font-serif text-[28px] sm:text-[38px] text-[var(--color-text-primary)] leading-tight">
              An Ode to the Bay of Bengal and Bengal Artisans
            </h2>
            <p className="text-[14px] font-sans text-[var(--color-text-secondary)] leading-relaxed">
              For centuries, the Port of Chattogram connected Bengal’s famed silk and muslin weavers to merchant houses in Alexandria, Venice, and London. Blu Eyes Atelier was founded to revive this unhurried sartorial prestige.
            </p>
            <p className="text-[14px] font-sans text-[var(--color-text-secondary)] leading-relaxed">
              Every garment in our collection is crafted inside our dedicated atelier suites in Nasirabad, Chattogram. Here, legacy master tailors work with pure 22-momme Rajshahi mulberry silks, 200-count Shitalakshya Jamdani muslins, and Biella Super 160s wools—ensuring every stitch honors the tactile majesty of physical craftsmanship.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-3">
              <div className="p-3.5 bg-[var(--color-card)] border border-[var(--color-border)]">
                <span className="font-serif text-[24px] font-medium text-[var(--color-accent-blue)]">
                  28
                </span>
                <span className="block text-[9px] font-sans uppercase tracking-widest text-[var(--color-text-muted)] mt-1">
                  Point Measurement Matrix
                </span>
              </div>
              <div className="p-3.5 bg-[var(--color-card)] border border-[var(--color-border)]">
                <span className="font-serif text-[24px] font-medium text-[var(--color-accent-bronze)]">
                  180h
                </span>
                <span className="block text-[9px] font-sans uppercase tracking-widest text-[var(--color-text-muted)] mt-1">
                  Hand-loom Jamdani Weave
                </span>
              </div>
              <div className="p-3.5 bg-[var(--color-card)] border border-[var(--color-border)]">
                <span className="font-serif text-[24px] font-medium text-[var(--color-text-primary)]">
                  64
                </span>
                <span className="block text-[9px] font-sans uppercase tracking-widest text-[var(--color-text-muted)] mt-1">
                  Districts Express Dispatch
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-3.5">
            <div className="aspect-[3/4] overflow-hidden bg-[var(--color-surface-container)] border border-[var(--color-border)] shadow-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5uuwct9DRGsuTvQOElQTQs0CtR9j1TiQYYQj-0iEFOJKQU_KBFsEEgZPJHjT9apf99AqR0u-88CZnSRzfa0GoGN9tElxdDUWlnq2yt9vOu-nNYxI6joyVMXVBYSykMTIKI7SiOp7ZDtVBNU0WrWTJ1YCaEtur_UOE8CVxLY4dR7vK3ixaIRhWHiqxzMjkU4OpfBobQALi3mXT2hUMm98dq_VA69LvFo0ciNWha_WH0C1Z0SaZhj4P"
                alt="Bengal Silk Weave"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden bg-[var(--color-surface-container)] border border-[var(--color-border)] shadow-sm mt-8">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAajgUsyVm0BDFqXbmsfTNwOIOHX_-XU_cVNbfml_P2xzL1wkJVh5VoOilmngj4kBGGJX6hzUSfBoNb3_bdSBsysR2c1ofleC9VwLz6W4-XpjGq3aY4-K549dKtwRh6evxXJCvcsQeOxWXtyfV4zPEz-JLH5hCpLiF3HLU0Vgg6gMjPZH0AsvaRYJ5CJIqkUKCF1VaWnnEBnzGTytw5oVmisBdXFBWPnU0wokCumKYCpJBNL0VqRqg4"
                alt="Maison Chattogram Tailoring"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Salon Flagships & Liaison Suites */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-b border-[var(--color-border)]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[var(--color-accent-bronze)] font-semibold">
            Bespoke Presences
          </span>
          <h2 className="font-serif text-[30px] sm:text-[38px] text-[var(--color-text-primary)] mt-1 mb-2">
            Maison Salons & Liaison Suites
          </h2>
          <p className="text-[13px] sm:text-[14px] font-sans text-[var(--color-text-secondary)]">
            Experience our physical ateliers for private fittings, custom fabric inspections, and VIP champagne consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chattogram Flagship */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 shadow-sm flex flex-col justify-between transition-all hover:border-[var(--color-accent-blue)]">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-accent-blue)] mb-3">
                <MapPin className="w-5 h-5" />
                <span className="text-[10px] font-sans uppercase tracking-widest font-bold">
                  Global Flagship Atelier
                </span>
              </div>
              <h3 className="font-serif text-[22px] text-[var(--color-text-primary)] mb-2">
                Chattogram Salon
              </h3>
              <p className="text-[12px] font-sans text-[var(--color-text-secondary)] leading-relaxed mb-4">
                GEC Circle, Nasirabad, Chattogram, Bangladesh.<br />
                Houses our primary master tailoring suites, silk archives, and bespoke cutting tables.
              </p>
            </div>
            <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-1.5 text-[11px] font-sans text-[var(--color-text-muted)]">
              <span>Hours: Sat – Thu, 10:30 AM – 8:30 PM</span>
              <span className="text-[var(--color-text-primary)] font-medium">Direct: +880 1711 000999</span>
            </div>
          </div>

          {/* Dhaka Liaison Suite */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 shadow-sm flex flex-col justify-between transition-all hover:border-[var(--color-accent-blue)]">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-accent-bronze)] mb-3">
                <Compass className="w-5 h-5" />
                <span className="text-[10px] font-sans uppercase tracking-widest font-bold">
                  Capital Liaison Suite
                </span>
              </div>
              <h3 className="font-serif text-[22px] text-[var(--color-text-primary)] mb-2">
                Dhaka Diplomatic Suite
              </h3>
              <p className="text-[12px] font-sans text-[var(--color-text-secondary)] leading-relaxed mb-4">
                Diplomatic Enclave, Gulshan 2, Dhaka, Bangladesh.<br />
                Dedicated private client fitting salons for ceremonial and wedding trousseau appointments.
              </p>
            </div>
            <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-1.5 text-[11px] font-sans text-[var(--color-text-muted)]">
              <span>Hours: By Appointment Only</span>
              <span className="text-[var(--color-text-primary)] font-medium">Liaison: +880 1711 000888</span>
            </div>
          </div>

          {/* Global Digital Concierge */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 shadow-sm flex flex-col justify-between transition-all hover:border-[var(--color-accent-blue)]">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-accent-blue)] mb-3">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] font-sans uppercase tracking-widest font-bold">
                  Worldwide White-Glove
                </span>
              </div>
              <h3 className="font-serif text-[22px] text-[var(--color-text-primary)] mb-2">
                International Concierge
              </h3>
              <p className="text-[12px] font-sans text-[var(--color-text-secondary)] leading-relaxed mb-4">
                London (Mayfair) & New York (Manhattan) Digital Concierge.<br />
                Virtual video measurement sessions with global DHL Express delivery in 3–5 days.
              </p>
            </div>
            <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-1.5 text-[11px] font-sans text-[var(--color-text-muted)]">
              <span>Availability: 24/7 VIP Client Desk</span>
              <span className="text-[var(--color-text-primary)] font-medium">concierge@blueyesatelier.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Consultation Booking CTA Banner */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <div className="p-8 sm:p-12 bg-[var(--color-card-subtle)] border border-[var(--color-border)] flex flex-col items-center">
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[var(--color-accent-bronze)] font-semibold mb-2">
            Personalised Tailoring
          </span>
          <h2 className="font-serif text-[28px] sm:text-[34px] text-[var(--color-text-primary)] mb-3">
            Commission Your Bespoke Piece
          </h2>
          <p className="text-[13px] sm:text-[14px] font-sans text-[var(--color-text-secondary)] max-w-lg mb-6 leading-relaxed">
            Reserve a dedicated session with our Master Cutters at GEC Circle, Chattogram or book a digital session worldwide.
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[12px] font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-blue)] transition-colors cursor-pointer shadow-md"
          >
            Book a Bespoke Fitting in Chattogram or Virtual
          </button>
        </div>
      </section>

      {/* 5. Consultation Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-[var(--color-card)] text-[var(--color-text-primary)] border border-[var(--color-border)] p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)] mb-5">
              <div>
                <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-[var(--color-accent-bronze)] font-semibold">
                  Maison Reservation
                </span>
                <h3 className="font-serif text-[20px] text-[var(--color-text-primary)]">
                  Bespoke Fitting Consultation
                </h3>
              </div>
              <button
                type="button"
                onClick={resetModal}
                className="text-[12px] font-sans uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="py-8 flex flex-col items-center text-center gap-3 animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-[var(--color-accent-blue)]" />
                <h4 className="font-serif text-[22px] text-[var(--color-text-primary)]">
                  Fitting Reserved at Maison Chattogram
                </h4>
                <p className="text-[13px] font-sans text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
                  Thank you, <strong>{guestName}</strong>. Our Master Cutter will receive you at <strong>{selectedSalon}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
                </p>
                <button
                  type="button"
                  onClick={resetModal}
                  className="mt-4 px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[11px] font-sans uppercase tracking-widest hover:bg-[var(--color-accent-blue)] cursor-pointer"
                >
                  Return to Maison
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] font-semibold block mb-1">
                    Salon Location
                  </label>
                  <select
                    value={selectedSalon}
                    onChange={(e) => setSelectedSalon(e.target.value as BookingDetails['salon'])}
                    className="w-full p-2.5 text-[12px] font-sans border border-[var(--color-border)] bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)]"
                  >
                    <option value="Chattogram Flagship Salon • GEC Circle">Chattogram Flagship Salon • GEC Circle</option>
                    <option value="Dhaka Liaison Suite • Gulshan 2">Dhaka Liaison Suite • Gulshan 2</option>
                    <option value="Virtual International Fitting (London / New York)">Virtual International Fitting (London / New York)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] font-semibold block mb-1">
                    Service
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value as BookingDetails['service'])}
                    className="w-full p-2.5 text-[12px] font-sans border border-[var(--color-border)] bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)]"
                  >
                    <option value="Bespoke 28-Point Fitting & Tailoring">Bespoke 28-Point Fitting & Tailoring</option>
                    <option value="Bridal & Formal Wedding Trousseau">Bridal & Formal Wedding Trousseau</option>
                    <option value="VIP Private Silk & Jamdani Archive">VIP Private Silk & Jamdani Archive</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] font-semibold block mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-2 text-[12px] font-sans border border-[var(--color-border)] bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] font-semibold block mb-1">
                      Time Slot
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-2 text-[12px] font-sans border border-[var(--color-border)] bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)]"
                    >
                      <option value="11:30 AM (Morning Session)">11:30 AM (Morning Session)</option>
                      <option value="02:30 PM (Afternoon Salon)">02:30 PM (Afternoon Salon)</option>
                      <option value="04:30 PM (Sunset Fitting)">04:30 PM (Sunset Fitting)</option>
                      <option value="07:00 PM (Candlelight View)">07:00 PM (Candlelight View)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] font-semibold block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      className="w-full p-2 text-[12px] font-sans border border-[var(--color-border)] bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] font-semibold block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full p-2 text-[12px] font-sans border border-[var(--color-border)] bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[var(--color-text-primary)] text-[var(--color-canvas)] text-[11px] font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[var(--color-accent-blue)] transition-colors cursor-pointer shadow-md mt-2"
                >
                  Confirm Salon Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
