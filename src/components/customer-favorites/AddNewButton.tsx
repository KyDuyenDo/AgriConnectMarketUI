import { View, Text, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';

const AddNewButton: React.FC = () => {
    return (
        <TouchableOpacity
            className="flex-row items-center justify-center px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(200, 230, 201, 1)' }}
            activeOpacity={0.7}
        >
            <View className="w-4 h-4 items-center justify-center mr-1">
                <Plus size={14} color="#4CAF50" />
            </View>
            <Text className="text-xs font-medium" style={{ color: '#4CAF50' }}>
                New
            </Text>
        </TouchableOpacity>
    );
};

export default AddNewButton;
