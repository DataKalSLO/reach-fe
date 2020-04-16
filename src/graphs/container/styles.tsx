import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
<<<<<<< HEAD

export const useGraphContainerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '97%',
      marginLeft: '15px',
      overflow: 'scroll',
      scrollSnapType: 'y mandatory',
      '&::-webkit-scrollbar': {
        width: '0.5em'
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        backgroundColor: 'rgba(0,0,0,.3)',
        outline: '1px solid slategrey'
      }
    },
    item: {
      width: '100%',
      height: '95%',
      scrollSnapAlign: 'center',
      scrollSnapStop: 'always',
      maxWidth: 'calc(100vw/2.2)'
    }
  })
);
=======
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { BottomNavigation, Typography } from '@material-ui/core';
import { theme } from '../../theme/theme';

/*
 * Graph Container styles
 */

export const StyledGraphContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '97%',
  marginLeft: '15px',
  overflow: 'scroll',
  scrollSnapType: 'y mandatory',
  '&::-webkit-scrollbar': {
    width: '0.5em'
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    backgroundColor: 'rgba(0,0,0,.3)',
    outline: '1px solid slategrey'
  }
});

export const StyledGraphComponent = styled(Box)({
  width: '100%',
  height: '95%',
  scrollSnapAlign: 'center',
  scrollSnapStop: 'always',
  maxWidth: 'calc(100vw/2.2)'
});

/*
 * Options Bar Container styles
 */

export const StyledPopover = styled(Popover)({
  pointerEvents: 'none',
  marginBottom: '15px'
});

export const StyledTypography = styled(Typography)({
  padding: theme.spacing(2),
  fontSize: 'large'
});

export const StyledBottomNav = styled(BottomNavigation)({
  height: '80px',
  width: '65vw',
  backgroundColor: 'white',
  marginBottom: '10px',
  boxShadow: theme.shadows[5],
  border: '1px solid rgba(0,0,0,0.3)',
  borderRadius: '5px'
});

/*
 * The menuButton class and the hide class are needed to
 * to dynamically show and hide the options bar.
 * The drawer and the drawerPaper classes are needed to
 * allow the options bar to float near the bottom rather
 * than sit at the bottom. These cannot be styled since
 * the classes have to be passed as arguments.
 */
>>>>>>> 7353dcf729116cde9b30e71ac7d2a08e16579842

export const useOptionsStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      position: 'fixed',
      right: '50%',
      left: '50%',
<<<<<<< HEAD
      top: '94%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
=======
      top: '95%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      margin: '0px !important',
>>>>>>> 7353dcf729116cde9b30e71ac7d2a08e16579842
      boxShadow: theme.shadows[5],
      '&:hover': {
        backgroundColor: 'white'
      }
    },
    drawer: {
      width: '100%',
      backgroundColor: 'transparent',
      flexShrink: 0
    },
    drawerPaper: {
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      border: 'none'
    },
    hide: {
      display: 'none'
<<<<<<< HEAD
    },
    nav: {
      height: '80px',
      width: '65vw',
      backgroundColor: 'white',
      marginBottom: '10px',
      boxShadow: theme.shadows[5],
      border: '1px solid rgba(0,0,0,0.3)',
      borderRadius: '5px'
    },
    popover: {
      pointerEvents: 'none',
      marginBottom: '15px'
    },
    typography: {
      padding: theme.spacing(2),
      fontSize: 'large'
    }
  })
);

export const useGraphHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
      justifyContent: 'left',
      width: '95%',
      height: '5%',
      marginTop: '10px'
    },
    typography: {
      padding: theme.spacing(2),
      fontSize: 'large'
    },
    button: {
      backgroundColor: 'white',
      boxShadow: 'none',
      marginLeft: '5px'
=======
>>>>>>> 7353dcf729116cde9b30e71ac7d2a08e16579842
    }
  })
);
