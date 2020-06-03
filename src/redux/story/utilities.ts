import { Story, TEXT_BLOCK_TYPE, StoryBlockType } from './types';

export function storyHasContent(story: Story) {
  return (
    story.title ||
    story.description ||
    story.storyBlocks.every(storyBlock => !storyBlockHasContent(storyBlock))
  );
}

export function storyBlockHasContent(storyBlock: StoryBlockType) {
  return (
    storyBlock.type === TEXT_BLOCK_TYPE &&
    !storyBlock.editorState.getCurrentContent().hasText()
  );
}
