
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
import React, {Component} from 'react'
import {getCurrentUser, getUserInfo} from "../../Api/UserApi";



export type Props = RouteComponentProps<any> & {}



export type State = {
    userName: string,
    email: string,
    nick: string,
    bio: string,
    id: string,
    getDataError: string

}


 class  Profile extends Component<Props,State> {


     constructor(props: Props) {
         super(props);
         this.state = {
             id:'',
             userName:'usernamefalso',
             nick:'nickfalso',
             bio:'biofalsa',
             email:'emailsalfo',
             getDataError:'',


         }


         }






    render() {
        return(
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    User Profile
                </Typography>

                <Typography color="textSecondary" gutterBottom>
                    {this.state.userName}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {this.state.nick}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {this.state.email}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {this.state.bio}
                </Typography>




            </CardContent>
        </Card>
        );
    }

     componentDidMount() {
         this.handleGetCurrentUser()
     }




    getProfile = (id:string) => {
        getUserInfo(id).then((res) => {
                console.log(res)
                this.setState({userName: res.username, email: res.email, nick: res.nick, bio: res.bio})
            console.log(this.state)
            }
        )
            .catch((err) => this.setState({getDataError: 'An error occurred fetching profile data'}))
    }


    handleGetCurrentUser(){
         getCurrentUser()
             .then((res) => {
                 console.log(res)
                 this.setState({id:res.userId})
                 this.getProfile(res.userId)
             })
             .catch((err) => {
                 if (err.status === 401|| err.status===404)
                     console.log(err)

             })


     }




}



export default Profile