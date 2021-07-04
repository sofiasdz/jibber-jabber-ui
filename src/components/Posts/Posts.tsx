import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {getAllPosts} from "../../Api/PostApi";
import {PostType} from "../Types/Types"
import {RouteComponentProps, withRouter} from "react-router-dom";

export type Props = RouteComponentProps<any> & {}
export type State = {
    posts:PostType[],

}

class Posts extends Component<Props,State> {


    constructor(props: Props) {
        super(props);
        this.state = {
            posts:[],


        }
    };

    handleSubmitPost = (title: string, description: string, link: string) => {
      /*  let topic = this.props.location.state.topic;
        createPost(title, description, link, topic.id,"post")
            .then(() => {
                this.setState({errorMessage: ''});
                this.props.history.push('/main/topic/' + topic.id, {topic: topic})
                toast('Post successfully created!')
            })
            .catch((err) => {
                if (err.status === 409) this.setState({errorMessage: 'Title already in use'});
                else this.setState({errorMessage: 'An error occurred creating the post!'});
            })*/
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts = () => {
        getAllPosts().then(res => this.setState({posts: res}))
    }

    private handleCancel() {
        /*let topic = this.props.location.state.topic;
        this.props.history.push('/main/topic/' + topic.id, {topic: topic});*/
    }


    render() {
        return(
        <Box component="span" m={1} >
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                    {
                        this.state.posts.length !== 0 ?
                            this.state.posts.map((post, index) => (
                               < Card >
                            <CardContent>
                                <Typography variant="body2" component="p">
                                    {post.date}
                                </Typography>
                            <Typography variant="h5" component="h2">
                                {'Author:  ' + post.author}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {'Body  ' + post.body}
                        </Typography>
                                <Typography variant="body2" component="p">
                                    {post.likes}
                                </Typography>
                        </CardContent>
                        </Card>

                            )) :
                            <span className={'empty-message'}>This topic has no posts yet!</span>
                    }
                </Container>
            </React.Fragment>
        </Box>
        )
    }
}
export default Posts