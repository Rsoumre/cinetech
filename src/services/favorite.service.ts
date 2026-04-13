import { type Favorit } from "../models/favorit.model";

export interface FavoriteService {
    getAll(): Favorit[];
    add(fav: Favorit): void;
    remove(id: number): void;
    isfavorit(id: number): boolean
}