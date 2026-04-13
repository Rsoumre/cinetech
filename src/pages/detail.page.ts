export interface DetailPage {
    render(id: number, type: "movie" | "tv"): void;
}