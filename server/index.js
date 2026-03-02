import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routers/authRoutes.js';
import boardRoutes from './routers/boardRoutes.js';
import listRoutes from './routers/listRoutes.js';
import cardRoutes from './routers/cardRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

// connection to mongo db
mongoose.connect(process.env.MONGODB_URI)
    .then(console.log('Connected successfully!'))
    .catch(error => console.error(error));

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/lists',listRoutes );
app.use('/api/cards', cardRoutes);

app.listen(PORT, () => {
    console.log(`Started listening to PORT: ${PORT}`);
})