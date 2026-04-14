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

			const movies = moviesResponse.results?.slice(0, 8) || [];
			const tvShows = tvResponse.results?.slice(0, 8) || [];
			const featuredMovie = movies[0] || tvShows[0];
			const featuredTitle =
				(featuredMovie as { title?: string; name?: string } | undefined)
					?.title ||
				(featuredMovie as { title?: string; name?: string } | undefined)
					?.name ||
				"A la une";
			const featuredOverview = featuredMovie?.overview
				? `${featuredMovie.overview.slice(0, 180)}${featuredMovie.overview.length > 180 ? "..." : ""}`
				: "Retrouve les meilleures sorties du moment, des blockbusters aux series cultes.";
			const featuredImage = featuredMovie?.backdrop_path
				? `https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path}`
				: "";

			container.innerHTML = `
                <section class="home-hero" style="--hero-image: url('${featuredImage}');">
                    <div class="home-hero-content">
                        <p class="home-hero-kicker">Nouveau sur Cinetech</p>
                        <h1>${featuredTitle}</h1>
                        <p class="home-hero-overview">${featuredOverview}</p>
                        <div class="home-hero-actions">
                            <button class="hero-btn hero-btn-primary" id="watch-now-btn">Regarder maintenant</button>
                            <button class="hero-btn hero-btn-secondary" id="browse-movies-btn">Voir les films</button>
                        </div>
                    </div>
                </section>
                <section class="home-section">
                    <h2>Films Populaires</h2>
                    <div class="carousel" id="movies-carousel"></div>
                </section>
                <section class="home-section">
                    <h2>Séries Populaires</h2>
                    <div class="carousel" id="series-carousel"></div>
                </section>
            `;

			const watchNowBtn = container.querySelector("#watch-now-btn");
			if (watchNowBtn && featuredMovie?.id) {
				watchNowBtn.addEventListener("click", () =>
					onNavigate("detail", featuredMovie.id),
				);
			}

			const browseMoviesBtn =
				container.querySelector("#browse-movies-btn");
			if (browseMoviesBtn) {
				browseMoviesBtn.addEventListener("click", () =>
					onNavigate("movies"),
				);
			}

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
