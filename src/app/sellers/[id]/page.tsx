import Link from "next/link";
import styles from "./page.module.css";

// placeholder data until we hook up a database
const seller = {
  id: 1,
  name: "Sarah Miller",
  bio: "I've been making pottery out of my home studio in Portland for about 6 years. I love working with earthenware and creating pieces that feel natural and functional.",
  location: "Portland, OR",
  memberSince: "2023",
  products: [
    { id: 1, name: "Hand-Thrown Ceramic Mug", price: 28, category: "Pottery" },
    { id: 2, name: "Small Serving Bowl", price: 35, category: "Pottery" },
    { id: 3, name: "Speckled Vase", price: 52, category: "Pottery" },
  ],
};

export default function SellerProfile() {
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
        <div className={styles.profileSection}>
          <div className={styles.avatar}>
            {seller.name.charAt(0)}
          </div>
          <div className={styles.profileInfo}>
            <h1>{seller.name}</h1>
            <p className={styles.location}>{seller.location}</p>
            <p className={styles.memberSince}>Member since {seller.memberSince}</p>
            <p className={styles.bio}>{seller.bio}</p>
          </div>
        </div>

        <section className={styles.listings}>
          <h2>{seller.name}&apos;s Products</h2>
          <div className={styles.productGrid}>
            {seller.products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <span className={styles.category}>{product.category}</span>
                </div>
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <p className={styles.price}>${product.price}</p>
                </div>
              </Link>
            ))}
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
