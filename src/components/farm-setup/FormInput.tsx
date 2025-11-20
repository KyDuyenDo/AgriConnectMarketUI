import { View, Text, TextInput, TextInputProps } from 'react-native';

interface FormInputProps extends Omit<TextInputProps, 'style'> {
    label: string;
    required?: boolean;
}

export function FormInput({ label, required, ...props }: FormInputProps) {
    return (
        <View className="flex-col gap-1 mb-4">
            <Text className="text-sm font-medium" style={{ color: '#2F3941' }}>
                {label}{required && ' *'}
            </Text>
            <TextInput
                className="text-base border border-solid rounded-[20px] py-3 px-4"
                style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E8EAEB',
                    color: '#1B1F24',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 4,
                    elevation: 1
                }}
                placeholderTextColor="#9DA3A8"
                {...props}
            />
        </View>
    );
}
