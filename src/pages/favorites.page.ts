import "./favorites.page.css";
import { FavoriteService } from "../services/favorite.service";
import { CardComponent } from "../components/card.component";

export class FavoritesPage {
	static async render(
		onNavigate: (page: string, id?: number) => void,
	): Promise<HTMLElement> {
		const container = document.createElement("div");
		container.className = "favorites-page";

		const favorites = FavoriteService.getAll();

		if (favorites.length === 0) {
			container.innerHTML = `<h1>Mes Favoris</h1><p>Aucun favori</p>`;
		} else {
			container.innerHTML = `<h1>Mes Favoris (${favorites.length})</h1><div id="favorites-grid" class="favorites-grid"></div>`;

			const grid = container.querySelector("#favorites-grid");
			if (grid) {
				favorites.forEach((fav) => {
					const card = CardComponent.render({
						id: fav.id,
						title: fav.title,
						image: fav.poster_path,
						rating: 0,
						onClick: () => onNavigate("detail", fav.id),
					});
					grid.appendChild(card);
				});
			}
		}

		return container;
	}
}
