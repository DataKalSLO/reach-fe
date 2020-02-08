import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import MenuButton from './MenuButton';
import {
    HOME, HOME_NAME,
    EXPLORE, EXPLORE_NAME,
    VIZ_BUILDER, VIZ_BUILDER_NAME,
    STORY_BUILDER, STORY_BUILDER_NAME,
    MY_STUFF, MY_STUFF_NAME
} from './constants';

const useStyles = makeStyles(theme => ({
    appbar: {
        background: 'linear-gradient(90deg, #586571 -3.4%, #65BDAF 101.98%);',
    },
    title: {
        flexGrow: 1,
        display: 'none',
        color: 'white',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    noHoverButton: {
        textTransform: 'none',
        "&:hover": {
            backgroundColor: "transparent"
        }
    }
}));

function AppBar() {
    const classes = useStyles();
    let history = useHistory()
    const navigateTo = (route: string) => () => history.push(route)

    const menu = (
        <Grid container direction='row' justify='space-between' alignItems='center' spacing={3}>
            <Grid item>
                <Button className={classes.noHoverButton} onClick={navigateTo(HOME)}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {HOME_NAME}
                    </Typography>
                </Button>
            </Grid>
            <Grid item container xs={10} direction='row' justify='center' alignItems='center' spacing={8} wrap='nowrap'>
                <Grid item key={EXPLORE_NAME}>
                    <MenuButton name={EXPLORE_NAME} navigateToRoute={navigateTo(EXPLORE)} />
                </Grid>
                <Grid item key={VIZ_BUILDER_NAME}>
                    <MenuButton name={VIZ_BUILDER_NAME} navigateToRoute={navigateTo(VIZ_BUILDER)} />
                </Grid>
                <Grid item key={STORY_BUILDER_NAME}>
                    <MenuButton name={STORY_BUILDER_NAME} navigateToRoute={navigateTo(STORY_BUILDER)} />
                </Grid>
            </Grid>
            <Grid item>
                <MenuButton name={MY_STUFF_NAME} navigateToRoute={navigateTo(MY_STUFF)} />
                <IconButton onClick={async () => history.push(MY_STUFF)}>
                    <AccountCircleIcon fontSize='large' />
                </IconButton>
            </Grid>
        </Grid>
    )

    return (
        <MuiAppBar className={classes.appbar} position="static">
            <Toolbar>
                {menu}
            </Toolbar>
        </MuiAppBar>
    );
}

export default AppBar;