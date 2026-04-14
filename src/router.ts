import { HomePage } from "./pages/home.page";
import { MoviesPage } from "./pages/movies.page";
import { SeriesPage } from "./pages/series.page";
import { DetailPage } from "./pages/detail.page";
import { FavoritesPage } from "./pages/favorites.page";
import { NavbarComponent } from "./components/navbar.component";

export class Router {
	private app: HTMLElement;
	private pageContent: HTMLElement;
	private navbar: HTMLElement;

	constructor(app: HTMLElement) {
		this.app = app;
		this.pageContent = document.createElement("main");
		this.pageContent.id = "page-content";
		this.navbar = NavbarComponent.render({
			onNavigate: (page, id, mediaType) =>
				this.navigate(page, id, mediaType),
			onSearch: (query) => this.handleSearch(query),
		});
		this.app.appendChild(this.navbar);
		this.app.appendChild(this.pageContent);
	}

	async navigate(
		page: string,
		id?: number,
		mediaType?: "movie" | "tv",
	): Promise<void> {
		try {
			let pageElement: HTMLElement;

			switch (page) {
				case "home":
					pageElement = await HomePage.render((p, i, t) =>
						this.navigate(p, i, t),
					);
					break;
				case "movies":
					pageElement = await MoviesPage.render((p, i, t) =>
						this.navigate(p, i, t),
					);
					break;
				case "series":
					pageElement = await SeriesPage.render((p, i, t) =>
						this.navigate(p, i, t),
					);
					break;
				case "detail":
					if (!id) throw new Error("ID requis pour la page détail");
					pageElement = await DetailPage.render(
						id,
						mediaType || "movie",
						(p, i, t) => this.navigate(p, i, t),
					);
					break;
				case "favorites":
					pageElement = await FavoritesPage.render((p, i, t) =>
						this.navigate(p, i, t),
					);
					break;
				default:
					pageElement = await HomePage.render((p, i, t) =>
						this.navigate(p, i, t),
					);
			}

			this.pageContent.innerHTML = "";
			this.pageContent.appendChild(pageElement);
			window.scrollTo(0, 0);
		} catch (error) {
			console.error("Navigation error:", error);
			this.pageContent.innerHTML = "<h1>Erreur lors du chargement</h1>";
		}
	}

	private handleSearch(query: string): void {
		console.log("Recherche:", query);
	}
}
