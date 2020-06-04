import { post } from './base';
import { SearchIndexFilter } from '../redux/search/types';

/* eslint-disable @typescript-eslint/camelcase */

/*
 * queries ElasticSearch backend, you can specify index through SearchIndexFilter enum
 * if an invalid index is provided, will default to searching all indices
 * formats search string into ElasticSearch query, documentation:
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html
 */
export async function esQuery(
  qry: string,
  index: SearchIndexFilter,
  currentUser: string
) {
  // Increases maximum number of documents returned (defaults to 10)
  const MAX_DOCS_RETURNED = 50;
  let endpoint = 'search/all';

  switch (index) {
    // For graphs: we want all graphs that match query
    case SearchIndexFilter.graphs:
      endpoint = 'search/graphs';
      return await post(endpoint, {
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
    // For the explore page, we want all published stories that match query
    case SearchIndexFilter.stories:
      endpoint = 'search/stories';
      return await post(endpoint, {
        from: 0,
        size: MAX_DOCS_RETURNED,
        query: {
          bool: {
            must: [
              { match: { title: qry } },
              { match: { publication_status: 'PUBLISHED' } }
            ]
          }
        }
      });
    // For the MyStuff page, we want all user things that match query
    default:
      return await post(endpoint, {
        from: 0,
        size: MAX_DOCS_RETURNED,
        query: {
          bool: {
            must: [
              { match: { title: qry } },
              { match: { user_id: currentUser } }
            ]
          }
        }
      });
  }
}
