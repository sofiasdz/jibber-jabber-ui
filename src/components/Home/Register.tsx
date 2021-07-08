import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link, RouteComponentProps} from 'react-router-dom';
import React, {Component, useState} from 'react'
import {registerUser} from "../../Api/UserApi";
import {Alert, AlertTitle} from "@material-ui/lab";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {Grid} from "@material-ui/core";

export type Props = RouteComponentProps<any> & {}
function Register(props:Props){
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [nick, setNick] = useState("");
    const [isDisabled,setDisabled]=useState(true)
    const [isAlertOpen,setAlert]=useState(false)

    const regex = new RegExp("^(?=.*\\d)(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,}$");




    return (
        <Box component="span" m={1} >

            <React.Fragment>
                <CssBaseline />
                <Container style={ {alignItems:"center"}}>
        <Card >
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <div >
                            {/*<ForumIcon style={{width:100,marginTop:10}}></ForumIcon>*/}
                            <img style={{ marginLeft:400,width:50}} src="https://img.icons8.com/fluent/96/000000/origami.png"/>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography  style={{width:400,marginTop:10, marginLeft:150}} variant="h6" color="textPrimary" gutterBottom>
                            Register <strong> Jibber Jabber</strong>
                        </Typography>
                    </Grid>
                </Grid>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField  style={{marginLeft:30,marginRight:30}} id="standard-required" label="E-mail"  value={email} onChange={e => setEmail(e.target.value)} />
                        <TextField style={{marginLeft:30,marginRight:30}}  id="standard-required" label="Usename"  value={username} onChange={e => setUsername(e.target.value)}/>
                        { !isDisabled && <TextField style={{marginLeft:30,marginRight:30}} required id="standard-required" label="Password"  value={password} onChange={e => analyze(e.target.value)} />}
                        { isDisabled && <TextField
                            error
                            style={{marginLeft:30,marginRight:30}}
                            id="standard-error-helper-text"
                            label="Password"
                            helperText="Password has to be 10 characters long and include numbers"
                            value={password}
                            onChange={e => analyze(e.target.value)}
                        />}
                        <TextField  style={{marginLeft:30,marginRight:30}} id="standard-required" label="Nick"  value={nick} onChange={e => setNick(e.target.value)} />
                        <Button variant="contained" color="primary"  disabled={isDisabled} onClick={()=>handleRegister(email,username,password,nick)}>
                            Register
                        </Button>
                    </div>

                </form>
                <div style={{marginTop:30}}>
                <Link to={'/'}  >
                    <Typography variant="subtitle1"  gutterBottom>
                    Already have an account?<strong> Login here</strong>
                    </Typography>
                    </Link>
                </div>
            </CardContent>
            { isAlertOpen&& <div>
                <Alert severity="error" onClose={() => setAlert(false)}>
                    <AlertTitle>Error!</AlertTitle>
                    Either <strong> your selected username</strong> is already taken or someone already registered
                    with <strong>your e-mail</strong>!
                </Alert>
            </div>
            }
        </Card>
                </Container>
            </React.Fragment>
        </Box>
    );




    function  handleRegister(email:string,username:string,password:string,nick:string) {
        registerUser(email,username, password,nick)
            .then((res) => {
               props.history.push('/')
                console.log(res)
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404||err.status==400)
                    setAlert(true)
                    console.log(err)


            })
    }

    function analyze(password:string){
        setPassword(password)
        console.log(regex.test(password))
        setDisabled(!regex.test(password))

    }
}



export default Register