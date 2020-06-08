import { PublicationStatus, Story } from '../../redux/story/types';
import { authenticatedPost } from '../authenticatedApi/operations';
import { get } from '../base';
import { callActionAndAlertOnError } from '../operations';
import {
  STORY_CHANGE_STATUS_FAILURE_MESSAGE,
  STORY_CHANGE_STATUS_SUCCESS_MESSAGE,
  STORY_DELETION_FAILURE_MESSAGE,
  STORY_DELETION_SUCCESS_MESSAGE,
  STORY_FEEDBACK_ENDPOINT,
  STORY_FEEDBACK_RETRIEVAL_FAILURE,
  STORY_FEEDBACK_RETRIEVAL_SUCCESS,
  STORY_RETRIEVAL_FAILURE_MESSAGE,
  STORY_RETRIEVAL_SUCCESS_MESSAGE,
  STORY_SAVE_FAILURE_MESSAGE,
  STORY_SAVE_SUCCESS_MESSAGE
} from './constants';
import {
  deleteStoryById,
  getPublishedStories,
  getStoryWithStoryID,
  saveOrUpdateExistingStory
} from './operations';
import { StoryFeedback } from './types';

/* These functions are meant to be wrappers for accessing the Story API.
 * They alert the user is in operation fails. Then, a boolean is returned
 * indicating if the operation was successful.
 */

/*
 * Change status of Story
 */

export async function rejectStoryWithFeedbackAndHandleResponse(
  story: Story,
  feedback: string
): Promise<boolean> {
  await changeStoryStatus(story, PublicationStatus.FEEDBACK);

  const storyFeedback: StoryFeedback = {
    storyId: story.id,
    reviewerId: '', //BEND will extract this from authentication token
    feedback
  };

  return await callActionAndAlertOnError(
    () => authenticatedPost(STORY_FEEDBACK_ENDPOINT, storyFeedback),
    STORY_CHANGE_STATUS_SUCCESS_MESSAGE,
    STORY_CHANGE_STATUS_FAILURE_MESSAGE
  )
    .then(res => true)
    .catch(e => false);
}

export async function getStoryFeedback(
  storyId: string
): Promise<StoryFeedback[]> {
  return callActionAndAlertOnError(
    () =>
      get([STORY_FEEDBACK_ENDPOINT, storyId].join('/')) as Promise<
        StoryFeedback[]
      >,
    STORY_FEEDBACK_RETRIEVAL_SUCCESS,
    STORY_FEEDBACK_RETRIEVAL_FAILURE
  );
}

export async function submitStoryForReviewAndHandleResponse(
  story: Story
): Promise<boolean> {
  return changeStoryStatus(story, PublicationStatus.REVIEW);
}

export async function submitStoryForPublishingAndHandleResponse(story: Story) {
  return changeStoryStatus(story, PublicationStatus.PUBLISHED);
}

async function changeStoryStatus(story: Story, newStatus: PublicationStatus) {
  story.publicationStatus = newStatus;
  return await saveStoryAndHandleResponse(
    story,
    STORY_CHANGE_STATUS_SUCCESS_MESSAGE,
    STORY_CHANGE_STATUS_FAILURE_MESSAGE
  );
}

/*
 * CRUD Operations
 */

// NOTE, DateCreated and DateLastEdited will get rewritten in BEND
// because User authentication can be verified there.
export async function saveStoryAndHandleResponse(
  story: Story,
  successMessage: string = STORY_SAVE_SUCCESS_MESSAGE,
  failureMessage: string = STORY_SAVE_FAILURE_MESSAGE
): Promise<boolean> {
  return await callActionAndAlertOnError(
    () => saveOrUpdateExistingStory(story),
    successMessage,
    failureMessage
  )
    .then(() => true)
    .catch(() => false);
}

export async function deleteStoryByIdAndHandleResponse(
  storyId: string
): Promise<boolean> {
  return await callActionAndAlertOnError(
    () => deleteStoryById(storyId),
    STORY_DELETION_SUCCESS_MESSAGE,
    STORY_DELETION_FAILURE_MESSAGE
  )
    .then(() => true)
    .catch(() => false);
}

export async function getStoryByIdAndHandleResponse(
  storyId: string
): Promise<Story | undefined> {
  return await callActionAndAlertOnError<Story>(
    () => getStoryWithStoryID(storyId),
    STORY_RETRIEVAL_SUCCESS_MESSAGE,
    STORY_RETRIEVAL_FAILURE_MESSAGE
  ).catch(() => undefined);
}

export async function getPublishedStoriesAndHandleResponse(): Promise<
  Story[] | undefined
> {
  return await callActionAndAlertOnError<Story[]>(
    () => getPublishedStories(),
    STORY_RETRIEVAL_SUCCESS_MESSAGE,
    STORY_RETRIEVAL_FAILURE_MESSAGE
  ).catch(() => undefined);
}
