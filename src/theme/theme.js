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
      primary: teal
    },
    status: {
      danger: 'red'
    }
  })
);
