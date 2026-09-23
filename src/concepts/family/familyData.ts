import type { FamilyProduct, FamilyLoyaltyChild } from './types'

export const FAMILY_PRODUCTS: FamilyProduct[] = [
  // ================= BABY =================
  {
    id: 'fam-b-01',
    sku: 'FAM-B01-CLD',
    title: '100% GOTS Organic Cloud Layette Romper',
    subtitle: 'Ultra-Soft Interlock with Fold-Over Mittens',
    demographic: 'baby',
    ageBracket: 'newborn-0-3m',
    priceBDT: 1450,
    priceUSD: 13,
    matchFamilyTag: 'Mini & Me Matching Striped Layette',
    matchingMembers: [
      {
        role: 'Mom',
        title: 'Mama Cloud-Touch Ribbed Lounge Set',
        priceBDT: 2800,
        priceUSD: 25,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      },
      {
        role: 'Dad',
        title: 'Papa Coastal Striped Everyday Tee',
        priceBDT: 1800,
        priceUSD: 16,
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      },
    ],
    organicCert: '100% GOTS Certified Organic Cotton • OEKO-TEX Standard 100 Class 1',
    developmentalStage: 'Sensory-Soft Skin Safe • Gentle Lap-Neckline for Newborns',
    fabricDescription:
      'Spun from silky extra-combed organic cotton that soothes sensitive infant skin. Hypoallergenic nickel-free Prym snap fasteners eliminate diaper changing friction.',
    sizingData: {
      metric: [
        { size: 'Newborn (0-1M)', height: '48–54 cm', weight: '2.5–4.0 kg' },
        { size: '0–3 Months', height: '55–61 cm', weight: '4.0–6.0 kg' },
        { size: '3–6 Months', height: '62–68 cm', weight: '6.0–8.0 kg' },
      ],
      imperial: [
        { size: 'Newborn (0-1M)', height: '19–21 in', weight: '5.5–8.8 lbs' },
        { size: '0–3 Months', height: '21–24 in', weight: '8.8–13.2 lbs' },
        { size: '3–6 Months', height: '24–27 in', weight: '13.2–17.6 lbs' },
      ],
    },
    colors: [
      {
        name: 'Pastel Honey Oat',
        hex: '#F5E6CC',
        image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Soft Coral Petal',
        hex: '#FFD1CA',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Cloud Sage Green',
        hex: '#D7E3D8',
        image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1000&q=80',
      },
    ],
    sizes: ['Newborn (0-1M)', '0–3 Months', '3–6 Months'],
    defaultImage: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.9,
    reviewCount: 318,
    badge: '100% ORGANIC GOTS',
  },
  {
    id: 'fam-b-02',
    sku: 'FAM-B02-ZIP',
    title: 'Bamboo Thermal 2-Way Zip Sleepsuit',
    subtitle: 'Breathable Stretch with Non-Slip Foot Grips',
    demographic: 'baby',
    ageBracket: 'infant-3-6m',
    priceBDT: 1650,
    priceUSD: 15,
    matchFamilyTag: 'Sibling Nightwear Collection',
    organicCert: 'OEKO-TEX Certified Bamboo-Cotton Blend • Chemical Free',
    developmentalStage: 'Rolling & Sleep Cycle Transition Support',
    fabricDescription:
      'Naturally thermo-regulating bamboo viscose with 2-way inverted safety zip. Keeps baby warm during AC coastal nights while eliminating overnight unswaddling struggles.',
    sizingData: {
      metric: [
        { size: '3–6 Months', height: '62–68 cm', weight: '6.0–8.0 kg' },
        { size: '6–12 Months', height: '69–78 cm', weight: '8.0–10.5 kg' },
        { size: '12–18 Months', height: '79–85 cm', weight: '10.5–12.5 kg' },
      ],
      imperial: [
        { size: '3–6 Months', height: '24–27 in', weight: '13.2–17.6 lbs' },
        { size: '6–12 Months', height: '27–31 in', weight: '17.6–23.1 lbs' },
        { size: '12–18 Months', height: '31–33.5 in', weight: '23.1–27.5 lbs' },
      ],
    },
    colors: [
      {
        name: 'Sky Blue Chambray',
        hex: '#B9D5EC',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Warm Biscuit Buff',
        hex: '#EADBCE',
        image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1000&q=80',
      },
    ],
    sizes: ['3–6 Months', '6–12 Months', '12–18 Months'],
    defaultImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.9,
    reviewCount: 224,
    badge: 'THERMO REGULATING',
  },

  // ================= KIDS =================
  {
    id: 'fam-k-01',
    sku: 'FAM-K01-TRK',
    title: 'Organic Ribbed Active Play Tracksuit',
    subtitle: 'Reinforced Knee Panels for Endless Play',
    demographic: 'kids',
    ageBracket: 'toddler-2-7y',
    priceBDT: 2200,
    priceUSD: 20,
    matchFamilyTag: 'Family Weekend Active Match',
    matchingMembers: [
      {
        role: 'Mom',
        title: 'Women’s Organic Terry Crew & Jogger',
        priceBDT: 3400,
        priceUSD: 30,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      },
      {
        role: 'Dad',
        title: 'Men’s Heavyweight Sunday Terry Set',
        priceBDT: 3600,
        priceUSD: 32,
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80',
      },
    ],
    organicCert: '100% Certified Ring-Spun Organic Cotton Fleece',
    developmentalStage: 'Toddler Motor Exploration & Playground Durability',
    fabricDescription:
      'Double-ply articulated knee patches provide durable scuff resistance on playground tiles. Soft brushed interior ensures itch-free warmth during park outings.',
    sizingData: {
      metric: [
        { size: '2–3 Years', height: '88–96 cm', weight: '12–15 kg', chest: '52 cm' },
        { size: '3–4 Years', height: '97–104 cm', weight: '15–17 kg', chest: '54 cm' },
        { size: '4–5 Years', height: '105–112 cm', weight: '17–20 kg', chest: '57 cm' },
        { size: '6–7 Years', height: '113–122 cm', weight: '20–25 kg', chest: '61 cm' },
      ],
      imperial: [
        { size: '2–3 Years', height: '34–38 in', weight: '26–33 lbs', chest: '20.5 in' },
        { size: '3–4 Years', height: '38–41 in', weight: '33–37 lbs', chest: '21.5 in' },
        { size: '4–5 Years', height: '41–44 in', weight: '37–44 lbs', chest: '22.5 in' },
        { size: '6–7 Years', height: '44–48 in', weight: '44–55 lbs', chest: '24 in' },
      ],
    },
    colors: [
      {
        name: 'Terracotta Coral & Oatmeal',
        hex: '#E07A5F',
        image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Bay Royal Blue & Navy',
        hex: '#175CD3',
        image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1000&q=80',
      },
    ],
    sizes: ['2–3 Years', '3–4 Years', '4–5 Years', '6–7 Years'],
    defaultImage: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.8,
    reviewCount: 190,
    badge: 'KNEE REINFORCED',
  },
  {
    id: 'fam-k-02',
    sku: 'FAM-K02-HOD',
    title: 'Junior Coastal Fleece Kangaroo Hoodie',
    subtitle: 'Safety Cordless 3-Panel Hood with Thumbholes',
    demographic: 'kids',
    ageBracket: 'junior-8-15y',
    priceBDT: 2400,
    priceUSD: 22,
    matchFamilyTag: 'Junior & Dad Weekend Layering',
    organicCert: '85% Organic Cotton, 15% Recycled Fleece',
    developmentalStage: 'School Commutes & Independent Active Wear',
    fabricDescription:
      'Choke-safe cordless hood with integrated cozy thumbhole cuffs and a deep front pocket for study tablets, snacks, and keys.',
    sizingData: {
      metric: [
        { size: '8–10 Years', height: '128–140 cm', weight: '26–34 kg' },
        { size: '10–12 Years', height: '141–152 cm', weight: '34–45 kg' },
        { size: '12–14 Years', height: '153–162 cm', weight: '45–54 kg' },
      ],
      imperial: [
        { size: '8–10 Years', height: '50–55 in', weight: '57–75 lbs' },
        { size: '10–12 Years', height: '55–60 in', weight: '75–99 lbs' },
        { size: '12–14 Years', height: '60–64 in', weight: '99–119 lbs' },
      ],
    },
    colors: [
      {
        name: 'Honey Amber Golden',
        hex: '#F5A623',
        image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Dark Harbor Slate',
        hex: '#222831',
        image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=80',
      },
    ],
    sizes: ['8–10 Years', '10–12 Years', '12–14 Years'],
    defaultImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.9,
    reviewCount: 145,
  },

  // ================= MOM =================
  {
    id: 'fam-m-01',
    sku: 'FAM-M01-DRS',
    title: 'Relaxed Linen-Tencel Nursing-Friendly Midi Dress',
    subtitle: 'Concealed Side Zippers with Deep Pockets',
    demographic: 'mom',
    priceBDT: 3400,
    priceUSD: 30,
    matchFamilyTag: 'Mom & Daughter Coordinated Sunday Dress',
    matchingMembers: [
      {
        role: 'Toddler',
        title: 'Mini Linen Flutter Sun Dress (2–7Y)',
        priceBDT: 1800,
        priceUSD: 16,
        image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
      },
      {
        role: 'Dad',
        title: 'Breathable Linen-Cotton Mandarin Shirt',
        priceBDT: 2400,
        priceUSD: 22,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      },
    ],
    organicCert: 'Sustainable Normandy Linen & Lyocell Blend',
    developmentalStage: 'Maternity to Postpartum Versatile Silhouette',
    fabricDescription:
      'Designed for motherhood in Bangladesh’s warm climate. Seamless hidden vertical side zips allow effortless nursing on the go, while the tiered skirt floats gracefully.',
    sizingData: {
      metric: [
        { size: 'S', height: '155–162 cm', weight: '48–56 kg', chest: '86 cm' },
        { size: 'M', height: '160–168 cm', weight: '57–66 kg', chest: '92 cm' },
        { size: 'L', height: '165–172 cm', weight: '67–76 kg', chest: '98 cm' },
        { size: 'XL', height: '168–178 cm', weight: '77–88 kg', chest: '106 cm' },
      ],
      imperial: [
        { size: 'S', height: '5’1”–5’4”', weight: '106–123 lbs', chest: '34 in' },
        { size: 'M', height: '5’3”–5’6”', weight: '125–145 lbs', chest: '36 in' },
        { size: 'L', height: '5’5”–5’8”', weight: '147–167 lbs', chest: '38.5 in' },
        { size: 'XL', height: '5’6”–5’10”', weight: '170–194 lbs', chest: '41.5 in' },
      ],
    },
    colors: [
      {
        name: 'Warm Terracotta Blush',
        hex: '#F76C5E',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Natural Flax Ecru',
        hex: '#F5E6CC',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    defaultImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.9,
    reviewCount: 285,
    badge: 'NURSING FRIENDLY',
  },

  // ================= DAD =================
  {
    id: 'fam-d-01',
    sku: 'FAM-D01-POL',
    title: 'Breathable Everyday Organic Piqué Polo',
    subtitle: 'Pre-Shrunk 100% Cotton with Natural Horn Buttons',
    demographic: 'dad',
    priceBDT: 2200,
    priceUSD: 20,
    matchFamilyTag: 'Dad & Son Matching Navy Polo',
    matchingMembers: [
      {
        role: 'Toddler',
        title: 'Mini Piqué Polo for Boys (2–7Y)',
        priceBDT: 1350,
        priceUSD: 12,
        image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
      },
    ],
    organicCert: 'Certified Organic Two-Ply Cotton Weave',
    developmentalStage: 'Family Active Outings & Friday Gatherings',
    fabricDescription:
      'Engineered with micro-honeycomb ventilation knitting. Absorbs moisture while holding a crisp collar that does not curl after repeated home washing.',
    sizingData: {
      metric: [
        { size: 'M', height: '168–175 cm', weight: '65–75 kg', chest: '100 cm' },
        { size: 'L', height: '175–182 cm', weight: '76–86 kg', chest: '106 cm' },
        { size: 'XL', height: '180–188 cm', weight: '87–96 kg', chest: '112 cm' },
        { size: '2XL', height: '185–192 cm', weight: '97–108 kg', chest: '118 cm' },
      ],
      imperial: [
        { size: 'M', height: '5’6”–5’9”', weight: '143–165 lbs', chest: '39 in' },
        { size: 'L', height: '5’9”–6’0”', weight: '167–189 lbs', chest: '41.5 in' },
        { size: 'XL', height: '5’11”–6’2”', weight: '191–211 lbs', chest: '44 in' },
        { size: '2XL', height: '6’1”–6’4”', weight: '213–238 lbs', chest: '46.5 in' },
      ],
    },
    colors: [
      {
        name: 'Bay Royal Blue',
        hex: '#175CD3',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Oatmeal Heather',
        hex: '#EADBCE',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      },
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    defaultImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.8,
    reviewCount: 202,
  },

  // ================= MATCHING SETS =================
  {
    id: 'fam-set-01',
    sku: 'FAM-SET-01',
    title: '‘Bengal Festive Holiday’ Matching Family Set',
    subtitle: 'Coordinated Kurta, Saree & Mini Romper Trio',
    demographic: 'matching',
    priceBDT: 6800,
    priceUSD: 62,
    matchFamilyTag: 'Full Family Matching Set (Save ৳1,500)',
    matchingMembers: [
      {
        role: 'Mom',
        title: 'Festive Jamdani Motif Tussar Saree',
        priceBDT: 3200,
        priceUSD: 29,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      },
      {
        role: 'Dad',
        title: 'Handloom Fine Khadi Panjabi Kurta',
        priceBDT: 2400,
        priceUSD: 22,
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      },
      {
        role: 'Toddler',
        title: 'Miniature Kurta & Pyjama Set (2–7Y)',
        priceBDT: 1600,
        priceUSD: 14,
        image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
      },
    ],
    organicCert: 'Handloom Khadi & Silk Artisanal Weave',
    developmentalStage: 'Family Celebration, Eid & Milestone Anniversaries',
    fabricDescription:
      'Handcrafted harmony. Coordinated shades of deep indigo, golden honey, and warm coral woven by master weavers in Chattogram for multi-generational portraits.',
    sizingData: {
      metric: [
        { size: 'Bundle S (Mom S, Dad M, Child 2-3Y)', height: 'Family Trio', weight: 'All Included' },
        { size: 'Bundle M (Mom M, Dad L, Child 4-5Y)', height: 'Family Trio', weight: 'All Included' },
        { size: 'Bundle L (Mom L, Dad XL, Child 6-7Y)', height: 'Family Trio', weight: 'All Included' },
      ],
      imperial: [
        { size: 'Bundle S (Mom S, Dad M, Child 2-3Y)', height: 'Family Trio', weight: 'All Included' },
        { size: 'Bundle M (Mom M, Dad L, Child 4-5Y)', height: 'Family Trio', weight: 'All Included' },
        { size: 'Bundle L (Mom L, Dad XL, Child 6-7Y)', height: 'Family Trio', weight: 'All Included' },
      ],
    },
    colors: [
      {
        name: 'Festive Saffron & Indigo',
        hex: '#F5A623',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
      },
    ],
    sizes: ['Bundle S', 'Bundle M', 'Bundle L'],
    defaultImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 5.0,
    reviewCount: 382,
    badge: 'FAMILY BUNDLE SAVINGS',
  },
]

// Seed data for FamilyHub loyalty milestones
export const SEED_FAMILY_CHILDREN: FamilyLoyaltyChild[] = [
  {
    id: 'ch-01',
    name: 'Aayan',
    birthdate: 'October 14, 2024',
    ageYears: 1,
    stageLabel: 'Toddler Milestone (1st Birthday Approaching)',
    nextMilestone: '1st Birthday Celebration in 30 days',
    voucherCode: 'AAYAN20',
    discountPercent: 20,
  },
  {
    id: 'ch-02',
    name: 'Zoya',
    birthdate: 'June 22, 2021',
    ageYears: 5,
    stageLabel: 'Playground Explorer (Starting Kindergarten)',
    nextMilestone: 'Back-to-School Season Perk',
    voucherCode: 'ZOYA20',
    discountPercent: 20,
  },
]
