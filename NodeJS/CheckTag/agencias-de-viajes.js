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
			// console.log(html);
			// let comboText = $('.geodir-entry-title a,.geodir_direccion,.geodir_contact,.geodir_ruc,.geodir_correo,.geodir-entry-content', html).text();
			// console.log(comboText).replace(/ /g,'').replace(/\s+/g," ");
			let dataTitleAgency = $('.geodir-entry-title a', html).text()
			let dataAddress = $('.geodir_direccion', html).text()
			let dataContact = $('.geodir_contact', html).text()
			let dataRUC = $('.geodir_ruc', html).text()
			let dataEmail = $('.geodir_correo', html).text()
			let dataContent = $('.geodir-entry-conten', html).text()
			let alldata = [dataTitleAgency, dataAddress, dataContact, dataRUC, dataEmail, dataContent]
			console.log(alldata.replace(/ /g,'').replace(/\s+/g," "))
		})
		.delay(500)
		.catch(function(err) {
			//handle error
		});
}


