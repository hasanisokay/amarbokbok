import { hostname } from "@/constants/hostname.mjs"

export default async function robots() {
    const host = await hostname()
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/admin',
      },
      sitemap: `${host}/sitemap.xml`,
    }
  }