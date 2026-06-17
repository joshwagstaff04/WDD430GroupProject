'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, saveProduct, CATEGORIES } from '@/lib/products';
import styles from './ProductForm.module.css';

type Props = {
  initialData?: Product;
};

export default function ProductForm({ initialData }: Props) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [form, setForm] = useState({
    name: initialData?.name ?? '',
    description: initialData?.description ?? '',
    price: initialData?.price?.toString() ?? '',
    category: initialData?.category ?? '',
    imageUrl: initialData?.imageUrl ?? '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Product name is required.';
    if (!form.description.trim()) e.description = 'Description is required.';
    const priceNum = Number(form.price);
    if (!form.price || isNaN(priceNum) || priceNum <= 0) {
      e.price = 'Enter a valid price greater than $0.';
    }
    if (!form.category) e.category = 'Select a category.';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const product: Product = {
      id: initialData?.id ?? crypto.randomUUID(),
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(parseFloat(form.price).toFixed(2)),
      category: form.category,
      imageUrl: form.imageUrl.trim(),
      sellerId: initialData?.sellerId ?? '1',
      sellerName: initialData?.sellerName ?? 'Sarah Miller',
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
    };

    saveProduct(product);
    router.push('/sell');
  }

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">Product Name <span className={styles.required}>*</span></label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g. Hand-Thrown Ceramic Mug"
          className={errors.name ? styles.inputError : ''}
        />
        {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Description <span className={styles.required}>*</span></label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe your product — materials, dimensions, care instructions..."
          rows={5}
          className={errors.description ? styles.inputError : ''}
        />
        {errors.description && <p className={styles.errorMsg}>{errors.description}</p>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="price">Price (USD) <span className={styles.required}>*</span></label>
          <div className={styles.priceWrap}>
            <span className={styles.currencySymbol}>$</span>
            <input
              id="price"
              type="number"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="0.00"
              className={errors.price ? styles.inputError : ''}
            />
          </div>
          {errors.price && <p className={styles.errorMsg}>{errors.price}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="category">Category <span className={styles.required}>*</span></label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className={errors.category ? styles.inputError : ''}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className={styles.errorMsg}>{errors.category}</p>}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="imageUrl">
          Image URL <span className={styles.optional}>(optional)</span>
        </label>
        <input
          id="imageUrl"
          type="url"
          value={form.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => router.push('/sell')}
          className={styles.btnCancel}
        >
          Cancel
        </button>
        <button type="submit" className={styles.btnSubmit}>
          {isEditing ? 'Save Changes' : 'Add Listing'}
        </button>
      </div>
    </form>
  );
}
