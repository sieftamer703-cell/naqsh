import { asc } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema";
import ProductForm from "@/components/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProduct() {
  const cats = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .orderBy(asc(categories.createdAt));
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-bold">إضافة منتج جديد</h1>
      <ProductForm categories={cats} />
    </div>
  );
}
