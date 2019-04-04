const request_promise = require('request-promise');
const $ = require('cheerio');


console.log('\033[2J');
const url = 'http://dirceturcusco.gob.pe/places/agencias-de-viajes/page/';
const rp = waitRetryPromise(url);

console.log(url)
function waitRetryPromise(url) {
    let promise = Promise.resolve();
    // console.log(url)
    return function rp(options) {
        return promise = promise
        .then(() => new Promise(resolve => setTimeout(resolve, 200)))
        .then(() => request_promise(url)
        .then(function (html){
        	console.log(html)
        }));
    }
}