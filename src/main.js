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
import PrimeVue from "primevue/config"
import Aura from "@primevue/themes/aura"
import { definePreset } from "@primevue/themes"
import { FocusTrap } from "primevue"
import appTheme from "@/utils/appTheme.js"

console.log(Aura)
const Noir = definePreset(Aura, appTheme)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .directive("press", vPress)
  .directive("mask", vMask)
  .directive("autofocus", vAutofocus)
  .directive("focustrap", FocusTrap)
  .component("a-page", APage)
  .use(PrimeVue, {
    theme: {
      preset: Noir,
      options: {
        darkModeSelector: ".dark",
      },
    },
  })
  .use(VueQrcodeReader)
  .use(VueApexCharts)
  .use(router)
  .use(pinia)
  .use(vuetify)

  .mount("#app")
