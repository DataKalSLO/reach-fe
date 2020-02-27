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
import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatUnderlined,
  StrikethroughS
} from '@material-ui/icons';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import { DraftJSBlockType, DraftJSInlineType } from './DraftJSCommands';
import React from 'react';

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

interface Props {
  editorState: EditorState;
  setEditorState: (s: EditorState) => void;
}

export default function RichTextEditor(props: Props) {
  const { editorState, setEditorState } = props; // this is NOT a hook, the state is being managed in StoryForm
  console.log(editorState);

  // enable key binding shortcuts (e.g. CTRL+B for bold)
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    // Magic strings from Draft.js that signal success/failure. If you change these strings, the overriding WILL BREAK
    const successMsg = 'handled';
    const failureMsg = 'not-handled';

    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return successMsg;
    } else {
      return failureMsg;
    }
  };

  // connect icon buttons in the toolbar to the state updates for inline styles
  const onClickInlineStyle = (buttonName: DraftJSInlineType) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, buttonName));
  };

  // connect icon buttons and heading select in the toolbar to the state updates for block styles
  const onClickBlockType = (buttonName: DraftJSBlockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, buttonName));
  };

  return (
    <StyledBox>
      <EditorToolbar>
        {/* text styles */}
        <FormatButtonGroup>
          <FormControl variant="outlined">
            <InputLabel id="heading-style-select-label">
              Heading Style
            </InputLabel>
            <StyledSelect
              labelId="heading-style-select-label"
              id="heading-style-select"
              variant="outlined"
              value={RichUtils.getCurrentBlockType(editorState)}
              onChange={value =>
                onClickBlockType(value.target.value as DraftJSBlockType)
              }
              defaultValue={'unstyled'}
            >
              <MenuItem value={'unstyled'}>Normal text</MenuItem>
              <MenuItem value={'header-one'}>Heading 1</MenuItem>
              <MenuItem value={'header-two'}>Heading 2</MenuItem>
              <MenuItem value={'header-three'}>Heading 3</MenuItem>
              <MenuItem value={'header-four'}>Heading 4</MenuItem>
              <MenuItem value={'header-five'}>Heading 5</MenuItem>
              <MenuItem value={'header-six'}>Heading 6</MenuItem>
            </StyledSelect>
          </FormControl>

          <IconButton onClick={() => onClickInlineStyle('BOLD')}>
            <FormatBold />
          </IconButton>
          <IconButton onClick={() => onClickInlineStyle('ITALIC')}>
            <FormatItalic />
          </IconButton>
          <IconButton onClick={() => onClickInlineStyle('UNDERLINE')}>
            <FormatUnderlined />
          </IconButton>
          <IconButton onClick={() => onClickInlineStyle('STRIKETHROUGH')}>
            <StrikethroughS />
          </IconButton>
          <IconButton onClick={() => onClickInlineStyle('CODE')}>
            <Code />
          </IconButton>
        </FormatButtonGroup>

        {/* list styles */}
        <FormatButtonGroup>
          <IconButton onClick={() => onClickBlockType('unordered-list-item')}>
            <FormatListBulleted />
          </IconButton>
          <IconButton onClick={() => onClickBlockType('ordered-list-item')}>
            <FormatListNumbered />
          </IconButton>
        </FormatButtonGroup>
      </EditorToolbar>

      <Editor
        editorState={editorState}
        onChange={s => setEditorState(s)}
        handleKeyCommand={handleKeyCommand}
      />
    </StyledBox>
  );
}

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
