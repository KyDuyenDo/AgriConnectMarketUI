import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { FileText, Upload, Trash2, RefreshCw } from "lucide-react-native";
import { useCertificateManager } from "@/hooks/custom/useCertificateManager";

interface CertificateManagerProps {
    farmId: string;
    certificateUrl?: string;
}

export function CertificateManager({ farmId, certificateUrl }: CertificateManagerProps) {
    const {
        pickImage,
        pickDocument,
        uploadCertificate,
        updateCertificate,
        deleteCertificate,
        isUploading,
        isUpdating,
        isDeleting,
    } = useCertificateManager(farmId);

    const isLoading = isUploading || isUpdating || isDeleting;

    const handlePickAndUpload = async () => {
        Alert.alert(
            "Select Certificate Type",
            "Choose the type of certificate to upload",
            [
                {
                    text: "Image",
                    onPress: async () => {
                        const file = await pickImage();
                        if (file) {
                            if (certificateUrl) {
                                await updateCertificate(file);
                            } else {
                                await uploadCertificate(file);
                            }
                        }
                    },
                },
                {
                    text: "Document (PDF)",
                    onPress: async () => {
                        const file = await pickDocument();
                        if (file) {
                            if (certificateUrl) {
                                await updateCertificate(file);
                            } else {
                                await uploadCertificate(file);
                            }
                        }
                    },
                },
                { text: "Cancel", style: "cancel" },
            ]
        );
    };

    const isImageUrl = (url?: string) => {
        if (!url) return false;
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    };

    return (
        <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
            <Text className="text-lg font-bold text-gray-900 mb-3">
                Certificate Management
            </Text>

            {/* Certificate Preview */}
            {certificateUrl ? (
                <View className="mb-4">
                    {isImageUrl(certificateUrl) ? (
                        <Image
                            source={{ uri: certificateUrl }}
                            className="w-full h-48 rounded-lg"
                            resizeMode="cover"
                        />
                    ) : (
                        <View className="bg-gray-50 p-6 rounded-lg items-center justify-center h-48">
                            <FileText size={48} color="#9ca3af" />
                            <Text className="text-gray-600 mt-2 text-sm">Certificate Document</Text>
                            <Text className="text-gray-400 text-xs mt-1">
                                {certificateUrl.split("/").pop()?.substring(0, 30)}...
                            </Text>
                        </View>
                    )}
                </View>
            ) : (
                <View className="bg-gray-50 p-6 rounded-lg items-center justify-center mb-4">
                    <FileText size={48} color="#d1d5db" />
                    <Text className="text-gray-400 mt-2 text-sm">No certificate uploaded</Text>
                </View>
            )}

            {/* Action Buttons */}
            <View className="flex-row gap-3">
                {certificateUrl ? (
                    <>
                        <TouchableOpacity
                            onPress={handlePickAndUpload}
                            disabled={isLoading}
                            className="flex-1 bg-blue-50 p-4 rounded-xl flex-row items-center justify-center border border-blue-100"
                        >
                            {isUpdating ? (
                                <ActivityIndicator size="small" color="#3b82f6" />
                            ) : (
                                <>
                                    <RefreshCw size={18} color="#3b82f6" style={{ marginRight: 8 }} />
                                    <Text className="text-blue-700 font-semibold">Update</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={deleteCertificate}
                            disabled={isLoading}
                            className="flex-1 bg-red-50 p-4 rounded-xl flex-row items-center justify-center border border-red-100"
                        >
                            {isDeleting ? (
                                <ActivityIndicator size="small" color="#ef4444" />
                            ) : (
                                <>
                                    <Trash2 size={18} color="#ef4444" style={{ marginRight: 8 }} />
                                    <Text className="text-red-700 font-semibold">Delete</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity
                        onPress={handlePickAndUpload}
                        disabled={isLoading}
                        className="flex-1 bg-green-50 p-4 rounded-xl flex-row items-center justify-center border border-green-100"
                    >
                        {isUploading ? (
                            <ActivityIndicator size="small" color="#22c55e" />
                        ) : (
                            <>
                                <Upload size={18} color="#22c55e" style={{ marginRight: 8 }} />
                                <Text className="text-green-700 font-semibold">Upload Certificate</Text>
                            </>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
