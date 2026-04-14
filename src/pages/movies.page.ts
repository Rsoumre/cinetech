import "./movies.page.css";
import { MovieService } from "../services/movie.service";
import { CardComponent } from "../components/card.component";
import { PaginationComponent } from "../components/pagination.component";

export class MoviesPage {
	private static currentPage = 1;
	private static totalPages = 1;

	static async render(
		onNavigate: (
			page: string,
			id?: number,
			mediaType?: "movie" | "tv",
		) => void,
	): Promise<HTMLElement> {
		const container = document.createElement("div");
		container.className = "movies-page";

		try {
			const response = await MovieService.getPopular(this.currentPage);
			const movies = response.results || [];
			this.totalPages = response.total_pages || 1;

			container.innerHTML = `
                <h1>Tous les Films</h1>
                <div class="movies-grid" id="movies-grid"></div>
                <div id="pagination"></div>
            `;

			const grid = container.querySelector("#movies-grid");
			if (grid) {
				movies.forEach((movie) => {
					const card = CardComponent.render({
						id: movie.id,
						title: movie.title || "Sans titre",
						image: movie.poster_path,
						rating: movie.vote_average || 0,
						onClick: () => onNavigate("detail", movie.id, "movie"),
					});
					grid.appendChild(card);
				});
			}

			const paginationContainer = container.querySelector("#pagination");
			if (paginationContainer) {
				const pagination = PaginationComponent.render({
					currentPage: this.currentPage,
					totalPages: Math.min(this.totalPages, 100),
					onPageChange: async (page) => {
						this.currentPage = page;
						const newContainer = await this.render(onNavigate);
						container.replaceWith(newContainer);
					},
				});
				paginationContainer.appendChild(pagination);
			}
		} catch (error) {
			container.innerHTML = "<h1>Erreur</h1>";
		}

		return container;
	}
}
