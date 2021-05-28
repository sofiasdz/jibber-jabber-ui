import {API_BASE_URL} from "../Constants/Constants";
import {request} from "./API";

export function loginUser(username: string, password: string): Promise<any> {
    return request({
        url: API_BASE_URL + "/login",
        method: 'POST',
        body: JSON.stringify({'username': username, 'password': password })
    });
}


export function registerUser(email: string, password: string): Promise<any> {
    return request({
        url: API_BASE_URL + "/register",
        method: 'POST',
        body: JSON.stringify({'email': email, 'password': password })
    });
}