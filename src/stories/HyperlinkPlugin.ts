import { EditorState, RichUtils } from 'draft-js';
import React from 'react';
import { isValidURL, recoverURL } from '../common/util/urlValidation';

// all hyperlink functionality copied from https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/link/link.html

// https://css-tricks.com/snippets/javascript/javascript-keycodes/#article-header-id-1
const ENTER_KEY_CODE = 13;

class HyperlinkPlugin {
  private editorState: EditorState;
  private setEditorState: (s: EditorState) => void;
  private showURLInput: boolean;
  private setShowURLInput: (b: boolean) => void;
  private urlValue: string;
  private setURLValue: (url: string) => void;

  constructor(
    editorState: EditorState,
    setEditorState: (s: EditorState) => void,
    showURLInput: boolean,
    setShowURLInput: (b: boolean) => void,
    urlValue: string,
    setURLValue: (s: string) => void
  ) {
    this.editorState = editorState;
    this.setEditorState = setEditorState;
    this.showURLInput = showURLInput;
    this.setShowURLInput = setShowURLInput;
    this.urlValue = urlValue;
    this.setURLValue = setURLValue;
  }

  // Show the input field asking for URL
  public promptForLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const selection = this.editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = this.editorState.getCurrentContent();
      const startKey = this.editorState.getSelection().getStartKey();
      const startOffset = this.editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setShowURLInput(true);
      this.setURLValue(url);
    }
  };

  // Validate the URL. Apply it if it's a good URL, reject it otherwise
  public confirmLink = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    let linkToAdd = this.urlValue;

    // Check if the entered text is a valid URL
    if (!(await isValidURL(linkToAdd))) {
      // If not, attempt to correct the text to make it a valid URL
      const recovery = await recoverURL(linkToAdd);
      if (typeof recovery == 'string') {
        linkToAdd = recovery as string;
      } else {
        alert('That URL is not valid. Please double-check it and try again.');
        return;
      }
    }

    this.applyLink(linkToAdd);
  };

  public applyLink = (url: string) => {
    const contentState = this.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {
        url: url
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(this.editorState, {
      currentContent: contentStateWithEntity
    });
    this.setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
    this.setShowURLInput(false);
    this.setURLValue('');
  };

  // Confirm the link when <Enter> is pressed
  public onLinkInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.which === ENTER_KEY_CODE) {
      this.confirmLink(e);
    }
  };

  public removeLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const selection = this.editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setEditorState(
        RichUtils.toggleLink(this.editorState, selection, null)
      );
    }
  };
}

export { HyperlinkPlugin };
