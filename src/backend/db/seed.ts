import { v4 as uuidv4 } from "uuid";
import { db } from "./db.config";
import { Product } from "./schema";

async function seedProducts() {
  const products = [
    {
      id: uuidv4(),
      name: "Bed",
      description: "Comfortable king size bed with solid wood frame.",
      price: "19999.99",
      quantity: 10,
      threeDImage: "/models/01_bed.glb",
      status: "active" as const,
      categoryId: 1,
    },
    {
      id: uuidv4(),
      name: "Chair",
      description: "A very comfortable chair.",
      price: "4999.99",
      quantity: 25,
      threeDImage: "/models/01_chair.glb",
      status: "active" as const,
      categoryId: 2,
    },
    {
      id: uuidv4(),
      name: "Couch",
      description: "3-seater fabric couch with removable cushions.",
      price: "12999.99",
      quantity: 7,
      threeDImage: "/models/01_couch.glb",
      status: "active" as const,
      categoryId: 3,
    },
    {
      id: uuidv4(),
      name: "Dining Table",
      description: "6-person dining table made from acacia wood.",
      price: "14999.00",
      quantity: 5,
      threeDImage: "/models/01_diningtable.glb",
      status: "active" as const,
      categoryId: 4,
    },
    {
      id: uuidv4(),
      name: "Small Chair",
      description: "Compact kids chair made from durable plastic.",
      price: "999.50",
      quantity: 20,
      threeDImage: "/models/01_sChair.glb",
      status: "active" as const,
      categoryId: 2,
    },
    {
      id: uuidv4(),
      name: "Sofa",
      description: "Luxury velvet sofa with reclining features.",
      price: "21999.00",
      quantity: 6,
      threeDImage: "/models/01_sofa.glb",
      status: "active" as const,
      categoryId: 3,
    },
    {
      id: uuidv4(),
      name: "Table",
      description: "Multi-purpose table ideal for study or dining.",
      price: "5999.00",
      quantity: 12,
      threeDImage: "/models/01_table.glb",
      status: "active" as const,
      categoryId: 4,
    },
  ];

  try {
    await db.insert(Product).values(products);
    console.log("Seeded products successfully.");
  } catch (err) {
    console.error("Failed to seed products:", err);
  }
}

seedProducts();
