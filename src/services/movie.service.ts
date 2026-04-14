import { APIClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";
import type { APIResponse } from "../models/api-response.model";
import type { Movie } from "../models/movie.model";

export class MovieService {
	static async getPopular(page: number = 1): Promise<APIResponse<Movie>> {
		return APIClient.request<APIResponse<Movie>>({
			endpoint: ENDPOINTS.MOVIES_POPULAR,
			params: { page },
		});
	}

	static async getDetails(id: number): Promise<Movie> {
		return APIClient.request<Movie>({
			endpoint: ENDPOINTS.MOVIE_DETAILS(id),
			params: {
				append_to_response: "credits,recommendations,videos,images",
			},
		});
	}

	static async getRecommendations(
		id: number,
		page: number = 1,
	): Promise<APIResponse<Movie>> {
		return APIClient.request<APIResponse<Movie>>({
			endpoint: `movie/${id}/recommendations`,
			params: { page },
		});
	}

	static async search(
		query: string,
		page: number = 1,
	): Promise<APIResponse<any>> {
		return APIClient.request<APIResponse<any>>({
			endpoint: ENDPOINTS.SEARCH_MULTIPLE,
			params: {
				query,
				page,
				include_adult: "false",
			},
		});
	}
}
