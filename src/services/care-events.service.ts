import apiClient from "@/api/config"
import type { CareEvent, CareEventType, CreateCareEventResponse } from "@/types"

const CareEventService = {
  // Create a new care event
  createCareEvent: async (data: {
    batchId: string
    eventTypeId: string
    payload: string
    occurredAt?: string
  }): Promise<CreateCareEventResponse> => {
    const response = await apiClient.post<{ data: CreateCareEventResponse }>("/api/care-events", {
      ...data,
      occurredAt: data.occurredAt || new Date().toISOString(),
    })
    return response.data.data
  },

  // Get all event types
  getAllEventTypes: async (): Promise<CareEventType[]> => {
    const response = await apiClient.get<{ data: CareEventType[] }>("api/event-types")
    return response.data.data
  },

  // Get care events by batch
  getCareEventsByBatch: async (batchId: string): Promise<CareEvent[]> => {
    // GET/api/product-batches/{batchId}/care-events
    const response = await apiClient.get<{ data: CareEvent[] }>(`/api/product-batches/${batchId}/care-events`)
    return response.data.data
  },
}

export default CareEventService
