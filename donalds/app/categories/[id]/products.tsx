// app/categories/[id]/products.tsx

import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import ProductItem from '@/components/ProductItem';

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

interface CategoryResponse {
    name: string;
    products: Product[];
}

export default function CategoryProducts() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [category, setCategory] = useState<CategoryResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        const fetchCategoryProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/categories/${id}/products`);
                if (!response.ok) {
                    throw new Error('Categoria não encontrada');
                }
                const data = await response.json();
                setCategory(data);
            } catch (error) {
                console.error('Erro ao buscar categoria:', error);
                router.back();
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#EA1D2C' />
            </View>
        );
    }

    if (!category) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Categoria não encontrada.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{category.name}</Text>

            <FlatList
                data={category.products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ProductItem product={item} />}
                numColumns={2}
                contentContainerStyle={styles.productsList}
                columnWrapperStyle={{ gap: 16 }}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                scrollEnabled={false} // Scroll só do ScrollView, não do FlatList
            />
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
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
    },
    productsList: {
        gap: 16,
    },
});
