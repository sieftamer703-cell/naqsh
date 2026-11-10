import Link from "next/link";
import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "../actions";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

export const metadata = { title: "لوحة التحكم", robots: { index: false, follow: false } };

export default async function PanelLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-sand/40">
      <header className="border-b border-gold/30 bg-ink text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-3">
          <Logo light />
          <nav className="flex flex-wrap items-center gap-1 text-sm font-semibold">
            <Link href="/admin" className="rounded-full px-4 py-2 hover:bg-white/10">الرئيسية</Link>
            <Link href="/admin/products" className="rounded-full px-4 py-2 hover:bg-white/10">المنتجات</Link>
            <Link href="/admin/categories" className="rounded-full px-4 py-2 hover:bg-white/10">التصنيفات</Link>
            <Link href="/" target="_blank" className="rounded-full px-4 py-2 text-gold-light hover:bg-white/10">عرض الموقع ↗</Link>
            <form action={logoutAction}>
              <button className="cursor-pointer rounded-full px-4 py-2 text-red-300 hover:bg-white/10">خروج</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
