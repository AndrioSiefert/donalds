import { Router, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (_req, res) => {
    try {
        const restaurants = await prisma.restaurant.findMany({
            select: {
                id: true,
                name: true,
                imageUrl: true,
                deliveryFee: true,
                deliveryTimeMinutes: true,
            },
        });
        res.json(restaurants);
    } catch (error) {
        console.error('Erro ao buscar restaurantes:', error);
        res.status(500).json({ error: 'Erro ao buscar restaurantes.' });
    }
});

router.get('/:id', (async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                deliveryFee: true,
                deliveryTimeMinutes: true,
                products: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        discountPercentage: true,
                        imageUrl: true,
                        restaurant: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurante não encontrado.' });
        }

        res.json(restaurant);
    } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
        res.status(500).json({ error: 'Erro ao buscar restaurante.' });
    }
}) as RequestHandler);

export default router;
