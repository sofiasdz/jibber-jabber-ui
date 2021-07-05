import {RouteComponentProps} from "react-router-dom";
import React, {Component, useState} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {followUser, getCurrentUser, searchUser} from "../../Api/UserApi";
import {ProfileType} from "../Types/Types";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


export type Props = RouteComponentProps<any> & {profile:ProfileType}



export type State = {
    userName: string,
    id: string,


}



class  ProfileCard extends Component<Props,State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id:'',
            userName:'usernamefalso',



        }


    }

    render() {

        return(
            <CssBaseline>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
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
                                    <Button>Follow onClick={()=>this.handleFollow(this.props.profile.id)}</Button>
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

    }


    handleFollow( id2: string) {
        followUser(id2)
            .then((res) => {
                console.log(this.state)
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })

    }
}
export default ProfileCard