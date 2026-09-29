(function () {
  "use strict";

  /* BKS network links: BKS Bengal, Krishi Ratna League Bengal, KRL Media Connect.
     1. Hovering (or keyboard-focusing) any link to these sites shows a preview card.
     2. On pages whose menus do not already list them, the three links are added to
        the desktop nav and the mobile drawer (drawer entries carry a one-line summary,
        since touch screens cannot hover).
     Self-contained: styles are injected, so the same file works on every vertical.
     Add data-inject="false" on the <script> tag to only decorate existing links. */

  if (window.__bksNetwork) return;
  window.__bksNetwork = true;

  var SCRIPT = document.currentScript;
  var INJECT = !(SCRIPT && SCRIPT.getAttribute("data-inject") === "false");

  var SITES = [
    {
      id: "bks",
      url: "https://bks-pujo-demo.vercel.app/",
      host: "bks-pujo-demo.vercel.app",
      img: "https://bks-pujo-demo.vercel.app/og-image.png",
      copy: {
        en: {
          name: "BKS Bengal",
          title: "BKS Bengal · Puja 2026 partner briefing",
          desc: "The founding partnership briefing for Bharatiya Krishak Samaj Pujo 2026: a Durga Puja about the hands that grow the food.",
          short: "Puja 2026 partner briefing: the pandal, the farm, the partnership.",
          facts: ["A pandal built around the farming year, in the East Kolkata Wetlands", "A working integrated farm on the same ground", "What sponsors and partners put their name on"]
        },
        bn: {
          name: "BKS বাংলা",
          title: "BKS বাংলা · পুজো ২০২৬ অংশীদার ব্রিফিং",
          desc: "ভারতীয় কৃষক সমাজ পুজো ২০২৬-এর প্রতিষ্ঠাতা অংশীদারি ব্রিফিং: যে হাত খাবার ফলায়, তাদের নিয়ে একটি দুর্গাপুজো।",
          short: "পুজো ২০২৬ অংশীদার ব্রিফিং: প্যান্ডেল, খামার, অংশীদারি।",
          facts: ["চাষের বছর ঘিরে গড়া প্যান্ডেল, পূর্ব কলকাতা জলাভূমিতে", "একই মাঠে একটি চালু সমন্বিত খামার", "পৃষ্ঠপোষক ও অংশীদাররা কীসে নাম দেন"]
        },
        hi: {
          name: "BKS बंगाल",
          title: "BKS बंगाल · पूजा 2026 साझेदार ब्रीफ़िंग",
          desc: "भारतीय कृषक समाज पूजा 2026 की संस्थापक साझेदारी ब्रीफ़िंग: उन हाथों की दुर्गा पूजा जो अन्न उगाते हैं।",
          short: "पूजा 2026 साझेदार ब्रीफ़िंग: पंडाल, खेत, साझेदारी।",
          facts: ["खेती के वर्ष के इर्द-गिर्द बना पंडाल, पूर्वी कोलकाता आर्द्रभूमि में", "उसी मैदान पर एक चालू समेकित खेत", "प्रायोजक और साझेदार किस पर अपना नाम देते हैं"]
        }
      }
    },
    {
      id: "krl",
      url: "https://krl-site.vercel.app/",
      host: "krl-site.vercel.app",
      img: "https://krl-site.vercel.app/assets/krl-farm-hero.png",
      copy: {
        en: {
          name: "Krishi Ratna League",
          title: "Krishi Ratna League Bengal",
          desc: "A farmer-first league for 5,000 model farms across Bengal: training, technology, teamwork and recognition.",
          short: "A league for 5,000 model farms across Bengal.",
          facts: ["294 constituencies · 15 zonal teams", "Ways in for farmers, teams and Global Bengalis", "Bhite Mati: back a farm near your ancestral village"]
        },
        bn: {
          name: "কৃষিরত্ন লিগ",
          title: "কৃষিরত্ন লিগ বাংলা",
          desc: "বাংলা জুড়ে ৫,০০০ আদর্শ খামারের জন্য কৃষক-প্রথম লিগ: প্রশিক্ষণ, প্রযুক্তি, দলগত কাজ ও স্বীকৃতি।",
          short: "বাংলা জুড়ে ৫,০০০ আদর্শ খামারের লিগ।",
          facts: ["২৯৪ বিধানসভা কেন্দ্র · ১৫টি আঞ্চলিক দল", "কৃষক, দল ও বিশ্ব বাঙালির জন্য পথ", "ভিটে মাটি: পৈতৃক গ্রামের কাছে একটি খামারের পাশে দাঁড়ান"]
        },
        hi: {
          name: "कृषि रत्न लीग",
          title: "कृषि रत्न लीग बंगाल",
          desc: "बंगाल भर में 5,000 आदर्श खेतों के लिए किसान-प्रथम लीग: प्रशिक्षण, तकनीक, टीमवर्क और सम्मान।",
          short: "बंगाल भर में 5,000 आदर्श खेतों की लीग।",
          facts: ["294 विधानसभा क्षेत्र · 15 क्षेत्रीय टीमें", "किसानों, टीमों और वैश्विक बंगालियों के लिए रास्ते", "भिटे माटी: अपने पैतृक गाँव के पास किसी खेत का साथ दें"]
        }
      }
    },
    {
      id: "media",
      url: "https://krl-media-connect-bengal-2026.vercel.app/",
      host: "krl-media-connect-bengal-2026.vercel.app",
      img: "https://krl-media-connect-bengal-2026.vercel.app/images/og.jpg",
      copy: {
        en: {
          name: "KRL Media Connect",
          title: "KRL Media Connect · 14 September 2026",
          desc: "The launch of Krishi Ratna League Bengal at Rabindra Okakura Bhawan, Salt Lake, Kolkata.",
          short: "The 14 September 2026 launch of the League, in photos and speeches.",
          facts: ["Address by the Hon'ble Minister of Agriculture, West Bengal", "Mahila Wing acceptance by Smt. Rinku Majumder Ghosh", "Photos, speeches and video testimonials from the day"]
        },
        bn: {
          name: "KRL মিডিয়া কানেক্ট",
          title: "KRL মিডিয়া কানেক্ট · ১৪ সেপ্টেম্বর ২০২৬",
          desc: "রবীন্দ্র ওকাকুরা ভবন, সল্টলেক, কলকাতায় কৃষিরত্ন লিগ বাংলার উদ্বোধন।",
          short: "১৪ সেপ্টেম্বর ২০২৬-এ লিগের উদ্বোধন, ছবি ও বক্তৃতায়।",
          facts: ["পশ্চিমবঙ্গের মাননীয় কৃষিমন্ত্রীর বক্তব্য", "মহিলা শাখার দায়িত্ব গ্রহণ: শ্রীমতী রিঙ্কু মজুমদার ঘোষ", "সেদিনের ছবি, বক্তৃতা ও ভিডিও সাক্ষ্য"]
        },
        hi: {
          name: "KRL मीडिया कनेक्ट",
          title: "KRL मीडिया कनेक्ट · 14 सितंबर 2026",
          desc: "रवीन्द्र ओकाकुरा भवन, सॉल्ट लेक, कोलकाता में कृषि रत्न लीग बंगाल का शुभारंभ।",
          short: "14 सितंबर 2026 को लीग का शुभारंभ, तस्वीरों और भाषणों में।",
          facts: ["पश्चिम बंगाल के माननीय कृषि मंत्री का संबोधन", "महिला शाखा का दायित्व ग्रहण: श्रीमती रिंकू मजूमदार घोष", "उस दिन की तस्वीरें, भाषण और वीडियो प्रशंसापत्र"]
        }
      }
    },
    {
      id: "teams",
      url: "https://krl-teams-redesign.vercel.app/",
      host: "KRL Teams · vercel.app",
      img: "https://krl-teams-redesign.vercel.app/images/gold/bengal-sunset.png",
      copy: {
        en: {
          name: "KRL Teams",
          title: "KRL Teams · Smart Farming Command Centre",
          desc: "The team side of the League: named agri-entrepreneurs, their farms and 15 official teams across West Bengal.",
          short: "15 official teams and the agri-entrepreneurs behind them.",
          facts: ["15 official team crests, from Himalayan Giants to Sundarban Strikers", "23 districts · 294 assembly seats, mapped from state to farm", "Featured agri-entrepreneurs and their gardens"]
        },
        bn: {
          name: "KRL টিমস",
          title: "KRL টিমস · স্মার্ট ফার্মিং কমান্ড সেন্টার",
          desc: "লিগের দলের দিক: নামী কৃষি-উদ্যোক্তা, তাঁদের খামার আর পশ্চিমবঙ্গ জুড়ে ১৫টি অফিশিয়াল দল।",
          short: "১৫টি অফিশিয়াল দল ও তাদের কৃষি-উদ্যোক্তা।",
          facts: ["হিমালয়ান জায়ান্টস থেকে সুন্দরবন স্ট্রাইকার্স: ১৫টি অফিশিয়াল দল", "২৩টি জেলা · ২৯৪টি বিধানসভা আসন, রাজ্য থেকে খামার পর্যন্ত", "নির্বাচিত কৃষি-উদ্যোক্তা ও তাঁদের বাগান"]
        },
        hi: {
          name: "KRL टीम्स",
          title: "KRL टीम्स · स्मार्ट फ़ार्मिंग कमांड सेंटर",
          desc: "लीग का टीम पक्ष: नामित कृषि-उद्यमी, उनके खेत और पश्चिम बंगाल भर की 15 आधिकारिक टीमें।",
          short: "15 आधिकारिक टीमें और उनके कृषि-उद्यमी।",
          facts: ["हिमालयन जायंट्स से सुंदरबन स्ट्राइकर्स तक: 15 आधिकारिक टीमें", "23 ज़िले · 294 विधानसभा सीटें, राज्य से खेत तक", "चुने हुए कृषि-उद्यमी और उनके बगीचे"]
        }
      }
    }
  ];

  var UI = {
    en: { group: "More from BKS", opens: "Opens" },
    bn: { group: "BKS-এর আরও", opens: "খুলবে" },
    hi: { group: "BKS से और", opens: "खुलेगा" }
  };

  var CSS = [
    ".bksnet-card{position:fixed;z-index:9999;left:0;top:0;display:block;width:min(21rem,calc(100vw - 24px));background:#a8264b;color:#f8e2d8;border:1px solid rgba(245, 233, 208,.35);border-radius:14px;text-decoration:none;box-shadow:0 26px 50px -18px rgba(0,0,0,.75);opacity:0;transform:translateY(6px);transition:opacity .18s ease,transform .18s ease;pointer-events:none;font-family:'DM Sans','Hind Siliguri','Hind',system-ui,sans-serif;text-align:left}",
    ".bksnet-card.is-on{opacity:1;transform:none;pointer-events:auto}",
    ".bksnet-card.is-above{transform:translateY(-6px)}.bksnet-card.is-above.is-on{transform:none}",
    ".bksnet-card::before{content:'';position:absolute;top:-7px;left:var(--ax,50%);width:12px;height:12px;background:#a8264b;border-left:1px solid rgba(245, 233, 208,.35);border-top:1px solid rgba(245, 233, 208,.35);transform:translateX(-50%) rotate(45deg)}",
    ".bksnet-card.is-above::before{top:auto;bottom:-7px;transform:translateX(-50%) rotate(225deg)}",
    ".bksnet-card.is-side::before{top:var(--ay,30px);left:-7px;transform:translateY(-50%) rotate(-45deg)}",
    ".bksnet-card.is-side-left::before{left:auto;right:-7px;transform:translateY(-50%) rotate(135deg)}",
    ".bksnet-card.is-side,.bksnet-card.is-side.is-on{transform:none}",
    ".bksnet-card__img{display:block;width:100%;aspect-ratio:1200/560;object-fit:cover;background:#8f1d40;border-radius:13px 13px 0 0}",
    ".bksnet-card__body{padding:.85rem 1rem 1rem}",
    ".bksnet-card.is-compact .bksnet-card__img{display:none}.bksnet-card.is-compact::before{background:#a8264b}",
    ".bksnet-card__host{display:inline-block;padding:.15rem .45rem;border-radius:4px;background:rgba(245, 233, 208,.12);color:#f5e9d0;font-size:.64rem;letter-spacing:.1em;text-transform:uppercase}",
    ".bksnet-card__title{margin:.5rem 0 .3rem;font:700 1.05rem/1.2 'Outfit','Baloo Da 2','Hind',system-ui,sans-serif;color:#f5e9d0;letter-spacing:-.01em}",
    ".bksnet-card__desc{margin:0 0 .55rem;font-size:.86rem;line-height:1.45;color:#f8e2d8}",
    ".bksnet-card__facts{display:grid;gap:.3rem;margin:0 0 .75rem;padding:0;list-style:none}",
    ".bksnet-card__facts li{position:relative;padding-left:.95rem;font-size:.8rem;line-height:1.4;color:#f8e2d8}",
    ".bksnet-card__facts li::before{content:'';position:absolute;left:0;top:.45em;width:.38rem;height:.38rem;background:#f5e9d0;transform:rotate(45deg)}",
    ".bksnet-card__go{display:flex;align-items:center;justify-content:space-between;gap:.6rem;padding-top:.6rem;border-top:1px solid rgba(245, 233, 208,.18);font:700 .8rem 'Outfit',system-ui,sans-serif;color:#f5e9d0}",
    ".bksnet-card__go b{display:grid;place-items:center;flex:0 0 auto;width:1.7rem;height:1.7rem;border-radius:4px;background:#f5e9d0;color:#8f1d40}",
    ".bksnet-sep{display:inline-block;align-self:center;width:1px;height:1.4em;margin:0 .35rem;background:currentColor;opacity:.3}",
    ".bksnet-link .bksnet-ext{margin-left:.2rem;font-size:.8em;opacity:.8}",
    ".bksnet-group{margin:1.1rem 0 .3rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.7}",
    ".bksnet-desc{display:block;margin-top:.15rem;font-size:.78rem;font-weight:400;line-height:1.35;opacity:.75;white-space:normal}",
    ".nav-drawer-list a.bksnet-has-desc{flex-direction:column;align-items:flex-start;justify-content:center;padding-top:.55rem;padding-bottom:.55rem}",
    "@media (prefers-reduced-motion:reduce){.bksnet-card{transition:none}}"
  ].join("\n");

  function lang() {
    var l = (document.documentElement.lang || "en").slice(0, 2);
    return UI[l] ? l : "en";
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function siteFor(a) {
    var href = (a && a.getAttribute && a.getAttribute("href")) || "";
    for (var i = 0; i < SITES.length; i++) {
      if (href.indexOf(SITES[i].url.replace(/\/$/, "")) === 0) return SITES[i];
    }
    return null;
  }

  /* ---------- 1. links in menus ---------- */
  function navHasAll(nav) {
    var links = nav.querySelectorAll("a[href]:not([data-bksnet])");
    return SITES.every(function (s) {
      return Array.prototype.some.call(links, function (a) { return siteFor(a) === s; });
    });
  }

  function injectLinks() {
    var l = lang();
    document.querySelectorAll("nav.nav-desktop, nav.nav-drawer-list").forEach(function (nav) {
      var old = nav.querySelectorAll("[data-bksnet]");
      var removeOld = function () { Array.prototype.forEach.call(old, function (n) { n.remove(); }); };
      if (navHasAll(nav)) { removeOld(); return; }
      // Already injected in this language: leave it alone (avoids observer loops).
      if (old.length && nav.getAttribute("data-bksnet-lang") === l) return;
      removeOld();
      nav.setAttribute("data-bksnet-lang", l);
      var drawer = nav.classList.contains("nav-drawer-list");
      var frag = document.createDocumentFragment();
      var lead = document.createElement(drawer ? "p" : "span");
      lead.setAttribute("data-bksnet", "");
      if (drawer) { lead.className = "bksnet-group"; lead.textContent = UI[l].group; }
      else { lead.className = "bksnet-sep"; lead.setAttribute("aria-hidden", "true"); }
      frag.appendChild(lead);
      SITES.forEach(function (s) {
        var c = s.copy[l] || s.copy.en;
        var a = document.createElement("a");
        a.href = s.url;
        a.className = "bksnet-link" + (drawer ? " bksnet-has-desc" : "");
        a.setAttribute("data-bksnet", "");
        a.innerHTML = drawer
          ? "<span>" + esc(c.name) + "<span class='bksnet-ext' aria-hidden='true'>↗</span></span><span class='bksnet-desc'>" + esc(c.short) + "</span>"
          : esc(c.name) + "<span class='bksnet-ext' aria-hidden='true'>↗</span>";
        frag.appendChild(a);
      });
      nav.appendChild(frag);
    });
  }

  /* Existing drawer links (e.g. the main site menu) get the one-line summary too. */
  function decorateDrawer() {
    var l = lang();
    document.querySelectorAll("nav.nav-drawer-list a[href], #nav-drawer-list a[href]").forEach(function (a) {
      if (a.hasAttribute("data-bksnet")) return;
      var s = siteFor(a);
      if (!s) return;
      var c = s.copy[l] || s.copy.en;
      var d = a.querySelector(".bksnet-desc");
      if (!d) {
        d = document.createElement("span");
        d.className = "bksnet-desc";
        a.appendChild(d);
        a.classList.add("bksnet-has-desc");
      }
      if (d.textContent !== c.short) d.textContent = c.short;
    });
  }

  /* ---------- 2. hover / focus preview card ---------- */
  var card = null;
  var anchor = null;
  var showTimer = 0;
  var hideTimer = 0;

  function ensureCard() {
    if (card) return card;
    card = document.createElement("a");
    card.className = "bksnet-card";
    card.setAttribute("aria-hidden", "true");
    card.tabIndex = -1;
    document.body.appendChild(card);
    card.addEventListener("pointerenter", function () { clearTimeout(hideTimer); });
    card.addEventListener("pointerleave", scheduleHide);
    return card;
  }

  function fill(s, a) {
    var l = lang();
    var c = s.copy[l] || s.copy.en;
    ensureCard();
    card.href = a.href;
    if (a.target) card.target = a.target; else card.removeAttribute("target");
    card.rel = a.rel || "";
    card.innerHTML =
      "<img class='bksnet-card__img' src='" + s.img + "' alt='' decoding='async' onerror=\"this.style.display='none'\">" +
      "<span class='bksnet-card__body' style='display:block'>" +
      "<span class='bksnet-card__host'>" + esc(s.host) + "</span>" +
      "<span class='bksnet-card__title' style='display:block'>" + esc(c.title) + "</span>" +
      "<span class='bksnet-card__desc' style='display:block'>" + esc(c.desc) + "</span>" +
      "<ul class='bksnet-card__facts'>" + c.facts.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" +
      "<span class='bksnet-card__go'><span>" + esc(UI[l].opens + " " + s.host) + "</span><b aria-hidden='true'>↗</b></span>" +
      "</span>";
  }

  function place(a) {
    var r = a.getBoundingClientRect();
    var gap = 12;
    var menu = a.closest(".nav-drop__menu");
    card.classList.remove("is-side", "is-side-left");
    if (menu) {
      // Beside the dropdown, so the other menu items stay visible.
      var m = menu.getBoundingClientRect();
      card.classList.remove("is-compact", "is-above");
      var cw = card.offsetWidth || 336;
      var ch = card.offsetHeight || 320;
      if (ch > window.innerHeight - 24) { card.classList.add("is-compact"); ch = card.offsetHeight; }
      var toRight = m.right + gap + cw <= window.innerWidth - 8;
      var sx = toRight ? m.right + gap : m.left - gap - cw;
      var sy = Math.max(12, Math.min(r.top - 18, window.innerHeight - ch - 12));
      card.classList.add("is-side");
      if (!toRight) card.classList.add("is-side-left");
      card.style.left = Math.round(sx) + "px";
      card.style.top = Math.round(sy) + "px";
      card.style.setProperty("--ay", Math.round(r.top + r.height / 2 - sy) + "px");
      return;
    }
    // Drop the image when the full card cannot fit above or below the link.
    card.classList.remove("is-compact");
    var room = Math.max(window.innerHeight - r.bottom, r.top) - gap - 8;
    if ((card.offsetHeight || 320) > room) card.classList.add("is-compact");
    var w = card.offsetWidth || 336;
    var h = card.offsetHeight || 320;
    var left = Math.max(12, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 12));
    var below = r.bottom + gap + h <= window.innerHeight || r.top - gap - h < 0;
    var top = below ? r.bottom + gap : r.top - gap - h;
    card.classList.toggle("is-above", !below);
    card.style.left = Math.round(left) + "px";
    card.style.top = Math.round(top) + "px";
    card.style.setProperty("--ax", Math.round(Math.max(18, Math.min(w - 18, r.left + r.width / 2 - left))) + "px");
  }

  function show(a) {
    var s = siteFor(a);
    if (!s) return;
    clearTimeout(hideTimer);
    clearTimeout(showTimer);
    showTimer = setTimeout(function () {
      anchor = a;
      fill(s, a);
      card.classList.remove("is-on");
      place(a);
      requestAnimationFrame(function () {
        place(a);
        card.classList.add("is-on");
      });
    }, 120);
  }

  function hideNow() {
    clearTimeout(showTimer);
    if (card) card.classList.remove("is-on");
    var drop = anchor && anchor.closest && anchor.closest(".nav-drop");
    if (drop && !drop.matches(":hover") && !drop.contains(document.activeElement)) {
      var menu = drop.querySelector(".nav-drop__menu");
      var btn = drop.querySelector(".nav-drop__btn");
      if (menu) menu.hidden = true;
      if (btn) btn.setAttribute("aria-expanded", "false");
      drop.classList.remove("is-open");
    }
    anchor = null;
  }

  function scheduleHide() {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideNow, 220);
  }

  function linkFrom(e) {
    var t = e.target;
    return t && t.closest ? t.closest("a[href]") : null;
  }

  function bindCards() {
    var canHover = !window.matchMedia || window.matchMedia("(hover: hover)").matches;
    document.addEventListener("pointerover", function (e) {
      if (e.pointerType === "touch" || !canHover) return;
      var a = linkFrom(e);
      if (!a || a === card || !siteFor(a)) return;
      if (a !== anchor) show(a);
      else clearTimeout(hideTimer);
    });
    document.addEventListener("pointerout", function (e) {
      var a = linkFrom(e);
      if (!a || a === card || !siteFor(a)) return;
      if (e.relatedTarget && (a.contains(e.relatedTarget) || (card && card.contains(e.relatedTarget)))) return;
      scheduleHide();
    });
    document.addEventListener("focusin", function (e) {
      var a = linkFrom(e);
      if (a && a !== card && siteFor(a) && a.matches(":focus-visible")) show(a);
      else if (anchor) scheduleHide();
    });
    document.addEventListener("focusout", function (e) {
      if (siteFor(linkFrom(e))) scheduleHide();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") hideNow(); });
    window.addEventListener("scroll", function () { if (anchor) hideNow(); }, { passive: true });
    window.addEventListener("resize", function () { if (anchor) hideNow(); });
  }

  /* ---------- boot ---------- */
  var pending = 0;
  function refresh() {
    clearTimeout(pending);
    pending = setTimeout(function () {
      if (INJECT) injectLinks();
      decorateDrawer();
    }, 40);
  }

  function boot() {
    var style = document.createElement("style");
    style.id = "bksnet-style";
    style.textContent = CSS;
    document.head.appendChild(style);
    if (INJECT) injectLinks();
    decorateDrawer();
    bindCards();
    // Warm the preview images so the first hover shows a picture straight away.
    var warm = function () { SITES.forEach(function (x) { var i = new Image(); i.src = x.img; }); };
    if ("requestIdleCallback" in window) window.requestIdleCallback(warm, { timeout: 3000 });
    else setTimeout(warm, 1500);
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) {
        var m = list[i];
        if (m.type === "attributes") { refresh(); return; }
        var t = m.target;
        if (t.closest && t.closest("nav.nav-desktop, nav.nav-drawer-list") && !Array.prototype.some.call(m.addedNodes, function (n) { return n.nodeType === 1 && n.hasAttribute("data-bksnet"); })) { refresh(); return; }
      }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"], childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
