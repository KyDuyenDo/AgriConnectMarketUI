// This handler normalizes different response formats from backend

export interface ApiResponse<T> {
  success?: boolean
  isSuccess?: boolean
  data?: T
  value?: T
  message?: string
  errors?: string[]
}

/**
 * Extract data from various API response formats
 * Backend may return:
 * - { success: true, data: {...} }
 * - { isSuccess: true, value: {...} }
 * - { data: {...} }
 */
export function extractResponseData<T>(response: any): T | null {
  if (!response) return null

  // Check for { success: true, data: {...} } format
  if (response.success === true && response.data !== undefined) {
    return response.data
  }

  // Check for { isSuccess: true, value: {...} } format
  if (response.isSuccess === true && response.value !== undefined) {
    return response.value
  }

  // Check for direct { data: {...} } format
  if (response.data !== undefined && !Array.isArray(response.data)) {
    return response.data
  }

  // If data is array, return as is
  if (Array.isArray(response.data)) {
    return response.data as any
  }

  // Default: return whole response as fallback
  return response as T
}

export function isResponseSuccess(response: any): boolean {
  return response?.success === true || response?.isSuccess === true
}

export function getResponseError(response: any): string {
  return response?.message || response?.errors?.[0] || "An error occurred"
}
