// ============================================================
//  EDIT YOUR CONTENT HERE
// ============================================================
const PROFILE = {
  username: "muzi",
  normalSite: "#", // link to a "normal" version of your site, or remove
  // Formatting: **bold**  ==highlight==  _serif italic_  {y:yellow}  {p:purple}  {c:cyan}
  about: [
    "Hi! I'm _Muzi Li_ 👋",
    "",
    "I'm a **Data Science** student at the {p:University of Waterloo}, based in {y:Toronto}, working at the intersection of ==reinforcement learning==, ==deep learning==, and ==information retrieval==.",
    "",
    "Right now I'm an _undergrad research assistant_ at the **Vision and Image Processing Lab**, teaching simulated humanoids to play {y:tennis} 🎾.",
    "",
    "Off the keyboard: tennis, dance _(15 years!)_, photography, and hiking.",
    "I speak English, French, Mandarin, and conversational Spanish.",
  ],
  education: [
    {
      title: "University of Waterloo",
      meta: "BMath, Data Science (Honours, Co-op) · Sep 2025 – Apr 2030 (expected)",
      bullets: [
        "_Relevant coursework:_ Linear Algebra I, Calculus I–III, ==Probability==, ==Statistics==, **Data Structures**, **Algorithm Design**, Object-Oriented Software Development, and Logic and Computation.",
      ],
    },
    {
      title: "Certificates",
      meta: "",
      bullets: [
        "**Machine Learning Specialization** _(DeepLearning.AI)_",
      ],
    },
  ],
  experience: [
    {
      title: "Undergraduate Research Assistant",
      logo: "assets/viplab-logo.png",
      meta: "Vision and Image Processing Lab, UWaterloo · Sep 2026 – Present",
      note: "Reinforcement learning for humanoid tennis, supervised by Dr. Yuhao Chen",
      bullets: [
        "Researching ==reinforcement learning== for _humanoid sports control_ ({y:tennis}) with **Dr. Yuhao Chen**, applying simulation-based training and reward design.",
      ],
    },
    {
      title: "AI Algorithm Engineer Intern",
      logo: "assets/qubot-logo.png",
      meta: "Qubot Technology · Shanghai · May 2026 – Aug 2026",
      note: "Physics simulation and reinforcement learning",
      bullets: [
        "Framed autonomous instrument navigation as an ==RL problem== in a custom Gymnasium env, training **PPO agents** (PyTorch, Stable-Baselines3) in {p:NVIDIA Isaac Sim}.",
        "Diagnosed a _value-function collapse_ and fixed it with **reward engineering**, **curriculum learning**, and Optuna hyperparameter search.",
        "Built an ==automated validation pipeline== (Python, trimesh, FFmpeg) benchmarking the learned policy and flagging _safety-constraint_ violations.",
      ],
    },
  ],
  skills: {
    Programming: ["==Python==", "C/C++", "SQL"],
    "ML & Deep Learning": ["==PyTorch==", "==JAX==", "Flax", "Optax", "scikit-learn", "XGBoost", "SHAP", "U-Net / CNNs", "RL (PPO, SB3, Gymnasium)"],
    "LLMs & Retrieval": ["==RAG==", "BM25 / dense retrieval", "Embeddings", "Prompt engineering", "Structured outputs", "LLM evaluation"],
    "Systems & Tools": ["FastAPI", "REST APIs", "Docker", "vLLM", "Playwright", "SQLite", "==DuckDB==", "pandas", "NumPy", "Git", "Linux", "bash", "pytest"],
  },
  projects: [
    {
      title: "Decoder-Only Transformer from Scratch",
      meta: "JAX · Flax · Optax · Sep 2026",
      link: "https://github.com/zimu1i/jax-transformer",
      bullets: [
        "Hand-derived ==multi-head causal self-attention==, positional embeddings and pre-norm residual blocks in raw jax.numpy, with _no library attention layers._",
        "Trained a **105K-param** model, cutting loss from {y:3.34} _(chance)_ to {y:0.05} in 30 epochs; **22 unit tests** cover shapes, causal masking and gradient flow.",
      ],
    },
    {
      title: "Learned Denoiser for Monte Carlo Renders",
      meta: "PyTorch · NumPy · Blender Python API · Aug 2026",
      link: "https://github.com/zimu1i/render-denoiser",
      bullets: [
        "Trained a ==U-Net== that improves held-out PSNR by {y:7.85 dB}, a **6x effective compute reduction**, within 2.24 dB of a production denoiser.",
        "Ran an ablation that _contradicted expectations_, traced it to a channel variance mismatch, and caught a baseline **gaming PSNR**.",
      ],
    },
    {
      title: "Wimbledon 2026 Match Outcome Prediction",
      meta: "Python · XGBoost · SHAP · DuckDB SQL · Jun 2026",
      link: "https://github.com/zimu1i/wimbledon-winner-prediction",
      bullets: [
        "Scoped and built an ==end-to-end data pipeline== over **120,000 matches**, using DuckDB SQL to clean, join and validate the data before modeling, reaching {y:71.5%} accuracy and {y:0.774} AUC-ROC.",
        "Used ==SHAP== to explain the model's decisions in _plain, non-technical_ terms.",
      ],
    },
    {
      title: "LegalMind: Hybrid Retrieval over Canadian Corporate Law",
      meta: "Python · NumPy · PyMuPDF · OpenAI API · pytest · Jun 2026",
      link: "https://github.com/zimu1i/legal-mind-rag",
      bullets: [
        "Built ==hybrid retrieval== from _first principles_ (BM25, cosine similarity, reciprocal rank fusion): hit@3 {y:0.65 → 0.96}, MRR {y:0.61 → 0.82}.",
        "Layout analysis over a **253-page** bilingual document cut index noise by {y:49.7%}; citation auditing with **0 unsupported citations** across 244 tests.",
      ],
    },
    {
      title: "QubotTalent: AI Recruiting Platform",
      meta: "Python · FastAPI · vLLM · Playwright · Docker · SQLite · May 2026",
      bullets: [
        "Replaced a manual Qubot workflow eating **7 hours/day** with an ==AI-driven pipeline== processing {y:2,922} profiles per run. Owned it _end to end_, from scoping with stakeholders to shipping.",
        "Built a ==live evaluation loop== sampling {y:15%} of outputs for human review, iterating in production instead of waiting for perfect.",
      ],
    },
  ],
  contactIntro: "_Let's chat!_ The best way to reach me is **email**. I'm always happy to talk about ==ML==, research, or tennis.",
  contact: [
    { label: "Email",    value: "muzi.li1@uwaterloo.ca",     href: "mailto:muzi.li1@uwaterloo.ca" },
    { label: "GitHub",   value: "github.com/zimu1i",          href: "https://github.com/zimu1i" },
    { label: "LinkedIn", value: "linkedin.com/in/muzi-li01",  href: "https://www.linkedin.com/in/muzi-li01/" },
    { label: "Location", value: "Toronto, ON, Canada",        href: "" },
    { label: "Current timezone", clock: "America/Toronto" }, // live clock in this IANA timezone
  ],
  // `passion` sections: each key is also a command (e.g. `travel` or `passion travel`)
  passion: {
    travel: {
      desc: "Places I've been",
      intro: "I _loooooove_ exploring _new cities_, **food**, and **languages**.",
      // each place gets a star on the dotted map (lat/lon in degrees; south & west are negative)
      // `country` groups the labels on the map; a place that is itself a country needs no `country`
      places: [
        { name: "Vancouver",            country: "Canada", lat: 49.28, lon: -123.12 },
        { name: "Toronto",              country: "Canada", lat: 43.65, lon: -79.38 },
        { name: "Montréal",             country: "Canada", lat: 45.50, lon: -73.57 },
        { name: "Quebec City",          country: "Canada", lat: 46.81, lon: -71.21 },
        { name: "New Brunswick",        country: "Canada", lat: 45.96, lon: -66.64 }, // Fredericton
        { name: "Nova Scotia",          country: "Canada", lat: 44.65, lon: -63.57 }, // Halifax
        { name: "Prince Edward Island", country: "Canada", lat: 46.24, lon: -63.13 }, // Charlottetown
        { name: "New York",             country: "USA",    lat: 40.71, lon: -74.01 },
        { name: "Burlington",           country: "USA",    lat: 44.48, lon: -73.21 }, // Vermont
        { name: "Orlando",              country: "USA",    lat: 28.54, lon: -81.38 },
        { name: "Miami",                country: "USA",    lat: 25.76, lon: -80.19 },
        { name: "Beijing",              country: "China",  lat: 39.90, lon: 116.40 },
        { name: "Xi'an",                country: "China",  lat: 34.34, lon: 108.94 },
        { name: "Shanghai",             country: "China",  lat: 31.23, lon: 121.47 },
        { name: "Suzhou",               country: "China",  lat: 31.30, lon: 120.58 },
        { name: "Hangzhou",             country: "China",  lat: 30.27, lon: 120.16 },
        { name: "Nanjing",              country: "China",  lat: 32.06, lon: 118.80 },
        { name: "Yunnan",               country: "China",  lat: 25.04, lon: 102.71 }, // Kunming
        { name: "Guangzhou",            country: "China",  lat: 23.13, lon: 113.26 },
        { name: "Hong Kong",   lat: 22.32, lon: 114.17 },
        { name: "South Korea", lat: 37.57, lon: 126.98 }, // Seoul
        { name: "Japan",       lat: 35.68, lon: 139.69 }, // Tokyo
        { name: "Netherlands", lat: 52.37, lon: 4.90 },   // Amsterdam
        { name: "Germany",     lat: 52.52, lon: 13.40 },  // Berlin
        { name: "Belgium",     lat: 50.85, lon: 4.35 },   // Brussels
        { name: "Luxembourg",  lat: 49.61, lon: 6.13 },
        { name: "Paris",       country: "France", lat: 48.86, lon: 2.35 },
        { name: "Toulouse",    country: "France", lat: 43.60, lon: 1.44 },
        { name: "Egypt",       lat: 30.04, lon: 31.24 },  // Cairo
        // wishlist: places I want to visit (drawn in cyan)
        { name: "Iceland",    wish: true, lat: 64.15, lon: -21.94 },  // Reykjavík
        { name: "Norway",     wish: true, lat: 59.91, lon: 10.75 },   // Oslo
        { name: "Italy",      wish: true, lat: 41.90, lon: 12.50 },   // Rome
        { name: "Türkiye",    wish: true, lat: 41.01, lon: 28.98 },   // Istanbul
        { name: "Antarctica", wish: true, lat: -64.80, lon: -62.90 }, // Antarctic Peninsula
        { name: "Amazon Rainforest", wish: true, lat: -3.40, lon: -62.20 }, // heart of the Amazon, Brazil
      ],
      items: [
        { title: "North America", meta: "", bullets: [
          "**Canada** ({y:Toronto}, Montréal, Quebec City, Vancouver, New Brunswick, Nova Scotia, Prince Edward Island)",
          "**USA** (New York, Burlington, Orlando, Miami)",
        ] },
        { title: "East Asia", meta: "", bullets: [
          "**China** (Beijing, Xi'an, {y:Shanghai}, Suzhou, Hangzhou, Nanjing, Yunnan, Guangzhou)",
          "**Hong Kong**, **South Korea**, **Japan**",
        ] },
        { title: "Europe", meta: "", bullets: [
          "**France** (Paris, Toulouse)",
          "**Belgium**, **the Netherlands**, **Luxembourg**, **Germany**",
        ] },
        { title: "Africa", meta: "", bullets: ["**Egypt**"] },
        { title: "On my wishlist ✈️", meta: "", bullets: ["{c:Iceland}, {c:Norway}, {c:Italy}, {c:Türkiye}, the {c:Amazon Rainforest} and, one day, {c:Antarctica}."] },
      ],
    },
    sports: {
      desc: "How I stay active",
      intro: "_Moving is how I reset._",
      items: [
        { title: "Tennis", meta: "", figure: "emoji:🎾", bullets: [
          "My **favourite sport**, on the court and in the lab, where I'm teaching _simulated humanoids_ to play it at the ==VIP Lab==.",
          "_In my bag:_ a {y:Yonex Percept 100L}.",
        ] },
        { title: "Dance", meta: "15 years", figure: "assets/figures/pointe-shoes.png", bullets: [
          "Name a style and I've probably danced it: **ballet**, **modern**, **hip-hop**, **jazz**, **tap**, ==traditional Chinese dance==, **flamenco**, **K-pop**, and _plenty more._",
        ] },
        { title: "Hiking", meta: "", figure: "emoji:🍁", bullets: [
          "My favourite weekend plan is climbing a mountain _(hehe)_.",
          "Best of all in ==Canadian autumn==, when the trails glow with {y:red and gold maple leaves}.",
        ] },
      ],
    },
    photography: {
      desc: "Through my lens",
      intro: "I like capturing _light_, **people**, and places. Click a photo to view it.",
      // shown as a gallery; `src` = full size, `thumb` = small preview (see assets/photos)
      photos: [
        { src: "assets/photos/notre-dame.jpg",      caption: "Notre-Dame Basilica, Montréal" },
        { src: "assets/photos/fountain-statue.jpg", caption: "Lamplight and reflections" },
        { src: "assets/photos/bernese.jpg",         caption: "Best friend" },
        { src: "assets/photos/ferris-wheel.jpg",    caption: "La Grande Roue de Montréal" },
        { src: "assets/photos/oratory.jpg",         caption: "Saint Joseph's Oratory, Montréal" },
        { src: "assets/photos/maple-taffy.jpg",     caption: "Maple taffy on snow" },
        { src: "assets/photos/pool-hall.jpg",       caption: "Pool hall after dark" },
        { src: "assets/photos/black-lab.jpg",       caption: "Hello there" },
      ],
      items: [],
    },
    music: {
      desc: "What's on repeat",
      intro: "_Music is the soundtrack to everything I do._",
      items: [
        { title: "All-time favourite ⭐", meta: "", figure: "assets/figures/jennie-ruby.png", figureSize: "lg", bullets: [
          "**Jennie**, now and forever.",
          "_Favourite album:_ {y:Ruby}",
        ] },
        { title: "On repeat lately 🎧", meta: "",
          tags: ["Tyla", "Justin Bieber", "Tate McRae", "Zara Larsson", "Lana Del Rey", "颜人中 (Yan Renzhong)"],
          footnote: "_...and plenty more on shuffle._",
          bullets: [] },
      ],
    },
  },
};

// ============================================================
//  TERMINAL ENGINE
// ============================================================
const output = document.getElementById("output");
const input = document.getElementById("input");
const form = document.getElementById("prompt-form");
const terminal = document.getElementById("terminal");

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const COMMANDS = {
  help:      { desc: "List commands",      run: help },
  about:     { desc: "About Me",           run: about },
  education:  { desc: "My Education",       run: education },
  experience: { desc: "My Experience",      run: experience },
  skills:    { desc: "My Tech Skills",     run: skills },
  projects:  { desc: "My Tech Projects",   run: projects },
  contact:   { desc: "Contact Me",         run: contact },
  passion:   { desc: "Things I love",      run: passion },
  prev:      { desc: "Go back one directory", run: prev },
  clear:     { desc: "Clear terminal",     run: clear },
};
// hidden extras
const EXTRAS = {
  whoami: () => `<p class="line">${esc(PROFILE.username)}</p>`,
  date:   () => `<p class="line">${esc(new Date().toString())}</p>`,
  ls:     () => {
    const kids = cwd.length === 0 ? Object.keys(COMMANDS).filter((c) => !NOT_DIRS.includes(c))
      : cwd.length === 1 && cwd[0] === "passion" ? Object.keys(PROFILE.passion) : [];
    return kids.length ? `<p class="line">${kids.map((k) => `<span class="accent clickable" data-cmd="cd ${esc(pathString([...cwd, k]))}">${esc(k)}/</span>`).join("  ")}</p>` : "";
  },
  pwd:    () => `<p class="line">${esc(pathString())}</p>`,
  cd:     (args) => cd(args[0]),
  sudo:   () => `<p class="line error">nice try. this incident will be reported.</p>`,
  echo:   (args) => `<p class="line">${esc(args.join(" "))}</p>`,
};

function help() {
  const rows = Object.entries(COMMANDS)
    .filter(([name]) => !["help", "prev", "clear"].includes(name))
    .map(([name, c]) =>
      `<div class="help-row"><span class="cmd" data-cmd="cd ~/${name}">${name}</span><span class="desc">${c.desc}</span></div>`)
    .join("");
  const where = cwd.length
    ? `<p class="line hint" style="margin-top:1.2rem">You're in <span class="path">${esc(pathString())}</span>. These live in <span class="path">~</span>, so type <span class="accent clickable" data-cmd="prev">prev</span> to go back first (or click one to jump there).</p>`
    : `<p class="line hint" style="margin-top:1.2rem">Type one of the above to view. For eg. <span class="accent clickable" data-cmd="about">about</span></p>`;
  return `${rows}${where}
    <p class="line hint">Type <span class="accent clickable" data-cmd="prev">prev</span> to go back one directory, or <span class="accent clickable" data-cmd="clear">clear</span> to clear the terminal.</p>
    <p class="line hint">Press <span class="accent">Tab</span> to autocomplete.</p>`;
}

// Tiny markup for profile text (escaped first, so it's safe):
// **bold**  ==highlight==  _serif italic_  {y:yellow}  {p:purple}  {c:cyan}
function fmt(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong class="kw-bold">$1</strong>')
    .replace(/==(.+?)==/g, '<mark class="kw-mark">$1</mark>')
    .replace(/(^|[\s(])_(.+?)_(?=[\s).,!?]|$)/g, '$1<em class="kw-serif">$2</em>')
    .replace(/\{([ypc]):(.+?)\}/g, (_, c, t) => `<span class="kw-${c}">${t}</span>`);
}

function about() {
  requestAnimationFrame(drawPortraits);
  const text = PROFILE.about.map((l) => `<p class="line">${fmt(l)}</p>`).join("");
  return `<div class="about-wrap">
    <canvas class="portrait" aria-label="Dot portrait of ${esc(PROFILE.username)}" role="img"></canvas>
    <div class="about-text">${text}</div>
  </div>`;
}

// ---------- halftone portrait ----------
// Big dotted sparkles behind the portrait, in grid coordinates (col, row, radius in cells).
const PORTRAIT_STARS = [
  { c: 9,  r: 10, size: 9 },
  { c: 63, r: 7,  size: 6 },
  { c: 66, r: 38, size: 7 },
  { c: 5,  r: 42, size: 5 },
  { c: 54, r: 22, size: 3 },
  { c: 18, r: 27, size: 3 },
  { c: 40, r: 2,  size: 2.5 },
];

// 4-point sparkle: concave diamond core + soft glow, 0..1
function sparkle(dx, dy, size) {
  const x = Math.abs(dx) / size, y = Math.abs(dy) / size;
  const core = 1 - Math.pow(Math.sqrt(x) + Math.sqrt(y), 2);
  const glow = 0.35 * Math.exp(-(x * x + y * y) * 9);
  return Math.max(0, Math.min(1, Math.max(core, glow)));
}

function drawPortraits() {
  if (typeof PORTRAIT === "undefined") return;
  document.querySelectorAll("canvas.portrait:not([data-drawn])").forEach((canvas) => {
    canvas.dataset.drawn = "1";
    const { cols, rows, data, mask } = PORTRAIT;
    const cssW = canvas.clientWidth;
    const cell = cssW / cols;
    const cssH = cell * rows;
    const dpr = window.devicePixelRatio || 1;
    canvas.style.height = `${cssH}px`;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const dots = [];   // portrait
    const stars = [];  // background sparkles
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c + 0.5) * cell, y = (r + 0.5) * cell;
        const v = +data[r][c] / 9;
        if (v > 0) {
          dots.push({ x, y, v, delay: 300 + r * 14 + Math.random() * 260 });
          continue;
        }
        if (mask && mask[r][c] === "1") continue; // behind the person: hidden
        let best = 0, which = 0;
        PORTRAIT_STARS.forEach((st, i) => {
          const sv = sparkle(c - st.c, r - st.r, st.size);
          if (sv > best) { best = sv; which = i; }
        });
        if (best > 0.08) {
          const dist = Math.hypot(c - PORTRAIT_STARS[which].c, r - PORTRAIT_STARS[which].r);
          stars.push({ x, y, v: best, star: which, delay: dist * 40 });
        } else if (Math.random() < 0.012) {
          stars.push({ x, y, v: 0.3 + Math.random() * 0.3, star: -1, delay: Math.random() * 800 });
        }
      }
    }

    const css = getComputedStyle(document.documentElement);
    const color = css.getPropertyValue("--portrait").trim() || "#c8b9ff";
    const starColor = css.getPropertyValue("--yellow").trim() || "#fff3a3";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phases = PORTRAIT_STARS.map(() => Math.random() * Math.PI * 2);
    const duration = 450;
    let mouse = null;
    canvas.addEventListener("mousemove", (e) => {
      const b = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - b.left, y: e.clientY - b.top };
    });
    canvas.addEventListener("mouseleave", () => { mouse = null; });

    const grow = (elapsed, delay) => {
      const p = Math.min(1, Math.max(0, (elapsed - delay) / duration));
      return 1 - Math.pow(1 - p, 3);
    };
    const hover = (d) => {
      if (!mouse) return 1;
      const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
      return dist < cell * 8 ? 1 + 0.5 * (1 - dist / (cell * 8)) : 1;
    };

    let start = null;
    function frame(t) {
      if (!canvas.isConnected) return; // terminal was cleared
      if (start === null) start = t;
      const elapsed = reduced ? Infinity : t - start;
      ctx.clearRect(0, 0, cssW, cssH);

      // background stars (twinkle forever unless reduced motion)
      ctx.fillStyle = starColor;
      for (const d of stars) {
        const g = grow(elapsed, d.delay);
        if (g <= 0) continue;
        const tw = reduced ? 1 : d.star >= 0
          ? 0.8 + 0.2 * Math.sin(t / 900 + phases[d.star])
          : 0.6 + 0.4 * Math.sin(t / 600 + d.x);
        ctx.globalAlpha = (0.35 + 0.6 * d.v) * tw;
        ctx.beginPath();
        ctx.arc(d.x, d.y, (cell / 2) * (0.25 + 0.7 * d.v) * g * hover(d), 0, Math.PI * 2);
        ctx.fill();
      }

      // portrait
      ctx.fillStyle = color;
      for (const d of dots) {
        const g = grow(elapsed, d.delay);
        if (g <= 0) continue;
        ctx.globalAlpha = 0.55 + 0.45 * d.v;
        ctx.beginPath();
        ctx.arc(d.x, d.y, (cell / 2) * (0.25 + 0.75 * d.v) * g * hover(d), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduced) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
}

// a date (range) at the end of a meta line, e.g. "Sep 2026", "May 2026 – Aug 2026", "Sep 2026 – Present"
const MONTH = "(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\\.? \\d{4}";
const DATE_AT_END = new RegExp(`(${MONTH}(?:\\s*[–-]\\s*(?:Present|${MONTH}))?(?:\\s*\\(expected\\))?)\\s*$`);

function renderItems(items, { bullets = true, yellowDates = false } = {}) {
  if (items.some((it) => it.logo || it.figure)) requestAnimationFrame(drawSeals);
  return items.map((it) => `
    <div class="item${it.logo || it.figure ? " has-logo" : ""}${it.figureSize === "lg" ? " feature" : ""}">
      ${it.logo || it.figure ? `<div class="logo-slot"><canvas class="dotlogo item-logo${it.figure ? " figure" : ""}${it.figureSize === "lg" ? " figure-lg" : ""}" data-src="${esc(it.logo || it.figure)}" aria-hidden="true"></canvas></div>` : ""}
      <div class="item-body">
      <div class="item-title">${it.link ? `<a href="${esc(it.link)}" target="_blank" rel="noopener">${esc(it.title)}</a>` : esc(it.title)}</div>
      ${it.meta ? `<div class="item-meta">${yellowDates ? fmt(it.meta).replace(DATE_AT_END, '<span class="item-date">$1</span>') : fmt(it.meta)}</div>` : ""}
      ${[].concat(it.note || []).map((n) => `<div class="bullet item-note">${fmt(n)}</div>`).join("")}
      ${bullets ? (it.bullets || []).map((b) => `<div class="bullet">${fmt(b)}</div>`).join("") : ""}
      ${it.tags ? `<div class="tags">${it.tags.map((t) => `<span class="tag">${fmt(t)}</span>`).join("")}</div>` : ""}
      ${it.footnote ? `<div class="item-footnote">${fmt(it.footnote)}</div>` : ""}
      </div>
    </div>`).join("");
}

function education() {
  requestAnimationFrame(drawSeals);
  return `<div class="about-wrap">
    <canvas class="dotlogo seal" data-src="assets/uwaterloo-seal.svg" data-mode="seal" role="img" aria-label="Dotted University of Waterloo seal"></canvas>
    <div class="about-text">${renderItems(PROFILE.education, { yellowDates: true })}</div>
  </div>`;
}

// ---------- dotted logo (samples an image into coloured dots) ----------
function drawSeals() {
  document.querySelectorAll("canvas.dotlogo:not([data-drawn])").forEach((canvas) => {
    canvas.dataset.drawn = "1";
    const img = new Image();
    img.onload = () => dotLogo(canvas, img);
    img.src = canvas.dataset.src.startsWith("emoji:") ? emojiImage(canvas.dataset.src.slice(6)) : canvas.dataset.src;
  });
}

// "emoji:🎾" figures: draw the emoji big on a transparent canvas, trimmed to its edges, as an image URL
function emojiImage(emoji) {
  const size = 200;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  ctx.font = `${size * 0.8}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, size / 2, size / 2 + size * 0.04);
  const px = ctx.getImageData(0, 0, size, size).data;
  let x0 = size, y0 = size, x1 = 0, y1 = 0;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    if (px[(y * size + x) * 4 + 3] > 20) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  }
  if (x1 < x0) return c.toDataURL();
  const out = document.createElement("canvas");
  out.width = x1 - x0 + 1; out.height = y1 - y0 + 1;
  out.getContext("2d").drawImage(c, -x0, -y0);
  return out.toDataURL();
}

function dotLogo(canvas, img) {
  const small = canvas.classList.contains("item-logo");
  // small logos: same height for every logo, width from its aspect ratio, ~2.4px per dot
  const aspect = img.naturalWidth / img.naturalHeight;
  // figures are bigger than logos; tall ones (like the pointe shoes) get extra height so they keep detail
  const lg = canvas.classList.contains("figure-lg");
  const phone = window.innerWidth <= 560;
  const targetH = lg ? (phone ? 170 : 240) : canvas.classList.contains("figure") ? (aspect < 0.8 ? 128 : 88) : 60;
  if (small) canvas.style.width = `${Math.min(lg ? 220 : 112, targetH * aspect)}px`;
  const cssW = canvas.clientWidth;
  // finer dots for the detailed sport figures, a little chunkier for logos
  const COLS = small ? Math.round(cssW / (canvas.classList.contains("figure") ? 1.8 : 2.4)) : 64;
  const ROWS = Math.max(1, Math.round((COLS * img.naturalHeight) / img.naturalWidth)) || COLS;
  const SS = 6;
  const W = COLS * SS, H = ROWS * SS;
  const off = document.createElement("canvas");
  off.width = W; off.height = H;
  const octx = off.getContext("2d", { willReadFrequently: true });
  octx.drawImage(img, 0, 0, W, H);
  const px = octx.getImageData(0, 0, W, H).data;

  const css = getComputedStyle(document.documentElement);
  const yellow = css.getPropertyValue("--yellow").trim() || "#fff3a3";
  const ink = css.getPropertyValue("--portrait").trim() || "#c8b9ff";
  const seal = canvas.dataset.mode === "seal";

  const cell = cssW / COLS;
  const cssH = cell * ROWS;
  const dpr = window.devicePixelRatio || 1;
  canvas.style.height = `${cssH}px`;
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  // A dot's size = share of non-white pixels in its cell. Colour: the seal maps to the site palette;
  // other logos keep their own colour (lightened for the dark background), with near-black shown as lavender.
  const dots = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let n = 0, dark = 0, R = 0, G = 0, B = 0;
      const count = { gold: 0, red: 0, ink: 0 };
      for (let y = r * SS; y < (r + 1) * SS; y++) {
        for (let x = c * SS; x < (c + 1) * SS; x++) {
          const i = (y * W + x) * 4;
          if (px[i + 3] < 128) continue;
          const pr = px[i], pg = px[i + 1], pb = px[i + 2];
          if (pr > 225 && pg > 225 && pb > 225) continue;         // white paper
          n++;
          if (seal) {
            if (pr > 150 && pg < 110) count.red++;                  // lions
            else if (pr > 170 && pg > 140 && pb < 170) count.gold++; // shield
            else count.ink++;                                       // ring + lettering
          } else if (Math.max(pr, pg, pb) < 110 && Math.max(pr, pg, pb) - Math.min(pr, pg, pb) < 40) {
            dark++;
          } else { R += pr; G += pg; B += pb; }
        }
      }
      if (!n) continue;
      let color;
      if (seal) {
        const kind = Object.keys(count).reduce((a, k) => (count[a] >= count[k] ? a : k));
        color = { gold: yellow, red: "#f7768e", ink }[kind];
      } else if (dark * 2 >= n) {
        color = ink;
      } else {
        const m = n - dark, lift = (v) => Math.round(v / m + (255 - v / m) * 0.2);
        color = `rgb(${lift(R)}, ${lift(G)}, ${lift(B)})`;
      }
      dots.push({
        x: (c + 0.5) * cell, y: (r + 0.5) * cell, v: n / (SS * SS), color,
        delay: Math.hypot(c - COLS / 2, r - ROWS / 2) * 22 + Math.random() * 120,
      });
    }
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let mouse = null;
  canvas.addEventListener("mousemove", (e) => {
    const b = canvas.getBoundingClientRect();
    mouse = { x: e.clientX - b.left, y: e.clientY - b.top };
  });
  canvas.addEventListener("mouseleave", () => { mouse = null; });

  let start = null;
  function frame(t) {
    if (!canvas.isConnected) return;
    if (start === null) start = t;
    const elapsed = reduced ? Infinity : t - start;
    ctx.clearRect(0, 0, cssW, cssH);
    for (const d of dots) {
      const p = Math.min(1, Math.max(0, (elapsed - d.delay) / 450));
      if (p <= 0) continue;
      let rad = (cell / 2) * (0.3 + 0.7 * d.v) * (1 - Math.pow(1 - p, 3));
      if (mouse) {
        const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
        if (dist < cell * 8) rad *= 1 + 0.5 * (1 - dist / (cell * 8));
      }
      ctx.globalAlpha = 0.55 + 0.45 * d.v;
      ctx.fillStyle = d.color;
      ctx.beginPath();
      ctx.arc(d.x, d.y, rad, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!reduced) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
// experience & projects are shown as a compact list (their `bullets` are kept in PROFILE but not displayed)
function experience() { return renderItems(PROFILE.experience, { bullets: false, yellowDates: true }); }
function projects()   { return renderItems(PROFILE.projects, { bullets: false, yellowDates: true }); }

function skills() {
  return Object.entries(PROFILE.skills).map(([group, list]) => `
    <div class="item">
      <div class="heading">${esc(group)}</div>
      <div class="tags">${list.map((s) => {
        // ==Skill== marks a key skill: shown as a highlighted chip
        const key = /^==(.+)==$/.exec(s);
        return `<span class="tag${key ? " tag-key" : ""}">${fmt(key ? key[1] : s)}</span>`;
      }).join("")}</div>
    </div>`).join("");
}

function contact() {
  const intro = PROFILE.contactIntro ? `<p class="line" style="margin-bottom:0.8rem">${fmt(PROFILE.contactIntro)}</p>` : "";
  return intro + PROFILE.contact.map((c) => {
    const value = c.clock
      ? `<span class="desc clock" data-tz="${esc(c.clock)}">${clockText(c.clock)}</span>`
      : c.href
        ? `<a class="desc" href="${esc(c.href)}" target="_blank" rel="noopener">${esc(c.value)}</a>`
        : `<span class="desc">${esc(c.value)}</span>`;
    return `<div class="help-row"><span>${esc(c.label)}</span>${value}</div>`;
  }).join("");
}

// ---------- live clock ----------
function clockText(tz) {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short" });
  const day = now.toLocaleDateString("en-US", { timeZone: tz, weekday: "short" });
  // hours ahead/behind the visitor
  const offset = (zone) => {
    const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: zone, hourCycle: "h23",
      year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })
      .formatToParts(now).map((p) => [p.type, p.value]));
    return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute) - Math.floor(now / 6e4) * 6e4;
  };
  const diff = Math.round((offset(tz) - offset(Intl.DateTimeFormat().resolvedOptions().timeZone)) / 36e5 * 2) / 2;
  const rel = diff === 0 ? "same as you" : `${Math.abs(diff)}h ${diff > 0 ? "ahead of" : "behind"} you`;
  return `${esc(day)} ${esc(time)} <span class="clock-rel">(${rel})</span>`;
}

setInterval(() => {
  document.querySelectorAll(".clock").forEach((el) => (el.innerHTML = clockText(el.dataset.tz)));
}, 1000);

function passion(args = []) {
  const sections = PROFILE.passion;
  const pick = (args[0] || "").toLowerCase();
  if (pick) {
    if (!sections[pick]) return `<p class="line"><span class="error">no such section:</span> ${esc(pick)}. Try ${passionList()}</p>`;
    return passionSection(pick);
  }
  const rows = Object.entries(sections).map(([name, sec]) =>
    `<div class="help-row"><span class="cmd" data-cmd="cd ~/passion/${esc(name)}">${esc(name)}</span><span class="desc">${esc(sec.desc)}</span></div>`
  ).join("");
  return `${rows}<p class="line hint" style="margin-top:1.2rem">Type a section to open it. For eg. <span class="accent clickable" data-cmd="${esc(Object.keys(sections)[0])}">${esc(Object.keys(sections)[0])}</span></p>`;
}

function passionList() {
  return Object.keys(PROFILE.passion)
    .map((n) => `<span class="accent clickable" data-cmd="${esc(n)}">${esc(n)}</span>`).join(", ");
}

function passionSection(name) {
  const sec = PROFILE.passion[name];
  let map = "";
  if (sec.places && typeof WORLDMAP !== "undefined") {
    requestAnimationFrame(drawMaps);
    map = `<canvas class="worldmap" data-section="${esc(name)}" role="img"
      aria-label="Dotted world map with stars on: ${esc(sec.places.map((p) => p.name).join(", "))}"></canvas>
      <p class="line hint map-legend"><span class="legend-been">✦ been there</span>   <span class="legend-wish">✦ on my wishlist</span></p>`;
  }
  const gallery = sec.photos ? `<div class="gallery">${sec.photos.map((ph, i) => `
    <button class="photo" data-section="${esc(name)}" data-index="${i}" aria-label="Open photo: ${esc(ph.caption)}">
      <img src="${esc(ph.src.replace(/\.jpg$/, "-thumb.jpg"))}" alt="${esc(ph.caption)}" loading="lazy" />
      <span class="photo-cap">${esc(ph.caption)}</span>
    </button>`).join("")}</div>` : "";
  return `${sec.intro ? `<p class="line" style="margin-bottom:0.8rem">${fmt(sec.intro)}</p>` : ""}${map}${gallery}<div class="passion-${esc(name)}">${renderItems(sec.items)}</div>`;
}

// ---------- photo viewer ----------
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbCap = document.getElementById("lb-cap");
let lbPhotos = [], lbIndex = 0;

function openPhoto(section, index) {
  lbPhotos = PROFILE.passion[section].photos;
  lbIndex = index;
  showPhoto();
  lightbox.hidden = false;
  document.body.classList.add("lb-open");
}
function showPhoto() {
  const ph = lbPhotos[lbIndex];
  lbImg.src = ph.src;
  lbImg.alt = ph.caption;
  lbCap.innerHTML = `${esc(ph.caption)} <span class="lb-count">${lbIndex + 1} / ${lbPhotos.length}</span>`;
}
function stepPhoto(d) { lbIndex = (lbIndex + d + lbPhotos.length) % lbPhotos.length; showPhoto(); }
function closePhoto() {
  lightbox.hidden = true;
  lbImg.removeAttribute("src");
  document.body.classList.remove("lb-open");
  input.focus();
}
document.getElementById("lb-prev").addEventListener("click", (e) => { e.stopPropagation(); stepPhoto(-1); });
document.getElementById("lb-next").addEventListener("click", (e) => { e.stopPropagation(); stepPhoto(1); });
document.getElementById("lb-close").addEventListener("click", closePhoto);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closePhoto(); });
// keys go to the viewer (not the terminal) while it is open
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closePhoto();
  else if (e.key === "ArrowLeft") stepPhoto(-1);
  else if (e.key === "ArrowRight") stepPhoto(1);
  else return;
  e.preventDefault();
  e.stopPropagation();
}, true);
// swipe on touch screens
let touchX = null;
lightbox.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) stepPhoto(dx < 0 ? 1 : -1);
  touchX = null;
});

// ---------- dotted world map ----------
function drawMaps() {
  document.querySelectorAll("canvas.worldmap:not([data-drawn])").forEach((canvas) => {
    canvas.dataset.drawn = "1";
    const { cols, rows, latMax, latMin, data } = WORLDMAP;
    const places = PROFILE.passion[canvas.dataset.section].places;
    const cssW = canvas.clientWidth;
    const cell = cssW / cols;
    const cssH = cell * rows;
    const dpr = window.devicePixelRatio || 1;
    canvas.style.height = `${cssH}px`;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const pins = places.map((p, i) => {
      const c = ((p.lon + 180) / 360) * cols - 0.5;
      const r = ((latMax - p.lat) / (latMax - latMin)) * rows - 0.5;
      return { ...p, c, r, x: (c + 0.5) * cell, y: (r + 0.5) * cell, phase: i * 1.7, delay: 1100 + c * 6 };
    });
    const STAR = 3.6; // sparkle radius in cells

    // dots: land, or yellow sparkle where a star is
    const land = [], stars = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c + 0.5) * cell, y = (r + 0.5) * cell;
        let best = 0, which = -1;
        pins.forEach((p, i) => {
          const v = sparkle(c - p.c, r - p.r, STAR);
          if (v > best) { best = v; which = i; }
        });
        if (best > 0.08) { stars.push({ x, y, v: best, pin: which }); continue; }
        const v = +data[r][c] / 9;
        if (v > 0) land.push({ x, y, v, delay: c * 7 + Math.random() * 200 });
      }
    }

    // labels: one stacked list per cluster, placed beside it without overlapping other labels
    const font = getComputedStyle(document.body).fontFamily;
    const fontSize = Math.max(9, Math.min(12, cell * 1.8));
    const lineH = fontSize * 1.3;
    ctx.font = `500 ${fontSize}px ${font}`;
    // Place each label at the closest spot that avoids other labels and stars, preferring ocean.
    const boxes = [];
    const pinBoxes = pins.map((p) => ({ x: p.x - cell * 1.6, y: p.y - cell * 1.6, w: cell * 3.2, h: cell * 3.2 }));
    const area = (a, b) =>
      Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) *
      Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
    const landIn = (b) => {
      let n = 0;
      for (let r = Math.max(0, Math.floor(b.y / cell)); r < Math.min(rows, Math.ceil((b.y + b.h) / cell)); r++)
        for (let c = Math.max(0, Math.floor(b.x / cell)); c < Math.min(cols, Math.ceil((b.x + b.w) / cell)); c++)
          if (data[r][c] !== "0") n++;
      return n;
    };
    // one label per country, showing just the country name (every city still gets its own star;
    // the detailed places are listed below the map)
    const byCountry = new Map();
    for (const p of pins) {
      const c = p.country || p.name;
      if (!byCountry.has(c)) byCountry.set(c, []);
      byCountry.get(c).push(p);
    }
    const clusters = [...byCountry.values()].sort((a, b) => b.length - a.length); // countries with more stars pick first
    const countryFont = `700 ${fontSize}px ${font}`, placeFont = `400 ${fontSize}px ${font}`;
    const placeColor = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim() || "#c0caf5";
    const indent = fontSize * 0.9;
    const labelLines = (members) => [{ text: members[0].country || members[0].name, country: true, wish: !!members[0].wish }];
    const widthOf = (l) => { ctx.font = l.country ? countryFont : placeFont; return ctx.measureText(l.text).width + (l.country ? 0 : indent); };
    const labels = clusters.map((members) => {
      const ax = members.reduce((s, m) => s + m.x, 0) / members.length;
      const ay = members.reduce((s, m) => s + m.y, 0) / members.length;
      const lines = labelLines(members);
      const w = Math.max(...lines.map(widthOf)) + 10;
      const h = lines.length * lineH + 6;
      let best = null;
      for (let y = 0; y <= cssH - h; y += 4) {
        for (let x = 0; x <= cssW - w; x += 4) {
          const b = { x, y, w, h };
          const dx = Math.max(b.x - ax, 0, ax - (b.x + w));
          const dy = Math.max(b.y - ay, 0, ay - (b.y + h));
          const dist = Math.hypot(dx, dy);
          if (dist < cell * 2) continue; // keep a little air between stars and their label
          let cost = dist + landIn(b) * 0.6;
          for (const o of boxes) cost += area(b, o) * 50;
          for (const o of pinBoxes) cost += area(b, o) * 20;
          if (!best || cost < best.cost) best = { ...b, cost };
        }
      }
      boxes.push(best);
      const delay = Math.max(...members.map((m) => m.delay)) + 250;
      return { members, lines, box: best, anchor: { x: ax, y: ay }, delay };
    });

    const css = getComputedStyle(document.documentElement);
    const color = css.getPropertyValue("--portrait").trim() || "#c8b9ff";
    const starColor = css.getPropertyValue("--yellow").trim() || "#fff3a3";
    const wishColor = css.getPropertyValue("--cyan").trim() || "#7dcfff";
    const pinColor = (p) => (p.wish ? wishColor : starColor);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const grow = (elapsed, delay) => {
      const p = Math.min(1, Math.max(0, (elapsed - delay) / 450));
      return 1 - Math.pow(1 - p, 3);
    };

    let start = null;
    function frame(t) {
      if (!canvas.isConnected) return;
      if (start === null) start = t;
      const elapsed = reduced ? Infinity : t - start;
      ctx.clearRect(0, 0, cssW, cssH);

      ctx.fillStyle = color;
      for (const d of land) {
        const g = grow(elapsed, d.delay);
        if (g <= 0) continue;
        ctx.globalAlpha = 0.3 + 0.35 * d.v;
        ctx.beginPath();
        ctx.arc(d.x, d.y, (cell / 2) * (0.25 + 0.6 * d.v) * g, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const d of stars) {
        const p = pins[d.pin];
        ctx.fillStyle = pinColor(p);
        const g = grow(elapsed, p.delay);
        if (g <= 0) continue;
        const tw = reduced ? 1 : 0.8 + 0.2 * Math.sin(t / 700 + p.phase);
        ctx.globalAlpha = (0.45 + 0.55 * d.v) * tw;
        ctx.beginPath();
        ctx.arc(d.x, d.y, (cell / 2) * (0.3 + 0.75 * d.v) * g, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const p of pins) { // bright centre with a soft glow
        const g = grow(elapsed, p.delay);
        if (g <= 0) continue;
        ctx.fillStyle = pinColor(p);
        ctx.globalAlpha = 0.22 * g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, cell * 1.6 * g, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, cell * 0.6 * g, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.font = `500 ${fontSize}px ${font}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      for (const l of labels) {
        const g = grow(elapsed, l.delay);
        if (g <= 0) continue;
        const { box, anchor, members } = l;
        // dotted leader line from the cluster to the nearest point of its label
        const ex = Math.max(box.x, Math.min(box.x + box.w, anchor.x));
        const ey = Math.max(box.y, Math.min(box.y + box.h, anchor.y));
        const len = Math.hypot(ex - anchor.x, ey - anchor.y) || 1;
        const off = Math.min(len, cell * 1.6);
        ctx.globalAlpha = 0.6 * g;
        ctx.strokeStyle = members.every((m) => m.wish) ? wishColor : starColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([1.5, 3]);
        ctx.beginPath();
        ctx.moveTo(anchor.x + ((ex - anchor.x) / len) * off, anchor.y + ((ey - anchor.y) / len) * off);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.setLineDash([]);
        // box + names
        ctx.globalAlpha = g;
        ctx.fillStyle = "rgba(13, 18, 36, 0.82)";
        ctx.fillRect(box.x, box.y, box.w, box.h);
        ctx.fillStyle = starColor;
        l.lines.forEach((line, i) => {
          ctx.font = line.country ? countryFont : placeFont;
          ctx.fillStyle = line.wish ? wishColor : line.country ? starColor : placeColor;
          ctx.fillText(line.text, box.x + 5 + (line.country ? 0 : indent), box.y + 3 + lineH * (i + 0.5));
        });
      }
      ctx.globalAlpha = 1;
      if (!reduced) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
}

function clear() {
  output.innerHTML = "";
  setCwd([]);
  return null;
}

// ---------- execution ----------
const history = [];
let historyIndex = 0;

// ---------- directories ----------
// Opening a section moves you into it: `passion` -> ~/passion, `travel` -> ~/passion/travel.
const NOT_DIRS = ["help", "clear", "prev"];
let cwd = [];

const pathString = (segs = cwd) => (segs.length ? "~/" + segs.join("/") : "~");

function setCwd(segs) {
  cwd = segs;
  document.getElementById("prompt-path").textContent = pathString();
  document.getElementById("title-path").textContent = pathString();
}

// commands that work from any directory (everything else must be inside the current directory)
const GLOBAL_CMDS = ["help", "clear", "prev"];

// where a section lives, e.g. "about" -> ["about"], "travel" -> ["passion", "travel"]; null if it isn't one
function homeOf(key) {
  if (PROFILE.passion[key]) return ["passion", key];
  if (COMMANDS[key] && !NOT_DIRS.includes(key)) return [key];
  return null;
}

function notHere(key) {
  const where = pathString(homeOf(key));
  return `<p class="line"><span class="error">${esc(key)}: not in this directory.</span> You're in <span class="path">${esc(pathString())}</span>, and ${esc(key)} lives in <span class="path">${esc(where)}</span>.</p>
    <p class="line">Type <span class="accent clickable" data-cmd="prev">prev</span> to go back one directory, <span class="accent clickable" data-cmd="ls">ls</span> to see what's here, or <span class="accent clickable" data-cmd="cd ${esc(where)}">cd ${esc(where)}</span> to jump there.</p>`;
}

// show the contents of a directory
function renderDir(segs) {
  if (segs.length === 0) return help();
  if (segs[0] === "passion") return segs[1] ? passionSection(segs[1]) : passion();
  return COMMANDS[segs[0]].run([]);
}

const NAV_HINT = `<p class="line hint nav-hint">Type <span class="accent clickable" data-cmd="prev">prev</span> to go back one directory, or <span class="accent clickable" data-cmd="clear">clear</span> to clear the terminal.</p>`;

function prev() {
  if (cwd.length === 0) return `<p class="line">Already at <span class="accent">~</span> (home). Type <span class="accent clickable" data-cmd="help">help</span> to see commands.</p>`;
  setCwd(cwd.slice(0, -1));
  return renderDir(cwd);
}

function cd(target = "~") {
  const t = target.toLowerCase().replace(/\/+$/, "") || "~";
  const segs = resolvePath(t === "/" ? "~" : t);
  if (!segs) return `<p class="line"><span class="error">cd: no such directory:</span> ${esc(target)}</p>`;
  setCwd(segs);
  return renderDir(segs);
}

function echo(cmd) {
  const line = document.createElement("p");
  line.className = "line";
  line.innerHTML = `<span class="lambda">λ</span> :: <span class="path">${esc(pathString())}</span> <span class="arrows">&gt;&gt;</span> <span class="cmd-echo">${esc(cmd)}</span>`;
  output.appendChild(line);
}

function execute(raw) {
  const cmdLine = raw.trim();
  echo(raw);
  if (cmdLine) {
    history.push(cmdLine);
  }
  historyIndex = history.length;
  if (!cmdLine) return;

  const [name, ...args] = cmdLine.split(/\s+/);
  const key = name.toLowerCase();
  let html, opened = false;
  const here = childrenOf(cwd);
  if (GLOBAL_CMDS.includes(key)) html = COMMANDS[key].run(args);
  else if (EXTRAS[key]) html = EXTRAS[key](args);
  else if (key === "passion" && args[0] && here.includes("passion")) html = cd(`passion/${args[0]}`);   // `passion travel` shorthand
  else if (here.includes(key)) { setCwd([...cwd, key]); html = renderDir(cwd); opened = true; }
  else if (homeOf(key)) html = notHere(key);   // a real section, just not in this directory
  else html = `<p class="line"><span class="error">command not found:</span> ${esc(name)}. Type <span class="accent clickable" data-cmd="help">help</span> to see available commands.</p>`;

  // every section page ends with a reminder of how to get back (home shows it in `help`)
  if (html && cwd.length > 0 && (opened || key === "prev" || key === "cd" || key === "passion") && !/class="error"/.test(html)) {
    html += NAV_HINT;
  }

  if (html !== null) {
    const block = document.createElement("div");
    block.className = "block";
    block.innerHTML = html;
    output.appendChild(block);
  }
  input.scrollIntoView({ block: "nearest" });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  execute(input.value);
  input.value = "";
  updateGhost();
});

// ---------- autocomplete ----------
const ghostTyped = document.getElementById("ghost-typed");
const ghostRest = document.getElementById("ghost-rest");

// what `ls` would show in a directory
function childrenOf(segs) {
  if (segs.length === 0) return Object.keys(COMMANDS).filter((c) => !NOT_DIRS.includes(c));
  if (segs.length === 1 && segs[0] === "passion") return Object.keys(PROFILE.passion);
  return [];
}

// resolve a typed path ("..", "~/passion", "passion") against cwd, or null
function resolvePath(path) {
  let segs = path.startsWith("~") ? [] : [...cwd];
  for (const part of path.replace(/^~\/?/, "").split("/").filter(Boolean)) {
    if (part === "..") segs.pop();
    else if (childrenOf(segs).includes(part)) segs.push(part);
    else return null;
  }
  return segs;
}

// every full input line that `value` could complete to, best first
function completions(value) {
  const v = value.toLowerCase();
  const space = v.indexOf(" ");
  if (space === -1) {
    // first word: what's in the current directory, then commands that work anywhere
    const words = [...new Set([...childrenOf(cwd), ...GLOBAL_CMDS, "cd", "ls", "pwd"])];
    return words.filter((w) => w.startsWith(v) && w !== v);
  }
  const cmd = v.slice(0, space), arg = v.slice(space + 1);
  if (cmd === "passion") {
    return Object.keys(PROFILE.passion).filter((k) => k.startsWith(arg) && k !== arg).map((k) => `passion ${k}`);
  }
  if (cmd === "cd") {
    const slash = arg.lastIndexOf("/");
    const base = slash === -1 ? "" : arg.slice(0, slash + 1);
    const partial = arg.slice(slash + 1);
    const dir = base ? resolvePath(base) : cwd;
    if (!dir) return [];
    const options = childrenOf(dir).filter((k) => childrenOf([...dir, k]).length).map((k) => k + "/")
      .concat(childrenOf(dir).filter((k) => !childrenOf([...dir, k]).length));
    if (!base) options.push("..", "~");
    return options.filter((o) => o.startsWith(partial) && o !== partial).map((o) => `${cmd} ${base}${o}`);
  }
  return [];
}

const commonPrefix = (list) => list.reduce((p, w) => { let i = 0; while (i < p.length && p[i] === w[i]) i++; return p.slice(0, i); });

function tabComplete() {
  const value = input.value;
  const options = completions(value.trimStart());
  if (!options.length) return;
  const prefix = commonPrefix(options);
  if (options.length === 1) {
    input.value = options[0].endsWith("/") ? options[0] : options[0] + " ".repeat(/^(cd|passion)$/.test(options[0]) ? 1 : 0);
  } else if (prefix.length > value.trimStart().length) {
    input.value = prefix;
  } else {
    // nothing more in common: list the choices (clickable), like a real shell
    echo(value);
    const block = document.createElement("div");
    block.className = "block";
    block.innerHTML = `<p class="line">${options.map((o) => {
      const last = o.split(/[\s/]/).filter(Boolean).pop();
      return `<span class="accent clickable" data-cmd="${esc(o.replace(/\/$/, ""))}">${esc(o.endsWith("/") ? last + "/" : last)}</span>`;
    }).join("  ")}</p>`;
    output.appendChild(block);
    input.scrollIntoView({ block: "nearest" });
  }
  updateGhost();
}

// faint inline suggestion after the cursor (Tab or → accepts it)
function updateGhost() {
  const value = input.value;
  const best = value.trim() ? completions(value.trimStart())[0] : null;
  const typed = value.trimStart();
  ghostTyped.textContent = value;
  ghostRest.textContent = best && best.toLowerCase().startsWith(typed.toLowerCase()) ? best.slice(typed.length) : "";
}
input.addEventListener("input", updateGhost);

input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex > 0) input.value = history[--historyIndex];
    updateGhost();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    historyIndex = Math.min(historyIndex + 1, history.length);
    input.value = history[historyIndex] ?? "";
    updateGhost();
  } else if (e.key === "Tab") {
    e.preventDefault();
    tabComplete();
  } else if (e.key === "ArrowRight" && input.selectionStart === input.value.length && ghostRest.textContent) {
    e.preventDefault();
    input.value += ghostRest.textContent;
    updateGhost();
  } else if (e.key === "l" && e.ctrlKey) {
    e.preventDefault();
    clear();
  }
});

// Click a command name to run it
terminal.addEventListener("click", (e) => {
  const photo = e.target.closest(".photo");
  if (photo) { openPhoto(photo.dataset.section, +photo.dataset.index); return; }
  const target = e.target.closest("[data-cmd]");
  if (target) {
    execute(target.dataset.cmd);
    input.focus();
    return;
  }
  // Focus input when clicking anywhere (unless selecting text or clicking a link)
  if (!window.getSelection().toString() && !e.target.closest("a")) input.focus();
});

// ---------- intro ----------
function typeBanner() {
  const userEl = document.getElementById("banner-user");
  const textEl = document.getElementById("banner-text");
  const subEl = document.getElementById("subtitle");
  const banner = userEl.parentElement;
  const user = `${PROFILE.username}:$ `;
  const text = "welcome to my portfolio";
  const sub = "type 'help' to start";
  const full = user + text;
  let i = 0;
  const tick = () => {
    i++;
    userEl.textContent = full.slice(0, Math.min(i, user.length));
    textEl.textContent = i > user.length ? full.slice(user.length, i) : "";
    if (i < full.length) return setTimeout(tick, 55);
    banner.classList.add("done");
    subEl.classList.add("typing");
    let j = 0;
    const subTick = () => {
      subEl.textContent = sub.slice(0, ++j);
      if (j < sub.length) setTimeout(subTick, 45);
    };
    setTimeout(subTick, 250);
  };
  tick();
}

// ---------- starfield ----------
function makeStars() {
  const sky = document.getElementById("stars");
  const count = Math.round((window.innerWidth * window.innerHeight) / 9000);
  const rand = (min, max) => Math.random() * (max - min) + min;
  for (let k = 0; k < count; k++) {
    const s = document.createElement("span");
    const roll = Math.random();
    if (roll < 0.06) {
      s.className = "star sparkle";
      s.textContent = "✦";
      s.style.setProperty("--size", `${rand(10, 16)}px`);
    } else {
      s.className = "star" + (roll < 0.2 ? " yellow" : roll < 0.3 ? " purple" : "");
      const size = rand(1.2, 3);
      s.style.width = s.style.height = `${size}px`;
    }
    s.style.left = `${rand(0, 100)}%`;
    s.style.top = `${rand(0, 100)}%`;
    s.style.setProperty("--dur", `${rand(2.5, 6)}s`);
    s.style.setProperty("--delay", `${rand(-6, 0)}s`);
    s.style.setProperty("--min", rand(0.3, 0.6).toFixed(2));
    sky.appendChild(s);
  }

  const shoot = () => {
    const star = document.createElement("span");
    star.className = "shooting-star";
    star.style.left = `${rand(40, 100)}%`;
    star.style.top = `${rand(0, 40)}%`;
    sky.appendChild(star);
    star.addEventListener("animationend", () => star.remove());
    setTimeout(shoot, rand(4000, 9000));
  };
  setTimeout(shoot, 2500);
}
makeStars();

const normalSite = document.getElementById("normal-site");
if (PROFILE.normalSite && PROFILE.normalSite !== "#") normalSite.href = PROFILE.normalSite;
else normalSite.parentElement.remove();

typeBanner();
input.focus();
