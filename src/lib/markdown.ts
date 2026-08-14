import MarkdownIt from "markdown-it";

/**
 * Raw HTML is disabled at the parser level (`html: false`), so submitted or
 * fetched markdown can never inject markup — no post-hoc sanitizer needed.
 */
const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: false,
  typographer: false,
});

const SAFE_PROTOCOLS = ["http:", "https:", "mailto:"];

function isSafeHref(href: string): boolean {
  if (href.startsWith("#")) return true;
  try {
    const url = new URL(href, "https://example.invalid");
    return SAFE_PROTOCOLS.includes(url.protocol);
  } catch {
    return false;
  }
}

const defaultLinkOpen =
  md.renderer.rules.link_open ??
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const href = String(token.attrGet("href") ?? "");

  if (!isSafeHref(href)) {
    token.attrSet("href", "#");
    token.attrSet("aria-disabled", "true");
  } else if (/^https?:/i.test(href)) {
    token.attrSet("target", "_blank");
    token.attrSet("rel", "nofollow noopener noreferrer ugc");
  }

  return defaultLinkOpen(tokens, idx, options, env, self);
};

/** Render trusted-or-untrusted markdown to HTML with raw HTML disabled. */
export function renderMarkdown(source: string): string {
  return md.render(source);
}
