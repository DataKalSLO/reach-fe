import {
  BookmarkResponse,
  BookmarkType,
  ContentType,
  GeoMapBookmark,
  GraphBookmark,
  StoryBookmark
} from './types';

import {
  authenticatedGet,
  authenticatedPost
} from '../authenticatedApi/operations';

const BOOKMARK_BASE_ENDPOINT = 'bookmark/';

/*
 * Toggling Bookmarks - Return true if content is bookmarked, false otherwise
 */

export async function toggleGeoMapBookmark(geoMapId: string): Promise<boolean> {
  return toggleBookmarkAndGetStatus(geoMapId, ContentType.GEOMAP);
}

export async function toggleGraphBookmark(graphId: string): Promise<boolean> {
  return toggleBookmarkAndGetStatus(graphId, ContentType.GRAPH);
}

export async function toggleStoryBookmark(storyId: string): Promise<boolean> {
  return toggleBookmarkAndGetStatus(storyId, ContentType.STORY);
}

/*
 * Retrieving Bookmarks - Return list of bookmarked ids
 */

export async function getGeoMapBookmarks(): Promise<string[]> {
  return getBookmarksForType(ContentType.GEOMAP);
}

export async function getGraphBookmarks(): Promise<string[]> {
  return getBookmarksForType(ContentType.GRAPH);
}

export async function getStoryBookmarks(): Promise<string[]> {
  return getBookmarksForType(ContentType.STORY);
}

/*
 * HTTP Helpers
 * Note, endpoints are located @
 * api/bookmark/[ContentType] (e.g api/bookmark/story)
 */

async function toggleBookmarkAndGetStatus(
  contentId: string,
  bookmarkType: ContentType
): Promise<boolean> {
  return toggleBookmark(contentId, bookmarkType)
    .then(res => res.enabled)
    .catch(e => false);
}

async function getBookmarksForType(type: ContentType): Promise<string[]> {
  const endpointLocation: string = ContentType[type].toLowerCase();
  return authenticatedGet(BOOKMARK_BASE_ENDPOINT + endpointLocation) as Promise<
    string[]
  >;
}

async function toggleBookmark(
  contentId: string,
  bookmarkType: ContentType
): Promise<BookmarkResponse> {
  const bookmark: BookmarkType = createBookmark(contentId, bookmarkType);
  const endpointLocation: string = ContentType[bookmarkType].toLowerCase();
  return authenticatedPost(
    BOOKMARK_BASE_ENDPOINT + endpointLocation,
    bookmark
  ) as Promise<BookmarkResponse>;
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
