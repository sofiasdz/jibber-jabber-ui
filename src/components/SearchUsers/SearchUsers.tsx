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
import CreatePost from "../Posts/CreatePosts";
import {getCurrentUser, searchUser} from "../../Api/UserApi";
import {getAllPosts} from "../../Api/PostApi";
import {ProfileType} from "../Types/Types";


export type Props = RouteComponentProps<any> & {}



export type State = {
    userName: string,
    id: string,
    users:ProfileType[],
    search:string,

}




class  SearchUsers extends Component<Props,State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id:'',
            userName:'usernamefalso',
            users:[],
            search:"Search.."


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

            </CssBaseline>
        );
    }

    componentDidMount() {

    }


    searchUser = (search:string) => {
        searchUser(search).then(res => this.setState({users: res}))
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

    }



}
export default SearchUsers