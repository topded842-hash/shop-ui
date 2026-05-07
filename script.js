const products = [
    { name: "Hyppe 50000", flavor: "Киви Дыня", price: "1550", cat: "Одноразка", img: "1.png" },
    { name: "Wild 28000", flavor: "Клубника Банан", price: "1250", cat: "Одноразка", img: "2.png" },
    { name: "Glitch Pouches", flavor: "Бабл гам (150 мг)", price: "450", cat: "Снюс", img: "3.png" },
    { name: "Isterika Монашка", flavor: "Белый персик (201 мг)", price: "450", cat: "Снюс", img: "4.png" },
    { name: "Подонки Critical", flavor: "Апельсиновый драже", price: "450", cat: "Жижа", img: "5.png" },
    { name: "Подонки Critical", flavor: "Бабл гам", price: "450", cat: "Жижа", img: "5.png" },
    { name: "Подонки Isterika", flavor: "Экзотический сок", price: "450", cat: "Жижа", img: "6.png" },
    { name: "Monster Liquid", flavor: "Маракуя Киви", price: "450", cat: "Жижа", img: "7.png" },
    { name: "Monster Liquid", flavor: "Лимонад Ситро", price: "450", cat: "Жижа", img: "7.png" },
    { name: "Грех Light", flavor: "Темный ягодный коктейль", price: "450", cat: "Жижа", img: "8.png" },
    { name: "Грех Light", flavor: "Чернично-малиновый дуэт", price: "450", cat: "Жижа", img: "8.png" },
    { name: "Грех Light", flavor: "Взрывная малина персик", price: "450", cat: "Жижа", img: "8.png" },
    { name: "Грех Light", flavor: "Вишнево-малиновый овердрайв", price: "450", cat: "Жижа", img: "8.png" },
    { name: "Анархия V2", flavor: "Вафли, банановый крем, клубника", price: "500", cat: "Жижа", img: "9.png" },
    { name: "Анархия V2", flavor: "Ванильно-творожный сырочек", price: "500", cat: "Жижа", img: "9.png" },
    { name: "Анархия V2", flavor: "Чизкейк, апельсин, баварский крем", price: "500", cat: "Жижа", img: "9.png" }
];

const catalog = document.getElementById("catalog");

catalog.innerHTML = products.map(p => {
    const text = encodeURIComponent(
        `Привет! Хочу купить ${p.cat} ${p.name}. Когда удобно продать заказ?`
    );

    const link = `https://t.me/Shop_UI?text=${text}`;

    return `
    <div class="card">
        <img src="${p.img}" onerror="this.src='https://via.placeholder.com/500'">
        <h3>${p.name}</h3>
        <div>${p.flavor}</div>
        <div class="category">${p.cat}</div>
        <div class="price">${p.price} ₽</div>
        <a class="btn" href="${link}" target="_blank">ЗАКАЗАТЬ</a>
    </div>
    `;
}).join("");

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("show");
    });
}, { threshold: 0.1 });

cards.forEach(c => observer.observe(c));
