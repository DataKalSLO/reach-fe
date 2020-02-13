import { Box, IconButton, styled } from '@material-ui/core';
import { Editor as TextEditor, EditorState as TextEditorState } from 'draft-js';
import React from 'react';

function RichTextEditor() {
  const [textEditorState, setTextEditorState] = React.useState(
    TextEditorState.createEmpty()
  );

  return (
    <StyledBox>
      <EditorToolbar>
        <IconButton>
          <b>B</b>
        </IconButton>
        <IconButton>
          <em>I</em>
        </IconButton>
        <IconButton>
          <u>U</u>
        </IconButton>
      </EditorToolbar>
      <TextEditor editorState={textEditorState} onChange={setTextEditorState} />
    </StyledBox>
  );
}

export default RichTextEditor;

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
