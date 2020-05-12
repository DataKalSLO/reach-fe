import { esPost } from './base';

// formats search string into ElasticSearch query
export async function esQuery(qry: string) {
  return await esPost('_search', {
    query: {
      match: {
        title: {
          query: qry
        }
      }
    }
  });
}
