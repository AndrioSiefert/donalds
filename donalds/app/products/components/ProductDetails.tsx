import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { CartContext } from '../../context/cart';
import DeliveryInfo from '@/components/DeliveryInfo';
import DiscountBadge from '@/components/DiscountBadge';
import ProductList from '@/components/ProductList';

import Cart from '@/components/Cart';

import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { calculateProductTotalPrice, formatCurrency } from '@/app/utils/price';

type Product = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    discountPercentage: number | null;
    restaurantId: string;
    restaurant: {
        id: string;
        name: string;
        imageUrl: string;
        deliveryFee: number;
        deliveryTimeMinutes: number;
    };
};

interface ProductDetailsProps {
    product: Product;
    complementaryProducts: Product[];
    onOpenCart: () => void;
}

export default function ProductDetails({ product, complementaryProducts, onOpenCart }: ProductDetailsProps) {
    const [quantity, setQuantity] = useState(1);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

    const { addProductToCart, products } = useContext(CartContext);

    const addToCart = ({ emptyCart = false }: { emptyCart?: boolean }) => {
        addProductToCart({ product: { ...product, quantity }, emptyCart });
        onOpenCart();
    };

    const handleAddToCartClick = () => {
        const hasDifferentRestaurantProduct = products.some(
            (cartProduct) => cartProduct.restaurant.id !== product.restaurant.id,
        );

        if (hasDifferentRestaurantProduct) {
            return setIsConfirmationDialogOpen(true);
        }

        addToCart({ emptyCart: false });
    };

    return (
        <View style={styles.container}>
            {/* Restaurante */}
            <View style={styles.restaurantRow}>
                <Image source={{ uri: product.restaurant.imageUrl }} style={styles.restaurantImage} />
                <Text style={styles.restaurantName}>{product.restaurant.name}</Text>
            </View>

            {/* Nome */}
            <Text style={styles.title}>{product.name}</Text>

            {/* Preço e quantidade */}
            <View style={styles.priceRow}>
                <View>
                    <Text style={styles.price}>{formatCurrency(calculateProductTotalPrice(product))}</Text>
                    {product.discountPercentage && (
                        <>
                            <DiscountBadge product={product} />
                            <Text style={styles.originalPrice}>De: {formatCurrency(Number(product.price))}</Text>
                        </>
                    )}
                </View>

                <View style={styles.quantityControls}>
                    <TouchableOpacity onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
                        <ChevronLeft />
                    </TouchableOpacity>
                    <Text>{quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity((q) => q + 1)}>
                        <ChevronRight />
                    </TouchableOpacity>
                </View>
            </View>

            <DeliveryInfo restaurant={product.restaurant} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sobre</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sucos</Text>
                <ProductList products={complementaryProducts} />
            </View>

            <TouchableOpacity onPress={handleAddToCartClick} style={styles.addButton}>
                <Text style={styles.addButtonText}>Adicionar à sacola</Text>
            </TouchableOpacity>

            <Modal visible={isConfirmationDialogOpen} transparent animationType='fade'>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Você só pode adicionar itens de um restaurante por vez</Text>
                        <Text style={styles.modalDescription}>
                            Deseja mesmo adicionar esse produto? Isso limpará sua sacola atual.
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setIsConfirmationDialogOpen(false)}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    addToCart({ emptyCart: true });
                                    setIsConfirmationDialogOpen(false);
                                }}
                            >
                                <Text style={{ color: 'red' }}>Esvaziar e adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 20,
    },
    restaurantRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    restaurantImage: {
        height: 24,
        width: 24,
        borderRadius: 12,
    },
    restaurantName: {
        fontSize: 12,
        color: 'gray',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    originalPrice: {
        fontSize: 12,
        color: 'gray',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    addButton: {
        backgroundColor: '#000',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 14,
        color: '#444',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
});
