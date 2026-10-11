/**
 * EAZYSTORE - Core Application JavaScript
 * Dynamic Storefront, COD Checkout Modal, Multi-Language (FR/EN/AR), and Full Admin Panel
 */

// ===== INLINE SVG ICON LIBRARY (No emojis — clean, monochrome) =====
const ICONS = {
  cart: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/><path d="M9 6V4h6v2"/></svg>`,
  copy: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  truck: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.17h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.05 6.05l1.88-1.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  lock: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  unlock: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
};


// Initial Data Seed (Stored in localStorage)
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    title: "Casque Bluetooth Wireless ANC",
    category: "tech",
    price: 6800,
    oldPrice: 9500,
    rating: 4.9,
    reviews: 128,
    image: "assets/images/headphone.jpg",
    badge: "🔥 Viral sur TikTok",
    description: "Casque à réduction de bruit active premium, autonomie 40h. Son HD pur."
  },
  {
    id: 2,
    title: "Montre Connectée OLED Titanium",
    category: "tech",
    price: 8900,
    oldPrice: 12000,
    rating: 4.8,
    reviews: 94,
    image: "assets/images/smartwatch.jpg",
    badge: "⭐ Best Seller",
    description: "Écran OLED HD, suivi cardiaque, étanche IP68, compatible iOS & Android."
  },
  {
    id: 3,
    title: "Sérum Éclat Visage Luxe 50ml",
    category: "beauty",
    price: 3400,
    oldPrice: 4800,
    rating: 5.0,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    badge: "✨ Tendances IG",
    description: "Hydratation profonde et anti-âge naturel aux huiles essentielles rares."
  },
  {
    id: 4,
    title: "Lunettes de Soleil Vintage Polarized",
    category: "fashion",
    price: 2900,
    oldPrice: 4200,
    rating: 4.7,
    reviews: 65,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    badge: "😎 Tendance Eté",
    description: "Protection UV400 maximale, monture alliage ultra-légère et robuste."
  },
  {
    id: 5,
    title: "Mini Projecteur Smart 4K Home",
    category: "home",
    price: 14500,
    oldPrice: 19900,
    rating: 4.9,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    badge: "🎬 Cinéma Maison",
    description: "Transformez n'importe quel mur en écran 120 pouces Cinema Android intégré."
  },
  {
    id: 6,
    title: "Enceinte Portable Bass Boost RGB",
    category: "tech",
    price: 4200,
    oldPrice: 5800,
    rating: 4.8,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    badge: "🎵 Strong Bass",
    description: "Son 360° immersif avec jeux de lumières RGB synchronisés."
  }
];

const DEFAULT_ORDERS = [
  {
    id: "ORD-9821",
    customerName: "Amine Benali",
    phone: "0554123456",
    wilaya: "16 - Alger",
    address: "Bab Ezzouar, Cité EPLF",
    productTitle: "Casque Bluetooth Wireless ANC",
    qty: 1,
    totalPrice: 7400, // Product 6800 + Shipping 600
    status: "confirmed",
    date: "2026-10-08 10:30"
  },
  {
    id: "ORD-9822",
    customerName: "Sarah Mansouri",
    phone: "0661987654",
    wilaya: "31 - Oran",
    address: "Akid Lotfi",
    productTitle: "Montre Connectée OLED Titanium",
    qty: 1,
    totalPrice: 9700,
    status: "pending",
    date: "2026-10-08 11:15"
  }
];

// Algerian 58 Wilayas List for Delivery
const WILAYAS = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna",
  "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira",
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou",
  "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda",
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine",
  "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla",
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj", "35 - Boumerdès",
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela",
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma",
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - El M'Ghair", "50 - El Meniaa",
  "51 - Ouled Djellal", "52 - Bordj Baji Mokhtar", "53 - Béni Abbès", "54 - Timimoun", "55 - Touggourt",
  "56 - Djanet", "57 - In Salah", "58 - In Guezzam"
];

// Translations Dictionary
const TRANSLATIONS = {
  FR: {
    heroBadge: "🔥 N°1 Boutique Tendance en Algérie",
    heroTitle: "Trouvez Vos Produits Tendances Directement Chez Vous",
    heroSubtitle: "Parcourez nos meilleures offres sélectionnées sur les réseaux sociaux. Livraison express dans les 58 wilayas avec paiement à la livraison.",
    btnBrowse: "Parcourir les produits",
    btnFastOrder: "Commander Rapidement",
    catTitle: "Parcourir par catégorie",
    catSubtitle: "Trouvez exactement ce que vous cherchez",
    navHome: "Accueil",
    navBrowse: "Produits",
    navAdmin: "Panel Admin",
    cartLabel: "Panier",
    orderModalTitle: "Commander - Paiement à la Livraison",
    orderModalSubtitle: "Remplissez le formulaire ci-dessous. Notre équipe vous appellera pour confirmer.",
    lblFullName: "Nom & Prénom *",
    lblPhone: "Numéro de Téléphone *",
    lblWilaya: "Wilaya de Livraison *",
    lblAddress: "Adresse Exacte *",
    lblQty: "Quantité",
    lblTotal: "Total avec livraison:",
    btnConfirmOrder: "Confirmer la Commande (COD)",
    adminTitle: "Tableau de Bord Administrateur",
    statSales: "Ventes Totales",
    statOrders: "Commandes",
    statPending: "En Attente",
    statProducts: "Produits Actifs",
    tabOrders: "Gestion des Commandes",
    tabProducts: "Gestion du Catalogue",
    tabSettings: "Paramètres Boutique"
  },
  EN: {
    heroBadge: "🔥 #1 Trending Store in Algeria",
    heroTitle: "Find Your Favorite Viral Products Right at Home",
    heroSubtitle: "Discover hand-picked viral products from social media. Express home delivery across 58 wilayas with cash on delivery.",
    btnBrowse: "Browse Products",
    btnFastOrder: "Fast Order",
    catTitle: "Browse by Category",
    catSubtitle: "Find exactly what you are looking for",
    navHome: "Home",
    navBrowse: "Products",
    navAdmin: "Admin Panel",
    cartLabel: "Cart",
    orderModalTitle: "Order Now - Cash on Delivery",
    orderModalSubtitle: "Fill out the form below. Our team will call you to confirm shipping details.",
    lblFullName: "Full Name *",
    lblPhone: "Phone Number *",
    lblWilaya: "Delivery Wilaya *",
    lblAddress: "Exact Address *",
    lblQty: "Quantity",
    lblTotal: "Total including shipping:",
    btnConfirmOrder: "Confirm Order (Cash on Delivery)",
    adminTitle: "Admin Dashboard",
    statSales: "Total Sales",
    statOrders: "Total Orders",
    statPending: "Pending Orders",
    statProducts: "Active Products",
    tabOrders: "Orders Management",
    tabProducts: "Catalog Management",
    tabSettings: "Store Settings"
  },
  AR: {
    heroBadge: "🔥 المتجر الأول للـمنتجات الأكثر طلباً في الجزائر",
    heroTitle: "اكتشف أفضل المنتجات التريند واطلبها لغاية باب منزلك",
    heroSubtitle: "تصفح تشكيلة مميزة من المنتجات الرائجة على مواقع التواصل الاجتماعي. التوصيل سريع لـ 58 ولاية مع الدفع عند الاستلام.",
    btnBrowse: "تصفح المنتجات",
    btnFastOrder: "طلب سريع",
    catTitle: "تصفح حسب الفئة",
    catSubtitle: "جد بالضبط ما تبحث عنه",
    navHome: "الرئيسية",
    navBrowse: "المنتجات",
    navAdmin: "لوحة التحكم",
    cartLabel: "السلة",
    orderModalTitle: "طلب المنتج - الدفع عند الاستلام",
    orderModalSubtitle: "يرجى ملء الاستمارة وسيقوم فريقنا بالاتصال بك لتأكيد الطلب.",
    lblFullName: "الاسم واللقب *",
    lblPhone: "رقم الهاتف *",
    lblWilaya: "ولاية التوصيل *",
    lblAddress: "العنوان الكامل *",
    lblQty: "الكمية",
    lblTotal: "المبلغ الإجمالي مع التوصيل:",
    btnConfirmOrder: "تأكيد الطلب الآن",
    adminTitle: "لوحة تحكم الأدمن",
    statSales: "إجمالي المبيعات",
    statOrders: "الطلبات",
    statPending: "قيد الانتظار",
    statProducts: "المنتجات النشطة",
    tabOrders: "إدارة الطلبات",
    tabProducts: "إدارة المنتجات",
    tabSettings: "إعدادات المتجر"
  }
};

// Default Master Password
const DEFAULT_ADMIN_PIN = "admin1234";

// Application State
let state = {
  currentLang: "FR",
  activeCategory: "all",
  activeAdminTab: "orders",
  products: DEFAULT_PRODUCTS,
  orders: DEFAULT_ORDERS,
  selectedProductForOrder: null,
  orderQty: 1,
  adminAuthenticated: sessionStorage.getItem("eazy_admin_auth") === "true",
  editingProductId: null,
  searchQuery: "",
  adminSearchQuery: "",
  tempUploadedImage: null
};

// Initialize App
document.addEventListener("DOMContentLoaded", async () => {
  initWilayaSelect();
  setupEventListeners();
  initLivePreview();
  updateLanguageUI();

  // Load from DB (Supabase cloud if configured, otherwise localStorage)
  if (typeof DB !== "undefined") {
    state.products = await DB.getProducts(DEFAULT_PRODUCTS);
    state.orders = await DB.getOrders(DEFAULT_ORDERS);
  } else {
    state.products = JSON.parse(localStorage.getItem("eazy_products")) || DEFAULT_PRODUCTS;
    state.orders = JSON.parse(localStorage.getItem("eazy_orders")) || DEFAULT_ORDERS;
  }

  renderProducts();
  renderAdminOrders();
  renderAdminProducts();
  updateAdminStats();
  if (typeof lucide !== 'undefined') lucide.createIcons();
});

// Event Listeners Setup
function setupEventListeners() {
  // Storefront Product Search Bar
  const searchInput = document.getElementById("store-search-input");
  const searchForm = document.getElementById("store-search-form");
  const clearBtn = document.getElementById("btn-clear-search");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn) {
        clearBtn.style.display = state.searchQuery ? "flex" : "none";
      }
      renderProducts();
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const section = document.getElementById("products-section");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const section = document.getElementById("products-section");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      resetStoreSearch();
    });
  }

  // Category filter cards
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      state.activeCategory = card.dataset.category || "all";
      renderProducts();
    });
  });

  // Admin Access Triggers (Protected by Password Modal)
  document.getElementById("btn-admin-gate")?.addEventListener("click", openAdminAuthModal);
  document.getElementById("link-admin-footer")?.addEventListener("click", openAdminAuthModal);
  document.getElementById("btn-back-store")?.addEventListener("click", () => toggleAdminView(false));
  document.getElementById("btn-logout-admin")?.addEventListener("click", logoutAdmin);

  // Admin Auth Modal Listeners
  document.getElementById("btn-close-auth-modal")?.addEventListener("click", closeAdminAuthModal);
  document.getElementById("admin-auth-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "admin-auth-modal") closeAdminAuthModal();
  });
  document.getElementById("admin-login-form")?.addEventListener("submit", handleAdminLogin);
  document.getElementById("btn-toggle-pin-visibility")?.addEventListener("click", togglePinVisibility);

  // Admin Global Keyboard Shortcut: Ctrl + Shift + A
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
      e.preventDefault();
      openAdminAuthModal();
    }
  });

  // Admin Tabs
  document.querySelectorAll(".admin-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");
    });
  });

  // Modal controls
  document.getElementById("btn-close-modal")?.addEventListener("click", closeModal);
  document.getElementById("modal-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "modal-overlay") closeModal();
  });

  // Quantity controls
  document.getElementById("btn-qty-minus")?.addEventListener("click", () => {
    if (state.orderQty > 1) {
      state.orderQty--;
      updateOrderTotal();
    }
  });

  document.getElementById("btn-qty-plus")?.addEventListener("click", () => {
    state.orderQty++;
    updateOrderTotal();
  });

  // Wilaya select change -> update shipping cost & total
  document.getElementById("select-wilaya")?.addEventListener("change", updateOrderTotal);

  // COD Order Form Submit
  document.getElementById("cod-order-form")?.addEventListener("submit", handleOrderSubmit);

  // Admin Add / Edit Product Form
  document.getElementById("add-product-form")?.addEventListener("submit", handleAddProduct);
  document.getElementById("btn-reset-prod-form")?.addEventListener("click", resetProductForm);
  document.getElementById("btn-cancel-edit-prod")?.addEventListener("click", resetProductForm);

  // Product Image Upload Listeners
  setupImageUploadListeners();

  // Search in Admin Catalog
  document.getElementById("admin-search-prod")?.addEventListener("input", (e) => {
    state.adminSearchQuery = e.target.value.toLowerCase().trim();
    renderAdminProducts();
  });

  // Change PIN Form
  document.getElementById("change-pin-form")?.addEventListener("submit", handleChangePin);

  // Language Switcher Buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentLang = btn.dataset.lang;
      updateLanguageUI();
    });
  });
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  let filtered = state.products;

  // Filter by category
  if (state.activeCategory && state.activeCategory !== "all") {
    filtered = filtered.filter(p => p.category === state.activeCategory);
  }

  // Filter by storefront search query
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.badge && p.badge.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    const isSearch = !!state.searchQuery;
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <p style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
          ${isSearch ? `Aucun produit ne correspond à "${state.searchQuery}"` : "Aucun produit dans cette catégorie pour le moment."}
        </p>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 22px;">
          Vérifiez l'orthographe ou découvrez l'ensemble de notre sélection tendance.
        </p>
        <button onclick="resetStoreSearch()" class="btn-pill btn-pill-outline" style="padding: 10px 24px; font-weight: 700; cursor: pointer;">
          Voir tous les produits
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-image-container">
        <img src="${p.image}" alt="${p.title}" class="product-image" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-content">
        <div class="product-category">${p.category}</div>
        <h3 class="product-title">${p.title}</h3>
        <div class="product-rating">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          <span class="product-rating-count">(${p.reviews || 45})</span>
        </div>
        <div class="product-price-row">
          <span class="current-price">${p.price.toLocaleString()} DA</span>
          ${p.oldPrice ? `<span class="old-price">${p.oldPrice.toLocaleString()} DA</span>` : ''}
        </div>
        <button class="btn-pill btn-pill-dark btn-buy-now" onclick="openOrderModal(${p.id})">
          ${ICONS.cart} Commander maintenant
        </button>
      </div>
    </div>
  `).join('');
}

// Reset Storefront Search & Category Filter
function resetStoreSearch() {
  state.searchQuery = "";
  state.activeCategory = "all";

  const searchInput = document.getElementById("store-search-input");
  if (searchInput) searchInput.value = "";

  const clearBtn = document.getElementById("btn-clear-search");
  if (clearBtn) clearBtn.style.display = "none";

  document.querySelectorAll(".category-card").forEach(c => {
    if (c.dataset.category === "all") c.classList.add("active");
    else c.classList.remove("active");
  });

  renderProducts();
}

// Populate 58 Algerian Wilayas
function initWilayaSelect() {
  const select = document.getElementById("select-wilaya");
  if (!select) return;

  select.innerHTML = '<option value="" disabled selected>Sélectionnez votre Wilaya</option>' + 
    WILAYAS.map(w => `<option value="${w}">${w}</option>`).join('');
}

// Open Instant COD Order Modal
function openOrderModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.selectedProductForOrder = product;
  state.orderQty = 1;

  document.getElementById("modal-thumb").src = product.image;
  document.getElementById("modal-item-title").textContent = product.title;
  document.getElementById("modal-item-price").textContent = `${product.price.toLocaleString()} DA`;
  document.getElementById("input-qty").textContent = state.orderQty;

  updateOrderTotal();

  const modal = document.getElementById("modal-overlay");
  modal.classList.add("active");
}

function closeModal() {
  document.getElementById("modal-overlay")?.classList.remove("active");
}

// Calculate Total (Product Price * Qty + Wilaya Shipping)
function updateOrderTotal() {
  if (!state.selectedProductForOrder) return;

  document.getElementById("input-qty").textContent = state.orderQty;

  const wilayaSelect = document.getElementById("select-wilaya");
  const wilayaVal = wilayaSelect ? wilayaSelect.value : "";
  
  // Shipping logic: Alger (600 DA), Northern Wilayas (700 DA), Southern Wilayas (900 DA)
  let shippingCost = 600;
  if (wilayaVal) {
    const wilayaNum = parseInt(wilayaVal.split(' - ')[0], 10);
    if ([11, 33, 37, 47, 50, 52, 53, 54, 55, 56, 57, 58].includes(wilayaNum)) {
      shippingCost = 1000; // Deep South
    } else if (wilayaNum !== 16) {
      shippingCost = 800; // Other wilayas
    }
  }

  const itemsTotal = state.selectedProductForOrder.price * state.orderQty;
  const grandTotal = itemsTotal + shippingCost;

  document.getElementById("lbl-shipping-cost").textContent = `${shippingCost} DA`;
  document.getElementById("lbl-grand-total").textContent = `${grandTotal.toLocaleString()} DA`;
}

// Handle Customer Order Submission
async function handleOrderSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("input-name").value.trim();
  const phone = document.getElementById("input-phone").value.trim();
  const wilaya = document.getElementById("select-wilaya").value;
  const address = document.getElementById("input-address").value.trim();

  if (!name || !phone || !wilaya || !address) {
    showToast("Veuillez remplir tous les champs obligatoires (*)", "warning");
    return;
  }

  const shippingCost = wilaya.includes("16") ? 600 : 800;
  const grandTotal = (state.selectedProductForOrder.price * state.orderQty) + shippingCost;

  const newOrder = {
    id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
    customerName: name,
    phone: phone,
    wilaya: wilaya,
    address: address,
    productTitle: state.selectedProductForOrder.title,
    qty: state.orderQty,
    totalPrice: grandTotal,
    status: "pending",
    date: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };

  if (typeof DB !== "undefined") {
    await DB.createOrder(newOrder);
  } else {
    localStorage.setItem("eazy_orders", JSON.stringify([newOrder, ...state.orders]));
  }

  state.orders.unshift(newOrder);

  closeModal();
  showToast("Commande enregistrée avec succès! Nous vous contacterons rapidement.", "check");

  // Reset Form
  document.getElementById("cod-order-form").reset();

  // Refresh Admin view data if open
  renderAdminOrders();
  updateAdminStats();
}

// Admin Panel Security & Authentication Helpers
function getStoredAdminPin() {
  return localStorage.getItem("eazy_admin_pin") || DEFAULT_ADMIN_PIN;
}

function openAdminAuthModal() {
  if (state.adminAuthenticated) {
    toggleAdminView(true);
    return;
  }
  const modal = document.getElementById("admin-auth-modal");
  const errorMsg = document.getElementById("admin-auth-error");
  const pinInput = document.getElementById("admin-pin-input");
  
  if (errorMsg) errorMsg.style.display = "none";
  if (pinInput) {
    pinInput.value = "";
    setTimeout(() => pinInput.focus(), 100);
  }
  modal?.classList.add("active");
}

function closeAdminAuthModal() {
  document.getElementById("admin-auth-modal")?.classList.remove("active");
}

function togglePinVisibility() {
  const pinInput = document.getElementById("admin-pin-input");
  if (!pinInput) return;
  pinInput.type = pinInput.type === "password" ? "text" : "password";
}

async function handleAdminLogin(e) {
  e.preventDefault();
  const pinInput = document.getElementById("admin-pin-input");
  const errorMsg = document.getElementById("admin-auth-error");
  const card = document.querySelector(".auth-modal-card");
  const enteredPin = pinInput ? pinInput.value.trim() : "";
  const storedPin = typeof DB !== "undefined" ? await DB.getAdminPin(DEFAULT_ADMIN_PIN) : getStoredAdminPin();

  if (enteredPin === storedPin) {
    state.adminAuthenticated = true;
    sessionStorage.setItem("eazy_admin_auth", "true");
    closeAdminAuthModal();
    toggleAdminView(true);
    showToast("Authentification réussie. Bienvenue dans l'espace admin.", "check");
    if (typeof lucide !== 'undefined') lucide.createIcons();
  } else {
    if (errorMsg) errorMsg.style.display = "block";
    if (card) {
      card.classList.remove("shake");
      void card.offsetWidth; // trigger reflow
      card.classList.add("shake");
    }
    if (pinInput) {
      pinInput.value = "";
      pinInput.focus();
    }
  }
}

function logoutAdmin() {
  state.adminAuthenticated = false;
  sessionStorage.removeItem("eazy_admin_auth");
  toggleAdminView(false);
  showToast("Session verrouillée et sécurisée.", "check");
}

async function handleChangePin(e) {
  e.preventDefault();
  const currentPin = document.getElementById("input-current-pin").value.trim();
  const newPin = document.getElementById("input-new-pin").value.trim();
  const storedPin = typeof DB !== "undefined" ? await DB.getAdminPin(DEFAULT_ADMIN_PIN) : getStoredAdminPin();

  if (currentPin !== storedPin) {
    showToast("Le mot de passe actuel est incorrect.", "warning");
    return;
  }

  if (newPin.length < 4) {
    showToast("Le nouveau mot de passe doit comporter au moins 4 caractères.", "warning");
    return;
  }

  if (typeof DB !== "undefined") {
    await DB.setAdminPin(newPin);
  } else {
    localStorage.setItem("eazy_admin_pin", newPin);
  }

  document.getElementById("change-pin-form").reset();
  showToast("Mot de passe administrateur modifié avec succès.", "check");
}

// Admin Panel View Toggle
function toggleAdminView(forceState) {
  const storeView = document.querySelector(".store-view");
  const adminView = document.querySelector(".admin-view");

  const shouldOpen = typeof forceState === "boolean" 
    ? forceState 
    : !adminView.classList.contains("active");

  if (shouldOpen) {
    if (!state.adminAuthenticated) {
      openAdminAuthModal();
      return;
    }
    adminView.classList.add("active");
    storeView.classList.add("hidden");
    window.scrollTo(0, 0);
    renderAdminOrders();
    renderAdminProducts();
    updateAdminStats();
    updateLivePreview();
  } else {
    adminView.classList.remove("active");
    storeView.classList.remove("hidden");
    window.scrollTo(0, 0);
  }
}

// Render Admin Orders Table
function renderAdminOrders() {
  const tableBody = document.getElementById("admin-orders-tbody");
  const countBadge = document.getElementById("orders-count-badge");
  if (countBadge) countBadge.textContent = `${state.orders.length} commande${state.orders.length > 1 ? 's' : ''}`;
  if (!tableBody) return;

  if (state.orders.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px;">Aucune commande enregistrée pour le moment.</td></tr>`;
    return;
  }

  tableBody.innerHTML = state.orders.map(order => `
    <tr>
      <td><strong>${order.id}</strong></td>
      <td>
        <div><strong>${order.customerName}</strong></div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">${order.phone}</div>
      </td>
      <td>${order.productTitle} (x${order.qty})</td>
      <td>${order.wilaya}</td>
      <td><strong>${order.totalPrice.toLocaleString()} DA</strong></td>
      <td>
        <select onchange="updateOrderStatus('${order.id}', this.value)" style="padding: 4px 10px; border-radius: 8px; font-weight: 700; border: 1px solid var(--border-color); cursor: pointer;">
          <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>En attente</option>
          <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmé</option>
          <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Expédié</option>
          <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Livré</option>
        </select>
      </td>
      <td>
        <button onclick="deleteOrder('${order.id}')" style="background: none; border: none; color: #ef4444; cursor: pointer; font-weight: 700;">Supprimer</button>
      </td>
    </tr>
  `).join('');
}

async function updateOrderStatus(orderId, newStatus) {
  const order = state.orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    if (typeof DB !== "undefined") {
      await DB.updateOrderStatus(orderId, newStatus);
    } else {
      localStorage.setItem("eazy_orders", JSON.stringify(state.orders));
    }
    updateAdminStats();
    showToast(`Statut commande ${orderId} mis à jour!`, "check");
  }
}

async function deleteOrder(orderId) {
  if (confirm(`Voulez-vous vraiment supprimer la commande ${orderId}?`)) {
    state.orders = state.orders.filter(o => o.id !== orderId);
    if (typeof DB !== "undefined") {
      await DB.deleteOrder(orderId);
    } else {
      localStorage.setItem("eazy_orders", JSON.stringify(state.orders));
    }
    renderAdminOrders();
    updateAdminStats();
    showToast("Commande supprimée.", "check");
  }
}

// ==========================================
// IMAGE UPLOAD & LIVE CARD PREVIEW
// ==========================================
function setupImageUploadListeners() {
  const fileInput = document.getElementById("prod-file-input");
  const triggerBtn = document.getElementById("btn-trigger-file");
  const uploadZone = document.getElementById("upload-zone");

  triggerBtn?.addEventListener("click", () => fileInput?.click());

  fileInput?.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      handleProductFile(e.target.files[0]);
    }
  });

  // Drag & drop
  if (uploadZone) {
    uploadZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadZone.classList.add("dragover");
    });
    uploadZone.addEventListener("dragleave", () => {
      uploadZone.classList.remove("dragover");
    });
    uploadZone.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadZone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleProductFile(e.dataTransfer.files[0]);
      }
    });
  }

  // Preset Image Buttons
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const url = btn.dataset.url;
      const urlInput = document.getElementById("prod-image");
      if (urlInput) urlInput.value = url;
      state.tempUploadedImage = null;
      updateLivePreview();
      showToast("Exemple d'image sélectionné!");
    });
  });
}

function handleProductFile(file) {
  if (!file.type.startsWith("image/")) {
    showToast("⚠️ Veuillez sélectionner un fichier image valide (JPG, PNG, WEBP).");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    state.tempUploadedImage = e.target.result;
    const urlInput = document.getElementById("prod-image");
    if (urlInput) urlInput.value = "";
    updateLivePreview();
    showToast("📸 Photo importée depuis votre appareil avec succès!");
  };
  reader.readAsDataURL(file);
}

// Real-Time Live Preview Init & Update
function initLivePreview() {
  const inputs = [
    "prod-title", "prod-category", "prod-price", "prod-oldprice", 
    "prod-badge", "prod-desc", "prod-image", "prod-stock"
  ];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener("input", updateLivePreview);
    el?.addEventListener("change", updateLivePreview);
  });
  updateLivePreview();
}

function updateLivePreview() {
  const titleVal = document.getElementById("prod-title")?.value.trim() || "Nom de votre produit";
  const catSelect = document.getElementById("prod-category");
  const catText = catSelect ? catSelect.options[catSelect.selectedIndex]?.text || "Électronique" : "Électronique";
  const priceVal = parseFloat(document.getElementById("prod-price")?.value) || 4500;
  const oldPriceVal = parseFloat(document.getElementById("prod-oldprice")?.value);
  const badgeVal = document.getElementById("prod-badge")?.value.trim() || "";
  const descVal = document.getElementById("prod-desc")?.value.trim() || "Description courte et captivante de votre produit tendance.";
  const urlVal = document.getElementById("prod-image")?.value.trim();

  const previewTitle = document.getElementById("preview-title");
  const previewCategory = document.getElementById("preview-category");
  const previewPrice = document.getElementById("preview-price");
  const previewOldPrice = document.getElementById("preview-oldprice");
  const previewDiscount = document.getElementById("preview-discount");
  const previewBadge = document.getElementById("preview-badge");
  const previewDesc = document.getElementById("preview-desc");
  const previewImage = document.getElementById("preview-image");

  if (previewTitle) previewTitle.textContent = titleVal;
  if (previewCategory) previewCategory.textContent = catText;
  if (previewPrice) previewPrice.textContent = `${priceVal.toLocaleString()} DA`;
  if (previewDesc) previewDesc.textContent = descVal;

  if (previewBadge) {
    previewBadge.textContent = badgeVal;
    previewBadge.style.display = badgeVal ? "inline-block" : "none";
  }

  // Price & Discount calculation
  if (oldPriceVal && oldPriceVal > priceVal) {
    const pct = Math.round(((oldPriceVal - priceVal) / oldPriceVal) * 100);
    if (previewOldPrice) {
      previewOldPrice.style.display = "inline";
      previewOldPrice.textContent = `${oldPriceVal.toLocaleString()} DA`;
    }
    if (previewDiscount) {
      previewDiscount.style.display = "inline";
      previewDiscount.textContent = `-${pct}%`;
    }
  } else {
    if (previewOldPrice) previewOldPrice.style.display = "none";
    if (previewDiscount) previewDiscount.style.display = "none";
  }

  // Image Preview
  const imgSrc = state.tempUploadedImage || urlVal || "assets/images/headphone.jpg";
  if (previewImage) previewImage.src = imgSrc;
}

// ==========================================
// ADD, EDIT & DELETE PRODUCTS
// ==========================================
async function handleAddProduct(e) {
  e.preventDefault();

  const title = document.getElementById("prod-title").value.trim();
  const category = document.getElementById("prod-category").value;
  const price = parseFloat(document.getElementById("prod-price").value);
  const oldPrice = parseFloat(document.getElementById("prod-oldprice").value) || null;
  const stock = document.getElementById("prod-stock").value;
  const urlVal = document.getElementById("prod-image").value.trim();
  const badge = document.getElementById("prod-badge").value.trim(); // Free text written by admin, or empty
  const desc = document.getElementById("prod-desc").value.trim() || "";

  const image = state.tempUploadedImage || urlVal || "assets/images/headphone.jpg";

  if (!title || isNaN(price) || !category) {
    showToast("Veuillez renseigner au moins le nom, la catégorie et le prix.", "warning");
    return;
  }

  let savedProd;
  if (state.editingProductId) {
    // Mode Update Existing Product
    const prod = state.products.find(p => p.id === state.editingProductId);
    if (prod) {
      prod.title = title;
      prod.category = category;
      prod.price = price;
      prod.oldPrice = oldPrice;
      prod.stock = stock;
      prod.image = image;
      prod.badge = badge;
      prod.description = desc;
      savedProd = prod;
      showToast("Produit mis à jour avec succès!", "check");
    }
  } else {
    // Mode Create New Product
    savedProd = {
      id: Date.now(),
      title,
      category,
      price,
      oldPrice,
      stock,
      image,
      badge,
      rating: 5.0,
      reviews: Math.floor(15 + Math.random() * 85),
      description: desc
    };
    state.products.unshift(savedProd);
    showToast("Produit ajouté avec succès au catalogue!", "check");
  }

  if (savedProd) {
    if (typeof DB !== "undefined") {
      await DB.saveProduct(savedProd);
    } else {
      localStorage.setItem("eazy_products", JSON.stringify(state.products));
    }
  }

  renderProducts();
  renderAdminProducts();
  updateAdminStats();
  resetProductForm();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function startEditProduct(productId) {
  const prod = state.products.find(p => p.id === productId);
  if (!prod) return;

  state.editingProductId = prod.id;
  state.tempUploadedImage = prod.image.startsWith("data:") ? prod.image : null;

  document.getElementById("prod-edit-id").value = prod.id;
  document.getElementById("prod-title").value = prod.title;
  document.getElementById("prod-category").value = prod.category;
  document.getElementById("prod-price").value = prod.price;
  document.getElementById("prod-oldprice").value = prod.oldPrice || "";
  document.getElementById("prod-stock").value = prod.stock || "in_stock";
  document.getElementById("prod-image").value = prod.image.startsWith("data:") ? "" : prod.image;
  document.getElementById("prod-badge").value = prod.badge || "";
  document.getElementById("prod-desc").value = prod.description || "";

  document.getElementById("form-product-mode-title").textContent = `Modifier : ${prod.title}`;
  document.getElementById("btn-save-prod").innerHTML = '<i data-lucide="save" style="width:15px;height:15px;"></i> Sauvegarder';
  document.getElementById("btn-cancel-edit-prod").style.display = "inline-flex";

  updateLivePreview();
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Scroll smooth to editor card
  document.querySelector(".editor-form-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetProductForm() {
  state.editingProductId = null;
  state.tempUploadedImage = null;

  document.getElementById("add-product-form")?.reset();
  document.getElementById("prod-edit-id").value = "";
  document.getElementById("prod-badge").value = "";
  document.getElementById("form-product-mode-title").textContent = "Ajouter un Nouveau Produit";
  document.getElementById("btn-save-prod").innerHTML = '<i data-lucide="save" style="width:15px;height:15px;"></i> Enregistrer le Produit';
  document.getElementById("btn-cancel-edit-prod").style.display = "none";

  updateLivePreview();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

async function duplicateProduct(productId) {
  const prod = state.products.find(p => p.id === productId);
  if (!prod) return;

  const clone = JSON.parse(JSON.stringify(prod));
  clone.id = Date.now();
  clone.title = `${clone.title} (Copie)`;

  state.products.unshift(clone);
  if (typeof DB !== "undefined") {
    await DB.saveProduct(clone);
  } else {
    localStorage.setItem("eazy_products", JSON.stringify(state.products));
  }

  renderProducts();
  renderAdminProducts();
  updateAdminStats();
  showToast("Produit dupliqué avec succès!", "check");
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

async function deleteProduct(productId) {
  if (confirm("Voulez-vous vraiment supprimer ce produit du catalogue?")) {
    state.products = state.products.filter(p => p.id !== productId);
    if (typeof DB !== "undefined") {
      await DB.deleteProduct(productId);
    } else {
      localStorage.setItem("eazy_products", JSON.stringify(state.products));
    }
    renderProducts();
    renderAdminProducts();
    updateAdminStats();
    showToast("Produit supprimé du catalogue.", "check");
  }
}

// Render Admin Products List
function renderAdminProducts() {
  const container = document.getElementById("admin-products-list");
  const countBadge = document.getElementById("admin-prod-count");
  if (!container) return;

  const filtered = state.adminSearchQuery
    ? state.products.filter(p => 
        p.title.toLowerCase().includes(state.adminSearchQuery) || 
        p.category.toLowerCase().includes(state.adminSearchQuery)
      )
    : state.products;

  if (countBadge) {
    countBadge.textContent = `${filtered.length} produit${filtered.length > 1 ? 's' : ''}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px; color: var(--text-muted);">
        Aucun produit ne correspond à votre recherche.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const stockClass = p.stock === 'out' ? 'stock-out' : (p.stock === 'limited' ? 'stock-limited' : 'stock-in');
    const stockText = p.stock === 'out' ? 'Rupture' : (p.stock === 'limited' ? 'Stock limité' : 'En stock');

    return `
      <div class="admin-prod-item">
        <div class="admin-prod-info">
          <img src="${p.image}" alt="${p.title}" class="admin-prod-thumb" onerror="this.src='assets/images/headphone.jpg'">
          <div>
            <div style="font-weight: 700; font-size: 1rem; color: var(--text-primary);">
              ${p.title}
              <span class="stock-badge-tag ${stockClass}">${stockText}</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              <strong style="color: var(--accent-dark);">${p.price.toLocaleString()} DA</strong>
              ${p.oldPrice ? `<span style="text-decoration: line-through; margin-left: 6px;">${p.oldPrice.toLocaleString()} DA</span>` : ''}
              &nbsp;•&nbsp; ${p.category}
              ${p.badge ? `&nbsp;•&nbsp; <span style="color: #64748b; font-weight: 600;">${p.badge}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="admin-actions-btns">
          <button onclick="startEditProduct(${p.id})" class="btn-action-edit">
            ${ICONS.edit} Modifier
          </button>
          <button onclick="duplicateProduct(${p.id})" class="btn-pill btn-pill-outline" style="padding: 7px 14px; font-size: 0.82rem; display:inline-flex; align-items:center; gap:5px;">
            ${ICONS.copy} Dupliquer
          </button>
          <button onclick="deleteProduct(${p.id})" class="btn-action-del">
            ${ICONS.trash} Supprimer
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// BACKUP, EXPORT & CODE SEED GENERATOR
// ==========================================
function exportCatalogJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.products, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `eazystore-catalogue-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Fichier catalogue JSON téléchargé.", "check");
}

function importCatalogJson(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const imported = JSON.parse(evt.target.result);
      if (Array.isArray(imported) && imported.length > 0) {
        state.products = imported;
        localStorage.setItem("eazy_products", JSON.stringify(state.products));
        renderProducts();
        renderAdminProducts();
        updateAdminStats();
        showToast(`${imported.length} produits restaurés avec succès.`, "check");
      } else {
        showToast("Le fichier JSON ne contient pas une liste valide de produits.", "warning");
      }
    } catch (err) {
      showToast("Erreur de lecture du fichier JSON.", "warning");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
}

function copyJsCodeSeed() {
  const code = `const DEFAULT_PRODUCTS = ${JSON.stringify(state.products, null, 2)};`;
  navigator.clipboard.writeText(code).then(() => {
    showToast("Code source copié. Collez-le dans app.js.", "check");
  }).catch(() => {
    showToast("Impossible de copier automatiquement. Consultez la console.", "warning");
    console.log(code);
  });
}

// Calculate Admin Stats
function updateAdminStats() {
  const totalSales = state.orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const totalOrdersCount = state.orders.length;
  const pendingOrdersCount = state.orders.filter(o => o.status === "pending").length;
  const activeProductsCount = state.products.length;

  document.getElementById("stat-total-sales").textContent = `${totalSales.toLocaleString()} DA`;
  document.getElementById("stat-total-orders").textContent = totalOrdersCount;
  document.getElementById("stat-pending-orders").textContent = pendingOrdersCount;
  document.getElementById("stat-active-products").textContent = activeProductsCount;
}

// Toast Notifications Helper
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const iconMap = { info: ICONS.info, check: ICONS.check, warning: ICONS.warning };
  const icon = iconMap[type] || ICONS.info;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Multi-Language UI Translator
function updateLanguageUI() {
  const dict = TRANSLATIONS[state.currentLang] || TRANSLATIONS.FR;

  // RTL direction for Arabic
  if (state.currentLang === "AR") {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", state.currentLang.toLowerCase());
  }

  // Update text elements with data-i18n attributes if present
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}
