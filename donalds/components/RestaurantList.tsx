import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import RestaurantItem from './RestaurantItem';

interface Restaurant {
    id: string;
    name: string;
    imageUrl: string;
    deliveryFee: number;
    deliveryTimeMinutes: number;
}

export default function RestaurantList() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/restaurants')
            .then((res) => res.json())
            .then((data) => {
                console.log('restaurantes carregados:', data);
                setRestaurants(data);
            })
            .catch(console.error);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={restaurants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <RestaurantItem restaurant={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    list: {
        paddingHorizontal: 20,
    },
});
