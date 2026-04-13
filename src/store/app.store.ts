import { type Favorit } from "../models/favorit.model";
import { type comment } from "../models/comment.model";

export interface AppState  {
    favorits: Favorit[];
    comments: comment[];
    currentPage: number;
    searchQuery: string
}