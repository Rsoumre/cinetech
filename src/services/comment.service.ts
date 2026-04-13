import { type comment } from "../models/comment.model";

export class CommentService {
	private static STORAGE_KEY = "cinetech_comments";

	static getByMediaID(
		mediaId: number | string,
		type: "movie" | "tv",
	): comment[] {
		const key = `${type}_${mediaId}`;
		const stored = localStorage.getItem(this.STORAGE_KEY);
		if (!stored) return [];
		const all = JSON.parse(stored);
		return all[key] || [];
	}

	static add(
		mediaId: number | string,
		type: "movie" | "tv",
		text: string,
		author: string,
	): comment {
		const newComment: comment = {
			id: Date.now().toString(),
			author,
			text,
			timestamp: new Date(),
			rating: 0,
			replies: [],
		};

		const key = `${type}_${mediaId}`;
		const stored = localStorage.getItem(this.STORAGE_KEY);
		const all = stored ? JSON.parse(stored) : {};
		all[key] = [...(all[key] || []), newComment];
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
		return newComment;
	}

	static reply(
		mediaId: number | string,
		type: "movie" | "tv",
		parentId: string,
		text: string,
		author: string,
	): comment {
		const newReply: comment = {
			id: Date.now().toString(),
			author,
			text,
			timestamp: new Date(),
			rating: 0,
			replies: [],
		};

		const key = `${type}_${mediaId}`;
		const stored = localStorage.getItem(this.STORAGE_KEY);
		const all = stored ? JSON.parse(stored) : {};
		const comments = all[key] || [];
		const parent = this._findComment(comments, parentId);

		if (parent) {
			parent.replies = parent.replies || [];
			parent.replies.push(newReply);
		}

		all[key] = comments;
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
		return newReply;
	}

	private static _findComment(
		comments: comment[],
		id: string,
	): comment | null {
		for (const c of comments) {
			if (c.id === id) return c;
			if (c.replies) {
				const found = this._findComment(c.replies, id);
				if (found) return found;
			}
		}
		return null;
	}
}
