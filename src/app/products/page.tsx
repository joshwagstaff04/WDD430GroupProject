"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const allProducts = [
  { id: 1, name: "Hand-Thrown Ceramic Mug", seller: "Sarah Miller", price: 28, category: "Pottery" },
  { id: 2, name: "Woven Wool Blanket", seller: "Hearth Textiles", price: 96, category: "Textiles" },
  { id: 3, name: "Oak Cutting Board", seller: "Grainwork Studio", price: 45, category: "Woodwork" },
  { id: 4, name: "Beeswax Candle Set", seller: "Meadow Light", price: 22, category: "Home" },
  { id: 5, name: "Speckled Vase", seller: "Sarah Miller", price: 52, category: "Pottery" },
  { id: 6, name: "Macrame Wall Hanging", seller: "Knotted Co.", price: 38, category: "Textiles" },
  { id: 7, name: "Silver Leaf Earrings", seller: "Studio Forge", price: 34, category: "Jewelry" },
  { id: 8, name: "Watercolor Print", seller: "Blue Heron Art", price: 20, category: "Art" },
];

const categories = ["All", "Pottery", "Textiles", "Woodwork", "Home", "Jewelry", "Art"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  const filtered = allProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesPrice = maxPrice === "" || p.price <= parseInt(maxPrice);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>Handcrafted Haven</Link>
          <nav className={styles.nav}>
            <Link href="/products">Browse</Link>
            <Link href="/sellers">Sellers</Link>
            <Link href="/login" className={styles.loginBtn}>Sign In</Link>
          </nav>
        </div>
      </header>

      <main className={styles.container}>
        <h1 className={styles.pageTitle}>Browse Products</h1>

        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.select}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={styles.priceInput}
          />
        </div>

        {filtered.length === 0 ? (
          <p className={styles.noResults}>No products found.</p>
        ) : (
          <div className={styles.productGrid}>
            {filtered.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <span className={styles.category}>{product.category}</span>
                </div>
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <p className={styles.sellerName}>by {product.seller}</p>
                  <p className={styles.price}>${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>Handcrafted Haven &mdash; Supporting local artisans</p>
        </div>
      </footer>
    </div>
  );
}
