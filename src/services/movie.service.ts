import { type Movie } from "../models/movie.model.ts";
import { type APIResponse } from "../models/api-response.model.ts";

export interface MovieService {
	getpopular(page?: number): Promise<APIResponse<Movie>>;
	getDetails(id: number): Promise<Movie>;
	getRecommendations(id: number): Promise<Movie>;
}
