export interface Story {
  id: string;
  userID: string;
  title: string;
  description: string;
  storyBlocks: Array<string>;
}
//Search
export interface ExploreState {
  data: Array<Story>;
}
