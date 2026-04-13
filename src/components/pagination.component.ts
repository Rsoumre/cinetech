export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export class PaginationComponent {
	static render(props: PaginationProps): HTMLElement {
		const container = document.createElement("div");
		container.className = "pagination";

		// Bouton Précédent
		const prevBtn = document.createElement("button");
		prevBtn.textContent = "← Précédent";
		prevBtn.disabled = props.currentPage === 1;
		prevBtn.addEventListener("click", () => {
			if (props.currentPage > 1)
				props.onPageChange(props.currentPage - 1);
		});

		// Numéros de page
		const pagesContainer = document.createElement("div");
		pagesContainer.className = "page-numbers";

		const startPage = Math.max(1, props.currentPage - 2);
		const endPage = Math.min(props.totalPages, props.currentPage + 2);

		for (let i = startPage; i <= endPage; i++) {
			const pageBtn = document.createElement("button");
			pageBtn.textContent = String(i);
			pageBtn.className =
				i === props.currentPage ? "page-btn active" : "page-btn";
			pageBtn.addEventListener("click", () => props.onPageChange(i));
			pagesContainer.appendChild(pageBtn);
		}

		// Bouton Suivant
		const nextBtn = document.createElement("button");
		nextBtn.textContent = "Suivant →";
		nextBtn.disabled = props.currentPage === props.totalPages;
		nextBtn.addEventListener("click", () => {
			if (props.currentPage < props.totalPages)
				props.onPageChange(props.currentPage + 1);
		});

		container.appendChild(prevBtn);
		container.appendChild(pagesContainer);
		container.appendChild(nextBtn);

		return container;
	}
}
