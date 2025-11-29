import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import TimelineItem from "./TimelineItem";
import { useCareEventsByBatch } from "@/hooks/useCareEvents";
import { formatDate } from "@/utils/date";
import { getEventIconAndColor } from "@/constants/care-event-icons";

interface TimelineListProps {
  batchId?: string;
}

const TimelineList = ({ batchId }: TimelineListProps) => {
  const { data: events, isLoading } = useCareEventsByBatch(batchId || '');

  if (isLoading) {
    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#4CAF50" />
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

  // Sort events by date ascending (oldest first) for process timeline
  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime()
  );

  return (
    <View>
      {sortedEvents.map((event, index) => {
        const eventTypeName = event.eventType?.eventTypeName || 'Unknown';
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
        if (!description && event.eventType?.eventTypeDesc) {
          description = event.eventType.eventTypeDesc;
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
            isLast={index === sortedEvents.length - 1}
          />
        );
      })}
    </View>
  );
};

export default TimelineList;
