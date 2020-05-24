import {
  BookmarkType,
  GeoMapBookmark,
  GraphBookmark,
  StoryBookmark,
  BookmarkResponse,
  ContentType
} from './types';

import {
  authenticatedPost,
  authenticatedGet
} from '../authenticatedApi/operations';

/*
 * Toggling Bookmarks - Return true is content is bookmarked, false otherwise
 */

export async function toggleGeoMapBookmark(geoMapId: string): Promise<boolean> {
  return getBookmarkToggleStatus(geoMapId, ContentType.GEOMAP);
}

export async function toggleGraphBookmark(graphId: string): Promise<boolean> {
  return getBookmarkToggleStatus(graphId, ContentType.GRAPH);
}

export async function toggleStoryBookmark(storyId: string): Promise<boolean> {
  return getBookmarkToggleStatus(storyId, ContentType.STORY);
}

/*
 * Retrieving Bookmarks - Return list of bookmarked ids
 */

export async function getGeoMapBookmarks(): Promise<string[]> {
  return requestBookmarkRetrieval(ContentType.GEOMAP);
}

export async function getGraphBookmarks(): Promise<string[]> {
  return requestBookmarkRetrieval(ContentType.GRAPH);
}

export async function getStoryBookmarks(): Promise<string[]> {
  return requestBookmarkRetrieval(ContentType.STORY);
}

/*
 * HTTP Helpers
 * Note, endpoints are located @
 * api/bookmark/[ContentType] (e.g api/bookmark/story)
 */

async function getBookmarkToggleStatus(
  contentId: string,
  bookmarkType: ContentType
): Promise<boolean> {
  return requestBookmarkToggle(contentId, bookmarkType)
    .then(res => res.enabled)
    .catch(e => false);
}

async function requestBookmarkRetrieval(type: ContentType): Promise<string[]> {
  const endpointLocation: string = ContentType[type].toLowerCase();
  return authenticatedGet('bookmark/' + endpointLocation) as Promise<string[]>;
}

async function requestBookmarkToggle(
  contentId: string,
  bookmarkType: ContentType
): Promise<BookmarkResponse> {
  const bookmark: BookmarkType = createBookmark(contentId, bookmarkType);
  const endpointLocation: string = ContentType[bookmarkType].toLowerCase();
  return authenticatedPost('bookmark/' + endpointLocation, bookmark) as Promise<
    BookmarkResponse
  >;
}

function createBookmark(id: string, type: ContentType): BookmarkType {
  let bookmark: BookmarkType;
  switch (type) {
    case ContentType.GEOMAP:
      bookmark = { geoMapId: id } as GeoMapBookmark;
      break;
    case ContentType.GRAPH:
      bookmark = { graphId: id } as GraphBookmark;
      break;
    case ContentType.STORY:
      bookmark = { storyId: id } as StoryBookmark;
      break;
    default:
      throw Error('Could not identify content type: ' + type);
  }
  return bookmark;
}
