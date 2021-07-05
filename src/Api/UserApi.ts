import {request} from "./API";
import {ProfileType} from "../components/Types/Types";

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

export function getUserInfo(id: string): Promise<any> {
    return request({
        url: "/users/"+id,
        method: 'GET',

    });
}

export function updateUser(nick: string, bio:string): Promise<any> {
    return request({
        url: "/users/update",
        method: 'PUT',
        body: JSON.stringify({'nick': nick, 'bio': bio })
    });
}

export function searchUser(search: string): Promise<ProfileType[]> {
    return request({
        url: "/users/update/"+search,
        method: 'GET',

    });
}