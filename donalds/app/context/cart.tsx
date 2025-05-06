import React, { createContext, useState, ReactNode } from 'react';
import { calculateProductTotalPrice } from '../utils/price';

// Tipo sem Prisma
export interface CartProduct {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    discountPercentage: number | null;
    restaurant: {
        id: string;
        deliveryFee: number;
        deliveryTimeMinutes: number;
        name: string;
        imageUrl: string;
    };
    quantity: number;
}

interface ICartContext {
    products: CartProduct[];
    subtotalPrice: number;
    totalPrice: number;
    totalDiscounts: number;
    totalQuantity: number;
    addProductToCart: (args: { product: CartProduct; emptyCart?: boolean }) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProductFromCart: (productId: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
    products: [],
    subtotalPrice: 0,
    totalPrice: 0,
    totalDiscounts: 0,
    totalQuantity: 0,
    addProductToCart: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    removeProductFromCart: () => {},
    clearCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<CartProduct[]>([]);

    const subtotalPrice = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

    const deliveryFee = Number(products?.[0]?.restaurant?.deliveryFee || 0);

    const totalPrice =
        products.reduce((acc, p) => {
            return acc + calculateProductTotalPrice(p) * p.quantity;
        }, 0) + deliveryFee;

    const totalQuantity = products.reduce((acc, p) => acc + p.quantity, 0);

    const totalDiscounts = subtotalPrice - totalPrice + deliveryFee;

    const clearCart = () => setProducts([]);

    const increaseProductQuantity = (productId: string) => {
        setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, quantity: p.quantity + 1 } : p)));
    };

    const decreaseProductQuantity = (productId: string) => {
        setProducts((prev) =>
            prev.map((p) => {
                if (p.id === productId && p.quantity > 1) {
                    return { ...p, quantity: p.quantity - 1 };
                }
                return p;
            }),
        );
    };

    const removeProductFromCart = (productId: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
    };

    const addProductToCart = ({ product, emptyCart }: { product: CartProduct; emptyCart?: boolean }) => {
        if (emptyCart) setProducts([]);

        const isAlreadyInCart = products.some((p) => p.id === product.id);

        if (isAlreadyInCart) {
            setProducts((prev) =>
                prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p)),
            );
        } else {
            setProducts((prev) => [...prev, product]);
        }
    };

    return (
        <CartContext.Provider
            value={{
                products,
                subtotalPrice,
                totalPrice,
                totalDiscounts,
                totalQuantity,
                addProductToCart,
                decreaseProductQuantity,
                increaseProductQuantity,
                removeProductFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
