import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

import Toast from 'react-native-toast-message';

import CartItem from './CartItem';
import { CartContext } from '../app/context/cart';

import { formatCurrency } from '@/app/utils/price';

interface CartProps {
    setIsOpen: (isOpen: boolean) => void;
}

export default function Cart({ setIsOpen }: CartProps) {
    const router = useRouter();
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);

    const { products, subtotalPrice, totalPrice, totalDiscounts, clearCart } = useContext(CartContext);

    const handleFinishOrderClick = async () => {
        setIsConfirmDialogOpen(false);
        setIsSubmitLoading(true);

        // Mock de autenticação e criação de pedido
        const userIsLoggedIn = true; // troque isso depois pelo seu auth real

        if (!userIsLoggedIn) {
            setIsLoginDialogOpen(true);
            setIsSubmitLoading(false);
            return;
        }

        try {
            // Simula criação de pedido
            await new Promise((res) => setTimeout(res, 1000));

            clearCart();
            setIsOpen(false);

            Toast.show({
                type: 'success',
                text1: 'Pedido finalizado com sucesso!',
                text2: 'Você pode acompanhá-lo na tela dos seus pedidos.',
                visibilityTime: 4000,
            });

            router.push('/');
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {products.length > 0 ? (
                <>
                    {products.map((product: any) => (
                        <CartItem key={product.id} cartProduct={product} />
                    ))}

                    <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Subtotal</Text>
                            <Text>{formatCurrency(subtotalPrice)}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Descontos</Text>
                            <Text>- {formatCurrency(totalDiscounts)}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Entrega</Text>
                            <Text>
                                {products[0].restaurant.deliveryFee === 0
                                    ? 'Grátis'
                                    : formatCurrency(products[0].restaurant.deliveryFee)}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={[styles.label, styles.totalLabel]}>Total</Text>
                            <Text style={styles.totalValue}>{formatCurrency(totalPrice)}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => setIsConfirmDialogOpen(true)}
                        disabled={isSubmitLoading}
                    >
                        {isSubmitLoading ? (
                            <ActivityIndicator color='#fff' />
                        ) : (
                            <Text style={styles.confirmText}>Finalizar pedido</Text>
                        )}
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.emptyText}>Sua sacola está vazia.</Text>
            )}

            {/* Modal de Confirmação */}
            <Modal visible={isConfirmDialogOpen} transparent animationType='fade'>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Deseja finalizar seu pedido?</Text>
                        <Text style={styles.modalDescription}>
                            Ao finalizar seu pedido, você concorda com os termos e condições.
                        </Text>

                        <View style={styles.modalButtons}>
                            <Pressable onPress={() => setIsConfirmDialogOpen(false)}>
                                <Text style={styles.cancelButton}>Cancelar</Text>
                            </Pressable>

                            <Pressable onPress={handleFinishOrderClick}>
                                <Text style={styles.finalizeButton}>Finalizar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de Login */}
            <Modal visible={isLoginDialogOpen} transparent animationType='fade'>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Você precisa estar logado para continuar.</Text>
                        <View style={styles.modalButtons}>
                            <Pressable onPress={() => setIsLoginDialogOpen(false)}>
                                <Text style={styles.cancelButton}>Cancelar</Text>
                            </Pressable>
                            <Pressable onPress={() => router.push('/login')}>
                                <Text style={styles.finalizeButton}>Login</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        marginTop: 20,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f4f4f4',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        color: '#666',
        fontSize: 13,
    },
    totalLabel: {
        fontWeight: 'bold',
    },
    totalValue: {
        fontWeight: 'bold',
    },
    confirmButton: {
        marginTop: 20,
        backgroundColor: '#000',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmText: {
        color: '#fff',
        fontWeight: '600',
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'left',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000099',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 24,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    modalDescription: {
        fontSize: 13,
        textAlign: 'center',
        color: '#666',
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    cancelButton: {
        color: 'gray',
        fontWeight: '500',
    },
    finalizeButton: {
        color: '#e60023',
        fontWeight: '600',
    },
});
