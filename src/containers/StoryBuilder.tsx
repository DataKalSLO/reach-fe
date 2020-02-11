import { Container } from '@material-ui/core';
import { Editor as TextEditor, EditorState as TextEditorState } from 'draft-js';
import React from 'react';

function StoryBuilder() {
  const [textEditorState, setTextEditorState] = React.useState(
    TextEditorState.createEmpty()
  );

  return (
    <Container>
      <h1>TODO: StoryBuilder</h1>
      <TextEditor
        editorState={textEditorState}
        onChange={setTextEditorState}
        placeholder="DRAFT.JS PLACEHOLDER TEXT EDITOR"
      />
    </Container>
  );
}

export default StoryBuilder;

// this code came from the draftjs getting started instructions, but i'm not sure how it's different from the functional style
// ReactDOM.render(<MyEditor />, document.getElementById('container'));
