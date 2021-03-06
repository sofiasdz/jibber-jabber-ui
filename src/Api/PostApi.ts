import {request} from './API'
import {PostType} from "../components/Types/Types";

export function createPost(authorId: string | null, author: string | null, body: string): Promise<PostType[]> {
    return request({
        url: "/posts/posts",
        method: 'POST',
        body: JSON.stringify({'authorId':authorId,'author': author, 'body': body}),
        headers: {'Content-Type': 'application/json'}
    });
}

export function getPostData(postId: number): Promise<any> {
    return request({
        url: "/posts/posts/" + postId,
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
}

export function getAllPosts(): Promise<any> {
    return request({
        url:"/posts/posts",
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
}


export function getTimeline(followed:string[]): Promise<any> {
    return request({
        url:"/posts/posts/timeline",
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({followed:followed}),
    });
}

export function likePost(authorId: string,postId:string): Promise<any> {
    return request({
        url: "/posts/posts/like",
        method: 'PUT',
        body: JSON.stringify({'userId':authorId,'postId': postId}),
        headers: {'Content-Type': 'application/json'}
    });
}

export function getAllUserPosts(id:string): Promise<any> {
    return request({
        url:"/posts/posts/author/"+id,
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
}

export function deletePost(postId:string): Promise<any> {
    return request({
        url: "/posts/posts/delete/"+postId,
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
}

