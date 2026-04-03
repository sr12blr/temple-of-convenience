const DATA = [
    {
        prayer: "10-minute grocery delivery",
        sacrifice: "2,000+ deaths per year from floods made worse by emissions.",
        connection: "Hyper-fast delivery means more warehouses, more diesel vans, more packaging, more emissions. Those emissions heat the planet. Hotter oceans mean heavier monsoons. Heavier monsoons mean floods. 2,000+ people died in Indian floods last year. Your 10-minute dal delivery is a tiny, invisible vote for that."
    },
    {
        prayer: "Single-use plastic bags",
        sacrifice: "Micro-plastics in breast milk. Your future children\u2019s first meal will be fortified with plastics.",
        connection: "That plastic bag breaks down but never disappears. It becomes micro-plastic. It enters the soil, the water, the fish, your food. It\u2019s been found in human blood, lungs, and now \u2014 breast milk. The very first meal a newborn drinks is already contaminated. The bag you used for 12 minutes will outlive your grandchildren."
    },
    {
        prayer: "Fast fashion: Trendy and light on the pocket!",
        sacrifice: "Your city has run out of water. No running water in your tap for a week.",
        connection: "That \u20B9499 dress needs 10,000 litres of water to produce. Multiply that by millions of units churned out every season. Textile factories drain groundwater and dump toxic dye into rivers. Your city\u2019s water table drops. One summer, your tap runs dry. It\u2019s not a drought \u2014 it\u2019s a budget dress."
    },
    {
        prayer: "24/7 air conditioning for my house",
        sacrifice: "10 people will die in a heatwave related incident.",
        connection: "More AC means more electricity means more coal burned means more heat trapped means hotter summers means more people needing AC. It\u2019s a death spiral. And the people who die in heatwaves? They\u2019re the ones who can\u2019t afford the AC you\u2019re running 24/7. Your comfort is literally their heat."
    },
    {
        prayer: "Year-round mangoes & strawberries",
        sacrifice: "1 in 3 people in your family will get cancer. You already know which aunty it might be.",
        connection: "Off-season fruit is grown with heavy pesticides, ripened with chemicals, and transported in refrigerated trucks burning diesel. The pesticide residue is in your food. The emissions are in your air. Cancer rates in India have doubled in 20 years. That February mango wasn\u2019t a treat \u2014 it was a trade."
    },
    {
        prayer: "Private car for every trip",
        sacrifice: "Breathing air = smoking 10 cigarettes a day. May or may not result in lung cancer.",
        connection: "Every car trip adds particulate matter, NO\u2082, and ozone to your city\u2019s air. Exposed to it daily, your lungs don\u2019t know the difference between Delhi\u2019s air and a cigarette. Your city\u2019s air is equivalent to smoking 10 cigarettes a day. You\u2019re driving the car that\u2019s making the smoke you\u2019re breathing."
    },
    {
        prayer: "Unlimited streaming & scrolling",
        sacrifice: "3 children will lose their lives to animal conflicts.",
        connection: "Data centres that power your streaming consume massive electricity. A lot of it promises to be powered by renewables and they need a lot of land \u2014 often carved out of forested areas. Deforestation pushes animals into villages and cities. In 2024, multiple children were killed in leopard attacks in Maharashtra and Uttarakhand. Your binge-watch pushed a leopard into someone\u2019s backyard."
    },
    {
        prayer: "Packaged snacks on every corner",
        sacrifice: "Your city will be under a heatwave siege. Only safe to step out from 6\u20138 AM every day.",
        connection: "Packaged food = factories running 24/7 + plastic wrapping + refrigerated transport + emissions at every step. All of it adds heat. Indian cities are now regularly crossing 45\u00B0C. Schools shut. Outdoor workers collapse. Your city becomes an oven you can\u2019t leave. That packet of chips has a carbon footprint. Multiply it by a billion packets a day."
    },
    {
        prayer: "New phone every year",
        sacrifice: "Headaches every day. Can\u2019t be sure if it\u2019s because of the heat or air quality.",
        connection: "Mining rare earth metals, manufacturing in mega-factories, shipping across oceans, and your old phone rotting in a landfill or burning in an e-waste dump \u2014 all of it adds emissions and toxins. The air gets worse. The heat rises. Your persistent headache could be either. Probably both. You\u2019ll never know for sure. That\u2019s the point."
    },
    {
        prayer: "Glass buildings",
        sacrifice: "30% kids are pre-diabetic at 11.",
        connection: "Glass towers are ovens that need relentless AC to stay habitable. They trap heat around them, raising temperatures for the entire neighbourhood \u2014 the urban heat island effect. Hotter cities mean kids stay indoors, glued to screens, eating packaged food. Activity drops. Sugar intake rises. 30% of urban Indian kids now show pre-diabetic markers. The shiny building is cooking the city and the kids inside it."
    }
];

const SIZES = ['size-s', 'size-m', 'size-l'];

let currentItem = null;

// Shuffle array (Fisher-Yates)
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Render prayer tiles
function renderTiles() {
    const container = document.getElementById('prayerTiles');
    container.innerHTML = '';
    const shuffled = shuffle(DATA);
    shuffled.forEach((item, i) => {
        const tile = document.createElement('button');
        tile.className = `prayer-tile ${SIZES[i % 3]}`;
        tile.textContent = item.prayer;
        tile.addEventListener('click', () => selectPrayer(item));
        container.appendChild(tile);
    });
}

// Show a screen
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(id);
    screen.classList.add('active');
    screen.scrollTop = 0;
    window.scrollTo(0, 0);

    if (id === 'prayers') {
        renderTiles();
    }
}

// Select a prayer
function selectPrayer(item) {
    currentItem = item;
    document.getElementById('prayerEcho').textContent = `"${item.prayer}"`;
    document.getElementById('sacrificeText').textContent = item.sacrifice;
    document.getElementById('connectionText').textContent = item.connection;
    document.getElementById('connectionText').style.display = 'none';

    // Reset the connection button visibility
    document.querySelector('.action-btn.connection').style.display = '';

    showScreen('sacrifice');
}

// Handle action buttons
function handleAction(type) {
    if (type === 'connection') {
        const el = document.getElementById('connectionText');
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
        return; // stay on the page
    }
    // Both 'accept' and 'think' go to the thank you screen
    showScreen('thankyou');
}

// =============================================
// GOOGLE FORM CONFIG
// Replace these with your actual Google Form values
// See instructions in README or ask Claude to walk you through it
// =============================================
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeUt33yEnGewPBLR-0vGTqyUuQkF-71bD-mmPO_Caifay5U0g/formResponse';
const ENTRY_PRAYER    = 'entry.611848862';
const ENTRY_SACRIFICE = 'entry.336493160';

// =============================================
// MODAL
// =============================================
function openModal() {
    document.getElementById('submitModal').style.display = 'flex';
    document.getElementById('modalForm').style.display = 'block';
    document.getElementById('modalSuccess').style.display = 'none';
    document.getElementById('inputPrayer').value = '';
    document.getElementById('inputSacrifice').value = '';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('submitModal').style.display = 'none';
    document.body.style.overflow = '';
}

function closeModalOnBackdrop(e) {
    if (e.target === document.getElementById('submitModal')) closeModal();
}

function submitOffer() {
    const prayer    = document.getElementById('inputPrayer').value.trim();
    const sacrifice = document.getElementById('inputSacrifice').value.trim();

    if (!prayer || !sacrifice) {
        alert('Please fill in both fields before offering.');
        return;
    }

    // Send to Google Forms silently via fetch (no-cors = no redirect, no page navigation)
    const body = new URLSearchParams();
    body.append(ENTRY_PRAYER, prayer);
    body.append(ENTRY_SACRIFICE, sacrifice);

    fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
    }).catch(() => {}); // no-cors always returns opaque response — ignore errors

    // Show success state immediately (don't wait for response)
    document.getElementById('modalForm').style.display = 'none';
    document.getElementById('modalSuccess').style.display = 'block';
}

// Init
renderTiles();
