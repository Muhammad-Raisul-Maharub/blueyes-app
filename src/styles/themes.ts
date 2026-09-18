/**
 * Blu Eyes Design Themes Registry
 * Contains theme tokens for Concept 1 (Atelier) and Concept 2 (District).
 */

export interface ThemeTokens {
  canvas: string
  surface: string
  card: string
  cardSubtle: string
  surfaceElevated: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  accentVolt: string
  actionCobalt: string
  actionCobaltHover: string
  border: string
  borderActive: string
  headerBg: string
}

export const DISTRICT_THEME = {
  fonts: {
    display: "'Syne', sans-serif",
    subheading: "'Space Grotesk', sans-serif",
    body: "'DM Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  dark: {
    canvas: '#090A0E',
    surface: '#13151D',
    card: '#12141C',
    cardSubtle: '#181A24',
    surfaceElevated: '#1B1E2B',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accentVolt: '#CCFF00',
    actionCobalt: '#0047FF',
    actionCobaltHover: '#2A66FF',
    border: '#232738',
    borderActive: '#2A3045',
    headerBg: 'rgba(9, 10, 14, 0.95)',
  } satisfies ThemeTokens,
  light: {
    canvas: '#F4F4F6',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardSubtle: '#F8F9FA',
    surfaceElevated: '#ECEEF2',
    textPrimary: '#080808',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    accentVolt: '#D2F800',
    actionCobalt: '#0047FF',
    actionCobaltHover: '#0037CC',
    border: '#E2E8F0',
    borderActive: '#CBD5E1',
    headerBg: 'rgba(244, 244, 246, 0.95)',
  } satisfies ThemeTokens,
  shadows: {
    hardVolt: '3px 3px 0px 0px #CCFF00',
    hardCobalt: '3px 3px 0px 0px #0047FF',
    hardDark: '3px 3px 0px 0px #080808',
  },
} as const

export const ATELIER_THEME = {
  fonts: {
    serif: "'Playfair Display', Georgia, serif",
    sans: "'Inter', sans-serif",
  },
  dark: {
    canvas: '#0B0C0E',
    card: '#14161B',
    accentBlue: '#4D76FF',
    accentBronze: '#C4A47C',
    textPrimary: '#F5F5F7',
  },
  light: {
    canvas: '#FCF9F8',
    card: '#FFFFFF',
    accentBlue: '#103FEF',
    accentBronze: '#715A3E',
    textPrimary: '#1C1B1B',
  },
} as const

export const INDIGO_THEME = {
  fonts: {
    display: "'Cinzel', 'Noto Serif Bengali', Georgia, serif",
    body: "'Plus Jakarta Sans', 'Hind Siliguri', -apple-system, sans-serif",
  },
  light: {
    canvas: '#F9F6F0',
    surface: '#FFFFFF',
    cardElevated: '#F3ECE2',
    textPrimary: '#26201C',
    textSecondary: '#756A63',
    brandPrimary: '#0A4269',
    highlightAccent: '#B85324',
    border: '#E5DDD0',
    headerBg: 'rgba(249, 246, 240, 0.95)',
  },
  dark: {
    canvas: '#121110',
    surface: '#1B1917',
    cardElevated: '#25221F',
    textPrimary: '#F5EFE8',
    textSecondary: '#A3968C',
    brandPrimary: '#3882B5',
    highlightAccent: '#D96F3D',
    border: '#36312B',
    headerBg: 'rgba(18, 17, 16, 0.95)',
  },
} as const

export const LIFEWEAR_THEME = {
  fonts: {
    display: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'Roboto Mono', 'JetBrains Mono', monospace",
  },
  light: {
    canvas: '#FFFFFF',
    surface: '#F6F7F9',
    card: '#FFFFFF',
    elevatedCard: '#FFFFFF',
    textPrimary: '#111827',
    textSecondary: '#4B5563',
    actionCta: '#004CE8',
    alert: '#D92D20',
    border: '#DCDFE5',
    headerBg: 'rgba(255, 255, 255, 0.96)',
  },
  dark: {
    canvas: '#0E1015',
    surface: '#171A21',
    card: '#1F242D',
    elevatedCard: '#1F242D',
    textPrimary: '#F9FAFB',
    textSecondary: '#9CA3AF',
    actionCta: '#387BFF',
    alert: '#F04438',
    border: '#2A2F3D',
    headerBg: 'rgba(14, 16, 21, 0.96)',
  },
} as const

export const FAMILY_THEME = {
  fonts: {
    display: "'Outfit', sans-serif",
    body: "'Public Sans', sans-serif",
  },
  light: {
    canvas: '#FDFBF8',
    surface: '#FFFFFF',
    surfaceSoft: '#F7EFE5',
    card: '#FFFFFF',
    textPrimary: '#222831',
    textSecondary: '#596573',
    brandAction: '#175CD3',
    accentCoral: '#F76C5E',
    highlightHoney: '#F5A623',
    border: '#EAE3D8',
    borderSoft: '#F2ECE2',
    headerBg: 'rgba(253, 251, 248, 0.95)',
  },
  dark: {
    canvas: '#0E1217',
    surface: '#171D25',
    surfaceSoft: '#212833',
    card: '#171D25',
    textPrimary: '#F3F4F6',
    textSecondary: '#94A3B8',
    brandAction: '#4E8DFF',
    accentCoral: '#FF7E71',
    highlightHoney: '#FDB843',
    border: '#2C3542',
    borderSoft: '#222B37',
    headerBg: 'rgba(14, 18, 23, 0.95)',
  },
} as const

export const GLACIER_THEME = {
  fonts: {
    display: "'Syne', sans-serif",
    subheading: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    specs: "'Space Mono', monospace",
  },
  dark: {
    canvas: '#030712',
    surface: 'rgba(15, 23, 42, 0.65)',
    elevatedCard: 'rgba(30, 41, 59, 0.5)',
    borderCard: 'rgba(56, 189, 248, 0.2)',
    textPrimary: '#F0F9FF',
    textSecondary: '#94A3B8',
    luminescentAccent: '#7DD3FC',
    vibrantAction: '#38BDF8',
    glow: '0 0 25px rgba(125, 211, 252, 0.18)',
    headerBg: 'rgba(3, 7, 18, 0.75)',
  },
  light: {
    canvas: '#F0F9FF',
    surface: '#FFFFFF',
    elevatedCard: '#FFFFFF',
    borderCard: '#BAE6FD',
    textPrimary: '#082F49',
    textSecondary: '#475569',
    action: '#0284C7',
    luminescentAccent: '#0EA5E9',
    glow: '0 4px 20px rgba(14, 165, 233, 0.12)',
    headerBg: 'rgba(240, 249, 255, 0.85)',
  },
} as const

