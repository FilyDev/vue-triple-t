import { i18n } from './i18n'
import directives from './directives'

const el = document.head.appendChild(document.createElement('link'))
el.rel = 'stylesheet'
el.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0'

import '../assets/app.css'

const VueTripleTPlugin = {
    install(app) {
        app.use(i18n)
        app.directive('animate', directives)
    }
}

export default VueTripleTPlugin