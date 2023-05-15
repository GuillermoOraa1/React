const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const jsdom = require('jsdom'); 
const suscriptionRouter = require('./routes/suscriptions');
const photosGoogleRouter = require('./routes/photosGoogle');
const photosIucnRouter = require('./routes/photosIUCN');

const app = express();
app.use(express.json());
app.use(cors());




app.use('/suscription', suscriptionRouter);
app.use('/photo-google', photosGoogleRouter);
app.use('/photo', photosIucnRouter);





app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});

