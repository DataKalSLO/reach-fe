import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
    }
  })
);

export const useGraphStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '95%',
      scrollSnapAlign: 'center',
      scrollSnapStop: 'always',
      maxWidth: 'calc(100vw/2.2)'
    },
    card: {
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

export const useOptionsButtonsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: '20px',
      '&:focus': {
        backgroundColor: 'rgba(0,0,0,0.15)'
      }
    }
  })
);
