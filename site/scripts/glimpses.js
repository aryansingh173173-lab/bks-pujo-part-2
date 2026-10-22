/* Glimpses of Durga Puja: platform filters, YouTube cards that play in place,
   numbers that count up, and cards that rise in as they come into view. Without
   this script every card is still a plain link to the post. */
(function () {
  "use strict";
  var page = document.querySelector("[data-view='glimpses']");
  if (!page) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* The filter row pins just under the site header, whatever its height. */
  function pinBelowHeader() {
    var header = document.querySelector(".site-header");
    page.style.setProperty("--hdr", (header ? Math.round(header.getBoundingClientRect().height) : 0) + "px");
  }
  pinBelowHeader();
  window.addEventListener("resize", pinBelowHeader);
  window.addEventListener("hashchange", function () { setTimeout(pinBelowHeader, 50); });

  /* ---------- Filters ---------- */
  page.addEventListener("click", function (e) {
    var chip = e.target.closest("[data-gl-filter]");
    if (!chip) return;
    var which = chip.getAttribute("data-gl-filter");
    page.querySelectorAll("[data-gl-filter]").forEach(function (c) {
      var on = c === chip;
      c.classList.toggle("is-on", on);
      c.setAttribute("aria-pressed", String(on));
    });
    page.querySelectorAll("[data-gl-platform]").forEach(function (sec) {
      var show = which === "all" || sec.getAttribute("data-gl-platform") === which;
      sec.hidden = !show;
      if (show) sec.querySelectorAll(".gl-rise").forEach(function (el) { el.classList.add("is-in"); });
    });
  });

  /* ---------- YouTube: swap the thumbnail for the player ---------- */
  page.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-yt]");
    if (!btn) return;
    var id = btn.getAttribute("data-yt");
    var frame = document.createElement("iframe");
    frame.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&playsinline=1&modestbranding=1";
    frame.title = "YouTube video";
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    frame.allowFullscreen = true;
    frame.className = "gl-yt__frame";
    btn.parentNode.classList.add("is-playing");
    btn.replaceWith(frame);
  });

  /* ---------- Facebook: play in place with Facebook's own player ---------- */
  page.addEventListener("click", function (e) {
    var card = e.target.closest("[data-fb]");
    if (!card) return;
    e.preventDefault();
    var w = Math.max(220, Math.round(card.getBoundingClientRect().width));
    var frame = document.createElement("iframe");
    frame.src = "https://www.facebook.com/plugins/video.php?href=" + encodeURIComponent(card.getAttribute("data-fb")) +
      "&show_text=false&autoplay=true&width=" + w;
    frame.title = "Facebook video";
    frame.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    frame.setAttribute("scrolling", "no");
    frame.className = "gl-fb__frame";
    var li = card.parentNode;
    li.classList.add("is-playing");
    card.replaceWith(frame);
    var out = document.createElement("a");
    out.className = "gl-out"; out.href = card.href; out.target = "_blank"; out.rel = "noopener noreferrer";
    var go = card.querySelector(".gl-fb__go");
    out.textContent = go ? go.textContent : "Watch on Facebook ↗";
    li.appendChild(out);
  });

  /* ---------- Count up and rise in ---------- */
  function countUp(el) {
    var end = Number(el.getAttribute("data-gl-count")) || 0;
    if (reduce || !end) { el.textContent = String(end); return; }
    var t0 = null;
    function tick(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / 1100);
      el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    }
    el.textContent = "0";
    requestAnimationFrame(tick);
  }

  if (reduce || !("IntersectionObserver" in window)) {
    page.querySelectorAll(".gl-rise").forEach(function (el) { el.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      if (en.target.hasAttribute("data-gl-count")) countUp(en.target);
      else en.target.classList.add("is-in");
      io.unobserve(en.target);
    });
  }, { threshold: 0.15 });
  page.querySelectorAll(".gl-rise, [data-gl-count]").forEach(function (el) { io.observe(el); });
})();
