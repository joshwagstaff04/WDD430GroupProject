import Link from "next/link";
import styles from "./page.module.css";

const featuredProducts = [
  { id: 1, name: "Hand-Thrown Ceramic Mug", seller: "Clay & Co.", price: 28, category: "Pottery" },
  { id: 2, name: "Woven Wool Blanket", seller: "Hearth Textiles", price: 96, category: "Textiles" },
  { id: 3, name: "Oak Cutting Board", seller: "Grainwork Studio", price: 45, category: "Woodwork" },
  { id: 4, name: "Beeswax Candle Set", seller: "Meadow Light", price: 22, category: "Home" },
];

export default function Home() {
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

      <main>
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1>Discover unique handcrafted goods</h1>
            <p>Support local artisans and find one-of-a-kind handmade items.</p>
            <div className={styles.heroButtons}>
              <Link href="/products" className={styles.btnPrimary}>Browse Products</Link>
              <Link href="/sell" className={styles.btnOutline}>Start Selling</Link>
            </div>
          </div>
        </section>

        <section className={styles.featured}>
          <div className={styles.container}>
            <h2>Featured Items</h2>
            <div className={styles.productGrid}>
              {featuredProducts.map((product) => (
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
          </div>
        </section>

        <section className={styles.sellerCta}>
          <div className={styles.container}>
            <h2>Are you a maker?</h2>
            <p>Create a profile and start selling your handcrafted items today.</p>
            <Link href="/sell" className={styles.btnPrimary}>Open Your Shop</Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>Handcrafted Haven &mdash; Supporting local artisans</p>
        </div>
      </footer>
    </div>
  );
}
