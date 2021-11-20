const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001;
const morgan = require('morgan');

app.use(morgan('dev'))


app.listen(port, ()=>{
    console.log('Server running on port '+port);
})

