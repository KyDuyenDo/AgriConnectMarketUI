import { useState } from "react";
import { Alert, Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useUploadCertificate, useUpdateCertificate, useDeleteCertificate } from "@/hooks/useFarm";

export const useCertificateManager = (farmId: string) => {
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const uploadMutation = useUploadCertificate();
    const updateMutation = useUpdateCertificate();
    const deleteMutation = useDeleteCertificate();

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["image/*", "application/pdf"],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setSelectedFile(result.assets[0]);
                return result.assets[0];
            }
        } catch (error) {
            console.error("Error picking document:", error);
            Alert.alert("Error", "Failed to pick document");
        }
        return null;
    };

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== "granted") {
                Alert.alert("Permission Denied", "We need camera roll permissions to upload certificates");
                return null;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setSelectedFile(result.assets[0]);
                return result.assets[0];
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "Failed to pick image");
        }
        return null;
    };

    const createCertificateFormData = (file: any): FormData => {
        const formData = new FormData();

        formData.append("FarmId", farmId);

        // Handle both mobile and web file uploads
        if (Platform.OS === "web") {
            formData.append("Certificate", file);
        } else {
            const fileName = file.name || file.uri.split("/").pop();
            const fileType = file.mimeType || "image/jpeg";

            formData.append("Certificate", {
                uri: file.uri,
                name: fileName,
                type: fileType,
            } as any);
        }

        return formData;
    };

    const uploadCertificate = async (file?: any) => {
        const fileToUpload = file || selectedFile;

        if (!fileToUpload) {
            Alert.alert("Error", "Please select a file first");
            return;
        }

        try {
            const formData = createCertificateFormData(fileToUpload);
            await uploadMutation.mutateAsync({ farmId, formData });
            Alert.alert("Success", "Certificate uploaded successfully!");
            setSelectedFile(null);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "Failed to upload certificate";
            Alert.alert("Error", errorMessage);
        }
    };

    const updateCertificate = async (file?: any) => {
        const fileToUpload = file || selectedFile;

        if (!fileToUpload) {
            Alert.alert("Error", "Please select a file first");
            return;
        }

        try {
            const formData = createCertificateFormData(fileToUpload);
            await updateMutation.mutateAsync({ farmId, formData });
            Alert.alert("Success", "Certificate updated successfully!");
            setSelectedFile(null);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "Failed to update certificate";
            Alert.alert("Error", errorMessage);
        }
    };

    const deleteCertificate = async () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this certificate?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteMutation.mutateAsync(farmId);
                            Alert.alert("Success", "Certificate deleted successfully!");
                        } catch (error: any) {
                            const errorMessage = error?.response?.data?.message || "Failed to delete certificate";
                            Alert.alert("Error", errorMessage);
                        }
                    },
                },
            ]
        );
    };

    return {
        selectedFile,
        pickDocument,
        pickImage,
        uploadCertificate,
        updateCertificate,
        deleteCertificate,
        isUploading: uploadMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};
