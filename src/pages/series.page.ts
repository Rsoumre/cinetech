import "./series.page.css";
import { TVService } from "../services/tv.service";
import { CardComponent } from "../components/card.component";
import { PaginationComponent } from "../components/pagination.component";

export class SeriesPage {
	private static currentPage = 1;
	private static totalPages = 1;

	static async render(
		onNavigate: (page: string, id?: number) => void,
	): Promise<HTMLElement> {
		const container = document.createElement("div");
		container.className = "series-page";

		try {
			const response = await TVService.getPopular(this.currentPage);
			const series = response.results || [];
			this.totalPages = response.total_pages || 1;

			container.innerHTML = `
                <h1>Toutes les Séries</h1>
                <div class="series-grid" id="series-grid"></div>
                <div id="pagination"></div>
            `;

			const grid = container.querySelector("#series-grid");
			if (grid) {
				series.forEach((show) => {
					const card = CardComponent.render({
						id: show.id,
						title: show.name || "Sans titre",
						image: show.poster_path,
						rating: show.vote_average || 0,
						onClick: () => onNavigate("detail", show.id),
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
