import { View, Text } from 'react-native';
import { Bike, Timer } from 'lucide-react-native';
import { formatCurrency } from '@/app/utils/price';


interface DeliveryInfoProps {
    restaurant: {
        deliveryFee: number;
        deliveryTimeMinutes: number;
    };
}

export default function DeliveryInfo({ restaurant }: DeliveryInfoProps) {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 24,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: '#F5F5F5',
            }}
        >
            {/* CUSTO */}
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={{ fontSize: 12, color: 'gray' }}>Entrega</Text>
                    <Bike size={14} color='gray' />
                </View>
                <Text style={{ fontSize: 12, fontWeight: '600' }}>
                    {Number(restaurant.deliveryFee) > 0 ? formatCurrency(restaurant.deliveryFee) : 'Grátis'}
                </Text>
            </View>

            {/* TEMPO */}
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={{ fontSize: 12, color: 'gray' }}>Entrega</Text>
                    <Timer size={14} color='gray' />
                </View>
                <Text style={{ fontSize: 12, fontWeight: '600' }}>{restaurant.deliveryTimeMinutes} min</Text>
            </View>
        </View>
    );
}
