import type { ViewStyle, TextStyle } from "react-native"
import theme from "./theme"

export const createCardStyle = (customStyles?: ViewStyle): ViewStyle => ({
  backgroundColor: theme.colors.neutral.surface,
  borderRadius: theme.radius.md,
  ...theme.shadows.sm,
  borderWidth: 0,
  ...customStyles,
})

export const createButtonStyle = (variant: "primary" | "secondary" | "outline" | "ghost" = "primary"): ViewStyle => {
  const baseStyle = {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    minHeight: 48, // Mobile touch target
  } as ViewStyle

  switch (variant) {
    case "primary":
      return {
        ...baseStyle,
        backgroundColor: theme.colors.primary.main,
      }
    case "secondary":
      return {
        ...baseStyle,
        backgroundColor: theme.colors.secondary.main,
      }
    case "outline":
      return {
        ...baseStyle,
        backgroundColor: "transparent",
        borderWidth: 1.5,
        borderColor: theme.colors.primary.main,
      }
    case "ghost":
      return {
        ...baseStyle,
        backgroundColor: "transparent",
      }
    default:
      return baseStyle
  }
}

export const createStatusBadgeStyle = (status: string): ViewStyle => {
  const statusColors = theme.statusColors[status as keyof typeof theme.statusColors] || {
    bg: theme.colors.neutral.divider,
    text: theme.colors.neutral.text.tertiary,
  }

  return {
    backgroundColor: statusColors.bg,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.full,
  } as ViewStyle
}

export const createHeadingStyle = (size: "h1" | "h2" | "h3" = "h2"): TextStyle => {
  const baseStyle = {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.neutral.text.primary,
  } as TextStyle

  switch (size) {
    case "h1":
      return { ...baseStyle, fontSize: theme.fontSize["4xl"], lineHeight: 32 }
    case "h2":
      return { ...baseStyle, fontSize: theme.fontSize["2xl"], lineHeight: 28 }
    case "h3":
      return { ...baseStyle, fontSize: theme.fontSize.xl, lineHeight: 24 }
    default:
      return baseStyle
  }
}

export const createTextStyle = (variant: "primary" | "secondary" | "tertiary" = "primary"): TextStyle => {
  const baseStyle = {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.normal,
    lineHeight: 20,
  } as TextStyle

  if (variant === "primary") {
    return { ...baseStyle, color: theme.colors.neutral.text.primary }
  }

  if (variant === "secondary") {
    return { ...baseStyle, color: theme.colors.neutral.text.secondary }
  }

  return { ...baseStyle, color: theme.colors.neutral.text.tertiary }
}

export const getStatusBgColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: theme.statusColors.pending.bg,
    in_transit: theme.statusColors.in_transit.bg,
    delivered: theme.statusColors.delivered.bg,
    cancelled: theme.statusColors.cancelled.bg,
    in_stock: theme.statusColors.in_stock.bg,
    out_of_stock: theme.statusColors.out_of_stock.bg,
  }

  return statusMap[status] || theme.colors.neutral.divider
}

export const getStatusTextColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: theme.statusColors.pending.text,
    in_transit: theme.statusColors.in_transit.text,
    delivered: theme.statusColors.delivered.text,
    cancelled: theme.statusColors.cancelled.text,
    in_stock: theme.statusColors.in_stock.text,
    out_of_stock: theme.statusColors.out_of_stock.text,
  }

  return statusMap[status] || theme.colors.neutral.text.secondary
}

// Mobile-optimized card styles for different contexts
export const createListItemStyle = (customStyles?: ViewStyle): ViewStyle => ({
  ...createCardStyle(),
  marginHorizontal: theme.spacing.md,
  marginVertical: theme.spacing.sm,
  padding: theme.spacing.md,
  ...customStyles,
})

export const createFormInputStyle = (hasError = false): ViewStyle => ({
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.md,
  borderRadius: theme.radius.lg,
  borderWidth: 1,
  borderColor: hasError ? theme.colors.status.error : theme.colors.neutral.border,
  backgroundColor: theme.colors.neutral.background,
  minHeight: 48, // Mobile touch target
})

export const createFormLabelStyle = (): TextStyle => ({
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.semibold,
  color: theme.colors.neutral.text.primary,
  marginBottom: theme.spacing.sm,
})
