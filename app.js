const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001;
const morgan = require('morgan');
const path = require('path');
const compression = require("compression");
const helmet = require('helmet');
const cors = require('cors');

app.use(cors())
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use('/api', require('./routes'));

app.listen(port, ()=>{
    console.log('Server running on port '+port);
})

