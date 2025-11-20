import { View, Text, Pressable } from 'react-native';

interface FormActionsProps {
    mode: 'add' | 'edit';
    onSave?: () => void;
    onDelete?: () => void;
    onCancel?: () => void;
}

export function FormActions({ mode, onSave, onDelete, onCancel }: FormActionsProps) {
    return (
        <View className="px-4 pb-4">
            <Pressable
                onPress={onSave}
                className="w-full py-3 px-6 rounded-xl items-center mb-3 active:opacity-80"
                style={{ backgroundColor: '#4CAF50' }}
            >
                <Text className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                    {mode === 'add' ? 'Save Product' : 'Update Product'}
                </Text>
            </Pressable>

            {mode === 'edit' && (
                <Pressable
                    onPress={onDelete}
                    className="w-full py-3 px-6 rounded-xl items-center mb-3 active:opacity-80"
                    style={{ backgroundColor: '#E74C3C' }}
                >
                    <Text className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                        Delete Product
                    </Text>
                </Pressable>
            )}

            <Pressable
                onPress={onCancel}
                className="w-full py-3 px-6 rounded-xl items-center active:opacity-80"
                style={{ backgroundColor: '#FFF5EB' }}
            >
                <Text className="text-sm font-semibold" style={{ color: '#FF8C42' }}>
                    Cancel
                </Text>
            </Pressable>
        </View>
    );
}
