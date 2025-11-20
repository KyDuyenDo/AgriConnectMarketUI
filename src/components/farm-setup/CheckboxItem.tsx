import { View, Text, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxItemProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export function CheckboxItem({ label, checked, onChange }: CheckboxItemProps) {
    return (
        <Pressable
            onPress={() => onChange(!checked)}
            className="flex-row items-center gap-3 mb-3"
        >
            <View
                className="w-5 h-5 border-2 border-solid rounded-sm items-center justify-center"
                style={{
                    borderColor: '#E8EAEB',
                    backgroundColor: checked ? '#4CAF50' : '#FFFFFF'
                }}
            >
                {checked && <Check size={16} color="#FFFFFF" />}
            </View>
            <Text className="text-base flex-1" style={{ color: '#2F3941' }}>
                {label}
            </Text>
        </Pressable>
    );
}
