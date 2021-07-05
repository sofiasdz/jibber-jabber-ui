import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
import React, {Component, useState} from 'react'
import {createPost, getAllPosts} from "../../Api/PostApi";
import {Grid} from "@material-ui/core";
import {getCurrentUser} from "../../Api/UserApi";
import {Props} from "../UserProfile/Profile";
import {render} from "react-dom";
import {PostType} from "../Types/Types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';


export type State = {
  body:string,
  isLoggerIn:boolean,
  id:string,
  userName:string,
  posts:PostType[],

}

class  CreatePost extends Component<Props,State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            id:'',
           userName:'',
            isLoggerIn: false,
            body:'',
            posts:[]


        }
    }


    render() {
        let isLoggedIn=this.state.isLoggerIn;
        return (
            <CssBaseline>
            <Card>
                <CardContent>

                    <Typography color="textSecondary" gutterBottom>
                        Create Post
                    </Typography>
                    {isLoggedIn &&
                        <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField required id="standard-required" label="Required" multiline={true} value={this.state.body}
                                       onChange={e => this.setState({body:e.target.value})}/>
                        </Grid>

                        <Grid item xs={12}>

                            <Button variant="contained" color="primary"
                                    onClick={() => this.handleCreatePosts(this.state.body)}>
                                Create Post
                            </Button>
                        </Grid>
                    </Grid>
                        </div>
                            }
                    {!isLoggedIn &&
                    <Typography color="textSecondary" gutterBottom>
                        you need to log in before u can post in Jibber Jabber
                    </Typography>

                    }
                </CardContent>
            </Card>
        <Box component="span" m={1} >
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                    {
                        this.state.posts.length !== 0 ?
                            this.state.posts.map((post, index) => (
                                < Card style={{marginTop:50,marginBottom:50}} >
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
                                        <Button variant="outlined" color="primary" >
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
                            <span className={'empty-message'}>This topic has no posts yet!</span>
                    }
                </Container>
            </React.Fragment>
        </Box>
         </CssBaseline>

        );
    }


    getPosts = () => {
        getAllPosts().then(res => this.setState({posts: res}))
    }
  handleCreatePosts(body: string) {
        createPost(this.state.id,this.state.userName,body)
            .then((res) => {
                console.log(res)
                this.getPosts()
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })
    }

    componentDidMount() {
        this.getPosts()
        this.handleGetCurrentUser()
    }

   handleGetCurrentUser(){
        getCurrentUser()
            .then((res) => {
                this.setState({userName: res.user, id:res.userId,isLoggerIn:true})
                console.log(this.state)
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })
    }
}










export default CreatePost