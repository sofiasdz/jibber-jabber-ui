
export type PostType = {
    id:string
    author: string,
    body: string,
    timeRecorded:string,
    likes:string

}

export type ProfileType ={
    id: string;
 nick:string;
   username:string;
    email:string;
    bio:string;
}

export type MessageType={
    senderId:string;
    body:string;
    time:string;
}

export type ConversationType={
    senderId:string;
    recipientId:string;
    messages:MessageType[];
}
