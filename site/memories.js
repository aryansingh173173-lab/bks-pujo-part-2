(function () {
  "use strict";

  /* Puja stories, a tap-through slideshow (tap right = next, left = back,
     hold = pause, swipe = next/previous chapter) plus a "Watch" strip of films.
     Photos from the 2026 ground and the 2025 Mahotsav. */

  var SLIDE_MS = 5200;
  var ESSAY = "https://museum-of-future-essay.vercel.app/";

  var COPY = {
    en: {
      nav: "Puja Memories of 2025",
      navStories: "Stories",
      kicker: "Stories from the ground · 2026 and 2025",
      title: "From the 2026 ground back to last year’s Puja.",
      lead: "KarmYog for the 21st Century organises Bharatiya Krishak Samaj Pujo. Follow the 2026 journey, Protyabortan, the ground, the Khuti Puja, then step back into Durga Puja Mahotsav 2025 at IIT Kharagpur Research Park.",
      note: "2025 photographs are a historical record of craft and congregation. They are not a picture of the 2026 pandal at Munshir Bheri.",
      railTitle: "Stories from the ground",
      hint: "Tap right for next, left to go back. Hold to pause. Swipe for the next story.",
      pause: "Pause slideshow",
      play: "Play slideshow",
      prev: "Previous photograph",
      next: "Next photograph",
      full: "Open full screen",
      exitFull: "Close full screen",
      of: "of",
      jump: "Photographs in this story",
      watchKicker: "Watch",
      watchTitle: "Films from the ground",
      watchLead: "Short films from the 2026 ground and the 2025 Mahotsav. Nothing plays until you tap.",
      shortsLabel: "Shorts",
      talksLabel: "Talks and footage",
      playVideo: "Play",
      essay: "Read the Museum of the Future essay",
      videos: {
        khuti: "Khuti Puja 2026",
        khuti2: "Khuti Puja 2026 · at the ground",
        puja25: "Durga Puja 2025",
        puja25viral: "Durga Puja 2025",
        vision: "Vision of 2026",
        minister: "Krishi Ratna League launch · Protyabortan: Agriculture Minister’s speech",
        rinku: "Krishi Ratna League launch · Protyabortan: Rinku Majumdar Ghosh",
        mahotsav: "Durga Puja Mahotsav 2025: reference footage"
      },
      chapters: {
        protyabortan: { title: "Protyabortan 2026", short: "Protyabortan", intro: "This Puja, a return: roots, possibility, prosperity." },
        ground: { title: "The ground, before", short: "The ground", intro: "Where the 2026 Puja is being built, beside the East Kolkata Wetlands, with Sector V on the skyline." },
        khuti: { title: "Khuti Puja", short: "Khuti Puja", intro: "The first ritual of every pandal: worshipping the bamboo pole before building begins." },
        museum: { title: "Museum of the Future · 2025", short: "Museum 2025", intro: "The 2025 Mahotsav’s walk-through installation of light, bamboo and living plants.", fallback: "Museum of the Future, Durga Puja Mahotsav 2025. Historical reference." },
        worship: { title: "Worship · 2025", short: "Worship", intro: "The idol, the dhak, and the aarti, the Puja remains a Puja." },
        atmosphere: { title: "Night and light · 2025", short: "Night", intro: "Bamboo, lanterns and a walkable pavilion after dark." },
        craft: { title: "Craft and living green · 2025", short: "Craft", intro: "Earth paths, plants and handmade structure: the biophilic language of that week." },
        people: { title: "People in the gathering · 2025", short: "People", intro: "Neighbours, stalls and public programmes inside the same festival ground." },
        all: { title: "Puja Memories of 2025", short: "Puja 2025", intro: "Every photograph from Durga Puja Mahotsav 2025 at IIT Kharagpur Research Park." }
      },
      slides: {
        banner: "Protyabortan: the 2026 Puja theme from KarmYog for the 21st Century and Bharatiya Krishak Samaj.",
        invite2: "From the 2026 invitation: the wetland and its integrated farms.",
        invite3: "From the 2026 invitation: the makers, the pandal and the people behind it.",
        envday: "World Environment Day 2026: Our land. Our future. Nature, prayer, plantation.",
        before1: "The ground as it was: a dumping site along the wetland road.",
        before2: "Before clearing began: waste piled along the path.",
        before3: "The wetland edge, with the Sector V skyline behind.",
        work: "Work in progress: the first bamboo frame on the cleared ground.",
        khuti1: "The bell rings as the Khuti Puja begins.",
        khuti2: "Guests seated beside the khuti, under banana leaves.",
        khuti3: "Offerings in hand at the ground, the city rising behind.",
        khuti4: "Under the yellow canopy on the day of the Khuti Puja.",
        m01: "Lantern canopies over planted beds.",
        m02: "A brick path through the greenery.",
        m03: "A carved totem among the lights.",
        m04: "The Museum of the Future garden bed.",
        m05: "Basket lamps along the walk.",
        m06: "Rows of light over the planted hall.",
        m07: "A bamboo tunnel of coloured panels.",
        m08: "Paper-lantern arches over the aisle.",
        m09: "Planted walks under warm light.",
        m10: "A woven lamp at the centre of the hall.",
        m11: "The pavilion lit up at night.",
        m12: "A green corridor under hanging lamps.",
        m13: "A woven basket lamp, up close."
      },
      caps: {
        aerial: "The 2025 pavilion from above: a night structure of light, not the 2026 pandal.",
        gate: "Entrance into the Mahotsav after dark.",
        pyramid: "The stepped night pavilion at Durga Puja Mahotsav 2025.",
        leaf: "A leaf-shaped garden bed on the 2025 ground.",
        walk: "A bamboo walkway lined with plants and warm lanterns.",
        bricks: "Brick path, grass strips and hanging lamps inside the pavilion.",
        idol: "The Durga image in the 2025 pavilion. Historical reference.",
        family: "The goddess with her children, set among plants and warm light.",
        dhak: "Dhakis before the image: worship as a public gathering.",
        lanterns: "Rows of hanging lamps over a planted walk.",
        pavilion: "Red lanterns and a planted walk inside the 2025 pavilion. Historical reference. Not the 2026 pandal.",
        from2025: "From Durga Puja Mahotsav 2025 at IIT Kharagpur Research Park. Historical reference. Not the 2026 pandal.",
        stall: "A produce stall on the Mahotsav ground. Not a 2026 vendor list.",
        tech: "A tools conversation at a 2025 stall. Not a named 2026 catalogue.",
        stage: "A public programme during Durga Puja Mahotsav 2025 at IIT Kharagpur Research Park.",
        museum: "A themed installation from the 2025 Mahotsav."
      }
    },
    bn: {
      nav: "২০২৫-এর পুজোর স্মৃতি",
      navStories: "গল্প",
      kicker: "মাঠ থেকে গল্প · ২০২৬ ও ২০২৫",
      title: "২০২৬-এর মাঠ থেকে গত বছরের পুজোয়।",
      lead: "KarmYog for the 21st Century Bharatiya Krishak Samaj Pujo-র আয়োজক। ২০২৬-এর যাত্রা দেখুন, প্রত্যাবর্তন, মাঠ, খুঁটিপুজো, তারপর ফিরে যান IIT খড়গপুর রিসার্চ পার্কের দুর্গাপুজো মহোৎসব ২০২৫-এ।",
      note: "২০২৫-এর ছবি কারুকাজ ও জমায়েতের ঐতিহাসিক নজির। Munshir Bheri-র ২০২৬-এর প্যান্ডেল নয়।",
      railTitle: "মাঠ থেকে গল্প",
      hint: "পরের ছবির জন্য ডানদিকে, আগের জন্য বাঁদিকে ছুঁয়ে দিন। থামাতে চেপে ধরুন। পরের গল্পে যেতে সোয়াইপ করুন।",
      pause: "স্লাইডশো থামান",
      play: "স্লাইডশো চালান",
      prev: "আগের ছবি",
      next: "পরের ছবি",
      full: "পূর্ণ পর্দায় খুলুন",
      exitFull: "পূর্ণ পর্দা বন্ধ করুন",
      of: "/",
      jump: "এই গল্পের ছবি",
      watchKicker: "দেখুন",
      watchTitle: "মাঠ থেকে ছবি",
      watchLead: "২০২৬-এর মাঠ ও ২০২৫ মহোৎসবের ছোট ভিডিও। আপনি না ছুঁলে কিছু চলবে না।",
      shortsLabel: "শর্টস",
      talksLabel: "বক্তৃতা ও ফুটেজ",
      playVideo: "চালান",
      essay: "মিউজিয়াম অফ দ্য ফিউচার প্রবন্ধ পড়ুন",
      videos: {
        khuti: "খুঁটিপুজো ২০২৬",
        khuti2: "খুঁটিপুজো ২০২৬ · মাঠে",
        puja25: "দুর্গাপুজো ২০২৫",
        puja25viral: "দুর্গাপুজো ২০২৫",
        vision: "২০২৬-এর ভাবনা",
        minister: "কৃষিরত্ন লিগ উদ্বোধন · প্রত্যাবর্তন: কৃষিমন্ত্রীর বক্তব্য",
        rinku: "কৃষিরত্ন লিগ উদ্বোধন · প্রত্যাবর্তন: রিঙ্কু মজুমদার ঘোষ",
        mahotsav: "দুর্গাপুজো মহোৎসব ২০২৫: রেফারেন্স ফুটেজ"
      },
      chapters: {
        protyabortan: { title: "প্রত্যাবর্তন ২০২৬", short: "প্রত্যাবর্তন", intro: "এবারে পুজোয় প্রত্যাবর্তন: শিকড়, সম্ভাবনা, সমৃদ্ধি।", fallback: "প্রত্যাবর্তন ২০২৬।" },
        ground: { title: "মাঠ, আগে যেমন ছিল", short: "মাঠ", intro: "যেখানে ২০২৬-এর পুজো গড়ে উঠছে: পূর্ব কলকাতা জলাভূমির পাশে, দিগন্তে সেক্টর ফাইভ।", fallback: "২০২৬-এর পুজোর মাঠ।" },
        khuti: { title: "খুঁটিপুজো", short: "খুঁটিপুজো", intro: "প্রতিটি প্যান্ডেলের প্রথম আচার: নির্মাণের আগে বাঁশের খুঁটির পুজো।", fallback: "২০২৬-এর মাঠে খুঁটিপুজো।" },
        museum: { title: "মিউজিয়াম অফ দ্য ফিউচার · ২০২৫", short: "মিউজিয়াম ২০২৫", intro: "২০২৫ মহোৎসবে আলো, বাঁশ আর জীবন্ত গাছের হেঁটে দেখার প্রদর্শনী।", fallback: "মিউজিয়াম অফ দ্য ফিউচার, দুর্গাপুজো মহোৎসব ২০২৫। ঐতিহাসিক রেফারেন্স।" },
        worship: { title: "আরাধনা · ২০২৫", short: "আরাধনা", intro: "প্রতিমা, ঢাক, আরতি: পুজো পুজোই থাকে।" },
        atmosphere: { title: "রাত ও আলো · ২০২৫", short: "রাত", intro: "বাঁশ, লণ্ঠন, হেঁটে চলার প্যভিলিয়ন।" },
        craft: { title: "কারুকাজ ও সবুজ · ২০২৫", short: "কারুকাজ", intro: "মাটির পথ, গাছ, হাতে-তৈরি কাঠামো: সেই সপ্তাহের ভাষা।" },
        people: { title: "জমায়েতের মানুষ · ২০২৫", short: "মানুষ", intro: "প্রতিবেশী, স্টল, খোলা অনুষ্ঠান: একই উৎসবের মাটিতে।" },
        all: { title: "২০২৫-এর পুজোর স্মৃতি", short: "পুজো ২০২৫", intro: "IIT খড়গপুর রিসার্চ পার্কে দুর্গাপুজো মহোৎসব ২০২৫-এর সব ছবি।" }
      },
      slides: {
        banner: "প্রত্যাবর্তন: কর্মযোগ ও ভারতীয় কৃষক সমাজের ২০২৬-এর পুজোর ভাবনা।",
        invite2: "২০২৬-এর আমন্ত্রণপত্র থেকে: জলাভূমি ও তার সমন্বিত খামার।",
        invite3: "২০২৬-এর আমন্ত্রণপত্র থেকে: কারিগর, প্যান্ডেল ও তার পেছনের মানুষ।",
        envday: "বিশ্ব পরিবেশ দিবস ২০২৬: আমার জমি, আমার ভবিষ্যৎ।",
        before1: "জমি যেমন ছিল: জলাভূমির রাস্তার ধারে আবর্জনার স্তূপ।",
        before2: "পরিষ্কারের আগে: পথের ধারে জমে থাকা আবর্জনা।",
        before3: "জলাভূমির কিনারা, পেছনে সেক্টর ফাইভের দিগন্ত।",
        work: "কাজ চলছে: পরিষ্কার জমিতে প্রথম বাঁশের কাঠামো।",
        khuti1: "ঘণ্টা বাজিয়ে খুঁটিপুজোর শুরু।",
        khuti2: "খুঁটির পাশে কলাপাতার নিচে অতিথিরা।",
        khuti3: "হাতে নৈবেদ্য, পেছনে শহর।",
        khuti4: "খুঁটিপুজোর দিন হলুদ চাঁদোয়ার নিচে।"
      },
      caps: {
        aerial: "ওপর থেকে ২০২৫-এর প্যভিলিয়ন: আলোর রাতের কাঠামো। ২০২৬-এর প্যান্ডেল নয়।",
        gate: "মহোৎসবে ঢোকার দরজা, রাতের বেলা।",
        pyramid: "২০২৫ মহোৎসবের স্তরীকৃত রাতের প্যভিলিয়ন।",
        leaf: "২০২৫-এর মাঠে পাতার আকৃতির বাগান।",
        walk: "বাঁশের পথ, গাছ ও উষ্ণ লণ্ঠন।",
        bricks: "ইটের পথ, ঘাসের সারি, ঝুলন্ত বাতি।",
        idol: "২০২৫-এর প্যভিলিয়নে দুর্গামূর্তি। ঐতিহাসিক রেফারেন্স।",
        family: "দেবী ও সন্তানেরা, গাছ ও উষ্ণ আলোর মাঝে।",
        dhak: "প্রতিমার সামনে ঢাকি: আরাধনা, খোলা জমায়েত।",
        lanterns: "রোপণ করা পথের উপর সারি সারি বাতি।",
        pavilion: "২০২৫-এর প্যভিলিয়নে লাল লণ্ঠন ও রোপণ করা পথ। ঐতিহাসিক রেফারেন্স। ২০২৬-এর প্যান্ডেল নয়।",
        from2025: "IIT খড়গপুর রিসার্চ পার্কে দুর্গাপুজো মহোৎসব ২০২৫। ঐতিহাসিক রেফারেন্স। ২০২৬-এর প্যান্ডেল নয়।",
        stall: "মহোৎসবের মাঠে ফসলের স্টল। ২০২৬-এর বিক্রেতা তালিকা নয়।",
        tech: "২০২৫-এর স্টলে সরঞ্জাম নিয়ে কথা। নাম করা ২০২৬ ক্যাটালগ নয়।",
        stage: "IIT খড়গপুর রিসার্চ পার্কে ২০২৫ মহোৎসবের একটি খোলা অনুষ্ঠান।",
        museum: "২০২৫ মহোৎসবের একটি থিম-ইনস্টলেশন।"
      }
    },
    hi: {
      nav: "2025 की पूजा स्मृतियाँ",
      navStories: "कहानियाँ",
      kicker: "ज़मीन से कहानियाँ · 2026 और 2025",
      title: "2026 की ज़मीन से पिछले वर्ष की पूजा तक।",
      lead: "KarmYog for the 21st Century Bharatiya Krishak Samaj Pujo का आयोजक है। 2026 की यात्रा देखें, प्रत्यावर्तन, ज़मीन, खूँटी पूजा, फिर IIT खड़गपुर रिसर्च पार्क के दुर्गा पूजा महोत्सव 2025 में लौटें।",
      note: "2025 की तस्वीरें कारीगरी और जमावड़े का ऐतिहासिक अभिलेख हैं। Munshir Bheri का 2026 का पंडाल नहीं।",
      railTitle: "ज़मीन से कहानियाँ",
      hint: "अगली तस्वीर के लिए दाईं ओर, पिछली के लिए बाईं ओर टैप करें। रोकने के लिए दबाए रखें। अगली कहानी के लिए स्वाइप करें।",
      pause: "स्लाइडशो रोकें",
      play: "स्लाइडशो चलाएँ",
      prev: "पिछली तस्वीर",
      next: "अगली तस्वीर",
      full: "पूर्ण स्क्रीन में खोलें",
      exitFull: "पूर्ण स्क्रीन बंद करें",
      of: "/",
      jump: "इस कहानी की तस्वीरें",
      watchKicker: "देखें",
      watchTitle: "ज़मीन से फ़िल्में",
      watchLead: "2026 की ज़मीन और 2025 महोत्सव की छोटी फ़िल्में। आपके टैप किए बिना कुछ नहीं चलेगा।",
      shortsLabel: "शॉर्ट्स",
      talksLabel: "भाषण और फुटेज",
      playVideo: "चलाएँ",
      essay: "म्यूज़ियम ऑफ़ द फ्यूचर निबंध पढ़ें",
      videos: {
        khuti: "खूँटी पूजा 2026",
        khuti2: "खूँटी पूजा 2026 · ज़मीन पर",
        puja25: "दुर्गा पूजा 2025",
        puja25viral: "दुर्गा पूजा 2025",
        vision: "2026 की परिकल्पना",
        minister: "कृषि रत्न लीग शुभारंभ · प्रत्यावर्तन: कृषि मंत्री का भाषण",
        rinku: "कृषि रत्न लीग शुभारंभ · प्रत्यावर्तन: रिंकू मजूमदार घोष",
        mahotsav: "दुर्गा पूजा महोत्सव 2025: संदर्भ फुटेज"
      },
      chapters: {
        protyabortan: { title: "प्रत्यावर्तन 2026", short: "प्रत्यावर्तन", intro: "इस पूजा में प्रत्यावर्तन: जड़ें, संभावना, समृद्धि।", fallback: "प्रत्यावर्तन 2026।" },
        ground: { title: "ज़मीन, पहले जैसी थी", short: "ज़मीन", intro: "जहाँ 2026 की पूजा बन रही है, पूर्वी कोलकाता आर्द्रभूमि के पास, क्षितिज पर सेक्टर V।", fallback: "2026 की पूजा की ज़मीन।" },
        khuti: { title: "खूँटी पूजा", short: "खूँटी पूजा", intro: "हर पंडाल की पहली रस्म: निर्माण से पहले बाँस के खूँटे की पूजा।", fallback: "2026 की ज़मीन पर खूँटी पूजा।" },
        museum: { title: "म्यूज़ियम ऑफ़ द फ्यूचर · 2025", short: "म्यूज़ियम 2025", intro: "2025 महोत्सव में प्रकाश, बाँस और जीवित पौधों की चलकर देखने वाली प्रदर्शनी।", fallback: "म्यूज़ियम ऑफ़ द फ्यूचर, दुर्गा पूजा महोत्सव 2025। ऐतिहासिक संदर्भ।" },
        worship: { title: "आराधना · 2025", short: "आराधना", intro: "प्रतिमा, ढाक और आरती: पूजा पूजा ही रहती है।" },
        atmosphere: { title: "रात और प्रकाश · 2025", short: "रात", intro: "बाँस, लालटेन, चलकर देखने योग्य पवेलियन।" },
        craft: { title: "शिल्प और हरियाली · 2025", short: "शिल्प", intro: "मिट्टी के पथ, पौधे, हाथ से बना ढाँचा, उस सप्ताह की भाषा।" },
        people: { title: "जमावड़े के लोग · 2025", short: "लोग", intro: "पड़ोसी, स्टॉल, खुले कार्यक्रम: उसी उत्सव की ज़मीन पर।" },
        all: { title: "2025 की पूजा स्मृतियाँ", short: "पूजा 2025", intro: "IIT खड़गपुर रिसर्च पार्क पर दुर्गा पूजा महोत्सव 2025 की सभी तस्वीरें।" }
      },
      slides: {
        banner: "प्रत्यावर्तन: कर्मयोग और भारतीय कृषक समाज की 2026 पूजा का विषय।",
        invite2: "2026 के निमंत्रण-पत्र से: आर्द्रभूमि और उसके समेकित खेत।",
        invite3: "2026 के निमंत्रण-पत्र से: कारीगर, पंडाल और उसके पीछे के लोग।",
        envday: "विश्व पर्यावरण दिवस 2026: हमारी ज़मीन, हमारा भविष्य।",
        before1: "ज़मीन जैसी थी: आर्द्रभूमि की सड़क किनारे कूड़े का ढेर।",
        before2: "सफ़ाई से पहले: रास्ते के किनारे जमा कचरा।",
        before3: "आर्द्रभूमि का किनारा, पीछे सेक्टर V का क्षितिज।",
        work: "काम जारी: साफ़ ज़मीन पर पहला बाँस का ढाँचा।",
        khuti1: "घंटी के साथ खूँटी पूजा की शुरुआत।",
        khuti2: "खूँटे के पास केले के पत्तों तले अतिथि।",
        khuti3: "हाथ में प्रसाद, पीछे उभरता शहर।",
        khuti4: "खूँटी पूजा के दिन पीली छतरी के नीचे।"
      },
      caps: {
        aerial: "ऊपर से 2025 का पवेलियन: प्रकाश की रात की संरचना। 2026 का पंडाल नहीं।",
        gate: "महोत्सव का प्रवेश, रात में।",
        pyramid: "2025 महोत्सव का स्तरीय रात्रि पवेलियन।",
        leaf: "2025 के मैदान पर पत्ते के आकार का उद्यान।",
        walk: "बाँस का पथ, पौधे और गुनगुनी लालटेन।",
        bricks: "ईंट का पथ, घास की पट्टियाँ, लटकते दीये।",
        idol: "2025 के पवेलियन में दुर्गा प्रतिमा। ऐतिहासिक संदर्भ।",
        family: "देवी और उनके बच्चे, पौधों और गुनगुनी रोशनी के बीच।",
        dhak: "प्रतिमा के सामने ढाकी: आराधना, खुला जमावड़ा।",
        lanterns: "रोपे गए पथ के ऊपर दीयों की कतार।",
        pavilion: "2025 के पवेलियन में लाल लालटेन और रोपे गए पथ। ऐतिहासिक संदर्भ। 2026 का पंडाल नहीं।",
        from2025: "IIT खड़गपुर रिसर्च पार्क पर दुर्गा पूजा महोत्सव 2025। ऐतिहासिक संदर्भ। 2026 का पंडाल नहीं।",
        stall: "महोत्सव के मैदान पर उपज का स्टॉल। 2026 की विक्रेता सूची नहीं।",
        tech: "2025 के स्टॉल पर औज़ारों की बात। नामित 2026 कैटलॉग नहीं।",
        stage: "IIT खड़गपुर रिसर्च पार्क पर 2025 महोत्सव का एक सार्वजनिक कार्यक्रम।",
        museum: "2025 महोत्सव की एक थीम-स्थापना।"
      }
    }
  };

  function museumSlides() {
    var list = [];
    for (var i = 1; i <= 13; i++) {
      var num = i < 10 ? "0" + i : String(i);
      list.push({ f: "museum-" + num, c: "m" + num });
    }
    return list;
  }

  /* `f` = file stem inside `dir` (thumbs are "<stem>-thumb.jpg");
     legacy chapters use full `file` names and `cap` keys from COPY.caps. */
  var CHAPTERS = [
    {
      id: "protyabortan",
      dir: "stories/2026/",
      cover: "protyabortan-banner",
      slides: [
        { f: "protyabortan-banner", c: "banner" },
        { f: "invitation-page-2", c: "invite2" },
        { f: "invitation-page-3", c: "invite3" },
        { f: "environment-day-2026", c: "envday" }
      ]
    },
    {
      id: "ground",
      dir: "stories/2026/",
      cover: "site-work-bamboo",
      slides: [
        { f: "site-before-1", c: "before1" },
        { f: "site-before-2", c: "before2" },
        { f: "site-before-3", c: "before3" },
        { f: "site-work-bamboo", c: "work" }
      ]
    },
    {
      id: "khuti",
      dir: "stories/2026/",
      cover: "khuti-puja-1",
      slides: [
        { f: "khuti-puja-1", c: "khuti1" },
        { f: "khuti-puja-2", c: "khuti2" },
        { f: "khuti-puja-3", c: "khuti3" },
        { f: "khuti-puja-4", c: "khuti4" }
      ]
    },
    { id: "museum", dir: "stories/museum-2025/", cover: "museum-08", slides: museumSlides() },
    {
      id: "worship",
      dir: "memories-2025/",
      legacy: true,
      slides: [
        { file: "mem-11.jpg", cap: "family" },
        { file: "mem-09.jpg", cap: "idol" },
        { file: "mem-10.jpg", cap: "dhak" }
      ]
    },
    {
      id: "atmosphere",
      dir: "memories-2025/",
      legacy: true,
      slides: [
        { file: "mem-26.jpg", cap: "aerial" },
        { file: "mem-16.jpg", cap: "gate" },
        { file: "mem-14.jpg", cap: "pyramid" }
      ]
    },
    {
      id: "craft",
      dir: "memories-2025/",
      legacy: true,
      slides: [
        { file: "mem-15.jpg", cap: "museum" },
        { file: "mem-23.jpg", cap: "walk" },
        { file: "mem-07.jpg", cap: "lanterns" },
        { file: "mem-01.jpg", cap: "bricks" },
        { file: "mem-05.jpg", cap: "lanterns" },
        { file: "mem-03.jpg", cap: "bricks" },
        { file: "mem-08.jpg", cap: "walk" }
      ]
    },
    {
      id: "people",
      dir: "memories-2025/",
      legacy: true,
      slides: [
        { file: "mem-06.jpg", cap: "stall" },
        { file: "mem-04.jpg", cap: "pavilion" },
        { file: "mem-13.jpg", cap: "stage" }
      ]
    }
  ];

  var CAP_BY_FILE = {
    "mem-01.jpg": "bricks", "mem-02.jpg": "pavilion", "mem-03.jpg": "bricks", "mem-04.jpg": "pavilion",
    "mem-05.jpg": "lanterns", "mem-06.jpg": "stall", "mem-07.jpg": "lanterns", "mem-08.jpg": "walk",
    "mem-09.jpg": "idol", "mem-10.jpg": "dhak", "mem-11.jpg": "family", "mem-12.jpg": "walk",
    "mem-13.jpg": "stage", "mem-14.jpg": "pyramid", "mem-15.jpg": "museum", "mem-16.jpg": "gate",
    "mem-17.jpg": "gate", "mem-23.jpg": "walk", "mem-26.jpg": "aerial"
  };

  var ALL = [];
  for (var n = 1; n <= 27; n++) {
    var num = n < 10 ? "0" + n : String(n);
    var file = "mem-" + num + ".jpg";
    ALL.push({ file: file, cap: CAP_BY_FILE[file] || "from2025" });
  }

  var VIDEOS = [
    { id: "VO1HKJ5H7lA", kind: "short", t: "khuti" },
    { id: "Ic1Msdgq5BM", kind: "short", t: "khuti2" },
    { id: "1Wm7Pqe0jjk", kind: "short", t: "puja25" },
    { id: "gCLHEW3xaT8", kind: "short", t: "puja25viral" },
    { id: "-Y7J7GpywGg", kind: "talk", t: "vision" },
    { id: "LMWeL35RiTo", kind: "talk", t: "mahotsav" }
  ];

  /* Survives re-renders (language switch) so the viewer keeps its place. */
  var memo = { ch: 0, i: 0, userPaused: null };
  var player = null;

  function reduceMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function assetBase() {
    var script = document.querySelector("script[src*='memories.js']");
    if (script && script.src) {
      return script.src.replace(/memories\.js(\?.*)?$/, "") + "assets/";
    }
    return "assets/";
  }

  function lang() {
    var html = document.documentElement.lang || "en";
    if (html.indexOf("bn") === 0) return "bn";
    if (html.indexOf("hi") === 0) return "hi";
    var pressed = document.querySelector("[data-lang][aria-pressed='true']");
    if (pressed) {
      var code = pressed.getAttribute("data-lang");
      if (code === "bn" || code === "hi") return code;
    }
    return "en";
  }

  function t() {
    return COPY[lang()] || COPY.en;
  }

  function orgSwap(str) {
    var org = document.body.getAttribute("data-memories-org");
    if (!org) return str;
    return String(str).split("KarmYog for the 21st Century").join(org);
  }

  function esc(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function chapterCopy(pack, id) {
    return (pack.chapters && pack.chapters[id]) || COPY.en.chapters[id] || { title: id, short: id, intro: "" };
  }

  function slideCaption(pack, ch, slide) {
    if (ch.legacy) return pack.caps[slide.cap] || pack.caps.from2025 || "";
    if (pack.slides && pack.slides[slide.c]) return pack.slides[slide.c];
    var fallback = chapterCopy(pack, ch.id).fallback;
    return fallback || COPY.en.slides[slide.c] || "";
  }

  function slideSrc(base, ch, slide) {
    return base + ch.dir + (slide.file || slide.f + ".jpg");
  }

  function thumbSrc(base, ch, slide) {
    return ch.legacy ? slideSrc(base, ch, slide) : base + ch.dir + slide.f + "-thumb.jpg";
  }

  function coverSrc(base, ch) {
    if (ch.legacy) return slideSrc(base, ch, ch.slides[0]);
    return base + ch.dir + (ch.cover || ch.slides[0].f) + "-thumb.jpg";
  }

  function ensureHost() {
    var host = document.getElementById("memories");
    if (host) return host;
    host = document.createElement("section");
    host.id = "memories";
    host.className = "bks-memories";
    var faq = document.getElementById("faq");
    var story = document.getElementById("story");
    var record = document.getElementById("record");
    if (faq && faq.parentNode) faq.parentNode.insertBefore(host, faq);
    else if (record && record.parentNode) record.parentNode.insertBefore(host, record.nextSibling);
    else if (story && story.parentNode) story.parentNode.appendChild(host);
    else {
      var main = document.querySelector("main") || document.body;
      main.appendChild(host);
    }
    return host;
  }

  function injectNav(pack) {
    var label = pack.nav;
    // Stories live on the Participate page now, so the top bar has no separate link.
    if (document.querySelector("#nav-drawer-list a[href='#memories']")) {
      document.querySelector("#nav-drawer-list a[href='#memories']").textContent = label;
      return;
    }
    var nodes = document.querySelectorAll(
      ".nav-desktop a[href='#faq'], .nav-drawer-list a[href='#faq'], #nav-desktop a[href='#faq'], #nav-drawer-list a[href='#faq']"
    );
    Array.prototype.forEach.call(nodes, function (faqLink) {
      var parent = faqLink.parentNode;
      if (!parent) return;
      if (parent.querySelector("a[href='#memories']")) {
        parent.querySelector("a[href='#memories']").textContent = label;
        return;
      }
      var a = document.createElement("a");
      a.href = "#memories";
      a.textContent = label;
      a.setAttribute("data-bks-memories-nav", "1");
      parent.insertBefore(a, faqLink);
    });
  }

  function bubbleHtml(pack, base, ch, idx, attr) {
    var c = chapterCopy(pack, ch.id);
    return (
      "<button type='button' class='story-bubble' " + attr + "='" + idx + "' aria-label='" + esc(c.title) + "'>" +
      "<span class='story-bubble__ring'><img src='" + coverSrc(base, ch) + "' alt='' loading='lazy' width='120' height='120'></span>" +
      "<span class='story-bubble__label'>" + esc(c.short || c.title) + "</span></button>"
    );
  }

  function watchHtml(pack) {
    function card(v) {
      var title = (pack.videos && pack.videos[v.t]) || COPY.en.videos[v.t] || "";
      return (
        "<li class='watch-card watch-card--" + v.kind + "'>" +
        "<button type='button' class='watch-card__btn' data-watch='" + v.id + "' aria-label='" + esc(pack.playVideo + ": " + title) + "'>" +
        "<img src='https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg' alt='' loading='lazy' width='480' height='360'>" +
        "<span class='watch-card__play' aria-hidden='true'></span>" +
        "<span class='watch-card__title'>" + esc(title) + "</span>" +
        "</button></li>"
      );
    }
    var shorts = VIDEOS.filter(function (v) { return v.kind === "short"; }).map(card).join("");
    var talks = VIDEOS.filter(function (v) { return v.kind === "talk"; }).map(card).join("");
    return (
      "<section class='watch' aria-labelledby='watch-h'>" +
      "<p class='bks-memories__kicker'>" + esc(pack.watchKicker) + "</p>" +
      "<h3 id='watch-h' class='watch__title'>" + esc(pack.watchTitle) + "</h3>" +
      "<p class='bks-memories__note'>" + esc(pack.watchLead) + "</p>" +
      "<p class='watch__label'>" + esc(pack.shortsLabel) + "</p>" +
      "<ul class='watch__row watch__row--shorts'>" + shorts + "</ul>" +
      "<p class='watch__label'>" + esc(pack.talksLabel) + "</p>" +
      "<ul class='watch__row watch__row--talks'>" + talks + "</ul>" +
      "<p class='watch__links'>" +
      "<a class='watch__link' href='" + ESSAY + "' target='_blank' rel='noopener noreferrer'>" + esc(pack.essay) + " <span aria-hidden='true'>↗</span></a>" +
      "</p></section>"
    );
  }

  function render(host) {
    var pack = t();
    var base = assetBase();
    /* "gallery" hosts (the main page) show every 2025 photograph as one chapter
       instead of the four curated 2025 groups. */
    var compact = host.getAttribute("data-bks-memories") === "gallery";
    var chapters = compact
      ? CHAPTERS.filter(function (ch) { return !ch.legacy; }).concat([{ id: "all", dir: "memories-2025/", legacy: true, slides: ALL }])
      : CHAPTERS;

    var html = "<div class='bks-memories__wrap'>";
    html +=
      "<header class='bks-memories__cred'>" +
      "<p class='bks-memories__kicker'>" + esc(orgSwap(pack.kicker)) + "</p>" +
      "<h2 id='mem-h-main'>" + esc(orgSwap(pack.title)) + "</h2>" +
      "<p class='bks-memories__lead'>" + esc(orgSwap(pack.lead)) + "</p>" +
      "<p class='bks-memories__note'>" + esc(pack.note) + "</p></header>";

    html += "<div class='stories' data-stories>";
    if (chapters.length > 1) {
      html += "<div class='stories__rail' role='group' aria-label='" + esc(pack.railTitle) + "'>";
      chapters.forEach(function (ch, idx) { html += bubbleHtml(pack, base, ch, idx, "data-story-ch"); });
      html += "</div>";
    }
    html +=
      "<div class='stories__stage'>" +
      "<div class='story-viewer' data-story-viewer tabindex='0' role='region' aria-roledescription='slideshow' aria-label='" + esc(pack.railTitle) + "'>" +
      "<div class='story-viewer__bg' aria-hidden='true'></div>" +
      "<div class='story-viewer__bars' aria-hidden='true'></div>" +
      "<div class='story-viewer__top'>" +
      "<span class='story-viewer__who'><img alt='' width='36' height='36'><span><strong></strong><small></small></span></span>" +
      "<span class='story-viewer__tools'>" +
      "<button type='button' class='story-btn' data-story-toggle aria-label='" + esc(pack.pause) + "'><span class='story-btn__icon' aria-hidden='true'></span></button>" +
      "<button type='button' class='story-btn' data-story-full aria-label='" + esc(pack.full) + "'><span class='story-btn__full' aria-hidden='true'></span></button>" +
      "</span></div>" +
      "<figure class='story-viewer__media'><img alt='' decoding='async'></figure>" +
      "<button type='button' class='story-arrow story-arrow--prev' data-story-prev aria-label='" + esc(pack.prev) + "'>‹</button>" +
      "<button type='button' class='story-arrow story-arrow--next' data-story-next aria-label='" + esc(pack.next) + "'>›</button>" +
      "<p class='story-viewer__cap' aria-live='polite'></p>" +
      "</div>" +
      "<aside class='stories__side'>" +
      "<p class='stories__count'></p>" +
      "<h3 class='stories__title'></h3>" +
      "<p class='stories__intro'></p>" +
      "<p class='stories__hint'>" + esc(pack.hint) + "</p>" +
      "<div class='stories__thumbs' role='group' aria-label='" + esc(pack.jump) + "'></div>" +
      "</aside></div></div>";

    html += watchHtml(pack);
    html += "</div>";

    host.classList.add("bks-memories");
    host.setAttribute("aria-labelledby", "mem-h-main");
    host.innerHTML = html;
    injectNav(pack);

    if (player) player.destroy();
    player = createPlayer(host, chapters, pack, base);
    bindWatch(host);
    injectTopRail(chapters, pack, base);
  }

  function createPlayer(host, chapters, pack, base) {
    var root = host.querySelector("[data-stories]");
    var viewer = root.querySelector("[data-story-viewer]");
    var bars = viewer.querySelector(".story-viewer__bars");
    var bg = viewer.querySelector(".story-viewer__bg");
    var img = viewer.querySelector(".story-viewer__media img");
    var cap = viewer.querySelector(".story-viewer__cap");
    var who = viewer.querySelector(".story-viewer__who");
    var toggle = viewer.querySelector("[data-story-toggle]");
    var fullBtn = viewer.querySelector("[data-story-full]");
    var side = root.querySelector(".stories__side");
    var reduce = reduceMotion();

    var state = {
      ch: Math.min(memo.ch, chapters.length - 1),
      i: 0,
      userPaused: memo.userPaused === null ? reduce : memo.userPaused,
      holding: false,
      visible: false,
      loaded: false,
      pageHidden: document.hidden,
      down: null,
      holdTimer: 0,
      seen: {}
    };
    state.i = Math.min(memo.i, chapters[state.ch].slides.length - 1);
    viewer.style.setProperty("--story-ms", SLIDE_MS + "ms");

    function running() {
      return !state.userPaused && !state.holding && state.visible && state.loaded && !state.pageHidden;
    }

    function sync() {
      viewer.classList.toggle("is-paused", !running());
      viewer.classList.toggle("is-user-paused", state.userPaused);
      toggle.setAttribute("aria-label", state.userPaused ? pack.play : pack.pause);
      toggle.setAttribute("aria-pressed", state.userPaused ? "true" : "false");
    }

    function preload(chIdx, slideIdx) {
      var ch = chapters[chIdx];
      if (!ch || !ch.slides[slideIdx]) return;
      var p = new Image();
      p.src = slideSrc(base, ch, ch.slides[slideIdx]);
    }

    function go(chIdx, slideIdx) {
      var ch = chapters[chIdx];
      var slide = ch.slides[slideIdx];
      var copy = chapterCopy(pack, ch.id);
      state.ch = chIdx;
      state.i = slideIdx;
      state.seen[chIdx] = true;
      memo.ch = chIdx;
      memo.i = slideIdx;
      var src = slideSrc(base, ch, slide);
      var text = slideCaption(pack, ch, slide);

      var barHtml = "";
      for (var k = 0; k < ch.slides.length; k++) {
        barHtml += "<span class='story-bar" + (k < slideIdx ? " is-done" : k === slideIdx ? " is-active" : "") + "'><i></i></span>";
      }
      bars.innerHTML = barHtml;
      var fill = bars.querySelector(".is-active i");
      if (fill) fill.addEventListener("animationend", next);

      state.loaded = false;
      viewer.classList.add("is-loading");
      viewer.classList.remove("is-in");
      sync();
      img.onload = function () {
        state.loaded = true;
        viewer.classList.remove("is-loading");
        void img.offsetWidth;
        viewer.classList.add("is-in");
        sync();
      };
      img.src = src;
      img.alt = text;
      if (img.complete && img.naturalWidth) img.onload();
      bg.style.backgroundImage = "url('" + src + "')";
      cap.textContent = text;

      who.querySelector("img").src = coverSrc(base, ch);
      who.querySelector("strong").textContent = copy.title;
      who.querySelector("small").textContent = (slideIdx + 1) + " " + pack.of + " " + ch.slides.length;

      side.querySelector(".stories__count").textContent = (chIdx + 1) + " " + pack.of + " " + chapters.length;
      side.querySelector(".stories__title").textContent = copy.title;
      side.querySelector(".stories__intro").textContent = copy.intro;
      var thumbs = side.querySelector(".stories__thumbs");
      if (thumbs.getAttribute("data-ch") !== String(chIdx)) {
        thumbs.setAttribute("data-ch", String(chIdx));
        thumbs.innerHTML = ch.slides.map(function (s, k) {
          return "<button type='button' class='story-thumb' data-story-slide='" + k + "' aria-label='" + esc(slideCaption(pack, ch, s)) + "'>" +
            "<img src='" + thumbSrc(base, ch, s) + "' alt='' loading='lazy' width='120' height='120'></button>";
        }).join("");
      }
      Array.prototype.forEach.call(thumbs.querySelectorAll(".story-thumb"), function (b, k) {
        b.classList.toggle("is-active", k === slideIdx);
        if (k === slideIdx) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
      });

      document.querySelectorAll("[data-story-ch], [data-story-top]").forEach(function (b) {
        var idx = Number(b.getAttribute("data-story-ch") || b.getAttribute("data-story-top"));
        b.classList.toggle("is-active", idx === chIdx);
        b.classList.toggle("is-seen", !!state.seen[idx] && idx !== chIdx);
        if (idx === chIdx) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
      });

      if (slideIdx + 1 < ch.slides.length) preload(chIdx, slideIdx + 1);
      else preload((chIdx + 1) % chapters.length, 0);
    }

    function next() {
      var ch = chapters[state.ch];
      if (state.i + 1 < ch.slides.length) go(state.ch, state.i + 1);
      else go((state.ch + 1) % chapters.length, 0);
    }

    function prev() {
      if (state.i > 0) go(state.ch, state.i - 1);
      else if (state.ch > 0) go(state.ch - 1, chapters[state.ch - 1].slides.length - 1);
      else go(0, 0);
    }

    function nextChapter() { go((state.ch + 1) % chapters.length, 0); }
    function prevChapter() { go((state.ch - 1 + chapters.length) % chapters.length, 0); }

    function setPaused(v) {
      state.userPaused = v;
      memo.userPaused = v;
      sync();
    }

    // Full screen can be asked for from the bubbles under the hero while the
    // stories section itself sits on a page that is hidden. So while full, the
    // viewer is lifted onto <body> and put back in its place afterwards.
    var fullHost = null;
    var fullMark = null;
    function liftViewer(on) {
      if (on && !fullMark) {
        fullMark = document.createComment("stories");
        root.parentNode.insertBefore(fullMark, root);
        fullHost = document.createElement("div");
        fullHost.className = "bks-memories story-full-host";
        fullHost.style.display = "contents";
        fullHost.appendChild(root);
        document.body.appendChild(fullHost);
      } else if (!on && fullMark) {
        if (fullMark.parentNode) fullMark.parentNode.replaceChild(root, fullMark);
        if (fullHost && fullHost.parentNode) fullHost.parentNode.removeChild(fullHost);
        fullMark = null;
        fullHost = null;
      }
    }

    function setFull(on) {
      liftViewer(on);
      root.classList.toggle("is-full", on);
      document.body.classList.toggle("story-full", on);
      fullBtn.setAttribute("aria-label", on ? pack.exitFull : pack.full);
      fullBtn.setAttribute("aria-pressed", on ? "true" : "false");
      if (on) {
        state.visible = true;
        viewer.focus({ preventScroll: true });
      }
      sync();
    }

    function onDown(e) {
      if (e.button && e.button !== 0) return;
      if (e.target.closest("button, a")) return;
      state.down = { x: e.clientX, y: e.clientY };
      clearTimeout(state.holdTimer);
      state.holdTimer = setTimeout(function () {
        state.holding = true;
        sync();
      }, 220);
    }

    function onUp(e) {
      clearTimeout(state.holdTimer);
      var d = state.down;
      state.down = null;
      var wasHolding = state.holding;
      state.holding = false;
      sync();
      if (!d) return;
      var dx = e.clientX - d.x;
      var dy = e.clientY - d.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) nextChapter();
        else prevChapter();
        return;
      }
      if (wasHolding || Math.abs(dy) > 30) return;
      var r = viewer.getBoundingClientRect();
      if (e.clientX - r.left < r.width * 0.32) prev();
      else next();
    }

    function onCancel() {
      clearTimeout(state.holdTimer);
      state.down = null;
      state.holding = false;
      sync();
    }

    function onKey(e) {
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === " " || e.key === "k") { e.preventDefault(); setPaused(!state.userPaused); }
      else if (e.key === "Escape" && root.classList.contains("is-full")) { setFull(false); }
    }

    function onDocKey(e) {
      if (e.key === "Escape" && root.classList.contains("is-full")) setFull(false);
    }

    function onVisibility() {
      state.pageHidden = document.hidden;
      sync();
    }

    viewer.addEventListener("pointerdown", onDown);
    viewer.addEventListener("pointerup", onUp);
    viewer.addEventListener("pointercancel", onCancel);
    viewer.addEventListener("pointerleave", function () { if (state.down) onCancel(); });
    viewer.addEventListener("contextmenu", function (e) { if (state.holding) e.preventDefault(); });
    viewer.addEventListener("keydown", onKey);
    document.addEventListener("keydown", onDocKey);
    document.addEventListener("visibilitychange", onVisibility);

    viewer.querySelector("[data-story-prev]").addEventListener("click", prev);
    viewer.querySelector("[data-story-next]").addEventListener("click", next);
    toggle.addEventListener("click", function () { setPaused(!state.userPaused); });
    fullBtn.addEventListener("click", function () { setFull(!root.classList.contains("is-full")); });
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-story-ch]");
      if (b) { go(Number(b.getAttribute("data-story-ch")), 0); return; }
      var s = e.target.closest("[data-story-slide]");
      if (s) go(state.ch, Number(s.getAttribute("data-story-slide")));
    });
    root.addEventListener("click", function (e) {
      if (e.target === root && root.classList.contains("is-full")) setFull(false);
    });

    var io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          state.visible = entry.isIntersecting || root.classList.contains("is-full");
        });
        sync();
      }, { threshold: 0.35 });
      io.observe(viewer);
    } else {
      state.visible = true;
    }

    go(state.ch, state.i);

    return {
      open: function (chIdx, full) {
        go(chIdx, 0);
        if (full) setFull(true);
        else viewer.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        if (state.userPaused && !reduce) setPaused(false);
      },
      pauseForVideo: function () {
        setPaused(true);
      },
      destroy: function () {
        liftViewer(false);
        if (io) io.disconnect();
        clearTimeout(state.holdTimer);
        document.removeEventListener("keydown", onDocKey);
        document.removeEventListener("visibilitychange", onVisibility);
        document.body.classList.remove("story-full");
      }
    };
  }

  function bindWatch(host) {
    host.querySelectorAll("[data-watch]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-watch");
        var title = btn.querySelector(".watch-card__title");
        var frame = document.createElement("iframe");
        frame.src = "https://www.youtube-nocookie.com/embed/" + id + "?rel=0&modestbranding=1&playsinline=1&autoplay=1";
        frame.title = title ? title.textContent : "Video";
        frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        frame.allowFullscreen = true;
        frame.className = "watch-card__frame";
        btn.parentNode.classList.add("is-playing");
        btn.replaceWith(frame);
        if (player) player.pauseForVideo();
      });
    });
  }

  /* A row of story bubbles straight under the hero, so the photos are one tap away. */
  function injectTopRail(chapters, pack, base) {
    var hero = document.querySelector("[data-view='home'] .hero-band");
    if (!hero) return;
    var rail = document.getElementById("story-rail-top");
    if (!rail) {
      rail = document.createElement("nav");
      rail.id = "story-rail-top";
      rail.className = "story-rail-top";
      hero.parentNode.insertBefore(rail, hero.nextSibling);
      rail.addEventListener("click", function (e) {
        var b = e.target.closest("[data-story-top]");
        if (!b || !player) return;
        // The stories section lives on another page, so these always open full screen.
        player.open(Number(b.getAttribute("data-story-top")), true);
      });
    }
    rail.setAttribute("aria-label", pack.railTitle);
    var html = "<div class='wrap-wide story-rail-top__inner'><p class='story-rail-top__title'>" + esc(pack.railTitle) + "</p><div class='story-rail-top__list'>";
    chapters.forEach(function (ch, idx) { html += bubbleHtml(pack, base, ch, idx, "data-story-top"); });
    html += "</div></div>";
    rail.innerHTML = html;
    var active = rail.querySelector("[data-story-top='" + memo.ch + "']");
    if (active) active.classList.add("is-active");
  }

  var mounting = false;
  var mountedLang = "";
  function mount() {
    if (mounting) return;
    var host = ensureHost();
    // Skip when this host is already rendered in the current language, so the
    // running slideshow (and full-screen mode) is not thrown away.
    if (host.querySelector("[data-stories]") && mountedLang === lang()) return;
    mounting = true;
    try {
      render(host);
      mountedLang = lang();
    } finally {
      mounting = false;
    }
  }

  function hookRender() {
    if (typeof window.BKS_RENDER === "function" && !window.BKS_RENDER._mem) {
      var orig = window.BKS_RENDER;
      window.BKS_RENDER = function (code) {
        orig(code);
        mount();
      };
      window.BKS_RENDER._mem = true;
    }
    if (window.BksCampaign && typeof window.BksCampaign.render === "function" && !window.BksCampaign._mem) {
      var origC = window.BksCampaign.render;
      window.BksCampaign.render = function () {
        origC.apply(this, arguments);
        mount();
      };
      window.BksCampaign._mem = true;
    }
  }

  function boot() {
    hookRender();
    mount();
    document.querySelectorAll("button[data-lang], a[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTimeout(mount, 30);
      });
    });
    var obs = new MutationObserver(function () {
      mount();
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
