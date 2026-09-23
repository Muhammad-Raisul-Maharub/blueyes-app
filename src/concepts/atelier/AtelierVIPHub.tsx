import React, { useState } from 'react'
import type { BookingDetails } from './types'
import { Crown, Calendar, Clock, MapPin, CheckCircle, ArrowLeft } from 'lucide-react'
import confetti from 'canvas-confetti'

interface AtelierVIPHubProps {
  onBack?: () => void
}

export const AtelierVIPHub: React.FC<AtelierVIPHubProps> = ({ onBack }) => {
  const [salon, setSalon] = useState<BookingDetails['salon']>('Chattogram Flagship Salon • GEC Circle')
  const [service, setService] = useState<BookingDetails['service']>('Bespoke 28-Point Fitting & Tailoring')
  const [selectedDate, setSelectedDate] = useState('2026-09-18')
  const [selectedTime, setSelectedTime] = useState('05:00 PM (Champagne Hour)')
  const [guestName, setGuestName] = useState('Nazia Chowdhury')
  const [phone, setPhone] = useState('+880 1711 987654')
  const [isBooked, setIsBooked] = useState(false)

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooked(true)
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#8C7355', '#FDDDB9', '#103FEF', '#4D76FF'],
    })
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-28 animate-fadeIn">
      {onBack && (
        <div className="mb-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-[0.18em] text-[var(--color-text-secondary)] hover:text-[var(--color-accent-blue)] px-2.5 py-1 rounded bg-[var(--color-card-subtle)] border border-[var(--color-border)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Previous Screen</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="pb-4 border-b border-[var(--color-border)] mb-8">
        <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-[var(--color-accent-bronze)] font-semibold">
          Private Client Salon
        </span>
        <h2 className="font-serif text-[28px] sm:text-[36px] text-[var(--color-text-primary)] mt-1">
          Obsidian VIP Club
        </h2>
        <p className="text-[13px] sm:text-[14px] font-sans text-[var(--color-text-secondary)] mt-1">
          Dedicated privileges, bespoke 28-point measurements, and private salon appointments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Black Card + Points Meter + Privileges (Col-span 6 on desktop) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* 1. Obsidian Tier Status Card (Black Card Aesthetic) */}
          <div className="w-full bg-[#121212] text-white p-6 sm:p-7 border border-[#8C7355]/60 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            {/* Subtle watermark monogram */}
            <div className="absolute -right-8 -bottom-8 w-36 h-36 border border-[#8C7355]/20 rounded-full flex items-center justify-center pointer-events-none">
              <Crown className="w-24 h-24 text-[#8C7355]/10" />
            </div>

            {/* Top row: Brand & Tier */}
            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="text-[8px] font-sans uppercase tracking-[0.3em] text-[#FDDDB9] block font-semibold">
                  BLU EYES ATELIER
                </span>
                <h3 className="font-serif text-[22px] tracking-wide text-white mt-1">
                  OBSIDIAN ELITE
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#8C7355]/30 border border-[#8C7355]/60 text-[#FDDDB9]">
                <Crown className="w-3.5 h-3.5 text-[#FDDDB9]" />
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider">
                  Tier II Patron
                </span>
              </div>
            </div>

            {/* Middle row: Card Chip & Number */}
            <div className="my-6 relative z-10 flex items-center justify-between">
              <div className="w-10 h-7 bg-gradient-to-tr from-[#8C7355] to-[#FDDDB9] rounded-sm opacity-90 shadow" />
              <span className="font-mono text-[13px] tracking-[0.25em] text-white/85">
                0842 • 7719 • VIP
              </span>
            </div>

            {/* Bottom row: Patron Name & Expiry */}
            <div className="flex items-end justify-between relative z-10 border-t border-white/10 pt-3">
              <div>
                <span className="text-[8px] font-sans uppercase tracking-widest text-white/50 block">
                  Patron Member
                </span>
                <span className="font-sans text-[13px] font-semibold tracking-wider uppercase text-white">
                  {guestName}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-sans uppercase tracking-widest text-white/50 block">
                  Privilege Expiry
                </span>
                <span className="font-mono text-[12px] text-[#FDDDB9]">
                  12 / 2028
                </span>
              </div>
            </div>
          </div>

          {/* 2. Loyalty Points Meter */}
          <div className="p-5 bg-[var(--color-card)] border border-[var(--color-border)] flex flex-col gap-3 shadow-sm transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-bronze)] font-semibold">
                  Atelier Sovereign Points
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif text-[24px] font-medium text-[var(--color-text-primary)] tabular-nums">
                    4,850
                  </span>
                  <span className="text-[12px] font-sans text-[var(--color-text-muted)]">
                    / 5,000 pts
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-sans text-[var(--color-accent-blue)] font-semibold uppercase tracking-wider bg-[var(--color-accent-blue-light)] px-2.5 py-1">
                150 pts to Imperial Tier
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[var(--color-surface-container)] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--color-accent-bronze)] to-[var(--color-accent-blue)]"
                style={{ width: '97%' }}
              />
            </div>
            <p className="text-[11px] font-sans text-[var(--color-text-secondary)] leading-relaxed">
              Reaching 5,000 points unlocks complimentary bespoke 24K gold crest monogramming and private suite champagne fittings.
            </p>
          </div>

          {/* 3. Obsidian Privileges Grid */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[var(--color-text-primary)] mb-3">
              Your Active Tier Privileges
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: '15% Atelier Privilege', desc: 'Applied automatically across all couture orders' },
                { title: 'Champagne Salon Access', desc: 'Private lounge fitting suites in Dhaka & Paris' },
                { title: 'Dedicated Master Tailor', desc: 'Direct priority line to Atelier Head Pattern Cutter' },
                { title: '48hr Runway Pre-Orders', desc: 'Guaranteed allocation before public collection drops' },
              ].map((priv, idx) => (
                <div key={idx} className="p-3.5 bg-[var(--color-card)] border border-[var(--color-border)] flex flex-col justify-between shadow-sm">
                  <span className="text-[12px] font-serif text-[var(--color-text-primary)] font-medium">
                    {priv.title}
                  </span>
                  <span className="text-[10px] font-sans text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
                    {priv.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Bespoke Appointment Booking (Col-span 6 on desktop) */}
        <div className="lg:col-span-6 bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 shadow-sm flex flex-col gap-5 transition-colors">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[var(--color-border)]">
            <Calendar className="w-5 h-5 text-[var(--color-accent-blue)]" />
            <h4 className="font-serif text-[20px] text-[var(--color-text-primary)]">
              Reserve Bespoke Salon Consultation
            </h4>
          </div>

          {isBooked ? (
            <div className="p-6 bg-[var(--color-card-subtle)] border border-[var(--color-accent-bronze)]/50 flex flex-col items-center text-center gap-3 animate-fadeIn">
              <CheckCircle className="w-10 h-10 text-[var(--color-accent-blue)]" />
              <h5 className="font-serif text-[20px] text-[var(--color-text-primary)]">
                Private Appointment Reserved
              </h5>
              <p className="text-[13px] font-sans text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
                Thank you, <strong>{guestName}</strong>. Our Head Atelier Concierge will welcome you at <strong>{salon}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setIsBooked(false)}
                className="mt-3 text-[11px] font-sans uppercase tracking-widest text-[var(--color-accent-blue)] underline cursor-pointer"
              >
                Modify Reservation Details
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="flex flex-col gap-4">
              {/* Salon Selection */}
              <div>
                <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] font-semibold block mb-1.5">
                  Atelier Salon Location
                </label>
                <div className="flex flex-col gap-2">
                  {([
                    'Chattogram Flagship Salon • GEC Circle',
                    'Dhaka Liaison Suite • Gulshan 2',
                    'Virtual International Fitting (London / New York)',
                  ] as const).map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSalon(loc)}
                      className={`p-3 text-[12px] font-sans text-left border flex items-center justify-between cursor-pointer transition-colors ${
                        salon === loc
                          ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] border-[var(--color-text-primary)] font-semibold'
                          : 'bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] border-[var(--color-border)] hover:border-[var(--color-accent-blue)]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[var(--color-accent-bronze)]" />
                        {loc}
                      </span>
                      {salon === loc && <CheckCircle className="w-4 h-4 text-[var(--color-canvas)]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] font-semibold block mb-1.5">
                  Consultation Service
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value as BookingDetails['service'])}
                  className="w-full p-3 text-[12px] font-sans border border-[var(--color-border)] bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)]"
                >
                  <option value="Bespoke 28-Point Fitting & Tailoring">Bespoke 28-Point Fitting & Tailoring</option>
                  <option value="Bridal & Formal Wedding Trousseau">Bridal & Formal Wedding Trousseau</option>
                  <option value="VIP Private Silk & Jamdani Archive">VIP Private Silk & Jamdani Archive</option>
                </select>
              </div>

              {/* Date and Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] font-semibold block mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 text-[12px] font-sans border border-[var(--color-border)] bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] font-semibold block mb-1.5">
                    Salon Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-2.5 text-[12px] font-sans border border-[var(--color-border)] bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)]"
                  >
                    <option value="11:30 AM Morning Fitting">11:30 AM (Morning Fitting)</option>
                    <option value="02:30 PM Afternoon Salon">02:30 PM (Afternoon Salon)</option>
                    <option value="05:00 PM (Champagne Hour)">05:00 PM (Champagne Hour)</option>
                    <option value="07:30 PM Candlelight View">07:30 PM (Candlelight View)</option>
                  </select>
                </div>
              </div>

              {/* Patron Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] font-semibold block mb-1.5">
                    Patron Full Name
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-2.5 text-[12px] font-sans border border-[var(--color-border)] bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-accent-bronze)] font-semibold block mb-1.5">
                    Direct Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 text-[12px] font-sans border border-[var(--color-border)] bg-[var(--color-card-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-blue)]"
                  />
                </div>
              </div>

              {/* Confirm Action */}
              <button
                type="submit"
                className="w-full py-4 bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-sans text-[12px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-[var(--color-accent-blue)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2"
              >
                <span>CONFIRM SALON APPOINTMENT</span>
                <Clock className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
