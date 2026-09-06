# Portfolio-Website — setup

Vite + React + Tailwind v4, deployed to Vercel from GitHub.

## 1. Create the project

```bash
npm create vite@latest portfolio-website -- --template react
cd portfolio-website
npm install
npm install tailwindcss @tailwindcss/vite
```

## 2. Wire up Tailwind

`vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Replace the whole contents of `src/index.css` with:

```css
@import "tailwindcss";

@theme {
  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", "Inter", sans-serif;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

Make sure `src/main.jsx` imports it (`import "./index.css";`) — the Vite template already does.

Add the fonts to `index.html`, inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@500;600&display=swap"
  rel="stylesheet"
/>
```

While you're in `index.html`, set the title and description:

```html
<title>Jenna-Marie Smith — 3D Groom & Prop Artist</title>
<meta name="description" content="Real-time hair grooming, production assets, and engine-ready pipelines." />
```

## 3. Drop in the component and media

- Replace `src/App.jsx` with the file provided.
- Delete `src/App.css` and its import if the template left one behind.
- Create the media folders under `public/` so the paths from `details.txt` resolve:

```
public/
  media/
    grooms/
      hair_groom_preview.mp4
      lit_render.jpg
      clay_pass.jpg
      wireframe.jpg
    props/
      stylized_fungi.jpg
      beetle_vehicle.jpg
      panther_gauntlet.jpg
      golden_armor.jpg
    environments/
      london_cafe.jpg
      london_street.jpg
```

Anything not yet in place renders as a labelled slot showing the expected path, so the layout stays intact while you fill the gallery.

```bash
npm run dev
```

## 4. Deploy

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/Portfolio-Website.git
git push -u origin main
```

On Vercel: **Add New → Project**, import `Portfolio-Website`. It detects Vite — framework Vite, build `npm run build`, output `dist`. Deploy.

## Tailwind v3 instead

If you're on v3, skip the Vite plugin, run `npx tailwindcss init -p`, set `content: ["./index.html", "./src/**/*.{js,jsx}"]`, use the three `@tailwind` directives in `index.css`, and move the two font variables into `theme.extend.fontFamily` as `body` and `display`.

## Editing content

All copy and projects live in the `profile` and `projects` objects at the top of `App.jsx`. A new project needs `id`, `category` (`grooms` or `props`), `title`, `description`, `tags`, `cover`, `ratio`, and `breakdown`. Filter counts, the grid, and modal navigation all follow from that array — nothing else to touch.

Set `ratio` to the real aspect of the image (`"3 / 4"`, `"16 / 9"`, `"1 / 1"`); it's what keeps the masonry columns from reflowing as images load.
