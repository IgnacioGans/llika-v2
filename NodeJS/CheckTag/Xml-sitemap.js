var sitemaps = require('sitemap-stream-parser');
 
var urls = ['https://www.loslaureleshostal.com/sitemap.xml','https://www.loslaureleshostal.com/en/sitemap.xml'];
 
all_urls = [];
sitemaps.parseSitemaps(urls, function(url) { all_urls.push(url); }, function(err, sitemaps) {
    console.log(all_urls);
    console.log('All done!');
    console.log(all_urls.length)
});