// La clé API vient du fichier .env (variable VITE_TMDB_API_KEY)
const CLE_API = import.meta.env.VITE_TMDB_API_KEY
const URL_BASE = 'https://api.themoviedb.org/3'

export async function appelerAPI(chemin: string, page: number = 1) {

  const [route, params] = chemin.split('&')

  // On construit l'URL complète
  let url = `${URL_BASE}/${route}?api_key=${CLE_API}&language=fr-FR&page=${page}`

  // S'il y a des paramètres supplémentaires, on les ajoute
  if (params) url += `&${params}`

  const reponse = await fetch(url)
  const donnees = await reponse.json()
  return donnees
}
