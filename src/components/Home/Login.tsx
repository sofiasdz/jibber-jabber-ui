import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
import React, {Component} from 'react'
import {loginUser} from "../../Api/UserApi";

export type Props = RouteComponentProps<any> & {}

export type State = {
    errorMessage: string,
    successMessage: string,
    username:string,
    password:string,
}

class Login extends Component<Props, State>{


    constructor(props: Props) {
        super(props);
        this.state = {
            errorMessage: '',
            successMessage: '',
            username:'',
            password:''
        }
    }
render() {
    return (
        <Card >
            <CardContent>
                <Typography  color="textSecondary" gutterBottom>
                    Login
                </Typography>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField required id="standard-required" label="Required"  defaultValue="Username" value={this.state.username}/>
                        <TextField required id="standard-required" label="Required"  defaultValue="Password" value={this.state.password}/>
                        <Button variant="contained" color="primary" onClick={()=>this.handleLogin(this.state.username,this.state.password)}>
                            Login
                        </Button>
                    </div>

                </form>
            </CardContent>
        </Card>
    );
}

 handleLogin=(username:string,password:string)=>{
        loginUser(username, password)
         .then((res) => {
             this.setState({errorMessage: '', successMessage: 'User successfully logged in'});
             localStorage.setItem('token', res.token);
             this.props.history.push('/');
         })
         .catch((err) => {
             if (err.status === 401|| err.status===404)
                 this.setState({successMessage: '', errorMessage: 'Invalid Credentials'});
             else this.setState({successMessage: '', errorMessage: 'An error occurred logging into Jibber Jabber!'});
         })
    }
}
export default Login