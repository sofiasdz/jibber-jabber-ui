import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
import React, {Component, useState} from 'react'
import {createPost} from "../../Api/PostApi";
import {Grid} from "@material-ui/core";
import {getCurrentUser} from "../../Api/UserApi";
import {Props} from "../UserProfile/Profile";
import {render} from "react-dom";


export type State = {
  body:string,
  isLoggerIn:boolean,
  id:string,
  userName:string

}

class  CreatePost extends Component<Props,State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            id:'',
           userName:'',
            isLoggerIn: false,
            body:''
        }
    }


    render() {
        let isLoggedIn=this.state.isLoggerIn;
        return (

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

        );
    }


  handleCreatePosts(body: string) {
        createPost(this.state.id,this.state.userName,body)
            .then((res) => {
                console.log(res)
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
                console.log(this.state)
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })
    }
}










export default CreatePost