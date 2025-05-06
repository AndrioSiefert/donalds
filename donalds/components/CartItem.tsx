import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight, Trash } from 'lucide-react-native';
import { memo, useContext } from 'react';

import { CartContext } from '../app/context/cart';  
import { calculateProductTotalPrice, formatCurrency } from '@/app/utils/price';

interface CartItemProps {
    cartProduct: {
        id: string;
        name: string;
        imageUrl: string;
        price: number;
        discountPercentage: number | null;
        quantity: number;
        restaurant: {
            id: string;
            deliveryFee: number;
            deliveryTimeMinutes: number;
            name: string;
            imageUrl: string;
        };
    };
}

function CartItem({ cartProduct }: CartItemProps) {
    const { decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } = useContext(CartContext);

    return (
        <View style={styles.container}>
            {/* Imagem e detalhes */}
            <View style={styles.leftContainer}>
                <Image source={{ uri: cartProduct.imageUrl }} style={styles.image} />

                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{cartProduct.name}</Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>
                            {formatCurrency(calculateProductTotalPrice(cartProduct) * cartProduct.quantity)}
                        </Text>

                        {cartProduct.discountPercentage ? (
                            <Text style={styles.discounted}>
                                {formatCurrency(cartProduct.price * cartProduct.quantity)}
                            </Text>
                        ) : null}
                    </View>

                    {/* Controles de quantidade */}
                    <View style={styles.quantityControls}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => decreaseProductQuantity(cartProduct.id)}
                        >
                            <ChevronLeft size={16} />
                        </TouchableOpacity>

                        <Text style={styles.quantity}>{cartProduct.quantity}</Text>

                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => increaseProductQuantity(cartProduct.id)}
                        >
                            <ChevronRight size={16} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Botão de remover */}
            <TouchableOpacity onPress={() => removeProductFromCart(cartProduct.id)} style={styles.trashButton}>
                <Trash size={16} />
            </TouchableOpacity>
        </View>
    );
}

export default memo(CartItem, (prev, next) => {
    return prev.cartProduct.quantity === next.cartProduct.quantity;
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    leftContainer: {
        flexDirection: 'row',
        gap: 12,
        flex: 1,
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'space-between',
        gap: 4,
    },
    name: {
        fontSize: 12,
        fontWeight: '500',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    discounted: {
        fontSize: 12,
        textDecorationLine: 'line-through',
        color: '#888',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconButton: {
        height: 28,
        width: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
    },
    quantity: {
        width: 24,
        textAlign: 'center',
        fontSize: 12,
    },
    trashButton: {
        padding: 8,
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 1,
    },
});
