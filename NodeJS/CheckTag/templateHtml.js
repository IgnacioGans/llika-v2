const fs = require('fs');
const Handlebars = require('handlebars');

const source = `<div>{{title}}</div>`;
const template = Handlebars.compile(source);

const contents = template({title: 'Wohooo!'});

fs.writeFile('contents.html', contents, err => {
    if (err) {
        return console.error(`Autsch! Failed to store template: ${err.message}.`);
    }

    console.log('Saved template!');
});

//https://stackoverflow.com/questions/39962913/write-file-from-a-template-in-node-js