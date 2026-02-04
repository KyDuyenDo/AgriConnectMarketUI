import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import CareEventService from "@/services/care-events.service"
import type { CareEventType, CareEvent } from "@/types"
import { CARE_EVENT_KEYS } from "@/constants/queryKeys"

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
      batchId: string
      eventTypeId: string
      payload: string
      occurredAt?: string
      imageFile?: any
    }) => CareEventService.createCareEvent(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CARE_EVENT_KEYS.eventTypes })
      queryClient.invalidateQueries({ queryKey: CARE_EVENT_KEYS.byBatch(data.batch.id) })
    },
  })
}

export const useCareEventsByBatch = (batchId: string) => {
  return useQuery<CareEvent[]>({
    queryKey: CARE_EVENT_KEYS.byBatch(batchId),
    queryFn: () => CareEventService.getCareEventsByBatch(batchId),
    enabled: !!batchId,
  })
}
