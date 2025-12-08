import apiClient from "@/api/config"
import type { CareEvent, CareEventType, CreateCareEventResponse } from "@/types"

const CareEventService = {
  // Create a new care event with optional image upload
  createCareEvent: async (data: {
    batchId: string
    eventTypeId: string
    payload: string
    occurredAt?: string
    imageFile?: any // React Native format: {uri, name, type} or File/Blob for web
  }): Promise<CreateCareEventResponse> => {
    // Use FormData for multipart/form-data upload
    const formData = new FormData()
    formData.append("BatchId", data.batchId)
    formData.append("EventTypeId", data.eventTypeId)
    formData.append("Payload", data.payload)

    // Add image if provided
    if (data.imageFile) {
      formData.append("ImageUrl", data.imageFile)
    }

    console.log("FormData:", formData)

    const response = await apiClient.post<{ data: CreateCareEventResponse }>("/api/care-events", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    return response.data.data
  },

  // Get all event types
  getAllEventTypes: async (): Promise<CareEventType[]> => {
    const response = await apiClient.get<{ data: CareEventType[] }>("api/event-types")
    return response.data.data
  },

  // Get care events by batch - uses verify endpoint
  getCareEventsByBatch: async (batchId: string): Promise<CareEvent[]> => {
    try {
      const response = await apiClient.get<{ data: CareEvent[] }>(
        `/api/product-batches/${batchId}/care-events/verify`
      )
      return response.data.data
    } catch (error: any) {
      // Handle blockchain verification failure
      if (error.response?.status === 404 || error.response?.status === 400) {
        const errorMessage = error.response?.data?.message ||
          error.response?.data?.error ||
          "Blockchain verification failed. The care event chain may have been tampered with."
        throw new Error(errorMessage)
      }
      // Re-throw other errors
      throw error
    }
  },
}

export default CareEventService
