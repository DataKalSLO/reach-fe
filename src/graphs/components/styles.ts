import {
  BottomNavigationAction,
  Box,
  Card,
  Container,
  Grid
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  styled,
  Theme
} from '@material-ui/core/styles';
import { theme } from '../../theme/theme';

/*
 * Graph Header Styles
 */

export const StyledHeaderGrid = styled(Grid)({
  flex: 'flex',
  flexFlow: 'row',
  alignItems: 'center',
  justifyContent: 'left',
  width: '95%',
  height: '5%',
  marginTop: '10px'
});

/*
 * Graph Component Styles
 */

export const StyledGraphBox = styled(Box)({
  width: '100%',
  height: '95%',
  scrollSnapAlign: 'center',
  scrollSnapStop: 'always',
  maxWidth: 'calc(100vw/2.2)'
});

export const StyledGraphCard = styled(Card)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'space-around',
  height: '95%',
  boxShadow: theme.shadows[5],
  marginLeft: '15px',
  margin: '20px'
});

export const StyledGraph = styled(Container)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  height: '90%',
  width: '95%',
  padding: '10px'
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
 * They are used to modify size of the actual chart.
 */

export const useGraphStyles = makeStyles((theme: Theme) =>
  createStyles({
    highcharts: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'stretch',
      height: '100%',
      border: '2px solid lightgrey',
      '& svg': {
        width: '100%',
        minWidth: '350px'
      }
    }
  })
);
