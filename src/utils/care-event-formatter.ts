import { CareEvent } from "@/types"

/* =========================
 * UI MODEL
 * ========================= */
export interface UIPayloadItem {
  label: string
  value: string
  priority?: "primary" | "secondary"
}

export type UIPayload = UIPayloadItem[]

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
export function formatPayloadUI(payloadObj: Record<string, any>): UIPayload {
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
