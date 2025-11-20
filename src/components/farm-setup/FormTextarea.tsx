import { View, Text, TextInput, TextInputProps } from 'react-native';

interface FormTextareaProps extends Omit<TextInputProps, 'style' | 'multiline'> {
    label: string;
    rows?: number;
}

export function FormTextarea({ label, rows = 4, ...props }: FormTextareaProps) {
    return (
        <View className="flex-col gap-1 mb-4">
            <Text className="text-sm font-medium" style={{ color: '#2F3941' }}>
                {label}
            </Text>
            <TextInput
                multiline
                numberOfLines={rows}
                className="text-base border border-solid rounded-[20px] py-3 px-4"
                style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E8EAEB',
                    color: '#1B1F24',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 4,
                    elevation: 1,
                    textAlignVertical: 'top',
                    minHeight: rows * 24
                }}
                placeholderTextColor="#9DA3A8"
                {...props}
            />
        </View>
    );
}
