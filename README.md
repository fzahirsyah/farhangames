# farhangames

Front-end for `farhangames.site` on Cloudflare Pages.

## Structure

- `public/index.html` - Vanilla HTML page with Tailwind CSS (CDN)
- `public/assets/js/app.js` - AppScript iframe navigation logic
- `public/assets/css/` - Reserved for future CSS assets
- `public/assets/images/` - Reserved for future image assets

## Setup

1. Deploy the `public/` directory to Cloudflare Pages.
2. Edit `public/assets/js/app.js` and replace `YOUR-APPSCRIPT-DEPLOYMENT-ID-*` with your Google Apps Script deployment IDs.
3. The iframe uses `strict-origin-when-cross-origin` to balance compatibility and referrer privacy.
