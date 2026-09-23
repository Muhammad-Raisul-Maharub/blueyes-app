import type { DistrictProduct } from './types'

export const DISTRICT_PRODUCTS: DistrictProduct[] = [
  // ==========================================
  // WOMEN (3 Distinct Streetwear Pieces)
  // ==========================================
  {
    id: 'cropped-tech-fleece-zip-hoodie',
    title: 'Cropped Tech-Fleece Zip Hoodie',
    category: 'Women',
    subcategory: 'Hoodies & Fleece',
    gsm: 380,
    fit: 'Boxy Cropped Silhouette',
    fabric: '380 GSM Heavy Double-Knit Cotton Fleece',
    priceBDT: 3900,
    priceUSD: 35,
    badge: 'HOT DROP',
    stockLeft: 7,
    videoBadge: true,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Engineered with thermal double-knit tech fleece, matte black hardware, and drop-shoulder architecture. High funnel hood with toggle cord locks.',
    specs: [
      '380 GSM Heavyweight Double-Knit Cotton',
      'Dual-direction matte black YKK zipper',
      'Reflective volt eyelet bar-tacks',
      'Pre-shrunk enzyme silicone wash',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pitch Obsidian', hex: '#090A0E', preview: '#090A0E' },
      { name: 'Cyber Volt Accent', hex: '#CCFF00', preview: '#CCFF00' },
      { name: 'Concrete Heather', hex: '#8E95A5', preview: '#8E95A5' },
    ],
    inStock: true,
  },
  {
    id: 'wide-leg-utility-parachute-denim',
    title: 'Wide-Leg Utility Parachute Denim',
    category: 'Women',
    subcategory: 'Denim & Bottoms',
    gsm: '14oz',
    fit: 'Wide-Leg Balloon Fit',
    fabric: '14oz Rigid Kurabo Slub Cotton Denim',
    priceBDT: 4200,
    priceUSD: 38,
    badge: 'LOW STOCK',
    stockLeft: 4,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Extreme volume parachute silhouette with 3D knee darts, bungee hem adjusters, and deep cargo bellows. Stone-washed for vintage industrial fade.',
    specs: [
      '14oz Rigid Selvedge Character Slub Denim',
      'Bungee cinch cord at ankle for stacked or wide look',
      'Triple-needle contrast reinforcement stitch',
      'District branded matte metal shank buttons',
    ],
    sizes: ['26 / XS', '28 / S', '30 / M', '32 / L'],
    colors: [
      { name: 'Washed Charcoal Indigo', hex: '#262A36', preview: '#262A36' },
      { name: 'Acid Vintage Ash', hex: '#636674', preview: '#636674' },
    ],
    inStock: true,
  },
  {
    id: 'modular-asymmetric-street-tank',
    title: 'Modular Asymmetric Street Tank',
    category: 'Women',
    subcategory: 'Tops & Tanks',
    gsm: 240,
    fit: 'Asymmetric Anatomical Fitted',
    fabric: '240 GSM Ribbed Stretch Cotton Elastane',
    priceBDT: 1650,
    priceUSD: 15,
    badge: 'DISTRICT ESSENTIAL',
    stockLeft: 19,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Deconstructed dual-strap tank featuring high-tension ribbed cotton with raw edge industrial binding and subtle micro-screenprint coordinates of Chattogram Port.',
    specs: [
      '240 GSM 95% Organic Cotton, 5% Spandex Rib',
      'High neckline with angular cutout shoulder strap',
      'Silkscreen longitude/latitude tag: 22.3569° N, 91.7832° E',
      'Double-stitched reinforced hem',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pure Carbon', hex: '#12141C', preview: '#12141C' },
      { name: 'Bleached Chalk', hex: '#F4F4F6', preview: '#E4E5EA' },
    ],
    inStock: true,
  },

  // ==========================================
  // MEN (3 Distinct Streetwear Pieces)
  // ==========================================
  {
    id: 'exo-skeleton-heavyweight-hoodie',
    title: 'Exo-Skeleton Heavyweight Hoodie 480 GSM',
    category: 'Men',
    subcategory: 'Heavyweight Fleece',
    gsm: 480,
    fit: 'Boxy Drop-Shoulder Oversized',
    fabric: '480 GSM 100% Combed French Terry Cotton',
    priceBDT: 4800,
    priceUSD: 42,
    badge: 'LIMITED TO 50 UNITS',
    stockLeft: 5,
    videoBadge: true,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Ultra-dense 480 GSM French Terry hoodie built with exterior reverse-weave structural ribbing, seamless kangaroo pocket, and double-layered heavyweight hood.',
    specs: [
      '480 GSM Zero-Lint Combed Cotton Terry',
      'Ribbed side gussets for tactical mobility',
      'High-density 3D rubberized District chest stamp',
      'Nickel-plated eyelets with wax-dipped drawstrings',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Core Pitch Black', hex: '#090A0E', preview: '#090A0E' },
      { name: 'Acid Volt Trim', hex: '#CCFF00', preview: '#CCFF00' },
      { name: 'Gunmetal Cement', hex: '#343846', preview: '#343846' },
    ],
    inStock: true,
  },
  {
    id: 'acid-wash-tactical-cargo-pants',
    title: 'Acid-Wash Tactical Cargo Pants',
    category: 'Men',
    subcategory: 'Cargos & Pants',
    gsm: 320,
    fit: 'Relaxed Tapered Tactical',
    fabric: '320 GSM Military Ripstop Canvas',
    priceBDT: 3800,
    priceUSD: 34,
    badge: 'RESTOCKED',
    stockLeft: 12,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Multi-pocket utilitarian cargo engineered from cross-weave ripstop canvas. Features 8 functional compartments, modular D-ring attachment points, and snap-cuff ankles.',
    specs: [
      '320 GSM Cross-Hatch Tear-Resistant Ripstop',
      'Reinforced seat and articulated 3D knee panels',
      'Velcro-fastened pleated side cargo pockets',
      'Industrial nylon webbing belt loops',
    ],
    sizes: ['30 / S', '32 / M', '34 / L', '36 / XL'],
    colors: [
      { name: 'Acid Wash Graphite', hex: '#232630', preview: '#232630' },
      { name: 'Military Olive Drab', hex: '#3E4233', preview: '#3E4233' },
    ],
    inStock: true,
  },
  {
    id: 'cyber-matrix-oversized-tee',
    title: 'Cyber Matrix Oversized Tee 280 GSM',
    category: 'Men',
    subcategory: 'Graphic Tees',
    gsm: 280,
    fit: 'Extreme Drop-Shoulder Boxy',
    fabric: '280 GSM Heavy Single-Jersey Cotton',
    priceBDT: 2100,
    priceUSD: 19,
    badge: 'STREET ARCHIVE FAVORITE',
    stockLeft: 8,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Boxy heavyweight tee carrying the Blu Eyes District Cyber Matrix graphics on the reverse. High thick 1.25-inch ribbed collar that retains shape permanently.',
    specs: [
      '280 GSM Compact Ring-Spun Combed Cotton',
      '1.25" thick 1x1 rib collar band',
      'Reflective high-build discharge screenprint',
      'Pre-shrunk for zero post-wash distortion',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Carbon Black', hex: '#090A0E', preview: '#090A0E' },
      { name: 'Electric Cobalt', hex: '#0047FF', preview: '#0047FF' },
      { name: 'Optic White', hex: '#FFFFFF', preview: '#F4F4F6' },
    ],
    inStock: true,
  },

  // ==========================================
  // KIDS (2–15Y) (3 Distinct Streetwear Pieces)
  // ==========================================
  {
    id: 'junior-mini-me-boxy-hooded-set',
    title: "Junior 'Mini-Me' Boxy Hooded Set",
    category: 'Kids',
    subcategory: 'Tracksuits & Sets',
    gsm: 340,
    fit: 'Relaxed Mini-Me Skater Fit',
    fabric: '340 GSM Brushed Fleece Cotton',
    priceBDT: 2850,
    priceUSD: 25,
    badge: 'MINI-ME SQUAD',
    stockLeft: 9,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Exact downscaled edition of our Exo-Skeleton hoodie paired with matching relaxed jogger pants. Ultra-soft brushed fleece lining that keeps kids cozy without itching.',
    specs: [
      '340 GSM 100% Hypoallergenic Combed Cotton',
      'Elasticized waistband with interior drawstring',
      'Kangaroo pocket with mini volt logo tag',
      'Reinforced knee panels for skate durability',
    ],
    sizes: ['2–4Y', '5–7Y', '8–10Y', '11–13Y', '14–15Y'],
    colors: [
      { name: 'Pitch Black & Volt', hex: '#090A0E', preview: '#090A0E' },
      { name: 'Electric Cobalt Blue', hex: '#0047FF', preview: '#0047FF' },
    ],
    inStock: true,
  },
  {
    id: 'skater-distressed-denim-joggers',
    title: 'Skater Distressed Denim Joggers',
    category: 'Kids',
    subcategory: 'Denim & Bottoms',
    gsm: '11oz',
    fit: 'Tapered Skater Jogger',
    fabric: '11oz Stretch Distressed Denim',
    priceBDT: 2400,
    priceUSD: 22,
    badge: 'KIDS FAVORITE',
    stockLeft: 14,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Hard-wearing stretch denim jeans featuring elastic jogger cuffs, subtle knee distressing with internal fabric patches, and an adjustable interior elastic waistband.',
    specs: [
      '11oz Cotton-Rich Stretch Denim',
      'Soft elastic waist with built-in button adjusters',
      'Reinforced distressed detailing (no skin exposure)',
      'Ribbed stretch ankle cuffs',
    ],
    sizes: ['3–5Y', '6–8Y', '9–11Y', '12–15Y'],
    colors: [
      { name: 'Vintage Stone Blue', hex: '#3E546B', preview: '#3E546B' },
      { name: 'Faded Ash Black', hex: '#2A2C34', preview: '#2A2C34' },
    ],
    inStock: true,
  },
  {
    id: 'cyber-skate-graphic-tee',
    title: 'Cyber Skate Graphic Tee',
    category: 'Kids',
    subcategory: 'Tees & Tops',
    gsm: 220,
    fit: 'Boxy Skate Fit',
    fabric: '220 GSM Ringspun Organic Cotton',
    priceBDT: 1400,
    priceUSD: 12,
    badge: 'NEW DROP',
    stockLeft: 22,
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Loud, high-energy graphic tee spotlighting the neon District Eye logo over pixelated skate ramps. Non-toxic, water-based eco-certified screenprinting.',
    specs: [
      '220 GSM GOTS-Certified Organic Ringspun Cotton',
      'Non-scratch heat-transfer size label inside',
      'Ribbed crewneck collar with taped neck seam',
      'Vibrant cyber volt glow-in-the-dark graphic detail',
    ],
    sizes: ['2–4Y', '5–7Y', '8–10Y', '11–13Y', '14–15Y'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF', preview: '#FFFFFF' },
      { name: 'Night Charcoal', hex: '#161821', preview: '#161821' },
    ],
    inStock: true,
  },

  // ==========================================
  // BABY (0–2Y) (3 Distinct Streetwear Pieces)
  // ==========================================
  {
    id: 'organic-ribbed-mini-district-romper',
    title: "Organic Ribbed 'Mini-District' Romper 2-Pack",
    category: 'Baby',
    subcategory: 'Rompers & Onesies',
    gsm: 210,
    fit: 'Easy-Snap Comfort Fit',
    fabric: '210 GSM 100% GOTS Organic Ribbed Cotton',
    priceBDT: 1850,
    priceUSD: 16,
    badge: 'ORGANIC 2-PACK',
    stockLeft: 11,
    images: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Ultra-soft 2-pack of streetwear rompers tailored from stretchy organic ribbed cotton. Nickel-free crotch snap fastenings for rapid, hassle-free diaper changes.',
    specs: [
      'Pack includes: 1x Pitch Black, 1x Cyber Volt / White Heather',
      '210 GSM GOTS Certified Organic Cotton Rib',
      'Nickel-free YKK reinforced snaps along leg inseam',
      'Fold-over scratch mitts on sizes 0-3M and 3-6M',
    ],
    sizes: ['0–3M', '3–6M', '6–12M', '12–18M', '18–24M'],
    colors: [
      { name: 'Pitch & Volt Duo', hex: '#090A0E', preview: '#090A0E' },
      { name: 'Chalk Heather Duo', hex: '#D7D8DD', preview: '#D7D8DD' },
    ],
    inStock: true,
  },
  {
    id: 'street-camo-organic-cotton-bodysuit',
    title: 'Street-Camo Organic Cotton Bodysuit',
    category: 'Baby',
    subcategory: 'Bodysuits',
    gsm: 200,
    fit: 'Envelope Neck Bodysuit',
    fabric: '200 GSM Combed Organic Cotton Jersey',
    priceBDT: 1250,
    priceUSD: 11,
    badge: 'NEW ARRIVAL',
    stockLeft: 16,
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Monochrome urban camo pattern infused with tiny reflective District Eye motifs. Expanding envelope shoulders make over-the-head dressing effortless.',
    specs: [
      '200 GSM Combed Long-Staple Organic Cotton',
      'Expanding envelope neckline for easy downward removal',
      'Water-based botanical pigment print',
      'Flatlock seams to protect sensitive newborn skin',
    ],
    sizes: ['0–3M', '3–6M', '6–12M', '12–18M'],
    colors: [
      { name: 'Monochrome Street Camo', hex: '#31343F', preview: '#31343F' },
      { name: 'Cyber Volt Camo', hex: '#B8E600', preview: '#B8E600' },
    ],
    inStock: true,
  },
  {
    id: 'baby-sneaker-booties-beanie-set',
    title: 'Baby Sneaker Booties & Beanie Set',
    category: 'Baby',
    subcategory: 'Sets & Booties',
    gsm: 260,
    fit: 'Flexible Soft-Sole Set',
    fabric: '260 GSM French Terry Cotton & Non-Slip Silicone',
    priceBDT: 1450,
    priceUSD: 13,
    badge: 'HYPE GIFT SET',
    stockLeft: 8,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'The ultimate streetwear starter set: faux-laced soft-sole sneaker booties with silicone gripper soles and a matching ribbed cuff cuffed beanie with rubberized District patch.',
    specs: [
      'Soft flexible crib shoes with non-skid tread',
      'Elastic ankle collar prevents booties falling off',
      'Double-layer beanie stretches as baby grows',
      'Comes packaged in a miniature District sneaker box',
    ],
    sizes: ['0–6M', '6–12M', '12–18M'],
    colors: [
      { name: 'Obsidian & Neon Volt', hex: '#090A0E', preview: '#090A0E' },
      { name: 'Cobalt & White', hex: '#0047FF', preview: '#0047FF' },
    ],
    inStock: true,
  },

  // ==========================================
  // ACCESSORIES (3 Distinct Streetwear Pieces)
  // ==========================================
  {
    id: 'cordura-tactical-crossbody-chest-bag',
    title: 'Cordura Tactical Crossbody Chest Bag',
    category: 'Accessories',
    subcategory: 'Bags & Packs',
    gsm: '1000D Cordura',
    fit: 'Modular Body Harness',
    fabric: '1000D Military-Spec Cordura Ballistic Nylon',
    priceBDT: 2600,
    priceUSD: 23,
    badge: 'TOP SELLER',
    stockLeft: 6,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Bulletproof construction featuring genuine 1000D Cordura, waterproof taped zippers, modular MOLLE webbing system, and magnetic quick-release Fidlock-style buckle.',
    specs: [
      '1000D Waterproof Cordura Ballistic Nylon',
      'Magnetic quick-detach mechanical buckle',
      'Front MOLLE attachment grid for carabiners',
      'Internal zippered mesh organizer pockets and key lanyard',
    ],
    sizes: ['One Size Modular'],
    colors: [
      { name: 'Tactical Matte Black', hex: '#0D0E13', preview: '#0D0E13' },
      { name: 'Cyber Volt Bungee Accent', hex: '#CCFF00', preview: '#CCFF00' },
    ],
    inStock: true,
  },
  {
    id: 'reversible-cyber-volt-bucket-hat',
    title: 'Reversible Cyber-Volt Bucket Hat',
    category: 'Accessories',
    subcategory: 'Headwear',
    gsm: 'Heavy Twill',
    fit: 'Classic Street Bucket',
    fabric: 'Heavyweight Cotton Twill & Reflective Ripstop',
    priceBDT: 1200,
    priceUSD: 10,
    badge: 'REVERSIBLE 2-IN-1',
    stockLeft: 18,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Dual identity headwear: Side A is stealth pitch black cotton twill with an embroidered logo; flip to Side B for high-visibility cyber volt reflective ripstop.',
    specs: [
      'Side A: 100% Heavy Structured Cotton Twill',
      'Side B: 3M Reflective Neon Ripstop Nylon',
      'Concentric stitched brim that holds shape',
      'Internal moisture-wicking sweatband',
    ],
    sizes: ['S/M (56cm)', 'L/XL (59cm)'],
    colors: [
      { name: 'Stealth Black / Cyber Volt', hex: '#090A0E', preview: '#090A0E' },
    ],
    inStock: true,
  },
  {
    id: 'chunky-industrial-carabiner-chain',
    title: 'Chunky Industrial Carabiner Chain',
    category: 'Accessories',
    subcategory: 'Jewelry & Hardware',
    gsm: 'Stainless Steel',
    fit: 'Heavy Link 52cm',
    fabric: '316L Surgical Stainless Steel & Anodized Aluminum',
    priceBDT: 1800,
    priceUSD: 16,
    badge: 'HARDWARE DROP',
    stockLeft: 10,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Heavy industrial curb chain anchored by an engraved neon-anodized screw-gate carabiner clasp. Hypoallergenic, tarnish-proof, and engineered for heavy everyday wear.',
    specs: [
      'Solid 316L Surgical Grade Stainless Steel (12mm width)',
      'Working screw-lock anodized carabiner connector',
      'Total chain length: 52cm (20.5 inches)',
      'Laser-etched DISTRICT CHATTOGRAM serial insignia',
    ],
    sizes: ['52cm Fixed'],
    colors: [
      { name: 'Brushed Silver & Acid Volt', hex: '#C0C0C0', preview: '#C0C0C0' },
      { name: 'Matte Gunmetal & Cobalt', hex: '#2A2A2A', preview: '#2A2A2A' },
    ],
    inStock: true,
  },
]

export const DISTRICT_GATEWAY_PILLS = [
  {
    id: 'Women',
    label: 'WOMEN',
    sub: 'TECH CROPS & DENIM',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'Men',
    label: 'MEN',
    sub: '480 GSM HOODIES & CARGOS',
    image:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'Kids',
    label: 'KIDS',
    sub: '2–15Y MINI-ME SQUAD',
    image:
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'Baby',
    label: 'BABY',
    sub: '0–2Y ORGANIC MINI',
    image:
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'Accessories',
    label: 'GEAR',
    sub: 'CORDURA & HARDWARE',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
  },
]
