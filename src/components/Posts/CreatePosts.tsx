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


function CreatePost(){
    const [body, setBody] = useState("Your post here..");





    return (
        <Card >
            <CardContent>
                <Typography  color="textSecondary" gutterBottom>
                    Create Post
                </Typography>
                <form  noValidate autoComplete="off">
                    <div>
                        <TextField required id="standard-required" label="Required"  multiline={true} value={body} onChange={e => setBody(e.target.value)} />
                        <Button variant="contained" color="primary" onClick={()=>handleCreatePosts('223','sofi',body)}>
                            Create Post
                        </Button>
                    </div>

                </form>
            </CardContent>
        </Card>
    );




    function  handleCreatePosts(authorId:string,author:string,body:string) {
        createPost(authorId,author,body)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })
    }
}



export default CreatePost