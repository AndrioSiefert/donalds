import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';


export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            return Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        }

        await login(email, password);
        router.push('/'); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entrar</Text>

            <TextInput
                placeholder='E-mail'
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                keyboardType='email-address'
            />

            <TextInput
                placeholder='Senha'
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 32,
        textAlign: 'center',
        color: '#EA1D2C',
    },
    input: {
        height: 48,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#EA1D2C',
        paddingVertical: 14,
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    registerText: {
        textAlign: 'center',
        color: '#EA1D2C',
        fontSize: 14,
        marginTop: 12,
    },
});
