import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useCareEventsByBatch, useEventTypes } from '@/hooks/useCareEvents';
import { formatDate } from '@/utils/date';
import { getEventIconAndColor } from '@/constants/care-event-icons';

interface ActivityTimelineProps {
    batchId?: string;
}

export const ActivityTimeline = ({ batchId }: ActivityTimelineProps) => {
    const { data: events, isLoading, error } = useCareEventsByBatch(batchId || '');
    const { data: eventTypes } = useEventTypes();

    if (isLoading) {
        return (
            <View className="px-4 mb-4">
                <Text className="text-[#2D2D2D] text-base font-semibold mb-3">Activity Timeline</Text>
                <ActivityIndicator size="small" color="#4CAF50" />
            </View>
        );
    }

    // Handle blockchain verification errors
    if (error) {
        return (
            <View className="px-4 mb-4">
                <Text className="text-[#2D2D2D] text-base font-semibold mb-3">Activity Timeline</Text>
                <View className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    <Text className="text-red-600 text-sm font-semibold mb-1">⚠️ Verification Failed</Text>
                    <Text className="text-red-500 text-xs">
                        {error instanceof Error ? error.message : 'Unable to load care events. The blockchain may have been tampered with.'}
                    </Text>
                </View>
            </View>
        );
    }

    if (!events || events.length === 0) {
        return (
            <View className="px-4 mb-4">
                <Text className="text-[#2D2D2D] text-base font-semibold mb-3">Activity Timeline</Text>
                <Text className="text-[#5C5C5C] text-sm italic">No activities recorded yet.</Text>
            </View>
        );
    }

    // Create a lookup map for event type details
    const eventTypeMap = new Map(
        eventTypes?.map(et => [et.eventTypeName, et]) || []
    );

    // Sort events by date descending (newest first)
    const sortedEvents = [...events].sort((a, b) =>
        new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
    );

    return (
        <View className="px-4 mb-4">
            <Text className="text-[#2D2D2D] text-base font-semibold mb-3">Activity Timeline</Text>

            {sortedEvents.map((event) => {
                // eventType is now a string (event type name)
                const eventTypeName = event.eventType || 'Unknown';
                const eventTypeDetails = eventTypeMap.get(eventTypeName);
                const { Icon, bg, iconColor } = getEventIconAndColor(eventTypeName);

                // Parse payload if it's a string
                let description = '';
                let payloadImages: string[] = [];
                try {
                    // First try standard parse
                    const parsed = typeof event.payload === 'string' ? JSON.parse(event.payload) : event.payload;

                    if (typeof parsed === 'object' && parsed !== null) {
                        description = parsed.notes || parsed.description || parsed.details || '';
                        if (parsed.images && Array.isArray(parsed.images)) {
                            payloadImages = parsed.images;
                        }
                    } else if (typeof parsed === 'string') {
                        description = parsed;
                    }
                } catch (e) {
                    // If simple parse fails, it might be a raw string with unicode escapes that needs double parsing or direct usage
                    // Try to wrap in quotes and parse to decode unicode sequences like \u01B0
                    try {
                        if (typeof event.payload === 'string') {
                            const decoded = JSON.parse(`"${event.payload}"`);
                            description = decoded;
                        } else {
                            description = String(event.payload || '');
                        }
                    } catch (e2) {
                        // Fallback to raw payload
                        description = event.payload || '';
                    }
                }

                // Fallback to event type description if payload description is empty
                if (!description && eventTypeDetails?.eventTypeDesc) {
                    description = eventTypeDetails.eventTypeDesc;
                }

                // Use imageUrl from API if available, otherwise check payload
                const displayImage = event.imageUrl || (payloadImages.length > 0 ? payloadImages[0] : undefined);

                return (
                    <TimelineItem
                        key={event.id}
                        icon={Icon}
                        iconColor={iconColor}
                        iconBg={bg}
                        title={eventTypeName}
                        date={formatDate(event.occurredAt)}
                        description={description}
                        image={displayImage}
                    />
                );
            })}
        </View>
    );
};

const TimelineItem = ({
    icon: Icon,
    iconColor,
    iconBg,
    title,
    date,
    description,
    image
}: {
    icon: any,
    iconColor: string,
    iconBg: string,
    title: string,
    date: string,
    description: string,
    image?: string
}) => {
    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-3">
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1 mr-2">
                    <View className="flex-row items-center mb-2">
                        <View className="w-8 h-8 justify-center items-center rounded-lg mr-3" style={{ backgroundColor: iconBg }}>
                            <Icon size={18} color={iconColor} />
                        </View>
                        <View>
                            <Text className="text-[#2D2D2D] text-sm font-semibold">{title}</Text>
                            <Text className="text-[#5C5C5C] text-xs">{date}</Text>
                        </View>
                    </View>

                    {description ? (
                        <Text className="text-[#5C5C5C] text-xs mb-2 leading-5">{description}</Text>
                    ) : null}

                    {image && (
                        <Image
                            source={{ uri: typeof image === 'string' ? image : (image as any)?.uri || "" }}
                            className="w-full h-24 rounded-lg mb-2"
                            resizeMode="cover"
                        />
                    )}
                </View>
            </View>
        </View>
    );
};
