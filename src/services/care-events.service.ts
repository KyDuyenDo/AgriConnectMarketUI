import apiClient from "@/api/config"
import { extractResponseData } from "@/api/response-handler"
import type { CareEvent, CareEventType, CreateCareEventResponse } from "@/types"

const CareEventService = {
  createCareEvent: async (data: {
    batchId: string
    eventTypeId: string
    payload: string
    occurredAt?: string
    imageFile?: any // React Native format: {uri, name, type} or File/Blob for web
  }): Promise<CreateCareEventResponse> => {
    const formData = new FormData()
    formData.append("BatchId", data.batchId)
    formData.append("EventTypeId", data.eventTypeId)
    formData.append("Payload", data.payload)

    if (data.occurredAt) {
      formData.append("OccurredAt", data.occurredAt)
    }

    if (data.imageFile) {
      formData.append("ImageUrl", data.imageFile)
    }

    const response = await apiClient.post<any>("/api/care-events", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return extractResponseData<CreateCareEventResponse>(response.data)
  },

  getAllEventTypes: async (): Promise<CareEventType[]> => {
    const response = await apiClient.get<any>("api/event-types")
    const data = extractResponseData<CareEventType[]>(response.data)
    return data || []
  },

  getCareEventsByBatch: async (batchId: string): Promise<CareEvent[]> => {
    try {
      const response = await apiClient.get<any>(`/api/product-batches/${batchId}/care-events/verify`)
      const data = extractResponseData<CareEvent[]>(response.data)
      return data || []
    } catch (error: any) {
      if (error.response?.status === 404 || error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Blockchain verification failed. The care event chain may have been tampered with."
        throw new Error(errorMessage)
      }
      throw error
    }
  },
}

export default CareEventService
