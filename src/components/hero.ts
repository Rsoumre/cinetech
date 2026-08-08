import './hero.css'
import { allerVers } from '../router'

export function creerHero(item: any, type: 'film' | 'serie'): HTMLElement {
  const titre  = type === 'film' ? item.title : item.name
  const note   = item.vote_average ? item.vote_average.toFixed(1) : null
  const annee  = (item.release_date || item.first_air_date || '').slice(0, 4)
  const resume = item.overview
    ? item.overview.length > 220 ? item.overview.slice(0, 220) + '…' : item.overview
    : ''

  const backdrop = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : ''

  const hero = document.createElement('div')
  hero.className = 'hero'
  if (backdrop) hero.style.backgroundImage = `url(${backdrop})`

  hero.innerHTML = `
    <div class="hero-overlay"></div>
    <div class="hero-contenu">
      <span class="hero-badge">${type === 'film' ? 'Film' : 'Série'}</span>
      <h1 class="hero-titre">${titre}</h1>
      <div class="hero-meta">
        ${note ? `<span class="hero-note">⭐ ${note}</span>` : ''}
        ${annee ? `<span>${annee}</span>` : ''}
      </div>
      ${resume ? `<p class="hero-synopsis">${resume}</p>` : ''}
      <div class="hero-actions">
        <button class="hero-btn-primary">▶ Voir le détail</button>
      </div>
    </div>
  `

  hero.querySelector('.hero-btn-primary')!
    .addEventListener('click', () => allerVers('detail', item.id, type === 'film' ? 'film' : 'serie'))

  return hero
}
