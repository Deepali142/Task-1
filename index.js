require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/Users')
.then(() =>{
    console.log('Database connected successfully!')
}).catch((err) =>{
    console.log('Did not connected')
})

const app = express();
const userRouter = require('./router/user');
const dataRouter = require('./router/data');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/Users',userRouter);
app.use('/Data',dataRouter);
app.use('/uploads',express.static('./uploads/'));

const PORT = process.env.PORT || 4100 ;
app.listen(PORT,() =>{
    console.log(`Server listening at port ${PORT}`)
});