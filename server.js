const express = require('express')
const app = express()
const port = 4000;
const userRoutes=require('./route/userRoute')
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config()

const corsOptions = {
    origin: 'http://localhost:3001', // Allowed origin
    credentials: true,              // Allow credentials (cookies, headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));


app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRoutes)



app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err)

    } else {
        console.log("server is running in port", port);

    }
});