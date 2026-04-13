import "./navbar.css";
import { SearchService } from "../services/search.service";

export interface NavbarProps {
	onNavigate: (page: string, id?: number) => void;
	onSearch: (query: string) => void;
}

export class NavbarComponent {
	static render(props: NavbarProps): HTMLElement {
		const nav = document.createElement("nav");
		nav.className = "navbar";
		nav.innerHTML = `
            <div class="navbar-container">
                <div class="navbar-brand">
                    <h1>🎬 Cinetech</h1>
                </div>
                <ul class="navbar-menu">
                    <li><a href="#" class="nav-link" data-page="home">Accueil</a></li>
                    <li><a href="#" class="nav-link" data-page="movies">Films</a></li>
                    <li><a href="#" class="nav-link" data-page="series">Séries</a></li>
                    <li><a href="#" class="nav-link" data-page="favorites">Favoris</a></li>
                </ul>
                <div class="navbar-search">
                    <input 
                        type="text" 
                        id="search-input" 
                        placeholder="Rechercher..."
                        class="search-input"
                    />
                    <ul id="search-results" class="search-results hidden"></ul>
                </div>
            </div>
        `;

		nav.querySelectorAll(".nav-link").forEach((link) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				const page = (link as HTMLElement).getAttribute("data-page");
				if (page) props.onNavigate(page);
			});
		});

		const searchInput =
			nav.querySelector<HTMLInputElement>("#search-input");
		const searchResults =
			nav.querySelector<HTMLUListElement>("#search-results");
		let debounceTimer: ReturnType<typeof setTimeout>;

		if (searchInput && searchResults) {
			searchInput.addEventListener("input", async (e) => {
				clearTimeout(debounceTimer);
				const query = (e.target as HTMLInputElement).value;

				if (query.length < 2) {
					searchResults.classList.add("hidden");
					return;
				}

				debounceTimer = setTimeout(async () => {
					try {
						const results = await SearchService.search(query);
						searchResults.innerHTML = results
							.slice(0, 5)
							.map(
								(r) => `
                                <li>
                                    <a href="#" data-id="${r.id}" data-type="${r.media_type}">
                                        ${r.title || r.name}
                                    </a>
                                </li>
                            `,
							)
							.join("");

						searchResults.querySelectorAll("a").forEach((a) => {
							a.addEventListener("click", (e) => {
								e.preventDefault();
								const id = parseInt(
									a.getAttribute("data-id") || "0",
								);
								props.onNavigate("detail", id);
								searchInput.value = "";
								searchResults.classList.add("hidden");
							});
						});

						searchResults.classList.remove("hidden");
					} catch (error) {
						console.error("Search error:", error);
					}
				}, 300);
			});
		}

		return nav;
	}
}
