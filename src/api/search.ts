import { esPost } from './base';

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
