
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
import React, {Component} from 'react'
import {followUser, getCurrentUser, getUserInfo, unfollowUser, getFollowed} from "../../Api/UserApi";
import {Fab, Grid, TextField} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { Alert, AlertTitle } from '@material-ui/lab';
import {PostType, ProfileType} from "../Types/Types";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {getAllUserPosts, likePost} from "../../Api/PostApi";




export type Props = RouteComponentProps<any> & {}



export type State = {
    userName: string,
    id: string,
    isAlertOpen: boolean,
    isAlertOpenUnfollow:boolean,
    profile:ProfileType,
    getDataError:string,
    posts:PostType[],
    followed:string[]

}


class  ViewProfile extends Component<Props,State> {


    constructor(props: Props) {
        super(props);
        this.state = {
            id:'',
            userName:'usernamefalso',
            isAlertOpen: false,
            isAlertOpenUnfollow:false,
            getDataError:"",
            profile:{
                id:'',
                username:'',
                bio:'',
                email:'',
                nick:''
            },
            posts:[],
            followed:[]

        }


    }






    render() {
        let isAlertOpen= this.state.isAlertOpen;
        let isAlertOpenUnfollow=this.state.isAlertOpenUnfollow;


        return(
            <CssBaseline>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="h5" style={{marginBottom:30}}><strong>{this.state.profile.nick}'s Profile</strong></Typography>
                        </Grid>
                        <Grid item xs={6}>
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    {  !this.state.followed.includes(this.state.profile.id)  && <Button onClick={()=>this.handleFollow(this.state.profile.id)}> Follow </Button>}
                                    { this.state.followed.includes(this.state.profile.id) && <Button color={"secondary"} onClick={()=>this.handleUnfollow(this.state.profile.id)}> Unfollow </Button>}
                                    <Button onClick={()=>this.handleMessage(this.state.profile.id)}>Message</Button>
                                </ButtonGroup>
                        </Grid>

                        { isAlertOpen &&
                        <Grid item xs={12} >
                        <div>
                            <Alert severity="success" onClose={() => {this.setState({isAlertOpen:false})}}>
                                <AlertTitle>Success</AlertTitle>
                                You now follow <strong>{this.state.profile.nick}</strong>! — <strong>check out their posts!</strong>
                            </Alert>
                        </div>
                        </Grid>
                        }
                        { isAlertOpenUnfollow &&
                        <Grid item xs={12} >
                            <div>
                                <Alert severity="info" onClose={() => {this.setState({isAlertOpenUnfollow:false})}}>
                                    <AlertTitle>Success</AlertTitle>
                                    You unfollowed <strong>{this.state.profile.nick}</strong>! <strong>who needs them anyway!</strong>
                                </Alert>
                            </div>
                        </Grid>

                        }
                        <Grid item xs={12}>
                            <TextField
                                value={this.state.profile.username}
                                label="Username"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={this.state.profile.email}
                                label="Email"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <div>
                            <Grid item xs={12} style={{marginBottom:20}}>
                                <TextField
                                    value={this.state.profile.nick}
                                    label="Nick"
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{marginLeft:15}}
                                />
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:30}}>
                                <TextField
                                    value={this.state.profile.bio}
                                    label="Bio"
                                    variant="outlined"
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

        <Box component="span" m={1} >

            <React.Fragment>
                <CssBaseline />
                <Container style={ {alignItems:"center"}}>
                    <Typography variant="h6" >
                        {this.state.profile.nick}'s Posts
                    </Typography>
                    {
                        this.state.posts.length !== 0 ?
                            this.state.posts.map((post, index) => (
                                < Card style={{marginLeft:115,marginTop:50,marginBottom:50,width:1000}} >
                                    <CardContent>
                                        <Typography variant="subtitle2" component="p">
                                            {post.timeRecorded}
                                        </Typography>
                                        <Typography variant="subtitle1" component="h2">
                                            {post.author}
                                        </Typography>
                                        <Typography variant="h6" component="p">
                                            {post.body}
                                        </Typography>
                                        <Grid container spacing={0} style={{marginTop:10}}>
                                            <Grid item xs={3}>
                                                <Button variant="outlined" color="primary" onClick={()=>this.handlePostLike(post.id,this.state.id)} >
                                                    <ThumbUpAltIcon></ThumbUpAltIcon>
                                                </Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6" component="p" style={{marginRight:10}}>
                                                    {post.likes}
                                                </Typography>
                                            </Grid>

                                        </Grid>



                                    </CardContent>
                                </Card>

                            )) :
                            <span className={'empty-message'}>No posts yet!</span>
                    }
                </Container>
            </React.Fragment>
        </Box>
          </CssBaseline>
        );
    }

    componentDidMount() {
        this.handleGetCurrentUser()
        this.getProfile(this.props.match.params.id )
        this.getUserPosts(this.props.match.params.id)
        this.getFollowed()
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

    getProfile = (id:string) => {
        getUserInfo(id).then((res) => {
                console.log(res)
                this.setState({profile:res})
                console.log(this.state)
            }
        )
            .catch((err) => this.setState({getDataError: 'An error occurred fetching profile data'}))
    }

    handlePostLike(id: string, id2: string) {
        likePost(id2,id)
            .then(() => {
                this.getUserPosts(this.state.profile.id)
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })


    }

    getUserPosts(id:string) {
        getAllUserPosts(id)
            .then((res) => {
                console.log(res)
                this.setState({posts:res})
                console.log(this.state.posts)
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


    handleMessage(id: string) {
        this.props.history.push('/dm/' + this.state.profile.id)

    }





}



export default ViewProfile