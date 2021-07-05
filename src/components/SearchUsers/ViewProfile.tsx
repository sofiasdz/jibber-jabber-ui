
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
import React, {Component} from 'react'
import {followUser, getCurrentUser, getUserInfo, unfollowUser, updateUser} from "../../Api/UserApi";
import {Fab, Grid, TextField} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { Alert, AlertTitle } from '@material-ui/lab';
import {ProfileType} from "../Types/Types";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";




export type Props = RouteComponentProps<any> & {profile:ProfileType}



export type State = {
    userName: string,
    id: string,
    isAlertOpen: boolean,
    follows:boolean,
    isAlertOpenUnfollow:boolean

}


class  ViewProfile extends Component<Props,State> {


    constructor(props: Props) {
        super(props);
        this.state = {
            id:'',
            userName:'usernamefalso',
            isAlertOpen: false,
            isAlertOpenUnfollow:false,
            follows:false



        }


    }






    render() {
        let isAlertOpen= this.state.isAlertOpen;
        let isAlertOpenUnfollow=this.state.isAlertOpenUnfollow;
        let follows=this.state.follows;

        return(
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography style={{marginBottom:30}}> Your Profile</Typography>
                        </Grid>
                        <Grid item xs={6}>
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    { !follows && <Button onClick={()=>this.handleFollow(this.props.profile.id)}> Follow </Button>}
                                    { follows && <Button color={"secondary"} onClick={()=>this.handleUnfollow(this.props.profile.id)}> Unfollow </Button>}
                                </ButtonGroup>
                        </Grid>

                        { isAlertOpen &&
                        <div>
                            <Alert severity="success" onClose={() => {this.setState({isAlertOpen:false})}}>
                                <AlertTitle>Success</AlertTitle>
                                You now follow <strong>{this.props.profile.nick}</strong>! — <strong>check out their posts!</strong>
                            </Alert>
                        </div>
                        }
                        { isAlertOpenUnfollow &&
                        <Grid item xs={12} >
                            <div>
                                <Alert severity="info" onClose={() => {this.setState({isAlertOpenUnfollow:false})}}>
                                    <AlertTitle>Success</AlertTitle>
                                    You unfollowed <strong>{this.props.profile.nick}</strong>! <strong>who needs them anyway!</strong>
                                </Alert>
                            </div>
                        </Grid>

                        }
                        <Grid item xs={12}>
                            <TextField
                                value={this.props.profile.username}
                                label="Username"
                                variant="outlined"
                                helperText="This value cant be changed"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={this.props.profile.email}
                                label="Email"
                                variant="outlined"
                                helperText="This value cant be changed"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <div>
                            <Grid item xs={12}>
                                <TextField
                                    value={this.props.profile.nick}
                                    label="Nick"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{marginLeft:15}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={this.props.profile.bio}
                                    label="Bio"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{marginLeft:15}}
                                />
                            </Grid>
                        </div>

                    </Grid>
                </CardContent>
            </Card>
        );
    }

    componentDidMount() {
        this.handleGetCurrentUser()
    }


    handleGetCurrentUser(){
        getCurrentUser()
            .then((res) => {
                console.log(res)
                this.setState({id:res.userId})
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })


    }


    handleFollow( id2: string) {
        followUser(id2)
            .then((res) => {
                console.log(this.state)
                this.setState({isAlertOpen:true, follows:true})
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })

    }

    handleUnfollow(id: string) {
        unfollowUser(id)
            .then((res) => {
                console.log(this.state)
                this.setState({isAlertOpenUnfollow:true, follows:false})
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })

    }


}



export default ViewProfile