import {
  createMuiTheme as createTheme,
  responsiveFontSizes
} from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

// Material UI's theming/styling solution
//  https://material-ui.com/styles/basics/
//  https://material-ui.com/customization/theming/
export const theme = responsiveFontSizes(
  createTheme({
    palette: {
<<<<<<< HEAD
      primary: teal
=======
      primary: teal,
      action: {
        disabledBackground: teal
      }
>>>>>>> ff3061f31f89699fbf101fdc2dbe31598ba29c84
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
