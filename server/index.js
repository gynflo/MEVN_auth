require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = process.env.PORT || 8000;
const router = require('./routes');

require('./database')

const app = express();
app.use(express.static(path.join(__dirname, '../client-build')));
app.use(express.json());
app.use(cookieParser())


app.use(router);

app.use('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../client-build/index.html'));
});

app.listen(port,() => {
    console.log(`Server listen on http://localhost:${port}`);  
});