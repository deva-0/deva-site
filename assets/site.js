/* ============================================================
   d3v4.site — keygen FX: plasma banner, sine scroller,
   keyboard nav, chiptune bleeper
   ============================================================ */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;

  function isLight() {
    return root.dataset.theme === "light";
  }

  /* ---- Plasma color cycling on the ASCII banner ------------- */

  var banner = document.querySelector("pre.banner");
  if (banner && !banner.dataset.fxDone) {
    banner.dataset.fxDone = "1";
    var lines = banner.textContent.split("\n");
    banner.textContent = "";
    var cells = [];
    lines.forEach(function (line, y) {
      for (var x = 0; x < line.length; x++) {
        var s = document.createElement("span");
        s.textContent = line[x];
        banner.appendChild(s);
        if (line[x] !== " ") cells.push({ el: s, x: x, y: y });
      }
      banner.appendChild(document.createTextNode("\n"));
    });

    if (!reducedMotion) {
      var t0 = performance.now();
      (function plasma(now) {
        var t = (now - t0) / 1000;
        for (var i = 0; i < cells.length; i++) {
          var c = cells[i];
          var v =
            Math.sin(c.x * 0.18 + t * 2.1) +
            Math.sin(c.y * 0.45 + t * 1.7) +
            Math.sin((c.x + c.y) * 0.12 + t * 2.6);
          var hue = 100 + v * 55; /* sweeps green -> cyan -> magenta-ish */
          var lum = isLight() ? 34 + v * 5 : 55 + v * 8;
          c.el.style.color = "hsl(" + hue + ", 100%, " + lum + "%)";
        }
        requestAnimationFrame(plasma);
      })(t0);
    }
  }

  /* ---- Sine-wave scroller ------------------------------------ */

  var SCROLL_TEXT =
    "   +++ greetz to all sysadmins still awake at 03:00 +++ " +
    "this site is 100% static html. no frameworks were harmed. " +
    "+++ uptime is a lifestyle +++ cattle, not pets +++ " +
    "have you tried turning it off and on again? +++   ";

  var bar = document.createElement("div");
  bar.id = "scroller";
  document.body.appendChild(bar);

  var glyphs = [];
  SCROLL_TEXT.split("").forEach(function (ch) {
    var s = document.createElement("span");
    s.textContent = ch;
    bar.appendChild(s);
    glyphs.push(s);
  });

  var CHW = 10; /* px per char, rough monospace advance */
  var totalW = glyphs.length * CHW;

  if (reducedMotion) {
    bar.style.textAlign = "center";
    bar.style.lineHeight = "3rem";
    glyphs.forEach(function (s) { s.style.position = "static"; });
  } else {
    var st0 = performance.now();
    (function scroll(now) {
      var t = (now - st0) / 1000;
      var base = -((t * 120) % totalW);
      var w = bar.clientWidth;
      for (var i = 0; i < glyphs.length; i++) {
        var x = base + i * CHW;
        if (x < -CHW) x += totalW;
        if (x > w + CHW) { glyphs[i].style.visibility = "hidden"; continue; }
        glyphs[i].style.visibility = "visible";
        var y = Math.sin(x * 0.035 + t * 3) * 9;
        var hue = 100 + Math.sin(x * 0.02 + t * 2) * 60;
        glyphs[i].style.transform = "translate(" + x + "px," + y + "px)";
        glyphs[i].style.color = "hsl(" + hue + ",100%," + (isLight() ? 34 : 60) + "%)";
      }
      requestAnimationFrame(scroll);
    })(st0);
  }

  /* ---- Theme toggle (dark phosphor <-> paper terminal) --------- */

  var tbtn = document.createElement("button");
  tbtn.id = "themetoggle";
  tbtn.title = "toggle theme [t]";
  document.body.appendChild(tbtn);

  function paintThemeBtn() {
    tbtn.textContent = isLight() ? "[ ☾ dark ]" : "[ ☼ lite ]";
  }
  paintThemeBtn();

  function toggleTheme() {
    root.dataset.theme = isLight() ? "dark" : "light";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) { /* private mode */ }
    paintThemeBtn();
  }

  tbtn.addEventListener("click", toggleTheme);

  /* ---- Keyboard nav: press the [key] shown in the menu -------- */

  document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key === "t") { toggleTheme(); return; }
    var link = document.querySelector('nav.mainmenu a[data-key="' + e.key + '"]');
    if (link) window.location.href = link.getAttribute("href");
  });

  /* ---- Chiptune bleeper (WebAudio, off by default) ------------ */

  var btn = document.createElement("button");
  btn.id = "sndtoggle";
  btn.textContent = "[ ♪ snd: off ]";
  btn.title = "toggle keygen music";
  document.body.appendChild(btn);

  var ctx = null, timer = null, step = 0;

  /* two-channel loop: bass + arpeggio, A minor, 140 bpm-ish */
  var BASS = [110, 110, 82.41, 82.41, 87.31, 87.31, 98, 98];
  var ARP = [
    440, 523.25, 659.25, 523.25, 440, 523.25, 659.25, 880,
    329.63, 415.3, 493.88, 415.3, 349.23, 440, 523.25, 440,
  ];

  function beep(freq, type, dur, gainVal) {
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(gainVal, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + dur);
  }

  function tick() {
    beep(ARP[step % ARP.length], "square", 0.09, 0.04);
    if (step % 2 === 0) beep(BASS[(step >> 1) % BASS.length], "triangle", 0.16, 0.07);
    step++;
  }

  btn.addEventListener("click", function () {
    if (timer) {
      clearInterval(timer);
      timer = null;
      btn.textContent = "[ ♪ snd: off ]";
      btn.classList.remove("on");
    } else {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctx.resume();
      timer = setInterval(tick, 107);
      btn.textContent = "[ ♪ snd: ON ]";
      btn.classList.add("on");
    }
  });
})();
