import React from 'react'


import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Grid } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: 'white',
        color: 'black'
    },

}));
export default function AppBarComponent(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="absolute" className={classes.appBar} >
                <Toolbar>
                    <Grid xs={9}>
                        <Typography variant="h6" color="inherit" noWrap>

                            {props.title}
                        </Typography>
                    </Grid>
                    <Breadcrumbs aria-label="breadcrumb" style={{ float: 'right' }}>
                        <Link color="inherit" href="/" >
                            {props.link1}
                        </Link>
                        <Typography color="textPrimary">
                            {props.link2}
                        </Typography>
                    </Breadcrumbs>

                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}
