const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser =require('body-parser');
const app = express();


app.use(bodyParser.json());
require('dotenv').config();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
const uri = process.env.MONGODB_URI || 'mongodb://localhost/user'

mongoose.connect( uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}
    );

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection established success");
})

const userRouter = require('./routes/users');

app.use('/user-form', userRouter);
app.use('/', userRouter);



if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`); 
})

