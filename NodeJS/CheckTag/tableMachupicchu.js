const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.machupicchu.gob.pe/consulta/guias-autorizados';
//https://www.loslaureleshostal.com/sitemap.xml
console.log('\033[2J');
rp(url)
  .then(function(html) {
      console.log(html);
  	
  })
  .catch(function(err) {
    //handle error
  });