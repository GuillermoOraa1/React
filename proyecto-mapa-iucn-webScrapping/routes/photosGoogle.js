var express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const {API_KEY,SEARCH_ENGINE_ID}=require('../enviroment/env');
var app = express();
app.use(express.json());
app.use(cors());

app.get('/images/:name', async(req, res) => {
    try{
        const imageUrls = [];
        const searchQuery = req.params.name;

        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                key: API_KEY,
                cx: SEARCH_ENGINE_ID,
                num: 4,
                q: searchQuery,
                searchType: 'image'
            }
        });
        response.data.items.map(item => {
            if(imageUrls.indexOf(item.link)===-1){
                imageUrls.push(item.link);
            }    
        });
        res.json({ photo: imageUrls });


    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }

}); 

app.get('/icon/:name', async(req, res) => {
    const searchQuery = req.params.name;
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                key: API_KEY,
                cx: SEARCH_ENGINE_ID,
                num: 1,
                q: searchQuery,
                searchType: 'image'
            }
    });
    res.json(response.data.items[0].link?{ photo: response.data.items[0].link }:{photo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/IUCN_Red_List.svg/1200px-IUCN_Red_List.svg.png"});
});



module.exports = app;