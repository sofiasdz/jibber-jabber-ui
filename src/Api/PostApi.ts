import {API_BASE_URL} from '../Constants/Constants'
import {request} from './API'
import {PostType} from "../components/Types/Types";

export function createPost(author: string, body: string): Promise<PostType[]> {
    return request({
        url: API_BASE_URL + "/posts",
        method: 'POST',
        body: JSON.stringify({'author': author, 'body': body}),
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json'}
    });
}

export function getPostData(postId: number): Promise<any> {
    return request({
        url: API_BASE_URL + "/posts/" + postId,
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json'}
    });
}

export function getAllPosts(): Promise<any> {
    return request({
        url: API_BASE_URL + "/posts",
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json'}
    });
}