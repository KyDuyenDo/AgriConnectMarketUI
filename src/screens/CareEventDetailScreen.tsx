import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert, Image } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CareEventService from '@/services/care-events.service';
import { CareEvent } from '@/types';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import { format } from 'date-fns';
import { useEventTypes } from '@/hooks/useCareEvents';

type CareEventDetailRouteProp = RouteProp<CustomerStackParamList, 'CareEventDetail'>;

const CareEventDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<CareEventDetailRouteProp>();
    const { batchId } = route.params;
    const [events, setEvents] = useState<CareEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { data: eventTypes } = useEventTypes();

    useEffect(() => {
        fetchEvents();
    }, [batchId]);

    const fetchEvents = async () => {
        try {
            setError(null);
            const data = await CareEventService.getCareEventsByBatch(batchId);
            setEvents(data);
        } catch (error: any) {
            console.error("Error fetching care events:", error);
            setError(error.message || "Failed to load care events.");
        } finally {
            setLoading(false);
        }
    };

    const renderEventItem = ({ item }: { item: CareEvent }) => {
        // eventType is now a string
        const eventTypeName = item.eventType || 'Unknown Event';

        // Get event type details for description
        const eventTypeDetails = eventTypes?.find(et => et.eventTypeName === eventTypeName);

        return (
            <View style={styles.eventCard}>
                <View style={styles.eventHeader}>
                    <Text style={styles.eventType}>{eventTypeName}</Text>
                    <Text style={styles.eventDate}>
                        {item.occurredAt ? format(new Date(item.occurredAt), 'dd/MM/yyyy HH:mm') : 'N/A'}
                    </Text>
                </View>
                <Text style={styles.eventPayload}>{JSON.parse(item.payload)}</Text>

                {/* Display image if available */}
                {item.imageUrl && (
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.eventImage}
                        resizeMode="cover"
                    />
                )}

                <Text style={styles.hashText}>Hash: {item.hash?.substring(0, 10)}...</Text>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    // Display blockchain verification error
    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Care Events</Text>
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorTitle}>⚠️ Verification Failed</Text>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Care Events</Text>
            </View>
            {events.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No care events found for this batch.</Text>
                </View>
            ) : (
                <FlatList
                    data={events}
                    renderItem={renderEventItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    listContent: {
        padding: 16,
    },
    eventCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    eventHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    eventType: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    eventDate: {
        fontSize: 14,
        color: '#888',
    },
    eventPayload: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    eventImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    hashText: {
        fontSize: 12,
        color: '#AAA',
        fontFamily: 'monospace',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
    errorContainer: {
        margin: 16,
        backgroundColor: '#FEE',
        borderColor: '#FCC',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
    },
    errorTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#C33',
        marginBottom: 8,
    },
    errorText: {
        fontSize: 14,
        color: '#C55',
    },
});

export default CareEventDetailScreen;
