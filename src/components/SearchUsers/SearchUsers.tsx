import {RouteComponentProps} from "react-router-dom";
import React, {Component, useState} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import {getCurrentUser, searchUser,getFollowed} from "../../Api/UserApi";
import {ProfileType} from "../Types/Types";
import Box from "@material-ui/core/Box";
import ProfileCard from "./ProfileCard";


export type Props = RouteComponentProps<any> & { }




export type State = {
    userName: string,
    id: string,
    users:ProfileType[],
    search:string,
    loading:boolean,
    followed:string[]

}




class  SearchUsers extends Component<Props,State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id:'',
            userName:'usernamefalso',
            users:[],
            search:"Search..",
            loading:true,
            followed:[]


        }


    }

    render() {

        return(
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
                                Explore
                            </Typography>
                            <Grid item xs={12} >
                                <TextField id="filled-search" label="Search field" type="search"  onChange={e =>this.handleSearchChange(e) }
                                           variant="filled"
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position="start">
                                                       <SearchIcon />
                                                   </InputAdornment>
                                               ),
                                           }}/>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Box component="span" m={1} >
                    <React.Fragment>
                        {this.state.users.length !== 0 ?
                                this.state.users.map((post,index) => (
                                            <ProfileCard key={index} profile={post}  history={this.props.history} location={this.props.location} match={this.props.match}/>
                                            )):
                                <span >No results!</span>
                        }
                    </React.Fragment>
                </Box>

            </CssBaseline>
        );
    }

    componentDidMount() {
        this.handleGetCurrentUser()

    }


    searchUser = (search:string) => {
        searchUser(search).then(res => this.setState({users: res.users,}))
    }



    handleGetCurrentUser(){
        getCurrentUser()
            .then((res) => {
                this.setState({userName: res.user, id:res.userId})
                console.log(this.state)
            })
            .catch((err) => {
                if (err.status === 401|| err.status===404)
                    console.log(err)

            })
    }

   handleSearchChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
       this.setState({search:e.target.value})
       this.searchUser(this.state.search)

    }





}
export default SearchUsers