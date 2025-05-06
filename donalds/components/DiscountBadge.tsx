import { View, Text } from 'react-native';
import { ArrowDown } from 'lucide-react-native';

interface DiscountBadgeProps {
    product: {
        discountPercentage: number | null;
    };
}

export default function DiscountBadge({ product }: DiscountBadgeProps) {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                backgroundColor: '#000', // ajuste para cor primária do tema
                borderRadius: 999,
                paddingHorizontal: 6,
                paddingVertical: 2,
            }}
        >
            <ArrowDown size={12} color='white' />
            <Text style={{ fontSize: 12, fontWeight: '600', color: 'white' }}>{product.discountPercentage}%</Text>
        </View>
    );
}
