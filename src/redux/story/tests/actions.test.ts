import * as actions from '../actions';
import * as types from '../types';
import { EditorState } from 'draft-js';

describe('actions', () => {

  it('should create an action to update a text block - no changes', () => {
    const updateTextBlockAction = actions.updateTextBlock(
      0,
      EditorState.createEmpty()
    );

    const expectedAction = {
      type: types.UPDATE_TEXT_BLOCK,
      payload: {
        index: 0,
        editorState: EditorState.createEmpty()
      }
    };

    expect(updateTextBlockAction.payload.editorState.getBlockTree('1')).toEqual(
      expectedAction.payload.editorState.getBlockTree('1')
    );
    expect(updateTextBlockAction.payload.index).toEqual(
      expectedAction.payload.index
    );
    expect(updateTextBlockAction.type).toEqual(expectedAction.type);
  });
});
