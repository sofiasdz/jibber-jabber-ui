
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {RouteComponentProps} from 'react-router-dom';
import React, {Component} from 'react'
import {getCurrentUser, getUserInfo} from "../../Api/UserApi";
import {Fab, Grid, TextField} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';




export type Props = RouteComponentProps<any> & {}



export type State = {
    userName: string,
    email: string,
    nick: string,
    bio: string,
    id: string,
    getDataError: string,
    updateMode:boolean

}


 class  Profile extends Component<Props,State> {


     constructor(props: Props) {
         super(props);
         this.state = {
             id:'',
             userName:'usernamefalso',
             nick:'nickfalso',
             bio:'biofalsa',
             email:'emailsalfo',
             getDataError:'',
             updateMode: false,


         }


         }






    render() {
         let updateMode= this.state.updateMode;

        return(
        <Card>
            <CardContent>


                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography style={{marginBottom:30}}> Your Profile</Typography>
                    </Grid>
                    { !updateMode &&
                    <Grid item xs={6}>
                <Fab color="secondary" aria-label="edit" onClick={()=>this.setState({updateMode:true})}>
                    <EditIcon />
                </Fab>
                    </Grid>
                    }
                    { updateMode &&
                    <Grid item xs={6}>
                        <Fab color="primary" aria-label="edit" onClick={()=>this.handleProfileUpdate()}>
                            <CheckIcon />
                        </Fab>
                    </Grid>
                    }

                        <Grid item xs={12}>
                        <TextField
                           value={this.state.userName}
                            label="Username"
                           variant="outlined"
                           helperText="This value cant be changed"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            value={this.state.email}
                            label="Email"
                            variant="outlined"
                            helperText="This value cant be changed"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        </Grid>
                    {!updateMode &&
                    <div>
                    <Grid item xs={12}>
                        <TextField
                            value={this.state.nick}
                            label="Nick"
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{marginLeft:15}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={this.state.bio}
                            label="Bio"
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{marginLeft:15}}
                        />
                    </Grid>
                    </div>}
                        {updateMode &&
                            <div style={{marginLeft:10}}>
                        <Grid item xs={12}>
                <TextField style={{marginLeft:10}} label="Nick" value={this.state.nick} onChange={e => this.setState( {nick:e.target.value})}/>
                        </Grid>
                        <Grid item xs={12}>
                <TextField  style={{marginLeft:10}} label="Bio" value={this.state.bio} onChange={e => this.setState( {bio:e.target.value})}/>
                        </Grid>
                        <Grid item xs={12}>
                    <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    style={{marginLeft:10}}
                    />
                        </Grid>
                    </div>
                }

            </Grid>
            </CardContent>
        </Card>
        );
    }

     componentDidMount() {
         this.handleGetCurrentUser()
     }




    getProfile = (id:string) => {
        getUserInfo(id).then((res) => {
                console.log(res)
                this.setState({userName: res.username, email: res.email, nick: res.nick, bio: res.bio})
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
                 this.getProfile(this.state.id)
             })
             .catch((err) => {
                 if (err.status === 401|| err.status===404)
                     console.log(err)

             })


     }


     private handleProfileUpdate() {

     }
 }



export default Profile