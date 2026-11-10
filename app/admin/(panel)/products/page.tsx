import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import ConfirmButton from "@/components/ConfirmButton";
import { deleteProductAction, toggleFeaturedAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function ProductsAdmin() {
  const rows = await db
    .select({
      id: products.id,
      sku: products.sku,
      name: products.name,
      mainImage: products.mainImage,
      featured: products.featured,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(desc(products.createdAt));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold">المنتجات ({rows.length})</h1>
        <Link href="/admin/products/new" className="btn btn-gold">+ إضافة منتج</Link>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-gold/50 bg-white/60 p-10 text-center text-ink/60">
          لا توجد منتجات بعد. ابدأ بإضافة أول منتج.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-gold/20 bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-sand/60 text-right">
              <tr>
                <th className="p-3">الصورة</th>
                <th className="p-3">الاسم</th>
                <th className="p-3">الكود</th>
                <th className="p-3">التصنيف</th>
                <th className="p-3">مميز</th>
                <th className="p-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-sand">
                  <td className="p-3">
                    {r.mainImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.mainImage} alt="" className="h-14 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="h-14 w-12 rounded-lg bg-sand" />
                    )}
                  </td>
                  <td className="p-3 font-semibold">{r.name}</td>
                  <td className="p-3 font-bold tracking-wider text-gold-dark" dir="ltr">{r.sku}</td>
                  <td className="p-3">{r.categoryName ?? "—"}</td>
                  <td className="p-3">
                    <form action={toggleFeaturedAction}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        className={`cursor-pointer rounded-full px-3 py-1 text-xs font-bold ${r.featured ? "bg-gold text-ink" : "bg-sand text-ink/60"}`}
                      >
                        {r.featured ? "★ مميز" : "☆ عادي"}
                      </button>
                    </form>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/products/${r.id}`} className="font-bold text-gold-dark hover:underline">تعديل</Link>
                      <Link href={`/product/${encodeURIComponent(r.sku)}`} target="_blank" className="text-ink/60 hover:underline">عرض</Link>
                      <form action={deleteProductAction}>
                        <input type="hidden" name="id" value={r.id} />
                        <ConfirmButton message={`حذف المنتج «${r.name}» نهائياً؟`} className="cursor-pointer font-bold text-red-600 hover:underline">
                          حذف
                        </ConfirmButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
