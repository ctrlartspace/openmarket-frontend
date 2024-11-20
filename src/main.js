import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router"
import { createPinia } from "pinia"
import vuetify from "@/plugins/vuetify"
import "./style.css"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import APage from "@/pages/APage.vue"
import * as VueQrcodeReader from "vue-qrcode-reader"
import vPress from "./directives/v-press"
import vMask from "./directives/v-mask"
import vAutofocus from "./directives/v-autofocus"
import VueApexCharts from "vue3-apexcharts"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .directive("press", vPress)
  .directive("mask", vMask)
  .directive("autofocus", vAutofocus)
  .component("a-page", APage)
  .use(VueQrcodeReader)
  .use(VueApexCharts)
  .use(router)
  .use(pinia)
  .use(vuetify)

  .mount("#app")
