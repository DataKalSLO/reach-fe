import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';

// NOTE: these utility functions are expensive,
// so ONLY call them before and after api calls respectively

// use when saving a TextBlock in StoryBuilderForm to the backend
export function contentToRaw(editorState: EditorState): string {
  if (editorState) {
    const contentState = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(contentState));
  }
  return '';
}

// use when populating a TextBlock in StoryBuilderForm
// from an exsisting story on the backend
export function rawToContent(raw: string): EditorState {
  return EditorState.createWithContent(convertFromRaw(JSON.parse(raw)));
}
