import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions } from 'react-native';

import Header from '@/components/Header';
import Search from '@/components/Search';
import CategoryList from '@/components/CategoryList';
import PromoBanner from '@/components/PromoBanner';
import ProductList from '@/components/ProductList';
import RestaurantList from '@/components/RestaurantList';
import { useAuth } from './context/AuthContext';

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
    const { user } = useAuth();

    useEffect(() => {
        fetch('http://localhost:3000/products') 
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error('Erro ao buscar produtos:', err));
    }, []);

    return (
        <ScrollView>
            <Header />

            {user && <Text style={styles.welcome}>Bem-vindo de volta, {user.name?.split(' ')[0]}!</Text>}

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

                {/* {!isSmallScreen && (
                    <Image source={require('../assets/images/logo.png')} style={styles.image} resizeMode='contain' />
                )} */}
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
    welcome: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 2,
        marginBottom: 1,
        paddingHorizontal: 24,
        color: '#444',
    },
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
        marginTop: 5,
        marginBottom: 5

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
