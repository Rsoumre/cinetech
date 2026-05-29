import './films.css'
import { appelerAPI } from '../api'
import { allerVers } from '../router'

export async function pagFilms(page: number = 1): Promise<HTMLElement> {
  const section = document.createElement('div')

  const donnees = await appelerAPI('movie/popular', page)
  const films = donnees.results
  const totalPages = donnees.total_pages

  const titre = document.createElement('h2')
  titre.className = 'page-titre'
  titre.textContent = 'Films populaires'
  section.appendChild(titre)

  const grille = document.createElement('div')
  grille.className = 'grille'

  for (const film of films) {
    const carte = document.createElement('div')
    carte.className = 'carte'
    carte.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${film.poster_path}" alt="${film.title}" />
      <p>${film.title}</p>
    `
    carte.addEventListener('click', () => allerVers('detail', film.id, 'film'))
    grille.appendChild(carte)
  }

  section.appendChild(grille)

  // Pagination
  const pagination = document.createElement('div')
  pagination.className = 'pagination'

  const btnPrecedent = document.createElement('button')
  btnPrecedent.textContent = '← Précédent'
  btnPrecedent.disabled = page === 1
  btnPrecedent.addEventListener('click', () => allerVers('films', undefined, undefined, page - 1))

  const info = document.createElement('span')
  info.textContent = `Page ${page} / ${totalPages}`

  const btnSuivant = document.createElement('button')
  btnSuivant.textContent = 'Suivant →'
  btnSuivant.disabled = page === totalPages
  btnSuivant.addEventListener('click', () => allerVers('films', undefined, undefined, page + 1))

  pagination.appendChild(btnPrecedent)
  pagination.appendChild(info)
  pagination.appendChild(btnSuivant)
  section.appendChild(pagination)

  return section
}
