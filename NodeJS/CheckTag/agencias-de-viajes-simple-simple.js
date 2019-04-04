const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://dirceturcusco.gob.pe/places/agencias-de-viajes/page/';
console.log('\033[2J');
console.log(url)
for (var i = 1; i <= 77; i++) {
	// console.log(url+i)
	let page = url+i;
	rp(page)
		.then(function(html) {
			let comboText = $('.geodir-content ', html).text();
			console(page);
      		console.log(comboText);
		})
		.delay(500)
		.catch(function(err) {
			console.error(err);
		});
}