import {
  BottomNavigationAction,
  Divider,
  Paper,
  Toolbar,
  Box
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

export const StyledBox = styled(Box)({
  display: 'inline-block',
  width: '100%'
});

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
