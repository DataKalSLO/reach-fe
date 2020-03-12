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
      action: {
        disabledBackground: { main: '#7b9a92' }
      }
    },
    status: {
      danger: 'red'
    },
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  })
);
