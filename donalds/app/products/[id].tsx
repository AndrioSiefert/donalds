import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet, Text, Modal } from 'react-native';

import ProductImage from './components/ProductImage';
import ProductDetails from './components/ProductDetails';
import ProductList from '@/components/ProductList';
import Cart from '@/components/Cart';

type Product = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    discountPercentage: number | null;
    restaurantId: string;
    restaurant: {
        id: string;
        name: string;
        imageUrl: string;
        deliveryFee: number;
        deliveryTimeMinutes: number;
    };
};

export default function ProductDetailPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const [product, setProduct] = useState<Product | null>(null);
    const [complementaryProducts, setComplementaryProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3000/products/${id}`);
                const data = await res.json();
                if (!data?.id) throw new Error('Produto não encontrado');
                setProduct(data);

                const compRes = await fetch(
                    `http://localhost:3000/products/complementary?restaurantId=${data.restaurant.id}`,
                );

                if (!compRes.ok) {
                    console.warn('Erro ao buscar complementares:', await compRes.text());
                    setComplementaryProducts([]);
                    return;
                }

                const compData = await compRes.json();

                if (!Array.isArray(compData)) {
                    console.warn('Resposta inesperada de complementares:', compData);
                    setComplementaryProducts([]);
                    return;
                }

                setComplementaryProducts(compData.sort(() => Math.random() - 0.74));
            } catch (err) {
                console.error('Erro no carregamento do produto:', err);
                router.back();
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
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
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <ProductImage product={product} />

                <ProductDetails
                    product={product}
                    complementaryProducts={complementaryProducts}
                    onOpenCart={() => setIsCartOpen(true)}
                />

                <View style={{ marginTop: 32 }}>
                    <ProductList products={complementaryProducts} />
                </View>
            </ScrollView>

            <Modal visible={isCartOpen} animationType='slide'>
                <Cart setIsOpen={setIsCartOpen} />
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        paddingBottom: 24,
    },
});
