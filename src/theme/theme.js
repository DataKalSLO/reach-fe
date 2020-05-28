import {
  createMuiTheme as createTheme,
  responsiveFontSizes
} from '@material-ui/core/styles';

// Material UI's theming/styling solution
//  https://material-ui.com/styles/basics/
//  https://material-ui.com/customization/theming/
export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: '#73bfa1' },
      secondary: { main: '#f1b71c' },
      action: {
        disabledBackground: { main: '#7b9a92' }
      },
      contrastThreshold: 3,
      tonalOffset: 0.2
    },
    status: {
      danger: 'red'
    }
  })
);

export const NAV_BAR_COLOR = '#133F4D';

// Constants for styling the scroll bar
export const SCROLL_SNAP_TYPE = 'y mandatory';
export const SCROLLBAR_WIDTH = '0.5em';
export const SCROLLBAR_WEBKIT_BOX_SHADOW = 'inset 0 0 6px rgba(0,0,0,0.00)';
export const WEBKIT_BORDER_RADIUS = '10px';
export const WEBKIT_BACKGROUND_COLOR = 'rgba(0,0,0,.3)';
export const WEBKIT_OUTLINE = '1px solid slategrey';

// Constants for styling Toolbars
export const BORDER = '1px solid #cbcbcb'; // TODO: import into EditorToolbar and RichTextEditor
