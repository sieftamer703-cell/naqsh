import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="font-display text-7xl font-bold text-gold">٤٠٤</p>
      <h1 className="mt-4 font-display text-2xl font-bold">الصفحة أو المنتج غير موجود</h1>
      <p className="mt-2 text-ink/60">ربما تم نقل المنتج أو تغيير الرابط.</p>
      <Link href="/catalog" className="btn btn-dark mt-6">العودة إلى الكتالوج</Link>
    </section>
  );
}
