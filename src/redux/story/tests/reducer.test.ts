import * as actions from '../actions';
import * as types from '../types';

describe('actions', () => {
  it('should create an action to add an empty text block', () => {
    const expectedAction = {
      type: types.CREATE_EMPTY_TEXT_BLOCK
    };
    expect(actions.createEmptyTextBlock()).toEqual(expectedAction);
  });
});
