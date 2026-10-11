-- ==============================================================================
-- EAZYSTORE - Supabase SQL Schema & Policies
-- Run this script once in your Supabase SQL Editor (https://app.supabase.com)
-- ==============================================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  old_price NUMERIC,
  rating NUMERIC DEFAULT 5.0,
  reviews INTEGER DEFAULT 45,
  image TEXT NOT NULL,
  badge TEXT,
  stock TEXT DEFAULT 'in_stock',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ORDERS TABLE (Cash On Delivery Orders)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  wilaya TEXT NOT NULL,
  address TEXT NOT NULL,
  product_title TEXT NOT NULL,
  qty INTEGER NOT NULL DEFAULT 1,
  total_price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, shipped, delivered
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. STORE SETTINGS TABLE (Admin PIN, etc.)
CREATE TABLE IF NOT EXISTS public.store_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initial default admin PIN
INSERT INTO public.store_settings (key, value)
VALUES ('admin_pin', 'admin1234')
ON CONFLICT (key) DO NOTHING;

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Products: Everyone can read products
CREATE POLICY "Public read products" 
ON public.products FOR SELECT 
USING (true);

-- Products: Allow insert/update/delete for store management
CREATE POLICY "Public manage products" 
ON public.products FOR ALL 
USING (true) 
WITH CHECK (true);

-- Orders: Any visitor can create a COD order
CREATE POLICY "Public insert orders" 
ON public.orders FOR INSERT 
WITH CHECK (true);

-- Orders: Store admin can view all orders
CREATE POLICY "Public read orders" 
ON public.orders FOR SELECT 
USING (true);

-- Orders: Store admin can update order status or delete
CREATE POLICY "Public update orders" 
ON public.orders FOR UPDATE 
USING (true);

CREATE POLICY "Public delete orders" 
ON public.orders FOR DELETE 
USING (true);

-- Store Settings: Read & update
CREATE POLICY "Public read settings" 
ON public.store_settings FOR SELECT 
USING (true);

CREATE POLICY "Public update settings" 
ON public.store_settings FOR ALL 
USING (true) 
WITH CHECK (true);

-- 5. INITIAL SEED PRODUCTS
INSERT INTO public.products (id, title, category, price, old_price, rating, reviews, image, badge, stock, description)
VALUES 
  (1, 'Casque Bluetooth Wireless ANC', 'tech', 6800, 9500, 4.9, 128, 'assets/images/headphone.jpg', 'Viral sur TikTok', 'in_stock', 'Casque à réduction de bruit active premium, autonomie 40h. Son HD pur.'),
  (2, 'Montre Connectée OLED Titanium', 'tech', 8900, 12000, 4.8, 94, 'assets/images/smartwatch.jpg', 'Best Seller', 'in_stock', 'Écran OLED HD, suivi cardiaque, étanche IP68, compatible iOS & Android.'),
  (3, 'Sérum Éclat Visage Luxe 50ml', 'beauty', 3400, 4800, 5.0, 210, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80', 'Tendances IG', 'in_stock', 'Hydratation profonde et anti-âge naturel aux huiles essentielles rares.'),
  (4, 'Lunettes de Soleil Vintage Polarized', 'fashion', 2900, 4200, 4.7, 65, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80', 'Tendance Eté', 'in_stock', 'Protection UV400 maximale, monture alliage ultra-légère et robuste.'),
  (5, 'Mini Projecteur Smart 4K Home', 'home', 14500, 19900, 4.9, 142, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80', 'Cinéma Maison', 'in_stock', 'Transformez n''importe quel mur en écran 120 pouces Cinema Android intégré.'),
  (6, 'Enceinte Portable Bass Boost RGB', 'tech', 4200, 5800, 4.8, 87, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80', 'Strong Bass', 'in_stock', 'Son 360° immersif avec jeux de lumières RGB synchronisés.')
ON CONFLICT (id) DO NOTHING;
