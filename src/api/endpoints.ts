export const ENDPOINTS = {
    MOVIES_POPULAR: "movie/popular",
    TV_POPULAR: "tv/popular",
    MOVIE_DETAILS: (id: number) => `movie/${id}`,
    TV_DETAILS: (id: number) => `tv/${id}`,
    SEARCH_MULTIPLE: "search/multi"
}