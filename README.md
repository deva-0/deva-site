# d3v4.site

Static blog in old-school keygen / NFO / 1337 style. Zero build step, zero
dependencies, zero frameworks — plain HTML + CSS + one vanilla JS file.

## Structure

```
index.html            home page
blog.html             post archive (BBS-style file listing)
about.html            about / contact
posts/
  _template.html      copy this to write a new post
  2026-07-09-*.html   the posts themselves
assets/
  style.css           CRT / phosphor theme
  site.js             keygen FX: wavy plasma banner,
                      keyboard nav (1/2/3), chiptune bleeper
```

## Writing a new post

1. Copy `posts/_template.html` to `posts/YYYY-MM-DD-slug.html`.
2. Replace `POST_TITLE`, `POST_DESCRIPTION`, `YYYY-MM-DD`, `TAGS`, and the
   transmission number, then write the body in plain HTML.
3. Add one `<a class="row">` line to the `filelist` in **both** `blog.html`
   (full archive) and `index.html` (latest posts — keep only the newest few).

Row format:

```html
<a class="row" href="posts/YYYY-MM-DD-slug.html"><span class="date">YYYY-MM-DD</span> │ slug.nfo ... <span class="tag">[TAG]</span></a>
```

## Previewing locally

Any static file server works, e.g.:

```
python -m http.server 8000
```

Opening the files directly in a browser also works — there are no
cross-origin requests.

## Deploying

It's just files. GitHub Pages, Netlify, Cloudflare Pages, an S3 bucket, or
`rsync` to any box running nginx:

```
rsync -av --delete ./ user@host:/var/www/d3v4.site/
```

## FX notes

- Dark (phosphor) and light (paper printout) themes. Defaults to the OS
  preference; the `[ ☼ / ☾ ]` button (bottom right) or the `t` key toggles,
  and the choice sticks via localStorage. Colors live as CSS variables in
  `assets/style.css` (`:root` = dark, `:root[data-theme="light"]` = light).
- The banner plasma-cycles its colors and each character bobs on a sine
  wave, phase-shifted per column — tune amplitude/speed in the plasma
  loop in `assets/site.js`.
- All animations respect `prefers-reduced-motion`.
- Sound is off by default; the `[ ♪ ]` button (bottom right) starts a small
  WebAudio square-wave arpeggio — no audio files involved.
