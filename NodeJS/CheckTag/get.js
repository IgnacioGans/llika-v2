const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://dirceturcusco.gob.pe/places/agencias-de-viajes/';
//https://www.loslaureleshostal.com/sitemap.xml
console.log('\033[2J');
rp(url)
  .then(function(html) {
      // console.log(html);
      let comboText = $('.geodir-entry-title,.geodir_direccion,.geodir_contact,.geodir_ruc,.geodir_correo,.geodir-entry-content', html).text().replace(/ /g,'').replace(/\s+/g," ");
      console.log(comboText)
  })
  .catch(function(err) {
    //handle error
  });