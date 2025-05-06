// src/helpers/price.ts

type ProductWithDiscount = {
    price: number;
    discountPercentage: number | null;
};

export const calculateProductTotalPrice = (product: ProductWithDiscount): number => {
    const discountPercent = product.discountPercentage || 0;

    const discount = Number(product.price) * (discountPercent / 100);

    return Number(product.price) - discount;
};

export const formatCurrency = (value: number): string => {
    return `R$${Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'decimal',
        minimumFractionDigits: 2,
    }).format(value)}`;
};
