import './navbar.css'
import { allerVers } from '../router'
import { appelerAPI } from '../api'

export function creerNavbar(): HTMLElement {
  const nav = document.createElement('nav')
  nav.className = 'navbar'
  nav.innerHTML = `
    <span class="navbar-logo">Cinetech</span>
    <button data-page="accueil">Accueil</button>
    <button data-page="films">Films</button>
    <button data-page="series">Séries</button>
    <button data-page="favoris">Favoris</button>
    <div class="recherche-wrapper">
      <input class="recherche-input" type="text" placeholder="Rechercher..." />
      <div class="suggestions" style="display:none"></div>
    </div>
  `

  nav.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => allerVers(btn.dataset.page as string))
  })

  const input = nav.querySelector('.recherche-input') as HTMLInputElement
  const suggestions = nav.querySelector('.suggestions') as HTMLElement

  // number → setTimeout retourne juste un numéro d'identifiant
  let timer: number

  input.addEventListener('input', () => {
    clearTimeout(timer)
    const texte = input.value.trim()
    if (texte.length < 2) { suggestions.style.display = 'none'; return }

    timer = setTimeout(async () => {
      const donnees = await appelerAPI(`search/multi&query=${encodeURIComponent(texte)}`)
      const resultats = (donnees.results || []).filter((i: any) => i.media_type === 'movie' || i.media_type === 'tv').slice(0, 6)

      suggestions.innerHTML = resultats.map((item: any) => {
        const titre = item.media_type === 'movie' ? item.title : item.name
        const poster = item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : 'https://via.placeholder.com/36x54?text=?'
        return `<div class="suggestion-item" data-id="${item.id}" data-type="${item.media_type === 'movie' ? 'film' : 'serie'}">
          <img src="${poster}" alt="${titre}" />
          <span>${titre}</span>
        </div>`
      }).join('')

      suggestions.querySelectorAll('.suggestion-item').forEach(el => {
        const element = el as HTMLElement
        element.addEventListener('click', () => {
          suggestions.style.display = 'none'
          input.value = ''
          allerVers('detail', Number(element.dataset.id), element.dataset.type as string)
        })
      })

      suggestions.style.display = 'block'
    }, 400)
  })

  return nav
}
