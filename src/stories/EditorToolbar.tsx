import { Box, MenuItem, styled, TextField } from '@material-ui/core';
import {
  Code,
  Done,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatUnderlined,
  Link,
  LinkOff,
  StrikethroughS
} from '@material-ui/icons';
import { EditorState, RichUtils } from 'draft-js';
import React, { useState } from 'react';
import {
  IconButton,
  Props as IconButtonProps
} from '../common/components/IconButton';
import { DraftJSBlockType, DraftJSInlineType } from './DraftJSCommands';
import { HyperlinkPlugin } from './HyperlinkPlugin';

const ToolbarButton = (props: IconButtonProps) => {
  return <IconButton size="small" color="default" {...props} />;
};

interface Props {
  editorState: EditorState;
  setEditorState: (s: EditorState) => void;
}

const EditorToolbar = (props: Props) => {
  const [showURLInput, setShowURLInput] = useState(false);
  const [urlValue, setURLValue] = useState('');

  const hyperlinkPlugin = new HyperlinkPlugin(
    props.editorState,
    props.setEditorState,
    showURLInput,
    setShowURLInput,
    urlValue,
    setURLValue
  );

  // connect icon buttons in the toolbar to the state updates for inline styles
  const onClickInlineStyle = (buttonName: DraftJSInlineType) => {
    props.setEditorState(
      RichUtils.toggleInlineStyle(props.editorState, buttonName)
    );
  };

  // connect icon buttons and heading select in the toolbar to the state updates for block styles
  const onClickBlockType = (buttonName: DraftJSBlockType) => {
    props.setEditorState(
      RichUtils.toggleBlockType(props.editorState, buttonName)
    );
  };

  let urlInputUI;
  if (showURLInput) {
    urlInputUI = (
      <URLInputBox>
        <URLInputField
          autoFocus={true}
          color="primary"
          margin="dense"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setURLValue(e.target.value)
          }
          onKeyDown={hyperlinkPlugin.onLinkInputKeyDown}
          size="small"
          value={urlValue}
          variant="outlined"
        />
        <ToolbarButton
          aria-label="Confirm Hyperlink"
          icon={<Done />}
          onClick={hyperlinkPlugin.confirmLink}
          edge="start"
          color="primary"
        />
      </URLInputBox>
    );
  }

  return (
    <Toolbar>
      {/* text styles */}
      <FormatButtonGroup>
        <StyledTextField
          id="heading-style-select"
          select
          label="Heading Style"
          variant="outlined"
          margin="dense"
          value={RichUtils.getCurrentBlockType(props.editorState)}
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
        </StyledTextField>

        <ToolbarButton
          aria-label="Bold"
          icon={<FormatBold />}
          onClick={() => onClickInlineStyle('BOLD')}
        />
        <ToolbarButton
          aria-label="Italic"
          icon={<FormatItalic />}
          onClick={() => onClickInlineStyle('ITALIC')}
        />
        <ToolbarButton
          aria-label="Underline"
          icon={<FormatUnderlined />}
          onClick={() => onClickInlineStyle('UNDERLINE')}
        />
        <ToolbarButton
          aria-label="Strikethrough"
          icon={<StrikethroughS />}
          onClick={() => onClickInlineStyle('STRIKETHROUGH')}
        />
        <ToolbarButton
          aria-label="Monospace"
          icon={<Code />}
          onClick={() => onClickInlineStyle('CODE')}
        />
      </FormatButtonGroup>

      {/* list styles */}
      <FormatButtonGroup>
        <ToolbarButton
          aria-label="Unordered List"
          icon={<FormatListBulleted />}
          onClick={() => onClickBlockType('unordered-list-item')}
        />
        <ToolbarButton
          aria-label="Ordered List"
          icon={<FormatListNumbered />}
          onClick={() => onClickBlockType('ordered-list-item')}
        />
      </FormatButtonGroup>

      <FormatButtonGroup>
        <ToolbarButton
          aria-label="Add Hyperlink"
          icon={<Link />}
          onClick={hyperlinkPlugin.promptForLink}
        />
        <ToolbarButton
          aria-label="Remove Hyperlink"
          icon={<LinkOff />}
          onClick={hyperlinkPlugin.removeLink}
        />
        {urlInputUI}
      </FormatButtonGroup>
    </Toolbar>
  );
};

const borderStyle = '1px solid #cbcbcb';
const paddingDefault = '10px';

const Toolbar = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  borderBottom: borderStyle,
  marginBottom: '10px',
  padding: '5px 0px 5px 0px'
});

const FormatButtonGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: paddingDefault,
  paddingRight: paddingDefault,
  borderRight: borderStyle
});

const StyledTextField = styled(TextField)({
  width: '130px'
});

const URLInputBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  margin: '1px'
});

const URLInputField = styled(TextField)({
  margin: '5px'
});

export default EditorToolbar;
