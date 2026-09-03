/* Jerick Shi — site interactions (v2)
   WebGL nebula background (2D starfield fallback), custom cursor, decode/scramble
   text, magnetic buttons, spotlight cards, page transitions, scroll spy, hero
   parallax, research map (force-directed graph), command palette, lightbox,
   carousel, tilt cards, filters, counters, easter eggs. No dependencies. */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var mouse = { x: -9999, y: -9999, active: false };

  document.documentElement.classList.add("js");

  window.addEventListener("pointermove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });
  document.addEventListener("pointerleave", function () { mouse.active = false; });

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ======================================================================
     BACKGROUND — WebGL nebula + procedural stars, mouse warp, scroll drift
     ====================================================================== */
  var WARP = { level: 0, target: 0 }; // easter egg hook

  var VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

  var FRAG = [
    "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif",
    "uniform vec2 u_res;uniform float u_time;uniform vec2 u_mouse;uniform float u_scroll;uniform float u_warp;",
    "float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}",
    "float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);",
    " float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));",
    " return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}",
    "float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);",
    " for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}",
    "float stars(vec2 uv,float scale,float t,float bright){",
    " vec2 g=uv*scale;vec2 id=floor(g);vec2 f=fract(g)-.5;",
    " float h=hash(id);if(h<.93)return 0.;",
    " vec2 off=vec2(hash(id+7.1),hash(id+3.7))-.5;f-=off*.7;",
    " float d=length(f);float tw=.6+.4*sin(t*(1.+h*2.)+h*40.);",
    " float s=smoothstep(.06,0.,d)*tw*bright;",
    " s+=smoothstep(.25,0.,d)*.06*tw;return s;}",
    "void main(){",
    " vec2 uv=(gl_FragCoord.xy-.5*u_res)/u_res.y;",
    " vec2 m=(u_mouse-.5*u_res)/u_res.y;",
    " float t=u_time*.045;",
    " vec2 d=uv-m;float dist=length(d);",
    " float infl=exp(-dist*dist*9.);",
    " vec2 wuv=uv+normalize(d+1e-4)*infl*.07;",
    " vec2 p=wuv*1.5+vec2(t*.35,-t*.22)+vec2(0.,u_scroll*.00035);",
    " float q=fbm(p+t*.3);",
    " float n=fbm(p+q*.9+vec2(1.7,9.2));",
    " vec3 c1=vec3(.36,.55,1.);vec3 c2=vec3(.62,.42,1.);vec3 c3=vec3(.27,.88,1.);",
    " vec3 col=mix(c1,c2,smoothstep(.25,.85,n));",
    " col=mix(col,c3,smoothstep(.6,.95,q)*.6);",
    " float a=smoothstep(.38,.92,n)*.30;",
    " vec3 bg=vec3(.016,.024,.05);",
    " vec3 o=bg+col*a;",
    " o+=c3*infl*.12;",
    " float st=0.;",
    " vec2 suv=uv+vec2(t*.15,u_scroll*.00025);",
    " st+=stars(suv,18.,u_time,1.);",
    " st+=stars(suv*1.7+3.1,26.,u_time*1.3,.6);",
    " st+=stars(uv*.6+vec2(t*.05,u_scroll*.0001),13.,u_time*.7,1.1);",
    " o+=vec3(.7,.78,1.)*st;",
    " if(u_warp>0.){",
    "  float ang=atan(uv.y,uv.x);float r=length(uv);",
    "  float streak=pow(noise(vec2(ang*40.,r*3.-u_time*8.)),8.)*u_warp*smoothstep(.05,.6,r)*3.;",
    "  o+=vec3(.5,.7,1.)*streak;o+=c3*u_warp*.06;}",
    " o+=(hash(gl_FragCoord.xy+u_time)-.5)*.012;",
    " gl_FragColor=vec4(o,1.);}"
  ].join("\n");

  function initBackgroundGL(canvas) {
    var gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return false;

    function shader(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
      return s;
    }
    var vs = shader(gl.VERTEX_SHADER, VERT), fs = shader(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return false;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var U = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      scroll: gl.getUniformLocation(prog, "u_scroll"),
      warp: gl.getUniformLocation(prog, "u_warp")
    };

    var scale = 0.6; // render at reduced resolution, CSS upscales — cheap on fill rate
    var w, h, smx = -9999, smy = -9999;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = Math.floor(window.innerWidth * dpr * scale);
      h = Math.floor(window.innerHeight * dpr * scale);
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
    }

    var running = true, start = performance.now();
    function frame(now) {
      if (!running) return;
      var t = (now - start) / 1000;
      // smooth mouse
      var tx = mouse.active ? mouse.x / window.innerWidth * w : -9999;
      var ty = mouse.active ? (1 - mouse.y / window.innerHeight) * h : -9999;
      smx = tx === -9999 ? -9999 : (smx === -9999 ? tx : lerp(smx, tx, 0.08));
      smy = ty === -9999 ? -9999 : (smy === -9999 ? ty : lerp(smy, ty, 0.08));
      WARP.level = lerp(WARP.level, WARP.target, 0.05);
      gl.uniform2f(U.res, w, h);
      gl.uniform1f(U.time, t * (1 + WARP.level * 6));
      gl.uniform2f(U.mouse, smx, smy);
      gl.uniform1f(U.scroll, window.scrollY);
      gl.uniform1f(U.warp, WARP.level);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reducedMotion) requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running && !reducedMotion) requestAnimationFrame(frame);
    });
    resize();
    requestAnimationFrame(frame);
    return true;
  }

  function initBackground2D(canvas) {
    var ctx = canvas.getContext("2d");
    var stars = [], w, h, dpr;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(160, Math.floor((w * h) / 9000));
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 + 0.3,
          vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12, tw: Math.random() * Math.PI * 2 });
      }
    }
    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.x += s.vx; s.y += s.vy;
        if (s.x < -10) s.x = w + 10; if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10; if (s.y > h + 10) s.y = -10;
        var twinkle = 0.45 + 0.4 * Math.sin(t / 900 + s.tw);
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(155,175,255," + twinkle * 0.7 + ")"; ctx.fill();
        var dx = s.x - mouse.x, dy = s.y - mouse.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = "rgba(91,140,255," + (1 - d / 110) * 0.25 + ")"; ctx.lineWidth = 0.6; ctx.stroke();
        }
      }
      if (!reducedMotion) requestAnimationFrame(frame);
    }
    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(frame);
  }

  function initBackground() {
    var canvas = document.getElementById("starfield");
    if (!canvas) return;
    var ok = false;
    try { ok = initBackgroundGL(canvas); } catch (e) { ok = false; }
    if (!ok) initBackground2D(canvas);
    if (!reducedMotion) {
      var grain = document.createElement("div");
      grain.id = "grain";
      document.body.appendChild(grain);
    }
  }

  /* ======================================================================
     CURSOR — dot + lagging ring (fine pointers only)
     ====================================================================== */
  function initCursor() {
    if (!finePointer || reducedMotion) return;
    var dot = document.createElement("div"), ring = document.createElement("div");
    dot.id = "cur-dot"; ring.id = "cur-ring";
    document.body.appendChild(dot); document.body.appendChild(ring);
    document.body.classList.add("has-cursor", "cur-off");
    var rx = 0, ry = 0, shown = false;

    function tick() {
      rx = lerp(rx, mouse.x, 0.18); ry = lerp(ry, mouse.y, 0.18);
      dot.style.transform = "translate(" + mouse.x + "px," + mouse.y + "px) translate(-50%,-50%)";
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    window.addEventListener("pointermove", function (e) {
      if (!shown) { shown = true; rx = e.clientX; ry = e.clientY; document.body.classList.remove("cur-off"); }
      var el = e.target;
      var interactive = el.closest && el.closest("a, button, .card, .gallery-img, .dot, .rmap canvas, input, label");
      document.body.classList.toggle("cur-hover", !!interactive);
      var isInput = el.closest && el.closest("input, textarea");
      document.body.classList.toggle("cur-off", !!isInput);
    }, { passive: true });
    document.addEventListener("pointerdown", function () { document.body.classList.add("cur-down"); });
    document.addEventListener("pointerup", function () { document.body.classList.remove("cur-down"); });
    document.addEventListener("mouseleave", function () { document.body.classList.add("cur-off"); });
    document.addEventListener("mouseenter", function () { document.body.classList.remove("cur-off"); });
  }

  /* ======================================================================
     SCRAMBLE / DECODE TEXT
     ====================================================================== */
  var GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

  function scramble(el, opts) {
    opts = opts || {};
    if (reducedMotion) return;
    var nodes = [];
    (function walk(n) {
      for (var i = 0; i < n.childNodes.length; i++) {
        var c = n.childNodes[i];
        if (c.nodeType === 3 && c.textContent.trim()) nodes.push(c);
        else if (c.nodeType === 1) walk(c);
      }
    })(el);
    var targets = nodes.map(function (n) {
      var span = document.createElement("span");
      n.parentNode.replaceChild(span, n);
      return { span: span, text: n.textContent };
    });
    var dur = opts.duration || 900, start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      targets.forEach(function (t) {
        var out = "", len = t.text.length;
        for (var i = 0; i < len; i++) {
          var ch = t.text[i];
          var reveal = (i / len) * 0.75 + 0.1; // left-to-right reveal
          if (ch === " " || p >= reveal) out += ch;
          else out += '<span class="sc-glyph">' + GLYPHS[Math.floor(Math.random() * GLYPHS.length)] + "</span>";
        }
        t.span.innerHTML = out;
      });
      if (p < 1) requestAnimationFrame(frame);
      else targets.forEach(function (t) { t.span.textContent = t.text; });
    }
    requestAnimationFrame(frame);
  }

  function initScramble() {
    var els = document.querySelectorAll("[data-scramble]");
    if (!els.length || reducedMotion) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          scramble(en.target, { duration: +en.target.getAttribute("data-scramble") || 900 });
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.3 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ======================================================================
     MAGNETIC BUTTONS + SPOTLIGHT CARDS + HERO PARALLAX
     ====================================================================== */
  function initMagnetic() {
    if (!finePointer || reducedMotion) return;
    document.querySelectorAll(".btn, .cmdk-btn, .filter-btn").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = "translate(" + dx * 0.22 + "px," + dy * 0.28 + "px)";
        btn.style.transition = "transform 0.1s ease-out, box-shadow 0.18s, border-color 0.18s, background 0.18s";
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.transform = "";
        btn.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.18s, border-color 0.18s, background 0.18s";
      });
    });
  }

  function initSpotlight() {
    if (!finePointer) return;
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(".card");
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  function initHeroParallax() {
    if (!finePointer || reducedMotion) return;
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var layers = hero.querySelectorAll("[data-depth]");
    if (!layers.length) return;
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach(function (l) {
        var d = parseFloat(l.getAttribute("data-depth"));
        l.style.transform = "translate(" + (-px * d * 30) + "px," + (-py * d * 30) + "px)";
      });
    });
    hero.addEventListener("pointerleave", function () {
      layers.forEach(function (l) { l.style.transform = ""; });
    });
  }

  /* ======================================================================
     PAGE TRANSITIONS
     ====================================================================== */
  function initTransitions() {
    var curtain = document.createElement("div");
    curtain.id = "curtain";
    document.body.appendChild(curtain);
    if (reducedMotion) return;

    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      var href = a.getAttribute("href");
      if (!href || href[0] === "#" || /^(mailto|tel|javascript):/.test(href)) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return;
      if (/\.(pdf|jpg|jpeg|png|zip)$/i.test(url.pathname)) return;
      e.preventDefault();
      document.body.classList.add("leaving");
      setTimeout(function () { location.href = url.href; }, 300);
    });

    window.addEventListener("pageshow", function (e) {
      if (e.persisted) document.body.classList.remove("leaving");
    });
  }

  /* ======================================================================
     NAV — scrolled state, hide on scroll down, active link, burger
     ====================================================================== */
  function initNav() {
    var nav = document.querySelector(".nav");
    var burger = document.querySelector(".nav-burger");
    var links = document.querySelector(".nav-links");
    if (burger && links) burger.addEventListener("click", function () { links.classList.toggle("open"); });

    var path = location.pathname.replace(/index\.html$/, "");
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === "/" ? path === "/" : path.indexOf(href.replace(/\/$/, "")) === 0 && href !== "/") a.classList.add("active");
    });

    if (!nav) return;
    var last = window.scrollY, ticking = false;
    function onScroll() {
      var y = window.scrollY;
      nav.classList.toggle("scrolled", y > 24);
      if (y > 320 && y > last + 4) nav.classList.add("hidden");
      else if (y < last - 4 || y < 320) nav.classList.remove("hidden");
      last = y; ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();
  }

  /* ======================================================================
     SCROLL SPY (homepage sections)
     ====================================================================== */
  function initSpy() {
    var sections = document.querySelectorAll("section.block[id]");
    if (sections.length < 3) return;
    var spy = document.createElement("nav");
    spy.id = "spy";
    spy.setAttribute("aria-label", "Sections");
    var items = [];
    sections.forEach(function (s, i) {
      var label = (s.querySelector(".eyebrow") || {}).textContent || s.id;
      label = label.replace(/^\s*\d+\s*/, "").trim();
      var a = document.createElement("a");
      a.href = "#" + s.id;
      a.innerHTML = '<span class="lbl">' + label + "</span><i></i>";
      spy.appendChild(a);
      items.push(a);
    });
    document.body.appendChild(spy);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          items.forEach(function (a, i) { a.classList.toggle("active", sections[i] === en.target); });
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ======================================================================
     SCROLL PROGRESS / REVEAL / TYPING / COUNTERS / SKILL BARS / TILT
     ====================================================================== */
  function initProgress() {
    var bar = document.getElementById("progress");
    if (!bar) return;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || reducedMotion) {
      els.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initTyping() {
    var el = document.querySelector("[data-type]");
    if (!el) return;
    var phrases;
    try { phrases = JSON.parse(el.getAttribute("data-type")); } catch (e) { return; }
    var target = el.querySelector(".typed");
    if (!target || !phrases.length) return;
    if (reducedMotion) { target.textContent = phrases[0]; return; }
    var pi = 0, ci = 0, deleting = false;
    function tick() {
      var phrase = phrases[pi];
      if (!deleting) {
        ci++;
        target.textContent = phrase.slice(0, ci);
        if (ci === phrase.length) { deleting = true; setTimeout(tick, 2100); return; }
        setTimeout(tick, 38 + Math.random() * 40);
      } else {
        ci--;
        target.textContent = phrase.slice(0, ci);
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 350); return; }
        setTimeout(tick, 18);
      }
    }
    setTimeout(tick, 1100);
  }

  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    function animate(el) {
      var end = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      if (reducedMotion) { el.textContent = end + suffix; return; }
      var dur = 1400, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
  }

  function initSkillBars() {
    var fills = document.querySelectorAll(".skill .fill");
    if (!fills.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.style.width = en.target.getAttribute("data-w") + "%"; io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    fills.forEach(function (el) { io.observe(el); });
  }

  function initTilt() {
    if (reducedMotion || !finePointer) return;
    document.querySelectorAll(".card.tilt").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(800px) rotateY(" + px * 6 + "deg) rotateX(" + -py * 6 + "deg) translateY(-4px)";
      });
      card.addEventListener("pointerleave", function () { card.style.transform = ""; });
    });
  }

  /* ======================================================================
     SMALL WIDGETS — abstracts, copy, filters, lightbox, carousel, read time,
     footer clock, toast
     ====================================================================== */
  function initAbstracts() {
    document.querySelectorAll("[data-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = document.getElementById(btn.getAttribute("data-toggle"));
        if (!target) return;
        btn.textContent = target.classList.toggle("open") ? "Hide abstract" : "Abstract";
      });
    });
  }

  function initCopy() {
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = document.getElementById(btn.getAttribute("data-copy"));
        if (!src) return;
        navigator.clipboard.writeText(src.textContent.trim()).then(function () {
          var old = btn.textContent;
          btn.textContent = "Copied ✓";
          toast("BibTeX copied to clipboard");
          setTimeout(function () { btn.textContent = old; }, 1600);
        });
      });
    });
  }

  function initFilters() {
    var bar = document.querySelector(".filter-bar");
    if (!bar) return;
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      document.querySelectorAll("[data-tags]").forEach(function (item, i) {
        var show = f === "all" || item.getAttribute("data-tags").split(" ").indexOf(f) !== -1;
        item.style.display = show ? "" : "none";
        if (show && !reducedMotion) {
          item.style.animation = "none";
          void item.offsetWidth;
          item.style.animation = "fade-in 0.4s ease " + (i * 0.04) + "s both";
        }
      });
    });
  }

  function initLightbox() {
    var imgs = document.querySelectorAll(".gallery-img");
    if (!imgs.length) return;
    var box = document.createElement("div");
    box.id = "lightbox";
    box.innerHTML = "<img alt=''>";
    document.body.appendChild(box);
    var boxImg = box.querySelector("img");
    imgs.forEach(function (img) {
      img.addEventListener("click", function () {
        boxImg.src = img.getAttribute("data-full") || img.src;
        box.classList.add("open");
      });
    });
    box.addEventListener("click", function () { box.classList.remove("open"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") box.classList.remove("open"); });
  }

  function initCarousels() {
    document.querySelectorAll(".carousel").forEach(function (car) {
      var imgs;
      try { imgs = JSON.parse(car.getAttribute("data-images")); } catch (e) { return; }
      var frameImg = car.querySelector(".frame img");
      var dotsWrap = car.querySelector(".dots");
      var idx = 0, timer;
      imgs.forEach(function (_, i) {
        var d = document.createElement("button");
        d.className = "dot" + (i === 0 ? " active" : "");
        d.setAttribute("aria-label", "Photo " + (i + 1));
        d.addEventListener("click", function () { go(i); restart(); });
        dotsWrap.appendChild(d);
      });
      function go(i) {
        idx = (i + imgs.length) % imgs.length;
        frameImg.style.opacity = "0";
        setTimeout(function () { frameImg.src = imgs[idx]; frameImg.style.opacity = "1"; }, 280);
        dotsWrap.querySelectorAll(".dot").forEach(function (d, j) { d.classList.toggle("active", j === idx); });
      }
      function restart() {
        clearInterval(timer);
        if (!reducedMotion) timer = setInterval(function () { go(idx + 1); }, 5000);
      }
      car.querySelector(".c-prev").addEventListener("click", function () { go(idx - 1); restart(); });
      car.querySelector(".c-next").addEventListener("click", function () { go(idx + 1); restart(); });
      car.addEventListener("pointerenter", function () { clearInterval(timer); });
      car.addEventListener("pointerleave", restart);
      restart();
    });
  }

  function initReadTime() {
    var body = document.querySelector(".article-body");
    var eyebrow = document.querySelector(".article header .eyebrow");
    if (!body || !eyebrow) return;
    var words = body.textContent.trim().split(/\s+/).length;
    var mins = Math.max(1, Math.round(words / 220));
    var span = document.createElement("span");
    span.className = "readtime";
    span.textContent = mins + " min read";
    eyebrow.appendChild(span);
  }

  function initClock() {
    var note = document.querySelector(".foot-note");
    if (!note) return;
    var up = document.createElement("span"); up.className = "up"; up.title = "systems nominal";
    var clock = document.createElement("span"); clock.className = "clock";
    note.appendChild(up); note.appendChild(clock);
    function tick() {
      try {
        clock.textContent = "BERKELEY " + new Date().toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour12: false });
      } catch (e) { clock.textContent = new Date().toLocaleTimeString(); }
    }
    tick(); setInterval(tick, 1000);
  }

  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.id = "toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  /* ======================================================================
     EASTER EGGS — Konami hyperdrive
     ====================================================================== */
  function initEggs() {
    var seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    var pos = 0;
    document.addEventListener("keydown", function (e) {
      var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === seq[pos] ? pos + 1 : (k === seq[0] ? 1 : 0);
      if (pos === seq.length) {
        pos = 0;
        WARP.target = 1;
        document.body.classList.add("warp");
        toast("⚡ hyperdrive engaged");
        setTimeout(function () { WARP.target = 0; document.body.classList.remove("warp"); }, 4500);
      }
    });
  }

  /* ======================================================================
     RESEARCH MAP — force-directed graph of papers, ideas, people, venues
     ====================================================================== */
  var RMAP_DATA = {
    nodes: [
      { id: "me", type: "self", label: "Jerick Shi", sub: "multi-agent LLM systems · AI safety", href: "/" },

      { id: "lie", type: "paper", label: "When Agents Lie", sub: "ICML '26 NExT-Game workshop · Best Paper Award", star: true,
        href: "https://openreview.net/pdf?id=v8nYIkYjY0", ext: true, tip: "Premeditation, persistence, and exploitation in repeated games" },
      { id: "silence", type: "paper", label: "Strategic Silence", sub: "ICML '26 Failure Modes of Agentic AI workshop",
        href: "https://openreview.net/pdf?id=ZOdCsExYgi", ext: true, tip: "What game-theoretic benchmarks miss in multi-agent LLMs" },
      { id: "cheap", type: "paper", label: "Cheap Talk, Empty Promise", sub: "ICLR '26 AI for Mechanism Design workshop",
        href: "https://arxiv.org/abs/2604.04782", ext: true, tip: "Frontier LLMs break public promises for self-interest" },
      { id: "tax", type: "paper", label: "Hallucination → Scheming", sub: "ICLR '26 Agents in the Wild workshop",
        href: "https://arxiv.org/abs/2604.04788", ext: true, tip: "A unified taxonomy and benchmark analysis for LLM deception" },
      { id: "market", type: "paper", label: "Market-Dependent Communication", sub: "NeurIPS '25 GenAI in Finance workshop",
        href: "https://doi.org/10.48550/arXiv.2511.13614", ext: true, tip: "Communication in multi-agent alpha generation" },
      { id: "thesis", type: "paper", label: "Master's Thesis", sub: "CMU-CS-26-105 · The Structure of Deception",
        href: "/projects/masters-thesis/", tip: "How LLM agents lie, break promises, and exploit trust" },
      { id: "senior", type: "paper", label: "Senior Thesis", sub: "Multi-agent conversations & LLM forecasting",
        href: "/projects/senior-thesis/", tip: "Why multi-agent conversations cannot fix LLM forecasting" },
      { id: "mom", type: "paper", label: "LLMs in Financial Markets", sub: "Meeting of the Minds · First Place",
        href: "/projects/meeting-minds/", tip: "Predictive power of LLMs on the Fed's Beige Book" },

      { id: "c-decep", type: "concept", label: "deception" },
      { id: "c-repeat", type: "concept", label: "repeated games" },
      { id: "c-commit", type: "concept", label: "commitment" },
      { id: "c-cheap", type: "concept", label: "cheap talk" },
      { id: "c-bench", type: "concept", label: "benchmarks" },
      { id: "c-tax", type: "concept", label: "taxonomy" },
      { id: "c-multi", type: "concept", label: "multi-agent" },
      { id: "c-game", type: "concept", label: "game theory" },
      { id: "c-safety", type: "concept", label: "AI safety" },
      { id: "c-fin", type: "concept", label: "finance" },
      { id: "c-comm", type: "concept", label: "communication" },
      { id: "c-forecast", type: "concept", label: "forecasting" },
      { id: "c-trust", type: "concept", label: "trust & exploitation" },

      { id: "p-conitzer", type: "person", label: "Vincent Conitzer", sub: "CMU · advisor", href: "https://www.cs.cmu.edu/~conitzer/", ext: true },
      { id: "p-jin", type: "person", label: "Zhijing Jin", sub: "U Toronto · advisor", href: "https://zhijing-jin.com/", ext: true },
      { id: "p-zhang", type: "person", label: "Terry Zhang", sub: "coauthor" },
      { id: "p-schoelkopf", type: "person", label: "Bernhard Schölkopf", sub: "MPI-IS · coauthor" },
      { id: "p-hollifield", type: "person", label: "Burton Hollifield", sub: "CMU Tepper · coauthor" },
      { id: "p-raghunathan", type: "person", label: "Aditi Raghunathan", sub: "CMU · thesis committee" },

      { id: "v-icml", type: "venue", label: "ICML 2026" },
      { id: "v-iclr", type: "venue", label: "ICLR 2026" },
      { id: "v-neurips", type: "venue", label: "NeurIPS 2025" },
      { id: "v-cmu", type: "venue", label: "CMU" }
    ],
    links: [
      ["me", "lie"], ["me", "silence"], ["me", "cheap"], ["me", "tax"], ["me", "market"], ["me", "thesis"], ["me", "senior"], ["me", "mom"],

      ["lie", "c-decep"], ["lie", "c-repeat"], ["lie", "c-trust"], ["lie", "c-multi"],
      ["silence", "c-bench"], ["silence", "c-comm"], ["silence", "c-game"], ["silence", "c-multi"],
      ["cheap", "c-commit"], ["cheap", "c-cheap"], ["cheap", "c-decep"], ["cheap", "c-game"],
      ["tax", "c-tax"], ["tax", "c-bench"], ["tax", "c-decep"], ["tax", "c-safety"],
      ["market", "c-fin"], ["market", "c-comm"], ["market", "c-multi"],
      ["thesis", "c-decep"], ["thesis", "c-repeat"], ["thesis", "c-commit"], ["thesis", "c-trust"], ["thesis", "c-safety"],
      ["senior", "c-forecast"], ["senior", "c-multi"], ["senior", "c-comm"],
      ["mom", "c-fin"], ["mom", "c-forecast"],

      ["lie", "p-zhang"], ["lie", "p-schoelkopf"], ["lie", "p-conitzer"], ["lie", "p-jin"],
      ["silence", "p-zhang"], ["silence", "p-conitzer"], ["silence", "p-jin"],
      ["cheap", "p-zhang"], ["cheap", "p-jin"], ["cheap", "p-conitzer"],
      ["tax", "p-zhang"], ["tax", "p-jin"], ["tax", "p-conitzer"],
      ["market", "p-hollifield"],
      ["thesis", "p-conitzer"], ["thesis", "p-jin"], ["thesis", "p-raghunathan"],

      ["lie", "v-icml"], ["silence", "v-icml"], ["cheap", "v-iclr"], ["tax", "v-iclr"], ["market", "v-neurips"],
      ["thesis", "v-cmu"], ["senior", "v-cmu"], ["mom", "v-cmu"]
    ]
  };

  var RMAP_STYLE = {
    self: { color: "#ffffff", glow: "rgba(70,224,255,0.9)", r: 15, label: "always" },
    paper: { color: "#9d6bff", glow: "rgba(157,107,255,0.9)", r: 9, label: "always" },
    concept: { color: "#46e0ff", glow: "rgba(70,224,255,0.8)", r: 5.5, label: "wide" },
    person: { color: "#5b8cff", glow: "rgba(91,140,255,0.8)", r: 6.5, label: "wide" },
    venue: { color: "#ffd479", glow: "rgba(255,212,121,0.8)", r: 6, label: "wide" }
  };

  function createResearchMap(host) {
    var compact = host.classList.contains("compact");
    var canvas = document.createElement("canvas");
    host.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    // legend
    var legend = document.createElement("div");
    legend.className = "rmap-legend";
    var hidden = {};
    ["paper", "concept", "person", "venue"].forEach(function (t) {
      var b = document.createElement("button");
      b.innerHTML = "<i style=\"--c:" + RMAP_STYLE[t].color + "\"></i>" + (t === "person" ? "people" : t + "s");
      b.addEventListener("click", function () {
        hidden[t] = !hidden[t];
        b.classList.toggle("off", hidden[t]);
        alpha = Math.max(alpha, 0.5);
      });
      legend.appendChild(b);
    });
    host.appendChild(legend);

    var hint = document.createElement("div");
    hint.className = "rmap-hint";
    hint.textContent = finePointer ? "drag nodes · hover to explore · click to open" : "drag nodes · tap to open";
    host.appendChild(hint);

    var tip = document.createElement("div");
    tip.className = "rmap-tip";
    host.appendChild(tip);

    // graph state
    var nodes = RMAP_DATA.nodes.map(function (n) {
      return Object.assign({ x: 0, y: 0, vx: 0, vy: 0, phase: Math.random() * Math.PI * 2 }, n, { style: RMAP_STYLE[n.type] });
    });
    var byId = {};
    nodes.forEach(function (n) { byId[n.id] = n; });
    var links = RMAP_DATA.links.map(function (l) { return { a: byId[l[0]], b: byId[l[1]] }; });
    var adj = {};
    links.forEach(function (l) {
      (adj[l.a.id] = adj[l.a.id] || []).push(l.b.id);
      (adj[l.b.id] = adj[l.b.id] || []).push(l.a.id);
    });

    var W = 0, H = 0, dpr = 1, alpha = 1, hover = null, drag = null, pinned = null, externalHighlight = null;

    function visible(n) { return !hidden[n.type]; }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      var r = host.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      alpha = Math.max(alpha, 0.4);
    }

    function seed() {
      var cx = W / 2, cy = H / 2;
      nodes.forEach(function (n, i) {
        var ang = (i / nodes.length) * Math.PI * 2, rad = n.type === "self" ? 0 : n.type === "paper" ? Math.min(W, H) * 0.18 : Math.min(W, H) * 0.36;
        n.x = cx + Math.cos(ang) * rad + (Math.random() - 0.5) * 20;
        n.y = cy + Math.sin(ang) * rad + (Math.random() - 0.5) * 20;
      });
    }

    function restLength(l) {
      var t = l.a.type + "-" + l.b.type;
      var base = Math.min(W, H);
      if (t === "self-paper") return base * (compact ? 0.30 : 0.26);
      if (l.a.type === "paper" && l.b.type === "concept") return base * (compact ? 0.22 : 0.19);
      return base * (compact ? 0.24 : 0.21);
    }

    function step() {
      var i, j, n, m, dx, dy, d2, d, f;
      var k = Math.min(W, H) * (compact ? 9 : 11);
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        if (!visible(n)) continue;
        for (j = i + 1; j < nodes.length; j++) {
          m = nodes[j];
          if (!visible(m)) continue;
          dx = m.x - n.x; dy = m.y - n.y;
          d2 = dx * dx + dy * dy + 0.01;
          if (d2 > 250000) continue;
          f = (k / d2) * alpha;
          d = Math.sqrt(d2);
          dx /= d; dy /= d;
          n.vx -= dx * f; n.vy -= dy * f;
          m.vx += dx * f; m.vy += dy * f;
        }
      }
      links.forEach(function (l) {
        if (!visible(l.a) || !visible(l.b)) return;
        dx = l.b.x - l.a.x; dy = l.b.y - l.a.y;
        d = Math.sqrt(dx * dx + dy * dy) + 0.01;
        f = (d - restLength(l)) * 0.012 * alpha;
        dx /= d; dy /= d;
        l.a.vx += dx * f; l.a.vy += dy * f;
        l.b.vx -= dx * f; l.b.vy -= dy * f;
      });
      var cx = W / 2, cy = H / 2, t = performance.now() / 1000;
      nodes.forEach(function (n) {
        if (!visible(n)) return;
        if (n === drag) { n.vx = n.vy = 0; return; }
        // gravity is weaker along the wider axis so the graph fills the box
        var gx = n.type === "self" ? 0.03 : (W >= H ? 0.0012 : 0.003);
        var gy = n.type === "self" ? 0.03 : (W >= H ? 0.003 : 0.0012);
        n.vx += (cx - n.x) * gx * alpha;
        n.vy += (cy - n.y) * gy * alpha;
        // gentle idle drift so the map never looks frozen
        if (!reducedMotion) { n.vx += Math.cos(t * 0.6 + n.phase) * 0.012; n.vy += Math.sin(t * 0.5 + n.phase) * 0.012; }
        n.vx *= 0.82; n.vy *= 0.82;
        n.x += n.vx; n.y += n.vy;
        n.x = clamp(n.x, 30, W - 30); n.y = clamp(n.y, 40, H - 44);
      });
      alpha = Math.max(alpha * 0.985, 0.06);
    }

    function focusSet() {
      var f = hover || pinned || externalHighlight;
      if (!f) return null;
      var set = {}; set[f.id] = true;
      (adj[f.id] || []).forEach(function (id) { set[id] = true; });
      return set;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var focus = focusSet();
      var showAllLabels = W > 700;

      // links
      links.forEach(function (l) {
        if (!visible(l.a) || !visible(l.b)) return;
        var lit = focus && focus[l.a.id] && focus[l.b.id] && (l.a === (hover || pinned || externalHighlight) || l.b === (hover || pinned || externalHighlight));
        ctx.beginPath();
        ctx.moveTo(l.a.x, l.a.y); ctx.lineTo(l.b.x, l.b.y);
        if (lit) {
          var g = ctx.createLinearGradient(l.a.x, l.a.y, l.b.x, l.b.y);
          g.addColorStop(0, l.a.style.color); g.addColorStop(1, l.b.style.color);
          ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.globalAlpha = 0.9;
        } else {
          ctx.strokeStyle = "rgba(139,156,255,1)"; ctx.lineWidth = 0.7; ctx.globalAlpha = focus ? 0.06 : 0.16;
        }
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // nodes
      nodes.forEach(function (n) {
        if (!visible(n)) return;
        var dim = focus && !focus[n.id];
        var isFocus = n === hover || n === pinned || n === externalHighlight;
        var r = n.style.r * (isFocus ? 1.35 : 1) * (n.star ? 1.15 : 1);
        ctx.globalAlpha = dim ? 0.18 : 1;
        // glow
        var g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3.2);
        g.addColorStop(0, n.style.glow); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.globalAlpha = (dim ? 0.05 : isFocus ? 0.6 : 0.28);
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 3.2, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = dim ? 0.2 : 1;
        // body
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.type === "self" ? "#0a0f1e" : n.style.color;
        ctx.fill();
        ctx.lineWidth = n.type === "self" ? 2 : 1;
        ctx.strokeStyle = n.type === "self" ? "#46e0ff" : "rgba(255,255,255,0.35)";
        ctx.stroke();
        if (n.star) {
          ctx.fillStyle = "#ffd479"; ctx.font = "9px " + "JetBrains Mono, monospace";
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText("★", n.x, n.y + 0.5);
        }
        // label
        var wantLabel = n.style.label === "always" || showAllLabels || isFocus || (focus && focus[n.id]);
        if (wantLabel) {
          var big = n.type === "self" || n.type === "paper";
          ctx.font = (big ? "600 " : "") + (big ? 12 : 10.5) + "px " + (big ? "Space Grotesk, Helvetica Neue, sans-serif" : "JetBrains Mono, monospace");
          ctx.textAlign = "center"; ctx.textBaseline = "top";
          var ty = n.y + r + 5;
          var half = ctx.measureText(n.label).width / 2 + 4;
          var lx = clamp(n.x, half, W - half);
          ctx.lineWidth = 3; ctx.strokeStyle = "rgba(4,6,13,0.85)"; ctx.lineJoin = "round";
          ctx.strokeText(n.label, lx, ty);
          ctx.fillStyle = big ? "#e8ecf8" : (dim ? "#6b7490" : "#9aa3bc");
          if (isFocus) ctx.fillStyle = n.style.color === "#ffffff" ? "#46e0ff" : n.style.color;
          ctx.fillText(n.label, lx, ty);
        }
        ctx.globalAlpha = 1;
      });
    }

    var running = false;
    function loop() {
      if (!running) return;
      step(); draw();
      requestAnimationFrame(loop);
    }

    // interaction
    function pick(x, y) {
      var best = null, bd = 1e9;
      nodes.forEach(function (n) {
        if (!visible(n)) return;
        var dx = n.x - x, dy = n.y - y, d = dx * dx + dy * dy, rr = (n.style.r + 10);
        if (d < rr * rr && d < bd) { bd = d; best = n; }
      });
      return best;
    }

    function local(e) {
      var r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function showTip(n, x, y) {
      if (!n || n.type === "concept" || n.type === "venue") { tip.classList.remove("show"); return; }
      var kind = n.type === "self" ? "you are here" : n.type;
      tip.innerHTML = '<span class="k">' + kind + (n.star ? " · ★ best paper" : "") + "</span><b>" + n.label + "</b>" +
        (n.tip ? '<div style="font-size:0.8rem;">' + n.tip + "</div>" : "") +
        (n.sub ? '<div style="font-size:0.74rem; color:var(--faint); margin-top:0.25rem;">' + n.sub + "</div>" : "") +
        (n.href && n.type !== "self" ? '<span class="go">click to open →</span>' : "");
      var tw = 280;
      var left = clamp(x + 18, 8, W - tw - 8), top = y + 18;
      if (top > H - 140) top = y - 120;
      tip.style.left = left + "px"; tip.style.top = top + "px";
      tip.classList.add("show");
    }

    var downAt = null, moved = false;
    canvas.addEventListener("pointerdown", function (e) {
      var p = local(e);
      var n = pick(p.x, p.y);
      downAt = p; moved = false;
      if (n) { drag = n; canvas.classList.add("dragging"); canvas.setPointerCapture(e.pointerId); alpha = Math.max(alpha, 0.3); }
    });
    canvas.addEventListener("pointermove", function (e) {
      var p = local(e);
      if (drag) {
        drag.x = clamp(p.x, 30, W - 30); drag.y = clamp(p.y, 40, H - 44);
        if (downAt && Math.hypot(p.x - downAt.x, p.y - downAt.y) > 4) moved = true;
        alpha = Math.max(alpha, 0.25);
        showTip(drag, p.x, p.y);
        return;
      }
      var n = pick(p.x, p.y);
      if (n !== hover) { hover = n; alpha = Math.max(alpha, 0.12); }
      canvas.style.cursor = n ? "pointer" : "";
      showTip(n, p.x, p.y);
    });
    function release(e) {
      if (drag) {
        var n = drag;
        drag = null; canvas.classList.remove("dragging");
        try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
        if (!moved) {
          if (n.href && n.type !== "self") {
            if (n.ext) window.open(n.href, "_blank", "noopener");
            else { document.body.classList.add("leaving"); setTimeout(function () { location.href = n.href; }, reducedMotion ? 0 : 300); }
          } else {
            pinned = pinned === n ? null : n;
          }
        }
      }
      downAt = null;
    }
    canvas.addEventListener("pointerup", release);
    canvas.addEventListener("pointercancel", release);
    canvas.addEventListener("pointerleave", function () { hover = null; tip.classList.remove("show"); });

    // start when visible
    var started = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          if (!started) {
            started = true;
            resize(); seed();
            alpha = 1;
            for (var i = 0; i < 260; i++) step(); // settle before first paint
            alpha = 0.25;
          }
          if (!running) { running = true; requestAnimationFrame(loop); }
        } else {
          running = false;
        }
      });
    }, { threshold: 0.05 });
    io.observe(host);
    window.addEventListener("resize", function () { if (started) resize(); });

    return {
      highlight: function (id) { externalHighlight = id ? byId[id] || null : null; alpha = Math.max(alpha, 0.1); }
    };
  }

  function initResearchMaps() {
    var maps = [];
    document.querySelectorAll("[data-research-map]").forEach(function (host) {
      host.classList.add("rmap");
      if (host.getAttribute("data-research-map") === "compact") host.classList.add("compact");
      maps.push(createResearchMap(host));
    });
    if (!maps.length) return;
    // paper cards can highlight their node on hover
    document.querySelectorAll("[data-node]").forEach(function (el) {
      el.addEventListener("pointerenter", function () { maps.forEach(function (m) { m.highlight(el.getAttribute("data-node")); }); });
      el.addEventListener("pointerleave", function () { maps.forEach(function (m) { m.highlight(null); }); });
    });
  }

  /* ======================================================================
     COMMAND PALETTE
     ====================================================================== */
  var CMD_ITEMS = [
    { label: "Home / About", href: "/", k: "go" },
    { label: "Research & Publications", href: "/publications/", k: "go" },
    { label: "Research Map (interactive)", href: "/publications/#map", k: "go" },
    { label: "Projects", href: "/projects/", k: "go" },
    { label: "Teaching", href: "/teaching/", k: "go" },
    { label: "Blog", href: "/blog/", k: "go" },
    { label: "Hobbies", href: "/hobbies/", k: "go" },
    { label: "Bookshelf", href: "/books/", k: "go" },
    { label: "CV", href: "/cv/", k: "go" },
    { label: "Download CV (PDF)", href: "/assets/pdf/Shi_Jerick_CV.pdf", k: "pdf" },
    { label: "Master's Thesis (PDF)", href: "/assets/pdf/masters_thesis.pdf", k: "pdf" },
    { label: "When Agents Lie — Best Paper, ICML '26 WS (PDF)", href: "https://openreview.net/pdf?id=v8nYIkYjY0", k: "pdf" },
    { label: "Strategic Silence in Multi-Agent LLMs (PDF)", href: "https://openreview.net/pdf?id=ZOdCsExYgi", k: "pdf" },
    { label: "Thesis Defense (YouTube)", href: "https://youtu.be/Z3Q9AkriPxg", k: "link" },
    { label: "GitHub — Jerick-1380", href: "https://github.com/Jerick-1380", k: "link" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jerick-shi-293773216", k: "link" },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=6wj2mTQAAAAJ", k: "link" },
    { label: "Flickr Portfolio", href: "https://flickr.com/photos/203834484@N07/", k: "link" },
    { label: "Email — JerickS.1380@gmail.com", href: "mailto:JerickS.1380@gmail.com", k: "link" },
    { label: "Quant Engine — join waitlist", href: "https://quant-engine.com/", k: "link" },
    { label: "Engage hyperdrive", href: "#warp", k: "fun" }
  ];

  function initCmdk() {
    var overlay = document.createElement("div");
    overlay.id = "cmdk";
    overlay.innerHTML =
      '<div class="cmdk-panel" role="dialog" aria-label="Command palette">' +
      '<input type="text" placeholder="Type to search — pages, papers, links…" aria-label="Search">' +
      '<div class="cmdk-list"></div></div>';
    document.body.appendChild(overlay);

    var input = overlay.querySelector("input");
    var list = overlay.querySelector(".cmdk-list");
    var sel = 0, filtered = CMD_ITEMS;

    function render() {
      if (!filtered.length) { list.innerHTML = '<div class="cmdk-empty">no results_</div>'; return; }
      list.innerHTML = filtered.map(function (it, i) {
        return '<div class="cmdk-item' + (i === sel ? " sel" : "") + '" data-i="' + i + '">' +
          '<span class="k">' + it.k + "</span><span>" + it.label + "</span></div>";
      }).join("");
      var s = list.querySelector(".sel");
      if (s && s.scrollIntoView) s.scrollIntoView({ block: "nearest" });
    }
    function open() { overlay.classList.add("open"); input.value = ""; filtered = CMD_ITEMS; sel = 0; render(); input.focus(); }
    function close() { overlay.classList.remove("open"); }
    function go(item) {
      close();
      if (item.href === "#warp") {
        WARP.target = 1; document.body.classList.add("warp"); toast("⚡ hyperdrive engaged");
        setTimeout(function () { WARP.target = 0; document.body.classList.remove("warp"); }, 4500);
        return;
      }
      if (/^https?:|^mailto:/.test(item.href)) window.open(item.href, item.href.indexOf("mailto:") === 0 ? "_self" : "_blank");
      else if (reducedMotion) location.href = item.href;
      else { document.body.classList.add("leaving"); setTimeout(function () { location.href = item.href; }, 300); }
    }

    input.addEventListener("input", function () {
      var q = input.value.toLowerCase().trim();
      filtered = CMD_ITEMS.filter(function (it) { return it.label.toLowerCase().indexOf(q) !== -1; });
      sel = 0; render();
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { sel = Math.min(sel + 1, filtered.length - 1); render(); e.preventDefault(); }
      else if (e.key === "ArrowUp") { sel = Math.max(sel - 1, 0); render(); e.preventDefault(); }
      else if (e.key === "Enter" && filtered[sel]) go(filtered[sel]);
    });
    list.addEventListener("click", function (e) {
      var item = e.target.closest(".cmdk-item");
      if (item) go(filtered[+item.getAttribute("data-i")]);
    });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    document.addEventListener("keydown", function (e) {
      var typing = /input|textarea/i.test(document.activeElement && document.activeElement.tagName);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); overlay.classList.contains("open") ? close() : open(); }
      else if (e.key === "/" && !typing) { e.preventDefault(); open(); }
      else if (e.key === "Escape") close();
    });
    document.querySelectorAll(".cmdk-btn").forEach(function (b) { b.addEventListener("click", open); });
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    initBackground();
    initTransitions();
    initCursor();
    initNav();
    initProgress();
    initReveal();
    initScramble();
    initTyping();
    initCounters();
    initSkillBars();
    initTilt();
    initMagnetic();
    initSpotlight();
    initHeroParallax();
    initSpy();
    initAbstracts();
    initCopy();
    initFilters();
    initLightbox();
    initCarousels();
    initReadTime();
    initClock();
    initResearchMaps();
    initCmdk();
    initEggs();
  });
})();
