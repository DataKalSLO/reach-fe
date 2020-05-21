// key bindings
// Magic strings from Draft.js that signal success/failure. If you change these strings, the overriding WILL BREAK
export const KEY_COMMAND_SUCCESS = 'handled';
export const KEY_COMMAND_FAILURE = 'not-handled';

// inline styles
export type DraftJSInlineType =
  | 'BOLD'
  | 'ITALIC'
  | 'CODE'
  | 'STRIKETHROUGH'
  | 'UNDERLINE';

// block styles
export type DraftJSBlockType =
  // heading styles
  | 'header-one'
  | 'header-two'
  | 'header-three'
  | 'header-four'
  | 'header-five'
  | 'header-six'
  | 'unstyled'

  // list styles
  | 'ordered-list-item'
  | 'unordered-list-item';
