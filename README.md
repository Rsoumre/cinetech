# Cinetech

Une plateforme de streaming moderne pour découvrir et gérer des films et séries TV, construite en TypeScript vanilla avec l'API TMDB.

## Apercu

Cinetech est une SPA (Single Page Application) sans framework qui permet de parcourir des films et séries populaires, gérer ses favoris, laisser des commentaires et rechercher du contenu.

## Stack technique

- **TypeScript** — typage strict, cibles ES2023
- **Vite** — build tool et serveur de développement
- **CSS custom** — thème sombre avec variables CSS, responsive design
- **TMDB API v3** — source des données films et séries
- **localStorage** — persistance des favoris et commentaires

## Fonctionnalités

- Hero section avec sélection aléatoire quotidienne (films et séries)
- Catalogue de films et séries populaires avec pagination
- Page de détail : synopsis, casting, recommandations, vidéos, images
- Système de favoris persistant (localStorage)
- Commentaires et réponses imbriquées par contenu (localStorage)
- Recherche multi-type (films, séries, personnes)
- Router SPA côté client

## Structure du projet

```
src/
├── api/
│   ├── client.ts        # Classe APIClient (fetch)
│   └── endpoints.ts     # Définition des endpoints TMDB
├── pages/
│   ├── home.page.ts     # Page d'accueil + hero
│   ├── movies.page.ts   # Catalogue films
│   ├── series.page.ts   # Catalogue séries
│   ├── detail.page.ts   # Détail film/série
│   └── favorites.page.ts
├── components/
│   ├── navbar.component.ts
│   ├── card.component.ts
│   ├── comment.component.ts
│   └── pagination.component.ts
├── services/
│   ├── movie.service.ts
│   ├── tv.service.ts
│   ├── favorite.service.ts
│   ├── comment.service.ts
│   └── search.service.ts
├── models/              # Interfaces TypeScript
├── store/               # État global (AppState)
├── router.ts            # Routeur SPA
├── main.ts              # Point d'entrée
└── style.css            # Styles globaux
```

|----

## Installation

```bash
# Cloner le dépôt
git clone <repo-url>
cd cinetech

# Installer les dépendances
npm install
```

## Configuration

Créer un fichier `.env` à la racine :

```env
VITE_TMDB_API_KEY=votre_clé_api_tmdb
```

Obtenir une clé API sur [themoviedb.org](https://www.themoviedb.org/settings/api).

## Scripts

```bash
npm run dev       # Serveur de développement
npm run build     # Build de production (tsc + vite build)
npm run preview   # Prévisualiser le build de production
```

## API utilisée

**The Movie Database (TMDB) API v3**

| Endpoint | Description |
|---|---|
| `movie/popular` | Films populaires (paginé) |
| `tv/popular` | Séries populaires (paginé) |
| `movie/{id}` | Détail film + crédits, recommandations |
| `tv/{id}` | Détail série + crédits, recommandations |
| `search/multi` | Recherche multi-type |

## Persistance locale

| Clé localStorage | Contenu |
|---|---|
| `cinetech_favorites` | Favoris de l'utilisateur |
| `cinetech_comments` | Commentaires et réponses par média |
| `cinetech_hero_*` | Index hero du jour (sélection quotidienne) |
