import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Linking, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScanProductScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const navigation = useNavigation();
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission, requestPermission]);

    // Focus listener to pause camera when screen is not focused
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setIsActive(false);
        });
        const subscribe = navigation.addListener('focus', () => {
            setIsActive(true);
        });

        return () => {
            unsubscribe();
            subscribe();
        };
    }, [navigation]);

    if (!hasPermission) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>Camera permission is required to scan products.</Text>
                    <TouchableOpacity onPress={requestPermission} style={styles.button}>
                        <Text style={styles.buttonText}>Request Permission</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openSettings()} style={[styles.button, styles.secondaryButton]}>
                        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Open Settings</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    if (device == null) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>No camera device found.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={isActive}
            />

            {/* Overlay for scanning area */}
            <View style={styles.overlay}>
                <View style={styles.scanFrame} />
                <Text style={styles.scanText}>Align code within frame to scan</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    permissionText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    secondaryButtonText: {
        color: '#007AFF',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'transparent',
        borderRadius: 12,
    },
    scanText: {
        color: 'white',
        marginTop: 20,
        fontSize: 16,
        fontWeight: '500',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        overflow: 'hidden',
    },
});

export default ScanProductScreen;
