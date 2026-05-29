# Cinetech

Une plateforme pour découvrir des films et séries TV, construite en TypeScript vanilla avec l'API TMDB.

## Aperçu

Cinetech est une SPA (Single Page Application) sans framework qui permet de parcourir des films et séries populaires, gérer ses favoris et laisser des commentaires.

## Stack technique

- **TypeScript** — typage du code
- **Vite** — serveur de développement et build
- **CSS custom** — thème sombre, responsive design
- **TMDB API v3** — source des données films et séries
- **localStorage** — persistance des favoris et commentaires

## Fonctionnalités

- Page d'accueil avec films et séries populaires
- Catalogue films avec pagination
- Catalogue séries avec pagination
- Page de détail : synopsis, note, réalisateur/créateur, similaires
- Système de favoris (localStorage)
- Commentaires par contenu (localStorage)
- Barre de recherche avec suggestions en temps réel
- Router SPA côté client

## Structure du projet

```
src/
├── api.ts                    # Appels vers l'API TMDB
├── router.ts                 # Routeur SPA (allerVers)
├── main.ts                   # Point d'entrée
├── style.css                 # Styles globaux
├── pages/
│   ├── home.ts               # Page d'accueil
│   ├── films.ts              # Catalogue films
│   ├── series.ts             # Catalogue séries
│   ├── detail.ts             # Page de détail film/série
│   └── favoris.ts            # Page favoris
└── components/
    ├── navbar.ts             # Barre de navigation + recherche
    └── commentaires.ts       # Système de commentaires
```

## Installation

```bash
git clone <repo-url>
cd cinetech
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
npm run build     # Build de production
npm run preview   # Prévisualiser le build
```

## API utilisée

**The Movie Database (TMDB) API v3**

| Endpoint | Description |
|---|---|
| `movie/popular` | Films populaires (paginé) |
| `tv/popular` | Séries populaires (paginé) |
| `movie/{id}` | Détail d'un film |
| `tv/{id}` | Détail d'une série |
| `movie/{id}/credits` | Réalisateur du film |
| `movie/{id}/recommendations` | Films similaires |
| `tv/{id}/recommendations` | Séries similaires |
| `search/multi` | Recherche films + séries |

## Persistance locale

| Clé localStorage | Contenu |
|---|---|
| `cinetech_favoris` | Favoris de l'utilisateur |
| `cinetech_commentaires` | Commentaires par film/série |
