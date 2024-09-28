import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router"
import { createPinia } from "pinia"
import vuetify from "@/plugins/vuetify"
import "./style.css"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import APage from "@/pages/APage.vue"
import * as VueQrcodeReader from "vue-qrcode-reader"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .component("a-page", APage)
  .use(VueQrcodeReader)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .mount("#app")
