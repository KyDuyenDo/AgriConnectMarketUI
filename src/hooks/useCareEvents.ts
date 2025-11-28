import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import CareEventService from "@/services/care-events.service"
import type { CareEventType } from "@/types"

const CARE_EVENT_KEYS = {
  eventTypes: ["event-types"] as const,
  careEvents: ["care-events"] as const,
  careEventsByBatch: (batchId: string) => ["care-events", "batch", batchId] as const,
}

export const useEventTypes = () => {
  return useQuery<CareEventType[]>({
    queryKey: CARE_EVENT_KEYS.eventTypes,
    queryFn: () => CareEventService.getEventTypes(),
  })
}

// Query hook for single event type
export const useEventTypeById = (eventId: string) => {
  return useQuery<CareEventType>({
    queryKey: [...CARE_EVENT_KEYS.eventTypes, eventId],
    queryFn: () => CareEventService.getEventTypeById(eventId),
    enabled: !!eventId,
  })
}

export const useCareEventsByBatch = (batchId: string) => {
  return useQuery({
    queryKey: CARE_EVENT_KEYS.careEventsByBatch(batchId),
    queryFn: () => CareEventService.getCareEventsByBatch(batchId),
    enabled: !!batchId,
  })
}

export const useCreateCareEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { batchId: string; eventTypeId: string; payload: string; occurredAt?: string }) =>
      CareEventService.createCareEvent(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CARE_EVENT_KEYS.eventTypes })
      queryClient.invalidateQueries({ queryKey: CARE_EVENT_KEYS.careEventsByBatch(data.batchId) })
    },
  })
}

// Mutation hook for creating event type
export const useCreateEventType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { typeName: string; typeDesc: string }) => CareEventService.createEventType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARE_EVENT_KEYS.eventTypes })
    },
  })
}

// Mutation hook for deleting event type
export const useDeleteEventType = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (eventId: string) => CareEventService.deleteEventType(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARE_EVENT_KEYS.eventTypes })
    },
  })
}
