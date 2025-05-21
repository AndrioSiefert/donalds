import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OrderItem from './components/OrderItem';

interface Order {
    id: string;
    status: string;
    createdAt: string;
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
}

export default function MyOrders() {
    const { token } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:3001/orders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar pedidos');
            }

            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => router.back();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Text style={styles.backText}>{'‹'}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Meus Pedidos</Text>
            </View>

            {loading ? (
                <ActivityIndicator size='large' color='#000' style={{ marginTop: 32 }} />
            ) : orders.length > 0 ? (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <OrderItem order={item} />}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Você não efetuou nenhum pedido.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    backButton: { marginRight: 12 },
    backText: { fontSize: 24 },
    title: { fontSize: 20, fontWeight: 'bold' },
    list: { gap: 12 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#888' },
});
