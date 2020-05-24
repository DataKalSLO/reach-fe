export interface GeoMapBookmark {
  geoMapId: string;
}

export interface GraphBookmark {
  graphId: string;
}

export interface StoryBookmark {
  storyId: string;
}

export type BookmarkType = GeoMapBookmark | GraphBookmark | StoryBookmark;

export interface BookmarkResponse {
  enabled: boolean;
}

//THESE MUST MATCH THE NAMES OF TYPES IN BEND
export enum ContentType {
  GEOMAP,
  GRAPH,
  STORY
}
