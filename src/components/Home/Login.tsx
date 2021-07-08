import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link, RouteComponentProps} from 'react-router-dom';
import React, {Component, useState} from 'react'
import {getCurrentUser, loginUser} from "../../Api/UserApi";
import {Alert, AlertTitle} from "@material-ui/lab";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {Grid} from "@material-ui/core";

export type Props = RouteComponentProps<any> & {}


export type State = {
    errorMessage: string,
    successMessage: string,
    username:string,
    password:string

}




function Login(props:Props){
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const[isAlertOpen,setIsAlert]=useState(false);





    return (
        <Box component="span" m={1} >

            <React.Fragment>
                <CssBaseline />
                <Container style={ {alignItems:"center"}}>
        <Card style={{ marginLeft:220,width:700,backgroundPosition:"center"}} >
            <CardContent style={{marginLeft:50}}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <div >
                            {/*<ForumIcon style={{width:100,marginTop:10}}></ForumIcon>*/}
                            <img style={{ marginLeft:100,width:50}} src="https://img.icons8.com/fluent/96/000000/origami.png"/>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                    <Typography  style={{width:400,marginTop:10}} variant="h6" color="textPrimary" gutterBottom>
                    Login <strong> Jibber Jabber</strong>
                </Typography>
                    </Grid>
                </Grid>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField  style={{marginLeft:30,marginRight:30}} id="standard-required" label="Username"  value={username} onChange={e => setUsername(e.target.value)}/>
                        <TextField style={{marginLeft:30,marginRight:30}} id="standard-required" label="Password"  value={password} onChange={e => setPassword(e.target.value)} />
                        <Button variant="contained" color="primary" onClick={()=>handleLogin(username,password)}>
                            Login
                        </Button>
                    </div>

                </form>
                <div style={{marginTop:30}}>
                <Link to={'/register'} className="nav-link" style={{marginTop:30}}>
                    <Typography variant="subtitle1"  gutterBottom>
                    Don't have an account? <strong>Register here</strong>
                    </Typography></Link>
                </div>
            </CardContent>

            { isAlertOpen && <div>
                <Alert severity="error" onClose={() => setIsAlert(false)}>
                    <AlertTitle>Invalid Credentials!</AlertTitle>
                    Try again using your <strong>Jibber Jabber</strong>  Username and password!
                </Alert>
            </div>
            }
        </Card>
                </Container>
            </React.Fragment>
        </Box>

    );




    function  handleLogin(username:string,password:string) {
        loginUser(username, password)
            .then((res) => {
               console.log(res)
                handleGetCurrentUser()

            })
            .catch((err) => {
                if (err.status === 401|| err.status===404||err.status===400||err.status===403)

                    console.log(err)

            })
        handleGetCurrentUser()
    }

    function handleGetCurrentUser(){
        getCurrentUser()
            .then((res) => {
                console.log(res)
                props.history.push('/createPost')
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404||err.status===403)
                   handleGetCurrentUser()


            })
    }
}



export default Login