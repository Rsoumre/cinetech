import "./home.page.css";
import { MovieService } from "../services/movie.service";
import { TVService } from "../services/tv.service";
import { CardComponent } from "../components/card.component";

export class HomePage {
	static async render(
		onNavigate: (page: string, id?: number) => void,
	): Promise<HTMLElement> {
		const container = document.createElement("div");
		container.className = "home-page";
		container.innerHTML = "<h1>Chargement...</h1>";

		try {
			const moviesResponse = await MovieService.getPopular(1);
			const tvResponse = await TVService.getPopular(1);

			const movies = moviesResponse.results?.slice(0, 4) || [];
			const tvShows = tvResponse.results?.slice(0, 4) || [];

			container.innerHTML = `
                <section class="home-section">
                    <h2>Films Populaires</h2>
                    <div class="carousel" id="movies-carousel"></div>
                </section>
                <section class="home-section">
                    <h2>Séries Populaires</h2>
                    <div class="carousel" id="series-carousel"></div>
                </section>
            `;

			const moviesCarousel = container.querySelector("#movies-carousel");
			if (moviesCarousel) {
				movies.forEach((movie) => {
					const card = CardComponent.render({
						id: movie.id,
						title: movie.title || "Sans titre",
						image: movie.poster_path,
						rating: movie.vote_average || 0,
						onClick: () => onNavigate("detail", movie.id),
					});
					moviesCarousel.appendChild(card);
				});
			}

			const seriesCarousel = container.querySelector("#series-carousel");
			if (seriesCarousel) {
				tvShows.forEach((show) => {
					const card = CardComponent.render({
						id: show.id,
						title: show.name || "Sans titre",
						image: show.poster_path,
						rating: show.vote_average || 0,
						onClick: () => onNavigate("detail", show.id),
					});
					seriesCarousel.appendChild(card);
				});
			}
		} catch (error) {
			console.error("Error:", error);
			container.innerHTML = "<h1>Erreur</h1>";
		}

		return container;
	}
}
