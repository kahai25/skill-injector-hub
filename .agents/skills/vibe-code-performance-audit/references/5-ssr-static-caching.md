# 5 — Prerender & CDN-cache logged-out pages

## The bug

Marketing pages (`/`, `/pricing`, `/about`, `/blog/*`) render server-side per visitor. The HTML is identical for everyone yet the server burns CPU rebuilding it every request. This is both slow and expensive.

## Fix — TanStack Start prerendering

Prerender static routes at build time:

```ts
// vite.config.ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        routes: ['/', '/pricing', '/about'],
      },
    }),
  ],
})
```

Prerendered routes ship as static HTML with a long-cache header — the CDN serves them without ever hitting your server.

## Fix — Cache-Control for dynamic-but-cacheable routes

For routes that are dynamic per visitor but stable for a while (public product pages, blog posts fetched from a CMS), set stale-while-revalidate:

```ts
export const Route = createFileRoute('/blog/$slug')({
  head: () => ({ meta: [...] }),
  loader: async ({ params }) => {
    const post = await getPost(params.slug)
    return post
  },
})

// In the server response for the route:
headers: {
  'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400',
}
```

The CDN serves cached HTML for 5 minutes, then serves stale content while it refreshes in the background — visitors never wait on your origin.

## Fix — TanStack Query staleTime for authenticated pages

Even inside the app, prevent unnecessary refetches:

```ts
new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,      // fresh for 60s
      gcTime: 5 * 60_000,     // keep in cache for 5min after unmount
      refetchOnWindowFocus: false,
    },
  },
})
```

## What to prerender vs render dynamically

| Route type | Strategy |
| --- | --- |
| Landing, pricing, about, docs | Prerender at build time |
| Blog / CMS content | SSR + `cache-control: s-maxage=300, stale-while-revalidate` |
| Logged-in dashboard | SSR, no cache, use TanStack Query on the client |
| User-specific data (`/orders/123`) | SSR, no cache, RLS-scoped |
