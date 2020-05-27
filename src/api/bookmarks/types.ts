export interface Bookmark {
  id: string;
  type: ContentType;
}
export interface GeoMapBookmarkDb {
  geoMapId: string;
}

export interface GraphBookmarkDb {
  graphId: string;
}

export interface StoryBookmarkDb {
  storyId: string;
}

export type BookmarkDB = StoryBookmarkDb | GraphBookmarkDb | GeoMapBookmarkDb;

export interface BookmarkResponse {
  enabled: boolean;
}

//THESE MUST MATCH THE NAMES OF TYPES IN BEND
export enum ContentType {
  GEOMAP,
  GRAPH,
  STORY
}
