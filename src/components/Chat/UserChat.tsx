import {RouteComponentProps} from "react-router-dom";
import React, {Component} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {getCurrentUser, getUserInfo} from "../../Api/UserApi";
import {MessageType, ProfileType} from "../Types/Types";
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {getChat} from "../../Api/MessagesApi";

export type Props = RouteComponentProps<any> & {}

export type State = {
    userName: string,
    id: string,
    recieverProfile: ProfileType,
    getDataError:string,
    stompClient:any,
    message:string,
    messages:MessageType[],
    disabled:boolean


}


class UserChat extends Component<Props,State> {


    constructor(props: Props) {
        super(props);
        this.state = {
            id:'',
            userName:'usernamefalso',
            stompClient: null,
            recieverProfile:{
                id:'',
                username:'',
                bio:'',
                email:'',
                nick:''
            },
            getDataError:'',
            message:"",
            messages:[],
            disabled:true


        }


    }

    render(){
        let message= this.state.message;
        return (
            <div>

        <Box component="span" m={1} >

            <React.Fragment>
                <CssBaseline />
                <Container style={ {alignItems:"center"}}>

                    {
                        this.state.messages.length !== 0 ?
                            this.state.messages.map((m, index) => (
                                <div>
                                { m.senderId===this.state.recieverProfile.id? < Card style={{marginLeft:30,marginTop:50,marginBottom:50,width:1000}} >
                                    <CardContent>
                                        <Typography variant="subtitle2" component="p">
                                            {m.time}
                                        </Typography>
                                            <Typography variant="subtitle2" component="p">{this.state.recieverProfile.username} </Typography>
                                        <Typography variant="subtitle1" component="h2">
                                            {m.body}
                                        </Typography>

                                    </CardContent>
                                </Card>:
                            < Card style={{marginLeft:115,marginTop:50,marginBottom:50,width:1000}} >
                                <CardContent>
                                    <Typography variant="subtitle2" component="p">
                                        {m.time}
                                    </Typography>
                                    <Typography variant="subtitle2" component="p">{this.state.userName} </Typography>
                                    <Typography variant="subtitle1" component="h2">
                                        {m.body}
                                    </Typography>

                                </CardContent>
                            </Card>
                                }
                                </div>

                            )) :
                            <span className={'empty-message'}>No Messages yet!</span>
                    }
                </Container>
            </React.Fragment>
        </Box>

                <CssBaseline>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Card style={{width:1000,backgroundPosition:"center"}}>
                            <CardContent >
                                <Typography color="textSecondary" gutterBottom>
                                    Chat with {this.state.recieverProfile.nick}
                                </Typography>

                                <Grid item xs={12} >
                                    <TextField multiline rows={2}  style={{width:900}} label="Message"   value={message} onChange={e =>this.setState({message:e.target.value}) }
                                               variant="filled"
                                             />

                                </Grid>
                                <Grid item xs={12} >
                                    <Button variant="contained" color="primary" disabled={this.state.disabled} onClick={()=> this.sendMessage(this.state.message,this.state.id,this.state.recieverProfile.id)}>
                                        Send
                                    </Button>
                                </Grid>
                                <div>
                                    <Grid container spacing={3}></Grid>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>

                </CssBaseline>
            </div>

        )
    }

    componentDidMount() {
        this.connect()
        this.handleGetCurrentUser()
        this.getProfile(this.props.match.params.id )
    }

    getProfile = (id:string) => {
        getUserInfo(id).then((res) => {
                this.setState({recieverProfile:res})
                this.getChat()

            }
        )
            .catch((err) => this.setState({getDataError: 'An error occurred fetching profile data'}))
    }

    handleGetCurrentUser(){
        getCurrentUser()
            .then((res) => {
                this.setState({id:res.userId,userName:res.username})

            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                {}

            })


    }

    connect() {
        var socket = new SockJS('/chat');
        // var stompClient=Stomp.over(socket)
        // this.setState( {stompClient:stompClient});
        this.setState({stompClient:Stomp.over(socket)},this.subscribe);
    }

    subscribe(){
        this.state.stompClient.connect({}, () => {
            this.setState({disabled:false})

            this.state.stompClient.subscribe('/topic/messages', (message: any) =>{
                this.setMessages(JSON.parse(message.body))
            })
        })
    }

    setMessages(messages:MessageType[]){
        this.setState({messages:messages})
                         }

    disconnect() {
        if(this.state.stompClient != null) {
            this.state.stompClient.disconnect();
        }

    }

    sendMessage(message:string, from:string, to: string) {
        this.state.stompClient.send("/conversation/chat", {}, JSON.stringify({'senderId':from, 'recipientId':to, 'body':message}));
        this.getChat()
        this.setState({message:""})
    }



    getChat(){
        getChat(this.state.id,this.state.recieverProfile.id)
            .then((res) => {
                this.setState({messages:res.messages})
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404){}


            })
    }

}

export default UserChat