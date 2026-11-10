import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import ProductForm from "@/components/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pid = Number(id);
  if (!Number.isInteger(pid)) notFound();

  const [rows, cats] = await Promise.all([
    db.select().from(products).where(eq(products.id, pid)).limit(1),
    db
      .select({ id: categories.id, name: categories.name })
      .from(categories)
      .orderBy(asc(categories.createdAt)),
  ]);
  const p = rows[0];
  if (!p) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-bold">تعديل المنتج</h1>
      <ProductForm categories={cats} initial={p} />
    </div>
  );
}
