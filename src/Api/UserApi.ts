import {API_BASE_URL} from "../Constants/Constants";
import {request} from "./API";

export function loginUser(username: string, password: string): Promise<any> {
    return request({
        url: "/login",
        method: 'POST',
        body: JSON.stringify({'username': username, 'password': password })
    });
}