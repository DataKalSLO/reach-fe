import { get } from './base';
import { METADATA_ROUTE, DATASET_ROUTE } from './constants';

export async function fetchAllMetaData() {
  const response = await get(METADATA_ROUTE);
  return await response.json();
}

export async function fetchEntireDataset(datasetName: string) {
  console.log(DATASET_ROUTE + datasetName);
  console.log(
    await fetch(DATASET_ROUTE + datasetName, {
      mode: 'no-cors'
    })
  );
  const response = await fetch(DATASET_ROUTE + datasetName, {
    mode: 'no-cors'
  });
  const string = await response.text();
  const json = string === '' ? {} : JSON.parse(string);
  console.log(json);
  return json;
//  return await response.json();

  //  fetch(DATASET_ROUTE + datasetName, { mode: 'no-cors' })
  //    .then(function(response) {
  //      console.log(response);
  //      return response.json();
  //    })
  //    .catch(function(error) {
  //      console.log('Request failed', error);
  //    });
}
