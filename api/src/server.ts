import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products';
import restaurantsRoutes from './routes/restaurants';
import categoriesRoutes from './routes/categories';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productsRoutes);
app.use('/restaurants', restaurantsRoutes);
app.use('/categories', categoriesRoutes);

app.listen(3000, () => {
    console.log('🚀 API rodando em http://localhost:3000');
});
