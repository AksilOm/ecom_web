/**
 * EAZYSTORE - Database Abstraction Layer (Cloud Database Ready)
 * 
 * Operational Modes:
 * 1. LOCAL / OFFLINE (Default): Uses localStorage. Zero setup, works instantly.
 * 2. SUPABASE CLOUD (Production): Fully connected real-time cloud database.
 *    Orders placed by any customer on any device are instantly synced to your Admin panel!
 * 
 * TO GO LIVE:
 * 1. Create a free account & project at https://supabase.com
 * 2. Run the SQL from `schema.sql` in your Supabase SQL Editor.
 * 3. Paste your project URL and public anon key below:
 */

const SUPABASE_CONFIG = {
  url: "",      // e.g. "https://abcdefghijklm.supabase.co"
  anonKey: ""   // e.g. "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};

// Internal Supabase client instance (if configured)
let supabaseClient = null;
if (typeof supabase !== "undefined" && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
  try {
    supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.info("⚡ EAZYSTORE: Connected to Supabase Cloud Database!");
  } catch (err) {
    console.warn("⚠️ Failed to initialize Supabase client, falling back to LocalStorage:", err);
    supabaseClient = null;
  }
}

const DB = {
  /** Check if cloud DB is active */
  isCloud() {
    return !!supabaseClient;
  },

  // ==========================================
  // PRODUCTS
  // ==========================================
  async getProducts(defaultProducts = []) {
    if (this.isCloud()) {
      try {
        const { data, error } = await supabaseClient
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          // Normalize column naming if needed
          return data.map(p => ({
            id: p.id,
            title: p.title,
            category: p.category,
            price: Number(p.price),
            oldPrice: p.old_price ? Number(p.old_price) : null,
            rating: Number(p.rating || 5.0),
            reviews: Number(p.reviews || 45),
            image: p.image,
            badge: p.badge || "",
            stock: p.stock || "in_stock",
            description: p.description || ""
          }));
        }
      } catch (err) {
        console.warn("Could not fetch products from Supabase, falling back to local:", err);
      }
    }

    // LocalStorage fallback
    const local = localStorage.getItem("eazy_products");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {}
    }
    // First run seed
    localStorage.setItem("eazy_products", JSON.stringify(defaultProducts));
    return defaultProducts;
  },

  async saveProduct(product) {
    if (this.isCloud()) {
      try {
        const payload = {
          id: product.id,
          title: product.title,
          category: product.category,
          price: product.price,
          old_price: product.oldPrice || null,
          rating: product.rating || 5.0,
          reviews: product.reviews || 50,
          image: product.image,
          badge: product.badge || "",
          stock: product.stock || "in_stock",
          description: product.description || ""
        };

        const { data, error } = await supabaseClient
          .from("products")
          .upsert(payload)
          .select();

        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase saveProduct error:", err);
        throw err;
      }
    }

    // LocalStorage fallback
    const products = await this.getProducts();
    const idx = products.findIndex(p => p.id === product.id);
    if (idx >= 0) {
      products[idx] = product;
    } else {
      products.unshift(product);
    }
    localStorage.setItem("eazy_products", JSON.stringify(products));
    return product;
  },

  async deleteProduct(productId) {
    if (this.isCloud()) {
      try {
        const { error } = await supabaseClient
          .from("products")
          .delete()
          .eq("id", productId);
        if (error) throw error;
        return true;
      } catch (err) {
        console.error("Supabase deleteProduct error:", err);
        throw err;
      }
    }

    // LocalStorage fallback
    let products = await this.getProducts();
    products = products.filter(p => p.id !== productId);
    localStorage.setItem("eazy_products", JSON.stringify(products));
    return true;
  },

  // ==========================================
  // ORDERS (Customer COD Orders)
  // ==========================================
  async getOrders(defaultOrders = []) {
    if (this.isCloud()) {
      try {
        const { data, error } = await supabaseClient
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) {
          return data.map(o => ({
            id: o.order_code || o.id,
            customerName: o.customer_name,
            phone: o.phone,
            wilaya: o.wilaya,
            address: o.address,
            productTitle: o.product_title,
            qty: Number(o.qty || 1),
            totalPrice: Number(o.total_price),
            status: o.status || "pending",
            date: o.created_at ? new Date(o.created_at).toISOString().replace("T", " ").slice(0, 16) : o.date
          }));
        }
      } catch (err) {
        console.warn("Could not fetch orders from Supabase, falling back to local:", err);
      }
    }

    // LocalStorage fallback
    const local = localStorage.getItem("eazy_orders");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {}
    }
    localStorage.setItem("eazy_orders", JSON.stringify(defaultOrders));
    return defaultOrders;
  },

  async createOrder(order) {
    if (this.isCloud()) {
      try {
        const payload = {
          order_code: order.id,
          customer_name: order.customerName,
          phone: order.phone,
          wilaya: order.wilaya,
          address: order.address,
          product_title: order.productTitle,
          qty: order.qty,
          total_price: order.totalPrice,
          status: order.status || "pending"
        };

        const { data, error } = await supabaseClient
          .from("orders")
          .insert([payload])
          .select();

        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase createOrder error:", err);
        // Fall back to local storage if network fails
      }
    }

    // LocalStorage fallback
    const orders = await this.getOrders();
    orders.unshift(order);
    localStorage.setItem("eazy_orders", JSON.stringify(orders));
    return order;
  },

  async updateOrderStatus(orderId, newStatus) {
    if (this.isCloud()) {
      try {
        const { error } = await supabaseClient
          .from("orders")
          .update({ status: newStatus })
          .eq("order_code", orderId);
        if (error) throw error;
      } catch (err) {
        console.error("Supabase updateOrderStatus error:", err);
      }
    }

    // LocalStorage fallback / sync
    const orders = await this.getOrders();
    const target = orders.find(o => o.id === orderId);
    if (target) {
      target.status = newStatus;
      localStorage.setItem("eazy_orders", JSON.stringify(orders));
    }
    return true;
  },

  async deleteOrder(orderId) {
    if (this.isCloud()) {
      try {
        const { error } = await supabaseClient
          .from("orders")
          .delete()
          .eq("order_code", orderId);
        if (error) throw error;
      } catch (err) {
        console.error("Supabase deleteOrder error:", err);
      }
    }

    // LocalStorage fallback / sync
    let orders = await this.getOrders();
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem("eazy_orders", JSON.stringify(orders));
    return true;
  },

  // ==========================================
  // ADMIN AUTHENTICATION
  // ==========================================
  async getAdminPin(defaultPin = "admin1234") {
    if (this.isCloud()) {
      try {
        const { data, error } = await supabaseClient
          .from("store_settings")
          .select("value")
          .eq("key", "admin_pin")
          .single();

        if (!error && data?.value) {
          return data.value;
        }
      } catch (err) {
        // Fall back to local
      }
    }

    return localStorage.getItem("eazy_admin_pin") || defaultPin;
  },

  async setAdminPin(newPin) {
    if (this.isCloud()) {
      try {
        await supabaseClient
          .from("store_settings")
          .upsert({ key: "admin_pin", value: newPin });
      } catch (err) {
        console.error("Supabase setAdminPin error:", err);
      }
    }

    localStorage.setItem("eazy_admin_pin", newPin);
    return true;
  }
};
