import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                Alert.alert('Erro ao registrar', errorData.error || 'Tente novamente');
                return;
            }

            const data = await response.json();
            console.log('✅ Registro concluído:', data);
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            router.push('/login');
        } catch (error) {
            console.error('Erro ao registrar:', error);
            Alert.alert('Erro', 'Erro ao conectar com o servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar Conta</Text>

            <TextInput placeholder='Nome completo' style={styles.input} value={name} onChangeText={setName} />

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

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.loginText}>Já tem conta? Entrar</Text>
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
    loginText: {
        textAlign: 'center',
        color: '#EA1D2C',
        fontSize: 14,
        marginTop: 12,
    },
});
