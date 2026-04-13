import { type Favorit } from "../models/favorit.model";

export class FavoriteService {
	private static STORAGE_KEY = "cinetech_favorites";

	static getAll(): Favorit[] {
		const stored = localStorage.getItem(this.STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	}

	static add(fav: Favorit): void {
		const favorites = this.getAll();
		if (!this.isFavorite(fav.id, fav.type)) {
			favorites.push(fav);
			localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
		}
	}

	static remove(id: number, type: "movie" | "tv"): void {
		const favorites = this.getAll();
		const filtered = favorites.filter(
			(f) => !(f.id === id && f.type === type),
		);
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
	}

	static isFavorite(id: number, type: "movie" | "tv"): boolean {
		const favorites = this.getAll();
		return favorites.some((f) => f.id === id && f.type === type);
	}

	static toggle(item: Favorit): boolean {
		if (this.isFavorite(item.id, item.type)) {
			this.remove(item.id, item.type);
			return false;
		} else {
			this.add(item);
			return true;
		}
	}
}
