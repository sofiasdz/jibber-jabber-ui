import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
import React, {Component, useState} from 'react'
import {getCurrentUser, loginUser} from "../../Api/UserApi";

export type Props = RouteComponentProps<any> & {}


export type State = {
    errorMessage: string,
    successMessage: string,
    username:string,
    password:string,

}




function Login(){
    const [password, setPassword] = useState("password");
    const [username, setUsername] = useState("username");




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
        </Card>
    );




    function  handleLogin(username:string,password:string) {
        loginUser(username, password)
            .then((res) => {
               console.log(res)
                handleGetCurrentUser()
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })
    }

    function handleGetCurrentUser(){
        getCurrentUser()
            .then((res) => {
                console.log(res)
                localStorage.setItem('author', res.user);
                localStorage.setItem('authorId', res.userId);
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })
    }
}



export default Login