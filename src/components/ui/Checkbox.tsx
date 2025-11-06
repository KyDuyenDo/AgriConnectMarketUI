import { Check } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export const Checkbox: React.FC<{
    value: boolean;
    onValueChange: (value: boolean) => void;
    size?: number;
}> = ({ value, onValueChange, size = 6 }) => {
    return (
        <TouchableOpacity
            className={`h-${size} w-${size} items-center justify-center rounded border ${value ? "border-[#4CAF50] bg-[#4CAF50]" : "border-gray-300 bg-white"
              }`}
            onPress={() => onValueChange(!value)}
        >
            {value && <Check size={16} color="white" />}
        </TouchableOpacity>
    );
};