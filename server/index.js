require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../client-build')));


app.use('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../client-build/index.html'));
});

app.listen(port,() => {
    console.log(`Server listen on http://localhost:${port}`);  
});