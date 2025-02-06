const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://auth-mern-app-1-ui-two.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

const bodyParser = require('body-parser');
const AuthRouter = require('./routes/AuthRouter');
const ProductRouter=require('./routes/ProductRouter')

require('dotenv').config();
require('./models/db');

const PORT = process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send('PONG');
})

app.use(bodyParser.json());

app.use('/auth',AuthRouter);
app.use('/products',ProductRouter)

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`);
})