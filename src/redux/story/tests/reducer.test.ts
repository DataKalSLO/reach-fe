import * as actions from '../reducer';
import * as types from '../types';
import { emptyEditorState } from '../../../stories/RichTextEditor';
import { TEXT_BLOCK_TYPE, Story } from '../../../stories/StoryTypes';

describe('reducer', () => {
  const storyTest: Story = {
    id: 'test-id',
    userID: 'test-uid',
    title: 'Test Title',
    description: 'Test Description',
    storyBlocks: [
      {
        type: TEXT_BLOCK_TYPE,
        id: 'block1',
        editorState: emptyEditorState
      },
      {
        type: TEXT_BLOCK_TYPE,
        id: 'block2',
        editorState: emptyEditorState
      }
    ]
  };

  it('should swap text blocks', () => {
    const testSwapBlocksAction: types.StoryActionType = {
      type: types.SWAP_BLOCKS,
      payload: { oldIndex: 0, newIndex: 1 }
    };

    const expectedAfterSwap = {
      ...storyTest,
      storyBlocks: [
        {
          type: TEXT_BLOCK_TYPE,
          id: 'block2',
          editorState: emptyEditorState
        },
        {
          type: TEXT_BLOCK_TYPE,
          id: 'block1',
          editorState: emptyEditorState
        }
      ]
    };
    expect(actions.storyReducer(storyTest, testSwapBlocksAction)).toEqual(
      expectedAfterSwap
    );
  });

  it('should update the title of the story', () => {
    const testUpdateTitleAction: types.StoryActionType = {
      type: types.UPDATE_TITLE,
      payload: { newTitle: 'New Title!' }
    };

    const expectedAfterNewTitle = {
      ...storyTest,
      title: 'New Title!'
    };
    expect(actions.storyReducer(storyTest, testUpdateTitleAction)).toEqual(
      expectedAfterNewTitle
    );
  });

  it('should update the description of the story', () => {
    const testUpdateDescriptionAction: types.StoryActionType = {
      type: types.UPDATE_DESCRIPTION,
      payload: { newDescription: 'New Description of this amazing story!' }
    };

    const expectedAfterNewDescription = {
      ...storyTest,
      description: 'New Description of this amazing story!'
    };
    expect(
      actions.storyReducer(storyTest, testUpdateDescriptionAction)
    ).toEqual(expectedAfterNewDescription);
  });
});
