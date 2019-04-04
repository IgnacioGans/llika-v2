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

let urls = ['https://www.justenjoyperu.com/sitemap.xml'];
all_urls = [];

console.log('\033[2J');
sitemaps.parseSitemaps(urls, function(url) { all_urls.push(url); }, function(err, sitemaps) {
    all_urls.forEach(function(EachUrl){
    	let dataRP = rp(EachUrl)
			.then(function(html) {
				let infoUrl= EachUrl;
				//console.log(EachUrl)
				let infoH1 = $('h1', html).text();
				let infoTitle =$('title', html).text();
				let infoMetaDescription=$('meta[name="description"]', html).attr('content');
				let infoNodeDrupal =$('link[rel="shortlink"]', html).attr('href');
				let NodeDrupal = replaceUrl(infoNodeDrupal);		
				// console.log(infoMetaDescription);	
				//let infoMetaDescription =['Meta-Description: ', $('meta[name="description"]', html).attr('content')];
				let infoArray=[infoUrl,infoH1,infoTitle,NodeDrupal,infoMetaDescription]; 
				console.log(infoArray)
				return infoArray	

				
			})
			.catch(function(err) {
				console.log(err)
			});
			console.log()	
    });
  
});


function replaceUrl(url){	

	var segment_array = url.split( '/' );
	var last_segment = segment_array[segment_array.length - 1];
	return last_segment;
}