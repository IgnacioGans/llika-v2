const sitemaps = require('sitemap-stream-parser');
const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const Handlebars = require('handlebars');

const source = `
		<tr>
			<td class="col-md-1">{{Node}}</td>
			<td class="col-md-2">{{Title}}</td>
			<td class="col-md-3">{{MetaTitle}}</td>
			<td class="col-md-4">{{MetaDescription}}</td>
			<td class="col-md-2">{{urlOld}}</td>
		</tr>`;
const template = Handlebars.compile(source);

let contents;

let url = 'https://www.llika.com/blog/g-suite';

console.log('\033[2J');
let i = 1;                     //  set your counter to 1
let array_urls = ['https://www.llika.com/',
'https://www.llika.com/blog',
'https://www.llika.com/blog/agencias-de-viaje',
'https://www.llika.com/blog/g-suite',
'https://www.llika.com/blog/g-suite/10-razones-para-usar-g-suite-peru-para-tu-negocio',
'https://www.llika.com/blog/g-suite/algunas-preguntas-frecuentes-de-g-suite-para-negocios',
'https://www.llika.com/blog/g-suite/gmail-comparacion-de-ediciones-gratis-edicion-estandar-business-ilimitado',
'https://www.llika.com/blog/g-suite/hangouts-es-ahora-parte-del-paquete-de-aplicaciones-principales-de-google-apps',
'https://www.llika.com/blog/g-suite/la-nueva-version-de-gmail-para-ios',
'https://www.llika.com/blog/g-suite/las-caracteristicas-premium-de-google',
'https://www.llika.com/blog/g-suite/los-nuevos-informes-de-g-suite',
'https://www.llika.com/blog/g-suite/los-nuevos-precios-de-g-suite-2019',
'https://www.llika.com/blog/g-suite/preguntas-frecuentes-g-suite-d4w-g-suite-unlimited',
'https://www.llika.com/blog/hosting-y-dominios',
'https://www.llika.com/blog/marketing-digital',
'https://www.llika.com/blog/marketing-digital/promocionar-una-agencia-de-viajes-algunos-datos-estadisticos',
'https://www.llika.com/blog/paginas-web',
'https://www.llika.com/blog/paginas-web/como-es-el-proceso-de-nuestro-trabajo',
'https://www.llika.com/blog/seo',
'https://www.llika.com/blog/seo/que-es-un-certificado-ssl-porque-lo-necesitamos',
'https://www.llika.com/blog/seo/tripadvisor-y-la-competencia-expedia-booking-trivago-hotels-y-onetime',
'https://www.llika.com/chat-empresarial',
'https://www.llika.com/chat-empresarial/beneficios',
'https://www.llika.com/chat-empresarial/comparacion-detallada-de-planes-livechat',
'https://www.llika.com/chat-empresarial/para-agencias-de-viaje',
'https://www.llika.com/chat-empresarial/precios-del-chat',
'https://www.llika.com/contactanos',
'https://www.llika.com/donde-nos-encontramos',
'https://www.llika.com/el-chat-que-tu-agencia-de-viajes-necesita',
'https://www.llika.com/g-suite',
'https://www.llika.com/g-suite-peru-gmail-documentos-drive-calendario-para-su-empresa',
'https://www.llika.com/g-suite/caracteristicas-de-g-suite',
'https://www.llika.com/g-suite/comparacion-de-ediciones-o-planes',
'https://www.llika.com/g-suite/g-suite-basic-paquete-de-30-gb',
'https://www.llika.com/g-suite/g-suite-bussines-paquete-ilimitado',
'https://www.llika.com/g-suite/g-suite-for-education',
'https://www.llika.com/g-suite/nuestros-clientes-de-g-suite',
'https://www.llika.com/g-suite/precios-de-gsuite',
'https://www.llika.com/g-suite/productos',
'https://www.llika.com/g-suite/productos/administracion-de-moviles',
'https://www.llika.com/g-suite/productos/cloud-search',
'https://www.llika.com/g-suite/productos/gmail',
'https://www.llika.com/g-suite/productos/google-admin',
'https://www.llika.com/g-suite/productos/google-calendar',
'https://www.llika.com/g-suite/productos/google-classroom',
'https://www.llika.com/g-suite/productos/google-docs',
'https://www.llika.com/g-suite/productos/google-drive',
'https://www.llika.com/g-suite/productos/google-drive-ilimitado',
'https://www.llika.com/g-suite/productos/google-formularios',
'https://www.llika.com/g-suite/productos/google-hangouts',
'https://www.llika.com/g-suite/productos/google-hojas-de-calculo',
'https://www.llika.com/g-suite/productos/google-plus',
'https://www.llika.com/g-suite/productos/google-presentaciones',
'https://www.llika.com/g-suite/productos/google-sites',
'https://www.llika.com/g-suite/productos/google-vault',
'https://www.llika.com/gmail-email-corporativo-correos-empresariales-de-g-suite',
'https://www.llika.com/hosting-y-dominios',
'https://www.llika.com/hosting-y-dominios/para-agencias-de-viajes',
'https://www.llika.com/hosting-y-dominios/para-empresas',
'https://www.llika.com/marketing-digital',
'https://www.llika.com/marketing-digital/adwords',
'https://www.llika.com/marketing-digital/redes-sociales',
'https://www.llika.com/marketing-digital/seo',
'https://www.llika.com/paginas-web',
'https://www.llika.com/paginas-web/para-empresas',
'https://www.llika.com/paginas-web/precios-de-paginas-web',
'https://www.llika.com/paginas-web/web-para-agencias-de-viajes',
'https://www.llika.com/politica-de-privacidad']

function myLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
    rp(array_urls[i])
		.then(function(html) {
			let infoUrl= array_urls[i];
			let infoH1 = $('h1', html).text();
			let infoTitle =$('title', html).text();
			let infoMetaDescription=$('meta[name="description"]', html).attr('content');
			let infoNodeDrupal =$('link[rel="shortlink"]', html).attr('href');
			let NodeDrupal = replaceUrl(infoNodeDrupal);
			let infoArray=[infoUrl,infoH1,infoTitle,NodeDrupal,infoMetaDescription];
			let RemoveProtocolUrl = infoUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
			RemoveProtocolUrl = RemoveProtocolUrl.substring(0, RemoveProtocolUrl.lastIndexOf("."))
			let Namefile= RemoveProtocolUrl+".html";	
			contents = template({
				Node : NodeDrupal, 
				Title : infoH1, 
				MetaTitle : infoTitle, 
				MetaDescription : infoMetaDescription, 
				urlOld : infoUrl
			});
			console.log(infoArray)
			console.log(Namefile)
			let fileName = 'llika.hojacalculo/llika.html';
			 // console.log(contents)
			fs.appendFile(fileName, contents, err => {
			    if (err) {
			        return console.error(`Autsch! Failed to store template: ${err.message}.`);
			    }

			    console.log('Saved template!');
			});
		})
		.catch(function(err) {
			//handle error
		});
	     
      i++;                     //  increment the counter
      if (i <= 68) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another 
      }                        //  ..  setTimeout()
   }, 3000)
}

myLoop();  



function replaceUrl(url){	

	var segment_array = url.split( '/' );
	var last_segment = segment_array[segment_array.length - 1];
	return last_segment;
}