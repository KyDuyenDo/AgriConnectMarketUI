import ProductModal from '@/components/farmer-products/ProductModal';
import { useCreateProduct } from '@/hooks/useProducts';
import { Product } from '@/types';
import React, { useState } from 'react';

import { SafeAreaView } from "react-native-safe-area-context"

const Lot = [
    {
        id: 'lot1',
        name: 'Lot 1',
    },
    {
        id: 'lot1',
        name: 'Lot 1',
    }
]
const Season = [
    {
        id: 'season1',
        name: 'Season 1',
    },
    {
        id: 'season2',
        name: 'Season 2',
    }
]



export default function FarmAddProductScreen() {
    const createProduct = useCreateProduct();
    const BKG_COLOR = 'bg-orange-50';
    const [form, setFormValues] = useState<Partial<Product>>({
        id: '',
        name: '',
        batch: '',
        price: '',
        quantity: 0,
        unit: '',
        image: '',
    } as Product);
    const [image, setImage] = useState<File>();

    const handleSubmit = async () => {
        try {
            
            await createProduct.mutateAsync(form);
            // Reset form sau khi tạo thành công
            setFormValues({
                id: '',
                name: '',
                batch: '',
                price: '',
                quantity: 0,
                unit: '',
                image: '',
            });
        } catch (error) {
            console.error("❌ Lỗi tạo sản phẩm:", error);
        }
    }

    return (
        <SafeAreaView className={`flex-1 ${BKG_COLOR}`}>
            <ProductModal 
                form={form} 
                setFormValues={setFormValues} 
                lot={Lot.map((item) => ({ value: item.id, label: item.name }))} 
                season={Season.map((item) => ({ value: item.id, label: item.name }))} 
                handleSubmit={handleSubmit} 
                image={image}
                setImage={setImage}
            />
        </SafeAreaView>
    );
}