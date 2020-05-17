import {
  Story,
  StoryBlockType,
  TextBlockType
} from '../../../redux/story/types';
import { store } from '../../../redux/store';
import { uuid } from 'uuidv4';
import { LoginData, User } from '../../../redux/login/types';
import { login } from '../../login';
import {
  getAllStoriesAndHandleResponse,
  saveStoryAndHandleResponse,
  deleteStoryByIdAndHandleResponse
} from '../operationHandlers';
import { getStoryWithStoryID } from '../operations';
import { emptyTextBlock } from '../../../redux/story/reducer';

describe('Story API', () => {
  const id = uuid();

  const title = 'This is a unit tests for FEND story api.';
  const description =
    'This tests that FEND can successfully retrieve, create, delete, and modify stories.';
  const userID = 'berto@bert1.com';
  const userPassword = 'abc123#';
  const textBlock: TextBlockType = emptyTextBlock();
  const storyBlocks: StoryBlockType[] = [textBlock];
  const story: Story = {
    id,
    title,
    description,
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

  test('get all stories', async done => {
    const stories = await getAllStoriesAndHandleResponse();
    if (stories) {
      expect(stories.length).toBeGreaterThan(0);
      done();
    } else {
      expect(stories).toBeDefined();
      done();
    }
  }, 5000);

  test('create, update, retrieve, and delete story', async done => {
    const newTitle = 'new title who this';

    // Create
    expect(await saveStoryAndHandleResponse(story)).toEqual(true);

    // Update
    story.title = newTitle;
    expect(await saveStoryAndHandleResponse(story)).toEqual(true);

    // Retrieve
    const storyRetrieved: Story = await getStoryWithStoryID(story.id);
    expect(storyRetrieved.id).toEqual(id);
    expect(storyRetrieved.title).toEqual(newTitle);

    // Delete
    expect(await deleteStoryByIdAndHandleResponse(id)).toEqual(true);
    done();
  }, 20000);
});
