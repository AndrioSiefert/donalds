// components/Header.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Mock para autenticação
const user = {
    name: 'João da Silva',
    email: 'joao@email.com',
    image: null,
};

export default function Header() {
    const router = useRouter();

    const handleLogin = () => {
        // Navega para tela de login
        // router.push('/login');
    };

    const handleLogout = () => {
        // Implementar logout
        console.log('Logout...');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode='contain' />

            <View style={styles.right}>
                {user ? (
                    <>
                        <Text style={styles.userName}>Olá, {user.name.split(' ')[0]}</Text>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.logout}>Sair</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.login}>Entrar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        height: 30,
        width: 100,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: '500',
    },
    login: {
        fontSize: 14,
        color: '#EA1D2C',
        fontWeight: '600',
    },
    logout: {
        fontSize: 14,
        color: 'gray',
    },
});
