
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
import React, {Component} from 'react'
import {getCurrentUser, getUserInfo, updateUser} from "../../Api/UserApi";
import {Fab, Grid, TextField} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {createPost, deletePost, getAllUserPosts, likePost} from "../../Api/PostApi";
import {PostType} from "../Types/Types";
import DeleteIcon from "@material-ui/icons/Delete";




export type Props = RouteComponentProps<any> & {}



export type State = {
    userName: string,
    email: string,
    nick: string,
    bio: string,
    id: string,
    password:string,
    getDataError: string,
    updateMode:boolean,
    isAlertOpen: boolean,
    posts:PostType[],
    isDeleteAlert:boolean,
    disabled:boolean,

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
             password:"",
             getDataError:'',
             updateMode: false,
             isAlertOpen: false,
             posts:[],
             isDeleteAlert:false,
             disabled:false


         }


         }






    render() {
         let updateMode= this.state.updateMode;
         let isAlertOpen= this.state.isAlertOpen;
        let isDeleteAlert=this.state.isDeleteAlert;

        return(
            <CssBaseline>
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography style={{marginBottom:30}}> Your Profile</Typography>
                    </Grid>
                    { !updateMode &&
                    <Grid item xs={6}>
                <Fab color="secondary" aria-label="edit" onClick={()=>this.setState({updateMode:true})}>
                    <EditIcon />
                </Fab>
                    </Grid>
                    }
                    { updateMode &&
                    <Grid item xs={6}>
                        <Fab color="primary" aria-label="edit" onClick={()=>this.handleProfileUpdate()}>
                            <CheckIcon />
                        </Fab>
                    </Grid>
                    }
                    { isAlertOpen &&
                        <div>
                            <Alert severity="success" onClose={() => {this.setState({isAlertOpen:false})}}>
                                <AlertTitle>Success</AlertTitle>
                                Your Profile Was Updated Successfully — <strong>check it out!</strong>
                            </Alert>
                        </div>


                    }
                    { isDeleteAlert &&
                    <div>
                        <Alert severity="warning" onClose={() => {this.setState({isAlertOpen:false})}}>
                            <AlertTitle>Success</AlertTitle>
                           Your post was deleted successfully — <strong>Bye bye!</strong>
                        </Alert>
                    </div>


                    }
                        <Grid item xs={12}>
                        <TextField
                           value={this.state.userName}
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
                            value={this.state.email}
                            label="Email"
                            variant="outlined"
                            helperText="This value cant be changed"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        </Grid>
                    {!updateMode &&
                    <div>
                    <Grid item xs={12}>
                        <TextField
                            value={this.state.nick}
                            label="Nick"
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{marginLeft:15}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={this.state.bio}
                            label="Bio"
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{marginLeft:15}}
                        />
                    </Grid>
                    </div>}
                        {updateMode &&
                            <div style={{marginLeft:10}}>
                        <Grid item xs={12}>
                <TextField style={{marginLeft:10}} label="Nick" value={this.state.nick} onChange={e => this.setState( {nick:e.target.value})}/>
                        </Grid>
                        <Grid item xs={12}>
                <TextField  style={{marginLeft:10}} label="Bio" value={this.state.bio} onChange={e => this.setState( {bio:e.target.value})}/>
                        </Grid>
                        <Grid item xs={12}>
                            { !this.state.disabled && <TextField    type="password" label="Type New Password:"  value={this.state.password} onChange={e => this.analyze(e.target.value)} />}
                            { this.state.disabled && <TextField
                                error

                                label="Error"
                                type="password"
                                helperText="Password has to be 10 characters long and include numbers"
                                value={this.state.password}
                                onChange={e => this.analyze(e.target.value)}
                            />}
                        </Grid>
                    </div>
                }

            </Grid>
            </CardContent>
        </Card>
        <Box component="span" m={1} >

            <React.Fragment>
                <CssBaseline />
                <Container style={ {alignItems:"center"}}>
                    <Typography variant="h6" >
                        My Posts
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
                                            { this.state.userName===post.author &&
                                            <Grid item xs={3}>
                                                <Button variant="contained" color="secondary" onClick={()=>this.handlePostDelete(post.id)}>
                                                    <DeleteIcon></DeleteIcon>
                                                </Button>
                                            </Grid>}

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
     }




    getProfile = (id:string) => {
        getUserInfo(id).then((res) => {
                console.log(res)
                this.setState({userName: res.username, email: res.email, nick: res.nick, bio: res.bio})
                this.getUserPosts()
            }
        )
            .catch((err) => this.setState({getDataError: 'An error occurred fetching profile data'}))
    }


    handleGetCurrentUser(){
         getCurrentUser()
             .then((res) => {
                 console.log(res)
                 this.setState({id:res.userId})
                 this.getProfile(this.state.id)
             })
             .catch((err) => {
                 if (err.status === 401|| err.status===404)
                     console.log(err)

             })


     }


        handleProfileUpdate() {
         updateUser(this.state.nick,this.state.bio,this.state.password)
             .then((res) => {
                 console.log(res)
                 this.setState({updateMode:false,isAlertOpen:true})
             })
             .catch((err) => {
                 if (err.status === 401|| err.status===404)
                     console.log(err)

             })

     }

     handlePostLike(id: string, id2: string) {
         likePost(id2,id)
             .then(() => {
                 this.getUserPosts()
             })
             .catch((err) => {
                 if (err.status === 401|| err.status===404)
                     console.log(err)

             })


     }

     getUserPosts() {
         getAllUserPosts(this.state.id)
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


     handlePostDelete(id: string) {
         deletePost(id).then(() => {})
         this.setState({isDeleteAlert:true})
         this.getUserPosts()

     }


     analyze(password:string){
         const regex = new RegExp("^(?=.*\\d)(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,}$");
         this.setState({password:password})
         console.log(regex.test(password))
         this.setState({disabled:!regex.test(password)})

     }
 }



export default Profile