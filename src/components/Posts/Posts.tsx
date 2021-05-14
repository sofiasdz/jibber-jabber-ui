import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SimpleCard from "./PostCard";

export type State = {

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
                    <SimpleCard></SimpleCard>
                </Container>
            </React.Fragment>
        </Box>
        )
    }
}
export default Posts