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
    en: "You are invited: Durga Puja 2026, 16 to 20 October, at Munshir Bheri, Salt Lake Sector V, Kolkata. Ma Durga invites you and your family.",
    bn: "আপনি আমন্ত্রিত: দুর্গাপূজা ২০২৬, ১৬ থেকে ২০ অক্টোবর, মুনশির ভেড়ি, সল্টলেক সেক্টর ফাইভ, কলকাতা। মা দুর্গা আপনাকে আর আপনার পরিবারকে আমন্ত্রণ জানাচ্ছেন।",
    hi: "आप आमंत्रित हैं: दुर्गा पूजा 2026, 16 से 20 अक्टूबर, मुंशीर भेड़ी, साल्ट लेक सेक्टर V, कोलकाता। माँ दुर्गा आपको और आपके परिवार को आमंत्रित करती हैं।"
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
