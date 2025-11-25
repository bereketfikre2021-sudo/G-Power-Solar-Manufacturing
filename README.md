# GreenPower Ethiopia — Static Landing Page



## Files

- `index.html` — main landing page

- `assets/css/styles.css` — styles

- `assets/js/main.js` — small JS for UI & form

- `manifest.webmanifest`, `robots.txt`, `sitemap.xml`

## Quick setup

1. Replace placeholders in `index.html`:

   - `https://example.com` → your real domain

   - Phone `+251 9XX XXX XXX`

   - Email `info@example.com`

   - Update Organization JSON-LD with real phone/email and sameAs links.

2. Replace lead form action:

   - For **Formspree**: sign up, get form endpoint, replace the `action` attribute in the `<form>` with your Formspree URL.

   - For **Netlify Forms**: remove `action`, add `data-netlify="true"` to `<form>` and ensure site is deployed to Netlify.

   - For custom API: replace `action` with your endpoint URL returning 200 on success.

3. Replace placeholder images in `/assets/img/` or update `<img>` src where data URIs are used.

4. Maps: replace the `<iframe>` `src` with a Google Maps Embed with your place ID or use the Maps Embed API with an API key.

5. Add Google Analytics / GA4:

   - Place the GA4 snippet in the `<head>` and replace `G-XXXXXXXXXX` with your measurement id.

## Deploy

- **Netlify**: drag & drop the site folder or connect a GitHub repo. Netlify offers HTTPS by default.

- **Vercel**: connect repo and deploy (static).

- **GitHub Pages**: push to `gh-pages` branch or enable Pages in repo settings.

## Google Ads & Landing Page Tips

- Maintain single clear CTA above the fold.

- Keep content concise; match ad headline to hero headline.

- Optimize images (WebP), enable lazy-loading, and keep JS minimal.

- Use HTTPS and fast hosting (Netlify/Vercel).

- Add Google Ads conversion tracking (via GTM or GA4).

## Accessibility & Performance

- All images use `loading="lazy"`.

- Simple semantic HTML for screen readers.

- Test with Lighthouse and aim for 90+ performance for ads.

