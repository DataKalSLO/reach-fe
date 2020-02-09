// Stub for common component: Button
//
//   common components are esentially wrappers for Material UI components
//   we are creating wrappers in order to maintain consistent style between all teams
//
//   if you need a component that hasn't been implemented go ahead and set it up!
//     docs:  https://material-ui.com/
//   after implementing the component request someone from the React team for review

import React from 'react';
import Button from '@material-ui/core/Button';

// pass the text you want to be displayed
export function CreateTextButton(text: string){
  <Button>{text}</Button>
}
