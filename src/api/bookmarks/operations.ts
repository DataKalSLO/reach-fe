import {
  authenticatedGet,
  authenticatedPost
} from '../authenticatedApi/operations';

import { handleApiOperation } from '../operations';

import {
  BookmarkResponse,
  Bookmark,
  ContentType,
  GeoMapBookmarkDb,
  GraphBookmarkDb,
  StoryBookmarkDb,
  BookmarkDB
} from './types';

const BOOKMARK_BASE_ENDPOINT = 'bookmark/';
const TOGGLE_BOOKMARK_SUCCESS = 'Bookmark successfully toggled';
const TOGGLE_BOOKMARK_FAILURE = 'An error occurred while toggling a bookmark.';

/*
 * Toggling Bookmarks - Return true if content is bookmarked, false otherwise
 */

export async function toggleGeoMapBookmark(geoMapId: string): Promise<boolean> {
  return toggleBookmarkAndGetStatus({ id: geoMapId, type: ContentType.GEOMAP });
}

export async function toggleGraphBookmark(graphId: string): Promise<boolean> {
  return toggleBookmarkAndGetStatus({ id: graphId, type: ContentType.GRAPH });
}

export async function toggleStoryBookmark(storyId: string): Promise<boolean> {
  return toggleBookmarkAndGetStatus({ id: storyId, type: ContentType.STORY });
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

export async function toggleBookmarkAndGetStatus(
  bookmark: Bookmark
): Promise<boolean> {
  const bookmarkResponse: Promise<BookmarkResponse> = handleApiOperation(
    bookmark,
    toggleBookmark,
    TOGGLE_BOOKMARK_SUCCESS,
    TOGGLE_BOOKMARK_FAILURE
  ) as Promise<BookmarkResponse>;
  return bookmarkResponse
    .then(res => res.enabled)
    .catch(e => {
      console.error(e);
      return false;
    });
}

export async function getBookmarksForType(
  type: ContentType
): Promise<string[]> {
  const endpointLocation: string = ContentType[type].toLowerCase();
  return authenticatedGet(BOOKMARK_BASE_ENDPOINT + endpointLocation) as Promise<
    string[]
  >;
}

async function toggleBookmark(bookmark: Bookmark): Promise<BookmarkResponse> {
  const endpointLocation: string = ContentType[bookmark.type].toLowerCase();
  const bookmarkDb: BookmarkDB = convertToBookmarkDb(bookmark);
  return authenticatedPost(
    BOOKMARK_BASE_ENDPOINT + endpointLocation,
    bookmarkDb
  ) as Promise<BookmarkResponse>;
}

function convertToBookmarkDb(bookmark: Bookmark): BookmarkDB {
  const bookmarkType: ContentType = bookmark.type;
  let bookmarkDb: BookmarkDB;
  switch (bookmarkType) {
    case ContentType.GEOMAP:
      bookmarkDb = { geoMapId: bookmark.id } as GeoMapBookmarkDb;
      break;
    case ContentType.GRAPH:
      bookmarkDb = { graphId: bookmark.id } as GraphBookmarkDb;
      break;
    case ContentType.STORY:
      bookmarkDb = { storyId: bookmark.id } as StoryBookmarkDb;
      break;
    default:
      throw Error('Could not identify content type: ' + bookmarkType);
  }
  return bookmarkDb;
}
