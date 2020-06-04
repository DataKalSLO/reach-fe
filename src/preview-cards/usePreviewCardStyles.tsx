import { makeStyles } from '@material-ui/core/styles';

// allow allow cards to have custom aspect ratios
export interface StyleProps {
  minWidth: number;
  maxWidth: number;
}

export const usePreviewCardStyles = makeStyles({
  card: (props: StyleProps) => ({
    width: '30%',
    minWidth: props.minWidth,
    maxWidth: props.maxWidth,
    height: '20%',
    margin: 10,
    padding: 2,
    display: 'flex',
    flexDirection: 'column'
  }),
  header: {
    paddingBottom: 0
  },
  media: {
    height: 0,
    width: '100%',
    paddingTop: '60%' // controls the height of the image
  }
});
