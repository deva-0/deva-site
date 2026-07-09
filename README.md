# d3v4.site

Static blog in old-school keygen / NFO / 1337 style, built with
[Hugo](https://gohugo.io/). Posts are markdown; what ships is plain HTML +
CSS + one vanilla JS file. No client-side frameworks.

## Structure

```
hugo.toml               site config (params: handle, email, description)
content/
  _index.md             home page (the SYSTEM INFO box)
  about.md              about page
  blog/
    _index.md           blog archive intro (DIR LISTING box)
    hello-world.md      posts — one markdown file each
layouts/
  baseof.html           shared chrome: head, banner, tagline, nav, footer
  home.html             homepage (latest transmissions list)
  page.html             generic pages (about)
  blog/section.html     blog archive (BBS-style file listing, generated)
  blog/page.html        post layout (title, postmeta, content)
  404.html              NFO-styled not-found page
  partials/             banner art, tagline logic, file-list row
archetypes/blog.md      template used by `hugo new`
static/assets/          style.css + site.js, shipped as-is
.github/workflows/      builds and deploys to GitHub Pages on push
```

## Writing a new post

```
hugo new blog/my-post-slug.md
```

Edit the file in `content/blog/`, write markdown, set `tags` and
`transmission` in the front matter, flip `draft: true` to `false` (or
delete the line), commit, push. The blog archive, homepage list, and RSS
feed update themselves. The `[TAG]` label in listings is the first tag,
uppercased.

## Previewing locally

```
hugo server
```

Then open http://localhost:1313/. Drafts show with `hugo server -D`.

## Deploying

Push to `main` — the GitHub Actions workflow (`.github/workflows/hugo.yml`)
builds the site with Hugo and deploys it to GitHub Pages. No manual steps.

## Look & feel

- Colors are CSS variables in `static/assets/style.css`: `:root` is the
  dark phosphor theme, `:root[data-theme="light"]` the paper-printout one.
  Defaults to the OS preference; the `[ ☼ / ☾ ]` button or `t` key toggles
  and the choice sticks via localStorage.
- The banner plasma-cycles its colors and each character bobs on a sine
  wave — tune amplitude/speed in the plasma loop in `static/assets/site.js`.
  Banner art per page lives in `layouts/partials/banner.html`.
- All animations respect `prefers-reduced-motion`.
- Sound is off by default; the `[ ♪ ]` button starts a WebAudio square-wave
  arpeggio — no audio files involved.
- NFO boxes are 66 chars wide with the `│` borders column-aligned — keep
  that width when editing them.
- RSS feeds are generated automatically at `/index.xml` and `/blog/index.xml`.
