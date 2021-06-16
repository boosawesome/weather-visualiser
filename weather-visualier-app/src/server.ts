import * as fs from 'fs';
import * as csvParse from 'csv-parse';
import express, {Request, Response} from 'express';

const port = 3001;

const app = express();

app.get("/getPlotData", async (req: Request, res: Response) => {
  try {
    const data = await buildData();

    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '127.0.0.1')
    res.status(200).send({ data });

  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
    buildData();
});

const buildData = async() : Promise<Array<Array<string>>> => {
  var csvResults: Array<Array<string>> = await readCSV("data/data.csv");
  var jsonResults: any = await readJSON("data/data.json");

  const jsonKeys: Array<string> = Object.keys(jsonResults);
  var combinedData: Array<Array<string>> = [];
  

  for(var i: number = 1; i < csvResults.length; i++) {
    if(jsonKeys.includes(csvResults[i][0])) {
      var row = csvResults[i];
      var jsonValue: string = Object.values(jsonResults[row[0]])[0] as string;

      var tempArr: Array<string> = [
                row[0],     //timestamp
                row[2],     //air_temperature_at_2m_above_ground_level
                jsonValue   //sea_surface_wave_from_direction_at_variance_spectral_density_maximum
            ]
            combinedData.push(tempArr);
    }
  }

  return combinedData;

}

const readCSV = async (filepath: string): Promise<Array<Array<string>>> => {
  var parser: csvParse.Parser = csvParse.default({ delimiter: ',' }, function (data: any, err?: string) {  }) as csvParse.Parser;

  let results: Array<Array<string>> = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filepath).pipe(parser).on('data', (data: Array<string>) => {
      results.push(data);
    }).on('close', () => {
      resolve(results);
    })
  })
}

const readJSON = async (filepath: string): Promise<{}> => {
  var oceanData = {};
  return new Promise((resolve, reject) => {
    fs.createReadStream(filepath).on('data', (data) => {
      oceanData = JSON.parse(data);
    }).on('close', () => {
      resolve(oceanData);
    })
  })
}

export { }