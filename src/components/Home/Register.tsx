import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
import React, {Component} from 'react'
import {registerUser} from "../../Api/UserApi";

export type Props = RouteComponentProps<any> & {}

export type State = {
    errorMessage: string,
    successMessage: string,
    email:string,
    password:string,
}
class Register extends Component<Props, State>{


    constructor(props: Props) {
        super(props);
        this.state = {
            errorMessage: '',
            successMessage: '',
            email:'',
            password:''
        }
    }
    render() {
        return (
            <Card >
                <CardContent>
                    <Typography  color="textSecondary" gutterBottom>
                        Register
                    </Typography>
                    <form  noValidate autoComplete="off">
                        <div>
                            <TextField required id="standard-required" label="Required"  defaultValue="Email" value={this.state.email}/>
                            <TextField required id="standard-required" label="Required"  defaultValue="Password" value={this.state.password}/>
                            <Button variant="contained" color="primary" onClick={()=>this.handleRegister(this.state.email,this.state.password)}>
                                Login
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        );
    }

    handleRegister=(username:string,password:string)=>{
        registerUser(username, password)
            .then((res) => {
                this.setState({errorMessage: '', successMessage: 'User successfully logged in'});
                localStorage.setItem('token', res.token);
                this.props.history.push('/');
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    this.setState({successMessage: '', errorMessage: 'Invalid Credentials'});
                else this.setState({successMessage: '', errorMessage: 'An error occurred  while registering'});
            })
    }
}
export default Register