import { Story, PublicationStatus } from '../../redux/story/types';
import { saveOrUpdateExistingStory } from './operations';

export async function submitStoryForReview(story: Story) {
  story.publicationStatus = PublicationStatus.REVIEW;
  return await saveOrUpdateExistingStory(story);
}

export async function submitStoryForPublishing(story: Story) {
  story.publicationStatus = PublicationStatus.PUBLISHED;
  return await saveOrUpdateExistingStory(story);
}
