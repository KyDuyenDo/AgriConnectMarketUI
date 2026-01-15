import { CareEvent } from "@/types"

/* =========================
 * UI MODEL
 * ========================= */
export interface UIPayloadItem {
  label: string
  value: string
  priority?: "primary" | "secondary"
}

export type UIPayload = UIPayloadItem[] | string

/* =========================
 * NORMALIZE PAYLOAD
 * ========================= */
export function normalizePayload(payloadStr?: string): Record<string, any> {
  if (!payloadStr) return {}

  try {
    let parsed: any = JSON.parse(payloadStr)
    const inner = parsed.Value ?? parsed.value

    if (typeof inner === "string") {
      try {
        parsed = { ...parsed, ...JSON.parse(inner) }
      } catch {
        parsed.text = inner
      }
    }

    if (typeof inner === "object" && inner !== null) {
      parsed = { ...parsed, ...inner }
    }

    delete parsed.Value
    delete parsed.value

    return parsed
  } catch {
    return { text: payloadStr }
  }
}

/* =========================
 * AUTOMATIC FORMATTER
 * ========================= */
export function formatPayloadUI(payloadObj: any): UIPayload {
  if (
    typeof payloadObj !== "object" ||
    payloadObj === null ||
    Array.isArray(payloadObj)
  ) {
    // Return string directly for simple values
    return String(payloadObj)
  }

  // Special handling: if object has only one key "text" which was likely created by normalizePayload catch block
  if (Object.keys(payloadObj).length === 1 && payloadObj.text && typeof payloadObj.text === 'string') {
    return payloadObj.text
  }

  return Object.entries(payloadObj)
    .map(([key, value]) => ({
      label: prettifyKey(key),
      value: value !== null && value !== undefined ? String(value) : "",
    }))
    .filter(item => item.value !== "")
}



export function formatEventPayload(event: CareEvent): UIPayload {
  const normalized = normalizePayload(event.payload)
  return formatPayloadUI(normalized)
}

/* =========================
 * HELPERS
 * ========================= */
function prettifyKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\//g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, s => s.toUpperCase())
    .trim()
}
