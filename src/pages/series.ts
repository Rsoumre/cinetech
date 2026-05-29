import './series.css'
import { appelerAPI } from '../api'
import { allerVers } from '../router'

// Promise<HTMLElement> → cette fonction est async et retourne un élément HTML une fois terminée
export async function pagSeries(page: number = 1): Promise<HTMLElement> {
  const section = document.createElement('div')

  const donnees = await appelerAPI('tv/popular', page)
  const series = donnees.results
  const totalPages = donnees.total_pages

  const titre = document.createElement('h2')
  titre.className = 'page-titre'
  titre.textContent = 'Séries populaires'
  section.appendChild(titre)

  const grille = document.createElement('div')
  grille.className = 'grille'

  for (const serie of series) {
    const carte = document.createElement('div')
    carte.className = 'carte'
    carte.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${serie.poster_path}" alt="${serie.name}" />
      <p>${serie.name}</p>
    `
    carte.addEventListener('click', () => allerVers('detail', serie.id, 'serie'))
    grille.appendChild(carte)
  }

  section.appendChild(grille)

  // Pagination
  const pagination = document.createElement('div')
  pagination.className = 'pagination'

  const btnPrecedent = document.createElement('button')
  btnPrecedent.textContent = '← Précédent'
  btnPrecedent.disabled = page === 1
  // undefined → on ne donne pas d'id ni de type (pas utile ici), mais on doit quand même les mettre
  // parce que numPage est le 4ème paramètre de allerVers
  btnPrecedent.addEventListener('click', () => allerVers('series', undefined, undefined, page - 1))

  const info = document.createElement('span')
  info.textContent = `Page ${page} / ${totalPages}`

  const btnSuivant = document.createElement('button')
  btnSuivant.textContent = 'Suivant →'
  btnSuivant.disabled = page === totalPages
  btnSuivant.addEventListener('click', () => allerVers('series', undefined, undefined, page + 1))

  pagination.appendChild(btnPrecedent)
  pagination.appendChild(info)
  pagination.appendChild(btnSuivant)
  section.appendChild(pagination)

  return section
}
