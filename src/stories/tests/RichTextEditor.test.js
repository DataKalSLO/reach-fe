import { Editor, EditorState } from 'draft-js';
import { shallow } from 'enzyme';
import React from 'react';
import EditorToolbar from '../EditorToolbar';
import { HyperlinkDecorator } from '../HyperlinkDecorator';
import RichTextEditor, { emptyEditorState } from '../RichTextEditor';

describe('emptyEditorState', () => {
  it('renders empty editor', () => {
    expect(emptyEditorState.getCurrentContent().getPlainText()).toEqual('');
  });

  it('renders empty editor with HyperlinkDecorator', () => {
    const decorator = new HyperlinkDecorator().createHyperlinkDecorator();
    expect(emptyEditorState.getDecorator()).toEqual(decorator);
  });
});

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
