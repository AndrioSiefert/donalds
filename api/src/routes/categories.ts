import { Router, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (_req, res) => {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                imageUrl: true,
            },
        });
        res.json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).json({ error: 'Erro ao buscar categorias.' });
    }
});

router.get('/:id/products', (async (req, res) => {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                products: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        price: true,
                        discountPercentage: true,
                        restaurant: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (!category) {
            return res.status(404).json({ error: 'Categoria não encontrada.' });
        }

        res.json(category);
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        res.status(500).json({ error: 'Erro ao buscar categoria.' });
    }
}) as RequestHandler);

export default router;
