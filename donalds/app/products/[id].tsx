import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

interface Product {
    id: string;
    name: string;
    description?: string;
    imageUrl: string;
    price: number;
    discountPercentage?: number;
    restaurant?: {
        name: string;
    };
}

export default function ProductDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3000/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
            })
            .catch((err) => {
                console.error('Erro ao buscar produto:', err);
                router.back();
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' color='#EA1D2C' />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.loading}>
                <Text>Produto não encontrado.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>

            {product.restaurant?.name && <Text style={styles.restaurant}>Restaurante: {product.restaurant.name}</Text>}

            {product.description && <Text style={styles.description}>{product.description}</Text>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        color: '#EA1D2C',
        fontWeight: '600',
        marginBottom: 10,
    },
    restaurant: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'justify',
        marginTop: 10,
        color: '#555',
    },
});
