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
  runtimeConfig: {
    adminEmail: process.env.NUXT_ADMIN_EMAIL,
    public: {
      // OSS_ACCESS_KEY_SECRET: process.env.OSS_ACCESS_KEY_SECRET,
      // OSS_ACCESS_KEY_ID: process.env.OSS_ACCESS_KEY_ID,
      // OSS_REGION: process.env.OSS_REGION,
      // OSS_BUCKET: process.env.OSS_BUCKET,
      cosSecretID: process.env.COS_SECRET_ID,
      cosSecretKey: process.env.COS_SECRET_KEY,
      cosRegion: process.env.COS_REGION,
      cosBucket: process.env.COS_BUCKET,
    },
  },
});
