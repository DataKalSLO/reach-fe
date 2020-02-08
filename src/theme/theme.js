import {
    createMuiTheme,
    responsiveFontSizes
} from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

// Material UI's theming/styling solution 
// (explained here: https://material-ui.com/customization/theming/ and here https://material-ui.com/styles/basics/)
export const theme = responsiveFontSizes(
    createTheme({
        palette: {
            primary: teal,
        },
        status: {
            danger: 'red',
        },
    })
)
