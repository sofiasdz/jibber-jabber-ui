import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SimpleCard from "./PostCard";

export type State = {
    posts: [1,2,3,4],

}
class Posts extends Component<State, any>{

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
       // getTopicPosts(this.props.match.params.id, this.state.currentPage, 3).then(res => this.setState({posts: res.posts, totalPages: res.totalPages}))
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
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
                    {
                        this.state.posts.length !== 0 ?
                            this.state.posts.map(() => (
                    <SimpleCard></SimpleCard>
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