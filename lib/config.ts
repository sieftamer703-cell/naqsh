export const BRAND = {
  name: "NAQSH",
  arabic: "نقش",
  tagline: "فن يصنع هوية المكان",
};

export const LINKS = {
  facebook: "https://www.facebook.com/naqsh.nqsh.2026?locale=ar_AR",
  instagram: "https://www.instagram.com/naqsh2027/",
  tiktok: "https://www.tiktok.com/@naqsh826",
  whatsapp: "https://wa.me/201021199543",
  phone: "01021199543",
  phoneHref: "tel:+201021199543",
};

const WA_BASE = "https://wa.me/201021199543";

export function productWhatsAppLink(name: string, sku: string) {
  const text = `مرحباً NAQSH 👋\nأرغب في الاستفسار عن المنتج التالي:\n\nاسم المنتج: ${name}\nكود المنتج: ${sku}\n\nبرجاء التواصل معي لاستكمال تفاصيل الطلب.`;
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

export function wholesaleWhatsAppLink() {
  const text =
    "مرحباً NAQSH 👋\nأنا تاجر وأرغب في الاستفسار عن التعامل بالجملة والحصول على كتالوج الجملة.\n\nبرجاء التواصل معي لاستكمال التفاصيل.";
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

export function generalWhatsAppLink() {
  const text = "مرحباً NAQSH 👋\nأرغب في الاستفسار عن منتجاتكم.";
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}
