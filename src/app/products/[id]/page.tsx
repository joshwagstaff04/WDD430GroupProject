"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// placeholder data - will be replaced when database is set up
const product = {
  id: 1,
  name: "Hand-Thrown Ceramic Mug",
  description: "A cozy handmade mug perfect for your morning coffee or tea. Each piece is unique with slight variations in glaze and shape that make it one of a kind. Made with earthenware clay and fired at high temperature for durability.",
  price: 28,
  category: "Pottery",
  seller: { id: 1, name: "Sarah Miller" },
  reviews: [
    { id: 1, user: "Emily R.", rating: 5, comment: "Absolutely love this mug. The quality is amazing and it feels so sturdy." },
    { id: 2, user: "James T.", rating: 4, comment: "Really nice piece, arrived well packaged. Slightly smaller than I expected but still great." },
  ],
};

export default function ProductDetailPage() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(product.reviews);

  function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;
    const newReview = { id: Date.now(), user: "You", rating, comment };
    setReviews([...reviews, newReview]);
    setRating(0);
    setComment("");
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
        <Link href="/products" className={styles.backLink}>&larr; Back to products</Link>

        <div className={styles.productLayout}>
          <div className={styles.productImage} />

          <div className={styles.productDetails}>
            <span className={styles.category}>{product.category}</span>
            <h1>{product.name}</h1>
            <p className={styles.price}>${product.price}</p>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.sellerLink}>
              Sold by{" "}
              <Link href={`/sellers/${product.seller.id}`}>{product.seller.name}</Link>
            </p>
            <button className={styles.btnPrimary}>Add to Cart</button>
          </div>
        </div>

        <section className={styles.reviewsSection}>
          <h2>Reviews ({reviews.length})</h2>

          <div className={styles.reviewsList}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewUser}>{review.user}</span>
                  <span className={styles.reviewRating}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>

          <div className={styles.reviewForm}>
            <h3>Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className={styles.ratingPicker}>
                <label>Rating</label>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={star <= rating ? styles.starActive : styles.star}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className={styles.textarea}
                required
              />
              <button type="submit" className={styles.btnPrimary}>Submit Review</button>
            </form>
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
