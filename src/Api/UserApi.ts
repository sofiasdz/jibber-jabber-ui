import {API_BASE_URL} from "../Constants/Constants";
import {request} from "./API";

export function loginUser(username: string, password: string): Promise<any> {
    return request({
        url: "/login",
        method: 'POST',
        body: JSON.stringify({'username': username, 'password': password })
    });
}

export function registerUser(email:string,username: string, password: string, nick: string): Promise<any> {
    return request({
        url: "/users/register",
        method: 'POST',
        body: JSON.stringify({'email':email,'username': username, 'password': password ,'nick':nick})
    });
}

export function getCurrentUser(): Promise<any> {
    return request({
        url: "/users/currentUser",
        method: 'GET',

    });
}