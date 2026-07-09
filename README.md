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
  site.js             keygen FX: plasma banner, sine scroller,
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

- All animations respect `prefers-reduced-motion`.
- Sound is off by default; the `[ ♪ ]` button (bottom right) starts a small
  WebAudio square-wave arpeggio — no audio files involved.
- The bottom scroller text lives at the top of `assets/site.js`
  (`SCROLL_TEXT`) — edit at will, greetz are customary.
