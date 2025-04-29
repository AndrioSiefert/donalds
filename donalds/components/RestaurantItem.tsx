import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

interface Restaurant {
    id: string;
    name: string;
    imageUrl: string;
    deliveryFee: number;
    deliveryTimeMinutes: number;
}

interface RestaurantItemProps {
    restaurant: Restaurant;
}

function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function RestaurantItem({ restaurant }: RestaurantItemProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/restaurants/${restaurant.id}`);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />

                <View style={styles.ratingBadge}>
                    <Feather name='star' size={12} color='#FFD700' />
                    <Text style={styles.ratingText}>5.0</Text>
                </View>
            </View>

            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                    {restaurant.name}
                </Text>

                <View style={styles.detailsRow}>
                    <View style={styles.detailItem}>
                        <Feather name='truck' size={14} color='#EA1D2C' />
                        <Text style={styles.detailText}>
                            {restaurant.deliveryFee === 0 ? 'Entrega grátis' : formatCurrency(restaurant.deliveryFee)}
                        </Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Feather name='clock' size={14} color='#EA1D2C' />
                        <Text style={styles.detailText}>{restaurant.deliveryTimeMinutes} min</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: 266,
        maxWidth: 266,
    },
    imageContainer: {
        width: '100%',
        height: 136,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 8,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    ratingBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        gap: 2,
    },
    ratingText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    info: {
        gap: 4,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
    },
    detailsRow: {
        flexDirection: 'row',
        gap: 10,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    detailText: {
        fontSize: 12,
        color: 'gray',
    },
});
