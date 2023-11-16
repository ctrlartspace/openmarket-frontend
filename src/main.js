import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router"
import { createPinia } from "pinia"
import vuetify from "@/plugins/vuetify"
import "./style.css"

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(vuetify).mount("#app")
