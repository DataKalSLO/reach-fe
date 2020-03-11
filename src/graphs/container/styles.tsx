import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import transitions from '@material-ui/core/styles/transitions';

export const useVizBuilderStyles = makeStyles((them: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      height: '90vh',
      padding: '0px',
      position: 'relative',
      overflow: 'hidden',
      '& .splitter-layout .layout-pane': {
        overflow: 'hidden'
      }
    },
    grid: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      overflow: 'hidden'
    },
    leftNav: {
      position: 'absolute',
      top: '50%',
      right: '0'
    },
    rightNav: {
      position: 'absolute',
      top: '50%',
      left: '0',
      transform: 'scaleX(-1)'
    }
  })
);

export const useGraphContainerStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      marginLeft: '15px',
      overflow: 'scroll',
      scrollSnapType: 'y mandatory'
    },
    item: {
      width: '100%',
      height: '100%',
      scrollSnapAlign: 'center',
      scrollSnapStop: 'always',
      maxWidth: 'calc(100vw/2.2)'
    },
    button: {
      position: 'absolute',
      top: 0,
      right: 10,
      margin: theme.spacing(1),
      boxShadow: theme.shadows[5]
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);

export const useGraphStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'space-around',
      height: '95%',
      boxShadow: theme.shadows[5],
      marginLeft: '15px',
      margin: '20px'
    },
    graphContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      height: '90%',
      padding: '10px'
    },
    expand: {
      transform: 'rotate(90deg)',
      marginLeft: 'auto',
      transition: transitions.create('transform', {
        duration: transitions.duration.shortest
      })
    },
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

export const useOptionsStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      position: 'fixed',
      right: '50%',
      left: '50%',
      top: '94%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
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
      backgroundColor: 'transparent'
    },
    hide: {
      display: 'none'
    },
    nav: {
      height: '80px',
      width: '65vw',
      backgroundColor: 'white',
      marginBottom: '10px',
      boxShadow: theme.shadows[5],
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
      marginLeft: '10px'
    }
  })
);

export const useGraphCreateFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      width: '50%',
      height: '50%',
      top: '50%',
      left: '50%',
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    list: {
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90%',
      width: '90%',
      border: '1px solid grey'
    },
    item: {
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      backgroundColor: 'white',
      margin: theme.spacing(1),
      boxShadow: theme.shadows[5]
    }
  })
);
