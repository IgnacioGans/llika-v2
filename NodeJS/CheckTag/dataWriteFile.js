const sitemaps = require('sitemap-stream-parser');
const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
console.log('\033[2J');
let urls = ['https://www.justenjoyperu.com/sitemap.xml'];
all_urls = [];
sitemaps.parseSitemaps(urls, function(url) { all_urls.push(url); }, function(err, sitemaps) {
    all_urls.forEach(function(EachUrl){
    	rp(EachUrl)
			.then(function(html) {
				let infoUrl=EachUrl;
				let infoH1 = $('h1', html).text();
				let infoTitle =$('title', html).text();
				let infoMetaDescription=$('meta[name="description"]', html).attr('content');
				let infoNodeDrupal =$('link[rel="shortlink"]', html).attr('href');
				//let infoMetaDescription =['Meta-Description: ', $('meta[name="description"]', html).attr('content')];
				let infoArray=[infoUrl,infoH1,infoTitle,infoNodeDrupal,infoMetaDescription];
				//console.log(infoArray);

				let RemoveProtocolUrl = infoUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
				infoUrl =RemoveProtocolUrl.replace('/','-');
				infoUrl = infoUrl.replace('/','-');
				infoUrl = infoUrl.replace('.','-');
				let Namefile= infoUrl+".txt";	
				console.log(infoArray)
				// return infoArray
				
			}).then(function(data){
				//console.log(data)		
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
