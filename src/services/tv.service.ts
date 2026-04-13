import { APIClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";
import type { APIResponse } from "../models/api-response.model";
import type { TVSHOW } from "../models/tv.model";

export class TVService {
	static async getPopular(page: number = 1): Promise<APIResponse<TVSHOW>> {
		return APIClient.request<APIResponse<TVSHOW>>({
			endpoint: ENDPOINTS.TV_POPULAR,
			params: { page },
		});
	}

	static async getDetails(id: number): Promise<TVSHOW> {
		return APIClient.request<TVSHOW>({
			endpoint: ENDPOINTS.TV_DETAILS(id),
			params: {
				append_to_response: "credits,recommendations",
			},
		});
	}

	static async getRecommendations(
		id: number,
		page: number = 1,
	): Promise<APIResponse<TVSHOW>> {
		return APIClient.request<APIResponse<TVSHOW>>({
			endpoint: `tv/${id}/recommendations`,
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
