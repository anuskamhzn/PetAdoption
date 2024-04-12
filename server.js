import express from 'express'
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import categoryRouter from './routes/categoryRouter.js';
import productRoutes from './routes/productRoutes.js';
import breedRouter from './routes/breedRouter.js';


//configure env
dotenv.config();

//db config
connectDB();

//rest obj
const app = express()

//middlewares
app.use(cors());
app.use(express.json()); 
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category", categoryRouter);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/breed',breedRouter);

//rest api
app.get('/', (req,res) => {
    res.send("<h1>WELCOME TO PET ADOPTION </h1>")
});

//PORT 
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port${PORT}`.bgCyan.white);
});