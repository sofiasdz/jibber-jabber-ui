import React, {useState} from 'react';
import {createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {Box, Grid} from "@material-ui/core";
import {useHistory} from "react-router";
import {RouteComponentProps} from "react-router-dom";
import {PostType} from "../Types/Types";




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


export type Props = RouteComponentProps<any> & {}





const image1 = require("../../Resources/images/map.png");

export default function Navbar(props:Props) {
    const classes = useStyles();
    const history = useHistory();

    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [username, setUsername] = useState("username");
    const [id, setId] = useState("id");

    function navigateToLogin() {
        props.history.push("/")
    }

    function handleLogout() {
        document.cookie = "authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigateToLogin()
    }

    return (

        <div className={classes.root}>
            <AppBar>
                <Grid container  justify="center"  spacing={2}>
                    <Grid item  xs={3} >
                        <div className={classes.menuButton} aria-label="menu" onClick={() => history.push("/")}>
                            <Typography variant="h6" style={{marginTop:1, marginBottom:20}} color="secondary"  className={classes.title} >
                                <Box fontWeight="fontWeightBold" style={{width: 200}}>
                                   Jibber Jabber
                                </Box>
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained">Register</Button>
                    </Grid>
                    <Grid item xs={3}>
                        { !isLoggedIn && <Button variant="contained" color="primary" onClick={()=>navigateToLogin()}>
                            Login
                        </Button>}
                        { isLoggedIn && <Button variant="contained" color="secondary" onClick={()=>handleLogout()}>
                            Logout
                        </Button>}

                    </Grid>
                    <Grid item xs={3}>
                        <Button color="inherit" >
                            <PermIdentityIcon fontSize={"large"}></PermIdentityIcon>
                            <Typography variant="h6"  color="secondary"  className={classes.title} >
                                <Box >
                                    {username}
                                </Box>
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </AppBar>
        </div>
    );
}