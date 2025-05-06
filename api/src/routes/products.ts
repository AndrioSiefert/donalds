import { Router, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (_req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                restaurant: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
});

router.get('/:id', (async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        deliveryFee: true,
                        deliveryTimeMinutes: true,
                    },
                },
            },
        });

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.json(product);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ error: 'Erro ao buscar produto.' });
    }
}) as RequestHandler);

router.get('/complementary', (async (req, res) => {
    const { restaurantId } = req.query;

    if (!restaurantId || typeof restaurantId !== 'string') {
        return res.status(400).json({ error: 'restaurantId é obrigatório' });
    }

    try {
        const complementaryProducts = await prisma.product.findMany({
            where: {
                restaurantId,
                category: {
                    name: {
                        in: ['Sucos', 'Sobremesas'],
                    },
                },
            },
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        deliveryFee: true,
                        deliveryTimeMinutes: true,
                    },
                },
            },
        });

        res.json(complementaryProducts);
    } catch (error) {
        console.error('Erro ao buscar complementares:', error);
        res.status(500).json({ error: 'Erro ao buscar complementares.' });
    }
}) as RequestHandler);

export default router;
