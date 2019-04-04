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

let urls = ['https://www.llika.com/sitemap.xml'];
all_urls = [];

console.log('\033[2J');
sitemaps.parseSitemaps(urls, function(url) { all_urls.push(url); }, function(err, sitemaps) {
    all_urls.forEach(function(EachUrl){
    	rp(EachUrl)
			.then(function(html) {
				let infoUrl= EachUrl;
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
				// infoUrl = RemoveProtocolUrl.replace('/','-');
				// infoUrl = infoUrl.replace('/','-');
				// infoUrl = infoUrl.replace('.','-');
				let Namefile= infoUrl+".txt";	
				//console.log(Namefile)
				// return infoArray
				contents = template({
					Node : NodeDrupal, 
					Title : infoH1, 
					MetaTitle : infoTitle, 
					MetaDescription : infoMetaDescription, 
					urlOld : infoUrl
				});

				 // console.log(contents)
				fs.appendFile('info-metatag.html', contents, err => {
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
    });
  
});


function replaceUrl(url){	

	var segment_array = url.split( '/' );
	var last_segment = segment_array[segment_array.length - 1];
	return last_segment;
}