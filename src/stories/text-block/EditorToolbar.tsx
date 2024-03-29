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
import { Props as IconButtonProps } from '../../common/components/IconButton';
import {
  CollapsibleItem,
  CollapsibleMenu,
  IconButton
} from '../../reach-ui/core';
import { BORDER } from '../../theme/theme';
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

  let urlInputUI: {} | undefined;
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

  return (
    <Toolbar>
      <CollapsibleMenu>
        {/* text styles */}
        <CollapsibleItem hideWidth={DEFAULT_HIDE_WIDTH}>
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
              title="Bold"
              icon={<FormatBold />}
              onClick={() => onClickInlineStyle('BOLD')}
            />
            <ToolbarButton
              aria-label="Italic"
              title="Italic"
              icon={<FormatItalic />}
              onClick={() => onClickInlineStyle('ITALIC')}
            />
            <ToolbarButton
              aria-label="Underline"
              title="Underline"
              icon={<FormatUnderlined />}
              onClick={() => onClickInlineStyle('UNDERLINE')}
            />
            <ToolbarButton
              aria-label="Strikethrough"
              title="Strikethrough"
              icon={<StrikethroughS />}
              onClick={() => onClickInlineStyle('STRIKETHROUGH')}
            />
            <ToolbarButton
              aria-label="Monospace"
              title="Monospace"
              icon={<Code />}
              onClick={() => onClickInlineStyle('CODE')}
            />
          </FormatButtonGroup>
        </CollapsibleItem>

        {/* list styles */}
        <CollapsibleItem hideWidth={LIST_STYLE_HIDE_WIDTH}>
          <FormatButtonGroup>
            <ToolbarButton
              aria-label="Unordered List"
              title="Unordered List"
              icon={<FormatListBulleted />}
              onClick={() => onClickBlockType('unordered-list-item')}
            />
            <ToolbarButton
              aria-label="Ordered List"
              title="Ordered List"
              icon={<FormatListNumbered />}
              onClick={() => onClickBlockType('ordered-list-item')}
            />
          </FormatButtonGroup>
        </CollapsibleItem>

        {/* link styles */}
        <CollapsibleItem hideWidth={LINK_STYLE_HIDE_WIDTH}>
          <FormatButtonGroup>
            <ToolbarButton
              aria-label="Add Hyperlink"
              title="Add Hyperlink"
              icon={<Link />}
              onClick={hyperlinkPlugin.promptForLink}
            />
            <ToolbarButton
              aria-label="Remove Hyperlink"
              title="Remove Hyperlink"
              icon={<LinkOff />}
              onClick={hyperlinkPlugin.removeLink}
            />
            {urlInputUI}
          </FormatButtonGroup>
        </CollapsibleItem>
      </CollapsibleMenu>
    </Toolbar>
  );
};

// Screenwidth when a group of items to become hidden in the collapsible menu
const DEFAULT_HIDE_WIDTH = 0;
const LIST_STYLE_HIDE_WIDTH = 980;
const LINK_STYLE_HIDE_WIDTH = 1030;

const borderStyle = BORDER;
const paddingDefault = '10px';

const Toolbar = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  borderBottom: borderStyle,
  marginBottom: '10px',
  padding: '5px 0px 5px 0px'
});

// Adds vertical bar on the rhs of the group
const FormatButtonGroup = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: paddingDefault,
  paddingRight: paddingDefault,
  borderRight: borderStyle
});

const StyledTextField = styled(TextField)({
  width: '140px'
});

const URLInputBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  margin: '1px',
  minWidth: '150px'
});

const URLInputField = styled(TextField)({
  margin: '5px'
});

export default EditorToolbar;
