import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRScanner from '../../components/QRScanner';
import { useNavigation } from '@react-navigation/native';

const ScanScreen = () => {
    const navigation = useNavigation();
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(true);

    const handleScan = (data: string) => {
        if (!isScanning) return;
        setIsScanning(false);
        setScannedData(data);
        console.log("Scanned Data:", data);
    };

    const handleScanAgain = () => {
        setScannedData(null);
        setIsScanning(true);
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
                    <Text style={styles.resultTitle}>Scan Result</Text>
                    <Text style={styles.resultText}>{scannedData}</Text>
                    <TouchableOpacity style={styles.scanAgainButton} onPress={handleScanAgain}>
                        <Text style={styles.scanAgainText}>Scan Again</Text>
                    </TouchableOpacity>
                </View>
            )}

            {scannedData && !isScanning && (
                <View style={styles.popup}>
                    <View style={styles.popupContent}>
                        <Text style={styles.popupTitle}>Scanned Data Available</Text>
                        <Text style={styles.popupText} numberOfLines={2}>{scannedData}</Text>
                        <View style={styles.popupActions}>
                            <TouchableOpacity style={styles.popupScanButton} onPress={handleScanAgain}>
                                <Text style={styles.popupScanButtonText}>Scan Again</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    popup: {
        position: 'absolute',
        top: 50, // Adjust based on safe area or header height
        left: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1000,
    },
    popupContent: {
        padding: 16,
    },
    popupTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    popupText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    popupActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    popupScanButton: {
        backgroundColor: '#E8F2FF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    popupScanButtonText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default ScanScreen;
