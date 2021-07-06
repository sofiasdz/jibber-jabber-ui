import {RouteComponentProps} from "react-router-dom";
import React, {Component, useState} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {followUser, getCurrentUser, unfollowUser, getFollowed} from "../../Api/UserApi";
import {ProfileType} from "../Types/Types";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Alert, AlertTitle} from "@material-ui/lab";
import Container from "@material-ui/core/Container";


export type Props = RouteComponentProps<any> & {profile:ProfileType}



export type State = {
    userName: string,
    id: string,
    isAlertOpen:boolean,
    isAlertOpenUnfollow:boolean,
    followed:string[]

}



class  ProfileCard extends Component<Props,State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id:'',
            userName:'usernamefalso',
            isAlertOpen:false,
            isAlertOpenUnfollow:false,
            followed:[]



        }


    }

    render() {
    let isAlertOpen= this.state.isAlertOpen;
    let isAlertOpenUnfollow= this.state.isAlertOpenUnfollow
        return(
            <CssBaseline>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    { isAlertOpen &&
                <Grid item xs={12} >
                <div>
                    <Alert severity="success" onClose={() => {this.setState({isAlertOpen:false})}}>
                        <AlertTitle>Success</AlertTitle>
                        You now follow <strong>{this.props.profile.nick}</strong>! <strong>check out their profile!</strong>
                    </Alert>
                </div>
                </Grid>

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
                    <Card style={{width:1000,backgroundPosition:"center"}}>
                        <CardContent >
                            <Typography color="textSecondary" variant="h6" gutterBottom>
                                {this.props.profile.nick}
                            </Typography>

                            <Grid item xs={12} >
                                <Typography color="textSecondary"  variant="subtitle2" gutterBottom>
                                    {this.props.profile.username}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography color="textSecondary"  variant="subtitle2" gutterBottom>
                                    {this.props.profile.bio}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    <Button onClick={()=>this.handleViewProfile(this.props.profile.id)}>View Profile</Button>
                                    { !this.state.followed.includes(this.props.profile.id) && <Button onClick={()=>this.handleFollow(this.props.profile.id)}> Follow </Button>}
                                    { this.state.followed.includes(this.props.profile.id) && <Button color={"secondary"} onClick={()=>this.handleUnfollow(this.props.profile.id)}> Unfollow </Button>}
                                </ButtonGroup>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

            </CssBaseline>
        );
    }

    componentDidMount() {
    this.handleGetCurrentUser()
    this.getFollowed()

    }






    handleGetCurrentUser(){
        getCurrentUser()
            .then((res) => {
                this.setState({userName: res.user, id:res.userId})
                console.log(this.state)
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })
    }

  handleViewProfile(id: string) {
      this.props.history.push('/viewProfile/' + this.props.profile.id)
    }


    handleFollow( id2: string) {
        followUser(id2)
            .then((res) => {
                console.log(this.state)
                this.getFollowed()
                this.setState({isAlertOpen:true})

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
                this.getFollowed()
                this.setState({isAlertOpenUnfollow:true})

            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })

    }

    getFollowed = () => {
        getFollowed().then(res => {this.setState({followed: res.followed})


        }
        )

    }


}
export default ProfileCard