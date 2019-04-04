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
rp(url)
	.then(function(html) {
		let infoUrl= url;
		let infoH1 = $('h1', html).text();
		let infoTitle =$('title', html).text();
		let infoMetaDescription=$('meta[name="description"]', html).attr('content');
		let infoNodeDrupal =$('link[rel="shortlink"]', html).attr('href');
		let NodeDrupal = replaceUrl(infoNodeDrupal);
	
		// console.log(infoMetaDescription);	
		//let infoMetaDescription =['Meta-Description: ', $('meta[name="description"]', html).attr('content')];
		let infoArray=[infoUrl,infoH1,infoTitle,NodeDrupal,infoMetaDescription];
		//console.log(infoArray);

		let RemoveProtocolUrl = infoUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
		RemoveProtocolUrl = RemoveProtocolUrl.substring(0, RemoveProtocolUrl.lastIndexOf("."))
		// infoUrl = RemoveProtocolUrl.replace('/','-');
		// infoUrl = infoUrl.replace('/','-');
		// infoUrl = infoUrl.replace('.','-');
		let Namefile= RemoveProtocolUrl+".html";	


		//console.log(Namefile)
		// return infoArray
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
				// fs.appendFile("data.txt", data.join('\r\n'), function(err) {
			 //       if(err) {
			 //           return console.log(err);
			 //       }
			 //       console.log("The file was saved!");
			 // 	}); 		
				
			})
			.catch(function(err) {
			//handle error
			});



function replaceUrl(url){	

	var segment_array = url.split( '/' );
	var last_segment = segment_array[segment_array.length - 1];
	return last_segment;
}