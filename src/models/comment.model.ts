export interface comment {
	id: string;
	author: string;
	text: string;
	timestamp: Date;
	rating: number;
	replies?: comment[];
}
