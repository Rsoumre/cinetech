import './detail.css'
import { appelerAPI } from '../api'
import { allerVers } from '../router'
import { creerCommentaires } from '../components/commentaires'

function estFavori(id: number, type: string): boolean {
  const favoris = JSON.parse(localStorage.getItem('cinetech_favoris') || '[]')
  return favoris.some((f: any) => f.id === id && f.type === type)
}

function ajouterFavori(id: number, type: string, titre: string, poster_path: string) {
  const favoris = JSON.parse(localStorage.getItem('cinetech_favoris') || '[]')
  favoris.push({ id, type, titre, poster_path })
  localStorage.setItem('cinetech_favoris', JSON.stringify(favoris))
}

function retirerFavori(id: number, type: string) {
  const favoris = JSON.parse(localStorage.getItem('cinetech_favoris') || '[]')
  const nouveau = favoris.filter((f: any) => !(f.id === id && f.type === type))
  localStorage.setItem('cinetech_favoris', JSON.stringify(nouveau))
}

export async function pagDetail(id: number, type: string): Promise<HTMLElement> {
  const page = document.createElement('div')
  page.className = 'detail'

  const chemin = type === 'film' ? `movie/${id}` : `tv/${id}`
  const cheminSimilaires = type === 'film' ? `movie/${id}/recommendations` : `tv/${id}/recommendations`

  // On fait les appels en même temps pour aller plus vite
  const [donnees, similairesData] = await Promise.all([
    appelerAPI(chemin),
    appelerAPI(cheminSimilaires),
  ])

  const titre = type === 'film' ? donnees.title : donnees.name
  const note = Number(donnees.vote_average).toFixed(1)
  const synopsis = donnees.overview || 'Aucun synopsis disponible.'
  const poster = donnees.poster_path
    ? `https://image.tmdb.org/t/p/w300${donnees.poster_path}`
    : ''

  // Réalisateur pour les films, créateur pour les séries
  let realisateur = null
  if (type === 'film') {
    const credits = await appelerAPI(`movie/${id}/credits`)
    realisateur = (credits.crew || []).find((p: any) => p.job === 'Director')?.name || 'Inconnu'
  } else {
    realisateur = (donnees.created_by || []).map((p: any) => p.name).join(', ') || null
  }

  // --- Header ---
  const header = document.createElement('div')
  header.className = 'detail-header'

  const img = document.createElement('img')
  img.className = 'detail-poster'
  img.src = poster
  img.alt = titre

  const info = document.createElement('div')
  info.className = 'detail-info'

  const titreEl = document.createElement('h1')
  titreEl.className = 'detail-titre'
  titreEl.textContent = titre

  const noteEl = document.createElement('p')
  noteEl.className = 'detail-note'
  noteEl.textContent = `⭐ ${note} / 10`

  const synopsisEl = document.createElement('p')
  synopsisEl.className = 'detail-synopsis'
  synopsisEl.textContent = synopsis

  const btnFavori = document.createElement('button')
  btnFavori.className = 'btn-favori'
  btnFavori.textContent = estFavori(id, type) ? '❤️ Retirer des favoris' : '🤍 Ajouter aux favoris'

  btnFavori.addEventListener('click', () => {
    if (estFavori(id, type)) {
      retirerFavori(id, type)
      btnFavori.textContent = '🤍 Ajouter aux favoris'
    } else {
      ajouterFavori(id, type, titre, donnees.poster_path)
      btnFavori.textContent = '❤️ Retirer des favoris'
    }
  })

  info.appendChild(titreEl)
  info.appendChild(noteEl)
  if (realisateur) {
    const metaEl = document.createElement('p')
    metaEl.className = 'detail-meta'
    metaEl.textContent = `🎥 ${type === 'film' ? 'Réalisateur' : 'Créateur'} : ${realisateur}`
    info.appendChild(metaEl)
  }
  info.appendChild(synopsisEl)
  info.appendChild(btnFavori)

  header.appendChild(img)
  header.appendChild(info)
  page.appendChild(header)

  // --- Similaires ---
  const listeSimilaires = (similairesData.results || []).slice(0, 8)
  if (listeSimilaires.length > 0) {
    const section = document.createElement('div')
    section.className = 'detail-similaires'

    const sousTitre = document.createElement('h3')
    sousTitre.textContent = 'Similaires'
    section.appendChild(sousTitre)

    const grille = document.createElement('div')
    grille.className = 'grille'

    for (const item of listeSimilaires) {
      const titreSimilaire = type === 'film' ? item.title : item.name
      const carte = document.createElement('div')
      carte.className = 'carte'
      carte.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="${titreSimilaire}" />
        <p>${titreSimilaire}</p>
      `
      carte.addEventListener('click', () => allerVers('detail', item.id, type))
      grille.appendChild(carte)
    }

    section.appendChild(grille)
    page.appendChild(section)
  }

  // --- Commentaires ---
  const sectionCommentaires = creerCommentaires(id, type, () => {
    allerVers('detail', id, type)
  })
  page.appendChild(sectionCommentaires)

  return page
}
