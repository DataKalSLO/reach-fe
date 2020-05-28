import { esPost } from './base';
import { SearchIndexFilter } from '../redux/search/types';

/*
 * queries ElasticSearch backend, you can specify index through SearchIndexFilter enum
 * if an invalid index is provided, will default to searching all indices
 * formats search string into ElasticSearch query, documentation:
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html
 */
export async function esQuery(qry: string, index: SearchIndexFilter) {
  let endpoint = '_search';
  switch (index) {
    case SearchIndexFilter.Graphs:
      endpoint = 'graphs/' + endpoint;
      break;
    case SearchIndexFilter.Stories:
      endpoint = 'stories/' + endpoint;
      break;
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
