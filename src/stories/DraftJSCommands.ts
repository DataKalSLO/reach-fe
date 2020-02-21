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
