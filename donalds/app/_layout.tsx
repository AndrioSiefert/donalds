import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext';

import { useEffect } from 'react';
import { CartProvider } from './context/cart';

export default function RootLayout() {
    useEffect(() => {
        document.title = 'iFood';
    }, []);

    return (
        <AuthProvider>
            <CartProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </CartProvider>
        </AuthProvider>
    );
}
