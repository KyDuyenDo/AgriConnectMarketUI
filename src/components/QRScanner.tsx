import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from 'react-native-vision-camera';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const SCAN_FRAME_SIZE = 250;

interface QRScannerProps {
    onScanned: (data: string) => void;
    onClose?: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanned, onClose }) => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const [torch, setTorch] = useState<'on' | 'off'>('off');
    const [isScanned, setIsScanned] = useState(false);

    // Animation for scan line
    const scanLineY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission, requestPermission]);

    useEffect(() => {
        const startAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scanLineY, {
                        toValue: SCAN_FRAME_SIZE,
                        duration: 2000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scanLineY, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: true,
                    })
                ])
            ).start();
        };

        startAnimation();
    }, [scanLineY]);

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (isScanned) return;
            if (codes.length > 0 && codes[0].value) {
                setIsScanned(true);
                onScanned(codes[0].value);
            }
        },
    });

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Camera permission is required</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.buttonText}>Request Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (device == null) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No camera device found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                codeScanner={codeScanner}
                torch={torch}
            />

            {/* Overlay */}
            <View style={styles.overlay}>
                <View style={styles.overlayTop} />
                <View style={styles.overlayCenter}>
                    <View style={styles.overlaySide} />
                    <View style={styles.scanFrame}>
                        {/* Corner Markers */}
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />

                        {/* Animated Scan Line */}
                        <Animated.View
                            style={[
                                styles.scanLine,
                                { transform: [{ translateY: scanLineY }] }
                            ]}
                        />
                    </View>
                    <View style={styles.overlaySide} />
                </View>
                <View style={styles.overlayBottom}>
                    <Text style={styles.instructionText}>Align QR code within the frame</Text>

                    <View style={styles.controls}>
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={() => setTorch(t => t === 'off' ? 'on' : 'off')}
                        >
                            <Ionicons
                                name={torch === 'on' ? "flash" : "flash-off"}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>

                        {onClose && (
                            <TouchableOpacity
                                style={styles.controlButton}
                                onPress={onClose}
                            >
                                <Ionicons name="close" size={24} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    overlayTop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    overlayCenter: {
        flexDirection: 'row',
        height: SCAN_FRAME_SIZE,
    },
    overlaySide: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    scanFrame: {
        width: SCAN_FRAME_SIZE,
        height: SCAN_FRAME_SIZE,
        backgroundColor: 'transparent',
        position: 'relative',
    },
    overlayBottom: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        paddingTop: 40,
    },
    instructionText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 40,
        fontWeight: '500',
    },
    controls: {
        flexDirection: 'row',
        gap: 40,
    },
    controlButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    corner: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderColor: '#00FF00',
        borderWidth: 4,
    },
    topLeft: {
        top: 0,
        left: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
    },
    topRight: {
        top: 0,
        right: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
    },
    scanLine: {
        position: 'absolute',
        width: '100%',
        height: 2,
        backgroundColor: '#00FF00',
        shadowColor: '#00FF00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
});

export default QRScanner;
