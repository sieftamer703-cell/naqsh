"use server";

import { and, eq, ne, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import {
  checkPassword,
  createSession,
  destroySession,
  requireAdmin,
} from "@/lib/auth";

export type FormState = { error?: string } | undefined;

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function refresh() {
  revalidatePath("/", "layout");
}

/* ---------- Auth ---------- */

export async function loginAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const password = str(fd, "password");
  if (!password || !checkPassword(password)) {
    return { error: "كلمة المرور غير صحيحة" };
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

/* ---------- Categories ---------- */

function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "") || "category"
  );
}

async function uniqueSlug(name: string, excludeId?: number) {
  const base = slugify(name);
  let slug = base;
  let i = 1;
  for (;;) {
    const rows = await db
      .select({ id: categories.id })
      .from(categories)
      .where(
        excludeId
          ? and(eq(categories.slug, slug), ne(categories.id, excludeId))
          : eq(categories.slug, slug),
      )
      .limit(1);
    if (rows.length === 0) return slug;
    i += 1;
    slug = `${base}-${i}`;
  }
}

export async function createCategoryAction(fd: FormData) {
  await requireAdmin();
  const name = str(fd, "name");
  if (!name) return;
  await db.insert(categories).values({
    name,
    description: str(fd, "description"),
    slug: await uniqueSlug(name),
  });
  refresh();
}

export async function updateCategoryAction(fd: FormData) {
  await requireAdmin();
  const id = Number(str(fd, "id"));
  const name = str(fd, "name");
  if (!id || !name) return;
  await db
    .update(categories)
    .set({
      name,
      description: str(fd, "description"),
      slug: await uniqueSlug(name, id),
    })
    .where(eq(categories.id, id));
  refresh();
}

export async function deleteCategoryAction(fd: FormData) {
  await requireAdmin();
  const id = Number(str(fd, "id"));
  if (!id) return;
  await db.delete(categories).where(eq(categories.id, id));
  refresh();
}

/* ---------- Products ---------- */

async function generateSku() {
  const [{ n }] = await db.select({ n: sql<number>`count(*)::int` }).from(products);
  let next = n + 1;
  for (;;) {
    const sku = `NQ-${String(next).padStart(4, "0")}`;
    const rows = await db.select({ id: products.id }).from(products).where(eq(products.sku, sku)).limit(1);
    if (rows.length === 0) return sku;
    next += 1;
  }
}

export async function saveProductAction(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();

  const id = Number(str(fd, "id")) || null;
  const name = str(fd, "name");
  if (!name) return { error: "اسم المنتج مطلوب" };

  let sku = str(fd, "sku").replace(/\s+/g, "-").toUpperCase();
  if (!sku) sku = await generateSku();

  const dup = await db
    .select({ id: products.id })
    .from(products)
    .where(id ? and(eq(products.sku, sku), ne(products.id, id)) : eq(products.sku, sku))
    .limit(1);
  if (dup.length > 0) return { error: `كود المنتج ${sku} مستخدم بالفعل، اختر كوداً آخر` };

  let extra: string[] = [];
  try {
    const parsed = JSON.parse(str(fd, "images") || "[]");
    if (Array.isArray(parsed)) extra = parsed.filter((x): x is string => typeof x === "string");
  } catch {
    extra = [];
  }

  const categoryId = Number(str(fd, "categoryId")) || null;
  const values = {
    sku,
    name,
    description: str(fd, "description"),
    details: str(fd, "details"),
    categoryId,
    mainImage: str(fd, "mainImage") || null,
    images: extra,
    featured: fd.get("featured") === "on",
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(products).set(values).where(eq(products.id, id));
  } else {
    await db.insert(products).values(values);
  }
  refresh();
  redirect("/admin/products");
}

export async function deleteProductAction(fd: FormData) {
  await requireAdmin();
  const id = Number(str(fd, "id"));
  if (!id) return;
  await db.delete(products).where(eq(products.id, id));
  refresh();
}

export async function toggleFeaturedAction(fd: FormData) {
  await requireAdmin();
  const id = Number(str(fd, "id"));
  if (!id) return;
  await db
    .update(products)
    .set({ featured: sql`not ${products.featured}` })
    .where(eq(products.id, id));
  refresh();
}
