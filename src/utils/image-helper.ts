export type ImageSource = string | { uri?: string; imageUrl?: string } | null | undefined

/**
 * Normalize image URL from various backend response formats
 * Backend may return:
 * - Plain string: "https://..."
 * - Object with uri: { uri: "https://..." }
 * - Object with imageUrl: { imageUrl: "https://..." }
 * - null or undefined
 */
export function normalizeImageUrl(image: ImageSource, fallback = ""): string {
  if (!image) return fallback

  if (typeof image === "string") return image

  if (typeof image === "object") {
    return image.uri || image.imageUrl || fallback
  }

  return fallback
}

/**
 * Get first valid image from array of mixed formats
 */
export function getFirstValidImage(images: ImageSource[], fallback = ""): string {
  if (!Array.isArray(images) || images.length === 0) return fallback

  for (const img of images) {
    const normalized = normalizeImageUrl(img)
    if (normalized) return normalized
  }

  return fallback
}

/**
 * Normalize batch image URLs for display
 */
export function normalizeBatchImages(
  imageUrls: ImageSource[] | undefined,
  fallback = "/placeholder.svg?key=bqz2b",
): string[] {
  if (!Array.isArray(imageUrls)) return [fallback]

  return imageUrls
    .map((url) => normalizeImageUrl(url))
    .filter((url) => !!url)
    .slice(0, 5) // Limit to first 5 images
}
