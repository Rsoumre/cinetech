import { pagAccueil } from './pages/home'
import { pagFilms } from './pages/films'
import { pagSeries } from './pages/series'
import { pagFavoris } from './pages/favoris'
import { pagDetail } from './pages/detail'

const contenu = document.createElement('main')

export function initialiserRouter(app: HTMLElement) {
  app.appendChild(contenu)
  allerVers('accueil')
}

export async function allerVers(page: string, id?: number, type?: string, numPage?: number) {
  contenu.innerHTML = ''
  window.scrollTo(0, 0)

  if (page === 'accueil') {
    contenu.appendChild(await pagAccueil())
  } else if (page === 'films') {
    contenu.appendChild(await pagFilms(numPage || 1))
  } else if (page === 'series') {
    contenu.appendChild(await pagSeries(numPage || 1))
  } else if (page === 'favoris') {
    contenu.appendChild(pagFavoris())
  } else if (page === 'detail' && id && type) {
    contenu.appendChild(await pagDetail(id, type))
  }
}
