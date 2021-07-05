import {RouteComponentProps} from "react-router-dom";
import React, {Component} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {getCurrentUser, getUserInfo} from "../../Api/UserApi";
import {ProfileType} from "../Types/Types";

export type Props = RouteComponentProps<any> & {}

export type State = {
    userName: string,
    id: string,
    recieverProfile: ProfileType,
    getDataError:string


}


class UserChat extends Component<Props,State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            id:'',
            userName:'usernamefalso',
            recieverProfile:{
                id:'',
                username:'',
                bio:'',
                email:'',
                nick:''
            },
            getDataError:''


        }


    }

    render(){
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
                            <Typography color="textSecondary" gutterBottom>
                                Chat with {this.state.recieverProfile.nick}
                            </Typography>
                            <div>
                                <Grid container spacing={3}></Grid>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </CssBaseline>

        )
    }

    componentDidMount() {
        this.handleGetCurrentUser()
        this.getProfile(this.props.match.params.id )
    }

    getProfile = (id:string) => {
        getUserInfo(id).then((res) => {
                console.log(res)
                this.setState({recieverProfile:res})
                console.log(this.state)
            }
        )
            .catch((err) => this.setState({getDataError: 'An error occurred fetching profile data'}))
    }

    handleGetCurrentUser(){
        getCurrentUser()
            .then((res) => {
                console.log(res)
                this.setState({id:res.userId})
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })


    }
}

export default UserChat