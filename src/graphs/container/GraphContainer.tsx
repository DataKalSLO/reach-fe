import { CircularProgress, Grid, styled, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTab } from '../../common/components/PersistentDrawer';
import { INITIATIVES_SIDEBAR } from '../../reach-ui/constants';
import { Snackbar } from '../../reach-ui/core';
import { getDefaultGraphs } from '../../redux/graphbuilder/actions';
import { getGraphs } from '../../redux/graphbuilder/selector';
import { HEALTH } from '../../redux/graphs/constants';
import { getNotifications } from '../../redux/notifications/selector';
import { getVizbuilder } from '../../redux/vizbuilder/selector';
import { GraphCard } from '../components/GraphCard';
import { generateEmptyGraph } from '../forms/defaults';
import { GraphCreateForm } from '../forms/GraphCreateForm';
import {
  CIRCULAR_PROGRESS_SIZE,
  TITLE_PADDING_LEFT,
  CONTAINER_HEIGHT
} from './constants';
import InitiativesSidebar, {
  sidebarWidth as initiativesSidebarWidth
} from './InitiativesSidebar';

/*
 * Renders a list of graphs.
 */
function GraphContainer() {
  const graphState = useSelector(getGraphs);
  const vizState = useSelector(getVizbuilder);
  const notificationsState = useSelector(getNotifications);
  const dispatch = useDispatch();

  // Use the prebuilt health graphs as the default graphs
  useEffect(() => {
    dispatch(getDefaultGraphs(HEALTH));
  }, [dispatch]);

  /*
   * Creates a component for each graph. A graph component contains
   * the graph itself, and the toolbar.
   */
  const getGraphComponents = () => {
    return graphState.graphs.map((graph, index) => (
      <GridItem item key={index}>
        <GraphCard graph={graph} index={index} />
      </GridItem>
    ));
  };

  const LoadingSpinner = () => {
    return (
      <Grid
        container
        item
        alignItems="center"
        justify="center"
        style={{ height: CONTAINER_HEIGHT }}
      >
        <CircularProgress color="primary" size={CIRCULAR_PROGRESS_SIZE} />
      </Grid>
    );
  };

  const Title = () => {
    return (
      <Typography
        variant="h4"
        component="h1"
        style={{ paddingLeft: TITLE_PADDING_LEFT }}
      >
        {getCurrentTab(INITIATIVES_SIDEBAR)}
      </Typography>
    );
  };

  const LabeledGraphsList = () => {
    return (
      <Grid container item>
        <Grid item>
          <Title />
        </Grid>
        <Grid container item>
          {getGraphComponents()}
        </Grid>
      </Grid>
    );
  };

  const LabeledGraphBuilder = () => {
    return (
      <Grid container item>
        <Grid item style={{ paddingBottom: 10 }}>
          <Title />
        </Grid>
        <Grid container item style={{ paddingLeft: TITLE_PADDING_LEFT }}>
          <GraphCreateForm
            graph={generateEmptyGraph(vizState.metadataForAllDatasets)}
            datasetsMetaData={vizState.metadataForAllDatasets}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <GridContainer container item>
        <Snackbar
          actionId={notificationsState.actionStatus.actionId}
          severity={notificationsState.actionStatus.severity}
          open={notificationsState.actionStatus.show}
          message={notificationsState.actionStatus.message}
        />
        {/* Show loader while fetching */}
        {graphState.isFetching ? <LoadingSpinner /> : null}
        {/* Show graphs while not creating or fetching */}
        {!graphState.isCreating && !graphState.isFetching ? (
          <LabeledGraphsList />
        ) : null}
        {/* Show the create form when creating */}
        {graphState.isCreating ? <LabeledGraphBuilder /> : null}
      </GridContainer>
      <InitiativesSidebar />
    </>
  );
}

export default GraphContainer;

/*
 * Styles
 */
const paddingDefault = '10px';
const GridContainer = styled(Grid)({
  justifyContent: 'center',
  alignItems: 'flex-start',
  overflow: 'scroll',
  paddingTop: paddingDefault,
  paddingBottom: paddingDefault,
  paddingLeft: 0,
  paddingRight: initiativesSidebarWidth
});

const GridItem = styled(Grid)({
  width: '95%',
  maxWidth: 'calc(100vw/2.2)',
  padding: '10px 0px 10px 20px'
});
