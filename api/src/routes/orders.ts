import { Router, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = 'nadaseguro';

export const authenticate: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: 'Token ausente.' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        (req as any).userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido.' });
        return;
    }
};

router.get('/', authenticate, async (req, res) => {
    const userId = (req as any).userId;

    try {
        const orders = await prisma.order.findMany({
            where: { userId },
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
                products: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true,
                                price: true,
                                discountPercentage: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.json(orders);
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        res.status(500).json({ error: 'Erro ao buscar pedidos.' });
    }
});

export default router;
