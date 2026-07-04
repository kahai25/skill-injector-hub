# 1 — Response compression

## The bug

JSON responses go over the wire uncompressed. A 200KB list payload that gzips to 20KB means every user waits ~10× longer than they need to. AI codegen almost never sets this up.

## Fixes

### Cloudflare / Lovable hosting
Compression is applied automatically by the edge for standard content types when the client sends `Accept-Encoding: gzip, br`. Verify in the browser Network tab: response headers should include `content-encoding: br` (or `gzip`). If they don't, the response is likely being streamed with an unset `Content-Type` or explicitly marked `Cache-Control: no-transform` — remove that header.

### Self-hosted / other runtimes
Add gzip/brotli at the edge. For a Node adapter:

```ts
import compression from 'compression'
app.use(compression())
```

For manual `Response` construction in server routes, stream through `CompressionStream`:

```ts
const stream = new Response(JSON.stringify(payload)).body!
  .pipeThrough(new CompressionStream('gzip'))
return new Response(stream, {
  headers: { 'content-type': 'application/json', 'content-encoding': 'gzip' },
})
```

### Also worth doing

- Set long-lived `Cache-Control: public, max-age=31536000, immutable` on hashed static assets.
- Don't compress already-compressed formats (jpg, png, mp4, woff2).
