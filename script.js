const products = [
    { name: "Glitch Pouches",    flavor: "Бабл гам (150 мг)",                      price: "450",  cat: "Снюс",     img: "3.png" },
    { name: "Isterika Монашка",  flavor: "Белый персик (201 мг)",                  price: "450",  cat: "Снюс",     img: "4.png" },
    { name: "Анархия V2",        flavor: "банан X ананас",        price: "450",  cat: "Жижа",     img: "30.png" },
    { name: "Анархия V2",        flavor: "цитрусовый энергетик",        price: "450",  cat: "Жижа",     img: "30.png" },
    { name: "D.L.T.A",        flavor: "Adrenaline RUSH Pepsi",        price: "450",  cat: "Жижа",     img: "40.png" },
    { name: "D.L.T.A",        flavor: "Monster Energy",        price: "450",  cat: "Жижа",     img: "40.png" },
    { name: "D.L.T.A",        flavor: "BURN Energy",        price: "450",  cat: "Жижа",     img: "40.png" },
    { name: "Podonki LAST HAPKA",        flavor: "Скитлз и смородина",        price: "450",  cat: "Жижа",     img: "50.png" },
    { name: "Podonki LAST HAPKA",        flavor: "микс ягод лёд",        price: "450",  cat: "Жижа",     img: "50.png" },
    { name: "Podonki LAST HAPKA",        flavor: "Кола сода лёд",        price: "450",  cat: "Жижа",     img: "50.png" },
    { name: "Рик и морти НА ЗАМЕРЗОНЕ",        flavor: "черничная фанта",        price: "500",  cat: "Жижа",     img: "60.png" },
    { name: "Рик и морти НА ЗАМЕРЗОНЕ",        flavor: "Лесной корнвелиус",        price: "500",  cat: "Жижа",     img: "60.png" },
    { name: "Podonki Critical",        flavor: "Лимонные червяки",        price: "450",  cat: "Жижа",     img: "80.png" },
    { name: "Podonki Critical",        flavor: "Кислый киви",        price: "450",  cat: "Жижа",     img: "80.png" },
    { name: "Podonki Critical",        flavor: "Дыня кокос",        price: "450",  cat: "Жижа",     img: "80.png" },
    { name: "YOOZ 25000",        flavor: "Манго персик",        price: "2000",  cat: "Одноразки",     img: "20.png" },
    { name: "KORI",        flavor: "Персик лёд",        price: "5500",  cat: "Одноразки",     img: "10.png" },
    ]
// ─── STEAM ───
function createSteam() {
  const p = document.createElement("div");
  p.className = "steam-particle";
  const size = 60 + Math.random() * 120;
  p.style.width  = size + "px";
  p.style.height = size + "px";
  p.style.left   = Math.random() * 100 + "vw";
  p.style.animationDuration = (12 + Math.random() * 16) + "s";
  p.style.animationDelay    = (Math.random() * 6) + "s";
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 28000);
}

for (let i = 0; i < 8; i++) createSteam();
setInterval(createSteam, 3000);

// ─── Telegram icon SVG ───
const tgIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg>`;

// ─── Badge class helper ───
function badgeClass(cat) {
    if (cat === "Одноразка") return "cat-one";
    if (cat === "Снюс")     return "cat-snus";
    return "cat-liq";
}

// ─── Build card HTML ───
function buildCard(p) {
    const text = encodeURIComponent(`Привет! Хочу купить ${p.cat} ${p.name}. Когда удобно продать заказ?`);
    const link = `https://t.me/Steam_UI?text=${text}`;
    return `
    <div class="card" data-cat="${p.cat}" data-name="${p.name.toLowerCase()}" data-flavor="${p.flavor.toLowerCase()}">
        <div class="card-img-wrap">
            <img src="${p.img}" alt="${p.name}" loading="lazy"
                 onerror="this.src='https://placehold.co/500x400/111/333?text=?'">
            <span class="cat-badge ${badgeClass(p.cat)}">${p.cat}</span>
        </div>
        <div class="card-body">
            <div class="card-name">${p.name}</div>
            <div class="card-flavor">${p.flavor}</div>
            <div class="card-footer">
                <div class="price">${p.price} ₽</div>
                <button class="btn" onclick="orderClick(this, '${link}')">${tgIcon} Заказать</button>
            </div>
        </div>
    </div>`;
}

// ─── Render ───
const catalog    = document.getElementById("catalog");
const emptyState = document.getElementById("emptyState");
const countLabel = document.getElementById("countLabel");

catalog.innerHTML = products.map(buildCard).join("");

// ─── Intersection observer ───
function observeCards() {
    const cards = document.querySelectorAll(".card");
    const observer = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add("show"), i * 60);
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.08 });
    cards.forEach(c => observer.observe(c));
}

observeCards();

// ─── Order animation ───
function orderClick(btn, link) {
    if (btn.classList.contains("sending")) return;
    btn.classList.add("sending");

    const card = btn.closest(".card");

    // 1. Карточка дёргается
    card.animate([
        { transform: "translateY(0) scale(1)" },
        { transform: "translateY(-6px) scale(1.03)" },
        { transform: "translateY(0) scale(1)" }
    ], { duration: 280, easing: "ease-out" });

    // 2. Самолётик летит вправо
    const plane = document.createElement("div");
    plane.className = "fly-plane";
    plane.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;
    document.body.appendChild(plane);

    const rect = btn.getBoundingClientRect();
    plane.style.left = (rect.left + rect.width / 2) + "px";
    plane.style.top  = (rect.top  + rect.height / 2) + "px";

    plane.animate([
        { transform: "translate(-50%, -50%) scale(1)",   opacity: 1 },
        { transform: "translate(120px, -40px) scale(0.4)", opacity: 0 }
    ], { duration: 550, easing: "ease-in", fill: "forwards" });

    // 3. Текст кнопки меняется
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Отправлено!`;
    btn.style.background = "linear-gradient(90deg, #00c853, #00e5ff)";

    setTimeout(() => {
        plane.remove();
        window.open(link, "_blank");
    }, 400);

    setTimeout(() => {
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg> Заказать`;
        btn.style.background = "";
        btn.classList.remove("sending");
    }, 2200);
}

// ─── Filter + Search ───
let activeFilter = "all";
let searchQuery  = "";

function updateView() {
    const cards = document.querySelectorAll(".card");
    let visible = 0;

    cards.forEach(card => {
        const catMatch  = activeFilter === "all" || card.dataset.cat === activeFilter;
        const q         = searchQuery.trim();
        const textMatch = !q
            || card.dataset.name.includes(q)
            || card.dataset.flavor.includes(q);

        if (catMatch && textMatch) {
            card.style.display = "";
            visible++;
        } else {
            card.style.display = "none";
        }
    });

    // Update count
    const total = document.querySelectorAll(".card").length;
    countLabel.textContent = visible === total
        ? `${total} товаров`
        : `${visible} из ${total}`;

    // Empty state
    if (visible === 0) {
        emptyState.classList.add("visible");
    } else {
        emptyState.classList.remove("visible");
    }
}

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.dataset.cat;
        updateView();
    });
});

// Search input
document.getElementById("searchInput").addEventListener("input", e => { 
    searchQuery = e.target.value.toLowerCase();
    updateView();
});
updateView();
