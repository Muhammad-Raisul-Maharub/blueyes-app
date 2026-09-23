import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Gift, Calendar, Plus, Copy, Check, ArrowRight, ArrowLeft } from 'lucide-react'
import type { Currency, FamilyLoyaltyChild } from './types'
import { SEED_FAMILY_CHILDREN } from './familyData'

interface FamilyHubProps {
  currency: Currency
  onNavigateCatalog: () => void
  onBack?: () => void
}

export const FamilyHub: React.FC<FamilyHubProps> = ({ currency, onNavigateCatalog, onBack }) => {
  const [children, setChildren] = useState<FamilyLoyaltyChild[]>(SEED_FAMILY_CHILDREN)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newBirthdate, setNewBirthdate] = useState('')

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2500)
  }

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return

    const newChild: FamilyLoyaltyChild = {
      id: `child-${Date.now()}`,
      name: newName.trim(),
      birthdate: newBirthdate || 'Upcoming Milestone',
      ageYears: 0,
      stageLabel: 'Newborn / Milestone Registered',
      nextMilestone: '1st Year Milestone Celebration Perk',
      voucherCode: `${newName.toUpperCase().slice(0, 4)}20`,
      discountPercent: 20,
    }

    setChildren((prev) => [newChild, ...prev])
    setNewName('')
    setNewBirthdate('')
    setShowAddForm(false)
  }

  return (
    <div className="w-full min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] font-['Public_Sans']">
      {/* Hub Hero Banner */}
      <section className="w-full bg-[var(--color-surface-soft)] border-b border-[var(--color-border)] py-10 sm:py-12 px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-[1400px] mx-auto space-y-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] hover:border-[#175CD3] cursor-pointer mb-2 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#175CD3]" />
              <span>Back to Previous Screen</span>
            </button>
          )}

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F76C5E]/15 text-[#F76C5E] text-xs font-bold uppercase">
            <Heart className="w-3.5 h-3.5 fill-[#F76C5E]" />
            <span>FAMILY PRIVILEGE & MILESTONES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
            Blu Eyes Family Hub & Milestone Club
          </h1>

          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            Every child’s growth is worth celebrating. Register your children’s birthdays and milestone stages to unlock exclusive 20% vouchers and seasonal curated wardrobes.
          </p>
        </div>
      </section>

      {/* Main Loyalty Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
        {/* Top Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#175CD3]/10 flex items-center justify-center text-[#175CD3]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase">
                ACTIVE MILESTONES
              </span>
              <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
                {children.length} Children
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F76C5E]/10 flex items-center justify-center text-[#F76C5E]">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase">
                UNLOCKED VOUCHERS
              </span>
              <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
                20% OFF
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/20 flex items-center justify-center text-[#b5730a] dark:text-[#FDB843]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase">
                NEXT CELEBRATION
              </span>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] font-['Outfit'] truncate">
                {children[0]?.name || 'Family'} Milestone
              </h3>
            </div>
          </div>
        </div>

        {/* Registered Children & Milestone Perks */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
            <div>
              <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] font-['Outfit']">
                Registered Children & Birthday Milestones
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Vouchers are generated automatically for seasonal wardrobe renewal (orders over {currency === 'BDT' ? '৳2,000' : '$25'}).
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 rounded-full bg-[#175CD3] hover:bg-[#144fbb] text-white text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Register Child</span>
            </button>
          </div>

          {/* Add Child Form Modal / Drawer */}
          {showAddForm && (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleAddChild}
              className="p-6 rounded-3xl bg-[var(--color-surface-soft)] border border-[#175CD3] space-y-4 max-w-xl"
            >
              <h4 className="font-bold text-base text-[var(--color-text-primary)] font-['Outfit']">
                Register New Child Milestone
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Child's First Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] outline-none focus:border-[#175CD3]"
                />
                <input
                  type="date"
                  placeholder="Birth Date"
                  value={newBirthdate}
                  onChange={(e) => setNewBirthdate(e.target.value)}
                  className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] outline-none focus:border-[#175CD3]"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#175CD3] text-white text-xs font-bold cursor-pointer"
                >
                  Save Child & Unlock 20% Voucher
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2.5 rounded-full border border-[var(--color-border)] text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}

          {/* Children Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child) => (
              <div
                key={child.id}
                className="p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs space-y-4 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F76C5E] to-[#F5A623] text-white font-extrabold text-lg flex items-center justify-center font-['Outfit']">
                      {child.name[0]}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[var(--color-text-primary)] font-['Outfit']">
                        {child.name}
                      </h4>
                      <span className="text-xs text-[var(--color-text-secondary)] font-medium">
                        Born: {child.birthdate}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#F5A623]/20 text-[#b5730a] dark:text-[#FDB843] text-xs font-bold">
                    Age {child.ageYears} Years
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--color-surface-soft)] space-y-1">
                  <span className="text-[10px] font-bold text-[#175CD3] uppercase block">
                    STAGE & MILESTONE
                  </span>
                  <p className="text-xs font-bold text-[var(--color-text-primary)]">
                    {child.stageLabel}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {child.nextMilestone}
                  </p>
                </div>

                {/* Voucher Code Box */}
                <div className="p-3.5 rounded-2xl border-2 border-dashed border-[#F76C5E] bg-[#F76C5E]/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#F76C5E] uppercase block">
                      20% BIRTHDAY VOUCHER UNLOCKED
                    </span>
                    <span className="text-base font-extrabold tracking-wider font-mono text-[var(--color-text-primary)]">
                      {child.voucherCode}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(child.voucherCode)}
                    className="px-3 py-1.5 rounded-full bg-[#F76C5E] text-white text-xs font-bold flex items-center space-x-1 cursor-pointer hover:bg-[#e45b4d] transition-all"
                  >
                    {copiedCode === child.voucherCode ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action: Shop with Voucher */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#175CD3] to-[#0A2E73] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold font-['Outfit']">
              Ready to Style Your Family?
            </h3>
            <p className="text-xs sm:text-sm text-white/90">
              Apply code <strong className="font-mono bg-white/20 px-2 py-0.5 rounded-md">FAMILY20</strong> at checkout for 20% off all matching bundles!
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateCatalog}
            className="px-7 py-3.5 rounded-full bg-[#F5A623] hover:bg-[#e09419] text-black font-extrabold text-xs sm:text-sm transition-all cursor-pointer shadow-md flex items-center space-x-2 self-start sm:self-auto"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
