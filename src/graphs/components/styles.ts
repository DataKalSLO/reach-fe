import {
  BottomNavigationAction,
  Divider,
  Paper,
  Toolbar
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  styled,
  Theme
} from '@material-ui/core/styles';

/*
 * Graph Header Styles
 */

export const StyledToolbar = styled(Toolbar)({
  overflow: 'scroll',
  margin: '0px 10px 0px 10px'
});

/*
 * Graph Component Styles
 */

export const StyledGraphPaper = styled(Paper)({
  borderWidth: '4px'
});

export const StyledGraphDivider = styled(Divider)({
  height: '3px',
  marginBottom: '10px'
});

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
 * fo the parent container.
 */

export const useGraphStyles = makeStyles((theme: Theme) =>
  createStyles({
    highcharts: {
      display: 'flex',
      height: 'auto !important',
      '& .highcharts-container': {
        display: 'flex',
        height: 'auto !important'
      },
      '& .highcharts-root': {
        display: 'flex',
        height: 'auto !important'
      },
      '& svg': {
        height: 'auto',
        width: '100%',
        minWidth: '300px'
      }
    }
  })
);
