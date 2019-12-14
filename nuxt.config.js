
module.exports = {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  server: {
    port: 9101,
    host: '0.0.0.0'
  },
  srcDir: 'src/',
  router: {
    routeNameSplitter: '/'
  },
  loading: { color: '#fff' },
  css: [
    'view-design/dist/styles/iview.css',
    '~/assets/css/app.css'
  ],
  plugins: [
    { src: '@/plugins/iview' },
    { src: '@/plugins/component' },
    { src: '@/plugins/svg-icon' },
    { src: '@/plugins/vuejs-avataaars' },
    { src: '@/plugins/animate' },
    { src: '@/plugins/axios' }
  ],
  buildModules: [
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    prefix: '/api',
    retry: { retries: 2 }
  },
  build: {
    extend (config, ctx) {
    }
  },
  env: {
    qq: '1067357662',
    weChat: 'xiaocry1314'
  }
}
