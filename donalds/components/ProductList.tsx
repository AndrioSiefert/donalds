import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';

interface Product {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    restaurant: {
        name: string;
    };
}

interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ProductItem product={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
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
        gap: 16,
        paddingHorizontal: 20,
    },
});
