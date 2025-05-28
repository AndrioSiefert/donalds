import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, StyleSheet } from 'react-native';

interface Restaurant {
    id: string;
    name: string;
    imageUrl: string;
    deliveryFee: number;
    deliveryTimeMinutes: number;
}

export default function SearchResults() {
    const { name } = useLocalSearchParams<{ name: string }>();
    const router = useRouter();
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch(`http://localhost:3000/restaurants/search?name=${encodeURIComponent(name)}`);
                const data = await res.json();
                setRestaurants(data);
            } catch (err) {
                console.error('Erro ao buscar restaurantes:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [name]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color='#EA1D2C' />
            </View>
        );
    }

    if (restaurants.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>Nenhum restaurante encontrado para "{name}"</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={restaurants}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.card} onPress={() => router.push(`/restaurants/${item.id}`)}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.details}>
                            Taxa:{' '}
                            {item.deliveryFee === 0
                                ? 'Grátis'
                                : item.deliveryFee.toLocaleString('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL',
                                  })}
                        </Text>
                        <Text style={styles.details}>Tempo: {item.deliveryTimeMinutes} min</Text>
                    </View>
                </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    listContainer: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        padding: 12,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    details: {
        fontSize: 14,
        color: '#555',
    },
});
