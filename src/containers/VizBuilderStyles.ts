import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
