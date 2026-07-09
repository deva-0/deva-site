---
title: hello world
date: 2026-07-09
tags: ["meta"]
transmission: "001"
description: "First transmission — why this site exists and how it's built."
aliases: ["/posts/2026-07-09-hello-world.html"]
---

Every blog starts with a hello-world post nobody reads. This is mine.

I do DevOps and SysOps for a living — pipelines, containers, infrastructure
as code, and the occasional 3 AM incident that turns into a good story once
enough time has passed. This site is where those stories, notes, and tools
will land.

## How this site is built

In the spirit of the aesthetic: posts are plain markdown fed to a static
site generator, and what ships is plain HTML and CSS with one small JS file
for the keygen effects (the wavy plasma banner and — if you press the
`[ ♪ ]` button — a WebAudio chiptune bleeper). No client-side frameworks,
no tracking. Deployable to literally anything that can serve a file.

```
$ du -sh public/
tiny    public/
$ grep -r "react" public/ | wc -l
0
```

## What to expect here

- postmortems and war stories (anonymized, obviously)
- automation notes: ansible, terraform, CI pipelines
- linux and container deep dives
- small tools and scripts that saved my on-call shifts

Stay tuned. Or don't — this page will still be here, because static sites
don't crash.
