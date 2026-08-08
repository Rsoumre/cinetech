import './home.css'
import { appelerAPI } from '../api'
import { allerVers } from '../router'
import { creerHero } from '../components/hero'

// Promise<HTMLElement> → cette fonction est async et retourne un élément HTML une fois terminée
export async function pagAccueil(): Promise<HTMLElement> {
  const section = document.createElement('div')

  // Promise.all([...]) → lance les deux appels API EN MÊME TEMPS
  // et attend que les deux soient terminés avant de continuer
  const [filmsData, seriesData] = await Promise.all([
    appelerAPI('movie/popular'),
    appelerAPI('tv/popular'),
  ])

  const films = filmsData.results
  const series = seriesData.results

  // Hero : alterne aléatoirement entre un film et une série
  const heroEstFilm = Math.random() > 0.5
  const heroItem = heroEstFilm
    ? films[Math.floor(Math.random() * 5)]
    : series[Math.floor(Math.random() * 5)]
  section.appendChild(creerHero(heroItem, heroEstFilm ? 'film' : 'serie'))

  // Films
  const titreFilms = document.createElement('h2')
  titreFilms.className = 'page-titre'
  titreFilms.textContent = 'Films populaires'
  section.appendChild(titreFilms)

  const grilleFilms = document.createElement('div')
  grilleFilms.className = 'grille'

  for (const film of films) {
    const carte = document.createElement('div')
    carte.className = 'carte'
    carte.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${film.poster_path}" alt="${film.title}" />
      <p>${film.title}</p>
    `
    carte.addEventListener('click', () => allerVers('detail', film.id, 'film'))
    grilleFilms.appendChild(carte)
  }

  section.appendChild(grilleFilms)

  // Séries
  const titreSeries = document.createElement('h2')
  titreSeries.className = 'page-titre'
  titreSeries.textContent = 'Séries populaires'
  section.appendChild(titreSeries)

  const grilleSeries = document.createElement('div')
  grilleSeries.className = 'grille'

  for (const serie of series) {
    const carte = document.createElement('div')
    carte.className = 'carte'
    carte.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${serie.poster_path}" alt="${serie.name}" />
      <p>${serie.name}</p>
    `
    carte.addEventListener('click', () => allerVers('detail', serie.id, 'serie'))
    grilleSeries.appendChild(carte)
  }

  section.appendChild(grilleSeries)

  return section
}
