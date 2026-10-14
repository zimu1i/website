// Mini Muzi & Captain: tiny pixel-art characters that live on the terminal's title bar.
// Muzi wanders, waves, dances, sips coffee, plays tennis and naps; Captain (the cat) follows her.
// They react to terminal commands (see the `terminal-command` event in script.js) and to clicks.
(function () {
  const bar = document.querySelector(".titlebar");
  if (!bar) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- pixel art (one character per pixel; "." is transparent) ----------
  const PALETTE = {
    H: "#3a2d4f", h: "#5b4878",            // hair + highlight
    S: "#f6d3bd", E: "#1b1426", B: "#f7768e", // skin, eyes, blush
    T: "#bb9af7", t: "#9d7cd8",            // lavender top + shade
    P: "#4b4387", F: "#fff3a3",            // pants, yellow shoes
    W: "#f3ead8", O: "#efb27c", K: "#1b1426", N: "#f7a1b0", // cat: cream, orange, eyes, nose
  };
  const HEAD = [
    "...HHHHHH...",
    "..HHhhHHHH..",
    ".HHHHHHHHHH.",
    ".HSSSSSSSSH.",
    ".HSESSSSESH.",
    ".HSBSSSSBSH.",
    ".HHSSSSSSHH.",
    ".HH..SS..HH.",
  ];
  const BLINK = HEAD.slice(0, 4).concat([".HSSSSSSSSH."], HEAD.slice(5));
  const SLEEPY = HEAD.slice(0, 4).concat([".HSEESSEESH."], HEAD.slice(5));
  const BODY = [".HTTTTTTTTH.", ".HTtTTTTtTH.", "..STTTTTTS..", "...TTTTTT..."];
  const ARM_UP = [".HTTTTTTTTHS", ".HTtTTTTtTH.", "..STTTTTT...", "...TTTTTT..."];
  const ARM_UP2 = [".HTTTTTTTTH.", ".HTtTTTTtTH.", "..STTTTTT...", "...TTTTTT..."];
  const LEGS_A = ["...PP..PP...", "..PP....PP..", ".FFF....FFF.", "............"];
  const LEGS_B = ["....PPPP....", "....PPPP....", "...FFFFFF...", "............"];
  const LEGS_SIT = [".PPPPPPPPPP.", ".FF......FF.", "............", "............"];
  const wave1 = HEAD.slice(0, 6).concat([".HHSSSSSSHHS", ".HH..SS..HHS"]);
  const MUZI = {
    stand: [...HEAD, ...BODY, ...LEGS_B],
    blink: [...BLINK, ...BODY, ...LEGS_B],
    walkA: [...HEAD, ...BODY, ...LEGS_A],
    walkB: [...HEAD, ...BODY, ...LEGS_B],
    wave1: [...wave1, ...ARM_UP, ...LEGS_B],
    wave2: [...HEAD, ...ARM_UP2.map((r, i) => (i === 0 ? ".HTTTTTTTTHS" : r)), ...LEGS_B],
    danceA: [...wave1, ...ARM_UP, ...LEGS_A],
    danceB: [...HEAD, ...BODY, ...LEGS_B],
    sit: [...SLEEPY, ...BODY, ...LEGS_SIT],
  };
  const CAT = {
    walkA: [
      "........O..O",
      "........OWWO",
      "O.......WKWK",
      "OO.....WWWNW",
      ".OWWWWWWWWW.",
      "..WOOWWWOWW.",
      "..WWWWWWWWW.",
      "..W.W..W.W..",
    ],
    walkB: [
      "........O..O",
      "........OWWO",
      ".O......WKWK",
      ".O.....WWWNW",
      ".OWWWWWWWWW.",
      "..WOOWWWOWW.",
      "..WWWWWWWWW.",
      "...W.W.W.W..",
    ],
    sit: [
      "............",
      "........O..O",
      "........OWWO",
      "........WKWK",
      "OO.....WWWNW",
      ".OWWWWWWWWW.",
      "..WOOWWWOWWW",
      "..WWWWWWWWWW",
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

  function place(sprite, lift = 0) {
    sprite.el.style.transform = `translate(${sprite.x}px, ${-lift}px)`;
    sprite.canvas.style.transform = `scaleX(${sprite.dir})`;
  }

  // walkable strip: from just after the traffic-light dots to the right edge
  let minX = 0, maxX = 0;
  function measure() {
    const phone = window.innerWidth <= 560;
    muzi.scale = phone ? 2 : 2.5;
    cat.scale = phone ? 1.6 : 2;
    muzi.frame = cat.frame = null;
    const dots = bar.querySelector(".dots");
    const barBox = bar.getBoundingClientRect();
    minX = dots ? dots.getBoundingClientRect().right - barBox.left + 14 : 80;
    maxX = barBox.width - 12 * muzi.scale - 16;
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
    let lift = 0;

    if (now > task.until && task.kind !== "walk") nextTask(now);
    switch (task.kind) {
      case "walk": {
        const d = task.target - muzi.x;
        if (Math.abs(d) < 1 || now > task.until) { task = { kind: "idle", until: now + rand(800, 2500) }; draw(muzi, "stand"); break; }
        muzi.dir = Math.sign(d);
        muzi.x += muzi.dir * Math.min(Math.abs(d), 34 * dt);
        draw(muzi, tick ? "walkA" : "walkB");
        break;
      }
      case "wave": draw(muzi, tick ? "wave1" : "wave2"); break;
      case "dance": draw(muzi, tick ? "danceA" : "danceB"); lift = tick ? 2 : 0; break;
      case "tennis": draw(muzi, Math.floor(now / 260) % 2 ? "wave1" : "stand"); break;
      case "coffee": draw(muzi, Math.floor(now / 900) % 2 ? "wave2" : "stand"); break;
      case "sleep": draw(muzi, "sit"); break;
      default: draw(muzi, now % 3200 < 140 ? "blink" : "stand");
    }
    if (now < hopUntil) lift = Math.sin(((hopUntil - now) / 450) * Math.PI) * 8;
    place(muzi, lift);

    // Captain trails a little behind Muzi, and sits when she's busy or asleep
    const gap = 12 * muzi.scale + 4;
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
    draw(muzi, "stand"); draw(cat, "sit"); place(muzi); cat.x = muzi.x - 12 * muzi.scale - 4; place(cat);
    muzi.el.addEventListener("click", () => say(muzi, "hi! 👋"));
    setInterval(() => { for (const s of [muzi, cat]) if (performance.now() > s.bubbleUntil) s.bubble.classList.remove("show"); }, 500);
  } else {
    requestAnimationFrame(frame);
  }
})();
