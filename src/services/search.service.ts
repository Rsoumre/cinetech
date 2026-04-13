import { MovieService } from "./movie.service";

export interface SearchResult {
	id: number;
	title?: string;
	name?: string;
	media_type: "movie" | "tv" | "person";
	poster_path?: string;
	overview?: string;
}

export class SearchService {
	static async search(query: string): Promise<SearchResult[]> {
		try {
			const response = await MovieService.search(query, 1);
			return this._filterResults(response.results || []);
		} catch (error) {
			console.error("Search error:", error);
			return [];
		}
	}

	private static _filterResults(results: any[]): SearchResult[] {
		return results
			.filter(
				(item) =>
					item.media_type === "movie" || item.media_type === "tv",
			)
			.map((item) => ({
				id: item.id,
				title: item.title || item.name,
				name: item.name,
				media_type: item.media_type,
				poster_path: item.poster_path,
				overview: item.overview,
			}));
	}
}
