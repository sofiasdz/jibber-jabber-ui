import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link, RouteComponentProps} from 'react-router-dom';
import React, {Component, useState} from 'react'
import {getCurrentUser, loginUser} from "../../Api/UserApi";
import {Alert, AlertTitle} from "@material-ui/lab";

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
        <Card >
            <CardContent>
                <Typography  color="textSecondary" gutterBottom>
                    Login
                </Typography>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField  id="standard-required" label="Username"  value={username} onChange={e => setUsername(e.target.value)}/>
                        <TextField  id="standard-required" label="Password"  value={password} onChange={e => setPassword(e.target.value)} />
                        <Button variant="contained" color="primary" onClick={()=>handleLogin(username,password)}>
                            Login
                        </Button>
                    </div>

                </form>
                <div style={{marginTop:30}}>
                <li><Link to={'/register'} className="nav-link" style={{marginTop:30}}> Dont have an account? <strong>Register here</strong></Link></li>
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
                props.history.push('/createPosts')
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    setIsAlert(true)
                    console.log(err)

            })
    }
}



export default Login