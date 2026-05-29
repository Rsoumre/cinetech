import './style.css'
import { creerNavbar } from './components/navbar'
import { initialiserRouter } from './router'

const app = document.querySelector<HTMLDivElement>('#app')!

app.appendChild(creerNavbar())
initialiserRouter(app)
