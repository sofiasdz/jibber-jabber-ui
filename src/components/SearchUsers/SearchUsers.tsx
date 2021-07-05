import {RouteComponentProps} from "react-router-dom";
import React, {Component, useState} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";

export type Props = RouteComponentProps<any> & {}



export type State = {
    userName: string,
    email: string,
    nick: string,
    bio: string,
    id: string,
    getDataError: string,
    updateMode:boolean,
    isAlertOpen: boolean

}


class  SearchUsers extends Component<Props,State> {
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
            isAlertOpen: false


        }


    }

    render() {
        let updateMode= this.state.updateMode;
        let isAlertOpen= this.state.isAlertOpen

        return(
            <CssBaseline>

            </CssBaseline>
        );
    }

    componentDidMount() {

    }
}