import { authenticatedPost } from '../authenticatedApi/operations';
import { get } from '../base';
import { callActionAndAlertOnError } from '../operations';
import {
  deleteStoryById,
  getPublishedStories,
  getStoryWithStoryID,
  saveOrUpdateExistingStory
} from './operations';
import { StoryFeedback } from './types';
import { Story, PublicationStatus } from '../../redux/story/types';

/* These functions are meant to be wrappers for accessing the Story API.
 * They alert the user is in operation fails. Then, a boolean is returned
 * indicating if the operation was successful.
 */

const STORY_CREATION_SUCCESS_MESSAGE = 'Story created!';
const STORY_CREATION_FAILURE_MESSAGE =
  'An Error occurred while saving a Story. Story was not created.';

const STORY_DELETION_SUCCESS_MESSAGE = 'Story deleted!';
const STORY_DELETION_FAILURE_MESSAGE =
  'An Error occurred while deleting a Story. Story was not deleted.';

const STORY_RETRIEVAL_SUCCESS_MESSAGE = 'Story retrieved!';
const STORY_RETRIEVAL_FAILURE_MESSAGE =
  'An Error occurred while retrieving a Story.';

const STORY_CHANGE_STATUS_SUCCESS_MESSAGE = 'Status of story was changed!.';
const STORY_CHANGE_STATUS_FAILURE_MESSAGE =
  'An Error occurred while changing the status of the story. Status has not been changed.';

const STORY_FEEDBACK_RETRIEVAL_SUCCESS = 'Feedback for story retrieved!';
const STORY_FEEDBACK_RETRIEVAL_FAILURE = 'Could not get feedback left on story';
/*
 * Application Specific Operations
 */

export async function submitStoryForReviewAndHandleResponse(
  story: Story
): Promise<boolean> {
  return changeStoryStatus(story, PublicationStatus.REVIEW);
}

export async function rejectStoryWithFeedbackAndHandleResponse(
  story: Story,
  feedback: string
) {
  await changeStoryStatus(story, PublicationStatus.FEEDBACK);

  const storyFeedback: StoryFeedback = {
    storyId: story.id,
    reviewerId: '', //BEND doesn't require this for submission
    feedback
  };

  return await callActionAndAlertOnError(
    () => authenticatedPost('story/feedback', storyFeedback),
    STORY_CHANGE_STATUS_SUCCESS_MESSAGE,
    STORY_CHANGE_STATUS_FAILURE_MESSAGE
  ).catch(e => console.error(e));
}

export async function getStoryFeedback(
  storyId: string
): Promise<StoryFeedback[]> {
  return callActionAndAlertOnError(
    () => get('story/feedback/' + storyId) as Promise<StoryFeedback[]>,
    STORY_FEEDBACK_RETRIEVAL_SUCCESS,
    STORY_FEEDBACK_RETRIEVAL_FAILURE
  );
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
  successMessage: string = STORY_CREATION_SUCCESS_MESSAGE,
  failureMessage: string = STORY_CREATION_FAILURE_MESSAGE
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
