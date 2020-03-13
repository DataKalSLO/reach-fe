import { Editor, EditorState } from 'draft-js';
import { shallow } from 'enzyme';
import React from 'react';
import RichTextEditor from '../RichTextEditor';
import EditorToolbar from '../EditorToolbar';

describe('<RichTextEditor />', () => {
  let editorState = EditorState.createEmpty();
  const setEditorState = s => {
    editorState = s;
  };

  it('renders 1 <EditorToolbar /> component', () => {
    const wrapper = shallow(
      <RichTextEditor
        editorState={editorState}
        setEditorState={setEditorState}
      />
    );
    expect(wrapper.containsMatchingElement(<EditorToolbar />)).toBeTruthy();
  });

  it('renders 1 <Editor />', () => {
    const wrapper = shallow(
      <RichTextEditor
        editorState={editorState}
        setEditorState={setEditorState}
      />
    );
    expect(wrapper.containsMatchingElement(<Editor />)).toBeTruthy();
  });
});
