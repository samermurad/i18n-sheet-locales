#!/usr/bin/env node
// @flow
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import cp from 'child_process';

import * as consts from './consts';
import sheetToTrans from './sheetToTrans';

const printMissingConfig = (name, description, isCustom) => {
    console.error(chalk.bold.red(isCustom ? name : `Missing "${name}"`));
    if (description)
        console.error(chalk.bold.red(description));
    process.exit(130);
};
const validateConfigFile = (): Options => {
    const pwd = cp.execSync('pwd').toString().replace('\n', '');
    console.log(chalk.bold.green(`Searching for "${consts.CONFIG_FILE_NAME}" in ${pwd}`));

    const configFilePath = path.join(pwd, consts.CONFIG_FILE_NAME);
    if (!fs.existsSync(configFilePath)) {
        printMissingConfig(
            `Configuration File not found ${configFilePath}`,
            `Pleas add "${consts.CONFIG_FILE_NAME}" to your rootDir`,
            true
        );
    }

    //$FlowFixMe
    const options: Options = require(configFilePath);

    if (options.integration && options.integration === 'Google') {
        printMissingConfig(
            'Only Integration With Google Spreadsheet is supported',
            'Please Remove the "integration" value from your config file',
            true
        );
    }

    if (!options.sheetsToExtract || !Array.isArray(options.sheetsToExtract)) {
        printMissingConfig(
            'sheetsToExtract',
            'Example: sheetsToExtract: ["MY_SHEET"]'
        );
    }

    if (!options.spreadsheetKey) {
        printMissingConfig(
            'spreadsheetKey',
            'The key in the last path of the link to your spreadsheet'
        );
    }

    if (!options.credentialsFilePath) {
        printMissingConfig(
            'credentialsFilePath',
            'Relative path to your Google SpreadSheetApi json'
        );
    }

    if (!options.outputDir) {
        printMissingConfig(
            'outputDir',
            'Please Specify the output dir'
        );
    }

    if (!options.keyColumnName) {
        printMissingConfig(
            'keyColumnName',
            'The column containing the keys to your translations'
        );
    }

    if (!options.valuesColumnsNames) {
        printMissingConfig(
            'valuesColumnsNames',
            'A String Array containing the names of the values columns'
        );
    }

    return {
        ...options,
        pwd,
    }

};
const run = () => {
    console.log('\x1Bc');
    console.log(chalk.bold.underline.italic.cyan('====== I18n Sheet Locales ======'));
    console.log('\n\n\n');
    const options = validateConfigFile();
    sheetToTrans(options)
        .then(() => {
            console.log('Success!')
        })
        .catch(error => console.error(error));
};
run();
