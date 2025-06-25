import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import ProductItem from '@/components/ProductItem';

interface Restaurant {
    id: string;
    name: string;
    imageUrl: string;
    deliveryFee: number;
    deliveryTimeMinutes: number;
    products: Product[];
}

interface Product {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    discountPercentage?: number;
    restaurant?: {
        name: string;
    };
}

export default function RestaurantDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        const fetchRestaurant = async () => {
            try {
                const response = await fetch(`http://localhost:3000/restaurants/${id}`);
                if (!response.ok) {
                    throw new Error('Restaurante não encontrado');
                }
                const data = await response.json();
                setRestaurant(data);
            } catch (error) {
                console.error('Erro ao buscar restaurante:', error);
                router.back();
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#EA1D2C' />
            </View>
        );
    }

    if (!restaurant) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Restaurante não encontrado.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={router.back} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Voltar</Text>
            </TouchableOpacity>

            <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{restaurant.name}</Text>
                <Text style={styles.delivery}>
                    Taxa de entrega:{' '}
                    {restaurant.deliveryFee === 0
                        ? 'Grátis'
                        : restaurant.deliveryFee.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                          })}
                </Text>
                <Text style={styles.delivery}>Tempo de entrega: {restaurant.deliveryTimeMinutes} min</Text>
            </View>

            <View style={styles.productsContainer}>
                <Text style={styles.productsTitle}>Produtos</Text>
                <FlatList
                    data={restaurant.products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ProductItem product={item} />}
                    numColumns={2}
                    contentContainerStyle={styles.productsList}
                    columnWrapperStyle={{ gap: 16 }}
                    ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 12,
        marginTop: 40,
        marginLeft: 16,
        alignSelf: 'flex-start',
    },
    backButtonText: {
        fontSize: 16,
        color: '#EA1D2C',
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
    },
    infoContainer: {
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 8,
    },
    delivery: {
        fontSize: 16,
        color: 'gray',
    },
    productsContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    productsTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
    },
    productsList: {
        gap: 16,
    },
});
