import {request} from "./API";

export function getChat(senderId: string, recipientId: string): Promise<any> {
    return request({
        url:"/conversation/"+senderId+"/"+recipientId,
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
}