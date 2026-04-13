export interface Formatter {
  formatDate(date: string): string;
  formatRating(vote: number): string;
}