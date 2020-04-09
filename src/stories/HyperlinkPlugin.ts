import { EditorState, RichUtils } from 'draft-js';
import React from 'react';

// all hyperlink functionality copied from https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/link/link.html

// https://css-tricks.com/snippets/javascript/javascript-keycodes/#article-header-id-1
const ENTER_KEY_CODE = 13;

export class HyperlinkPlugin {
  private editorState: EditorState;
  private setEditorState: (s: EditorState) => void;
  private showURLInput: boolean;
  private setShowURLInput: (b: boolean) => void;
  private urlValue: string;
  private setURLValue: (url: string) => void;

  // TODO: @kellie @tan is it possible to name these params so they don't get messed up?
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

  public confirmLink = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const contentState = this.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {
        url: this.urlValue
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
