import React, {Component, useState} from 'react';
import {createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {Box, Grid} from "@material-ui/core";
import {getCurrentUser, logout} from "../../Api/UserApi";
import {Props} from "../UserProfile/Profile";
import { useHistory } from "react-router-dom";
import ForumIcon from '@material-ui/icons/Forum';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
            marginTop: theme.spacing(1),
            display: 'flex',
            cursor: 'pointer'
        },
        title: {
            flexGrow: 1,

        },
    }),
);


function NavbarJJ() {





        const classes = useStyles();
        const [userName,setUserName]=useState('')
        const [id,setId]=useState('')
        let history=useHistory();


    function handleGoToProfile() {
        history.push('/userProfile')
    }

    return (
            <div className={classes.root}>
                <AppBar>
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={3}>
                            <div className={classes.menuButton} aria-label="menu" onClick={() =>history.push("/")}>
                                <Grid container spacing={3}>
                                    <Grid item xs={3}>
                                        <div style={{marginLeft:20}}>
                                    {/*<ForumIcon style={{width:100,marginTop:10}}></ForumIcon>*/}
                                            <img style={{width:50}} src="https://img.icons8.com/fluent/96/000000/origami.png"/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={3}>
                                <Typography variant="h4" style={{marginTop: 6, marginBottom: 20, marginLeft:5,width: 400}}
                                            className={classes.title} gutterBottom>
                                        Jibber Jabber
                                </Typography>
                                    </Grid>
                        </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                        <Grid item xs={3}>



                        </Grid>
                        <Grid item xs={3}>
                            <Button color="inherit" style={{marginLeft:250,marginTop:7}}  onClick={() => handleGoToProfile()}>
                                <PermIdentityIcon fontSize={"large"}></PermIdentityIcon>
                                <Typography variant="h6" color="secondary" className={classes.title}>
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
        );


    function navigateToLogin() {
       history.push('/')
    }


    function navigateToRegister() {
      history.push("/register")
    }






    }
    export default NavbarJJ



