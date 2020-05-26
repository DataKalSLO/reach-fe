import { Story } from '../../redux/story/types';
import { handleApiOperation } from '../operations';
import {
  deleteStoryById,
  getAllStories,
  getStoryWithStoryID,
  saveOrUpdateExistingStory
} from './operations';

const STORY_CREATION_SUCCESS_MESSAGE = 'Story created!';
const STORY_CREATION_FAILURE_MESSAGE =
  'An Error occurred while saving a Story. Story was not created.';
const STORY_DELETION_SUCCESS_MESSAGE = 'Story deleted!';
const STORY_DELETION_FAILURE_MESSAGE =
  'An Error occurred while deleting a Story. Story was not deleted.';
const STORY_RETRIEVAL_SUCCESS_MESSAGE = 'Story retrieved!';
const STORY_RETRIEVAL_FAILURE_MESSAGE =
  'An Error occurred while retrieving a Story.';

export async function saveStoryAndHandleResponse(
  story: Story
): Promise<string | undefined> {
  return await handleApiOperation(
    story,
    saveOrUpdateExistingStory,
    STORY_CREATION_SUCCESS_MESSAGE,
    STORY_CREATION_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function deleteStoryByIdAndHandleResponse(
  storyId: string
): Promise<string | undefined> {
  return await handleApiOperation(
    storyId,
    deleteStoryById,
    STORY_DELETION_SUCCESS_MESSAGE,
    STORY_DELETION_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getStoryWIthIdAndHandleResponse(
  storyId: string
): Promise<Story | undefined> {
  return await handleApiOperation<string, Story>(
    storyId,
    getStoryWithStoryID,
    STORY_RETRIEVAL_SUCCESS_MESSAGE,
    STORY_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}

export async function getAllStoriesAndHandleResponse(): Promise<
  Story[] | undefined
> {
  return await handleApiOperation<void, Story[]>(
    undefined,
    getAllStories,
    STORY_RETRIEVAL_SUCCESS_MESSAGE,
    STORY_RETRIEVAL_FAILURE_MESSAGE
  ).catch(e => undefined);
}
