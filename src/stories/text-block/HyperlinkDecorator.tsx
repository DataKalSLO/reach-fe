import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  CharacterMetadata
} from 'draft-js';
import React from 'react';

// all hyperlink functionality copied from https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/link/link.html

export class HyperlinkDecorator {
  protected findLinkEntities(
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState
  ) {
    contentBlock.findEntityRanges((character: CharacterMetadata) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    }, callback);
  }

  // We don't know what the props type is because it's coming from the DraftJS library
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected Hyperlink(props: any) {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    // FIXME: @kellie can this be refactored into a styled component?
    return (
      <a href={url} color="blue" style={styles.hyperlink}>
        {props.children}
      </a>
    );
  }

  public createHyperlinkDecorator() {
    return new CompositeDecorator([
      {
        strategy: this.findLinkEntities,
        component: this.Hyperlink
      }
    ]);
  }
}

const styles = {
  hyperlink: {
    color: 'blue',
    textDecoration: 'underline'
  }
};
