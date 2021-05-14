import {API_BASE_URL} from '../Constants/Constants'
import {request} from './API'
import {PostType} from "../components/Types/Types";

export function createPost(title: string, description: string, link: string, topicId: number, role:string): Promise<PostType[]> {
    return request({
        url: API_BASE_URL + "/post",
        method: 'POST',
        body: JSON.stringify({'title': title, 'description': description, 'link': link, 'topicId': topicId, 'role': role}),
        headers:{'Authorization': 'Bearer '+ localStorage.getItem('token'),'Content-Type': 'application/json'}
    });
}



export function getPostData(postId: number): Promise<any> {
    return request({
        url: API_BASE_URL + "/post/" + postId,
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json'}
    });
}

export function getPosts(id: number, page: number, size: number): Promise<any> {
    return request({
        url: API_BASE_URL + "/topicposts/" + id + '?page=' + page + '&size=' + size,
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json'}
    });
}

