import {API_BASE_URL} from '../Constants/Constants'
import {request} from './API'
import {PostType} from "../components/Types/Types";

export function createPost(authorId: string | null, author: string | null, body: string): Promise<PostType[]> {
    return request({
        url: API_BASE_URL + "/posts",
        method: 'POST',
        body: JSON.stringify({'authorId':authorId,'author': author, 'body': body}),
        headers: {'Content-Type': 'application/json'}
    });
}

export function getPostData(postId: number): Promise<any> {
    return request({
        url: API_BASE_URL + "/posts/" + postId,
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
}

export function getAllPosts(): Promise<any> {
    return request({
        url:"/posts",
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
}

