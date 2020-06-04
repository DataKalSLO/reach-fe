import { Box, styled } from '@material-ui/core';
import { Editor, EditorState, RichUtils } from 'draft-js';
import React from 'react';
import { BORDER } from '../../theme/theme';
import { KEY_COMMAND_FAILURE, KEY_COMMAND_SUCCESS } from './DraftJSCommands';
import EditorToolbar from './EditorToolbar';
import { HyperlinkDecorator } from './HyperlinkDecorator';

interface Props {
  editorState: EditorState;
  setEditorState: (s: EditorState) => void;
}

export const emptyEditorState = EditorState.createEmpty(
  new HyperlinkDecorator().createHyperlinkDecorator()
);

export default function RichTextEditor(props: Props) {
  const { editorState, setEditorState } = props; // this is NOT a hook, the state is being managed in StoryEditor

  // enable key binding shortcuts (e.g. CTRL+B for bold)
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return KEY_COMMAND_SUCCESS;
    } else {
      return KEY_COMMAND_FAILURE;
    }
  };

  return (
    <StyledBox>
      <EditorToolbar
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <Editor
        editorState={editorState}
        onChange={s => setEditorState(s)}
        handleKeyCommand={handleKeyCommand}
      />
    </StyledBox>
  );
}

const paddingDefault = '10px';

//TODO: @tan refactor into StoryBlockWrapper
export const StyledBox = styled(Box)({
  width: '100%',
  minHeight: '100px',
  border: BORDER,
  borderRadius: '4px',
  paddingLeft: paddingDefault,
  paddingBottom: paddingDefault,
  paddingRight: paddingDefault,
  margin: '10px 0px'
});
