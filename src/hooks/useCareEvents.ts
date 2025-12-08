import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import CareEventService from "@/services/care-events.service"
import type { CareEventType, CareEvent } from "@/types"

const CARE_EVENT_KEYS = {
  eventTypes: ["event-types"] as const,
  careEvents: ["care-events"] as const,
  careEventsByBatch: (batchId: string) => ["care-events", "batch", batchId] as const,
}

export const useEventTypes = () => {
  return useQuery<CareEventType[]>({
    queryKey: CARE_EVENT_KEYS.eventTypes,
    queryFn: () => CareEventService.getAllEventTypes(),
  })
}

export const useCreateCareEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      batchId: string;
      eventTypeId: string;
      payload: string;
      occurredAt?: string;
      imageFile?: any; // React Native compatible: {uri, name, type} or File/Blob
    }) =>
      CareEventService.createCareEvent(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CARE_EVENT_KEYS.eventTypes })
      queryClient.invalidateQueries({ queryKey: CARE_EVENT_KEYS.careEventsByBatch(data.batch.id) })
    },
  })
}

export const useCareEventsByBatch = (batchId: string) => {
  return useQuery<CareEvent[]>({
    queryKey: CARE_EVENT_KEYS.careEventsByBatch(batchId),
    queryFn: () => CareEventService.getCareEventsByBatch(batchId),
    enabled: !!batchId,
  })
}


