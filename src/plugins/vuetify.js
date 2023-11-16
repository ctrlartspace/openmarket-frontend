import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { aliases, mdi } from "vuetify/iconsets/mdi"
import "@mdi/font/css/materialdesignicons.css"
import "@/style.scss"

const baseTheme = {
  dark: false,
  colors: {
    success: "#45c483",
  },
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  defaults: {
    global: {
      ripple: false,
    },
    VCard: {
      elevation: 0,
    },
    VTextField: {
      density: "compact",
      variant: "outlined",
    },
    VSelect: {
      density: "compact",
      variant: "outlined",
    },
    VList: {
      density: "compact",
    },
  },
  theme: {
    defaultTheme: "baseTheme",
    themes: {
      baseTheme,
    },
  },
})

export default vuetify
