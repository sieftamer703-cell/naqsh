import { getCategoriesWithCounts } from "@/lib/data";
import ConfirmButton from "@/components/ConfirmButton";
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "../../actions";

export const dynamic = "force-dynamic";

export default async function CategoriesAdmin() {
  const cats = await getCategoriesWithCounts();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">التصنيفات</h1>

      <form action={createCategoryAction} className="mt-6 grid gap-3 rounded-2xl border border-gold/30 bg-white p-5 md:grid-cols-[1fr_2fr_auto]">
        <input name="name" required placeholder="اسم التصنيف" className="field" />
        <input name="description" placeholder="وصف مختصر (اختياري)" className="field" />
        <button className="btn btn-gold">+ إضافة تصنيف</button>
      </form>

      <div className="mt-6 space-y-3">
        {cats.length === 0 && (
          <p className="rounded-2xl border border-dashed border-gold/50 bg-white/60 p-8 text-center text-ink/60">
            لا توجد تصنيفات بعد. أضف أول تصنيف من النموذج أعلاه.
          </p>
        )}
        {cats.map((c) => (
          <div key={c.id} className="rounded-2xl border border-gold/20 bg-white p-4">
            <form action={updateCategoryAction} className="grid items-center gap-3 md:grid-cols-[1fr_2fr_auto_auto]">
              <input type="hidden" name="id" value={c.id} />
              <input name="name" defaultValue={c.name} required className="field" />
              <input name="description" defaultValue={c.description} placeholder="الوصف" className="field" />
              <span className="whitespace-nowrap rounded-full bg-sand px-3 py-1 text-center text-xs font-bold text-gold-dark">
                {c.count} منتج
              </span>
              <button className="btn btn-dark !py-2">حفظ</button>
            </form>
            <form action={deleteCategoryAction} className="mt-2 text-left">
              <input type="hidden" name="id" value={c.id} />
              <ConfirmButton
                message={`حذف تصنيف «${c.name}»؟ لن يتم حذف المنتجات المرتبطة به.`}
                className="cursor-pointer text-xs font-bold text-red-600 hover:underline"
              >
                حذف التصنيف
              </ConfirmButton>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
