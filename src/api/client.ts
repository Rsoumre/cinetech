const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface RequestParams {
	endpoint: string;
	params?: Record<string, string | number>;
}

export interface APIError {
	status: number;
	message: string;
}

export class APIClient {
	static async request<T>(params: RequestParams): Promise<T> {
		const { endpoint, params: queryParams } = params;

		try {
			// Construire l'URL avec les paramètres
			const url = new URL(`${BASE_URL}/${endpoint}`);
			url.searchParams.append("api_key", API_KEY);

			if (queryParams) {
				Object.entries(queryParams).forEach(([key, value]) => {
					url.searchParams.append(key, String(value));
				});
			}

			const response = await fetch(url.toString());

			if (!response.ok) {
				throw {
					status: response.status,
					message: `HTTP ${response.status}: ${response.statusText}`,
				} as APIError;
			}

			return (await response.json()) as T;
		} catch (error) {
			console.error("API Error:", error);
			throw error;
		}
	}
}
