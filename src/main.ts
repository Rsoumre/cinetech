import "./style.css";
import { Router } from "./router";

document.addEventListener("DOMContentLoaded", () => {
	const app = document.querySelector<HTMLDivElement>("#app");

	if (!app) {
		console.error("App container not found");
		return;
	}

	const router = new Router(app);
	router.navigate("home");
});
