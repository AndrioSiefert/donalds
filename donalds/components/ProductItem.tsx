import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

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

interface ProductItemProps {
    product: Product;
}

function calculateDiscountedPrice(product: Product) {
    if (!product.discountPercentage) return product.price;
    return product.price - (product.price * product.discountPercentage) / 100;
}

function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function ProductItem({ product }: ProductItemProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/products/${product.id}`);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.imageUrl }} style={styles.image} />

                {product.discountPercentage ? (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{product.discountPercentage}% OFF</Text>
                    </View>
                ) : null}
            </View>

            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                    {product.name}
                </Text>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>{formatCurrency(calculateDiscountedPrice(product))}</Text>
                    {product.discountPercentage ? (
                        <Text style={styles.oldPrice}>{formatCurrency(product.price)}</Text>
                    ) : null}
                </View>

                {/* Proteção aqui */}
                {product.restaurant?.name && (
                    <Text style={styles.restaurant} numberOfLines={1}>
                        {product.restaurant.name}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        minWidth: 150,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    discountBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#EA1D2C',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 20,
    },
    discountText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    info: {
        gap: 2,
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    price: {
        fontWeight: '700',
        fontSize: 14,
    },
    oldPrice: {
        fontSize: 12,
        color: 'gray',
        textDecorationLine: 'line-through',
    },
    restaurant: {
        fontSize: 12,
        color: 'gray',
    },
});
