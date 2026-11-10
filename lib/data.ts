import { and, asc, count, desc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { categories, products } from "@/db/schema";

export type ProductWithCategory = {
  id: number;
  sku: string;
  name: string;
  description: string;
  details: string;
  mainImage: string | null;
  images: string[];
  featured: boolean;
  categoryId: number | null;
  categoryName: string | null;
  categorySlug: string | null;
  createdAt: Date;
};

const productFields = {
  id: products.id,
  sku: products.sku,
  name: products.name,
  description: products.description,
  details: products.details,
  mainImage: products.mainImage,
  images: products.images,
  featured: products.featured,
  categoryId: products.categoryId,
  categoryName: categories.name,
  categorySlug: categories.slug,
  createdAt: products.createdAt,
};

export async function getCategoriesWithCounts() {
  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      count: count(products.id),
    })
    .from(categories)
    .leftJoin(products, eq(products.categoryId, categories.id))
    .groupBy(categories.id)
    .orderBy(asc(categories.createdAt));
}

export type SortKey = "newest" | "oldest" | "name" | "name-desc" | "sku";

export async function getProducts(opts: {
  q?: string;
  category?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}) {
  const pageSize = opts.pageSize ?? 12;
  const page = Math.max(1, opts.page ?? 1);
  const conditions: SQL[] = [];

  const q = opts.q?.trim();
  if (q) {
    const pattern = `%${q.replace(/[\\%_]/g, (m) => `\\${m}`)}%`;
    const cond = or(ilike(products.name, pattern), ilike(products.sku, pattern));
    if (cond) conditions.push(cond);
  }
  if (opts.category) conditions.push(eq(categories.slug, opts.category));

  const where = conditions.length ? and(...conditions) : undefined;

  const orderBy =
    opts.sort === "oldest"
      ? [asc(products.createdAt)]
      : opts.sort === "name"
        ? [asc(products.name)]
        : opts.sort === "name-desc"
          ? [desc(products.name)]
          : opts.sort === "sku"
            ? [asc(products.sku)]
            : [desc(products.createdAt), desc(products.id)];

  const [items, totalRows] = await Promise.all([
    db
      .select(productFields)
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(where)
      .orderBy(...orderBy)
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    db
      .select({ total: count() })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(where),
  ]);

  return {
    items: items as ProductWithCategory[],
    total: totalRows[0]?.total ?? 0,
    page,
    pageSize,
  };
}

export async function getFeaturedProducts(limit = 8) {
  const featured = await db
    .select(productFields)
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.featured, true))
    .orderBy(desc(products.createdAt))
    .limit(limit);
  if (featured.length > 0) return featured as ProductWithCategory[];
  const latest = await db
    .select(productFields)
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(desc(products.createdAt))
    .limit(limit);
  return latest as ProductWithCategory[];
}

export async function getProductBySku(sku: string) {
  const rows = await db
    .select(productFields)
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(sql`upper(${products.sku}) = upper(${sku})`)
    .limit(1);
  return (rows[0] as ProductWithCategory | undefined) ?? null;
}

export async function getRelatedProducts(
  categoryId: number | null,
  excludeId: number,
  limit = 4,
) {
  const rows = await db
    .select(productFields)
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(
      categoryId
        ? and(eq(products.categoryId, categoryId), sql`${products.id} <> ${excludeId}`)
        : sql`${products.id} <> ${excludeId}`,
    )
    .orderBy(desc(products.createdAt))
    .limit(limit);
  return rows as ProductWithCategory[];
}
