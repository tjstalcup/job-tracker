require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const knex = require('knex');
const {NODE_ENV, DATABASE_URL} = require('./config');

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

const db = knex({
    client: 'pg',
    connection: DATABASE_URL
});

app.set('db',db);


app.get('/', (req,res)=>{
    res.send('JobTracker');
});

app.use(function errorHandler(error, req, res, next){
    let response;
    if(NODE_ENV==='production'){
        response = {error:{message:'server error'}};
    } else {
        response = {message: error.message, error}
    }
    console.error(error);
    res.status(500).json(response);
})

module.exports = app;