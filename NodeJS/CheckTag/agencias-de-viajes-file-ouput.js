const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const Handlebars = require('handlebars');

const url = 'http://dirceturcusco.gob.pe/places/agencias-de-viajes/page/';
const source = `
		<tr>
			<td class="">{{Agency}}</td>
			<td class="">{{Address}}</td>
			<td class="">{{Contact}}</td>
			<td class="">{{Ruc}}</td>
			<td class="">{{Email}}</td>
			<td class="">{{Content}}</td>
		</tr>`;
const template = Handlebars.compile(source);
console.log('\033[2J');
//console.log(url);
for (var i = 1; i <= 20; i++) {
	
	let page = url+i;
	rp(page)
		.then(function(html) {
			//console.log(page)
			// console.log(html);
			let dataTitleAgency = $('.geodir-entry-title a', html).text()
			let dataAddress = $('.geodir_direccion', html).text()
			let dataContact = $('.geodir_contact', html).text()
			let dataRUC = $('.geodir_ruc', html).text()
			let dataEmail = $('.geodir_correo', html).text()
			let dataContent = $('.geodir-entry-conten', html).text()
			let alldata = [dataTitleAgency, dataAddress, dataContact, dataRUC, dataEmail, dataContent]
			console.log(alldata.replace(/ /g,'').replace(/\s+/g," "))
			//console.log(comboText)
			
				contents = template({
					Agency : dataTitleAgency, 
					Address : dataAddress, 
					Contact : dataContact, 
					Ruc : dataRUC, 
					Email : dataEmail,
					Content : dataContent
				});

				console.log(contents)
				fs.appendFile('agencias-de-viajes.html', contents, err => {
				    if (err) {
				        return console.error(`Autsch! Failed to store template: ${err.message}.`);
				    }
				    console.log('Saved template!');
				});		
		})
		.delay(250)
		.catch(function(err) {
			//handle error
		});
}