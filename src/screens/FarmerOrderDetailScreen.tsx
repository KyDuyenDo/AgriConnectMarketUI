import { ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/farmer-order-detail/Header';
import { OrderHeader } from '@/components/farmer-order-detail/OrderHeader';
import { OrderTimeline } from '@/components/farmer-order-detail/OrderTimeline';
import { CustomerInfo } from '@/components/farmer-order-detail/CustomerInfo';
import { OrderItems } from '@/components/farmer-order-detail/OrderItems';
import { SpecialInstructions } from '@/components/farmer-order-detail/SpecialInstructions';
import { OrderActions } from '@/components/farmer-order-detail/OrderActions';

const ORDER_DATA = {
    orderNumber: 'Order #ORD-2024-1256',
    placedDate: 'March 15, 2024',
    status: 'pending' as const,
    timeline: [
        {
            title: 'Order Received',
            description: 'Mar 15, 2024 at 9:30 AM',
            status: 'completed' as const,
            icon: 'check' as const
        },
        {
            title: 'Awaiting Confirmation',
            description: 'Waiting for farmer approval',
            status: 'current' as const,
            icon: 'clock' as const
        },
        {
            title: 'Ready for Pickup',
            description: 'Pending',
            status: 'pending' as const,
            icon: 'package' as const
        }
    ],
    customer: {
        name: 'Sarah Chen',
        photo: 'https://static.paraflowcontent.com/public/resource/image/1be67d46-7fda-4b58-8167-2749a33b5a30.jpeg',
        memberSince: 'Regular customer since 2023',
        email: 'sarah.chen@email.com',
        phone: '(555) 123-4567',
        address: ['1234 Oak Street, Apt 5B', 'San Francisco, CA 94102']
    },
    items: [
        {
            image: 'https://static.paraflowcontent.com/public/resource/image/44018837-cc6a-403d-bceb-8fd1635ad412.jpeg',
            name: 'Organic Tomatoes',
            quantity: '2 lbs',
            unitPrice: '4.00/lb',
            total: '8.00',
            badge: 'Organic'
        },
        {
            image: 'https://static.paraflowcontent.com/public/resource/image/995eec73-967a-4ba0-b5e9-28c6ab488d22.jpeg',
            name: 'Butter Lettuce',
            quantity: '1 head',
            unitPrice: '3.50/head',
            total: '3.50',
            badge: 'Organic'
        },
        {
            image: 'https://static.paraflowcontent.com/public/resource/image/7e11328a-72dd-4175-b622-34b9518eecc3.jpeg',
            name: 'Baby Carrots',
            quantity: '1 bunch',
            unitPrice: '4.00/bunch',
            total: '4.00',
            badge: 'Organic'
        }
    ],
    subtotal: '15.50',
    serviceFee: '0.50',
    total: '16.00',
    specialInstructions: '"Please select the ripest tomatoes available. I\'m planning to use them for a salad tonight. Thank you!"'
};

export function FarmerOrderDetailScreen() {
    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#F9FAF9' }}>
            <Header
                onBack={() => console.log('Back')}
                onMenu={() => console.log('Menu')}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="pt-4"
                contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 200 : 180 }}
            >
                <OrderHeader
                    orderNumber={ORDER_DATA.orderNumber}
                    placedDate={ORDER_DATA.placedDate}
                    status={ORDER_DATA.status}
                />

                <OrderTimeline steps={ORDER_DATA.timeline} />

                <CustomerInfo {...ORDER_DATA.customer} />

                <OrderItems
                    items={ORDER_DATA.items}
                    subtotal={ORDER_DATA.subtotal}
                    serviceFee={ORDER_DATA.serviceFee}
                    total={ORDER_DATA.total}
                />

                <SpecialInstructions instructions={ORDER_DATA.specialInstructions} />
            </ScrollView>

            <OrderActions
                onConfirm={() => console.log('Confirm')}
                onMarkReady={() => console.log('Mark Ready')}
                onCall={() => console.log('Call')}
                onMessage={() => console.log('Message')}
                onCancel={() => console.log('Cancel')}
            />
        </SafeAreaView>
    );
}
