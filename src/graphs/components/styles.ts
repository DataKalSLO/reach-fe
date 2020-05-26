import { BottomNavigationAction } from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  styled,
  Theme
} from '@material-ui/core/styles';

/*
 * Options Bar Styles
 */

export const StyledBottomNav = styled(BottomNavigationAction)({
  borderRadius: '20px',
  '&:focus': {
    backgroundColor: 'rgba(0,0,0,0.15)'
  }
});

/*
 * Highcharts styles
 * These classes are passed down as arguments to Highcharts.
 * They are used to make the chart responsive to the size
 * to the parent container.
 */

export const useGraphStyles = makeStyles((theme: Theme) =>
  createStyles({
    highcharts: {
      display: 'flex',
      '& .highcharts-container': {
        height: '100% !important'
      },
      '& .highcharts-root': {
        height: '100%'
      },
      '& svg': {
        width: '100%',
        minWidth: '300px'
      }
    }
  })
);
