export interface CardProps {
	id: number;
	title: string;
	image: string | null;
	rating: number;
	onClick?: () => void;
}

export class CardComponent {
	static render(props: CardProps): HTMLElement {
		const card = document.createElement("div");
		card.className = "card";

		const imageUrl = props.image
			? `https://image.tmdb.org/t/p/w300${props.image}`
			: "https://via.placeholder.com/300x450?text=No+Image";

		card.innerHTML = `
                <div class="card-image">
                    <img src="${imageUrl}" alt="${props.title}" loading="lazy">
                    <div class="card-overlay">
                        <div class="card-rating">
                            <span class="rating-badge">⭐ ${(props.rating / 2).toFixed(1)}</span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${props.title}</h3>
                </div>
            `;

		if (props.onClick) {
			card.addEventListener("click", props.onClick);
			card.style.cursor = "pointer";
		}

		return card;
	}
}
