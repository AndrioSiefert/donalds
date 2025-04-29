import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

interface SearchProps {
    isHomePage?: boolean;
}

export default function Search({ isHomePage }: SearchProps) {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSubmit = () => {
        if (!search) return;
        router.push(`/restaurants?search=${encodeURIComponent(search)}`);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, isHomePage ? styles.inputHome : styles.inputOther]}
                placeholder='Buscar restaurantes'
                value={search}
                onChangeText={setSearch}
                returnKeyType='search'
                onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Feather name='search' size={20} color='#fff' />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
    },
    inputHome: {
        backgroundColor: '#fff',
    },
    inputOther: {
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#EA1D2C',
        padding: 10,
        borderRadius: 8,
    },
});
