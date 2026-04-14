import "./detail.page.css";
import { MovieService } from "../services/movie.service";
import { TVService } from "../services/tv.service";
import { CommentService } from "../services/comment.service";
import { FavoriteService } from "../services/favorite.service";
import { CommentComponent } from "../components/comment.component";
import { CardComponent } from "../components/card.component";

export class DetailPage {
	static async render(
		id: number,
		type: "movie" | "tv",
		onNavigate: (
			page: string,
			id?: number,
			mediaType?: "movie" | "tv",
		) => void,
	): Promise<HTMLElement> {
		const container = document.createElement("div");
		container.className = "detail-page";

		try {
			const service = type === "movie" ? MovieService : TVService;
			const detail = (await service.getDetails(id)) as any;
			const comments = CommentService.getByMediaID(id, type);
			const isFav = FavoriteService.isFavorite(id, type);
			const title =
				type === "movie"
					? detail.title || "Sans titre"
					: detail.name || "Sans titre";
			const releaseDate =
				type === "movie" ? detail.release_date : detail.first_air_date;
			const rating = Number(detail.vote_average || 0).toFixed(1);
			const genres = (detail.genres || [])
				.slice(0, 4)
				.map((g: { name: string }) => g.name)
				.join(" • ");
			const runtime =
				detail.runtime || detail.episode_run_time?.[0] || null;
			const seasons = detail.number_of_seasons || null;
			const backdropUrl = detail.backdrop_path
				? `https://image.tmdb.org/t/p/w1280${detail.backdrop_path}`
				: "";
			const posterUrl = detail.poster_path
				? `https://image.tmdb.org/t/p/w500${detail.poster_path}`
				: "https://via.placeholder.com/500x750?text=No+Image";

			const trailer = (detail.videos?.results || []).find(
				(video: { site: string; type: string }) =>
					video.site === "YouTube" && video.type === "Trailer",
			);

			const imageList = (detail.images?.backdrops || []).slice(0, 8);
			const similarList = (detail.recommendations?.results || []).slice(
				0,
				8,
			);

			container.innerHTML = `
                <section class="detail-hero" style="--detail-backdrop: url('${backdropUrl}');">
                    <div class="detail-hero-overlay"></div>
                    <div class="detail-main">
                        <aside class="detail-poster-wrap">
                            <img src="${posterUrl}" alt="${title}" class="detail-poster" />
                        </aside>
                        <div class="detail-content">
                            <p class="detail-kicker">${type === "movie" ? "Film" : "Série"}</p>
                            <h1>${title}</h1>
                            <div class="detail-meta">
                                <span>⭐ ${rating}/10</span>
                                ${releaseDate ? `<span>${releaseDate.slice(0, 4)}</span>` : ""}
                                ${runtime ? `<span>${runtime} min</span>` : ""}
                                ${seasons ? `<span>${seasons} saison(s)</span>` : ""}
                            </div>
                            ${genres ? `<p class="detail-genres">${genres}</p>` : ""}
                            <div class="detail-actions">
                                <button class="detail-fav-btn" id="fav-btn">${isFav ? "Retirer des favoris" : "Ajouter aux favoris"}</button>
                                ${trailer ? `<a class="detail-trailer-link" href="https://www.youtube.com/watch?v=${trailer.key}" target="_blank" rel="noopener noreferrer">Voir la bande annonce</a>` : ""}
                            </div>
                        </div>
                    </div>
                </section>

                <section class="detail-tabs">
                    <div class="tab-controls">
                        <button class="tab-btn active" data-tab="overview">Apercu</button>
                        <button class="tab-btn" data-tab="details">Details</button>
                        <button class="tab-btn" data-tab="trailer">Bande annonce</button>
                        <button class="tab-btn" data-tab="images">Images</button>
                    </div>
                    <div class="tab-panel active" data-tab-panel="overview">
                        <p>${detail.overview || "Aucun synopsis disponible."}</p>
                    </div>
                    <div class="tab-panel" data-tab-panel="details">
                        <ul class="detail-list">
                            <li><strong>Titre original:</strong> ${detail.original_title || detail.original_name || title}</li>
                            <li><strong>Langue:</strong> ${detail.original_language?.toUpperCase() || "N/A"}</li>
                            <li><strong>Popularite:</strong> ${Math.round(detail.popularity || 0)}</li>
                            <li><strong>Votes:</strong> ${detail.vote_count || 0}</li>
                        </ul>
                    </div>
                    <div class="tab-panel" data-tab-panel="trailer">
                        ${trailer ? `<div class="trailer-wrap"><iframe src="https://www.youtube.com/embed/${trailer.key}" title="Bande annonce ${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>` : "<p>Aucune bande annonce disponible.</p>"}
                    </div>
                    <div class="tab-panel" data-tab-panel="images">
                        ${imageList.length > 0 ? '<div class="detail-images" id="detail-images"></div>' : "<p>Aucune image disponible.</p>"}
                    </div>
                </section>

                <section class="detail-similar">
                    <h2>Similaires</h2>
					${similarList.length > 0 ? '<div class="detail-similar-track" id="detail-similar-grid"></div>' : "<p>Aucun contenu similaire disponible.</p>"}
                </section>

                <section class="detail-comments">
                    <h2>Commentaires</h2>
                    <div id="comment-list"></div>
                    <div id="comment-form"></div>
                </section>
            `;

			const favBtn =
				container.querySelector<HTMLButtonElement>("#fav-btn");
			if (favBtn) {
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
			}

			const tabButtons =
				container.querySelectorAll<HTMLButtonElement>(".tab-btn");
			const tabPanels =
				container.querySelectorAll<HTMLElement>(".tab-panel");
			tabButtons.forEach((btn) => {
				btn.addEventListener("click", () => {
					const tab = btn.dataset.tab;
					tabButtons.forEach((b) => b.classList.remove("active"));
					tabPanels.forEach((p) => p.classList.remove("active"));
					btn.classList.add("active");
					const panel = container.querySelector<HTMLElement>(
						`[data-tab-panel='${tab}']`,
					);
					panel?.classList.add("active");
				});
			});

			const imageContainer =
				container.querySelector<HTMLElement>("#detail-images");
			if (imageContainer) {
				imageList.forEach((image: { file_path: string }) => {
					const img = document.createElement("img");
					img.src = `https://image.tmdb.org/t/p/w780${image.file_path}`;
					img.alt = `${title} image`;
					img.loading = "lazy";
					imageContainer.appendChild(img);
				});
			}

			const similarGrid = container.querySelector<HTMLElement>(
				"#detail-similar-grid",
			);
			if (similarGrid) {
				similarList.forEach((item: any) => {
					const similarCard = CardComponent.render({
						id: item.id,
						title: item.title || item.name || "Sans titre",
						image: item.poster_path,
						rating: item.vote_average || 0,
						onClick: () => onNavigate("detail", item.id, type),
					});
					similarGrid.appendChild(similarCard);
				});
			}

			const commentListContainer =
				container.querySelector<HTMLElement>("#comment-list");
			if (commentListContainer) {
				const commentList = CommentComponent.render(comments);
				commentListContainer.appendChild(commentList);
			}

			const commentForm = CommentComponent.renderForm((text, author) => {
				CommentService.add(id, type, text, author);
				onNavigate("detail", id, type);
			});
			const commentFormContainer =
				container.querySelector<HTMLElement>("#comment-form");
			if (commentFormContainer) {
				commentFormContainer.appendChild(commentForm);
			}
		} catch (error) {
			container.innerHTML = "<h1>Erreur</h1>";
		}

		return container;
	}
}
