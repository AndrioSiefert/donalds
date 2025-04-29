import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface Category {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
}

interface CategoryItemProps {
    category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/categories/${category.id}/products`);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image source={{ uri: category.imageUrl }} style={styles.image} />
            <Text style={styles.text}>{category.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 8,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
    },
});
