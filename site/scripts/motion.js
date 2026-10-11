(function () {
  "use strict";

  /* Motion layer for the Sunflare theme: scroll reveal,
     number count-up, Puja countdown, compact header, scroll progress.
     Everything is decorative, the page reads the same without it. */

  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var root = document.documentElement;

  var PUJA_START = new Date("2026-10-16T00:00:00+05:30").getTime();
  var PUJA_END = new Date("2026-10-21T00:00:00+05:30").getTime();

  var COUNT_COPY = {
    en: { label: "Countdown to Durga Puja 2026 · 16 October", d: "Days", h: "Hrs", m: "Min", s: "Sec", live: "The Puja is on: 16 to 20 October", done: "Thank you for Durga Puja 2026" },
    bn: { label: "দুর্গাপূজা ২০২৬-এর অপেক্ষা · ১৬ অক্টোবর", d: "দিন", h: "ঘণ্টা", m: "মিনিট", s: "সেকেন্ড", live: "পুজো চলছে: ১৬ থেকে ২০ অক্টোবর", done: "দুর্গাপূজা ২০২৬-এর জন্য ধন্যবাদ" },
    hi: { label: "शारदीया 2026 की उलटी गिनती · 16 अक्टूबर", d: "दिन", h: "घंटे", m: "मिनट", s: "सेकंड", live: "पूजा जारी है: 16 से 20 अक्टूबर", done: "शारदीया 2026 के लिए धन्यवाद" }
  };

  var REVEAL = [
    ".story-bridge-inner",
    ".differ .kicker",
    ".differ h2",
    ".diff-strip article",
    ".journey__head",
    ".journey-stop",
    ".nom-card",
    ".campaign-section > .kicker",
    ".campaign-section > h2",
    ".campaign-section > p",
    ".award-card",
    ".nrb-tier",
    ".tier-card",
    ".facts > div",
    ".record-stats > div",
    ".record-startups article",
    ".sponsor-why article",
    ".source-list li",
    ".leader-strip article",
    ".nrb-steps li",
    ".nrb-photo",
    ".prep-photo",
    ".record-figure",
    ".visit-map",
    ".quote-band",
    ".bks-memories__cred",
    ".stories__stage",
    ".watch__row",
    ".watch__links",
    ".doors-grid .explore-card",
    ".hint",
    ".glance",
    ".chapter-prose .layer",
    ".day-list li",
    "#ifs-body .bks-ifs__block",
    "#ifs-body .bks-ifs__card",
    ".farm-wheel",
    ".chapter-gallery",
    ".next-stop__copy",
    ".next-stop__visual"
  ].join(",");


  function lang() {
    var l = (root.lang || "en").slice(0, 2);
    return COUNT_COPY[l] ? l : "en";
  }

  /* ---------- Compact header on scroll ---------- */
  function setupScroll() {
    var header = document.querySelector(".site-header");
    var ticking = false;
    function update() {
      ticking = false;
      if (header) header.classList.toggle("is-compact", window.scrollY > 40);
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  /* ---------- Reveal on scroll ---------- */
  var io = null;
  function tagReveals(scope) {
    if (!io) return;
    var nodes = (scope || document).querySelectorAll(REVEAL);
    Array.prototype.forEach.call(nodes, function (el) {
      if (el.classList.contains("rv")) return;
      if (el.closest(".stories.is-full, .site-header, .nav-drawer")) return;
      var rect = el.getBoundingClientRect();
      // Content already on screen at load stays put, no flash.
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0 && document.readyState !== "loading" && !scope) {
        el.classList.add("rv", "is-visible");
        return;
      }
      el.classList.add("rv");
      if (el.matches(".award-card, .nrb-tier, .tier-card")) el.classList.add("rv--scale");
      var sibs = el.parentNode ? Array.prototype.filter.call(el.parentNode.children, function (c) { return c.matches(REVEAL); }) : [];
      var idx = sibs.indexOf(el);
      if (idx > 0) el.style.setProperty("--rv-delay", Math.min(idx, 6) * 0.08 + "s");
      io.observe(el);
    });
  }

  function setupReveal() {
    if (reduce || !("IntersectionObserver" in window)) return;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
          countUp(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    root.classList.add("motion-ok");
    tagReveals();
    var pending = 0;
    var mo = new MutationObserver(function () {
      clearTimeout(pending);
      pending = setTimeout(function () {
        tagReveals(document.getElementById("main"));
        countUpVisible();
      }, 60);
    });
    var main = document.getElementById("main");
    if (main) mo.observe(main, { childList: true, subtree: true });
  }

  /* ---------- Count-up numbers ---------- */
  var NUM_SEL = ".nom-card strong, .record-stats strong, .stat-value";
  function countUp(scope) {
    if (reduce || !scope || !scope.querySelectorAll) return;
    var list = scope.matches && scope.matches(NUM_SEL) ? [scope] : Array.prototype.slice.call(scope.querySelectorAll(NUM_SEL));
    list.forEach(function (el) {
      if (el.getAttribute("data-counted") === el.textContent) return;
      var m = /^(\D*?)(\d[\d,]*)(.*)$/.exec(el.textContent.trim());
      if (!m || el.children.length) return;
      var target = parseInt(m[2].replace(/,/g, ""), 10);
      if (!isFinite(target) || target < 2) return;
      var final = el.textContent;
      var useComma = m[2].indexOf(",") !== -1;
      var start = performance.now();
      var dur = 1400;
      el.setAttribute("data-counted", final);
      function frame(now) {
        var k = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - k, 3);
        var val = Math.round(target * eased);
        el.textContent = m[1] + (useComma ? val.toLocaleString("en-IN") : String(val)) + m[3];
        if (k < 1) requestAnimationFrame(frame);
        else el.textContent = final;
      }
      requestAnimationFrame(frame);
    });
  }
  function countUpVisible() {
    Array.prototype.forEach.call(document.querySelectorAll(".rv.is-visible"), function (el) {
      if (el.querySelector && el.querySelector(NUM_SEL + ":not([data-counted])")) countUp(el);
    });
  }

  /* ---------- Countdown ---------- */
  function setupCountdown() {
    var box = document.getElementById("hero-countdown");
    if (!box) return;
    var lastLang = "";
    function pad(n) { return n < 10 ? "0" + n : String(n); }
    function tick() {
      var c = COUNT_COPY[lang()];
      var now = Date.now();
      if (now >= PUJA_END) {
        box.innerHTML = "<span class='hero-countdown__live'>" + c.done + "</span>";
        box.hidden = false;
        return;
      }
      if (now >= PUJA_START) {
        box.innerHTML = "<span class='hero-countdown__live'>" + c.live + "</span>";
        box.hidden = false;
        return;
      }
      var diff = Math.floor((PUJA_START - now) / 1000);
      var d = Math.floor(diff / 86400);
      var h = Math.floor((diff % 86400) / 3600);
      var m = Math.floor((diff % 3600) / 60);
      var s = diff % 60;
      if (lastLang !== lang() || !box.querySelector("[data-cd='d']")) {
        lastLang = lang();
        box.innerHTML =
          "<span class='hero-countdown__label'>" + c.label + "</span>" +
          ["d", "h", "m", "s"].map(function (k) {
            return "<span class='hero-countdown__cell'><b data-cd='" + k + "'></b><small>" + c[k] + "</small></span>";
          }).join("");
      }
      box.querySelector("[data-cd='d']").textContent = String(d);
      box.querySelector("[data-cd='h']").textContent = pad(h);
      box.querySelector("[data-cd='m']").textContent = pad(m);
      box.querySelector("[data-cd='s']").textContent = pad(s);
      box.hidden = false;
      setTimeout(tick, 1000 - (Date.now() % 1000));
    }
    box.setAttribute("aria-live", "off");
    tick();
  }

  function boot() {
    setupScroll();
    setupReveal();
    setupCountdown();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

/* Hero video: the first thing on the page, so it loads and plays straight away. Phones and slow or data-saving connections get the 720p
   file; large screens get full 1080p. Paused while off-screen; skipped entirely
   when motion is reduced (the poster photo stays). */
(function () {
  var v = document.querySelector(".hero-video");
  if (!v) return;
  var hero = v.closest(".hero-band");
  if (hero) hero.classList.add("has-video");
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var conn = navigator.connection || {};
  var slow = conn.saveData || /(^|-)2g|3g/.test(conn.effectiveType || "");
  var small = Math.max(window.innerWidth, window.innerHeight) < 1100 || window.innerWidth < 800;
  var base = v.getAttribute(slow || small ? "data-src-sd" : "data-src-hd");
  var ext = v.canPlayType('video/webm; codecs="vp9"') ? ".webm" : ".mp4";
  var visible = true;
  var loaded = false;

  var tryPlay = function () {
    if (!loaded || !visible) return;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  };
  var start = function () {
    if (loaded) return;
    loaded = true;
    v.preload = "auto";
    v.autoplay = visible;
    v.addEventListener("canplay", tryPlay);
    v.src = base + ext + "?v=" + (v.getAttribute("data-v") || "1");
    v.load();
  };
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
      v.autoplay = visible;
      if (visible) tryPlay(); else v.pause();
    }, { threshold: 0.05 }).observe(v);
  }
  // The film is the first thing on the page, so it starts loading straight away.
  start();
})();

/* The film plays once and comes to rest on the invitation; "Watch again" replays it. */
(function () {
  var v = document.querySelector(".hero-video");
  var media = v && v.closest(".hero-media");
  if (!media) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var showCard = function () { media.classList.add("is-ended"); };
  if (reduce) { showCard(); return; }
  v.addEventListener("ended", showCard);
  v.addEventListener("error", showCard);
  var replay = media.querySelector("[data-hero-replay]");
  if (replay) replay.addEventListener("click", function () {
    media.classList.remove("is-ended");
    try { v.currentTime = 0; } catch (e) { /* not loaded yet */ }
    var p = v.play(); if (p && p.catch) p.catch(showCard);
  });
})();

/* Sharing the invitation: WhatsApp link in the visitor's language, and the phone's own share sheet. */
(function () {
  var URL_LIVE = "https://bks-pujoo.vercel.app/";
  var MSG = {
    en: "You are invited: Durga Puja 2026, 16 to 20 October, at Munshi Bheri, Mahish Bathan, Salt Lake Sector 5, Kolkata. Ma Durga invites you and your family.",
    bn: "আপনি আমন্ত্রিত: দুর্গাপূজা ২০২৬, ১৬ থেকে ২০ অক্টোবর, মুন্সি ভেড়ি, মহিষ বাথান, সল্টলেক সেক্টর ফাইভ, কলকাতা। মা দুর্গা আপনাকে আর আপনার পরিবারকে আমন্ত্রণ জানাচ্ছেন।",
    hi: "आप आमंत्रित हैं: दुर्गा पूजा 2026, 16 से 20 अक्टूबर, मुंशी भेड़ी, महिष बथान, साल्ट लेक सेक्टर 5, कोलकाता। माँ दुर्गा आपको और आपके परिवार को आमंत्रित करती हैं।"
  };
  var DONE = { en: "Link copied", bn: "লিংক কপি হয়েছে", hi: "लिंक कॉपी हो गया" };
  function lang() { var l = (document.documentElement.lang || "en").slice(0, 2); return MSG[l] ? l : "en"; }
  function update() {
    document.querySelectorAll("[data-share='whatsapp']").forEach(function (a) {
      a.href = "https://wa.me/?text=" + encodeURIComponent(MSG[lang()] + " " + URL_LIVE);
    });
  }
  update();
  new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-share='native']");
    if (!b) return;
    var data = { title: "Durga Puja 2026", text: MSG[lang()], url: URL_LIVE };
    if (navigator.share) { navigator.share(data).catch(function () {}); return; }
    var text = data.text + " " + data.url;
    var done = function () {
      var old = b.textContent; b.textContent = DONE[lang()];
      setTimeout(function () { b.textContent = old; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () {});
  });
})();

/* Find the Puja Prangan: site map / Google map tabs, copy address, floating Call button. */
(function () {
  var COPIED = { en: "Address copied", bn: "ঠিকানা কপি হয়েছে", hi: "पता कॉपी हो गया" };
  function lang() { var l = (document.documentElement.lang || "en").slice(0, 2); return COPIED[l] ? l : "en"; }

  document.addEventListener("click", function (e) {
    var tab = e.target.closest && e.target.closest("[data-findus-tab]");
    if (tab) {
      var box = tab.closest(".findus");
      var which = tab.getAttribute("data-findus-tab");
      box.querySelectorAll("[data-findus-tab]").forEach(function (t) {
        var on = t === tab; t.classList.toggle("is-on", on); t.setAttribute("aria-selected", String(on));
      });
      box.querySelectorAll("[data-findus-pane]").forEach(function (p) {
        var on = p.getAttribute("data-findus-pane") === which; p.hidden = !on; p.classList.toggle("is-on", on);
      });
      var live = box.querySelector(".findus__live");
      if (which === "live" && live && !live.querySelector("iframe")) {
        var f = document.createElement("iframe");
        f.src = live.getAttribute("data-embed");
        f.title = "Google map: Puja Prangan, Munshi Bheri, Mahish Bathan";
        f.loading = "lazy";
        f.referrerPolicy = "no-referrer-when-downgrade";
        live.appendChild(f);
      }
      return;
    }
    var copy = e.target.closest && e.target.closest("[data-copy]");
    if (copy) {
      var text = copy.getAttribute("data-copy");
      var done = function () {
        var old = copy.textContent; copy.textContent = COPIED[lang()];
        setTimeout(function () { copy.textContent = old; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () {});
      return;
    }
    var fab = document.querySelector("[data-call-fab]");
    if (!fab) return;
    var btn = fab.querySelector(".call-fab__btn"), list = fab.querySelector(".call-fab__list");
    if (e.target.closest(".call-fab__btn")) {
      var open = list.hidden;
      list.hidden = !open; btn.setAttribute("aria-expanded", String(open)); fab.classList.toggle("is-open", open);
    } else if (!e.target.closest("[data-call-fab]") && !list.hidden) {
      list.hidden = true; btn.setAttribute("aria-expanded", "false"); fab.classList.remove("is-open");
    }
  });

  // The route draws itself and the pins drop in when the map scrolls into view.
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.3 });
    document.querySelectorAll(".findus__plan-frame").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".findus__plan-frame").forEach(function (el) { el.classList.add("is-in"); });
  }
})();


/* Invitation deck, turned by scrolling: the section holds on screen while page 2
   and then page 3 slide up over the cover; then the page carries on. Arrows and
   numbers jump to the matching scroll position. Reduced motion: plain buttons. */
(function () {
  var deck = document.querySelector("[data-deck]");
  var section = deck && deck.closest(".invite");
  if (!section) return;
  var pages = [].slice.call(deck.querySelectorAll("[data-deck-page]"));
  var dots = [].slice.call(deck.querySelectorAll("[data-deck-go]"));
  var n = pages.length;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cur = 0;

  function mark(i) {
    if (i === cur && pages[i].classList.contains("is-on")) return;
    cur = i;
    pages.forEach(function (p, k) {
      p.classList.toggle("is-on", k === i);
      p.setAttribute("tabindex", k === i ? "0" : "-1");
      p.setAttribute("aria-hidden", k === i ? "false" : "true");
    });
    dots.forEach(function (d, k) {
      d.classList.toggle("is-on", k === i);
      if (k === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
    });
  }

  if (reduce) {
    // No scroll animation: show one page at a time with the buttons.
    section.classList.add("is-static");
    deck.addEventListener("click", function (e) {
      var step = e.target.closest("[data-deck-step]"), go = e.target.closest("[data-deck-go]");
      if (step) mark((cur + Number(step.getAttribute("data-deck-step")) + n) % n);
      else if (go) mark(Number(go.getAttribute("data-deck-go")));
    });
    mark(0);
    return;
  }

  section.classList.add("is-scrolly");
  var header = document.querySelector(".site-header");
  function setHeader() {
    var h = header ? Math.round(header.getBoundingClientRect().height) : 0;
    section.style.setProperty("--hdr", h + "px");
  }

  // 0..(n-1): how far through the pages the reader has scrolled
  function stepFromScroll() {
    var r = section.getBoundingClientRect();
    var range = section.offsetHeight - (window.innerHeight - (parseFloat(section.style.getPropertyValue("--hdr")) || 0));
    if (range <= 0) return 0;
    var hdr = parseFloat(section.style.getPropertyValue("--hdr")) || 0;
    var p = (hdr - r.top) / range;
    p = Math.min(1, Math.max(0, (p - 0.08) / 0.84)); // a short rest at the start and the end
    return p * (n - 1);
  }

  function paint() {
    var s = stepFromScroll();
    pages.forEach(function (pg, k) {
      var d = s - k, y = 0, sc = 1, rot = 0, op = 1, br = 1;
      if (d < -1) { y = 115; rot = 7; op = 0; }
      else if (d < 0) { y = -d * 115; rot = -d * 7; op = Math.min(1, (1 + d) * 2.5); }
      else if (k < n - 1) { var c = Math.min(1, d); sc = 1 - 0.1 * c; y = -7 * c; rot = -2.5 * c; br = 1 - 0.4 * c; op = 1 - 0.15 * c; }
      pg.style.transform = "translateY(" + y.toFixed(2) + "%) rotate(" + rot.toFixed(2) + "deg) scale(" + sc.toFixed(3) + ")";
      pg.style.opacity = op.toFixed(3);
      pg.style.filter = br < 1 ? "brightness(" + br.toFixed(3) + ")" : "";
      pg.style.zIndex = String(10 + k);
    });
    mark(Math.min(n - 1, Math.round(s)));
  }

  var queued = false;
  function onScroll() {
    if (document.hidden) { paint(); return; }   // background tabs pause animation frames
    if (!queued) { queued = true; requestAnimationFrame(function () { queued = false; paint(); }); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { setHeader(); paint(); });

  // Arrows and numbers scroll to the matching page.
  function scrollToPage(i) {
    i = Math.max(0, Math.min(n - 1, i));
    var hdr = parseFloat(section.style.getPropertyValue("--hdr")) || 0;
    var range = section.offsetHeight - (window.innerHeight - hdr);
    var p = 0.08 + 0.84 * (i / (n - 1));
    var top = section.getBoundingClientRect().top + window.scrollY - hdr + p * range;
    window.scrollTo({ top: top, behavior: "smooth" });
  }
  deck.addEventListener("click", function (e) {
    var step = e.target.closest("[data-deck-step]"), go = e.target.closest("[data-deck-go]");
    if (step) scrollToPage(cur + Number(step.getAttribute("data-deck-step")));
    else if (go) scrollToPage(Number(go.getAttribute("data-deck-go")));
  });

  setHeader();
  paint();
})();
