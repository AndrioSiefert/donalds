import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import CategoryItem from './CategoryItem';

interface Category {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
}

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then((res) => res.json())
            .then(setCategories)
            .catch(console.error);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CategoryItem category={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    list: {
        paddingHorizontal: 20,
    },
});
