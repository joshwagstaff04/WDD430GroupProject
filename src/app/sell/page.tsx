"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
};

const initialListings: Product[] = [
  { id: 1, name: "Hand-Thrown Ceramic Mug", description: "A cozy handmade mug perfect for your morning coffee.", price: "28", category: "Pottery" },
  { id: 2, name: "Speckled Vase", description: "Earthy toned vase great for dried flowers.", price: "52", category: "Pottery" },
];

export default function SellPage() {
  const [listings, setListings] = useState<Product[]>(initialListings);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({ name: "", description: "", price: "", category: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editingId !== null) {
      setListings(listings.map((l) => l.id === editingId ? { ...form, id: editingId } : l));
      setEditingId(null);
    } else {
      const newProduct = { ...form, id: Date.now() };
      setListings([...listings, newProduct]);
    }

    setForm({ name: "", description: "", price: "", category: "" });
    setShowForm(false);
  }

  function handleEdit(product: Product) {
    setForm({ name: product.name, description: product.description, price: product.price, category: product.category });
    setEditingId(product.id);
    setShowForm(true);
  }

  function handleDelete(id: number) {
    setListings(listings.filter((l) => l.id !== id));
  }

  function handleCancel() {
    setForm({ name: "", description: "", price: "", category: "" });
    setEditingId(null);
    setShowForm(false);
  }

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
        <div className={styles.pageHeader}>
          <h1>My Listings</h1>
          {!showForm && (
            <button className={styles.btnPrimary} onClick={() => setShowForm(true)}>
              + Add New Listing
            </button>
          )}
        </div>

        {showForm && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{editingId ? "Edit Listing" : "New Listing"}</h2>

            <div className={styles.formGroup}>
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Hand-Thrown Ceramic Mug"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                rows={4}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="price">Price ($)</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category">Category</label>
                <select id="category" name="category" value={form.category} onChange={handleChange} required>
                  <option value="">Select a category</option>
                  <option value="Pottery">Pottery</option>
                  <option value="Textiles">Textiles</option>
                  <option value="Woodwork">Woodwork</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Home">Home</option>
                  <option value="Art">Art</option>
                </select>
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary}>
                {editingId ? "Save Changes" : "Add Listing"}
              </button>
              <button type="button" className={styles.btnOutline} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className={styles.listingsList}>
          {listings.length === 0 && (
            <p className={styles.empty}>No listings yet. Add your first product above.</p>
          )}
          {listings.map((product) => (
            <div key={product.id} className={styles.listingCard}>
              <div className={styles.listingImage} />
              <div className={styles.listingInfo}>
                <h3>{product.name}</h3>
                <p className={styles.listingCategory}>{product.category}</p>
                <p className={styles.listingDesc}>{product.description}</p>
                <p className={styles.listingPrice}>${product.price}</p>
              </div>
              <div className={styles.listingActions}>
                <button className={styles.btnOutline} onClick={() => handleEdit(product)}>Edit</button>
                <button className={styles.btnDelete} onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>Handcrafted Haven &mdash; Supporting local artisans</p>
        </div>
      </footer>
    </div>
  );
}
