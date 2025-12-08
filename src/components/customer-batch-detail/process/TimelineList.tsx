import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import TimelineItem from "./TimelineItem";
import { formatDate } from "@/utils/date";
import { getEventIconAndColor } from "@/constants/care-event-icons";
import { useEventTypes } from "@/hooks/useCareEvents";

interface TimelineListProps {
  events: any[];
  isLoading?: boolean;
  error?: Error | null;
}

const TimelineList = ({ events, isLoading, error }: TimelineListProps) => {
  const { data: eventTypes } = useEventTypes();

  if (isLoading) {
    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#4CAF50" />
      </View>
    );
  }

  // Handle blockchain verification errors
  if (error) {
    return (
      <View className="py-4">
        <View className="bg-red-50 border border-red-200 rounded-xl p-4">
          <Text className="text-red-600 text-sm font-semibold mb-1">⚠️ Verification Failed</Text>
          <Text className="text-red-500 text-xs">
            {error.message || 'Unable to verify care events. The blockchain may have been tampered with.'}
          </Text>
        </View>
      </View>
    );
  }

  if (!events || events.length === 0) {
    return (
      <View className="py-4">
        <Text className="text-gray-500 text-sm italic">No verified process steps recorded.</Text>
      </View>
    );
  }

  // Create a lookup map for event type details
  const eventTypeMap = new Map(
    eventTypes?.map(et => [et.eventTypeName, et]) || []
  );

  // Sort events by date ascending (oldest first) for process timeline
  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime()
  );

  return (
    <View>
      {sortedEvents.map((event, index) => {
        // eventType is now a string (event type name)
        const eventTypeName = event.eventType || 'Unknown';
        const eventTypeDetails = eventTypeMap.get(eventTypeName);
        const { Icon, bg, iconColor } = getEventIconAndColor(eventTypeName);

        // Parse payload
        let description = '';
        try {
          const parsed = typeof event.payload === 'string' ? JSON.parse(event.payload) : event.payload;
          if (typeof parsed === 'object' && parsed !== null) {
            description = parsed.notes || parsed.description || parsed.details || '';
          } else if (typeof parsed === 'string') {
            description = parsed;
          }
        } catch (e) {
          description = event.payload || '';
        }

        // Fallback to event type description if payload description is empty
        if (!description && eventTypeDetails?.eventTypeDesc) {
          description = eventTypeDetails.eventTypeDesc;
        }

        return (
          <TimelineItem
            key={event.id}
            icon={Icon}
            color={bg} // Use bg for icon background consistency
            iconColor={iconColor}
            title={eventTypeName}
            date={formatDate(event.occurredAt)}
            description={description}
            imageUrl={event.imageUrl} // Use new imageUrl field
            isLast={index === sortedEvents.length - 1}
          />
        );
      })}
    </View>
  );
};

export default TimelineList;
