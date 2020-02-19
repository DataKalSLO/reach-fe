import { Box, IconButton, styled } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import CodeIcon from '@material-ui/icons/Code';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { useField } from 'formik';
import React from 'react';

const DraftJSCommands = {
  bold: 'BOLD',
  bulletedList: 'unordered-list-item',
  italic: 'ITALIC',
  monospace: 'CODE',
  numberedList: 'ordered-list-item',
  underline: 'UNDERLINE',
  strikethrough: 'STRIKETHROUGH'
};

interface Props {
  name: string;
}

// Custom Formik Field
//   https://jaredpalmer.com/formik/docs/api/useField
//
const RichTextEditor = (props: Props) => {
  const [field, meta, helpers] = useField(props.name);
  const { value } = meta;
  const { setValue } = helpers;

  // enable key binding shortcuts (e.g. ctrl+b for bold)
  function handleKeyCommand(command: string, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    // Magic strings from Draft.js that signal success/failure
    //   NOTE: If you change these strings, the overriding WILL BREAK
    const successMsg = 'handled';
    const failureMsg = 'not-handled';

    if (newState) {
      setValue(newState);
      return successMsg;
    } else {
      return failureMsg;
    }
  }

  // connect icon buttons in the toolbar to the state updates for inline styles
  function onClickInlineStyle(buttonName: string) {
    setValue(RichUtils.toggleInlineStyle(value, buttonName));
  }
  // connect icon buttons in the toolbar to the state updates
  function onClickBlockType(buttonName: string) {
    setValue(RichUtils.toggleBlockType(value, buttonName));
  }

  return (
    <div>
      <StyledBox>
        <EditorToolbar>
          <FormatButtonGroup>
            <IconButton
              onClick={() => onClickInlineStyle(DraftJSCommands.bold)}
            >
              <FormatBoldIcon />
            </IconButton>
            <IconButton
              onClick={() => onClickInlineStyle(DraftJSCommands.italic)}
            >
              <FormatItalicIcon />
            </IconButton>
            <IconButton
              onClick={() => onClickInlineStyle(DraftJSCommands.underline)}
            >
              <FormatUnderlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => onClickInlineStyle(DraftJSCommands.strikethrough)}
            >
              <StrikethroughSIcon />
            </IconButton>
            <IconButton
              onClick={() => onClickInlineStyle(DraftJSCommands.monospace)}
            >
              <CodeIcon />
            </IconButton>
          </FormatButtonGroup>
          <FormatButtonGroup>
            <IconButton
              onClick={() => onClickBlockType(DraftJSCommands.bulletedList)}
            >
              <FormatListBulletedIcon />
            </IconButton>
            <IconButton
              onClick={() => onClickBlockType(DraftJSCommands.numberedList)}
            >
              <FormatListNumberedIcon />
            </IconButton>
          </FormatButtonGroup>
        </EditorToolbar>
        <Editor
          editorState={value}
          onChange={setValue}
          handleKeyCommand={handleKeyCommand}
        />
      </StyledBox>
    </div>
  );
};

export default RichTextEditor;

const EditorToolbar = styled(Box)({
  borderBottom: '1px solid #cbcbcb',
  marginBottom: '10px',
  display: 'flex',
  flexDirection: 'row'
});

const FormatButtonGroup = styled(Box)({
  paddingLeft: '10px',
  paddingRight: '10px',
  borderRight: '1px solid #cbcbcb'
});

const StyledBox = styled(Box)({
  border: '1px solid #cbcbcb',
  borderRadius: '4px',
  paddingLeft: '10px',
  paddingBottom: '10px',
  paddingRight: '10px',
  margin: '10px 0px'
});
