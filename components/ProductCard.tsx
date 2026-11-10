import Link from "next/link";
import type { ProductWithCategory } from "@/lib/data";
import { productWhatsAppLink } from "@/lib/config";
import CopyButton from "./CopyButton";
import { Ornament, WhatsAppIcon } from "./Icons";

export default function ProductCard({ product }: { product: ProductWithCategory }) {
  const href = `/product/${encodeURIComponent(product.sku)}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(138,100,32,0.45)]">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-sand">
        {product.mainImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.mainImage}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="pattern-gold grid h-full w-full place-items-center opacity-70">
            <Ornament className="h-16 w-16 text-gold" />
          </div>
        )}
        {product.categoryName && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-gold-light backdrop-blur">
            {product.categoryName}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={href}>
          <h3 className="font-display text-lg font-bold leading-snug transition group-hover:text-gold-dark">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs font-bold tracking-widest text-gold-dark" dir="ltr" style={{ textAlign: "right" }}>
          SKU: {product.sku}
        </p>
        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/70">{product.description}</p>
        )}

        <div className="mt-auto grid gap-2 pt-4">
          <a
            href={productWhatsAppLink(product.name, product.sku)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa !py-2.5"
          >
            <WhatsAppIcon /> اطلب عبر واتساب
          </a>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Link href={href} className="btn btn-outline !py-2 text-xs">
              عرض التفاصيل
            </Link>
            <CopyButton text={product.sku} iconOnly label="نسخ كود المنتج" className="grid h-full w-11 place-items-center rounded-full border border-gold/50 transition hover:bg-gold/10" />
          </div>
        </div>
      </div>
    </article>
  );
}
