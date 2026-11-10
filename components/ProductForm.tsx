"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { saveProductAction } from "@/app/admin/actions";
import ImageUploader from "./ImageUploader";

type Initial = {
  id?: number;
  sku?: string;
  name?: string;
  description?: string;
  details?: string;
  categoryId?: number | null;
  mainImage?: string | null;
  images?: string[];
  featured?: boolean;
};

export default function ProductForm({
  initial = {},
  categories,
}: {
  initial?: Initial;
  categories: { id: number; name: string }[];
}) {
  const [state, action, pending] = useActionState(saveProductAction, undefined);
  const [main, setMain] = useState<string[]>(initial.mainImage ? [initial.mainImage] : []);
  const [extra, setExtra] = useState<string[]>(initial.images ?? []);

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-gold/30 bg-white p-6">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <input type="hidden" name="mainImage" value={main[0] ?? ""} />
      <input type="hidden" name="images" value={JSON.stringify(extra)} />

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold">اسم المنتج *</label>
          <input name="name" required defaultValue={initial.name} className="field" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">
            كود المنتج (SKU) <span className="font-normal text-ink/50">— اتركه فارغاً للتوليد التلقائي</span>
          </label>
          <input name="sku" defaultValue={initial.sku} placeholder="NQ-0001" className="field" dir="ltr" />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">التصنيف</label>
        <select name="categoryId" defaultValue={initial.categoryId ?? ""} className="field">
          <option value="">بدون تصنيف</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">وصف مختصر</label>
        <textarea name="description" rows={2} defaultValue={initial.description} className="field" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold">تفاصيل إضافية (المقاسات، الخامة...)</label>
        <textarea name="details" rows={4} defaultValue={initial.details} className="field" />
      </div>

      <ImageUploader label="الصورة الرئيسية" value={main} onChange={setMain} />
      <ImageUploader label="صور إضافية" value={extra} onChange={setExtra} multiple />

      <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
        <input type="checkbox" name="featured" defaultChecked={initial.featured} className="h-4 w-4 accent-[#b8893b]" />
        عرض ضمن المنتجات المميزة في الصفحة الرئيسية
      </label>

      {state?.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{state.error}</p>
      )}

      <div className="flex gap-3">
        <button disabled={pending} className="btn btn-gold">
          {pending ? "جارٍ الحفظ..." : "حفظ المنتج"}
        </button>
        <Link href="/admin/products" className="btn btn-outline">إلغاء</Link>
      </div>
    </form>
  );
}
