import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
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
    const [password, setPassword] = useState("password");
    const [username, setUsername] = useState("username");
    const[isAlertOpen,setIsAlert]=useState(false);





    return (
        <Card >
            <CardContent>
                <Typography  color="textSecondary" gutterBottom>
                    Login
                </Typography>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField required id="standard-required" label="Required"  value={username} onChange={e => setUsername(e.target.value)}/>
                        <TextField required id="standard-required" label="Required"  value={password} onChange={e => setPassword(e.target.value)} />
                        <Button variant="contained" color="primary" onClick={()=>handleLogin(username,password)}>
                            Login
                        </Button>
                    </div>

                </form>
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
                props.history.push('/createPosts')
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404||err.status===400||err.status===403)
                    setIsAlert(true)
                    console.log(err)

            })
        handleGetCurrentUser()
    }

    function handleGetCurrentUser(){
        getCurrentUser()
            .then((res) => {
                console.log(res)
                window.localStorage.setItem('author', res.user);
                window.localStorage.setItem('authorId', res.userId);
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)

                    console.log(err)

            })
    }
}



export default Login