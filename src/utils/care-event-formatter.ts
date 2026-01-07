import type { CareEvent } from "@/types"

/**
 * Parses payload JSON string and formats it for display
 */
export function parsePayload(payloadStr: string | undefined): Record<string, any> {
  if (!payloadStr) return {}

  try {
    const parsed = JSON.parse(payloadStr)
    return typeof parsed === "object" ? parsed : { value: parsed }
  } catch {
    // If JSON parse fails, return as plain text object
    return { text: payloadStr }
  }
}

/**
 * Formats care event payload for UI display based on event type
 */
export function formatEventPayload(event: CareEvent): string {
  const payload = parsePayload(event.payload)

  // Handle common event types with custom formatting
  switch (event.eventType?.toLowerCase()) {
    case "watering":
    case "irrigation":
      return formatWatering(payload)
    case "fertilizing":
    case "fertilization":
      return formatFertilizing(payload)
    case "pesticide":
    case "pest control":
    case "pest and disease control":
      return formatPesticide(payload)
    case "harvesting":
    case "harvest":
      return formatHarvesting(payload)
    case "planting":
      return formatPlanting(payload)
    case "weeding":
      return formatWeeding(payload)
    case "disease check":
    case "disease inspection":
      return formatDiseaseCheck(payload)
    case "pruning":
      return formatPruning(payload)
    default:
      return formatGeneric(payload)
  }
}

function formatWatering(payload: Record<string, any>): string {
  const lines: string[] = []
  if (payload.duration) lines.push(`⏱️ Duration: ${payload.duration} mins`)
  if (payload.waterAmount) lines.push(`💧 Water Amount: ${payload.waterAmount}L`)
  if (payload.method) lines.push(`🚰 Method: ${payload.method}`)
  if (payload.notes) lines.push(`📝 Notes: ${payload.notes}`)
  return lines.length > 0 ? lines.join("\n") : "Watering event recorded"
}

function formatFertilizing(payload: Record<string, any>): string {
  const lines: string[] = []
  // Original keys
  if (payload.fertilizerType) lines.push(`🌾 Type: ${payload.fertilizerType}`)
  if (payload.amount) lines.push(`⚖️ Amount: ${payload.amount}kg`)
  if (payload.method) lines.push(`🚿 Method: ${payload.method}`)

  // New keys from screenshot
  if (payload.product_name) lines.push(`🧪 Product: ${payload.product_name}`)
  if (payload.formula) lines.push(`📊 Formula: ${payload.formula}`)
  if (payload["type_(organic/synthetic)"]) lines.push(`🌾 Type: ${payload["type_(organic/synthetic)"]}`)
  if (payload.rate) lines.push(`📏 Rate: ${payload.rate}`)
  if (payload.application_method) lines.push(`🚿 Method: ${payload.application_method}`)
  if (payload.withholding_period) lines.push(`⏳ Withholding Period: ${payload.withholding_period} days`)
  if (payload.supplier) lines.push(`🏭 Supplier: ${payload.supplier}`)

  if (payload.notes) lines.push(`📝 Notes: ${payload.notes}`)
  return lines.length > 0 ? lines.join("\n") : "Fertilizing completed"
}

function formatPesticide(payload: Record<string, any>): string {
  const lines: string[] = []
  // Original keys
  if (payload.pestType) lines.push(`🐛 Pest Type: ${payload.pestType}`)
  if (payload.dosage) lines.push(`⚗️ Dosage: ${payload.dosage}`)
  if (payload.treatmentArea) lines.push(`📍 Area: ${payload.treatmentArea}`)

  // New keys from screenshot
  if (payload["target_pest/disease"]) lines.push(`🎯 Target: ${payload["target_pest/disease"]}`)
  if (payload.product_name) lines.push(`🧪 Product: ${payload.product_name}`)
  if (payload.active_ingredient) lines.push(`⚛️ Active Ingredient: ${payload.active_ingredient}`)
  if (payload.rate) lines.push(`📏 Rate: ${payload.rate}`)
  if (payload.dilution) lines.push(`💧 Dilution: ${payload.dilution}`)
  if (payload["phi_(pre-harvest_interval)"]) lines.push(`⏳ PHI: ${payload["phi_(pre-harvest_interval)"]} days`)
  if (payload["rei_(re-entry_interval)"]) lines.push(`🚫 REI: ${payload["rei_(re-entry_interval)"]} hours`)
  if (payload.application_equipment) lines.push(`🚜 Equipment: ${payload.application_equipment}`)
  if (payload.weather_during_application) lines.push(`☁️ Weather: ${payload.weather_during_application}`)
  if (payload.ppe_confirmation) lines.push(`🛡️ PPE: ${payload.ppe_confirmation}`)

  if (payload.notes) lines.push(`📝 Notes: ${payload.notes}`)
  return lines.length > 0 ? lines.join("\n") : "Pest control treatment applied"
}

function formatHarvesting(payload: Record<string, any>): string {
  const lines: string[] = []
  if (payload.quantityHarvested) lines.push(`📦 Quantity: ${payload.quantityHarvested}kg`)
  if (payload.batchYield) lines.push(`🌾 Batch Yield: ${payload.batchYield}kg`)
  if (payload.quality) lines.push(`⭐ Quality: ${payload.quality}`)
  if (payload.notes) lines.push(`📝 Notes: ${payload.notes}`)
  return lines.length > 0 ? lines.join("\n") : "Harvest recorded"
}

function formatPlanting(payload: Record<string, any>): string {
  const lines: string[] = []
  if (payload.seedVariety) lines.push(`🌱 Variety: ${payload.seedVariety}`)
  if (payload.quantityPlanted) lines.push(`📊 Quantity: ${payload.quantityPlanted}`)
  if (payload.spacing) lines.push(`📏 Spacing: ${payload.spacing}cm`)
  if (payload.notes) lines.push(`📝 Notes: ${payload.notes}`)
  return lines.length > 0 ? lines.join("\n") : "Planting completed"
}

function formatWeeding(payload: Record<string, any>): string {
  const lines: string[] = []
  if (payload.method) lines.push(`🔧 Method: ${payload.method}`)
  if (payload.areaWeeded) lines.push(`📍 Area: ${payload.areaWeeded}`)
  if (payload.notes) lines.push(`📝 Notes: ${payload.notes}`)
  return lines.length > 0 ? lines.join("\n") : "Weeding completed"
}

function formatDiseaseCheck(payload: Record<string, any>): string {
  const lines: string[] = []
  if (payload.diseaseFound) lines.push(`🔍 Disease Found: ${payload.diseaseFound}`)
  if (payload.severity) lines.push(`⚠️ Severity: ${payload.severity}`)
  if (payload.affectedArea) lines.push(`📍 Affected Area: ${payload.affectedArea}`)
  if (payload.recommendation) lines.push(`💡 Recommendation: ${payload.recommendation}`)
  if (payload.notes) lines.push(`📝 Notes: ${payload.notes}`)
  return lines.length > 0 ? lines.join("\n") : "Disease inspection completed"
}

function formatPruning(payload: Record<string, any>): string {
  const lines: string[] = []
  if (payload.pruningType) lines.push(`✂️ Type: ${payload.pruningType}`)
  if (payload.branchesRemoved) lines.push(`🌿 Branches: ${payload.branchesRemoved}`)
  if (payload.notes) lines.push(`📝 Notes: ${payload.notes}`)
  return lines.length > 0 ? lines.join("\n") : "Pruning completed"
}

function formatGeneric(payload: Record<string, any>): string {
  const lines: string[] = []
  for (const [key, value] of Object.entries(payload)) {
    if (value && typeof value !== "object") {
      // Capitalize first letter and convert snake_case/camelCase to spaces
      const displayKey = key
        .replace(/_/g, " ") // snake_case to space
        .replace(/([A-Z])/g, " $1") // camelCase to space
        .replace(/^./, (str) => str.toUpperCase())
        .trim()
      lines.push(`${displayKey}: ${value}`)
    }
  }
  return lines.length > 0 ? lines.join("\n") : "Event details recorded"
}
