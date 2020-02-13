import { Box, IconButton, styled } from '@material-ui/core';
import { Editor, EditorState, RichUtils } from 'draft-js';
import React from 'react';

function RichEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  // enable key binding shortcuts (e.g. ctrl+b for bold)
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    // Magic strings from Draft.js that signal success/failure. If you change these strings, the overriding WILL BREAK
    const successMsg = 'handled';
    const failureMsg = 'not-handled';

    if (newState) {
      setEditorState(newState);
      return successMsg;
    } else {
      return failureMsg;
    }
  };

  // connect icon buttons in the toolbar to the state updates
  function onClickFormatButton(buttonName: string) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, buttonName));
  }

  return (
    <StyledBox>
      <EditorToolbar>
        <IconButton onClick={() => onClickFormatButton('BOLD')}>
          <b>B</b>
        </IconButton>
        <IconButton onClick={() => onClickFormatButton('ITALIC')}>
          <em>I</em>
        </IconButton>
        <IconButton onClick={() => onClickFormatButton('UNDERLINE')}>
          <u>U</u>
        </IconButton>
      </EditorToolbar>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
    </StyledBox>
  );
}

export default RichEditor;

const EditorToolbar = styled(Box)({
  borderBottom: '1px solid #cbcbcb',
  marginBottom: '10px'
});

const StyledBox = styled(Box)({
  border: '1px solid #cbcbcb',
  borderRadius: '4px',
  paddingLeft: '10px',
  paddingBottom: '10px',
  paddingRight: '10px',
  margin: '10px 0px'
});
