const express = require('express');
const cors = require('cors');

const puppeteer = require('puppeteer');
const jsdom = require('jsdom'); 

const app = express();
app.use(cors());
app.use(express.json());



const buscarImagen=async (url) => {
  try {
    // Abro una instancia del puppeteer y accedemos a la url 
    const browser = await puppeteer.launch() ;
    const page = await browser.newPage();
    const response = await page.goto(url,{
        waitUntil: 'networkidle0',
    });

    //obtengo el html 
	const html = await page.content(); 

    const { window: { document } } = new jsdom.JSDOM(html);

    // Cierro el puppeteer
    await browser.close();

    //Envio la respuesta
    return document.querySelectorAll('.featherlight__gallery__image')[0].href;

  } catch (error) {
    console.error(error);
  }
}

app.get('/photo/:id', (req, res) => {
    const url='https://apiv3.iucnredlist.org/api/v3/taxonredirect/'+req.params.id;
    buscarImagen(url)
    .then((response) => {
        res.json({ photo: response });
    });
}); 

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});

