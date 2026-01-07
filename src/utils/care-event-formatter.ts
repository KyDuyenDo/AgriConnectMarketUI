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
  if (payload.fertilizerType) lines.push(`🌾 Type: ${payload.fertilizerType}`)
  if (payload.amount) lines.push(`⚖️ Amount: ${payload.amount}kg`)
  if (payload.method) lines.push(`🚿 Method: ${payload.method}`)
  if (payload.notes) lines.push(`📝 Notes: ${payload.notes}`)
  return lines.length > 0 ? lines.join("\n") : "Fertilizing completed"
}

function formatPesticide(payload: Record<string, any>): string {
  const lines: string[] = []
  if (payload.pestType) lines.push(`🐛 Pest Type: ${payload.pestType}`)
  if (payload.productName) lines.push(`🧪 Product: ${payload.productName}`)
  if (payload.dosage) lines.push(`⚗️ Dosage: ${payload.dosage}`)
  if (payload.treatmentArea) lines.push(`📍 Area: ${payload.treatmentArea}`)
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
      // Capitalize first letter and convert camelCase to spaces
      const displayKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
      lines.push(`${displayKey}: ${value}`)
    }
  }
  return lines.length > 0 ? lines.join("\n") : "Event details recorded"
}
