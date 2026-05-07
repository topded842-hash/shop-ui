const products = [
    { name: "Hyppe 50000", flavor: "Киви Дыня", price: "1550", cat: "Одноразка", img: "1.png" },
    { name: "Wild 28000", flavor: "Клубника Банан", price: "1250", cat: "Одноразка", img: "2.png" },
    { name: "Glitch Pouches", flavor: "Бабл гам", price: "450", cat: "Снюс", img: "3.png" },
    { name: "Isterika", flavor: "Персик", price: "450", cat: "Снюс", img: "4.png" },
    { name: "Critical", flavor: "Апельсин", price: "450", cat: "Жижа", img: "5.png" },
    { name: "Monster", flavor: "Маракуя", price: "450", cat: "Жижа", img: "7.png" }
];

const catalog = document.getElementById("catalog");

catalog.innerHTML = products.map(p => `
    <div class="card">
        <img src="${p.img}" onerror="this.src='https://via.placeholder.com/500'">
        <h3>${p.name}</h3>
        <div>${p.flavor}</div>
        <div class="category">${p.cat}</div>
        <div class="price">${p.price} ₽</div>
        <a class="btn" href="https://t.me/Shop_UI">ЗАКАЗАТЬ</a>
    </div>
`).join("");

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add("show");
        }
    });
}, { threshold: 0.1 });

cards.forEach(c => observer.observe(c));
