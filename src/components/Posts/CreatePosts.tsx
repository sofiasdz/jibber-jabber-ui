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
    let isLoggedIn=true





    return (

        <Card>
            <CardContent>

                <Typography color="textSecondary" gutterBottom>
                    Create Post
                </Typography>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField required id="standard-required" label="Required" multiline={true} value={body}
                                   onChange={e => setBody(e.target.value)}/>
                        { isLoggedIn &&
                            <Button variant="contained" color="primary"
                                onClick={() => handleCreatePosts(localStorage.getItem("authorId"), localStorage.getItem("author"), body)}>
                            Create Post
                                local storage no esta guardando nada
                        </Button>}
                    </div>

                </form>

            </CardContent>
        </Card>

    );




    function handleCreatePosts(authorId: string | null, author: string | null, body: string) {
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