// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: [
    '@nuxt/ui',
    '@hebilicious/authjs-nuxt',
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
  ],

  alias: {
    cookie: 'cookie',
  },
  imports: {
    dirs: ['./types'],
  },
  nitro: {
    entry: './preset/entry.dev.ts',
    imports: {
      dirs: ['./types'],
      // 'imports':[{name: '*', as:'Bun', from: 'bun', type: true, 'typeFrom': 'bun-types'}]
    },
  },

  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET, // You can generate one with `openssl rand -base64 32`
    },
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    },

    google: {
      clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
    },

    public: {
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request
      },
    },
  },
})
