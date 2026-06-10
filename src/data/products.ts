// using fake data for now until we get the database set up, swap this out later

export type Product = {
  id: number;
  name: string;
  seller: string;
  price: number;
  category: string;
  description: string;
};

export const products: Product[] = [
  { id: 1, name: "Hand-Thrown Ceramic Mug", seller: "Sarah Miller", price: 28, category: "Pottery", description: "A cozy handmade mug perfect for your morning coffee or tea. Each piece is unique with slight variations in glaze and shape that make it one of a kind. Made with earthenware clay and fired at high temperature for durability." },
  { id: 2, name: "Woven Wool Blanket", seller: "Hearth Textiles", price: 96, category: "Textiles", description: "A warm woven wool blanket handmade with natural fibers." },
  { id: 3, name: "Oak Cutting Board", seller: "Grainwork Studio", price: 45, category: "Woodwork", description: "Reclaimed oak cutting board, sanded and oiled by hand." },
  { id: 4, name: "Beeswax Candle Set", seller: "Meadow Light", price: 22, category: "Home", description: "Set of three beeswax candles with a natural honey scent." },
  { id: 5, name: "Speckled Vase", seller: "Sarah Miller", price: 52, category: "Pottery", description: "Earthy toned vase great for dried flowers." },
  { id: 6, name: "Macrame Wall Hanging", seller: "Knotted Co.", price: 38, category: "Textiles", description: "Handknotted macrame wall hanging made with cotton rope." },
  { id: 7, name: "Silver Leaf Earrings", seller: "Studio Forge", price: 34, category: "Jewelry", description: "Lightweight silver earrings shaped like leaves, handmade." },
  { id: 8, name: "Watercolor Print", seller: "Blue Heron Art", price: 20, category: "Art", description: "Original watercolor print on archival paper." },
];
