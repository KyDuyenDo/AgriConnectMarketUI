import { colors } from "@/constants/colors"

export const theme = {
  colors: {
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
      lighter: colors.primaryLighter,
      dark: colors.primaryDark,
    },
    secondary: {
      main: colors.secondary,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
    },
    neutral: {
      background: colors.background,
      surface: colors.surface,
      surfaceAlt: colors.surfaceAlt,
      text: {
        primary: colors.text,
        secondary: colors.textSecondary,
        tertiary: colors.textTertiary,
        inverse: colors.textInverse,
      },
      border: colors.border,
      borderLight: colors.borderLight,
      divider: colors.divider,
    },
    status: {
      success: colors.success,
      error: colors.error,
      warning: colors.warning,
      info: colors.info,
    },
  },

  // Border Radius - Consistent mobile scale
  radius: {
    none: 0,
    xs: 4, // Minimal rounding
    sm: 8, // Small elements
    md: 12, // Medium cards
    lg: 16, // Large sections
    xl: 20, // Extra large
    full: 9999, // Fully rounded
  },

  // Shadows - iOS & Android compatible
  shadows: {
    none: {
      elevation: 0,
      shadowColor: "transparent",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    xs: {
      elevation: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1.5,
    },
    sm: {
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
    },
    md: {
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
    },
    lg: {
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
    },
  },

  // Spacing - 4px base unit (mobile-friendly)
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // Typography for mobile
  fontSize: {
    xs: 12,
    sm: 13,
    base: 14,
    lg: 16,
    xl: 18,
    "2xl": 20,
    "3xl": 24,
    "4xl": 28,
  },

  fontWeight: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },

  // Status color mapping
  statusColors: {
    pending: { bg: "#fef3c7", text: "#92400e" },
    in_transit: { bg: "#fed7aa", text: "#92400e" },
    delivered: { bg: "#dcfce7", text: "#166534" },
    cancelled: { bg: "#fee2e2", text: "#991b1b" },
    in_stock: { bg: "#dcfce7", text: "#166534" },
    out_of_stock: { bg: "#f1f5f9", text: "#64748b" },
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 10,
    modal: 20,
    popover: 30,
    tooltip: 40,
    notification: 50,
  },
}

// Helper functions
export const getStatusColors = (status: string) => {
  return theme.statusColors[status as keyof typeof theme.statusColors] || { bg: "#f1f5f9", text: "#64748b" }
}

export const getShadowStyle = (level: "xs" | "sm" | "md" | "lg" = "md") => {
  return theme.shadows[level]
}

export default theme
