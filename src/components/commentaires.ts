import './commentaires.css'

const CLE_STORAGE = 'cinetech_commentaires'

function getCles(id: number, type: string) {
  return `${type}_${id}`
}

function lireCommentaires(id: number, type: string) {
  const tous = JSON.parse(localStorage.getItem(CLE_STORAGE) || '{}')
  return tous[getCles(id, type)] || []
}

// commentaires: any[] → un tableau (array) d'éléments de n'importe quel type
// "any" veut dire "peu importe le type" — ici chaque commentaire est un objet { auteur, texte }
function sauvegarderCommentaires(id: number, type: string, commentaires: any[]) {
  const tous = JSON.parse(localStorage.getItem(CLE_STORAGE) || '{}')
  tous[getCles(id, type)] = commentaires
  localStorage.setItem(CLE_STORAGE, JSON.stringify(tous))
}

export function creerCommentaires(
  id: number,
  type: string,
  onAjouter: () => void
): HTMLElement {
  const section = document.createElement('div')
  section.className = 'commentaires'

  const titre = document.createElement('h3')
  titre.textContent = 'Commentaires'
  section.appendChild(titre)

  // Formulaire pour écrire un commentaire
  const formulaire = document.createElement('div')
  formulaire.className = 'formulaire-commentaire'

  const inputAuteur = document.createElement('input')
  inputAuteur.placeholder = 'Ton pseudo'
  inputAuteur.type = 'text'

  const inputTexte = document.createElement('textarea')
  inputTexte.placeholder = 'Ton commentaire...'

  const btnEnvoyer = document.createElement('button')
  btnEnvoyer.textContent = 'Envoyer'

  btnEnvoyer.addEventListener('click', () => {
    const auteur = inputAuteur.value.trim()
    const texte = inputTexte.value.trim()
    if (!auteur || !texte) return

    const commentaires = lireCommentaires(id, type)
    commentaires.push({ auteur, texte })
    sauvegarderCommentaires(id, type, commentaires)
    onAjouter()
  })

  formulaire.appendChild(inputAuteur)
  formulaire.appendChild(inputTexte)
  formulaire.appendChild(btnEnvoyer)
  section.appendChild(formulaire)

  // Afficher les commentaires
  const commentaires = lireCommentaires(id, type)
  for (const c of commentaires) {
    const carte = document.createElement('div')
    carte.className = 'commentaire'

    const auteurEl = document.createElement('p')
    auteurEl.className = 'commentaire-auteur'
    auteurEl.textContent = c.auteur

    const texteEl = document.createElement('p')
    texteEl.className = 'commentaire-texte'
    texteEl.textContent = c.texte

    carte.appendChild(auteurEl)
    carte.appendChild(texteEl)
    section.appendChild(carte)
  }

  return section
}
