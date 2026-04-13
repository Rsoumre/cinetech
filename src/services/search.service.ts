import { type Movie } from "../models/movie.model";
import { type TVSHOW } from "../models/tv.model";

export type SearchResult = Movie | TVSHOW;

export interface SearchService {
    search(query: string): Promise<SearchResult[]>;
}