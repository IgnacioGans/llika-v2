const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.justenjoyperu.com/amazon-villa';
//https://www.loslaureleshostal.com/sitemap.xml
console.log('\033[2J');
rp(url)
  .then(function(html) {
  	// console.log("Url Web: " + url);
   //  console.log('H1-Titulo web: '+ $('h1', html).text()+'\n');
   //  console.log('Title-Titulo Pestaña: '+ $('title', html).text()+'\n');
   //  console.log('Node Drupal: '+ $('link[rel="shortlink"]', html).attr('href')+'\n');
   //  console.log('Meta-Description: '+ $('meta[name="description"]', html).attr('content'));
    // console.table(["apples", "oranges", "bananas"]);
   //  let infoUrl ="Url Web: " + url;
  	// let infoH1 = 'H1-Titulo web: '+ $('h1', html).text()+'\n';
  	// let infoTitle ='Title-Titulo Pestaña: '+ $('title', html).text()+'\n';
  	// let infoNodeDrupal='Node Drupal: '+ $('link[rel="shortlink"]', html).attr('href')+'\n';
  	 let infoMetaDescription='Meta-Description: '+ $('meta[name="description"]', html).attr('content');
  	// let infoArray=[infoUrl,infoH1,infoTitle,infoNodeDrupal,infoMetaDescription];
   //  console.table([['nombre ','remking',],['nombre ','remking',],['nombre ','remking',]]);

    let infoUrl =["Url Web: ", url];
  	let infoH1 =['H1-Titulo web: ',  $('h1', html).text()];
  	let infoTitle =['Title-Titulo Pestaña: ', $('title', html).text()];
  	let infoNodeDrupal =['Node Drupal: ', $('link[rel="shortlink"]', html).attr('href')];
  	//let infoMetaDescription =['Meta-Description: ', $('meta[name="description"]', html).attr('content')];
  	let infoArray=[infoUrl,infoH1,infoTitle,infoNodeDrupal,infoMetaDescription];
    // console.table([['nombre ','remking',],['nombre ','remking',],['nombre ','remking',]]);
    console.table([infoUrl,infoNodeDrupal,infoH1,infoTitle]);
    console.log($('meta[name="description"]', html).attr('content'))
  })
  .catch(function(err) {
    //handle error
  });

/*

H1-Titulo web:

Title - Titulo: https://www.loslaureleshostal.com/

Meta-Description: Hostal los Laureles es una empresa Hotelera De Tres Estrellas Que Brinda Calidad Y Una Experiencia Acogedora




*/