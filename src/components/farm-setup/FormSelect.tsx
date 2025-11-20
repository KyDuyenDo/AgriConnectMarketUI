import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SelectOption {
    label: string;
    value: string;
}

interface FormSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
}

export function FormSelect({ label, value, onChange, options }: FormSelectProps) {
    return (
        <View className="flex-col gap-1 mb-4">
            <Text className="text-sm font-medium" style={{ color: '#2F3941' }}>
                {label}
            </Text>
            <View
                className="border border-solid rounded-[20px] overflow-hidden"
                style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E8EAEB',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 4,
                    elevation: 1
                }}
            >
                <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={{
                        color: '#1B1F24',
                        height: 50
                    }}
                >
                    {options.map((option) => (
                        <Picker.Item
                            key={option.value}
                            label={option.label}
                            value={option.value}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
}
