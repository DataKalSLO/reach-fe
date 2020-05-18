import {
  Story,
  StoryBlockType,
  TextBlockType,
  PublicationStatus
} from '../../../redux/story/types';
import { store } from '../../../redux/store';
import { uuid } from 'uuidv4';
import { LoginData, User } from '../../../redux/login/types';
import { login } from '../../login';
import {
  saveStoryAndHandleResponse,
  deleteStoryByIdAndHandleResponse
} from '../operationHandlers';
import {
  submitStoryForReview,
  submitStoryForPublishing
} from '../statusChangeOperations';
import { getStoryWithStoryID } from '../operations';
import { emptyTextBlock } from '../../../redux/story/reducer';

describe('Story API', () => {
  const id = uuid();

  const title = 'This is a unit tests for FEND story api.';
  const description =
    'This tests that FEND can successfully retrieve, create, delete, and modify stories.';
  const userID = 'berto@bert1.com';
  const userPassword = 'abc123#';
  const publicationStatus = PublicationStatus.DRAFT;
  const textBlock: TextBlockType = emptyTextBlock();
  const storyBlocks: StoryBlockType[] = [textBlock];
  const story: Story = {
    id,
    title,
    description,
    publicationStatus,
    userID,
    storyBlocks
  };

  beforeAll(async () => {
    const user = (await login({
      email: userID,
      password: userPassword
    } as LoginData)) as User;
    store.getState().user = user;
  });

  test('user can submit story for review', async done => {
    const newTitle = 'new title who this';

    // Create
    await saveStoryAndHandleResponse(story);

    // Update
    story.title = newTitle;
    await submitStoryForReview(story);

    // Retrieve
    const storyRetrieved: Story = await getStoryWithStoryID(story.id);
    expect(storyRetrieved.id).toEqual(id);
    //TODO: Uncomment when BEND changes get merged
    //expect(storyRetrieved.publicationStatus).toEqual(PublicationStatus.REVIEW);

    // Delete
    await deleteStoryByIdAndHandleResponse(id);
    done();
  }, 20000);

  test('administrator can publish story.', async done => {
    const user = (await login({
      email: 'admin@berto.com',
      password: userPassword
    } as LoginData)) as User;
    store.getState().user = user;
    const newTitle = 'new title who this';
    story.publicationStatus = PublicationStatus.DRAFT;
    // Create
    await saveStoryAndHandleResponse(story);

    // Update
    story.title = newTitle;
    await submitStoryForPublishing(story);

    // Retrieve
    const storyRetrieved: Story = await getStoryWithStoryID(story.id);
    expect(storyRetrieved.id).toEqual(id);
    //TODO: Uncomment when bend changes get merged
    //expect(storyRetrieved.publicationStatus).toEqual(
    //  PublicationStatus.PUBLISHED
    //);

    // Delete
    await deleteStoryByIdAndHandleResponse(id);
    done();
  }, 20000);
});
