import { Story, PublicationStatus } from '../../redux/story/types';
import { saveStoryAndHandleResponse } from './operationHandlers';

export async function submitStoryForReview(story: Story): Promise<boolean> {
  story.publicationStatus = PublicationStatus.REVIEW;
  return await saveStoryAndHandleResponse(story);
}

export async function submitStoryForPublishing(story: Story) {
  story.publicationStatus = PublicationStatus.PUBLISHED;
  return await saveStoryAndHandleResponse(story);
}
