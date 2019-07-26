declare type Options = {
    sheetsToExtract: Array<string>;
    spreadsheetKey: string;
    credentialsFilePath: string;
    outputDir: string;
    keyColumnName: string;
    valuesColumnsNames: string;
    pwd: ?string;
}
