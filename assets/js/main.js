/* Jerick Shi — site interactions
   Starfield, scroll reveals, typing effect, counters, command palette,
   lightbox, carousel, tilt cards, filters. No dependencies. */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- starfield background ---------- */
  function initStarfield() {
    var canvas = document.getElementById("starfield");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var stars = [];
    var mouse = { x: -9999, y: -9999 };
    var w, h, dpr;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(160, Math.floor((w * h) / 9000));
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.4 + 0.3,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          tw: Math.random() * Math.PI * 2
        });
      }
    }

    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      var linkDist = 110;
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        if (s.y > h + 10) s.y = -10;
        var twinkle = 0.45 + 0.4 * Math.sin(t / 900 + s.tw);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(155, 175, 255," + twinkle * 0.7 + ")";
        ctx.fill();

        // connect to mouse
        var dx = s.x - mouse.x, dy = s.y - mouse.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < linkDist) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = "rgba(91,140,255," + (1 - d / linkDist) * 0.25 + ")";
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
      // sparse links between stars
      for (var a = 0; a < stars.length; a += 3) {
        for (var b = a + 3; b < stars.length; b += 7) {
          var ddx = stars[a].x - stars[b].x, ddy = stars[a].y - stars[b].y;
          var dd = ddx * ddx + ddy * ddy;
          if (dd < 5600) {
            ctx.beginPath();
            ctx.moveTo(stars[a].x, stars[a].y);
            ctx.lineTo(stars[b].x, stars[b].y);
            ctx.strokeStyle = "rgba(120,130,255,0.06)";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener("pointerleave", function () {
      mouse.x = -9999; mouse.y = -9999;
    });

    resize();
    if (reducedMotion) {
      // draw one static frame
      var t0 = 0;
      ctx.clearRect(0, 0, w, h);
      stars.forEach(function (s) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(155,175,255,0.5)";
        ctx.fill();
      });
    } else {
      requestAnimationFrame(frame);
    }
  }

  /* ---------- scroll progress bar ---------- */
  function initProgress() {
    var bar = document.getElementById("progress");
    if (!bar) return;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = pct + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || reducedMotion) {
      els.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- typing effect ---------- */
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
        if (ci === phrase.length) {
          deleting = true;
          setTimeout(tick, 2100);
          return;
        }
        setTimeout(tick, 38 + Math.random() * 40);
      } else {
        ci--;
        target.textContent = phrase.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          setTimeout(tick, 350);
          return;
        }
        setTimeout(tick, 18);
      }
    }
    setTimeout(tick, 500);
  }

  /* ---------- animated counters ---------- */
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
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          animate(en.target);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------- skill bars ---------- */
  function initSkillBars() {
    var fills = document.querySelectorAll(".skill .fill");
    if (!fills.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.width = en.target.getAttribute("data-w") + "%";
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    fills.forEach(function (el) { io.observe(el); });
  }

  /* ---------- tilt cards ---------- */
  function initTilt() {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    document.querySelectorAll(".card.tilt").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "perspective(800px) rotateY(" + px * 5 + "deg) rotateX(" + -py * 5 + "deg) translateY(-4px)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ---------- abstract toggles ---------- */
  function initAbstracts() {
    document.querySelectorAll("[data-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = document.getElementById(btn.getAttribute("data-toggle"));
        if (!target) return;
        var open = target.classList.toggle("open");
        btn.textContent = open ? "Hide abstract" : "Abstract";
      });
    });
  }

  /* ---------- copy bibtex ---------- */
  function initCopy() {
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = document.getElementById(btn.getAttribute("data-copy"));
        if (!src) return;
        navigator.clipboard.writeText(src.textContent.trim()).then(function () {
          var old = btn.textContent;
          btn.textContent = "Copied ✓";
          setTimeout(function () { btn.textContent = old; }, 1600);
        });
      });
    });
  }

  /* ---------- project filters ---------- */
  function initFilters() {
    var bar = document.querySelector(".filter-bar");
    if (!bar) return;
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      document.querySelectorAll("[data-tags]").forEach(function (item) {
        var show = f === "all" || item.getAttribute("data-tags").split(" ").indexOf(f) !== -1;
        item.style.display = show ? "" : "none";
      });
    });
  }

  /* ---------- lightbox ---------- */
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
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") box.classList.remove("open");
    });
  }

  /* ---------- carousels ---------- */
  function initCarousels() {
    document.querySelectorAll(".carousel").forEach(function (car) {
      var imgs;
      try { imgs = JSON.parse(car.getAttribute("data-images")); } catch (e) { return; }
      var frameImg = car.querySelector(".frame img");
      var dotsWrap = car.querySelector(".dots");
      var idx = 0;

      imgs.forEach(function (_, i) {
        var d = document.createElement("button");
        d.className = "dot" + (i === 0 ? " active" : "");
        d.setAttribute("aria-label", "Photo " + (i + 1));
        d.addEventListener("click", function () { go(i); });
        dotsWrap.appendChild(d);
      });

      function go(i) {
        idx = (i + imgs.length) % imgs.length;
        frameImg.style.opacity = "0";
        setTimeout(function () {
          frameImg.src = imgs[idx];
          frameImg.style.opacity = "1";
        }, 280);
        dotsWrap.querySelectorAll(".dot").forEach(function (d, j) {
          d.classList.toggle("active", j === idx);
        });
      }

      car.querySelector(".c-prev").addEventListener("click", function () { go(idx - 1); });
      car.querySelector(".c-next").addEventListener("click", function () { go(idx + 1); });
    });
  }

  /* ---------- mobile nav ---------- */
  function initNav() {
    var burger = document.querySelector(".nav-burger");
    var links = document.querySelector(".nav-links");
    if (burger && links) {
      burger.addEventListener("click", function () { links.classList.toggle("open"); });
    }
    // mark active link
    var path = location.pathname.replace(/index\.html$/, "");
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === "/" ? path === "/" : path.indexOf(href.replace(/\/$/, "")) === 0 && href !== "/") {
        a.classList.add("active");
      }
    });
  }

  /* ---------- command palette ---------- */
  var CMD_ITEMS = [
    { label: "Home / About", href: "/", k: "go" },
    { label: "Research & Publications", href: "/publications/", k: "go" },
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
    { label: "Email — junkais@andrew.cmu.edu", href: "mailto:junkais@andrew.cmu.edu", k: "link" },
    { label: "Quant Engine — join waitlist", href: "https://quant-engine.com/", k: "link" }
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
      if (!filtered.length) {
        list.innerHTML = '<div class="cmdk-empty">no results_</div>';
        return;
      }
      list.innerHTML = filtered.map(function (it, i) {
        return '<div class="cmdk-item' + (i === sel ? " sel" : "") + '" data-i="' + i + '">' +
          '<span class="k">' + it.k + "</span><span>" + it.label + "</span></div>";
      }).join("");
    }

    function open() {
      overlay.classList.add("open");
      input.value = "";
      filtered = CMD_ITEMS;
      sel = 0;
      render();
      input.focus();
    }

    function close() { overlay.classList.remove("open"); }

    function go(item) {
      close();
      if (/^https?:|^mailto:/.test(item.href)) {
        window.open(item.href, item.href.indexOf("mailto:") === 0 ? "_self" : "_blank");
      } else {
        location.href = item.href;
      }
    }

    input.addEventListener("input", function () {
      var q = input.value.toLowerCase().trim();
      filtered = CMD_ITEMS.filter(function (it) {
        return it.label.toLowerCase().indexOf(q) !== -1;
      });
      sel = 0;
      render();
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { sel = Math.min(sel + 1, filtered.length - 1); render(); e.preventDefault(); }
      else if (e.key === "ArrowUp") { sel = Math.max(sel - 1, 0); render(); e.preventDefault(); }
      else if (e.key === "Enter" && filtered[sel]) { go(filtered[sel]); }
    });

    list.addEventListener("click", function (e) {
      var item = e.target.closest(".cmdk-item");
      if (item) go(filtered[+item.getAttribute("data-i")]);
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });

    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        overlay.classList.contains("open") ? close() : open();
      } else if (e.key === "Escape") {
        close();
      }
    });

    document.querySelectorAll(".cmdk-btn").forEach(function (b) {
      b.addEventListener("click", open);
    });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initStarfield();
    initProgress();
    initReveal();
    initTyping();
    initCounters();
    initSkillBars();
    initTilt();
    initAbstracts();
    initCopy();
    initFilters();
    initLightbox();
    initCarousels();
    initNav();
    initCmdk();
  });
})();
