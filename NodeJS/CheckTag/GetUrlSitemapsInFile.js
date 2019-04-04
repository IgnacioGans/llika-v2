const sitemaps = require('sitemap-stream-parser');
const fs = require('fs');
 
let urls = ['https://www.loslaureleshostal.com/sitemap.xml','https://www.loslaureleshostal.com/en/sitemap.xml'];
 
all_urls = [];
let inforXML= sitemaps.parseSitemaps(urls, function(url) { all_urls.push(url); }, function(err, sitemaps) {
    console.log(all_urls);
    console.log('All done!');
    console.log(all_urls.length)

  fs.writeFile("rk-file.txt", all_urls.join('\r\n'), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  }); 
});

