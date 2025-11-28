import apiClient from "@/api/config"
import type { CareEvent, CareEventType } from "@/types"

const CareEventService = {
  // Create a new care event
  createCareEvent: async (data: {
    batchId: string
    eventTypeId: string
    payload: string
    occurredAt?: string
  }): Promise<CareEvent> => {
    const response = await apiClient.post<{ data: CareEvent }>("/api/care-events", {
      ...data,
      occurredAt: data.occurredAt || new Date().toISOString(),
    })
    return response.data.data
  },

  getCareEventsByBatch: async (batchId: string): Promise<CareEvent[]> => {
    const response = await apiClient.get<{ data: CareEvent[] }>(`/api/care-events/batch/${batchId}`)
    return response.data.data
  },

  getCareEventById: async (careEventId: string): Promise<CareEvent> => {
    const response = await apiClient.get<{ data: CareEvent }>(`/api/care-events/${careEventId}`)
    return response.data.data
  },

  // Get all event types
  getEventTypes: async (): Promise<CareEventType[]> => {
    const response = await apiClient.get<{ data: CareEventType[] }>("/api/care-event-types")
    return response.data.data
  },

  getAllEventTypes: async (): Promise<CareEventType[]> => {
    const response = await apiClient.get<{ data: CareEventType[] }>("/api/care-event-types")
    return response.data.data
  },

  // Get single event type by ID
  getEventTypeById: async (eventId: string): Promise<CareEventType> => {
    const response = await apiClient.get<{ data: CareEventType }>(`/api/event-types/${eventId}`)
    return response.data.data
  },

  // Create new event type
  createEventType: async (data: {
    typeName: string
    typeDesc: string
  }): Promise<CareEventType> => {
    const response = await apiClient.post<{ data: CareEventType }>("/api/event-types", data)
    return response.data.data
  },

  // Delete event type
  deleteEventType: async (eventId: string): Promise<void> => {
    await apiClient.delete(`/api/event-types/${eventId}`)
  },
}

export default CareEventService
