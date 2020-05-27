import { post } from './base';

// Uploads the new table rows to the database.
// The argument should have a single key, the camel-cased name of the table, whose value is
// an array of objects corresponding to rows based on that table's schema.
//
// Support for upload is implemented explicitly on a per-table basis on the backend;
// this is not an arbitrary free-for-all INSERT to our database.
export async function upload(tableRows: object) {
  return await post(`upload/${Object.keys(tableRows)[0]}`, tableRows);
}
