// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: true,
  srcDir: "src/",
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "shadcn-nuxt",
    "@nuxt/image",
    "nuxt-nodemailer",
    "@nuxt/scripts",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./src/components/ui",
  },
  nodemailer: {
    from: "Boooks系统 <2969709268@qq.com>",
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
      user: "2969709268@qq.com",
      pass: "",
    },
  },
  scripts: {
    registry: {
      googleAnalytics: true,
    },
  },
  runtimeConfig: {
    adminEmail: process.env.NUXT_ADMIN_EMAIL,
    public: {
      cosSecretID: process.env.COS_SECRET_ID,
      cosSecretKey: process.env.COS_SECRET_KEY,
      cosRegion: process.env.COS_REGION,
      cosBucket: process.env.COS_BUCKET,
      scripts: {
        googleAnalytics: {
          // .env
          // NUXT_PUBLIC_SCRIPTS_GOOGLE_ANALYTICS_ID=<your-id>
          id: "",
        },
      },
    },
  },
  app: {
    head: {
      title: "Boooks - HEU15系资源导航",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/img/boooks.svg" }],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "一个专注于哈尔滨工程大学核专业的资源导航网站",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
    },
  },
});
