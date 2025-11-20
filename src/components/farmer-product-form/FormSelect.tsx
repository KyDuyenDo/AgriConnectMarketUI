import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ChevronDown } from 'lucide-react-native';

interface FormSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Array<{ label: string; value: string }>;
    disabled?: boolean;
    placeholder?: string;
}

export function FormSelect({ label, value, onChange, options, disabled, placeholder }: FormSelectProps) {
    return (
        <View className="mb-3">
            <Text className="block mb-2 text-[14px] font-medium" style={{ color: '#5C5C5C' }}>
                {label}
            </Text>
            <View
                className="relative rounded-xl overflow-hidden"
                style={{
                    backgroundColor: disabled ? '#F5F5F5' : '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E8E8E8'
                }}
            >
                <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    enabled={!disabled}
                    style={{
                        color: disabled ? '#8A8A8A' : '#2D2D2D',
                        height: 50
                    }}
                >
                    {placeholder && <Picker.Item label={placeholder} value="" />}
                    {options.map(opt => (
                        <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                    ))}
                </Picker>
                <View className="absolute right-3 top-1/2 pointer-events-none" style={{ transform: [{ translateY: -10 }] }}>
                    <ChevronDown size={20} color="#8A8A8A" />
                </View>
            </View>
        </View>
    );
}
