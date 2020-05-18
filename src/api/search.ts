import { esPost } from './base';

/* 
 * formats search string into ElasticSearch query, documentation:
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html
*/
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
