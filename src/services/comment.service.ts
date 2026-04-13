import { type comment } from "../models/comment.model";

export interface CommentService  {
    getByMediaID(mediaId: number): comment[];
    add (comment: comment): void;
    reply(parentId: string, reply: comment): void;
}