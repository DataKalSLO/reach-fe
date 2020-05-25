import { esPost } from './base';

/*
 * queries ElasticSearch backend, you can specify index ("GRAPHS", "STORIES")
 * formats search string into ElasticSearch query, documentation:
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html
 */
export async function esQuery(qry: string, index: string) {
  let endpoint = '_search';
  switch (index) {
    case 'GRAPHS':
      endpoint = 'graphs/_search';
      break;
    case 'STORIES':
      endpoint = 'stories/_search';
      break;
    default:
      endpoint = '_search';
  }

  return await esPost(endpoint, {
    query: {
      match: {
        title: {
          query: qry
        }
      }
    }
  });
}
