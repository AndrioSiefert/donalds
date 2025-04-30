import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/app/context/AuthContext';

export default function Header() {
    const router = useRouter();
    const { user, logout, loading } = useAuth(); 

    if (loading) {
        return null; 
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode='contain' />

            <View style={styles.right}>
                {user ? (
                    <>
                        <Text style={styles.userName} numberOfLines={1}>
                            Olá, {user.name?.split(' ')[0]}
                        </Text>
                        <TouchableOpacity onPress={logout}>
                            <Text style={styles.logout}>Sair</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity onPress={() => router.push('/login')}>
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
        maxWidth: 180,
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
