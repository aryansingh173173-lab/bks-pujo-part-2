/* Puja Progress page: the thread and pinned bar follow the scroll, tiles fade in,
   and a viewer shows photos and clips. Without this script every tile is a plain
   link to the full photo or video, and the page reads top to bottom as is. */
(function () {
  "use strict";
  var section = document.getElementById("puja-progress");
  if (!section) return;
  var steps = [].slice.call(section.querySelectorAll(".pj-step"));
  var list = section.querySelector(".pj__steps");
  var meter = section.querySelector(".pj__meter");
  var now = section.querySelector(".pj__now");
  var tiles = [].slice.call(section.querySelectorAll("[data-pg]"));
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var COPY = {
    en: { of: "of", close: "Close", prev: "Previous", next: "Next" },
    bn: { of: "/", close: "বন্ধ করুন", prev: "আগের", next: "পরের" },
    hi: { of: "/", close: "बंद करें", prev: "पिछला", next: "अगला" }
  };
  function text() { return COPY[document.documentElement.lang] || COPY.en; }
  function clamp(n) { return n < 0 ? 0 : n > 1 ? 1 : n; }

  /* ---------- The pinned bar sits just under the site header ---------- */
  function pinBelowHeader() {
    var header = document.querySelector(".site-header");
    var bottom = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
    section.style.setProperty("--pj-top", Math.round(bottom) + "px");
  }

  /* ---------- Scroll: fill the thread, light the dates, move the bar ---------- */
  function update() {
    if (!section.offsetParent) return;
    var line = innerHeight * 0.55;
    var box = list.getBoundingClientRect();
    list.style.setProperty("--pj-line", (clamp((line - box.top) / box.height) * 100).toFixed(2) + "%");
    var active = 0;
    steps.forEach(function (step, i) { if (step.getBoundingClientRect().top <= line) active = i; });
    steps.forEach(function (step, i) {
      step.classList.toggle("is-on", i === active);
      step.classList.toggle("is-past", i < active);
    });
    var step = steps[active];
    meter.style.setProperty("--pj-fill", step.getAttribute("data-pj-pct") + "%");
    now.textContent = step.querySelector("time").textContent.trim();
  }

  var ticking = false;
  function queue() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; pinBelowHeader(); update(); });
  }
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue);
  addEventListener("hashchange", queue);
  addEventListener("popstate", queue);
  // A language switch rewrites the date labels.
  new MutationObserver(queue).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  queue();

  /* ---------- Entrance ---------- */
  if (!reduce && "IntersectionObserver" in window) {
    section.classList.add("pj--js");
    var seen = new IntersectionObserver(function (entries) {
      var batch = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.classList.contains("pj-tile")) el.style.setProperty("--pj-d", (batch++ * 0.06).toFixed(2) + "s");
        el.classList.add("is-seen");
        seen.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    tiles.forEach(function (t) { seen.observe(t); });
    steps.forEach(function (s) { seen.observe(s); });
  }

  /* ---------- Viewer ---------- */
  var box = null, idx = 0, opener = null;

  function build() {
    if (box) return box;
    box = document.createElement("div");
    box.className = "lb pg-lb";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.hidden = true;
    box.innerHTML =
      "<button type='button' class='lb__close' data-pg-act='close'>&times;</button>" +
      "<button type='button' class='lb__nav lb__nav--prev' data-pg-act='prev'>&#8249;</button>" +
      "<figure class='lb__fig'><div class='pg-lb__slot'></div>" +
      "<figcaption class='pg-lb__cap'></figcaption><p class='lb__count'></p></figure>" +
      "<button type='button' class='lb__nav lb__nav--next' data-pg-act='next'>&#8250;</button>";
    document.body.appendChild(box);
    box.addEventListener("click", function (e) {
      var act = e.target.closest("[data-pg-act]");
      if (act) { go(act.getAttribute("data-pg-act")); return; }
      if (!e.target.closest(".lb__img, .pg-lb__cap")) close();
    });
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) go(dx < 0 ? "next" : "prev");
    });
    return box;
  }

  function render() {
    var t = text();
    var tile = tiles[idx];
    var step = tile.closest(".pj-step");
    var slot = box.querySelector(".pg-lb__slot");
    var old = slot.querySelector("video");
    if (old) old.pause();
    var alt = tile.querySelector("img").getAttribute("alt") || "";
    var el;
    if (tile.getAttribute("data-pg") === "video") {
      el = document.createElement("video");
      el.className = "lb__img";
      el.controls = true;
      el.playsInline = true;
      el.autoplay = true;
      el.muted = true;
      el.preload = "auto";
      el.poster = tile.getAttribute("data-poster") || "";
      el.src = tile.getAttribute("href");
      el.setAttribute("aria-label", alt);
    } else {
      el = document.createElement("img");
      el.className = "lb__img";
      el.alt = alt;
      el.src = tile.getAttribute("href");
    }
    slot.replaceChildren(el);
    var cap = box.querySelector(".pg-lb__cap");
    cap.replaceChildren();
    var b = document.createElement("b");
    b.textContent = step.querySelector("time").textContent.trim();
    cap.appendChild(b);
    cap.appendChild(document.createTextNode(step.querySelector("h2").textContent.trim()));
    box.querySelector(".lb__count").textContent = (idx + 1) + " " + t.of + " " + tiles.length;
    box.querySelector(".lb__close").setAttribute("aria-label", t.close);
    box.querySelector(".lb__nav--prev").setAttribute("aria-label", t.prev);
    box.querySelector(".lb__nav--next").setAttribute("aria-label", t.next);
    box.setAttribute("aria-label", cap.textContent);
    // Warm the neighbouring photos so swiping feels instant.
    [idx - 1, idx + 1].forEach(function (i) {
      var n = tiles[(i + tiles.length) % tiles.length];
      if (n.getAttribute("data-pg") === "photo") { var im = new Image(); im.src = n.getAttribute("href"); }
    });
  }

  function go(act) {
    if (act === "close") return close();
    idx = (idx + (act === "next" ? 1 : -1) + tiles.length) % tiles.length;
    render();
  }

  function open(i, from) {
    build();
    idx = i;
    opener = from;
    render();
    box.hidden = false;
    document.documentElement.classList.add("lb-open");
    requestAnimationFrame(function () { box.classList.add("is-on"); });
    box.querySelector(".lb__close").focus();
  }

  function close() {
    if (!box || box.hidden) return;
    var v = box.querySelector("video");
    if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
    box.classList.remove("is-on");
    box.hidden = true;
    document.documentElement.classList.remove("lb-open");
    if (opener && opener.focus) opener.focus();
  }

  section.addEventListener("click", function (e) {
    var tile = e.target.closest("[data-pg]");
    if (!tile || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    open(tiles.indexOf(tile), tile);
  });

  document.addEventListener("keydown", function (e) {
    if (!box || box.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowRight") go("next");
    else if (e.key === "ArrowLeft") go("prev");
    else if (e.key === "Tab") {
      var f = [].slice.call(box.querySelectorAll("button:not([hidden]), video"));
      var i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
})();
