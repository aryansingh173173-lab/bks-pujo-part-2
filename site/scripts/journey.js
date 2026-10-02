(function () {
  "use strict";

  /* The three-stop journey: the homepage map, the stop bar at the top of each
     chapter page, mid-page hints, and the "next stop" push at the end of every
     page. The route is fixed so nobody reaches a dead end:
     home → Puja & Integrated Farming → Participate & Stories → visit. */

  var ORDER = ["puja", "participate"];

  var STOPS = {
    puja: { href: "#puja", img: "assets/puja-2025/aarti-procession-2025.jpg", shape: "circle" },
    participate: { href: "#participate", img: "assets/stories/2026/khuti-puja-4.jpg", shape: "block" }
  };

  var NEXT = {
    home: "puja",
    puja: "participate",
    mission: "participate",
    visit: "participate",
    participate: "visit"
  };

  var HINTS = {
    "league-site": { href: "https://krl-site.vercel.app/", icon: "out", external: true },
    "puja-stories": { href: "#memories", icon: "play" },
    "puja-ifs": { href: "#ifs", icon: "leaf" },
    "ifs-demo": { href: "#demo", icon: "pin" },
    "ifs-seed": { href: "#fund", icon: "seed" },
    "participate-nominate": { href: "https://krl-site.vercel.app/", icon: "out", external: true }
  };

  var COPY = {
    en: {
      mapKicker: "Your path",
      mapTitle: "Explore the Puja in two steps.",
      mapLede: "Each page leads you to the next.",
      stop: "Stop",
      of: "of",
      nextKicker: "Next stop",
      jump: "Or jump to",
      barLabel: "Your path through the Puja",
      stops: {
        league: { short: "Krishi Ratna League", title: "Krishi Ratna League", line: "Seven awards for farmers. Nominate a farmer, or yourself.", cta: "Explore the League" },
        puja: { short: "Puja & Farming", title: "The Puja & Integrated Farming", line: "The Puja, and a working farm with crops, animals, fish and trees.", cta: "Explore the Puja & Farming" },
        participate: { short: "Participate & Stories", title: "Participate & Stories", line: "Help start a village farm, sponsor, or volunteer. See photos from 2025 and 2026.", cta: "Find your door" }
      },
      next: {
        home: { title: "Start with the Puja.", body: "Worship, music, food, and a working farm on the Puja ground." },
        league: { title: "See the Puja where they are honoured.", body: "Worship, music, food, and a working farm." },
        puja: { title: "One farm needs one supporter.", body: "Help start a village farm, sponsor, or volunteer. Choose how you want to help." },
        mission: { title: "A big goal starts with one step.", body: "Help start a village farm, sponsor, or volunteer." },
        visit: { title: "While you are here, take part.", body: "Help start a village farm, sponsor, or volunteer." },
        participate: { title: "Now come and visit.", body: "The pandal is open to everyone, free, on every day of the Puja.", cta: "Plan your visit", alt: "Watch the stories" }
      },
      league: {
        kicker: "Stop 01 · Recognition",
        h1: "Krishi Ratna League",
        lede: "Awards for farmers in West Bengal, from Bharatiya Krishak Samaj. Anyone can nominate. Winners are honoured on stage at the Puja."
      },
      hints: {
        "league-site": { label: "Full league", text: "The Krishi Ratna League Bengal also has its own website.", link: "Open the League site" },
        "puja-stories": { label: "In photographs", text: "Photographs from the 2026 ground and the 2025 Mahotsav play as stories.", link: "Open the stories" },
        "puja-ifs": { label: "Keep going", text: "The theme is sustainable agriculture. Scroll on to see how one farm loops crop, animals, water and market.", link: "Integrated Farming" },
        "ifs-demo": { label: "On the ground", text: "This model is being built as a working farm at the Puja venue in the East Kolkata Wetlands.", link: "See the live demo" },
        "ifs-seed": { label: "The seed", text: "₹1 lakh is the proposed seed for one village farm. Nothing is collected on this website.", link: "How support works" },
        "participate-nominate": { label: "Krishi Ratna League", text: "The Krishi Ratna League is being launched through this Puja. Awards and nominations are on the League website.", link: "Visit the KRL website" }
      }
    },
    bn: {
      mapKicker: "আপনার পথ",
      mapTitle: "দুই ধাপে পুজো দেখুন।",
      mapLede: "প্রতিটি পাতা আপনাকে পরের পাতায় নিয়ে যায়।",
      stop: "ধাপ",
      of: "/",
      nextKicker: "পরের ধাপ",
      jump: "অথবা সরাসরি যান",
      barLabel: "পুজোর মধ্যে দিয়ে আপনার পথ",
      stops: {
        league: { short: "কৃষিরত্ন লিগ", title: "কৃষিরত্ন লিগ", line: "বাংলা যে কৃষকদের ছবি তোলে না, তাঁদের জন্য সাতটি পুরস্কার। একজন কৃষককে মনোনীত করুন, বা নিজেকে।", cta: "লিগ দেখুন" },
        puja: { short: "পুজো ও চাষ", title: "পুজো ও সমন্বিত চাষ", line: "আরাধনা, কারুকাজ, ঢাক আর ঘরে ফেরা, আর প্যান্ডেলের পেছনের খামার: এক জমিতে ফসল, পশু, জল আর বাজার।", cta: "পুজো ও চাষ দেখুন" },
        participate: { short: "অংশ নিন ও গল্প", title: "অংশ নিন ও গল্প", line: "একটি গ্রামের খামারের বীজ দিন, পৃষ্ঠপোষক বা স্বেচ্ছাসেবক হন, আর ২০২৫ ও ২০২৬-এর মাঠের ছবিতে পুজো দেখুন।", cta: "আপনার দরজা খুঁজুন" }
      },
      next: {
        home: { title: "পুজো দিয়ে শুরু করুন।", body: "আরাধনা, গান, খাবার, আর পুজোর মাঠে একটি চালু খামার।" },
        league: { title: "দেখুন যে জমায়েতে তাঁরা সম্মানিত হন।", body: "আরাধনা, কারুকাজ, ঘরে ফেরা। পুজোই সেই মঞ্চ।" },
        puja: { title: "একটি খামারের জন্য একজন পৃষ্ঠপোষক।", body: "খামারের বীজ দিন, পৃষ্ঠপোষক বা স্বেচ্ছাসেবক হন, মনোনয়ন দিন, আর মাঠের গল্পগুলো দেখুন। আপনার দরজা বেছে নিন।" },
        mission: { title: "বড় লক্ষ্যের শুরু একটি দরজা দিয়ে।", body: "খামারের বীজ দিন, পৃষ্ঠপোষক হন, স্বেচ্ছাসেবক হন বা একজন কৃষককে মনোনীত করুন।" },
        visit: { title: "এখানে এসে যুক্ত হন।", body: "একটি গ্রামের খামার শুরু করতে সাহায্য করুন, স্পনসর হন, বা স্বেচ্ছাসেবক হন।" },
        participate: { title: "এবার ঘুরে যান।", body: "পুজোর সব দিন প্যান্ডেল সবার জন্য খোলা, বিনামূল্যে।", cta: "আসার পরিকল্পনা করুন", alt: "গল্পগুলো দেখুন" }
      },
      league: {
        kicker: "ধাপ ০১ · স্বীকৃতি",
        h1: "কৃষিরত্ন লিগ",
        lede: "ভারতীয় কৃষক সমাজ পুরস্কার ২০২৬। পশ্চিমবঙ্গ জুড়ে কৃষক, পরিবার ও সম্প্রদায়ের পাঠানো মনোনয়ন থেকে সাতটি বিভাগ। বিজয়ীরা পুজোর সময় প্যান্ডেলের মঞ্চে সম্মানিত হন।"
      },
      hints: {
        "league-site": { label: "পুরো লিগ", text: "কৃষিরত্ন লিগ বাংলার নিজস্ব ওয়েবসাইটও আছে।", link: "লিগের সাইট খুলুন" },
        "puja-stories": { label: "ছবিতে", text: "২০২৬-এর মাঠ আর ২০২৫ মহোৎসবের ছবি গল্পের মতো চলে।", link: "গল্পগুলো খুলুন" },
        "puja-ifs": { label: "এগিয়ে চলুন", text: "থিম টেকসই কৃষি। দেখুন কীভাবে একটি খামারে ফসল, পশু, জল আর বাজার এক চক্রে বাঁধা।", link: "সমন্বিত চাষ" },
        "ifs-demo": { label: "মাঠে", text: "এই মডেল পুজোর স্থানে, পূর্ব কলকাতা জলাভূমিতে, একটি চালু খামার হিসেবে গড়ে উঠছে।", link: "লাইভ ডেমো দেখুন" },
        "ifs-seed": { label: "বীজ", text: "একটি গ্রামের খামারের প্রস্তাবিত বীজ ₹১ লক্ষ। এই ওয়েবসাইটে কোনো টাকা নেওয়া হয় না।", link: "সহায়তা কীভাবে কাজ করে" },
        "participate-nominate": { label: "কৃষিরত্ন লিগ", text: "এই পুজোর মধ্য দিয়েই কৃষিরত্ন লিগের সূচনা হচ্ছে। পুরস্কার আর মনোনয়নের কথা লিগের ওয়েবসাইটে।", link: "KRL ওয়েবসাইটে যান" }
      }
    },
    hi: {
      mapKicker: "आपका रास्ता",
      mapTitle: "दो कदमों में पूजा देखें।",
      mapLede: "हर पेज आपको अगले पेज पर ले जाता है।",
      stop: "पड़ाव",
      of: "/",
      nextKicker: "अगला पड़ाव",
      jump: "या सीधे जाएँ",
      barLabel: "पूजा में आपका रास्ता",
      stops: {
        league: { short: "कृषि रत्न लीग", title: "कृषि रत्न लीग", line: "उन किसानों के लिए सात पुरस्कार जिनकी तस्वीर बंगाल नहीं खींचता। किसी किसान को नामित करें, या स्वयं को।", cta: "लीग देखें" },
        puja: { short: "पूजा और खेती", title: "पूजा और समेकित कृषि", line: "आराधना, शिल्प, ढाक और घर वापसी, और पंडाल के पीछे का खेत: एक ज़मीन पर फसल, पशु, जल और बाज़ार।", cta: "पूजा और खेती देखें" },
        participate: { short: "भाग लें और कहानियाँ", title: "भाग लें और कहानियाँ", line: "किसी गाँव के खेत को बीज दें, प्रायोजक या स्वयंसेवक बनें, और 2025 व 2026 की ज़मीन की तस्वीरों में पूजा देखें।", cta: "अपना द्वार चुनें" }
      },
      next: {
        home: { title: "पूजा से शुरू करें।", body: "आराधना, संगीत, भोजन, और पूजा स्थल पर एक चालू खेत।" },
        league: { title: "वह जमावड़ा देखें जहाँ उनका सम्मान होता है।", body: "आराधना, शिल्प, घर वापसी। पूजा ही मंच है।" },
        puja: { title: "एक खेत को एक संरक्षक चाहिए।", body: "खेत को बीज दें, प्रायोजक या स्वयंसेवक बनें, नामांकन करें, और ज़मीन की कहानियाँ देखें। अपना द्वार चुनें।" },
        mission: { title: "बड़ा लक्ष्य एक द्वार से शुरू होता है।", body: "खेत को बीज दें, प्रायोजक बनें, स्वयंसेवक बनें या किसी किसान को नामित करें।" },
        visit: { title: "यहाँ आकर जुड़िए।", body: "एक गाँव का खेत शुरू करने में मदद करें, प्रायोजक बनें, या स्वयंसेवक बनें।" },
        participate: { title: "अब आइए, देखिए।", body: "पूजा के सभी दिनों में पंडाल सबके लिए खुला है, निःशुल्क।", cta: "आने की योजना बनाएँ", alt: "कहानियाँ देखें" }
      },
      league: {
        kicker: "पड़ाव 01 · सम्मान",
        h1: "कृषि रत्न लीग",
        lede: "भारतीय कृषक समाज पुरस्कार 2026। पश्चिम बंगाल भर के किसानों, परिवारों और समुदायों के भेजे नामांकनों से सात श्रेणियाँ। विजेताओं का पूजा के दौरान पंडाल के मंच पर सम्मान होता है।"
      },
      hints: {
        "league-site": { label: "पूरी लीग", text: "कृषि रत्न लीग बंगाल की अपनी वेबसाइट भी है।", link: "लीग की साइट खोलें" },
        "puja-stories": { label: "तस्वीरों में", text: "2026 की ज़मीन और 2025 महोत्सव की तस्वीरें कहानियों की तरह चलती हैं।", link: "कहानियाँ खोलें" },
        "puja-ifs": { label: "आगे बढ़ें", text: "विषय टिकाऊ कृषि है। देखें कैसे एक खेत में फसल, पशु, जल और बाज़ार एक चक्र में जुड़ते हैं।", link: "समेकित कृषि" },
        "ifs-demo": { label: "ज़मीन पर", text: "यह मॉडल पूजा स्थल, पूर्वी कोलकाता आर्द्रभूमि में, एक चालू खेत के रूप में बन रहा है।", link: "लाइव डेमो देखें" },
        "ifs-seed": { label: "बीज", text: "एक गाँव के खेत के लिए प्रस्तावित बीज ₹1 लाख है। इस वेबसाइट पर कुछ भी एकत्र नहीं होता।", link: "सहायता कैसे काम करती है" },
        "participate-nominate": { label: "कृषि रत्न लीग", text: "कृषि रत्न लीग की शुरुआत इसी पूजा से हो रही है। पुरस्कार और नामांकन लीग की वेबसाइट पर हैं।", link: "KRL वेबसाइट देखें" }
      }
    }
  };

  var ICONS = {
    star: "<path d='M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z'/>",
    out: "<path d='M14 4h6v6M20 4l-9 9M18 14v6H4V6h6'/>",
    play: "<path d='M7 4.5v15l12-7.5z'/>",
    leaf: "<path d='M5 19c0-8 5-14 15-14 0 10-6 15-14 15'/><path d='M5 19l7-7'/>",
    pin: "<path d='M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z'/><circle cx='12' cy='9.5' r='2.5'/>",
    seed: "<path d='M12 21v-8'/><path d='M12 13c0-4.5-3-7-7-7 0 4.5 3 7 7 7z'/><path d='M12 13c0-4.5 3-7 7-7 0 4.5-3 7-7 7z'/>"
  };

  function lang() {
    var l = (document.documentElement.lang || "en").slice(0, 2);
    return COPY[l] ? l : "en";
  }

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function num(i) {
    return (i < 9 ? "0" : "") + (i + 1);
  }

  function icon(name) {
    return "<svg viewBox='0 0 24 24' aria-hidden='true' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>" + (ICONS[name] || "") + "</svg>";
  }

  function renderMap(c) {
    var host = document.querySelector("[data-journey-map]");
    if (!host) return;
    var html =
      "<header class='journey__head'>" +
      "<p class='kicker'>" + esc(c.mapKicker) + "</p>" +
      "<h2 id='journey-h'>" + esc(c.mapTitle) + "</h2>" +
      "<p class='lede'>" + esc(c.mapLede) + "</p></header><ol class='journey__list'>";
    ORDER.forEach(function (id, i) {
      var s = STOPS[id];
      var t = c.stops[id];
      html +=
        "<li class='journey-stop journey-stop--" + s.shape + "'>" +
        "<a class='journey-stop__link journey-card' href='" + s.href + "' aria-label='" + esc(c.stop + " " + num(i) + ": " + t.title) + "'>" +
        "<span class='journey-card__pin' aria-hidden='true'></span>" +
        "<span class='journey-stop__frame'><img src='" + s.img + "' alt='' loading='lazy' decoding='async'></span>" +
        "<span class='journey-stop__body'>" +
        "<span class='journey-stop__num' aria-hidden='true'>" + num(i) + "</span>" +
        "<span class='journey-stop__title'>" + esc(t.title) + "</span>" +
        "<span class='journey-stop__line'>" + esc(t.line) + "</span>" +
        "<span class='journey-stop__cta'>" + esc(t.cta) + "</span>" +
        "</span></a></li>";
    });
    html += "</ol>";
    host.innerHTML = html;
  }

  function renderBars(c) {
    document.querySelectorAll("[data-journey-bar]").forEach(function (bar) {
      var current = bar.getAttribute("data-journey-bar");
      var idx = ORDER.indexOf(current);
      bar.setAttribute("aria-label", c.barLabel);
      var html = "<span class='journey-bar__count'>" + esc(c.stop) + " <b>" + num(idx) + "</b> " + esc(c.of) + " " + num(ORDER.length - 1) + "</span><ol class='journey-bar__list'>";
      ORDER.forEach(function (id, i) {
        var state = i < idx ? " is-done" : i === idx ? " is-current" : "";
        html +=
          "<li class='journey-bar__item" + state + "'><a href='" + STOPS[id].href + "'" + (i === idx ? " aria-current='step'" : "") + ">" +
          "<span class='journey-bar__num'>" + num(i) + "</span><span class='journey-bar__label'>" + esc(c.stops[id].short) + "</span></a></li>";
      });
      bar.innerHTML = html + "</ol>";
    });
  }

  function renderNext(c) {
    document.querySelectorAll("[data-next-stop]").forEach(function (box) {
      var from = box.getAttribute("data-next-stop");
      var to = NEXT[from];
      var copy = c.next[from] || {};
      var isVisit = to === "visit";
      var idx = ORDER.indexOf(to);
      var stop = STOPS[to];
      var href = isVisit ? "#visit" : stop.href;
      var cta = isVisit ? copy.cta : c.stops[to].cta;
      var kicker = isVisit ? c.nextKicker : c.nextKicker + " · " + num(idx) + " " + c.of + " " + num(ORDER.length - 1);
      var img = isVisit ? "assets/stories/2026/khuti-puja-1.jpg" : stop.img;

      var track = "<ol class='next-stop__track' aria-label='" + esc(c.barLabel) + "'>";
      ORDER.forEach(function (id, i) {
        var cls = isVisit || i < idx ? " is-done" : i === idx ? " is-next" : "";
        track += "<li class='" + cls.trim() + "'><a href='" + STOPS[id].href + "' title='" + esc(c.stops[id].short) + "'" +
          (i === idx ? " aria-current='step'" : "") + "><span>" + num(i) + "</span>" +
          "<span class='sr-only'> " + esc(c.stops[id].short) + "</span></a></li>";
      });
      track += "</ol>";

      var jump = ORDER.filter(function (id) { return id !== to && id !== from; }).map(function (id) {
        return "<a href='" + STOPS[id].href + "'>" + esc(c.stops[id].short) + "</a>";
      });
      if (isVisit) jump.unshift("<a href='#memories'>" + esc(copy.alt) + "</a>");

      box.innerHTML =
        "<div class='next-stop__inner'>" +
        "<div class='next-stop__copy'>" + track +
        "<p class='next-stop__kicker'>" + esc(kicker) + "</p>" +
        "<h2 class='next-stop__title'>" + esc(copy.title) + "</h2>" +
        "<p class='next-stop__body'>" + esc(copy.body) + "</p>" +
        "<a class='next-stop__cta' href='" + href + "'><span>" + esc(cta) + "</span><span class='next-stop__arrow' aria-hidden='true'>→</span></a>" +
        "<p class='next-stop__jump'><span>" + esc(c.jump) + "</span>" + jump.join("") + "</p>" +
        "</div>" +
        "<a class='next-stop__visual' href='" + href + "' tabindex='-1' aria-hidden='true'><img src='" + img + "' alt='' loading='lazy' decoding='async'></a>" +
        "</div>";
    });
  }

  function renderHints(c) {
    document.querySelectorAll("[data-hint]").forEach(function (box) {
      var id = box.getAttribute("data-hint");
      var spec = HINTS[id];
      var copy = c.hints[id];
      if (!spec || !copy) return;
      var ext = spec.external ? " target='_blank' rel='noopener noreferrer'" : "";
      box.innerHTML =
        "<span class='hint__icon'>" + icon(spec.icon) + "</span>" +
        "<p class='hint__text'><span class='hint__label'>" + esc(copy.label) + "</span>" + esc(copy.text) + "</p>" +
        "<a class='hint__link' href='" + spec.href + "'" + ext + ">" + esc(copy.link) + "<span aria-hidden='true'>" + (spec.external ? " ↗" : " →") + "</span></a>";
    });
  }

  function renderLeagueHead(c) {
    var head = document.querySelector("[data-league-head]");
    if (!head) return;
    head.innerHTML =
      "<p class='kicker'>" + esc(c.league.kicker) + "</p>" +
      "<h1>" + esc(c.league.h1) + "</h1>" +
      "<p class='lede'>" + esc(c.league.lede) + "</p>";
  }


  /* ---------- Photos on the chapter pages (collage + moving strip) ---------- */
  var M = "assets/stories/museum-2025/";
  var S = "assets/stories/2026/";
  var MEM = "assets/memories-2025/";
  var MEDIA = [
    { key: "invitation", kind: "static", imgs: ["assets/invitation/protyabortan-2026.jpg?v=1"] },
    { key: "puja-gallery", kind: "gallery", after: "[data-view='puja'] > .page-head",
      imgs: [M + "pavilion-exterior.jpg", "assets/puja-2025/aarti-procession-2025.jpg", "assets/puja-2025/conch-aarti-2025.jpg"] },
    { key: "puja-strip", kind: "strip", before: "[data-view='puja'] > .glance",
      imgs: [M + "grand-courtyard.jpg", MEM + "mem-09.jpg", M + "bamboo-gateway.jpg", MEM + "mem-10.jpg", M + "red-lit-interior.jpg", MEM + "mem-11.jpg", M + "carved-bamboo-face.jpg", MEM + "mem-26.jpg", M + "museum-sign.jpg"] },
    { key: "ifs-gallery", kind: "gallery", after: "#ifs-body .bks-ifs__wrap > header",
      imgs: [S + "site-before-3.jpg", M + "museum-04.jpg", S + "invitation-page-2.jpg"] },
    { key: "ifs-strip", kind: "strip", after: "#ifs-body .bks-ifs__wrap > .bks-ifs__block:nth-of-type(3)",
      imgs: [M + "museum-01.jpg", S + "site-work-bamboo.jpg", M + "museum-02.jpg", M + "museum-06.jpg", S + "khuti-puja-2.jpg", M + "museum-09.jpg", M + "grand-courtyard.jpg", M + "museum-12.jpg"] },
    { key: "ifs-strip-2", kind: "strip", before: "#ifs > [data-hint='ifs-demo']",
      imgs: [S + "site-before-1.jpg", M + "museum-07.jpg", S + "site-before-2.jpg", M + "museum-10.jpg", S + "site-work-bamboo.jpg", M + "museum-05.jpg"] },
    { key: "participate-gallery", kind: "gallery", after: "#participate-body > .page-head",
      imgs: [S + "khuti-puja-1.jpg", S + "khuti-puja-4.jpg", S + "environment-day-2026.jpg"] },
    { key: "participate-strip", kind: "strip", before: "[data-view='participate'] > [data-slot='participate-b']",
      imgs: [S + "khuti-puja-2.jpg", "assets/puja-2026/photo_2026-08-19_11-15-12.jpg", S + "khuti-puja-3.jpg", MEM + "mem-13.jpg", "assets/puja-2026/photo_2026-08-19_11-15-15.jpg", MEM + "mem-06.jpg", S + "protyabortan-banner.jpg", S + "site-work-bamboo.jpg"] }
  ];

  function mediaHtml(spec) {
    var img = function (src, cls) { return "<img" + (cls ? " class='" + cls + "'" : "") + " src='" + src + "' alt='' loading='lazy' decoding='async'>"; };
    var open = function (i, hidden) {
      return " data-lb='" + i + "'" + (hidden ? " aria-hidden='true'" : " role='button' tabindex='0' aria-label='" + lbLabel(i + 1, spec.imgs.length) + "'");
    };
    if (spec.kind === "gallery") {
      return "<span class='cg-tile cg-tile--a'" + open(0) + ">" + img(spec.imgs[0]) + "</span>" +
        "<span class='cg-tile cg-tile--b'" + open(1) + ">" + img(spec.imgs[1]) + "</span>" +
        "<span class='cg-tile cg-tile--c'" + open(2) + ">" + img(spec.imgs[2]) + "</span>";
    }
    var row = function (hidden) {
      return spec.imgs.map(function (src, i) { return "<span class='ps-item ps-item--" + (i % 3) + "'" + open(i, hidden) + ">" + img(src) + "</span>"; }).join("");
    };
    return "<div class='ps-track'>" + row(false) + row(true) + "</div>";
  }

  function ensureMedia() {
    MEDIA.forEach(function (spec) {
      if (spec.kind === "static") return;
      var ref = document.querySelector(spec.after || spec.before);
      if (!ref) return;
      var el = document.querySelector("[data-media='" + spec.key + "']");
      var sib = spec.after ? ref.nextElementSibling : ref.previousElementSibling;
      if (el && el === sib) return;
      if (el) el.remove();
      el = document.createElement("div");
      el.className = spec.kind === "gallery" ? "chapter-gallery" : "photo-strip";
      el.setAttribute("data-media", spec.key);
      el.innerHTML = mediaHtml(spec);
      ref.parentNode.insertBefore(el, spec.after ? ref.nextSibling : ref);
    });
  }


  /* ---------- Photo viewer: click any chapter photo to open it large ---------- */
  var LB_COPY = {
    en: { open: "Open photo", of: "of", close: "Close", prev: "Previous photo", next: "Next photo" },
    bn: { open: "ছবি খুলুন", of: "/", close: "বন্ধ করুন", prev: "আগের ছবি", next: "পরের ছবি" },
    hi: { open: "फ़ोटो खोलें", of: "/", close: "बंद करें", prev: "पिछली फ़ोटो", next: "अगली फ़ोटो" }
  };
  function lbText() { return LB_COPY[lang()] || LB_COPY.en; }
  function lbLabel(n, total) { var t = lbText(); return t.open + " " + n + " " + t.of + " " + total; }

  var lb = null, lbList = [], lbIdx = 0, lbReturn = null;
  function buildLightbox() {
    if (lb) return lb;
    lb = document.createElement("div");
    lb.className = "lb";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.hidden = true;
    lb.innerHTML =
      "<button type='button' class='lb__close' data-lb-act='close'>&times;</button>" +
      "<button type='button' class='lb__nav lb__nav--prev' data-lb-act='prev'>&#8249;</button>" +
      "<figure class='lb__fig'><img class='lb__img' alt=''><figcaption class='lb__count'></figcaption></figure>" +
      "<button type='button' class='lb__nav lb__nav--next' data-lb-act='next'>&#8250;</button>";
    document.body.appendChild(lb);
    lb.addEventListener("click", function (e) {
      var act = e.target.closest("[data-lb-act]");
      if (act) { lbAct(act.getAttribute("data-lb-act")); return; }
      if (!e.target.closest(".lb__img")) closeLightbox();
    });
    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) lbAct(dx < 0 ? "next" : "prev");
    });
    return lb;
  }
  function lbShow() {
    var t = lbText();
    lb.querySelector(".lb__img").src = lbList[lbIdx];
    lb.querySelector(".lb__count").textContent = (lbIdx + 1) + " " + t.of + " " + lbList.length;
    lb.querySelector(".lb__close").setAttribute("aria-label", t.close);
    lb.querySelector(".lb__nav--prev").setAttribute("aria-label", t.prev);
    lb.querySelector(".lb__nav--next").setAttribute("aria-label", t.next);
    var multi = lbList.length > 1;
    lb.querySelectorAll(".lb__nav").forEach(function (b) { b.hidden = !multi; });
    [lbIdx - 1, lbIdx + 1].forEach(function (i) { var im = new Image(); im.src = lbList[(i + lbList.length) % lbList.length]; });
  }
  function lbAct(act) {
    if (act === "close") return closeLightbox();
    lbIdx = (lbIdx + (act === "next" ? 1 : -1) + lbList.length) % lbList.length;
    lbShow();
  }
  function openLightbox(list, idx, from) {
    buildLightbox();
    lbList = list; lbIdx = idx; lbReturn = from;
    lbShow();
    lb.hidden = false;
    document.documentElement.classList.add("lb-open");
    requestAnimationFrame(function () { lb.classList.add("is-on"); });
    lb.querySelector(".lb__close").focus();
  }
  function closeLightbox() {
    if (!lb || lb.hidden) return;
    lb.classList.remove("is-on");
    lb.hidden = true;
    document.documentElement.classList.remove("lb-open");
    if (lbReturn && lbReturn.focus) lbReturn.focus();
  }
  function lbFromTarget(target) {
    var item = target.closest && target.closest("[data-lb]");
    if (!item) return false;
    var box = item.closest("[data-media]");
    var spec = box && MEDIA.filter(function (m) { return m.key === box.getAttribute("data-media"); })[0];
    if (!spec) return false;
    openLightbox(spec.imgs, +item.getAttribute("data-lb"), item);
    return true;
  }
  document.addEventListener("click", function (e) {
    var opener = e.target.closest && e.target.closest("[data-lb-open]");
    if (opener) {
      var item = document.querySelector("[data-media='" + opener.getAttribute("data-lb-open") + "'] [data-lb]");
      if (item && lbFromTarget(item)) { lbReturn = opener; e.preventDefault(); }
      return;
    }
    if (lbFromTarget(e.target)) e.preventDefault();
  });
  document.addEventListener("keydown", function (e) {
    if (lb && !lb.hidden) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") lbAct("next");
      else if (e.key === "ArrowLeft") lbAct("prev");
      else if (e.key === "Tab") {
        var f = [].slice.call(lb.querySelectorAll("button:not([hidden])"));
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
      return;
    }
    if ((e.key === "Enter" || e.key === " ") && lbFromTarget(e.target)) e.preventDefault();
  });


  /* ---------- Integrated Farming: interactive farm wheel ---------- */
  var LOOP_COPY = {
    en: { hint: "Tap a part of the farm, or let the wheel turn.", feeds: "feeds", steps: [
      "Crop residue and fodder feed the animals.",
      "Animals give back dung and urine every day.",
      "Dung and residue become compost that rebuilds the soil.",
      "Healthy soil and bunds guide rain into the pond.",
      "The pond raises fish.",
      "Pond water and silt grow vegetables and fruit on the bunds.",
      "Vegetables, fruit, fish and milk reach the kitchen and the market.",
      "Income and kitchen leftovers go back into the next season’s crop."
    ] },
    bn: { hint: "খামারের যেকোনো অংশ ছুঁয়ে দেখুন, বা চাকাটা ঘুরতে দিন।", feeds: "থেকে", steps: [
      "ফসলের অবশিষ্ট আর খড় পশুর খাবার হয়।",
      "পশু রোজ গোবর আর মূত্র ফিরিয়ে দেয়।",
      "গোবর আর অবশিষ্ট কম্পোস্ট হয়ে মাটিকে আবার উর্বর করে।",
      "সুস্থ মাটি আর আল বৃষ্টির জল পুকুরে নিয়ে যায়।",
      "পুকুরে মাছ বাড়ে।",
      "পুকুরের জল আর পলিতে আলে সবজি আর ফল ফলে।",
      "সবজি, ফল, মাছ আর দুধ যায় ঘরে আর বাজারে।",
      "আয় আর রান্নাঘরের উচ্ছিষ্ট ফেরে পরের মরশুমের ফসলে।"
    ] },
    hi: { hint: "खेत के किसी भी हिस्से को छुएँ, या चक्र को घूमने दें।", feeds: "से", steps: [
      "फसल के अवशेष और चारा पशुओं का भोजन बनते हैं।",
      "पशु रोज़ गोबर और मूत्र लौटाते हैं।",
      "गोबर और अवशेष कंपोस्ट बनकर मिट्टी को फिर उपजाऊ करते हैं।",
      "स्वस्थ मिट्टी और मेड़ बारिश का पानी तालाब तक ले जाती हैं।",
      "तालाब में मछली बढ़ती है।",
      "तालाब के पानी और गाद से मेड़ पर सब्ज़ी और फल उगते हैं।",
      "सब्ज़ी, फल, मछली और दूध घर और बाज़ार तक पहुँचते हैं।",
      "आय और रसोई का बचा हुआ अगले मौसम की फसल में लौटता है।"
    ] }
  };
  var LOOP_ICONS = ["🌾", "🐄", "♻️", "🟫", "💧", "🐟", "🥬", "🏠"];

  function buildWheel(list) {
    var l = lang();
    var c = LOOP_COPY[l] || LOOP_COPY.en;
    var labels = Array.prototype.map.call(list.querySelectorAll("li"), function (li) { return li.textContent.trim(); });
    if (labels.length < 3) return null;
    var n = labels.length;
    var wrap = document.createElement("div");
    wrap.className = "farm-wheel";
    wrap.setAttribute("data-media", "ifs-wheel");
    var R = 41; // % radius of the node ring
    var nodes = labels.map(function (lab, i) {
      var a = (i / n) * Math.PI * 2 - Math.PI / 2;
      var x = 50 + R * Math.cos(a), y = 50 + R * Math.sin(a);
      return "<button type='button' class='fw-node' data-i='" + i + "' style='left:" + x.toFixed(2) + "%;top:" + y.toFixed(2) + "%'>" +
        "<span class='fw-node__icon' aria-hidden='true'>" + LOOP_ICONS[i % LOOP_ICONS.length] + "</span>" +
        "<span class='fw-node__label'>" + esc(lab) + "</span></button>";
    }).join("");
    wrap.innerHTML =
      "<div class='fw-stage'>" +
      "<svg class='fw-ring' viewBox='0 0 100 100' aria-hidden='true'>" +
      "<circle cx='50' cy='50' r='" + R + "' class='fw-track'/>" +
      "<circle cx='50' cy='50' r='" + R + "' class='fw-dash'/>" +
      "<path id='fw-path' d='M50," + (50 - R) + " a" + R + "," + R + " 0 1,1 0," + 2 * R + " a" + R + "," + R + " 0 1,1 0,-" + 2 * R + "' fill='none'/>" +
      [0, 1, 2, 3].map(function (k) {
        return "<circle r='1.1' class='fw-seed'><animateMotion dur='12s' repeatCount='indefinite' begin='-" + (k * 3) + "s'><mpath href='#fw-path'/></animateMotion></circle>";
      }).join("") +
      "</svg>" + nodes +
      "<div class='fw-core' aria-live='polite'><p class='fw-core__flow'></p><p class='fw-core__text'></p></div>" +
      "</div><p class='fw-hint'>" + esc(c.hint) + "</p>";

    var idx = 0, timer = 0, idleTimer = 0;
    var flow = wrap.querySelector(".fw-core__flow");
    var text = wrap.querySelector(".fw-core__text");
    var btns = wrap.querySelectorAll(".fw-node");
    function select(i) {
      idx = (i + n) % n;
      Array.prototype.forEach.call(btns, function (b, k) {
        b.classList.toggle("is-on", k === idx);
        b.classList.toggle("is-next", k === (idx + 1) % n);
        b.setAttribute("aria-pressed", String(k === idx));
      });
      flow.textContent = labels[idx] + "  →  " + labels[(idx + 1) % n];
      text.textContent = c.steps[idx] || "";
      wrap.style.setProperty("--turn", (idx / n * 360) + "deg");
    }
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function play() { if (reduce) return; clearInterval(timer); timer = setInterval(function () { select(idx + 1); }, 3200); }
    function pause() { clearInterval(timer); clearTimeout(idleTimer); idleTimer = setTimeout(play, 9000); }
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener("click", function () { select(+b.getAttribute("data-i")); pause(); });
      b.addEventListener("pointerenter", function (e) { if (e.pointerType !== "touch") { select(+b.getAttribute("data-i")); pause(); } });
      b.addEventListener("focus", function () { select(+b.getAttribute("data-i")); pause(); });
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { if (e[0].isIntersecting) play(); else clearInterval(timer); }, { threshold: 0.3 }).observe(wrap);
    } else play();
    select(0);
    list.classList.add("fw-source");
    return wrap;
  }

  function ensureWheel() {
    var list = document.querySelector("#ifs-body .bks-ifs__loop");
    if (!list) return;
    var old = document.querySelector("[data-media='ifs-wheel']");
    if (old && old.previousElementSibling === list && old.getAttribute("data-lang") === lang()) return;
    if (old) old.remove();
    var w = buildWheel(list);
    if (!w) return;
    w.setAttribute("data-lang", lang());
    list.parentNode.insertBefore(w, list.nextSibling);
  }

  var lastLang = "";
  function render() {
    var l = lang();
    if (l === lastLang) return;
    lastLang = l;
    var c = COPY[l];
    renderMap(c);
    renderBars(c);
    renderNext(c);
    renderHints(c);
    renderLeagueHead(c);
  }

  function boot() {
    render();
    ensureMedia();
    ensureWheel();
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    // Page bodies are re-rendered on language change; put the photos back each time.
    var t = 0;
    new MutationObserver(function (list) {
      var ours = list.every(function (m) {
        return Array.prototype.every.call(m.addedNodes, function (n) { return n.nodeType === 1 && n.hasAttribute("data-media"); }) &&
          Array.prototype.every.call(m.removedNodes, function (n) { return n.nodeType === 1 && n.hasAttribute && n.hasAttribute("data-media"); });
      });
      if (ours) return;
      clearTimeout(t);
      t = setTimeout(function () { ensureMedia(); ensureWheel(); }, 80);
    }).observe(document.getElementById("main") || document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
