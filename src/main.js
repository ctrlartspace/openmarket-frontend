import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router"
import { createPinia } from "pinia"
import vuetify from "@/plugins/vuetify"
import "./style.css"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import APage from "@/pages/APage.vue"
import PageHeader from "@/components/page/PageHeader.vue"
import PageContent from "@/components/page/PageContent.vue"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .component("a-page", APage)
  .component("page-header", PageHeader)
  .component("page-content", PageContent)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .mount("#app")
