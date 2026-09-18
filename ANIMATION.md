# Blu Eyes Atelier — Motion & Animation Specification

> **Aesthetic Philosophy**: *Quiet Luxury Motion*. Animations never feel flashy, bouncy, or gimmicky; they emulate the slow, deliberate grace of haute couture runway reveals, tactile silk draping, and private salon intimacy.

---

## 1. Core Motion Tokens

### 1.1 Timing & Easings

| Name | Value | Description |
| :--- | :--- | :--- |
| **Atelier Ease** | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary luxury curve. Rapid initial response followed by an extended, graceful settle. |
| **Gentle Decay** | `cubic-bezier(0.25, 1, 0.5, 1)` | Ambient fades, backdrop reveals, and overlay dimming. |
| **Linear Utility** | `linear` | Progress meters and continuous pulse effects. |

### 1.2 Durations
- **Micro (Buttons, Toggles, Swatches)**: `150ms – 250ms`
- **Standard (Cards, Accordions, Tabs)**: `300ms – 450ms`
- **Dramatic (Hero Image Scale, Drawers, Monograms)**: `600ms – 800ms`

---

## 2. Component Animation Guidelines

### 2.1 View & Tab Transitions
- **Choreography**: Gentle cross-fade (`opacity: 0 -> 1`) combined with a minimal vertical offset (`y: 8px -> 0px`).
- **Duration**: `300ms` with `easeOut`.
- **Framer Motion Pattern**:
  ```tsx
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
  >
  ```

### 2.2 Full Slide-Over Cart Drawer (`AtelierCartDrawer.tsx`)
- **Sheet Slide**: Enters from bottom (or right) with a full viewport slide (`y: '100%' -> '0%'`).
- **Backdrop**: Smooth fade to `rgba(18, 18, 18, 0.65)` with `backdrop-filter: blur(12px)`.
- **Exit**: Slides down cleanly before unmounting.
- **Rule**: The bottom navigation dock MUST NOT be rendered inside or overlap the cart drawer.

### 2.3 Couture Garment Image Hover
- **Scale**: Subtle `1.03x` to `1.05x` zoom on card hover.
- **Duration**: `700ms` with `ease-out`.
- **CSS**: `transition-transform duration-700 ease-out group-hover:scale-105`.

### 2.4 Obsidian VIP Pricing Toggle (`AtelierPDP.tsx`)
- **Interaction**: Toggling between Standard and Obsidian VIP Privileged Price.
- **Motion**: Numbers smoothly transition with a subtle golden glow flash on the discount badge (`#8C7355` / `#FDDDB9`).

### 2.5 Bespoke Booking & Checkout Confetti
- **Trigger**: Confirmed appointment booking in `AtelierVIPHub.tsx` and "Proceed to Checkout" in `AtelierCartDrawer.tsx`.
- **Aesthetic**: Gold (`#8C7355`, `#E0C29F`) and Royal Cobalt (`#103FEF`) artisan confetti burst.

### 2.6 Floating Concept Switcher Pill (`ConceptSwitcherPill.tsx`)
- **Position**: Fixed floating dock above viewport bottom safe area.
- **Backdrop**: Glassmorphic frosted panel (`bg-black/85 backdrop-blur-xl border border-white/10`).
- **Active Indicator**: Animated layout pill (`layoutId="activeConcept"`) with spring physics (`stiffness: 450, damping: 35`).
