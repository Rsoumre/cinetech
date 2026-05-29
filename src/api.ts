const CLE_API = import.meta.env.VITE_TMDB_API_KEY
const URL_BASE = 'https://api.themoviedb.org/3'

export async function appelerAPI(chemin: string, page: number = 1) {
  const [route, params] = chemin.split('&')
  let url = `${URL_BASE}/${route}?api_key=${CLE_API}&language=fr-FR&page=${page}`
  if (params) url += `&${params}`
  const reponse = await fetch(url)
  const donnees = await reponse.json()
  return donnees
}
