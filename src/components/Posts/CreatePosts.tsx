import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React, {Component, useState} from 'react'
import {createPost, deletePost, getAllPosts, getTimeline, likePost} from "../../Api/PostApi";
import {Grid} from "@material-ui/core";
import {getCurrentUser, getFollowed} from "../../Api/UserApi";
import {Props} from "../UserProfile/Profile";
import {PostType} from "../Types/Types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {Alert, AlertTitle} from "@material-ui/lab";
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom";


export type State = {
  body:string,
  isLoggerIn:boolean,
  id:string,
  userName:string,
  posts:PostType[],
    isAlertOpen:boolean,
  followed:string[],
   isDeleteAlert:boolean

}


class  CreatePost extends Component<Props,State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            id:'',
           userName:'',
            isLoggerIn: false,
            body:'',
            posts:[],
            isAlertOpen:false,
            followed:[],
            isDeleteAlert:false


        }
    }


    render() {
        let isLoggedIn=this.state.isLoggerIn;
        let isAlertOpen=this.state.isAlertOpen;
        let isDeleteAlert=this.state.isDeleteAlert;
        return (
            <CssBaseline >
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"

                >
            <Card style={{width:1000,backgroundPosition:"center"}}>
                <CardContent >

                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        ¿Whats on your mind?
                    </Typography>
                    {isLoggedIn &&
                        <div>
                    <Grid container spacing={3}
                          direction="column"
                          alignItems="center"
                          justify="center">
                        <Grid item xs={12} >

                            <TextField required id="standard-required"  multiline
                                       rows={4} label="Required" style={{width:900}} value={this.state.body}
                                       onChange={e => this.setState({body:e.target.value})}/>
                        </Grid>

                        <Grid item xs={12}>

                            <Button variant="contained" color="primary" style={{marginLeft:750}}
                                    onClick={() => this.handleCreatePosts(this.state.body)}>
                                Post
                            </Button>
                        </Grid>
                    </Grid>
                        </div>
                            }
                    {!isLoggedIn &&
                    <Typography color="textSecondary" gutterBottom>
                        You need to log in before you can post in <strong>Jibber Jabber  </strong>
                        <Link to={'/'} className="nav-link" ><strong> Login here</strong> </Link>
                    </Typography>

                    }

                </CardContent>
            </Card>
                </Grid>
        <Box component="span" m={1} >
            <React.Fragment>
                <CssBaseline />
                <Container style={ {alignItems:"center"}}>
                    { isAlertOpen &&
                    <div>
                        <Alert severity="success" onClose={() => {this.setState({isAlertOpen:false})}}>
                            <AlertTitle>Success</AlertTitle>
                            Your Post was created successfully! — <strong>check it out!</strong>
                        </Alert>
                    </div>


                    }
                    { isDeleteAlert &&
                    <div>
                        <Alert severity="warning" onClose={() => {this.setState({isDeleteAlert:false})}}>
                            <AlertTitle>Success</AlertTitle>
                            Your post was deleted successfully — <strong>Bye bye!</strong>
                        </Alert>
                    </div>


                    }
                    {
                        this.state.posts.length !== 0 ?
                            this.state.posts.map((post, index) => (
                                < Card style={{marginLeft:115,marginTop:50,marginBottom:50,width:1000}}  key={post.id} >
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
                                            { this.state.userName===post.author && <Grid item xs={3}>
                                                <Button variant="contained" color="secondary" onClick={()=>this.handlePostDelete(post.id)}>
                                                    <DeleteIcon></DeleteIcon>
                                                </Button>
                                            </Grid>}

                                        </Grid>



                                    </CardContent>
                                </Card>

                            )) :
                            <span >
                                 <Container style={ {alignItems:"center"}}>
                                    <Typography  style={{marginLeft:110}}variant="h6" color="textSecondary" gutterBottom> No Posts yet!</Typography>
                                     </Container>
                            </span>
                    }
                </Container>
            </React.Fragment>
        </Box>

         </CssBaseline>

        );
    }


    getPosts = () => {
        getTimeline(this.state.followed).then(res => this.setState({posts: res}))
    }

    getFollowed = () => {
        getFollowed().then(res => {this.setState({followed: res.followed})
        this.getPosts()}
        )

    }
  handleCreatePosts(body: string) {
        createPost(this.state.id,this.state.userName,body)
            .then((res) => {
                console.log(res)
                this.setState({body:" ",isAlertOpen:true})
                this.getPosts()
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })
    }

    componentDidMount() {
        this.handleGetCurrentUser()
    }

   handleGetCurrentUser(){
        getCurrentUser()
            .then((res) => {
                this.setState({userName: res.user, id:res.userId,isLoggerIn:true})
                this.getFollowed()
                console.log(this.state)
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })
    }

 handlePostLike(id: string, id2: string) {
     likePost(id2,id)
         .then(() => {
             this.getPosts()
         })
         .catch((err) => {
             if (err.status === 401|| err.status===404)
                 console.log(err)

         })


    }

   handlePostDelete(id: string) {
        deletePost(id).catch((err) => {
            if (err.status === 401|| err.status===404)
                console.log(err)
        }).then(r => {
            this.getPosts();
        })
       this.setState({isDeleteAlert:true})

    }
}










export default CreatePost