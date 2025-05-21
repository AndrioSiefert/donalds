import { View, Text, Image, StyleSheet, Pressable, FlatList } from 'react-native';

import { useRouter } from 'expo-router';
import { formatCurrency } from '@/app/utils/price';
import { useCart } from '@/app/hooks/useCart';

interface OrderItemProps {
    order: {
        id: string;
        createdAt: string;
        status: string;
        totalPrice: number;
        restaurantId: string;
        restaurant: {
            id: string;
            name: string;
            imageUrl: string;
            deliveryFee: number;
            deliveryTimeMinutes: number;
        };
        products: {
            quantity: number;
            product: {
                id: string;
                name: string;
                imageUrl: string;
                price: number;
                discountPercentage: number;
            };
        }[];
    };
}

export default function OrderItem({ order }: OrderItemProps) {
    const router = useRouter();
    const { addProductToCart } = useCart();
    const status = getOrderStatusLabel(order.status);

    const handleRedoOrder = () => {
        for (const item of order.products) {
            addProductToCart({
                product: {
                    ...item.product,
                    quantity: item.quantity,
                    restaurant: order.restaurant,
                },
            });
        }
        router.push(`/restaurants/${order.restaurantId}`);
    };

    const formattedDate = new Date(order.createdAt).toLocaleString('pt-BR');

    return (
        <View style={styles.card}>
            <View style={styles.statusRow}>
                <Text style={[styles.statusBadge, order.status !== 'COMPLETED' && styles.statusBadgeActive]}>
                    {status}
                </Text>
                <Text style={styles.dateText}>{formattedDate}</Text>
            </View>

            <View style={styles.restaurantRow}>
                <Image source={{ uri: order.restaurant.imageUrl }} style={styles.avatar} />
                <Text style={styles.restaurantName}>{order.restaurant.name}</Text>
            </View>

            <View style={styles.separator} />

            <FlatList
                data={order.products}
                scrollEnabled={false}
                keyExtractor={(item) => item.product.id}
                renderItem={({ item }) => (
                    <View style={styles.productRow}>
                        <View style={styles.quantityCircle}>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                        </View>
                        <Text style={styles.productName}>{item.product.name}</Text>
                    </View>
                )}
            />

            <View style={styles.separator} />

            <View style={styles.footerRow}>
                <Text style={styles.totalText}>Total: {formatCurrency(order.totalPrice)}</Text>

                <Pressable
                    disabled={order.status !== 'COMPLETED'}
                    onPress={handleRedoOrder}
                    style={({ pressed }) => [
                        styles.redoButton,
                        order.status !== 'COMPLETED' && styles.redoDisabled,
                        pressed && order.status === 'COMPLETED' && { opacity: 0.7 },
                    ]}
                >
                    <Text style={styles.redoButtonText}>Refazer pedido</Text>
                </Pressable>
            </View>
        </View>
    );
}

const getOrderStatusLabel = (status: string) => {
    switch (status) {
        case 'CANCELED':
            return 'Cancelado';
        case 'COMPLETED':
            return 'Finalizado';
        case 'CONFIRMED':
            return 'Confirmado';
        case 'DELIVERING':
            return 'Em Transporte';
        case 'PREPARING':
            return 'Preparando';
        default:
            return status;
    }
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    statusBadge: {
        backgroundColor: '#eee',
        color: '#666',
        fontSize: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        fontWeight: '600',
    },
    statusBadgeActive: {
        backgroundColor: '#22c55e',
        color: '#fff',
    },
    dateText: {
        fontSize: 12,
        color: '#777',
    },
    restaurantRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
    },
    restaurantName: {
        fontSize: 14,
        fontWeight: '600',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    quantityCircle: {
        width: 20,
        height: 20,
        backgroundColor: '#888',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    quantityText: {
        color: '#fff',
        fontSize: 10,
    },
    productName: {
        fontSize: 12,
        color: '#555',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    redoButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#22c55e',
        borderRadius: 4,
    },
    redoButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    redoDisabled: {
        backgroundColor: '#ccc',
    },
});
