import DefaultTheme from 'vitepress/theme'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(fas)

import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer
} from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

import '../../../src/styles/index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-preview', ElementPlusContainer)
  }
}
