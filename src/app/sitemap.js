import { hostname } from "@/constants/hostname.mjs";
import getBlogs from "@/utils/getBlogs.mjs";
import getCategories from "@/utils/getCategories.mjs";

export const revalidate = 60 * 60 * 60 * 24 * 7;

export default async function sitemap() {
  const host = await hostname();
  const blogIds = await getBlogs("", 1, 100000, "newest", "", "", true);
  const categories = await getCategories(false);
  return [
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${host}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${host}/categories`,
      lastModified: "2024-09-01T11:14:10+06:00",
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${host}/about`,
      lastModified: "2024-09-01T11:14:10+06:00",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${host}/contact`,
      lastModified: "2024-09-01T11:14:10+06:00",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${host}/opinions`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${host}/opinions/share`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${host}/others`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${host}/others/video`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${host}/others/pdf`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${host}/others/image`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${host}/search`,
      lastModified: "2024-09-01T11:14:10+06:00",
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...blogIds?.map((item) => ({
      url: `${host}/blogs/${item.blog_id}`,
      lastModified: item?.addedOn,
      // lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    
    ...categories?.map((item) => ({
      url: `${host}/blogs/categories/${item}`,
      lastModified: "2024-09-01T11:14:10+06:00",
      changeFrequency: "monthly",
      priority: 0.4,
    })),

  ];
}
