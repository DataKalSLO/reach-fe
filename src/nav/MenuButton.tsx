import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
        color: 'white',
        textTransform: 'none'
    },
    typography: {
        display: 'none',
        color: 'white',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}))

export interface MenuButtonProps {
    name: string,
    navigateToRoute(): void
}

function MenuButton(props: MenuButtonProps) {
    const { name, navigateToRoute } = props
    const classes = useStyles()
    return (
        <Button className={classes.button} onClick={navigateToRoute}>
            <Typography className={classes.typography} variant="body1" noWrap>
                {name}
            </Typography>
        </Button>
    )
}

export default MenuButton;