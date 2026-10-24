// Mini Muzi & Captain: tiny pixel-art characters that live on the terminal's title bar.
// Muzi wanders, waves, dances, sips coffee, plays tennis and naps; Captain (the cat) follows her.
// They react to terminal commands (see the `terminal-command` event in script.js) and to clicks.
(function () {
  const bar = document.querySelector(".titlebar");
  if (!bar) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- pixel art (one character per pixel; "." is transparent) ----------
  // Muzi is a 25x41 minipix (tools/muzi-chibi.png, made with avatarsinpixels.com); Captain is hand-drawn.
  // Muzi's art stays as-is: her moves come from hops and tilts (see place()), plus a closed-eyes frame.
  const PALETTE = {
    a: "#000000", b: "#915731", c: "#f5bb95", d: "#0d0000", e: "#2b1a0c", f: "#120038", g: "#ffd9b3", h: "#76539c", i: "#49382a", j: "#9471ba", k: "#494c96", l: "#8f92dc", m: "#adb0fa", n: "#cbceff", o: "#d79d77", p: "#592c05", q: "#58357e", r: "#ffffff", s: "#675648", t: "#8a8a8a", u: "#eeeeee", v: "#c0c0c0", w: "#fff7d1", x: "#d0d0d0",
    // Captain: outline, cream + shade, orange + shade, pink ears/blush, eye shine, nose
    K: "#1a1020", W: "#f3ead8", V: "#cdbfa6", O: "#efb27c", Q: "#c9844f", I: "#f7a1b0", H: "#ffffff", N: "#f7768e",
  };
  const STAND = [
    "........aaaaaaaaa........",
    "......aadeeedeeedaa......",
    ".....adeiiieeeiieeda.....",
    "....adesiedieidisieda....",
    "...adesiedaaeaadisieda...",
    "...aeiieaaaaaaaaaeiiea...",
    "..adeieagcgcgcgcgaeieda..",
    "..adieaccgcgcgcgccaeida..",
    "..adiaccgcgcgcgcgccaida..",
    "..adeacbbbcgcgcbbbccada..",
    "..adacbcccbcccbcccbcada..",
    "..abaccaaacccccaaaccaba..",
    "..bobbavaracccaravabbob..",
    "..bcbcarpaacccaapracbcb..",
    "..bcbbarppbgcgbpprabbcb..",
    "..abbobbrppgggpprbbobba..",
    "..adbocgwgggggggwgcobda..",
    "..aedbocgggbbbggccobdea..",
    "..aeddbbccgbrbgccbbddea..",
    ".aeededdbbococobbddedeea.",
    ".aideeddddbbbbbddddeedia.",
    "aiedeeddfqhhqhhqfddeedeia",
    "aideeddbqhhlmlhhqbddeedia",
    "aedeeddbfhhhqhhhfbddeedea",
    "aeaeedbgqhjlmljhqgbdeeaea",
    "aeadedbgfhjhqhjhfgbdedaea",
    ".a.aebccfhjlmljhfccbea.a.",
    ".a.adbgfhjjhqhjjhfgbda.a.",
    "....abgfhjjlmljjhfgba....",
    "....bcgfhjjhfhjjhfgcb....",
    "....bckfhjjflfjjhfkcb....",
    "....bokfffffnfffffkob....",
    ".....bkmknlmnmlnkmkb.....",
    ".....kmllnlmnmlnllmk.....",
    ".....kmkmnlnnnlnmkmk.....",
    "......kkmnlnnnlnmkk......",
    "........kkkkkkkkk........",
    ".......tuuxt.txuut.......",
    "......ffffff.ffffff......",
    "......fjjjhf.fhjjjf......",
    "......ffffff.ffffff......",
  ];
  // closed eyes: paint both eyes over with skin, then draw a lash line
  const CLOSED = STAND.map((row, y) => {
    if (y < 11 || y > 15) return row;
    const r = [...row];
    for (const [x0, x1] of [[6, 10], [14, 18]]) {
      for (let x = x0; x <= x1; x++) r[x] = "c";
      if (y === 14) for (let x = x0 + 1; x < x1; x++) r[x] = "a";
      if (y === 13) r[x0] = r[x1] = "a";
    }
    return r.join("");
  });
  const MUZI = { stand: STAND, blink: CLOSED, sit: CLOSED };
  const MUZI_W = STAND[0].length;
  const CAT = {
    walkA: [
      "...............K......K...",
      "..............KOK....KOK..",
      "..KK..........KOIK..KIOK..",
      ".KOQK........KOOOOKKOOOOK.",
      ".KOK.........KOOOOOOOOOOK.",
      ".KOK.........KWHKWWWWHKWK.",
      "..KOK........KWKKWWWWKKWK.",
      "..KOK........KWKKWNNWKKWK.",
      "...KOKKKKKKKKKIWWWKKWWWIK.",
      "...KOOQQOOWWWOOKWWWWWWWK..",
      "...KOOQOOWWWWWOOKKKKKKK...",
      "...KWOOWWWWWWWWWWWWWVK....",
      "...KVWWWWWWWWWWWWWWVVK....",
      "...KVVKVVKVVVVVKVVKVK.....",
      "...KWK.KWWK...KWK.KWWK....",
      "..KWWK..KWWK.KWWK..KWWK...",
      "..KKKK..KKKK.KKKK..KKKK...",
    ],
    walkB: [
      "...............K......K...",
      "..............KOK....KOK..",
      "...KK.........KOIK..KIOK..",
      "..KOQK.......KOOOOKKOOOOK.",
      "..KOK........KOOOOOOOOOOK.",
      "..KOK........KWHKWWWWHKWK.",
      "..KOK........KWKKWWWWKKWK.",
      "..KOK........KWKKWNNWKKWK.",
      "...KOKKKKKKKKKIWWWKKWWWIK.",
      "...KOOQQOOWWWOOKWWWWWWWK..",
      "...KOOQOOWWWWWOOKKKKKKK...",
      "...KWOOWWWWWWWWWWWWWVK....",
      "...KVWWWWWWWWWWWWWWVVK....",
      "...KVVVVVVVVVVVVVVVVVK....",
      "....KWK.KWK...KWK.KWK.....",
      "....KWK.KWK...KWK.KWK.....",
      "....KKK.KKK...KKK.KKK.....",
    ],
    sit: [
      "........K......K....",
      ".......KOK....KOK...",
      ".......KOIK..KIOK...",
      "......KOOOOKKOOOOK..",
      "......KOOOOOOOOOOK..",
      "......KWHKWWWWHKWK..",
      "......KWKKWWWWKKWK..",
      "......KWKKWNNWKKWK..",
      "......KIWWWKKWWWIK..",
      ".......KOWWWWWWOK...",
      "......KOOWWWWWWOOK..",
      "......KOOWWWWWWOOK..",
      ".....KOOOWWWWWWOOOK.",
      "KK...KQOOWWWWWWOOQK.",
      "KOK..KQOWWKWWKWWOQK.",
      ".KOOKKVWWWKWWKWWWVK.",
      "..KKKKKKKKKKKKKKKKK.",
    ],
  };

  // ---------- characters ----------
  const layer = document.createElement("div");
  layer.className = "mascots";
  layer.setAttribute("aria-hidden", "true");
  bar.appendChild(layer);

  function makeSprite(frames, name) {
    const el = document.createElement("div");
    el.className = `mascot mascot-${name}`;
    const canvas = document.createElement("canvas");
    const bubble = document.createElement("span");
    bubble.className = "mascot-bubble";
    el.append(canvas, bubble);
    layer.appendChild(el);
    return { el, canvas, bubble, frames, frame: null, x: 0, dir: 1, scale: 1, bubbleUntil: 0 };
  }
  const muzi = makeSprite(MUZI, "muzi");
  const cat = makeSprite(CAT, "cat");

  function draw(sprite, frameName) {
    if (sprite.frame === frameName) return;
    sprite.frame = frameName;
    const rows = sprite.frames[frameName];
    const s = sprite.scale;
    sprite.canvas.width = rows[0].length * s;
    sprite.canvas.height = rows.length * s;
    const ctx = sprite.canvas.getContext("2d");
    rows.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch === "." || !PALETTE[ch]) return;
      ctx.fillStyle = PALETTE[ch];
      ctx.fillRect(x * s, y * s, s, s);
    }));
  }

  function say(sprite, text, ms = 2200) {
    sprite.bubble.textContent = text;
    sprite.bubble.classList.toggle("left", sprite.x > maxX - 70);   // near the right edge, talk to the left
    sprite.bubble.classList.add("show");
    sprite.bubbleUntil = performance.now() + ms;
  }

  function place(sprite, lift = 0, tilt = 0) {
    sprite.el.style.transform = `translate(${sprite.x}px, ${-lift}px)`;
    sprite.canvas.style.transform = `scaleX(${sprite.dir}) rotate(${tilt}deg)`;
  }

  // walkable strip: from just after the traffic-light dots to the right edge
  let minX = 0, maxX = 0;
  function measure() {
    const phone = window.innerWidth <= 560;
    muzi.scale = 1;                     // the chibi is already detailed: one sprite pixel per CSS pixel
    cat.scale = 1;
    muzi.frame = cat.frame = null;
    const dots = bar.querySelector(".dots");
    const barBox = bar.getBoundingClientRect();
    minX = dots ? dots.getBoundingClientRect().right - barBox.left + 14 : 80;
    maxX = barBox.width - MUZI_W * muzi.scale - 16;
    muzi.x = Math.min(Math.max(muzi.x || (minX + maxX) / 2, minX), maxX);
    cat.x = Math.min(Math.max(cat.x || muzi.x - 40, minX), maxX);
  }
  measure();
  window.addEventListener("resize", measure);

  // ---------- behaviour ----------
  const sleepyHour = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes() >= 23 * 60 + 30 || d.getHours() < 6; };
  const rand = (a, b) => a + Math.random() * (b - a);
  let task = { kind: "idle", until: 0 };

  function nextTask(now) {
    const r = Math.random();
    if (sleepyHour() && r < 0.45) return start("sleep", now, rand(6000, 10000));
    if (r < 0.45) return walkTo(rand(minX, maxX), now);
    if (r < 0.58) return start("wave", now, 2200, "hi!");
    if (r < 0.68) return start("dance", now, 3600, "♪ ♫");
    if (r < 0.78) return start("coffee", now, 3000, "☕");
    if (r < 0.86) return start("tennis", now, 2600, "🎾");
    if (r < 0.92) return start("sleep", now, 5000, "z z z");
    return start("idle", now, rand(1500, 3500));
  }
  function start(kind, now, ms, text) {
    task = { kind, until: now + ms };
    if (text) say(muzi, text, Math.min(ms, 2600));
    if (kind === "sleep") say(muzi, "z z z", ms);
  }
  function walkTo(x, now) {
    task = { kind: "walk", target: Math.min(Math.max(x, minX), maxX), until: now + 15000 };
  }

  // reactions to what visitors type in the terminal
  const REACT = {
    about: ["wave", "hi! 👋"], sports: ["tennis", "🎾"], music: ["dance", "♪ ♫"], travel: ["wave", "✈️"],
    blog: ["coffee", "✍️"], contact: ["wave", "📬"], muzi: ["dance", "that's me!"], photography: ["wave", "📸"],
    projects: ["coffee", "💻"], experience: ["coffee", "💻"], education: ["wave", "🎓"], skills: ["coffee", "🧠"],
    passion: ["dance", "✦"], help: ["wave", "?"], clear: ["wave", "✨"], error: ["idle", "🤔"],
  };
  window.addEventListener("terminal-command", (e) => {
    const r = REACT[e.detail];
    if (r) start(r[0], performance.now(), 2600, r[1]);
  });

  // clicks
  muzi.el.addEventListener("click", () => {
    hopUntil = performance.now() + 450;
    say(muzi, ["hi! 👋", "you found me ✦", "type muzi ✦", "☕?", "hehe"][Math.floor(Math.random() * 5)]);
  });
  cat.el.addEventListener("click", () => say(cat, "meow!", 1600));
  let hopUntil = 0;

  // ---------- animation loop ----------
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const tick = Math.floor(now / 180) % 2;           // shared 2-frame rhythm
    let lift = 0, tilt = 0;

    if (now > task.until && task.kind !== "walk") nextTask(now);
    switch (task.kind) {
      case "walk": {
        const d = task.target - muzi.x;
        if (Math.abs(d) < 1 || now > task.until) { task = { kind: "idle", until: now + rand(800, 2500) }; draw(muzi, "stand"); break; }
        muzi.dir = Math.sign(d);
        muzi.x += muzi.dir * Math.min(Math.abs(d), 34 * dt);
        draw(muzi, "stand"); lift = tick ? 2 : 0;          // little hop-steps
        break;
      }
      case "wave": draw(muzi, "stand"); tilt = tick ? 7 : -7; break;
      case "dance": draw(muzi, tick ? "blink" : "stand"); lift = tick ? 3 : 0; tilt = tick ? -9 : 9; break;
      case "tennis": draw(muzi, "stand"); lift = Math.abs(Math.sin(now / 160)) * 5; break;
      case "coffee": draw(muzi, Math.floor(now / 900) % 2 ? "blink" : "stand"); tilt = Math.sin(now / 450) * 3; break;
      case "sleep": draw(muzi, "sit"); tilt = 6; break;
      default: draw(muzi, now % 3200 < 140 ? "blink" : "stand");
    }
    if (now < hopUntil) lift = Math.sin(((hopUntil - now) / 450) * Math.PI) * 8;
    place(muzi, lift, tilt);

    // Captain trails a little behind Muzi, and sits when she's busy or asleep
    const gap = MUZI_W * muzi.scale + 4;
    let catTarget = muzi.x - muzi.dir * gap;                      // behind her...
    if (catTarget < minX || catTarget > maxX) catTarget = muzi.x + muzi.dir * gap;   // ...or in front if there's no room
    catTarget = Math.min(Math.max(catTarget, minX), maxX);
    const cd = catTarget - cat.x;
    if (Math.abs(cd) > 3) {
      cat.dir = Math.sign(cd);
      cat.x += cat.dir * Math.min(Math.abs(cd), 30 * dt);
      draw(cat, Math.floor(now / 150) % 2 ? "walkA" : "walkB");
    } else {
      draw(cat, "sit");
      if (task.kind === "sleep" && !cat.bubble.classList.contains("show")) say(cat, "zz", 3000);
    }
    place(cat);

    for (const s of [muzi, cat]) if (s.bubble.classList.contains("show") && now > s.bubbleUntil) s.bubble.classList.remove("show");
    if (!reduced) requestAnimationFrame(frame);
  }

  if (reduced) {
    // still life: Muzi standing with Captain sitting beside her
    draw(muzi, "stand"); draw(cat, "sit"); place(muzi); cat.x = muzi.x - MUZI_W * muzi.scale - 4; place(cat);
    muzi.el.addEventListener("click", () => say(muzi, "hi! 👋"));
    setInterval(() => { for (const s of [muzi, cat]) if (performance.now() > s.bubbleUntil) s.bubble.classList.remove("show"); }, 500);
  } else {
    requestAnimationFrame(frame);
  }
})();
