import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import CareEventService from '@/services/care-events.service';
import QRScanner from '@/components/QRScanner';

type ScanScreenNavigationProp = NativeStackNavigationProp<CustomerStackParamList, 'ScanScreen'>;

const ScanScreen = () => {
    const navigation = useNavigation<ScanScreenNavigationProp>();
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(true);
    const [processing, setProcessing] = useState(false);

    const handleScan = async (data: string) => {
        if (!isScanning || processing) return;
        setIsScanning(false);
        setScannedData(data);
        setProcessing(true);
        console.log("Scanned Data:", data);

        try {
            // Extract batchId from URL
            // Expected format: .../product/{batchId}/...
            const batchId = data?.split('product/')[1]?.split('/')[0];
            console.log("Batch ID:", batchId);
            if (batchId) {
                // Verify if batch exists or has events (optional, but good for UX)
                // For now, we'll just navigate and let the detail screen fetch data
                // Or we can fetch here to ensure it's valid.
                // The requirement says: "if careEvent can be found then navigate to that screen, otherwise leave a message not found."

                const events = await CareEventService.getCareEventsByBatch(batchId);

                if (events && events.length > 0) {
                    navigation.navigate('CareEventDetail', { batchId });
                    // Reset scanning state after navigation (optional, depending on UX preference)
                    // But usually we want to be ready to scan again when coming back.
                    // For now, we leave it as is, user can press "Scan Again" if they come back.
                } else {
                    Alert.alert("Not Found", "No care events found for this batch.", [
                        { text: "OK", onPress: handleScanAgain }
                    ]);
                }
            } else {
                Alert.alert("Invalid QR Code", "The scanned QR code does not contain a valid batch ID.", [
                    { text: "OK", onPress: handleScanAgain }
                ]);
            }
        } catch (error) {
            console.error("Error processing scan:", error);
            Alert.alert("Error", "An error occurred while processing the scanned data.", [
                { text: "OK", onPress: handleScanAgain }
            ]);
        } finally {
            setProcessing(false);
        }
    };

    const handleScanAgain = () => {
        setScannedData(null);
        setIsScanning(true);
        setProcessing(false);
    };

    return (
        <View style={styles.container}>
            {isScanning ? (
                <QRScanner
                    onScanned={handleScan}
                    onClose={() => navigation.goBack()}
                />
            ) : (
                <View style={styles.resultContainer}>
                    {processing ? (
                        <ActivityIndicator size="large" color="#007AFF" />
                    ) : (
                        <>
                            <Text style={styles.resultTitle}>Scan Result</Text>
                            <Text style={styles.resultText}>{scannedData}</Text>
                            <TouchableOpacity style={styles.scanAgainButton} onPress={handleScanAgain}>
                                <Text style={styles.scanAgainText}>Scan Again</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    resultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    resultTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    resultText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    scanAgainButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
    },
    scanAgainText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ScanScreen;
