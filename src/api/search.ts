import { esPost } from './base';
import { SearchIndexFilter } from '../redux/search/types';

/*
 * queries ElasticSearch backend, you can specify index through SearchIndexFilter enum
 * if an invalid index is provided, will default to searching all indices
 * formats search string into ElasticSearch query, documentation:
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html
 */
export async function esQuery(qry: string, index: SearchIndexFilter) {
  // Increases maximum number of documents returned (defaults to 10)
  const MAX_DOCS_RETURNED = 50;
  let endpoint = '_search';
  switch (index) {
    case SearchIndexFilter.graphs:
      endpoint = 'graphs/' + endpoint;
      break;
    case SearchIndexFilter.stories:
      endpoint = 'stories/' + endpoint;
      break;
  }

  return await esPost(endpoint, {
    from: 0,
    size: MAX_DOCS_RETURNED,
    query: {
      match: {
        title: {
          query: qry
        }
      }
    }
  });
}
