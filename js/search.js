// =================== SAMPLE DATA ===================
const restaurants = [
  {
    dish: "Beef Pho",
    category: "viet",
    type: "main",
    priceRange: 2,
    restaurant: "Pho Thin Hanoi",
    image: "images/food2.png",
    price: "55,000₫",
    desc: "Traditional northern-style pho with rich broth and tender rare beef slices.",
  },
  {
    dish: "Vietnamese Banh Mi",
    category: "viet",
    type: "fastfood",
    priceRange: 1,
    restaurant: "Banh Mi Huynh Hoa",
    image: "images/food4.png",
    price: "30,000₫",
    desc: "Famous Saigon baguette filled with cold cuts, pate, and Vietnamese ham.",
  },
  {
    dish: "Broken Rice with Grilled Pork",
    category: "viet",
    type: "main",
    priceRange: 2,
    restaurant: "Com Tam Ba Ghien",
    image: "images/food1.png",
    price: "65,000₫",
    desc: "A classic Vietnamese dish with grilled pork chop, shredded pork skin, and fried egg.",
  },
  {
    dish: "Kimbap",
    category: "kor",
    type: "fastfood",
    priceRange: 1,
    restaurant: "Kimbap King",
    image: "images/food5.png",
    price: "45,000₫",
    desc: "A popular Korean roll with seaweed, rice, egg, and assorted vegetables.",
  },
  {
    dish: "Japanese Ramen",
    category: "jpn",
    type: "main",
    priceRange: 3,
    restaurant: "Ramen Ippudo",
    image: "images/food6.png",
    price: "120,000₫",
    desc: "Fresh chewy noodles served in rich tonkotsu pork broth, a Japanese classic.",
  },
  {
    dish: "Matcha Latte",
    category: "jpn",
    type: "drink",
    priceRange: 2,
    restaurant: "Uji Matcha Café",
    image: "images/food7.png",
    price: "70,000₫",
    desc: "A refreshing green tea latte with creamy milk and rich matcha flavor.",
  },
  {
    dish: "Spaghetti Bolognese",
    category: "euro",
    type: "main",
    priceRange: 2,
    restaurant: "Pasta House",
    image: "images/food8.png",
    price: "85,000₫",
    desc: "Traditional Italian pasta served with tomato sauce and minced beef.",
  },
  {
    dish: "Milk Tea",
    category: "euro",
    type: "drink",
    priceRange: 1,
    restaurant: "Bobapop",
    image: "images/food9.png",
    price: "40,000₫",
    desc: "Sweet and creamy milk tea with chewy black pearls — everyone’s favorite.",
  },
];

// =================== DOM ELEMENTS ===================
const searchName = document.getElementById("searchName");
const searchCategory = document.getElementById("searchCategory");
const searchType = document.getElementById("searchType");
const searchPrice = document.getElementById("searchPrice");
const filterBtn = document.getElementById("filterBtn");
const searchResults = document.getElementById("searchResults");
const loading = document.getElementById("loading");
const suggestGrid = document.getElementById("suggestGrid");

// =================== DISPLAY SEARCH RESULTS ===================
function displayResults(data) {
  searchResults.innerHTML = "";
  if (data.length === 0) {
    searchResults.innerHTML = `<p class="no-result">No matching dishes found 😢</p>`;
    return;
  }

  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${item.image}" alt="${item.dish}">
      <div class="card-info">
        <h3>${item.restaurant}</h3>
        <p><strong>${item.dish}</strong> — ${item.price}</p>
        <p>${item.desc}</p>
      </div>
    `;
    card.addEventListener("click", () => {
      localStorage.setItem("selectedRestaurant", JSON.stringify(item));
      window.location.href = "restaurant.html";
    });
    searchResults.appendChild(card);
  });
}

// =================== FILTER SEARCH ===================
function performSearch() {
  searchResults.innerHTML = "";
  loading.style.display = "flex";

  setTimeout(() => {
    const name = searchName.value.toLowerCase();
    const cat = searchCategory.value;
    const type = searchType.value;
    const price = searchPrice.value;

    const filtered = restaurants.filter((item) => {
      return (
        (!name || item.dish.toLowerCase().includes(name)) &&
        (!cat || item.category === cat) &&
        (!type || item.type === type) &&
        (!price || String(item.priceRange) === price)
      );
    });

    loading.style.display = "none";
    displayResults(filtered);
  }, 1200);
}

filterBtn.addEventListener("click", performSearch);

// =================== TODAY’S SUGGESTIONS ===================
function displaySuggestions() {
  const suggest = restaurants.slice(0, 4);
  suggestGrid.innerHTML = "";
  suggest.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${item.image}" alt="${item.dish}">
      <div class="card-info">
        <h3>${item.restaurant}</h3>
        <p><strong>${item.dish}</strong> — ${item.price}</p>
      </div>
    `;
    card.addEventListener("click", () => {
      localStorage.setItem("selectedRestaurant", JSON.stringify(item));
      window.location.href = "restaurant.html";
    });
    suggestGrid.appendChild(card);
  });
}
displaySuggestions();

// =================== CHATBOT ===================
const chatbotIcon = document.getElementById("chatbotIcon");
const chatbox = document.getElementById("chatbox");
const closeChat = document.getElementById("closeChat");
const sendChat = document.getElementById("sendChat");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

chatbotIcon.addEventListener("click", () => chatbox.classList.add("open"));
closeChat.addEventListener("click", () => chatbox.classList.remove("open"));

sendChat.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  chatBody.innerHTML += `<p class="user-message">${msg}</p>`;
  chatInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    chatBody.innerHTML += `<p class="bot-message">Hmm... it seems you’re looking for ${msg}, let me suggest some dishes 🍽️</p>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 800);
}
