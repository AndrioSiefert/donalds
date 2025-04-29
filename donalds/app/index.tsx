import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

import Header from '@/components/Header';
import Search from '@/components/Search';
import CategoryList from '@/components/CategoryList';
import PromoBanner from '@/components/PromoBanner';
import ProductList from '@/components/ProductList';
import RestaurantList from '@/components/RestaurantList';

interface Product {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    restaurant: {
        name: string;
    };
}

export default function HomeScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 400;

    useEffect(() => {
        fetch('http://localhost:3000/products') // Substitua pela URL real
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error('Erro ao buscar produtos:', err));
    }, []);

    return (
        <ScrollView>
            <Header />
            <View style={[styles.bannerContainer, isSmallScreen && styles.bannerStack]}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Está com fome?</Text>
                    <Text style={styles.subtitle}>
                        Com apenas alguns cliques, encontre refeições acessíveis perto de você.
                    </Text>
                    <View style={styles.searchBox}>
                        <Search isHomePage />
                    </View>
                </View>

                {!isSmallScreen && (
                    <Image source={require('../assets/images/logo.png')} style={styles.image} resizeMode='contain' />
                )}
            </View>

            <View style={styles.section}>
                <CategoryList />
                <PromoBanner source={require('../assets/images/promo-banner-01.png')} />
                <PromoBanner source={require('../assets/images/promo-banner-02.png')} />
                <ProductList products={products} />
                <RestaurantList />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    bannerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        backgroundColor: '#EA1D2C',
        flexWrap: 'wrap',
    },
    bannerStack: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    subtitle: {
        color: '#FFFFFF',
        marginBottom: 8,
    },
    searchBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        marginTop: 8,
    },
    image: {
        width: 150,
        height: 150,
        marginLeft: 20,
        marginTop: 10,
        alignSelf: 'center',
    },
    section: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});
