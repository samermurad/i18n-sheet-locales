'use strict';

const fs = require('fs');
const { extractSheets } = require("spreadsheet-to-json");
const projectsConfig = require('./projectsConfig');

// optional custom format cell function
const formatCell = (value, sheeTitle, columnTitle) => value;



const langJsonToFile = (dict, constName, filename) => {
    let file = `const ${constName} = ${JSON.stringify(dict,undefined, 2)}`;
    file += ';\n\r';
    file += `export default ${constName};`;

    fs.writeFileSync(filename, file);
};


const rowsToLangs = (rows, keyID, langsIds) => {
    let dicts = {};
    langsIds.forEach((id) => {
        dicts[id] = {};
    });

    rows.forEach((item) => {
        langsIds.forEach((dictId) => {
            dicts[dictId] = {
                ...dicts[dictId],
                [item[keyID]]: item[dictId] || undefined,
            };
        });
    });
    return dicts;
};



const prettyJ = (json) => {
    if (typeof json !== 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            let cls = "\x1b[36m";
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = "\x1b[34m";
                } else {
                    cls = "\x1b[32m";
                }
            } else if (/true|false/.test(match)) {
                cls = "\x1b[35m";
            } else if (/null/.test(match)) {
                cls = "\x1b[31m";
            }
            return cls + match + "\x1b[0m";
        }
    );
};


const args = process.argv;

if (args.length < 3) {
    const keys = Object.keys(projectsConfig);
    console.error('MISSING Project name, should be one of:', keys.join(', '));
    process.exit(130);
}


const projectName = args[2];
const projectDict = projectsConfig[projectName];


extractSheets(
    {
        // your google spreadhsheet key
        spreadsheetKey: projectDict.key,
        // your google oauth2 credentials (optional for world-readable spreadsheets)
        credentials: require('./Spreadsheet api-2629037227db.json'),
        // optional: names of the sheets you want to extract
        sheetsToExtract: projectDict.sheetsToExtract,
        // optional: custom function to parse the cells
        formatCell: formatCell
    },
    function(err, data) {
        const langs = rowsToLangs(data.App, projectDict.keyColumnId, projectDict.valuesColumnsIds);
        const keys = Object.keys(langs);
        keys.forEach((key) => {
            langJsonToFile(langs[key],key.toLowerCase(), `./output/${projectDict.productName}_${key.toLowerCase()}.js`);
        });
        console.log(prettyJ(langs));
    }
);
