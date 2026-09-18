# Blu Eyes LifeWear — Design System & Specifications (Concept 4)

> **Design Theme**: *Nordic Technical LifeWear & Scandinavian Functional Utilitarianism*.  
> Calibrated for high-performance, utilitarian e-commerce with Level 0 sharp geometry (`0px` border-radius), hairline structural borders, high contrast data density, and meticulous textile specifications (GSM, shrinkage, thread count, multi-pack tiering).

---

## 1. Visual Identity & Dual-Mode Tokens

### 1.1 Color Tokens

| Token Name | Light Mode (Default) | Dark Mode | Semantic Role |
| :--- | :--- | :--- | :--- |
| **Canvas** | `#FFFFFF` *(Studio White)* | `#0E1015` *(Clean Night)* | Application background |
| **Surface** | `#F6F7F9` *(Cool Fog Gray)* | `#171A21` *(Slate Dark)* | Card substrates, technical panels, shelf containers |
| **Elevated Card** | `#FFFFFF` *(Bordered `#DCDFE5`)* | `#1F242D` *(Bordered `#2A2F3D`)* | Product tiles, interactive selectors |
| **Text Primary** | `#111827` *(Deep Ink)* | `#F9FAFB` *(Crisp Light)* | High-emphasis headers, titles, price figures |
| **Text Secondary** | `#4B5563` *(Slate Muted)* | `#9CA3AF` *(Muted Steel)* | Material specs, GSM tags, secondary copy |
| **Action CTA** | `#004CE8` *(Signal Blue)* | `#387BFF` *(Vibrant Cobalt)* | Primary buttons, active state highlights, checkout |
| **Alert / Clearance** | `#D92D20` *(Signal Red)* | `#F04438` *(Signal Red)* | Scarcity flags, clearance badges, warnings |
| **Border Divider** | `#DCDFE5` *(Hairline Gray)* | `#2A2F3D` *(Charcoal Divider)* | 1px non-overlapping structural grid borders |

### 1.2 Typography & Font Stacks

- **Display & Headers**: `'Inter', sans-serif`  
  - Weight: Bold `700`, Letter-Spacing: `-0.02em`
- **Body & UI**: `'Inter', sans-serif`  
  - Weight: Regular `400` / Medium `500`, Line-Height: `leading-relaxed`
- **Technical Metrics & Pricing**: `'Roboto Mono', monospace` (or `'JetBrains Mono'`)  
  - Weight: Medium `500`, Letter-Spacing: `-0.01em` to `+0.02em`  
  - Applied to: GSM indicators, thread counts, SKU codes, pricing, bundle discounts, tolerances
- **Typography Rule**: Strictly avoid `text-justify` across all viewports. Use `text-left` or `text-center` with `leading-relaxed`.

### 1.3 Geometry & Elevation

- **Geometry**: **Level 0 (Sharp)**. All UI components—including buttons, cards, modals, tags, inputs, and chips—strictly use `rounded-none` (`0px` border radius). No rounded pill shapes or softened borders.
- **Elevation**: Flat tectonic layering separated by crisp 1px borders (`#DCDFE5` / `#2A2F3D`). No blurry drop shadows.

---

## 2. Brand Context & Chattogram Logistics

- **Brand Origin**: Based in **Chattogram, Bangladesh** (Flagship: *GEC Circle, Chattogram*).
- **Notification Ticker**:  
  `"BLU EYES LIFEWEAR • SAME-DAY DISPATCH IN CHATTOGRAM • 48H NATIONWIDE TO ALL 64 DISTRICTS • DHL GLOBAL EXPRESS"`
- **Logistics Delivery Matrix**:
  - **Chattogram Metro**: Same-Day / 24H Dispatch (৳80 or Free over ৳2,000 / $20).
  - **Nationwide (All 64 Districts)**: 48H Express Courier (৳120 or Free over ৳2,500 / $25).
  - **International Express**: 3–5 Business Days via DHL Global Express ($25 flat or Free over $120).
- **Dual Currency Engine**:
  - Full toggle between **BDT (৳)** and **USD ($)**.
  - Dynamically updates product cards, cart totals, and bundle savings calculators.

---

## 3. Clean Demographic Navigation on Homepage

- **Clean Demographics**:
  - Gateway navigation links, quick-switch bar, and bento modular showcases strictly label categories as:  
    `[All]`, `[Women]`, `[Men]`, `[Kids]`, `[Baby]`, `[Accessories]`.
  - **Rule**: Absolutely **NO** age/year subtitles or badges (such as `"2–15Y"` or `"0–2Y"`) on the Homepage. All gateways remain crisp and timeless.

---

## 4. Age & Lifecycle Category Filters

- **Category Filter Scope**:
  - Age brackets appear strictly within category pages (`LifeWearCategoryPage.tsx`) inside the sticky filter sidebar (desktop) and mobile filter drawer.
- **Dedicated Age/Lifecycle Chips**:
  - **Baby**: `[All Ages]`, `[0–3 Months]`, `[3–6 Months]`, `[6–12 Months]`, `[12–24 Months]`
  - **Kids**: `[All Ages]`, `[Toddler (2–7 Years)]`, `[Junior (8–15 Years)]`
- **Interactive State**: Real-time filtering dynamic update on chip click with instant product list recalculation.

---

## 5. Functional Mechanics & Component Architecture

### 5.1 Homepage (`LifeWearHome.tsx`)
- Top utility ticker with Chattogram logistics and BDT/USD switcher.
- Hero section with split architectural imagery and technical garment callouts.
- Clean demographic quick-switch bar (`[All]`, `[Women]`, `[Men]`, `[Kids]`, `[Baby]`, `[Accessories]`).
- Modular Bento Essentials Showcase with direct gateway cards.
- Fast-browse product rail with instant colorway switching and GSM badges.

### 5.2 Category PLP (`LifeWearCategoryPage.tsx`)
- Desktop: 4-column product grid with sticky left filter sidebar (Age / Lifecycle chips for Kids/Baby, GSM filter, Sort).
- Mobile: 2-column grid with floating filter button and slide-up filter sheet.
- Product tiles featuring 4:5 ratio imagery, GSM tags, and `"QUICK ADD"` buttons.

### 5.3 Product Detail Page (`LifeWearPDP.tsx`)
- Crisp studio imagery with macro zoom toggle.
- Interactive **Multi-Pack Bundle Calculator** with live savings display:
  - e.g., *"Buy 1 for ৳850 / Buy 3 for ৳2,100 — Save ৳450"* (or *"$8 / 3 for $19 — Save $5"*).
- Technical specs accordion: GSM fabric density, shrinkage tolerance, weave construction, care guide.
- Sticky bottom `"ADD TO BAG"` bar for frictionless conversion.

### 5.4 Slide-Over Cart Drawer (`LifeWearCartDrawer.tsx`)
- Free shipping threshold progress meter.
- Add-on: *"Recyclable Kraft Gift Box (+৳60 / $0.80)"*.
- Single-page checkout summary with COD (Cash on Delivery), bKash Direct, and Credit Card options.

### 5.5 Brand Heritage (`LifeWearAbout.tsx`)
- Industrial engineering manifesto: Port of Chattogram sustainable manufacturing, unbleached packaging, and GEC Circle Flagship coordinates.

### 5.6 Motion Dynamics
- Snappy `120ms linear` transitions for view swaps and interactive feedback matching `ANIMATION.md`.
