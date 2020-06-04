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

// Constants for styling Toolbars
export const BORDER = '1px solid #cbcbcb'; // TODO: import into EditorToolbar and RichTextEditor
