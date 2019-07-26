// @flow
import { extractSheets } from 'spreadsheet-to-json';
import path from 'path';
import { baseFormatCell, rowsToLangs, translationsJsonToFile } from './utils';

export default (options: Options): Promise<any> => {
    return new Promise((resolve, reject) => {
        extractSheets(
            {
                spreadsheetKey: options.spreadsheetKey,
                //$FlowFixMe
                credentials: require(path.join(options.pwd, options.credentialsFilePath)),
                sheetsToExtract: options.sheetsToExtract,
                formatCell: baseFormatCell,
            },
            function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    const languages = rowsToLangs(data[options.sheetsToExtract], options.keyColumnName, options.valuesColumnsNames);
                    const keys = Object.keys(languages);
                    try {
                        keys.forEach((key) => {
                            translationsJsonToFile(languages[key], key.toLowerCase(), path.join(`${options.outputDir}`, `${key.toLowerCase()}.js`));
                        });
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                }
            }
        );
    });
};
