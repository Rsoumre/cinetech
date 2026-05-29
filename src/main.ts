import './style.css'
import { creerNavbar } from './components/navbar'
import { initialiserRouter } from './router'

// On récupère la div #app dans le HTML

const app = document.getElementById('app') as HTMLElement

app.appendChild(creerNavbar())

initialiserRouter(app)