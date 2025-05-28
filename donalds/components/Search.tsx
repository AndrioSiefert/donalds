import { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

interface SearchProps {
    isHomePage?: boolean;
}

export function Search({ isHomePage }: SearchProps) {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const handleSearchSubmit = () => {
        const trimmedSearch = search.trim();

        if (!trimmedSearch) {
            Alert.alert('Erro', 'Por favor, digite um nome de restaurante.');
            return;
        }

        router.push(`/restaurants/search/${encodeURIComponent(trimmedSearch)}`);
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Digite o nome do restaurante'
                value={search}
                onChangeText={setSearch}
                style={styles.input}
                placeholderTextColor='#999'
                returnKeyType='search'
                onSubmitEditing={handleSearchSubmit}
            />
            <TouchableOpacity
                onPress={handleSearchSubmit}
                style={[styles.button, isHomePage ? styles.homeButton : styles.defaultButton]}
            >
                <Feather name='search' size={20} color='#fff' />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        gap: 8,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 48,
        backgroundColor: '#fff',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: 12,
        height: 48,
    },
    homeButton: {
        backgroundColor: '#FFB100',
    },
    defaultButton: {
        backgroundColor: '#EA1D2C',
    },
});
