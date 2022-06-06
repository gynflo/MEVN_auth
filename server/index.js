require('dotenv').config();
const express = require('express');
const {MongoClient} = require('mongodb')
const path = require('path');
const port = process.env.PORT || 3000;

const client  = new MongoClient(process.env.MONGODB_URL);

client.connect()
    .then(() => {console.log('BDD Connected');
    })
    .catch((e) => {console.log(e);
    })

const app = express();

app.use(express.static(path.join(__dirname, '../client-build')));


app.use('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../client-build/index.html'));
});

app.listen(port,() => {
    console.log(`Server listen on http://localhost:${port}`);  
});