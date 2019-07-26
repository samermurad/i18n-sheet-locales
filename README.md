# I18n Sheet Locales

## Description
spreadsheets to json parsing integration for translation/locale files

## Installation
    npm install @codiseus/i18n-sheet-locales --save-dev
    
## Setup
In your root dir add a `i18n.config.js` file:

    {
        sheetsToExtract: ['App'], // One sheet name only 
        spreadsheetKey: '1aEESDS9b8_1ECBG_Igtbp1ZjNDESS',
        credentialsFilePath: '/PATH/TO/YOUR/SPREAD_SHEET.json',
        outputDir: './PATH/TO/YOUR/LOCALE/DIR',
        keyColumnName: 'KEY_COLUM_NAME', // example: 'KEY'
        valuesColumnsNames: ['VALUES_COLUM_NAME', 'VALUES_COLUM_NAME'] // example: // ['EN', 'DE'] 
     }

# Run
 once setup, you can run the parsing with simply running:

    $~: i18n 

## Roadmap
- support multiple sheets
- Integration With excel files(?)
# License (MIT)

The MIT License

Copyright (c) 2019-2021 [Samer Murad](https://www.samermurad.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
