import * as http from 'http';
import * as fs from 'fs';
import * as csvParse from 'csv-parse';

const port = 5000;

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  response.end('Hello world!');
});
 
server.listen(port, (error?: string) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server listening on port ${port}`);
    buildData();
  }
});

function buildData () {
    var csvResults:  Array<Array<string>> = readCSV("data/data.csv");
    var jsonResults: any = readJSON("data/data.json");

    console.log(csvResults);
    console.log(jsonResults);

    var combinedData: Array<Array<string>> = [];

    csvResults.forEach(row => {
        var tempArr = [
            row[0],
            row[2],
            jsonResults[row[0]]["surface_sea_water_speed"]
        ]
        combinedData.push(tempArr);
        console.log(tempArr)
    });
}

function readCSV(filepath: string): Array<Array<string>>   {
    var parser:csvParse.Parser = csvParse.default({delimiter: ','}, function(data: any, err?: string) {
      
  }) as csvParse.Parser;
  
    let results: Array<Array<string>> = [];
    fs.createReadStream(filepath).pipe(parser).on('data', (data: Array<string>) => {
      results.push(data);
    }).on('close', () => {
        return results;
    })
    return results;
  }

function readJSON(filepath: string) {
    var oceanData = {};
    fs.createReadStream(filepath).on('data', (data) => {
        oceanData = JSON.parse(data);
    }).on('close', () => {
        return oceanData;
    })
    return oceanData;
}

  export{}