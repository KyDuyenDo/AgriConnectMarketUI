import { View, Text, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native'; 

const AddNewButton: React.FC = () => {
    return (
        <TouchableOpacity 
            className="flex-row mx-1 items-center justify-center p-2 rounded-lg bg-green-200/80 border border-green-200"
            activeOpacity={0.7}
        >
            <Plus size={18} className="text-green-700 mr-1" />
            <Text className="text-green-700 text-base font-semibold mx-2">
                New
            </Text>
        </TouchableOpacity>
    );
};

export default AddNewButton;