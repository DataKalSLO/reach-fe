
import { ExploreState, ExploreActionType } from '../types';
import { Story } from '../../story/types';
import { exploreReducer } from '../reducer';
import { FETCH_ALL_STORIES } from '../constants';


describe('explore reducer', () => {
  const emptyStory: Story = {
    id: '',
    userID: '',
    title: '',
    description: '',
    storyBlocks: []
  };

  const dummyStory: Story = {
    id: 'fak3-1d',
    userID: 'test@test.com',
    title: 'This is a title',
    description: 'This is a description',
    storyBlocks: []
  };

  const firstStory: Story = {
    id: '6f903a5e-0269-4ae9-b62f-bce8dd78a4d3',
    userID: 'test1@test.com',
    title: 'Dam Water Capacity Over Time',
    description: 'Our two main Dams in our central coast region, Salinas Dam and Lake Lopez.',
    storyBlocks: []
  };

  it('sends query for stories available in the backend', () => {
    expect(
      exploreReducer(undefined,
        { type: FETCH_ALL_STORIES,
          payload: {data: [emptyStory] as Array<Story>}
        }
      )
    ).toEqual
  });
})
