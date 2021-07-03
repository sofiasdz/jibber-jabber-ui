
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
import React, {Component, useState} from 'react'
import {getCurrentUser, getUserInfo} from "../../Api/UserApi";
import {getAllPosts} from "../../Api/PostApi";
import {PostType, ProfileType} from "../Types/Types";


export type Props = RouteComponentProps<any> & {}



export type State = {
    profile?:ProfileType,
    id: string

}


 class  Profile extends Component<Props,State> {

     constructor(props: Props) {
         super(props);
         this.state = {
             id:" ",


         }
     };

    render() {
        return(
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    User Profile
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {this.state.profile?.nick}
                </Typography>

            </CardContent>
        </Card>
        );
    }

     componentDidMount() {
         this.getProfile()
         const a= localStorage.getItem('authorId')
         if(a!=null) {
             this.setState({id: a})
         }
     }

    getProfile = () => {
        getUserInfo(this.state.id).then(res => this.setState({profile: res}))
    }





}



export default Profile