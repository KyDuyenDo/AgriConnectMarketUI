import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useCareEventsByBatch } from '@/hooks/useCareEvents';
import { formatDate } from '@/utils/date';
import { getEventIconAndColor } from '@/constants/care-event-icons';

interface ActivityTimelineProps {
    batchId?: string;
}

export const ActivityTimeline = ({ batchId }: ActivityTimelineProps) => {
    const { data: events, isLoading } = useCareEventsByBatch(batchId || '');

    if (isLoading) {
        return (
            <View className="px-4 mb-4">
                <Text className="text-[#2D2D2D] text-base font-semibold mb-3">Activity Timeline</Text>
                <ActivityIndicator size="small" color="#4CAF50" />
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

    // Sort events by date descending (newest first)
    const sortedEvents = [...events].sort((a, b) =>
        new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
    );

    return (
        <View className="px-4 mb-4">
            <Text className="text-[#2D2D2D] text-base font-semibold mb-3">Activity Timeline</Text>

            {sortedEvents.map((event) => {
                const eventTypeName = event.eventType?.eventTypeName || 'Unknown';
                const { Icon, bg, iconColor } = getEventIconAndColor(eventTypeName);

                // Parse payload if it's a string
                let description = '';
                let images: string[] = [];
                try {
                    const parsed = typeof event.payload === 'string' ? JSON.parse(event.payload) : event.payload;

                    if (typeof parsed === 'object' && parsed !== null) {
                        description = parsed.notes || parsed.description || parsed.details || '';
                        if (parsed.images && Array.isArray(parsed.images)) {
                            images = parsed.images;
                        }
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
                        iconColor={iconColor}
                        iconBg={bg}
                        title={eventTypeName}
                        date={formatDate(event.occurredAt)}
                        description={description}
                        image={images.length > 0 ? images[0] : undefined}
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
                            source={{ uri: image }}
                            className="w-full h-24 rounded-lg mb-2"
                            resizeMode="cover"
                        />
                    )}
                </View>
            </View>
        </View>
    );
};
