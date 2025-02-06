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

console.log(Aura)
const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{blue.50}",
      100: "{blue.100}",
      200: "{blue.200}",
      300: "{blue.300}",
      400: "{blue.400}",
      500: "{blue.500}",
      600: "{blue.600}",
      700: "{blue.700}",
      800: "{blue.800}",
      900: "{blue.900}",
      950: "{blue.950}",
    },
    colorScheme: {
      light: {},

      form: {
        field: {
          border: {
            radius: "{border.radius.xl}",
          },
          padding: {
            y: "0.75rem",
            x: "1rem",
          },
        },
      },
    },
  },
  components: {
    button: {
      colorScheme: {
        light: {
          root: {
            primary: {
              color: "{primary.500}",
              background: "#FFF",
              border: {
                color: "#FFF",
              },
              hover: {
                color: "{primary.500}",
                background: "#FFF",
                border: {
                  color: "{gray.200}",
                },
              },
              active: {
                color: "{primary.500}",
                background: "#FFF",
                border: {
                  color: "{gray.300}",
                },
              },
            },
          },
        },
      },
    },
    inputtext: {
      colorScheme: {
        light: {
          root: {
            color: "{black}",
            shadow: "none",
            border: {
              color: "{gray.100}",
            },
            focus: {
              border: {
                color: "{gray.600}",
              },
            },
            hover: {
              border: {
                color: "{gray.300}",
              },
            },
          },
        },
      },
    },

    multiselect: {
      colorScheme: {
        light: {
          root: {
            color: "{black}",
            shadow: "none",
            border: {
              color: "{gray.100}",
            },
            focus: {
              border: {
                color: "{gray.600}",
              },
            },
            hover: {
              border: {
                color: "{gray.300}",
              },
            },
          },
        },
      },
    },
    inputgroup: {
      colorScheme: {
        light: {
          addon: {
            shadow: "none",
            border: {
              color: "{gray.100}",
            },
            focus: {
              border: {
                color: "{gray.600}",
              },
            },
            hover: {
              border: {
                color: "{gray.300}",
              },
            },
          },
        },
      },
    },
    floatlabel: {
      colorScheme: {
        light: {
          root: {
            color: "{gray.300}",
            font: {
              weight: "medium",
            },
            focus: {
              color: "{gray.300}",
            },
            active: {
              color: "{gray.300}",
            },
          },
        },
      },
    },

    message: {
      content: {
        padding: "0.75rem 1rem",
      },
      border: {
        radius: "{border.radius.xl}",
      },
    },
  },
})

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
        darkModeSelector: false || "none",
      },
    },
  })
  .use(VueQrcodeReader)
  .use(VueApexCharts)
  .use(router)
  .use(pinia)
  .use(vuetify)

  .mount("#app")
