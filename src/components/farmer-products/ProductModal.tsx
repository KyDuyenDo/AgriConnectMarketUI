
import { Product } from "@/types"
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {  ArrowLeft } from 'lucide-react-native';
import ValueLabelSelect from "../ui/SelectInput";
import ProductImagePicker from "../ui/ImagePicker";

interface ProductModalProps {
    form?: Partial<Product>;
    setFormValues: (product: Partial<Product>) => void;
    lot?: {
        label: string;
        value: string;
    }[];

    season?: {
        value: string;
        label: string;
    }[];

    handleSubmit: () => void;

    image: File | undefined;
    setImage: (file: File | undefined) => void;

}


export default function ProductModal({ form, setFormValues, lot, season, handleSubmit, image, setImage }: ProductModalProps) {  
    return (
        <ScrollView className="flex-1 mb-16">
            <View className="flex-row items-center p-4 bg-white shadow-sm">
                <TouchableOpacity>
                    <ArrowLeft size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 ml-4">Add Product</Text>
            </View>


            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                {/* --- Phần 1: Season & Lot Selection --- */}
                <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                    <Text className="text-lg font-bold text-gray-800 mb-4">
                        Season & Lot Selection
                    </Text>

                    {/* Select Season */}
                    <View className="mb-4">
                        <Text className="text-sm font-semibold text-gray-600 mb-2">
                            Select Season
                        </Text>
                        <ValueLabelSelect
                            data={season || []}
                            value={form?.season}
                            onSelect={(value) => setFormValues && setFormValues({ ...form, season: value.value as string })}
                        />
                    </View>

                    {/* Select Lot/Batch */}
                    <View>
                        <Text className="text-sm font-semibold text-gray-600 mb-2">
                            Select Lot/Batch
                        </Text>
                        <ValueLabelSelect
                            data={lot || []}
                            value={form?.batch}
                            onSelect={(value) => setFormValues && setFormValues({ ...form, batch: value.value as string })}
                        />
                    </View>
                </View>

                {/* --- Phần 2: Product Information --- */}
                <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                    <Text className="text-lg font-bold text-gray-800 mb-4">
                        Product Information
                    </Text>

                    {/* Product Name */}
                    <View className="mb-4">
                        <Text className="text-sm font-semibold text-gray-600 mb-2">
                            Product Name
                        </Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg p-3 text-base"
                            placeholder="e.g., Organic Roma Tomatoes"
                            placeholderTextColor="#9ca3af"
                            value={form?.name || ''}
                            onChangeText={(text) => setFormValues && setFormValues({ ...form, name: text as string })}
                        />
                    </View>

                    {/* Price & Quantity Row */}
                    <View className="flex-row justify-between mb-4">
                        {/* Price per unit */}
                        <View className="flex-1 mr-2">
                            <Text className="text-sm font-semibold text-gray-600 mb-2">
                                Price per unit
                            </Text>
                            <View className="flex-row items-center border border-gray-300 rounded-lg p-3">
                                <Text className="text-gray-500 mr-2">$</Text>
                                <TextInput
                                    className="flex-1 text-base p-0"
                                    placeholder="0.00"
                                    placeholderTextColor="#9ca3af"
                                    keyboardType="numeric"
                                    value={form?.price || ''}
                                    onChangeText={(text) => setFormValues && setFormValues({ ...form, price: text as string })}
                                />
                            </View>
                        </View>

                        {/* Quantity available */}
                        <View className="flex-1 ml-2">
                            <Text className="text-sm font-semibold text-gray-600 mb-2">
                                Quantity available
                            </Text>
                            <View className="flex-row items-center border border-gray-300 rounded-lg p-3">
                                <TextInput
                                    className="flex-1 text-base p-0"
                                    placeholder="0"
                                    placeholderTextColor="#9ca3af"
                                    keyboardType="numeric"
                                    value={String(form?.quantity || 0)}
                                    onChangeText={(text) => setFormValues && setFormValues({ ...form, quantity: Number(text) })}
                                />
                                <Text className="text-gray-500 ml-2">kg</Text>
                            </View>
                        </View>
                    </View>
                </View>


                <View className="mb-4">
                    <Text className="text-sm font-semibold text-gray-600 mb-2">
                        Product Description
                    </Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg p-3 text-base"
                        placeholder="e.g., 100% organic, fresh from the farm"
                        placeholderTextColor="#9ca3af"
                        value={form?.description || ''}
                        onChangeText={(text) => setFormValues && setFormValues({ ...form, description: text as string })}
                    />
                </View>

                {/* --- Phần 3: Product Images --- */}
                <ProductImagePicker
                    label="Main Photo"
                    initialUrl={form?.image}
                    onChange={(uri) => setFormValues && setFormValues({ ...form, image: uri })}
                    image={image}
                    setImage={setImage}
                />

                {/* button create product */}
                <View className="mt-6">
                    <TouchableOpacity
                        className="bg-orange-500 text-white py-3 rounded-lg shadow-md items-center"
                        onPress={handleSubmit}
                    >
                        <Text className="text-lg font-bold">Save</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </ScrollView>
    )
}