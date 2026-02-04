export const theme = {
  colors: {
    primary: {
      main: "#4CAF50", // Fresh Leaf Green
      light: "#E8F5E9", // Very light green for backgrounds
      lighter: "#C8E6C9", // Light green for accents
      dark: "#2E7D32", // Growing Green for text/contrast
    },
    secondary: {
      main: "#FF9800", // Earthy Orange
      light: "#FFF3E0",
      dark: "#F57C00",
    },
    neutral: {
      background: "#F5F5F5", // Off-white background
      surface: "#FFFFFF",
      surfaceAlt: "#FAFAFA",
      text: {
        primary: "#1B1F24", // Dark Charcoal
        secondary: "#6B737A", // Medium Gray
        tertiary: "#9DA3A8", // Light Gray
        inverse: "#FFFFFF",
      },
      border: "#E0E0E0",
      borderLight: "#EEEEEE",
      divider: "#F0F0F0",
    },
    status: {
      success: "#4CAF50",
      error: "#F44336",
      warning: "#FF9800",
      info: "#2196F3",
    },
  },
  statusColors: {
    pending: { bg: "#FFF3E0", text: "#E65100" },
    in_transit: { bg: "#E3F2FD", text: "#1565C0" },
    delivered: { bg: "#E8F5E9", text: "#2E7D32" },
    cancelled: { bg: "#FFEBEE", text: "#C62828" },
    in_stock: { bg: "#E8F5E9", text: "#2E7D32" },
    out_of_stock: { bg: "#FFEBEE", text: "#C62828" },
  },

  // Border Radius - Moderate scale
  radius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },

  // Shadows - Soft & Subtle
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
      shadowRadius: 1,
    },
    sm: {
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    md: {
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    lg: {
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
  },

  // Spacing - Tighter scale (4px base)
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // Typography - Compact
  fontSize: {
    xxs: 10,
    xs: 11,
    sm: 13,
    base: 14,
    lg: 16,
    xl: 18,
    "2xl": 20,
    "3xl": 24,
    "4xl": 30,
  },

  fontWeight: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },

  zIndex: {
    base: 0,
    dropdown: 10,
    modal: 20,
    tooltip: 30,
  },
}

export default theme
