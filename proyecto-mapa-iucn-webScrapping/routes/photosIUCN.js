const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const jsdom = require('jsdom'); 

const appPhoto = express();
appPhoto.use(express.json());
appPhoto.use(cors());

const buscarImagen=async (url) => {
    try {
      // Abro una instancia del puppeteer y accedemos a la url 
      const browser = await puppeteer.launch({headless: 'new',}) ;
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
      /* const attrsHREF=[];
      document.querySelectorAll('.featherlight__gallery__image').forEach((item)=>{
        if(attrsHREF.indexOf(item.href)===-1){
          attrsHREF.push(item.href);
        }
      });
      return attrsHREF; */
      if(document.querySelectorAll('.featherlight__gallery__image')[0]){
        return document.querySelectorAll('.featherlight__gallery__image')[0].href;
      }else{
        return "";
      }
      
      
  
    } catch (error) {
      console.error(error);
    }
}
  
appPhoto.get('/:id', (req, res) => {
      const url='https://apiv3.iucnredlist.org/api/v3/taxonredirect/'+req.params.id;
      buscarImagen(url)
      .then((response) => {
          res.json({ photo: response });
      });
  }); 

module.exports = appPhoto;