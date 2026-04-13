export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    posteur_path: string;
    backdrop_path: string;
    relaese_date: string;
    vote_average: number;
    genre_ids: number[];
    popularity: number;
}
