import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
import React, {Component, useState} from 'react'
import {registerUser} from "../../Api/UserApi";


function Register(){
    const [password, setPassword] = useState("password");
    const [email, setEmail] = useState("email");
    const [username, setUsername] = useState("username");
    const [nick, setNick] = useState("nick");




    return (
        <Card >
            <CardContent>
                <Typography  color="textSecondary" gutterBottom>
                    Login
                </Typography>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField required id="standard-required" label="Required"  value={email} onChange={e => setEmail(e.target.value)} />
                        <TextField required id="standard-required" label="Required"  value={username} onChange={e => setUsername(e.target.value)}/>
                        <TextField required id="standard-required" label="Required"  value={password} onChange={e => setPassword(e.target.value)} />
                        <TextField required id="standard-required" label="Required"  value={nick} onChange={e => setNick(e.target.value)} />
                        <Button variant="contained" color="primary" onClick={()=>handleRegister(email,username,password,nick)}>
                            Login
                        </Button>
                    </div>

                </form>
            </CardContent>
        </Card>
    );




    function  handleRegister(email:string,username:string,password:string,nick:string) {
        registerUser(email,username, password,nick)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })
    }
}



export default Register