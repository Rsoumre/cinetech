import './favoris.css'
import { allerVers } from '../router'

export function pagFavoris(): HTMLElement {
  const section = document.createElement('div')

  const favoris = JSON.parse(localStorage.getItem('cinetech_favoris') || '[]')

  const titre = document.createElement('h2')
  titre.className = 'page-titre'
  titre.textContent = 'Mes favoris'
  section.appendChild(titre)

  if (favoris.length === 0) {
    const vide = document.createElement('p')
    vide.className = 'vide'
    vide.textContent = "Tu n'as pas encore de favoris."
    section.appendChild(vide)
    return section
  }

  const grille = document.createElement('div')
  grille.className = 'grille'

  for (const item of favoris) {
    const carte = document.createElement('div')
    carte.className = 'carte'
    carte.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="${item.titre}" />
      <p>${item.titre}</p>
    `
    carte.addEventListener('click', () => allerVers('detail', item.id, item.type))
    grille.appendChild(carte)
  }

  section.appendChild(grille)
  return section
}
