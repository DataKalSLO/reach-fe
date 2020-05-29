import { handleApiOperation } from '../operations';
import {
  deleteStoryById,
  getAllStories,
  getStoryWithStoryID,
  saveOrUpdateExistingStory
} from './operations';
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

/*
 * Application Specific Operations
 */

export async function submitStoryForReviewAndHandleResponse(
  story: Story
): Promise<boolean> {
  story.publicationStatus = PublicationStatus.REVIEW;
  return await saveStoryAndHandleResponse(
    story,
    STORY_CHANGE_STATUS_SUCCESS_MESSAGE,
    STORY_CHANGE_STATUS_FAILURE_MESSAGE
  );
}

export async function submitStoryForPublishingAndHandleResponse(story: Story) {
  story.publicationStatus = PublicationStatus.PUBLISHED;
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
  return await handleApiOperation(
    story,
    saveOrUpdateExistingStory,
    successMessage,
    failureMessage
  )
    .then(() => true)
    .catch(() => false);
}

export async function deleteStoryByIdAndHandleResponse(
  storyId: string
): Promise<boolean> {
  return await handleApiOperation(
    storyId,
    deleteStoryById,
    STORY_DELETION_SUCCESS_MESSAGE,
    STORY_DELETION_FAILURE_MESSAGE
  )
    .then(() => true)
    .catch(() => false);
}

export async function getStoryWIthIdAndHandleResponse(
  storyId: string
): Promise<Story | undefined> {
  return await handleApiOperation<string, Story>(
    storyId,
    getStoryWithStoryID,
    STORY_RETRIEVAL_SUCCESS_MESSAGE,
    STORY_RETRIEVAL_FAILURE_MESSAGE
  ).catch(() => undefined);
}

export async function getAllStoriesAndHandleResponse(): Promise<
  Story[] | undefined
> {
  return await handleApiOperation<void, Story[]>(
    undefined,
    getAllStories,
    STORY_RETRIEVAL_SUCCESS_MESSAGE,
    STORY_RETRIEVAL_FAILURE_MESSAGE
  ).catch(() => undefined);
}
