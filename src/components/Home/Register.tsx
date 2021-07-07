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
    const [isDisabled,setDisabled]=useState(true)

    const regex = new RegExp("^(?=.*\\d)(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,}$");




    return (
        <Card >
            <CardContent>
                <Typography  color="textSecondary" gutterBottom>
                    Register
                </Typography>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField required id="standard-required" label="Required"  value={email} onChange={e => setEmail(e.target.value)} />
                        <TextField required id="standard-required" label="Required"  value={username} onChange={e => setUsername(e.target.value)}/>
                        { !isDisabled && <TextField required id="standard-required" label="Required"  value={password} onChange={e => analyze(e.target.value)} />}
                        { isDisabled && <TextField
                            error
                            id="standard-error-helper-text"
                            label="Error"
                            defaultValue="Hello World"
                            helperText="Password has to be 10 characters long and include numbers"
                            value={password}
                            onChange={e => analyze(e.target.value)}
                        />}
                        <TextField required id="standard-required" label="Required"  value={nick} onChange={e => setNick(e.target.value)} />
                        <Button variant="contained" color="primary"  disabled={isDisabled} onClick={()=>handleRegister(email,username,password,nick)}>
                            Register
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

    function analyze(password:string){
        setPassword(password)
        console.log(regex.test(password))
        setDisabled(!regex.test(password))

    }
}



export default Register