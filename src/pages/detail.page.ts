import { MovieService } from "../services/movie.service";
import { TVService } from "../services/tv.service";
import { CommentService } from "../services/comment.service";
import { FavoriteService } from "../services/favorite.service";
import { CommentComponent } from "../components/comment.component";

export class DetailPage {
	static async render(
		id: number,
		type: "movie" | "tv",
		_onNavigate: (page: string, id?: number) => void,
	): Promise<HTMLElement> {
		const container = document.createElement("div");
		container.className = "detail-page";

		try {
			const service = type === "movie" ? MovieService : TVService;
			const detail = await service.getDetails(id);
			CommentService.getByMediaID(id, type);
			const isFav = FavoriteService.isFavorite(id, type);
			const title =
				type === "movie" ? (detail as any).title : (detail as any).name;

			container.innerHTML = `<h1>${title}</h1>`;

			const favBtn = document.createElement("button");
			favBtn.textContent = isFav
				? "Retirer des favoris"
				: "Ajouter aux favoris";
			favBtn.addEventListener("click", () => {
				FavoriteService.toggle({
					id,
					type,
					title,
					poster_path: detail.poster_path,
				});
				const newIsFav = FavoriteService.isFavorite(id, type);
				favBtn.textContent = newIsFav
					? "Retirer des favoris"
					: "Ajouter aux favoris";
			});
			container.appendChild(favBtn);

			const commentForm = CommentComponent.renderForm((text, author) => {
				CommentService.add(id, type, text, author);
			});
			container.appendChild(commentForm);
		} catch (error) {
			container.innerHTML = "<h1>Erreur</h1>";
		}

		return container;
	}
}
