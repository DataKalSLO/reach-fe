import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  withStyles
} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils
} from 'draft-js';
import React, { useState } from 'react';

// utility functions
export function rawToContent(raw: string) {
  return EditorState.createWithContent(convertFromRaw(JSON.parse(raw)));
}
export function contentToRaw(editorState: EditorState) {
  if (editorState) {
    const contentState = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(contentState));
  }
  return '';
}

const DraftJSCommands = {
  // inline styles
  bold: 'BOLD',
  italic: 'ITALIC',
  monospace: 'CODE',
  underline: 'UNDERLINE',
  strikethrough: 'STRIKETHROUGH',

  // block styles
  blockquote: 'blockquote',
  bulletedList: 'unordered-list-item',
  headings: {
    h1: 'header-one',
    h2: 'header-two',
    h3: 'header-three',
    h4: 'header-four',
    h5: 'header-five',
    h6: 'header-six',
    unstyled: 'unstyled'
  },
  numberedList: 'ordered-list-item'
};

interface Props {
  sendData: any;
}

const RichTextEditor = (props: Props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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

  // connect icon buttons in the toolbar to the state updates for inline styles
  function onClickInlineStyle(buttonName: string) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, buttonName));
  }

  function onClickBlockType(buttonName: string) {
    setEditorState(RichUtils.toggleBlockType(editorState, buttonName));
  }

  return (
    <div>
      <StyledBox>
        <EditorToolbar>
          {/* text styles */}
          <FormatButtonGroup>
            <FormControl variant="outlined">
              <InputLabel id="heading-style-select-label">
                Heading Style
              </InputLabel>

              {/* TODO: label should animate into the select if nothing is selected */}
              <StyledSelect
                labelId="heading-style-select-label"
                id="heading-style-select"
                variant="outlined"
                value={RichUtils.getCurrentBlockType(editorState)}
                onChange={value =>
                  onClickBlockType(value.target.value as string)
                }
                defaultValue={DraftJSCommands.headings.unstyled}
              >
                <MenuItem value={DraftJSCommands.headings.unstyled}>
                  Normal text
                </MenuItem>
                <MenuItem value={DraftJSCommands.headings.h1}>
                  Heading 1
                </MenuItem>
                <MenuItem value={DraftJSCommands.headings.h2}>
                  Heading 2
                </MenuItem>
                <MenuItem value={DraftJSCommands.headings.h3}>
                  Heading 3
                </MenuItem>
                <MenuItem value={DraftJSCommands.headings.h4}>
                  Heading 4
                </MenuItem>
                <MenuItem value={DraftJSCommands.headings.h5}>
                  Heading 5
                </MenuItem>
                <MenuItem value={DraftJSCommands.headings.h6}>
                  Heading 6
                </MenuItem>
              </StyledSelect>
            </FormControl>
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

          {/* list styles */}
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
          editorState={editorState}
          onChange={s => {
            setEditorState(s);
            props.sendData(s);
          }}
          handleKeyCommand={handleKeyCommand}
        />
      </StyledBox>
    </div>
  );
};

export default RichTextEditor;

const borderStyle = '1px solid #cbcbcb';
const paddingDefault = '10px';

const EditorToolbar = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  borderBottom: borderStyle,
  marginBottom: '10px',
  paddingTop: '5px',
  paddingBottom: '5px'
});

const FormatButtonGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: paddingDefault,
  paddingRight: paddingDefault,
  borderRight: borderStyle
});

const StyledSelect = withStyles({
  root: {
    padding: paddingDefault,
    width: '90px'
  }
})(Select);

const StyledBox = styled(Box)({
  border: borderStyle,
  borderRadius: '4px',
  paddingLeft: paddingDefault,
  paddingBottom: paddingDefault,
  paddingRight: paddingDefault,
  margin: '10px 0px'
});
