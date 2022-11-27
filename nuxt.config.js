export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  server: {
    // port: 3007
    // host: "192.168.3.26",
  },

  // router: {
  //   middleware: ['auth']
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "app-order",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/customStyle.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/axios.js",
    {src: "~/plugins/jspdf.js"},
    "~/plugins/lottie-vue-player.client.js",
    {
      src: "~/plugins/Vuelidate.js",
      mode: "all",
    },
  ],

  axios: {
    baseURL: "https://api.teebalhoor.net/public",
    credentials: true,
    changeOrigin: true,
    common: {
      Accept: "application/json",
    },
  },


  auth: {
    // Options
    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: "https://api.teebalhoor.net/public",
        endpoints: {
          login: {
            url: "/api/login",
          },
          logout: {
            url: "/api/logout",
          },
        },
      },
    },
    redirect: {
      home: "/",
      login: "/signin",
      logout: "/signin",
    },
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [

  ],

  // script: [
  //   {
  //     src: "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js",
  //   }
  // ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/pwa",
    "bootstrap-vue/nuxt",
    '@nuxtjs/auth-next'
  ],
  pwa: {
    meta: {
      title: "Order App",
      author: "Haji Rohullah & Mohsen",
    },
    manifest: {
      name: "Smart Friqi Order App",
      short_name: "SmartFriqi App",
      lang: "en",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
