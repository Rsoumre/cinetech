import "./comment.css";
import type { comment } from "../models/comment.model";

export class CommentComponent {
	static render(
		comments: comment[],
		_onReplySubmit?: (
			parentId: string,
			text: string,
			author: string,
		) => void,
	): HTMLElement {
		const container = document.createElement("div");
		container.className = "comments-section";

		const renderComment = (c: comment, indent: number = 0): HTMLElement => {
			const div = document.createElement("div");
			div.className = "comment";
			div.style.marginLeft = `${indent * 20}px`;

			const date = new Date(c.timestamp).toLocaleDateString("fr-FR");

			div.innerHTML = `
                <div class="comment-header">
                    <strong>${c.author}</strong>
                    <span class="comment-date">${date}</span>
                </div>
                <div class="comment-text">${c.text}</div>
                <div class="comment-rating">⭐ ${c.rating || 0}/10</div>
                <button class="reply-btn" data-comment-id="${c.id}">Répondre</button>
            `;

			if (c.replies && c.replies.length > 0) {
				const repliesDiv = document.createElement("div");
				repliesDiv.className = "replies";
				c.replies.forEach((reply) => {
					repliesDiv.appendChild(renderComment(reply, indent + 1));
				});
				div.appendChild(repliesDiv);
			}

			return div;
		};

		comments.forEach((c) => {
			container.appendChild(renderComment(c));
		});

		return container;
	}

	static renderForm(
		onSubmit: (text: string, author: string) => void,
	): HTMLElement {
		const form = document.createElement("form");
		form.className = "comment-form";
		form.innerHTML = `
            <input type="text" placeholder="Votre nom" class="form-input" id="author-input" required>
            <textarea placeholder="Votre commentaire..." class="form-textarea" id="text-input" required></textarea>
            <input type="range" min="0" max="10" value="5" class="form-rating" id="rating-input">
            <span id="rating-display">5/10</span>
            <button type="submit" class="form-btn">Ajouter un commentaire</button>
        `;

		const ratingInput =
			form.querySelector<HTMLInputElement>("#rating-input");
		const ratingDisplay =
			form.querySelector<HTMLSpanElement>("#rating-display");

		if (ratingInput && ratingDisplay) {
			ratingInput.addEventListener("input", (e) => {
				ratingDisplay.textContent = `${(e.target as HTMLInputElement).value}/10`;
			});
		}

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const author = (
				form.querySelector("#author-input") as HTMLInputElement
			).value;
			const text = (
				form.querySelector("#text-input") as HTMLTextAreaElement
			).value;

			if (author && text) {
				onSubmit(text, author);
				(
					form.querySelector("#author-input") as HTMLInputElement
				).value = "";
				(
					form.querySelector("#text-input") as HTMLTextAreaElement
				).value = "";
			}
		});

		return form;
	}
}
