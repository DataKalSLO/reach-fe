
import { Story, ExploreState, ExploreActionType } from '../types';
import { exploreReducer } from '../reducer';
import { FETCH_ALL_STORIES } from '../constants';


describe('explore reducer', () => {
  const emptyStory: Story = {
    id: '',
    userID: '',
    title: '',
    description: '',
    storyBlocks: [] as Array<string>
  };

  const dummyStory: Story = {
    id: 'fak3-1d',
    userID: 'test@test.com',
    title: 'This is a title',
    description: 'This is a description',
    storyBlocks: [] as Array<string>
  };

  const firstStory: Story = {
    id: '6f903a5e-0269-4ae9-b62f-bce8dd78a4d3',
    userID: 'test1@test.com',
    title: 'Dam Water Capacity Over Time',
    description: 'Our two main Dams in our central coast region, Salinas Dam and Lake Lopez.',
    storyBlocks: [
    "{\"id\": \"6e159091-17a5-40a2-b3a5-f80da04ad71a\",\"type\": \"TEXTDB\",\"graphId\": null,\"mapId\": null,\"editorState\": \"{\"someSerializedJsonValue\":5}\",\"blockPosition\": 0}",
    "{\"id\": \"ee69b374-9bd6-4f44-b41f-e670b79762de\",\"type\": \"GRAPH\",\"graphId\": \"6b52d546-1828-4563-a010-ff8ffaf7fdf5\",\"mapId\": null,\"editorState\": null,\"blockPosition\": 1}",
    "{\"id\": \"6z52d546-1828-4563-a010-ff8ffaf7fdf5\",\"type\": \"GEOMAP\",\"graphId\": null,\"mapId\": \"74334533-4461-4b33-99ab-f2ae6d4658d1\",\"editorState\": null,\"blockPosition\": 2}"
    ] as Array<string>
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
