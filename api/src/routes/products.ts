import { Router, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Buscar todos os produtos (agora incluindo o restaurante)
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

// Buscar um produto por ID
router.get('/:id', (async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                restaurant: {
                    select: {
                        name: true,
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

export default router;
