import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRScanner from '../../components/QRScanner';
import { useNavigation } from '@react-navigation/native';

const ScanScreen = () => {
    const navigation = useNavigation();
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(true);

    const handleScan = (data: string) => {
        setIsScanning(false);
        setScannedData(data);
        Alert.alert(
            "Product Scanned",
            `Value: ${data}`,
            [
                {
                    text: "Scan Again",
                    onPress: () => {
                        setScannedData(null);
                        setIsScanning(true);
                    }
                },
                {
                    text: "OK",
                    onPress: () => {
                        // Navigate to product details or handle data
                        console.log("Scanned:", data);
                    }
                }
            ]
        );
    };

    if (isScanning) {
        return (
            <QRScanner
                onScanned={handleScan}
                onClose={() => navigation.goBack()}
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Scan Result</Text>
                <Text style={styles.resultText}>{scannedData}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setIsScanning(true)}
                >
                    <Text style={styles.buttonText}>Scan Another Code</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    resultText: {
        fontSize: 18,
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ScanScreen;
