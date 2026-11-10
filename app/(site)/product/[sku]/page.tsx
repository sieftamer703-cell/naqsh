import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySku, getRelatedProducts } from "@/lib/data";
import { productWhatsAppLink } from "@/lib/config";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import CopyButton from "@/components/CopyButton";
import ShareButton from "@/components/ShareButton";
import { WhatsAppIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

type Params = Promise<{ sku: string }>;

function decode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { sku } = await params;
  const product = await getProductBySku(decode(sku));
  if (!product) return { title: "المنتج غير موجود" };
  return {
    title: product.name,
    description: product.description || `${product.name} — كود المنتج ${product.sku}`,
    openGraph: {
      title: product.name,
      description: product.description || `كود المنتج ${product.sku}`,
      images: product.mainImage ? [product.mainImage] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { sku } = await params;
  const product = await getProductBySku(decode(sku));
  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, product.id, 4);
  const gallery = [product.mainImage, ...product.images].filter(
    (x, i, arr): x is string => !!x && arr.indexOf(x) === i,
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-ink/60">
        <Link href="/" className="hover:text-gold-dark">الرئيسية</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-gold-dark">الكتالوج</Link>
        {product.categoryName && (
          <>
            <span>/</span>
            <Link href={`/catalog?category=${encodeURIComponent(product.categorySlug ?? "")}`} className="hover:text-gold-dark">
              {product.categoryName}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="font-semibold text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={gallery} name={product.name} />

        <div>
          {product.categoryName && (
            <Link
              href={`/catalog?category=${encodeURIComponent(product.categorySlug ?? "")}`}
              className="inline-block rounded-full bg-ink px-4 py-1 text-xs font-bold text-gold-light"
            >
              {product.categoryName}
            </Link>
          )}
          <h1 className="mt-4 font-display text-3xl font-bold leading-snug md:text-4xl">{product.name}</h1>

          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-gold/30 bg-white px-5 py-3">
            <span className="text-sm text-ink/60">كود المنتج</span>
            <span className="font-bold tracking-widest text-gold-dark" dir="ltr">{product.sku}</span>
            <CopyButton text={product.sku} label="نسخ الكود" className="mr-auto inline-flex items-center gap-2 rounded-full border border-gold/50 px-3 py-1.5 text-xs font-bold transition hover:bg-gold/10" />
          </div>

          {product.description && (
            <p className="mt-6 text-lg leading-8 text-ink/80">{product.description}</p>
          )}
          {product.details && (
            <div className="mt-5 whitespace-pre-line border-t border-gold/20 pt-5 leading-8 text-ink/70">
              {product.details}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={productWhatsAppLink(product.name, product.sku)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa"
            >
              <WhatsAppIcon /> اطلب المنتج عبر واتساب
            </a>
            <ShareButton title={product.name} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="section-title">منتجات قد تعجبك</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
